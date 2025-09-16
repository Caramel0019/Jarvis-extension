import React from 'react'
import Home from '../pages/Home'
import Deployments from '../pages/Deployments'
import Settings from '../pages/Settings'
import History from '../pages/History'

export interface Route {
  path: string
  component: React.ComponentType
  title: string
}

export const routes: Route[] = [
  { path: 'home', component: Home, title: 'Home' },
  { path: 'deployments', component: Deployments, title: 'Deployments' },
  { path: 'history', component: History, title: 'history' },
  { path: 'settings', component: Settings, title: 'Settings' },
]