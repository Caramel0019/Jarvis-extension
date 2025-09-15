export const STORAGE_KEYS = {
  IS_ENABLED: 'isEnabled',
  SETTINGS: 'settings',
  STATS: 'stats',
  USER_DATA: 'userData',
} as const

export const ROUTES = {
  HOME: 'home',
  DEPLOYMENTS: 'deployments',
  SETTINGS: 'settings',
  PROFILE: 'profile',
  DASHBOARD: 'dashboard',
} as const

export const API_ENDPOINTS = {
  DEPLOYMENTS: '/api/deployments',
  STATS: '/api/stats',
  USER: '/api/user',
} as const