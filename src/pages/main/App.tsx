import React from 'react'
import Layout from '../../components/layout/Layout'
import Router from './router/Router'
import ErrorBoundary from '../../components/common/ErrorBoundary'
import { ThemeProvider } from '@/components/layout/ThemeContext'

const App: React.FC = () => {
  return (
    <ErrorBoundary>
      <ThemeProvider>
        <Layout>
          <Router />
        </Layout>
      </ThemeProvider> 
    </ErrorBoundary>
  )
}

export default App