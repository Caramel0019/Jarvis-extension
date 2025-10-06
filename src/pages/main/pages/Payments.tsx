import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion"
import { Wallet, ChevronDown, Loader2, CheckCircle, XCircle } from "lucide-react"
import { useTheme } from "@/components/layout/ThemeContext";
import { History } from "@/components/common/History";
import { sendMessageWithRetry } from "@/utils/messenger";
import { MessageListener } from "@/utils/messageListener";
import { AuthStorage } from "@/utils/storage";
import { WEB_API_BASE_URL } from "@/utils/constants";

type PaymentStatus = 'idle' | 'processing' | 'success' | 'failed';

const Payments = () => {
  const { theme, loading } = useTheme();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [amount, setAmount] = useState("");
  const [selectedWallet, setSelectedWallet] = useState<"keplr" | "leap">("keplr");
  const [paymentStatus, setPaymentStatus] = useState<PaymentStatus>('idle');
  const [statusMessage, setStatusMessage] = useState<string>("");
  const [txHash, setTxHash] = useState<string>("");
  
  useEffect(() => {
    // Load saved wallet preference
    const loadWalletPreference = async () => {
      const savedWallet = await AuthStorage.getWallet();
      if (savedWallet && (savedWallet === "keplr" || savedWallet === "leap")) {
        setSelectedWallet(savedWallet);
      }
    };
    
    loadWalletPreference();

    // Setup message listener
    const listener = new MessageListener();
    
    listener.onMessage((type, data) => {
      console.log('Received message:', type, data);
      
      if (type === 'payment_result') {
        if (data.status === 'success') {
          setPaymentStatus('success');
          setStatusMessage('Payment successful!');
          setTxHash(data.txHash || '');
          setAmount("");
          
          // Auto close dropdown after 3 seconds
          setTimeout(() => {
            setIsDropdownOpen(false);
            setPaymentStatus('idle');
            setStatusMessage("");
            setTxHash("");
          }, 3000);
        } else if (data.status === 'failed') {
          setPaymentStatus('failed');
          setStatusMessage(data.error || 'Payment failed');
        }
      }
    });

    return () => {
      listener.cleanup();
    };
  }, []);

  if (loading) return null;

  const handlePayment = async () => {
    if (!amount || isNaN(Number(amount)) || Number(amount) <= 0) {
      setPaymentStatus('failed');
      setStatusMessage("Please enter a valid amount");
      return;
    }

    setPaymentStatus('processing');
    setStatusMessage("Opening payment window...");

    try {
      // Save wallet preference
      await AuthStorage.setWallet(selectedWallet);

      // Check for existing tab
      const existingTabs = await chrome.tabs.query({ url: `${WEB_API_BASE_URL}/*` });
      
      let targetTab;
      if (existingTabs.length > 0) {
        targetTab = existingTabs[0];
        await chrome.tabs.update(targetTab.id!, { active: true });
      } else {
        // Create new tab with web app
        targetTab = await chrome.tabs.create({
          url: WEB_API_BASE_URL,
          active: false
        });
        
        setStatusMessage("Loading payment page...");
        // Wait for page to load
        await new Promise(resolve => setTimeout(resolve, 2000));
      }

      if (!targetTab?.id) {
        setPaymentStatus('failed');
        setStatusMessage('Error: Could not create web app tab');
        return;
      }

      setStatusMessage("Connecting to wallet...");

      // Send payment message to content script
      const response = await sendMessageWithRetry(
        targetTab.id, 
        { 
          action: 'open_payment',
          data: {
            amount: amount,
            wallet: selectedWallet
          }
        }, 
        5, 
        500
      );

      if (response?.status === 'payment_opened') {
        setStatusMessage("Waiting for wallet confirmation...");
      } else {
        setPaymentStatus('failed');
        setStatusMessage("Failed to open payment window");
      }
    } catch (error) {
      setPaymentStatus('failed');
      setStatusMessage('Failed to open payment window');
    }
  };

  const resetStatus = () => {
    setPaymentStatus('idle');
    setStatusMessage("");
    setTxHash("");
  };

  return (
    <div className="flex min-h-screen">
      <main className="flex-1 p-8 flex flex-col">

        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex justify-between items-center mb-8"
        >
          <h2 className={`text-3xl font-bold ${theme === "light" ? 'text-black' : 'text-white'}`}>
            Payments Overview
          </h2>
        </motion.div>

        {/* Balance Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }} 
          className={`flex ${theme === "light" ? "border-black/10 text-black bg-indigo-100 opacity-20" : "border-white/10 text-white bg-gray-900 opacity-5"} justify-between w-full mt-8 gap-3 px-4 py-4 text-md font-medium text-white glassmorphism-card border shadow-lg rounded-xl`}
        >
          <div className="flex justify-between">
            <div className="flex gap-3">
              <div className="flex text-cyan-500 rounded-xl bg-black/20 shrink-0 p-4 m-2">
                <Wallet size={26}/>
              </div>
              <div className="flex flex-col mt-4">
                <p className={`text-lg font-bold ${theme === "light" ? 'text-black' : 'text-white'}`}>123.45 AKT</p>
                <p className="text-sm text-gray-500">AKT Balance</p>
              </div>
            </div>
          </div>
          <div className="relative z-50">
            <button 
              onClick={() => {
                setIsDropdownOpen(!isDropdownOpen);
                if (!isDropdownOpen) {
                  resetStatus();
                }
              }}
              disabled={paymentStatus === 'processing'}
              className={`flex mt-4 min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-2xl h-10 px-7 bg-cyan-500 ${theme === "light" ? 'text-white' : 'text-black'} text-base font-bold leading-normal tracking-wide shadow-lg shadow-cyan-500/20 hover:bg-cyan-600 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed gap-2`}
            >
              <span className="truncate">Add Funds</span>
              <ChevronDown 
                size={18}
                className={`transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`}
              />
            </button>

            {/* Dropdown */}
            <AnimatePresence>
              {isDropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className={`absolute right-0 mt-2 w-80 ${theme === "light" ? "bg-white border-gray-200" : "bg-gray-800 border-gray-700"} border rounded-xl shadow-2xl p-4 z-50`}
                >
                  {/* Status Messages */}
                  {statusMessage && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`mb-4 p-3 rounded-lg flex items-start gap-3 ${
                        paymentStatus === 'processing' 
                          ? theme === "light" ? "bg-blue-100 text-blue-800" : "bg-blue-900/30 text-blue-300"
                          : paymentStatus === 'success'
                          ? theme === "light" ? "bg-green-100 text-green-800" : "bg-green-900/30 text-green-300"
                          : theme === "light" ? "bg-red-100 text-red-800" : "bg-red-900/30 text-red-300"
                      }`}
                    >
                      {paymentStatus === 'processing' && <Loader2 className="w-5 h-5 animate-spin flex-shrink-0 mt-0.5" />}
                      {paymentStatus === 'success' && <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />}
                      {paymentStatus === 'failed' && <XCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />}
                      <div className="flex-1">
                        <p className="text-sm font-medium">{statusMessage}</p>
                        {txHash && (
                          <p className="text-xs mt-1 break-all opacity-75">
                            Tx: {txHash.slice(0, 20)}...
                          </p>
                        )}
                      </div>
                    </motion.div>
                  )}

                  {/* Wallet Selection */}
                  <div className="mb-4">
                    <label className={`block text-sm font-medium mb-2 ${theme === "light" ? "text-gray-700" : "text-gray-300"}`}>
                      Select Wallet
                    </label>
                    <div className="flex gap-2">
                      <button
                        onClick={() => setSelectedWallet("keplr")}
                        disabled={paymentStatus === 'processing'}
                        className={`flex-1 py-2 px-4 rounded-lg font-medium transition-all ${
                          selectedWallet === "keplr"
                            ? "bg-cyan-500 text-white"
                            : theme === "light"
                            ? "bg-gray-100 text-gray-700 hover:bg-gray-200"
                            : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                        } disabled:opacity-50 disabled:cursor-not-allowed`}
                      >
                        Keplr
                      </button>
                      <button
                        onClick={() => setSelectedWallet("leap")}
                        disabled={paymentStatus === 'processing'}
                        className={`flex-1 py-2 px-4 rounded-lg font-medium transition-all ${
                          selectedWallet === "leap"
                            ? "bg-cyan-500 text-white"
                            : theme === "light"
                            ? "bg-gray-100 text-gray-700 hover:bg-gray-200"
                            : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                        } disabled:opacity-50 disabled:cursor-not-allowed`}
                      >
                        Leap
                      </button>
                    </div>
                  </div>

                  {/* Amount Input */}
                  <div className="mb-4">
                    <label className={`block text-sm font-medium mb-2 ${theme === "light" ? "text-gray-700" : "text-gray-300"}`}>
                      Amount
                    </label>
                    <div className="relative">
                      <input
                        type="number"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        placeholder="0.00"
                        step="0.01"
                        min="0"
                        disabled={paymentStatus === 'processing'}
                        className={`w-full ${theme === "light" ? "bg-gray-50 border-gray-300 text-gray-900" : "bg-gray-700 border-gray-600 text-white"} border rounded-lg py-2 px-3 pr-12 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent disabled:opacity-50`}
                      />
                      <div className={`absolute right-3 top-1/2 -translate-y-1/2 ${theme === "light" ? "text-gray-600" : "text-gray-400"} font-semibold text-sm`}>
                        AKT
                      </div>
                    </div>
                  </div>

                  {/* Pay Button */}
                  <button
                    onClick={handlePayment}
                    disabled={paymentStatus === 'processing' || !amount || paymentStatus === 'success'}
                    className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white font-semibold py-2.5 px-4 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg flex items-center justify-center gap-2"
                  >
                    {paymentStatus === 'processing' ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Processing...
                      </>
                    ) : paymentStatus === 'success' ? (
                      <>
                        <CheckCircle className="w-4 h-4" />
                        Payment Completed
                      </>
                    ) : (
                      "Pay Now"
                    )}
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}  
          className="mt-8 grid grid-cols-2 gap-4"
        >
          <div className=""></div>
        </motion.div>

        {isDropdownOpen && (
          <div>
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
          </div>
        )}

        <div>
          <h2 className={`text-2xl font-bold tracking-[-0.015em] ${theme === 'light' ? 'text-black' : 'text-white'}`}>
            Recent Activity
          </h2>
          <br />
          <History/>
        </div>
      </main>
    </div>
  )
}

export default Payments