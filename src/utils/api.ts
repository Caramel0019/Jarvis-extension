import { ApiConfig, ApiResponse } from '../types/api'

export class ApiClient {
  private config: ApiConfig

  constructor(config: ApiConfig) {
    this.config = config
  }

  async get<T>(endpoint: string): Promise<ApiResponse<T>> {
    return this.request<T>('GET', endpoint)
  }

  async post<T>(endpoint: string, data?: any): Promise<ApiResponse<T>> {
    return this.request<T>('POST', endpoint, data)
  }

  async put<T>(endpoint: string, data?: any): Promise<ApiResponse<T>> {
    return this.request<T>('PUT', endpoint, data)
  }

  async delete<T>(endpoint: string): Promise<ApiResponse<T>> {
    return this.request<T>('DELETE', endpoint)
  }

  private async request<T>(
    method: string,
    endpoint: string,
    data?: any
  ): Promise<ApiResponse<T>> {
    try {
      const response = await fetch(`${this.config.baseUrl}${endpoint}`, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.config.apiKey}`,
        },
        body: data ? JSON.stringify(data) : undefined,
      })

      const responseData = await response.json()

      if (!response.ok) {
        return {
          success: false,
          data: null as T,
          error: responseData.message || 'Request failed',
        }
      }

      return {
        success: true,
        data: responseData,
      }
    } catch (error) {
      return {
        success: false,
        data: null as T,
        error: error instanceof Error ? error.message : 'Unknown error',
      }
    }
  }
}