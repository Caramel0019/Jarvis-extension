import React from 'react'
import { useHashRouter } from '../../hooks/useHashRouter'
import { routes, Route } from '../../pages/main/router/routes'
import { motion } from 'framer-motion'
import { HomeIcon, ServerIcon, SettingsIcon, DollarSignIcon} from 'lucide-react'

const Sidebar: React.FC = () => {
  const { currentRoute, navigate } = useHashRouter()

  return (
    <aside className="w-64 bg-[#0F0F23] shadow-sm border-r border-gray-900">
      <nav className="mt-8">
        <div className="px-4">
          {routes.map((route: Route) => ( 
            <motion.a
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              key={route.path}
              onClick={() => navigate(route.path)}
              className={`flex items-center gap-4 rounded-lg px-3 py-2 my-2 text-lg transition-colors hover:bg-opacity-80 cursor-pointer ${
                currentRoute === route.path
                  ? ' bg-[#FF4444] font-semibold  text-white font-medium'
                  : 'text-white hover:bg-[#0F0F23]'
              }`}
            >
              <span>
                {route.title === 'Home' && <HomeIcon size={18} className='text-white'/>}
                {route.title === 'Deployments' && <ServerIcon size={18} className='text-white'/>}
                {route.title === 'Settings' && <SettingsIcon size={18} className='text-white'/>}
                {route.title === 'Payments' && <DollarSignIcon size={18} className='text-white'/>}
              </span>
              {route.title}
            </motion.a>
          ))}
        </div>
      </nav>
    </aside>
  )
}

export default Sidebar