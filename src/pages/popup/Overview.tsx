import { useEffect, useState} from 'react'
import { AuthStorage } from '@/utils/storage'
import { motion } from 'framer-motion'  
import { ExternalLink, Wallet } from 'lucide-react'
import { useTheme } from '@/components/layout/ThemeContext'
import { formatAddress } from '@/utils/formatters'
import { useApi } from '@/hooks/useApi'


const Overview = () => {  

  const { theme, toggleTheme, loading } = useTheme(); 
  const [address, setAddress] = useState<string | null>(null);
  const [deploymentCount, setDeploymentCount] = useState<number>(0);
  const { listDeployments } = useApi(); 

  useEffect(() => {
    const fetchAddress = async () => {
      const walletAddress = await AuthStorage.getWalletAddress();
      setAddress(walletAddress);

      const deployments = await listDeployments();
      if (deployments && deployments.deployments) {
        setDeploymentCount(deployments.deployments.length);
      }
    };

    fetchAddress();
  }, []);
  
  if (loading) return null; // avoid flicker on load

  const openDashboard = () => {
    chrome.tabs.create({ url: chrome.runtime.getURL('src/pages/main/index.html#dashboard') })
  }
  
  return (
    <div className={`w-80 h-[600px] ${ theme === "light" ? "bg-gray-100" : "bg-gray-900"} `}>
        <body className={`${ theme === "light" ? "bg-gray-100" : "bg-gray-900"} `}>
            <div className={`relative flex flex-col ${ theme === "light" ? "bg-gray-100" : "bg-gray-900"}  group/design-root overflow-hidden`}>
               <div className="flex h-full grow flex-col">

                   {/* Header */}
                   <motion.header
                     initial={{ opacity: 0, y: 20 }}
                     animate={{ opacity: 1, y: 0 }}
                     transition={{ duration: 0.5, delay: 0.1 }} 
                     className={`flex items-center justify-between whitespace-nowrap border-b border-solid  ${ theme === "light" ? "border-gray-200" : "border-[#1A1B3A]"} px-6 py-4`}>
                       <div className="flex items-center gap-3">
                           <svg className="text-[#FF4444] size-6" fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                             <path clip-rule="evenodd" d="M24 4H6V17.3333V30.6667H24V44H42V30.6667V17.3333H24V4Z" fill="currentColor" fill-rule="evenodd"></path>
                           </svg>
                           <h2 className={`${ theme === "light" ? "text-black" : "text-white"} text-xl font-bold`}>Jarvis</h2>
                       </div>
                       <div 
                          className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-8"
                        >
                        </div>
                   </motion.header>
                   <div className="flex flex-1 flex-col justify-between p-6">
                      <div className="flex flex-col gap-4">
                        <div className="flex flex-col gap-2">
                          <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6, delay: 0.1 }} 
                            className="flex m-1 p-1 justify-between"
                          >
                            <h3 className={`${ theme === "light" ? "text-black" : "text-white"} text-xl font-medium`}>
                              Welcomee
                            </h3>
                            <div className="relative">
                              <div
                                className={`flex cursor-pointer items-center justify-center gap-2 rounded-lg ${ theme === "light" ? "bg-gray-400" : "bg-gray-800"} px-2 py-1 text-sm font-medium tracking-[0.015em] transition-colors hover:bg-opacity-80`}
                              >
                                <Wallet size={20} className='text-cyan-800'/>
                                <span className={`truncate  ${ theme === "light" ? 'text-black' : 'text-white'}`}>{formatAddress(address)}</span>
                              </div>
                            </div>
                          </motion.div>
                          <motion.button
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.7, delay: 0.1 }} 
                            whileHover={{ 
                              scale: 1.05,
                              boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)" 
                            }}
                            whileTap={{ scale: 0.95 }}
                            onClick={openDashboard}
                            className={`flex w-full mt-8 cursor-pointer items-center justify-center gap-2 px-4 py-4 text-xl font-medium text-white transition-colors glassmorphism-card  overflow-hidden border  ${ theme === "light" ? "border-black/10 text-black bg-indigo-100 opacity-20 shadow-md" : "border-white/10 text-white bg-gray-900 opacity-5 shadow-xl"}  rounded-xl -all duration-300 transform hover:-translate-y-1`}
                          >
                            <ExternalLink size={24} className={`truncate ${ theme === "light" ? "text-black" : "text-white"}`} />
                            <span className={`truncate ${ theme === "light" ? "text-black" : "text-white"} `}>Open Main Dashboard</span>
                          </motion.button>
                        </div>
                      </div>
                      <div className="flex flex-col gap-3 mt-8">
                        <h4 className={`${ theme === "light" ? "text-black" : "text-white"} text-lg font-bold`}>Deployments Overview</h4>
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.8, delay: 0.1 }}  
                          className={`flex flex-col w-full mt-4 cursor-pointer text-lg font-medium ${ theme === "light" ? "border-black/10 text-black bg-indigo-100 opacity-20 shadow-md" : "border-white/10 text-white bg-gray-900 opacity-5 shadow-xl"} transition-colors glassmorphism-card overflow-hidden border rounded-xl -all duration-300 transform hover:-translate-y-1`}
                        >
                          <div className="flex items-center justify-between p-2">
                            <div className="flex items-center gap-2">
                              <span className={`text-sm  ${ theme === "light" ? "text-gray-800" : "text-gray-400"}`}>Total Deployments</span>
                            </div>
                            <span className={` ${ theme === "light" ? 'text-gray-800' : 'text-white'} mr-2`}>{deploymentCount}</span>
                          </div>
                        </motion.div>
                      </div>

                   </div>
               </div>
            </div>
        </body>
    </div>
  )
}

export default Overview