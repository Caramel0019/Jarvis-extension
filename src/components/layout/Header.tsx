import React, { useState } from 'react'
import { Wallet, User } from 'lucide-react'
import { motion } from 'framer-motion'
 
const Header: React.FC = () => {
  

  const [isHover, setIsHover] = useState(false);

  const handleIsHover = () => {
    setIsHover(!isHover);
  }

  return (
    <header className="bg-[#0F0F23] shadow-sm border-b border-gray-900">
      <div className="flex justify-between py-4 px-3">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex justify-center gap-2"
        >
          <div className="text-4xl"> 
            <svg className="text-[#FF4444] size-12" fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
              <path clip-rule="evenodd" d="M24 4H6V17.3333V30.6667H24V44H42V30.6667V17.3333H24V4Z" fill="currentColor" fill-rule="evenodd"></path>
            </svg>
          </div>
          <h2 className="text-white font-bold text-4xl">Jarvis</h2>
        </motion.div>
        <div className="relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }} 
            className="flex justify-center gap-2"
          >
            <div
              onClick={handleIsHover}
              className="flex cursor-pointer items-center justify-center gap-2 rounded-xl bg-[#1A1B3A] px-4 py-2 text-sm font-bold tracking-[0.015em] transition-colors hover:bg-opacity-80"
            >
              <Wallet size={24} className='text-[#00D2FF]' />
              <span className="truncate text-white">0x123...abc</span>
            </div>
            <div 
              className="cursor-pointer bg-center items-center bg-no-repeat aspect-square bg-cover rounded-full size-12"
            >
              <User size={24} className='text-[#00D2FF] mt-2'/>
            </div>
          </motion.div>
          {isHover && (
            <motion.button
              initial={{ opacity: 0, y: -10}}
              animate={{ opacity: 1, y: 0}}
              exit={{ opacity: 0, y: -10}}
              transition={{ duration: 0.2}} 
              className="absolute top-16 left-0 bg-cyan-500/10 px-4 py-2 text-white font-semibold rounded-xl border backdrop-blur border-cyan-500/20"
            >
              Disconnect
            </motion.button>
          )}
        </div>
      </div>
    </header>
  )
}

export default Header