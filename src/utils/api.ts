import { API_BASE_URL, HTTP_STATUS } from './constants';
import { AuthStorage } from './storage';
import type { ApiResponse, ApiError } from '../types/api';

// HTTP requests
export class ApiClient {
  private baseUrl: string;

  constructor(baseUrl: string = API_BASE_URL) {
    this.baseUrl = baseUrl;
  }

  // Get auth headers
  private async getAuthHeaders(): Promise<Record<string, string>> {
    const token = await AuthStorage.getToken();
    return token ? { Authorization: `Bearer ${token}` } : {};
  }

  // Make HTTP request
  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    try {
      const url = endpoint.startsWith('http') ? endpoint : `${this.baseUrl}${endpoint}`;
      
      const authHeaders = await this.getAuthHeaders();
      
      const response = await fetch(url, {
        ...options,
        headers: {
          'Content-Type': 'application/json',
          ...authHeaders,
          ...options.headers,
        },
      });

      if (!response.ok) {
        const errorData: ApiError = await response.json().catch(() => ({
          error: `HTTP ${response.status}: ${response.statusText}`,
        }));
        
        return {
          error: errorData.error,
        };
      }

      const data: T = await response.json();
      return {
        data,
      };
    } catch (error) {
      console.error('API Request failed:', error);
      return {
        error: error instanceof Error ? error.message : 'Network error',
      };
    }
  }

  // GET request
  async get<T>(endpoint: string): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: 'GET',
    });
  }

  // POST request
  async post<T>(endpoint: string, data?: any): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: 'POST',
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  // POST request with FormData (for file uploads)
  async postFormData<T>(endpoint: string, formData: FormData): Promise<ApiResponse<T>> {
    const authHeaders = await this.getAuthHeaders();
    
    try {
      const url = endpoint.startsWith('http') ? endpoint : `${this.baseUrl}${endpoint}`;
      
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          ...authHeaders,
        },
        body: formData,
      });

      if (!response.ok) {
        const errorData: ApiError = await response.json().catch(() => ({
          error: `HTTP ${response.status}: ${response.statusText}`,
        }));
        
        return {
          error: errorData.error,
        };
      }

      const data: T = await response.json();
      return {
        data,
      };
    } catch (error) {
      console.error('API FormData Request failed:', error);
      return {
        error: error instanceof Error ? error.message : 'Network error',
      };
    }
  }

  // PUT request
  async put<T>(endpoint: string, data?: any): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: 'PUT',
      body: data ? JSON.stringify(data) : undefined, 
    });
  }

  // DELETE request
  async delete<T>(endpoint: string): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: 'DELETE',
    });
  }
}

// Default API client instance
export const apiClient = new ApiClient();

// Helper functions for common API operations
export const apiHelpers = {
  // Check if response has error
  hasError: <T>(response: ApiResponse<T>): response is ApiResponse<T> & { error: string } => {
    return !!response.error;
  },

  // Get data from response or throw error
  getData: <T>(response: ApiResponse<T>): T => {
    if (apiHelpers.hasError(response)) {
      throw new Error(response.error);
    }
    if (!response.data) {
      throw new Error('No data in response');
    }
    return response.data;
  },

  // Handle API response with error logging
  handleResponse: <T>(response: ApiResponse<T>): T | null => {
    if (apiHelpers.hasError(response)) {
      console.error('API Error:', response.error);
      return null;
    }
    return response.data || null;
  },
};