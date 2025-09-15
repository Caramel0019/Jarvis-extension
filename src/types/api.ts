export interface ApiResponse<T = any> {
  success: boolean
  data: T
  message?: string
  error?: string
}

export interface ApiConfig {
  baseUrl: string
  apiKey: string
  timeout?: number
}