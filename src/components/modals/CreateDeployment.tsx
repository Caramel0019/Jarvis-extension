import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import Modal from '../ui/Modal'
import { useState } from 'react';

interface CreateDeploymentProps { 
    isOPen: boolean;
    onClose: () => void;
}

const CreateDeployment: React.FC<CreateDeploymentProps> = ({ isOPen, onClose}) => {

    const [deployment_types] = useState([
        {
            id: 1,
            value: 'hosting',
            tag: 'Hosting',
        },
        {
            id: 2,
            value: 'database',
            tag: 'Database',
        },
        {
            id: 3,
            value: 'compute',
            tag: 'Compute',
        },
        {
            id: 4,
            value: 'kubernetes',
            tag: 'Kubernetes',
        },
    ])

  return (
    
    <AnimatePresence>
      {isOPen && (
      <Modal>
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 20 }}
          transition={{ 
            delay: 0.2,
            duration: 0.5, 
          }}
          className="w-[500px]  max-w-4xl h-[500px] glassmorphism-card overflow-hidden border border-white/10 shadow-2xl rounded-xl -all duration-300 transform hover:-translate-y-1"
        >
            <header className="flex items-center justify-between p-6 border-b border-white/10 flex-shrink-0">
              <h2 className="text-2xl font-bold tracking-tight text-white">Create New Deployment</h2>
              <button
                onClick={onClose} 
                className="text-white/50 hover:text-white transition-colors"
              >
                <X size={24} className='text-white/50'/>
              </button>
            </header>
            <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                    <p className="text-sm font-medium text-white/70">Step 1 of 4</p>
                    <p className="text-sm font-bold text-white">Deployment Type</p>
                </div>
                <div 
                  className="w-full bg-gray-900 rounded-full h-2 "
                >
                    <div className="bg-[#00D2FF] h-2 rounded-full w-1/4"></div>
                </div>
            </div>
            <main className="flex-grow p-6 overflow-y-auto">
                <div className="space-y-8">
                    <div>
                        <h3 className="text-xl font-bold mb-4 text-white">Select Deployment Type</h3>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {deployment_types.map((deployment_type) => ( 
                              <label htmlFor="" className="group relative cursor-pointer">
                                  <input
                                    name="deployment_type" 
                                    type="radio" 
                                    className="sr-only" 
                                    value={deployment_type.value}
                                  />
                                  <div className="p-6 flex justify-center bg-gray-900 rounded-lg text-center border-2 border-transparent group-hover:border-cyan-200 peer-checked:border-cyan-200 peer-checked:bg-gray-900/50 transition-all duration-300">
                                    <p className="font-bold text-lg text-white">{deployment_type.tag}</p>
                                  </div>
                              </label>
                            ))}
                        </div>
                    </div>
                </div>
            </main>
            <footer className="flex items-center justify-between mt-16 p-5 border-t border-white/10 flex-shrink-0 ">
               <button 
                 onClick={onClose}
                 className="px-6 py-2 rounded-lg text-white font-bold bg-transparent border border-white/20 hover:bg-white/10 transition-colors"
                >
                 Cancel
               </button>
               <div className="flex items-center gap-4">
                  <button 
                    className="px-6 py-2 rounded-lg text-white/50 font-bold bg-gray-900 cursor-not-allowed"
                    disabled
                  >
                    Previous
                  </button>
                  <button 
                    className="px-6 py-2 rounded-lg text-black font-bold bg-[#00D2FF] hover:bg-[#00D2FF] hover:text-white transition-all duration-300 shadow-lg shadow-cyan-200/20"
                  >
                    Next
                  </button>
               </div>
            </footer>
        </motion.div>
      </Modal>
      )};
    </AnimatePresence>
  )
}

export default CreateDeployment