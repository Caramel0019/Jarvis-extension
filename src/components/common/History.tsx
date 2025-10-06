import { motion } from "framer-motion"
import { useTheme } from '@/components/layout/ThemeContext'
import { Server, RefreshCw, Trash2Icon } from 'lucide-react'

export const History = () => {

    const { theme, toggleTheme, loading } = useTheme();
    if (loading) return null; // avoid flicker on load
  return (
    <div>
        {/* Recent Activities  */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }} 
              className={`glassmorphism-card ${ theme === 'light'? "border-black/10 text-black bg-indigo-100 opacity-20" : "border-white/10 text-white bg-gray-900 opacity-5"} overflow-hidden rounded-xl border shadow-lg`}
            >
              <div className="flex flex-col">
                <div className={`flex items-center gap-4 border-b border-white/10 ${ theme === 'light' ? 'border-black/10 hover:bg-black/5' : 'border-white/10 hover:bg-white/5'} p-4 transition-colors `}>
                  <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-lg ${ theme === 'light' ? 'bg-gray-400' : 'bg-[#1A1B3A]'}  text-[#00D2FF]`}>
                    <Server size={26} className='text-[#00D2FF]'/>
                  </div>
                  <div className="flex-grow">
                    <p className={`text-base font-medium ${ theme === 'light' ? "text-black" : "text-white"}`}>Deployment #123</p>
                    <p className="text-sm text-gray-400">Deployment created successfully</p>
                  </div>
                  <div className="text-sm text-gray-500">2 min ago</div>
                </div>
                <div className={`flex items-center gap-4 border-b border-white/10 ${ theme === 'light' ? 'border-black/10 hover:bg-black/5' : 'border-white/10 hover:bg-white/5'} p-4 transition-colors `}>
                  <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-lg ${ theme === 'light' ? 'bg-gray-400' : 'bg-[#1A1B3A]'}  text-[#00D2FF]`}>
                    <RefreshCw size={26} className='text-[#00D2FF]'/>
                  </div>
                  <div className="flex-grow">
                    <p className={`text-base font-medium ${ theme === 'light' ? "text-black" : "text-white"}`}>Deployment #456</p>
                    <p className="text-sm text-gray-400">Deployment updated</p>
                  </div>
                  <div className="text-sm text-gray-500">1 hour ago</div>
                </div>
                <div className={`flex items-center gap-4 border-b border-white/10 ${ theme === 'light' ? 'border-black/10 hover:bg-black/5' : 'border-white/10 hover:bg-white/5'} p-4 transition-colors `}>
                  <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-lg ${ theme === 'light' ? 'bg-gray-400' : 'bg-[#1A1B3A]'}  text-[#00D2FF]`}>
                    <Trash2Icon size={26} className='text-red-500'/>
                  </div>
                  <div className="flex-grow">
                    <p className={`text-base font-medium ${ theme === 'light' ? "text-black" : "text-white"}`}>Deployment #789</p>
                    <p className="text-sm text-gray-400">Deployment deleted</p>
                  </div>
                  <div className="text-sm text-gray-500">1 day ago</div>
                </div>
              </div>
            </motion.div>
    </div>
  )
}
