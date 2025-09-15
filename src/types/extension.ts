export interface ExtensionState {
  isEnabled: boolean
  settings: {
    apiEndpoint: string
    apiKey: string
    notifications: boolean
  }
  stats: {
    active: number
    pending: number
    failed?: number
  }
}

export interface Deployment {
  id: string
  name: string
  status: 'active' | 'building' | 'failed' | 'pending'
  version: string
  createdAt: Date
  updatedAt: Date
}
