import React from 'react'
import Layout from '../../components/layout/Layout'
import Router from './router/Router'
import ErrorBoundary from '../../components/common/ErrorBoundary'

const App: React.FC = () => {
  return (
    <ErrorBoundary>
      <Layout>
        <Router />
      </Layout>
    </ErrorBoundary>
  )
}

export default App