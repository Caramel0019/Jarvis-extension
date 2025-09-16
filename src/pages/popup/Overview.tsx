import React from 'react'
import { motion } from 'framer-motion'  
import { ExternalLink, Wallet } from 'lucide-react'
const Overview = () => {


  const openDashboard = () => {
    chrome.tabs.create({ url: chrome.runtime.getURL('src/pages/main/index.html#home') })
  }

  return (
    <div className="w-80 h-[600px] bg-[#0F0F23] ">
        <body className="bg-gray-900 ">
            <div className="relative flex flex-col bg-[#0F0F23] dark group/design-root overflow-hidden">
               <div className="flex h-full grow flex-col">
                   <motion.header
                     initial={{ opacity: 0, y: 20 }}
                     animate={{ opacity: 1, y: 0 }}
                     transition={{ duration: 0.5, delay: 0.1 }} 
                     className="flex items-center justify-between whitespace-nowrap border-b border-solid border-[#1A1B3A] px-6 py-4">
                       <div className="flex items-center gap-3">
                           <svg className="text-[#FF4444] size-6" fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                             <path clip-rule="evenodd" d="M24 4H6V17.3333V30.6667H24V44H42V30.6667V17.3333H24V4Z" fill="currentColor" fill-rule="evenodd"></path>
                           </svg>
                           <h2 className="text-white text-xl font-bold">Jarvis</h2>
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
                            <h3 className="text-white text-xl font-medium">
                              Welcome 
                            </h3>
                            <div className="flex cursor-pointer items-center justify-center gap-2 rounded-lg bg-[#1A1B3A] px-2 py-1 text-sm font-medium tracking-[0.015em] transition-colors hover:bg-opacity-80">
                              <Wallet size={20} className='text-[#00D2FF]'/>
                              <span className="truncate text-white">0x123...abc</span>
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
                            className="flex w-full mt-8 cursor-pointer items-center justify-center gap-2 px-4 py-4 text-xl font-medium text-white transition-colors glassmorphism-card overflow-hidden border border-white/10 shadow-2xl rounded-xl -all duration-300 transform hover:-translate-y-1"
                          >
                            <ExternalLink size={24} />
                            <span className="truncate">Open Main Dashboard</span>
                          </motion.button>
                        </div>
                      </div>
                      <div className="flex flex-col gap-3 mt-8">
                        <h4 className="text-white text-lg font-bold">Deployment Overview</h4>
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.8, delay: 0.1 }}  
                          className="flex flex-col w-full mt-4 cursor-pointer text-xl font-medium text-white transition-colors glassmorphism-card overflow-hidden border border-white/10 shadow-2xl rounded-xl -all duration-300 transform hover:-translate-y-1"
                        >
                          <div className="flex items-center justify-between p-3">
                            <div className="flex items-center gap-2">
                              <span className="text-md text-gray-400">Total Deployments</span>
                            </div>
                            <span className="font-medium text-white">3</span>
                          </div>
                        </motion.div>
                      </div>
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        whileHover={{ 
                          y: -10
                         }} 
                        className="glassmorphism-card mt-8 col-span-1 grid grid-cols-3 gap-4 rounded-xl border border-white/10 p-6 shadow-2xl"
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
                   </div>
               </div>
            </div>
        </body>
    </div>
  )
}

export default Overview