import { useState} from 'react'
import Header from './Header'
import Sidebar from './Sidebar'
import { useTheme } from './ThemeContext'
 
interface LayoutProps {  
  children: React.ReactNode
}

const Layout: React.FC<LayoutProps> = ({ children }) => {

  const { theme, toggleTheme, loading } = useTheme();
  
  if (loading) return null; // avoid flicker on load

  return ( 
    <div className="min-h-screen bg-gray-50"> 
      <Header />
      <div className="flex">
        <Sidebar />
        <main className={` flex-1 p-6 ${ theme === 'light' ? "bg-gray-100" : "bg-gray-900"} `}> 
          {children}
        </main>
      </div>
    </div>
  )
}

export default Layout