import { useState } from 'react'
import { MicIcon, Plus, Server, RefreshCw, Trash2Icon } from 'lucide-react'
import { motion } from 'framer-motion'
import CreateDeployment from '@/components/modals/CreateDeployment'

const Home: React.FC = () => {


  const [isCreateDeploymentOPen, setIsCreateDeploymentOPen] = useState(false);
  
    const handleCreateDeploymentOPen = () => {
      setIsCreateDeploymentOPen(true);
    }
    const handleCreateDeploymentClose = () => {
      setIsCreateDeploymentOPen(false);
    }
  return (
    <div className="flex-1 overflow-y-auto p-10 ">
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }} 
          whileHover={{ 
            y: -10
          }}
          className="glassmorphism-card col-span-1 flex flex-col gap-4 rounded-xl border border-white/10 p-6 shadow-2xl"
        >
          <h3 className="text-lg font-medium text-gray-300">AKT Balance</h3>
          <p className="text-2xl font-bold tracking-tight text-[#00D2FF]">123.45 AKT</p>
        </motion.div>
        <motion.div 
          initial={{ opacity: 0, y: 23 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          whileHover={{ 
            y: -10
          }}
          className="glassmorphism-card col-span-1 grid grid-cols-3 gap-4 rounded-xl border border-white/10 p-6 shadow-2xl"
        >
          <div className="flex flex-col items-center justify-center">
            <p className="text-base font-medium text-gray-300">Total</p>
            <p className="text-2xl font-bold text-white">10</p>
          </div>
          <div className="flex flex-col items-center justify-center">
            <p className="text-base font-medium text-gray-300">Active</p>
            <p className="text-2xl font-bold text-green-400">7</p>
          </div>
          <div className="flex flex-col items-center justify-center">
            <p className="text-base font-medium text-gray-300">Pending</p>
            <p className="text-2xl font-bold text-yellow-400">3</p>
          </div>
        </motion.div>
        <motion.div 
          initial={{ opacity: 0, y: 26 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          whileHover={{ 
            y: -10
          }}
          className="glassmorphism-card col-span-1 flex items-center justify-center rounded-xl border border-white/10 p-6 shadow-2xl"
        >
          <button 
            className="group flex h-20 w-20 items-center justify-center rounded-full bg-[#00D2FF] transition-all duration-300 hover:scale-110"
          >
            <MicIcon size={32} className='text-gray-800'/>
          </button>
        </motion.div>
      </div>
      <motion.div 
        initial={{ opacity: 0, y: 26 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="mt-8 flex items-center justify-between"
      >
        <h2 className="text-2xl font-bold tracking-[-0.015em] text-white">Recent Activity</h2>
        <button 
          onClick={handleCreateDeploymentOPen}
          className="flex min-w-[84px] cursor-pointer items-center justify-center gap-2 overflow-hidden rounded-xl bg-[#00D2FF] h-12 px-6 text-base font-bold tracking-[0.015em] text-black transition-transform hover:scale-105"
        >
          <Plus size={26} className=''/>
          <span className="truncate">Add New Deployment</span>
        </button>
      </motion.div>
      <div className="mt-4 flow-root">
        <div className="-my-2 overflow-x-auto">
          <div className="inline-block min-w-full py-2 align-middle">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }} 
              className="glassmorphism-card overflow-hidden rounded-xl border border-white/10 shadow-2xl"
            >
              <div className="flex flex-col">
                <div className="flex items-center gap-4 border-b border-white/10 p-4 transition-colors hover:bg-white/5">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-[#1A1B3A] text-[#00D2FF]">
                    <Server size={26} className='text-[#00D2FF]'/>
                  </div>
                  <div className="flex-grow">
                    <p className="text-base font-medium text-white">Deployment #123</p>
                    <p className="text-sm text-gray-400">Deployment created successfully</p>
                  </div>
                  <div className="text-sm text-gray-500">2 min ago</div>
                </div>
                <div className="flex items-center gap-4 border-b border-white/10 p-4 transition-colors hover:bg-white/5">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-[#1A1B3A] text-[#00D2FF]">
                    <RefreshCw size={26} className='text-[#00D2FF]'/>
                  </div>
                  <div className="flex-grow">
                    <p className="text-base font-medium text-white">Deployment #456</p>
                    <p className="text-sm text-gray-400">Deployment updated</p>
                  </div>
                  <div className="text-sm text-gray-500">1 hour ago</div>
                </div>
                <div className="flex items-center gap-4 border-b border-white/10 p-4 transition-colors hover:bg-white/5">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-[#1A1B3A] text-[#00D2FF]">
                    <Trash2Icon size={26} className='text-red-500'/>
                  </div>
                  <div className="flex-grow">
                    <p className="text-base font-medium text-white">Deployment #789</p>
                    <p className="text-sm text-gray-400">Deployment deleted</p>
                  </div>
                  <div className="text-sm text-gray-500">1 day ago</div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
      <CreateDeployment 
        isOPen={isCreateDeploymentOPen}
        onClose={handleCreateDeploymentClose}
      />
    </div>
  )
}

export default Home