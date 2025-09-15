import React from 'react'
import { motion } from 'framer-motion'

const Auth = () => {
  return (
    <div className="w-80">
        <body className="bg-[#0F0F23] text-[#FFFFFF]">
            <div className="flex flex-col items-center justify-between h-full p-6">
                <div className="text-center w-full">
                    <motion.header 
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.1 }}
                      className="mb-10">
                        <h1 className="text-3xl font-bold mb-2">Welcome to Jarvis</h1>
                        <p className="text-gray-300">Your AI-powered Akash Cloud Manager</p>
                    </motion.header>

                    <main className="w-full">
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.7, delay: 0.1 }}
                          className="glassmorphism rounded-xl p-8">
                            <div className="space-y-4">
                                <button className="w-full flex items-center justify-center gap-3 bg-[#00D2FF] text-black font-bold py-3 px-4 rounded-lg hover:bg-opacity-80 transition-all duration-300 ease-in-out transform hover:scale-105">
                                    <div className="w-4 h-4 p-4 rounded-lg bg-black"></div>
                                    <span>Connect Keplr Wallet</span>
                                </button>
                                <button className="w-full flex items-center justify-center gap-3 bg-[#00D2FF] text-black font-bold py-3 px-4 rounded-lg hover:bg-opacity-80 transition-all duration-300 ease-in-out transform hover:scale-105">
                                    <div className="w-4 h-4 p-4 rounded-lg bg-black"></div>
                                    <span>Connect Leap Wallet</span>
                                </button>
                            </div>
                        </motion.div>
                    </main>
                </div>
                <footer className="flex items-center gap-2 mt-16">
                    <div className=""></div>
                    <span className="text-sm text-gray-400">Powered by Akash Network</span>
                </footer>
            </div>
        </body>
    </div>
  )
}

export default Auth