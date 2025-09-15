import React from 'react'
import { motion } from 'framer-motion'  
import { ExternalLink } from 'lucide-react'
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
                          <motion.h3 
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6, delay: 0.1 }} 
                            className="text-white text-xl font-bold"
                          >
                            Hello, Alex
                          </motion.h3>
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
                            className="flex w-full mt-8 cursor-pointer items-center justify-center gap-2 rounded-lg bg-[#1A1B3A] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-opacity-80"
                          >
                            <ExternalLink size={16} />
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
                          className="flex flex-col divide-y divide-[#1A1B3A] rounded-xl bg-[#1A1B3A] bg-opacity-50 backdrop-blur-sm"
                        >
                          <div className="flex items-center justify-between p-3">
                            <div className="flex items-center gap-2">
                              <span className="text-sm text-gray-400">Total Deployments</span>
                            </div>
                            <span className="font-bold text-white">3</span>
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