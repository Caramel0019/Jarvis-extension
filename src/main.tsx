import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './pages/main/App'
import './styles/globals.css'
import { CheckAuth } from './hooks/checkAuth'
import { AuthProvider } from './hooks/AuthContext'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <CheckAuth>
      {(logout) => (
        <AuthProvider logout={logout}> 
          <App />
        </AuthProvider>
      )}
    </CheckAuth>
  </React.StrictMode>, 
)