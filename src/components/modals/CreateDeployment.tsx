import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import Modal from "../ui/Modal";
import { useState } from "react";

interface CreateDeploymentProps {
  isOPen: boolean;
  onClose: () => void;
}

const CreateDeployment: React.FC<CreateDeploymentProps> = ({ isOPen, onClose }) => {
  const [step, setStep] = useState(1);
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [isDeploying, setIsDeploying] = useState(false);

  // Deployment form fields
  const [image, setImage] = useState("nginx:latest");
  const [cpu, setCpu] = useState(1.0);
  const [memory, setMemory] = useState("512MB");
  const [storage, setStorage] = useState("1GB");
  const [ports, setPorts] = useState("80");
  const [paymentAmount, setPaymentAmount] = useState(10.0);
  const [paymentCurrency, setPaymentCurrency] = useState("USD");

  const [deployment_types] = useState([
    { id: 1, value: "hosting", tag: "Hosting" },
    { id: 2, value: "database", tag: "Database" },
    { id: 3, value: "compute", tag: "Compute" },
    { id: 4, value: "kubernetes", tag: "Kubernetes" },
  ]);

  const nextStep = () => setStep((prev) => Math.min(prev + 1, 4));
  const prevStep = () => setStep((prev) => Math.max(prev - 1, 1));

  const handleDeploy = async () => {
    setIsDeploying(true);

    await new Promise((resolve) => setTimeout(resolve, 10000));

    setIsDeploying(false);
    onClose();
  }

  return (
    <AnimatePresence>
      {isOPen && (
        <Modal>
          <motion.div
            key="modal"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 40 }}
            transition={{ duration: 0.4 }}
            className="w-[500px] max-w-4xl h-[550px] flex flex-col glassmorphism-card overflow-hidden border border-white/10 shadow-2xl rounded-xl duration-300"
          >
            {/* Header */}
            <header className="flex items-center justify-between p-6 border-b border-white/10">
              <h2 className="text-2xl font-bold tracking-tight text-white">
                Create New Deployment
              </h2>
              <button
                onClick={onClose}
                className="text-white/50 hover:text-white transition-colors"
              >
                <X size={24} />
              </button>
            </header>

            {/* Progress */}
            <div className="p-6">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm font-medium text-white/70">
                  Step {step} of 4
                </p>
              </div>
              <div className="w-full bg-gray-900 rounded-full h-2">
                <motion.div
                  className="bg-[#00D2FF] h-2 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${(step / 4) * 100}%` }}
                  transition={{ duration: 0.4 }}
                />
              </div>
            </div>

            {/* Steps */}
            <main className="flex-grow p-6 overflow-y-auto">
              <AnimatePresence mode="wait">
                {/* Step 1*/}
                {step === 1 && (
                  <motion.div
                    key="step1"
                    initial={{ opacity: 0, x: 40 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -40 }}
                    transition={{ duration: 0.4 }}
                  >
                    <h3 className="text-xl font-bold mb-4 text-white">
                      Select Deployment Type
                    </h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {deployment_types.map((deployment_type) => (
                        <label
                          key={deployment_type.id}
                          className="group relative cursor-pointer"
                        >
                          <input
                            name="deployment_type"
                            type="radio"
                            className="sr-only peer"
                            value={deployment_type.value}
                            checked={selectedType === deployment_type.value}
                            onChange={() =>
                              setSelectedType(deployment_type.value)
                            }
                          />
                          <div
                            className={`p-6 flex justify-center rounded-lg text-center border-2 transition-all duration-300
                            ${
                              selectedType === deployment_type.value
                                ? "border-cyan-200 bg-gray-900/50"
                                : "border-transparent bg-gray-900"
                            } group-hover:border-cyan-200`}
                          >
                            <p className="font-bold text-lg text-white">
                              {deployment_type.tag}
                            </p>
                          </div>
                        </label>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* Step 2*/}
                {step === 2 && (
                  <motion.div
                    key="step2"
                    initial={{ opacity: 0, x: 40 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -40 }}
                    transition={{ duration: 0.4 }}
                  >
                    <h3 className="text-xl font-bold mb-4 text-white">
                      Deployment Configuration
                    </h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-white/70 mb-1">Image</label>
                        <input
                          value={image}
                          onChange={(e) => setImage(e.target.value)}
                          className="w-full px-3 py-2 rounded bg-gray-900 border border-white/10 text-white"
                          placeholder="nginx:latest"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-white/70 mb-1">CPU</label>
                          <input
                            type="number"
                            step="0.1"
                            value={cpu}
                            onChange={(e) => setCpu(parseFloat(e.target.value))}
                            className="w-full px-3 py-2 rounded bg-gray-900 border border-white/10 text-white"
                          />
                        </div>
                        <div>
                          <label className="block text-white/70 mb-1">Memory</label>
                          <input
                            value={memory}
                            onChange={(e) => setMemory(e.target.value)}
                            className="w-full px-3 py-2 rounded bg-gray-900 border border-white/10 text-white"
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-white/70 mb-1">Storage</label>
                          <input
                            value={storage}
                            onChange={(e) => setStorage(e.target.value)}
                            className="w-full px-3 py-2 rounded bg-gray-900 border border-white/10 text-white"
                          />
                        </div>
                        <div>
                          <label className="block text-white/70 mb-1">Ports</label>
                          <input
                            value={ports}
                            onChange={(e) => setPorts(e.target.value)}
                            className="w-full px-3 py-2 rounded bg-gray-900 border border-white/10 text-white"
                          />
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Step 3 */}
                {step === 3 && (
                  <motion.div
                    key="step3"
                    initial={{ opacity: 0, x: 40 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -40 }}
                    transition={{ duration: 0.4 }}
                  >
                    <h3 className="text-xl font-bold mb-4 text-white">
                      Payment Information
                    </h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-white/70 mb-1">Amount</label>
                        <input
                          type="number"
                          value={paymentAmount}
                          onChange={(e) =>
                            setPaymentAmount(parseFloat(e.target.value))
                          }
                          className="w-full px-3 py-2 rounded bg-gray-900 border border-white/10 text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-white/70 mb-1">Currency</label>
                        <input
                          value={paymentCurrency}
                          onChange={(e) => setPaymentCurrency(e.target.value)}
                          className="w-full px-3 py-2 rounded bg-gray-900 border border-white/10 text-white"
                        />
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Step 4 */}
                {step === 4 && (
                  <motion.div
                    key="step4"
                    initial={{ opacity: 0, x: 40 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -40 }}
                    transition={{ duration: 0.4 }}
                  >
                    <h3 className="text-xl font-bold mb-4 text-white">
                      Review & Confirm
                    </h3>
                    <div className="space-y-4">
                      <div className="bg-gray-900 p-4 rounded-lg text-white/80">
                        <p><span className="font-bold text-white">Image:</span> {image}</p>
                        <p><span className="font-bold text-white">CPU:</span> {cpu}</p>
                        <p><span className="font-bold text-white">Memory:</span> {memory}</p>
                        <p><span className="font-bold text-white">Storage:</span> {storage}</p>
                        <p><span className="font-bold text-white">Ports:</span> {ports}</p>
                        <p>
                          <span className="font-bold text-white">Payment:</span> {paymentAmount}{" "}
                          {paymentCurrency}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </main>

            <footer className="flex items-center justify-between p-5 border-t border-white/10">
              <button
                onClick={onClose}
                disabled={isDeploying}
                className="px-6 py-2 rounded-lg text-white font-bold bg-transparent border border-white/20 hover:bg-white/10 transition-colors disabled:opacity-50"
              >
                Cancel
              </button>
             <div className="flex items-center gap-4">
               <button
                 onClick={prevStep}
                 disabled={step === 1 || isDeploying}
                 className={`px-6 py-2 rounded-lg font-bold ${
                   step === 1
                   ? "text-white/50 bg-gray-900 cursor-not-allowed"
                   : "text-white bg-transparent border border-white/20 hover:bg-white/10"
                  }`}
                >
                  Previous
                </button>

                {step === 4 ? (
                  <button
                    onClick={handleDeploy}
                    disabled={isDeploying}
                    className="px-6 py-2 rounded-lg font-bold flex items-center justify-center gap-2 text-black bg-[#00D2FF] hover:bg-[#00D2FF] hover:text-white shadow-lg shadow-cyan-200/20 disabled:opacity-50"
                  >
                    {isDeploying ? (
                      <>
                        <svg
                          className="animate-spin h-5 w-5 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                          ></path>
                       </svg>
                       Deploying...
                      </>
                     ) : (
                     "Deploy"
                    )}
                  </button>
                ) : (
                <button
                  onClick={nextStep}
                  disabled={step === 1 && !selectedType}
                  className={`px-6 py-2 rounded-lg font-bold ${
                    step === 1 && !selectedType
                    ? "text-white/50 bg-gray-900 cursor-not-allowed"
                    : "text-black bg-[#00D2FF] hover:bg-[#00D2FF] hover:text-white shadow-lg shadow-cyan-200/20"
                  }`}
                >
                  Next
                </button>
               )}
              </div>
            </footer>
          </motion.div>
        </Modal>
      )}
    </AnimatePresence>
  );
};

export default CreateDeployment;
