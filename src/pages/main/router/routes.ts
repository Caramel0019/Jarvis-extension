import React from 'react'
import Dashboard from '../pages/Dashboard'
import Deployments from '../pages/Deployments'
import Settings from '../pages/Settings'
import Payments from '../pages/Payments'
import Private from '../pages/Private'


export interface Route {
  path: string
  component: React.ComponentType
  title: string 
}

export const routes: Route[] = [ 
  { path: 'dashboard', component: Dashboard, title: 'Dashboard' },
  { path: 'deployments', component: Deployments, title: 'Deployments' },
  { path: 'payments', component: Payments, title: 'Payments' },
  { path: 'settings', component: Settings, title: 'Settings' },
  { path: 'private', component: Private, title: 'Private' },
]