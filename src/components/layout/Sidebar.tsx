import { useHashRouter } from '../../hooks/useHashRouter'
import { routes, Route } from '../../pages/main/router/routes'
import { motion } from 'framer-motion'
import { useTheme } from './ThemeContext'
import { LayoutDashboardIcon, ServerIcon, SettingsIcon, DollarSignIcon } from 'lucide-react'

const Sidebar: React.FC = () => {
  const { theme, toggleTheme, loading } = useTheme();
  const { currentRoute, navigate } = useHashRouter();

  if (loading) return null; // avoid flicker on load

  return (
    <aside
      className={`w-64 ${
        theme === 'light' ? 'bg-gray-100 border-gray-200' : 'bg-gray-900 border-gray-800'
      } shadow-sm border-r`}
    >
      <nav className="mt-8">
        <div className="px-4">
          {/* Sidebar Contents */}
          {routes
            .filter((route: Route) => route.title.toLowerCase() !== 'private')
            .map((route: Route) => (
              <motion.a
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                key={route.path}
                onClick={() => navigate(route.path)}
                className={`flex items-center gap-4 rounded-lg px-3 py-2 my-2 text-lg transition-colors hover:bg-opacity-80 cursor-pointer ${
                  currentRoute === route.path
                    ? ' bg-[#FF4444] font-semibold font-medium'
                    : ' font-medium'
                }`}
              >
                <div
                  className={`${
                    theme === 'light' ? 'text-black' : 'text-white'
                  }`}
                >
                  <span>
                    {route.title === 'Dashboard' && (
                      <LayoutDashboardIcon
                        size={18}
                        className={`${
                          theme === 'light' ? 'text-black' : 'text-white'
                        }`}
                      />
                    )}
                    {route.title === 'Deployments' && (
                      <ServerIcon
                        size={18}
                        className={`${
                          theme === 'light' ? 'text-black' : 'text-white'
                        }`}
                      />
                    )}
                    {route.title === 'Payments' && (
                      <DollarSignIcon
                        size={18}
                        className={`${
                          theme === 'light' ? 'text-black' : 'text-white'
                        }`}
                      />
                    )}
                    {route.title === 'Settings' && (
                      <SettingsIcon
                        size={18}
                        className={`${
                          theme === 'light' ? 'text-black' : 'text-white'
                        }`}
                      />
                    )}
                  </span>
                </div>
                <span className={`${theme === 'light' ? 'text-black' : 'text-white'}`}>
                  {route.title}
                </span>
              </motion.a>
            ))}
        </div>
      </nav>
    </aside>
  );
};

export default Sidebar;
