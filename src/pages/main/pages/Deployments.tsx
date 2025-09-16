import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { SearchIcon, ArrowLeft, ArrowRight, Plus } from 'lucide-react'
import CreateDeployment from '@/components/modals/CreateDeployment'

const Deployments: React.FC = () => {
  const [deployments] = useState([
    { 
      id: 1, 
      name: 'Production API',
      resources: 'CPU: 2, Mem: 4GB, Sto: 20GB',
      cost: '0.05',
      duration: '7 days', 
      status: 'active' 
    },
    { 
      id: 2, 
      name: 'Staging App',
      resources: 'CPU: 4, Mem: 8GB, Sto: 200GB',
      cost: '0.03',
      duration: '4 days', 
      status: 'building' 
    },
    { 
      id: 3, 
      name: 'Development',
      resources: 'CPU: 2, Mem: 4GB, Sto: 20GB',
      cost: '0.00',
      duration: '14 days',  
      status: 'failed' 
    },
  ])

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800'
      case 'building': return 'bg-yellow-100 text-yellow-800'
      case 'failed': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const [isOPen, setIsOPen] = useState(false);

  const handleOPen = () => {
    setIsOPen(true);
  }
  const handleClose = () => {
    setIsOPen(false);
  }

  return (
    <div className="flex min-h-screen">
      <main className="flex-1 p-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex justify-between items-center mb-8"
        >
          <h2 className="text-3xl font-bold text-white">
            Deployments
            <span className="text-gray-500 text-2xl">(3)</span>
          </h2>
          <div className="relative">
            <input 
              type="text" 
              placeholder='Search deployments...'
              className="bg-[#1A1B3A] text-white border border-[#2d3748] rounded-xl py-2 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-[#00D2FF] transition-all w-72"
            />
            <SearchIcon
              size={16}
              className='absolute left-3 top-1/2 -translate-y-1/2 text-gray-500'
            />
          </div>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 @container">
          {deployments.map((deployment) => (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="glassmorphism-card overflow-hidden border border-white/10 shadow-2xl rounded-xl p-6 flex flex-col justify-between hover:border-[#00D2FF] transition-all duration-300 transform hover:-translate-y-1"
            >
              <div>
                <div className="flex justify-between items-start mb-4">
                  <h3 className="font-bold text-xl text-white">{deployment.name}</h3>
                  <span className="flex items-center text-xs font-semibold bg-green-500/20 text-green-400 px-2 py-1 rounded-full">
                    <span className="w-2 h-2 bg-green-400 rounded-full mr-2"></span>
                    {deployment.status}
                  </span>
                </div>
                <div className="space-y-3 text-gray-500 text-sm">
                  <p>
                    <strong> Resources: </strong>
                    {deployment.resources}
                  </p>
                  <p>
                    <strong> Cost: </strong>
                    ${deployment.cost}/hr
                  </p>
                  <p>
                    <strong> Duration: </strong>
                    {deployment.duration}
                  </p>
                </div>
              </div>
              <div className="flex items-center justify-end gap-2 mt-6">
                <button 
                  className="text-xs font-semibold text-gray-500 hover:text-white transition-colors"
                >
                  View Details
                </button>
                <button 
                  className="text-xs font-semibold text-gray-500 hover:text-white transition-colors"
                >
                  Edit
                </button>
                <button 
                  className="text-xs font-semibold text-gray-500 hover:text-white transition-colors"
                >
                  Update
                </button>
                <button 
                  className="text-xs font-semibold text-red-500 hover:text-red-600 transition-colors"
                >
                  Delete
                </button>
              </div>
            </motion.div>
          ))}
        </div>
        <div className="flex justify-center items-center mt-8">
          <nav className="flex items-center gap-2">
            <a 
              href="#" 
              className="p-2 rounded-lg text-white  hover:bg-gray-300 transition-colors hover:text-gray-800"
            >
              <ArrowLeft size={24} />
            </a>
            <a 
              href="#" 
              className="px-4 py-2 rounded-lg bg-[#00D2FF] text-gray-800 font-bold text-sm"
            >
              1
            </a>
            <a 
              href="#" 
              className="p-2 rounded-lg text-white  hover:bg-gray-300 transition-colors hover:text-gray-800"
            >
              <ArrowRight size={24} />
            </a>
          </nav>
        </div>
      </main>
      <motion.button
        drag
        dragConstraints={{
          top: 0,
          right: 0,
          bottom: 0,
          left: 0,
        }}
        whileDrag={{ scale: 1.1 }} 
        onClick={handleOPen}
        className="fixed bottom-8 right-8 bg-[#00D2FF] hover:bg-cyan-500 text-white font-bold rounded-full h-16 w-16 flex items-center justify-center shadow-lg transform hover:scale-105 transition-all duration-300"
      >
        <Plus size={24} className='text-gray-100'/>
      </motion.button>
      <CreateDeployment 
        isOPen={isOPen}
        onClose={handleClose}
      />
    </div>
  )
}

export default Deployments