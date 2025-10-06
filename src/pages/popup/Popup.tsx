import Overview from './Overview'
import { ThemeProvider } from '@/components/layout/ThemeContext'
import { CheckAuth } from '@/hooks/checkAuth'
import { AuthProvider } from '@/hooks/AuthContext'

const Popup = () => {
  return (
    <div>
      <CheckAuth>
        {(logout) => (
          <AuthProvider logout={logout}> 
            <ThemeProvider>
              <Overview/> 
           </ThemeProvider>
          </AuthProvider>
        )}
      </CheckAuth>
    </div> 
  )
}

export default Popup