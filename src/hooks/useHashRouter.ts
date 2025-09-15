import { useState, useEffect } from 'react'

export const useHashRouter = () => {
  const [currentRoute, setCurrentRoute] = useState(
    window.location.hash.slice(1) || 'home'
  )

  useEffect(() => {
    const handleHashChange = () => {
      setCurrentRoute(window.location.hash.slice(1) || 'home')
    }

    window.addEventListener('hashchange', handleHashChange)
    return () => window.removeEventListener('hashchange', handleHashChange)
  }, [])

  const navigate = (route: string) => {
    window.location.hash = route
  }

  return { currentRoute, navigate }
}