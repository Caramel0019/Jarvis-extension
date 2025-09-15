import React from 'react'
import { useHashRouter } from '../../hooks/useHashRouter'
import { routes, Route } from '../../pages/main/router/routes'
import { HomeIcon, ServerIcon, SettingsIcon, User2Icon } from 'lucide-react'

const Sidebar: React.FC = () => {
  const { currentRoute, navigate } = useHashRouter()

  return (
    <aside className="w-64 bg-[#0F0F23] shadow-sm border-r border-gray-900">
      <nav className="mt-8">
        <div className="px-4">
          {routes.map((route: Route) => (
            <a
              key={route.path}
              onClick={() => navigate(route.path)}
              className={`flex items-center gap-4 rounded-lg px-3 py-2 text-lg transition-colors hover:bg-opacity-80 cursor-pointer ${
                currentRoute === route.path
                  ? ' bg-[#FF4444] font-semibold  text-white font-medium'
                  : 'text-white hover:bg-[#0F0F23]'
              }`}
            >
              <span>
                {route.title === 'Home' && <HomeIcon size={20} className='text-white'/>}
                {route.title === 'Deployments' && <ServerIcon size={20} className='text-white'/>}
                {route.title === 'Settings' && <SettingsIcon size={20} className='text-white'/>}
                {route.title === 'Profile' && <User2Icon size={20} className='text-white'/>}
              </span>
              {route.title}
            </a>
          ))}
        </div>
      </nav>
    </aside>
  )
}

export default Sidebar