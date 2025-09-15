import React from 'react'
import { Wallet, User } from 'lucide-react'

const Header: React.FC = () => {
  

  return (
    <header className="bg-[#0F0F23] shadow-sm border-b border-gray-900">
      <div className="flex justify-between py-4 px-3">
        <div className="flex justify-center gap-2">
          <div className="text-4xl">
            <svg className="text-[#FF4444] size-12" fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
              <path clip-rule="evenodd" d="M24 4H6V17.3333V30.6667H24V44H42V30.6667V17.3333H24V4Z" fill="currentColor" fill-rule="evenodd"></path>
            </svg>
          </div>
          <h2 className="text-white font-bold text-4xl">Jarvis</h2>
        </div>
        <div className="flex justify-center gap-2">
          <div className="flex cursor-pointer items-center justify-center gap-2 rounded-xl bg-[#1A1B3A] px-4 py-2 text-sm font-bold tracking-[0.015em] transition-colors hover:bg-opacity-80">
            <Wallet size={24} className='text-[#00D2FF]' />
            <span className="truncate text-white">0x123...abc</span>
          </div>
          <div className="bg-center items-center bg-no-repeat aspect-square bg-cover rounded-full size-12">
            <User size={24} className='text-[#00D2FF] mt-2'/>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header