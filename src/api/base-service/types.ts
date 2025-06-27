// API Error Types
export interface ApiError {
  message: string
  status?: number
  code?: string
  details?: unknown
}

export interface ApiResponse<T = unknown> {
  data: T
  status: number
  headers: Headers
}

// Request Configuration
export interface RequestConfig {
  headers?: Record<string, string>
  timeout?: number
  retries?: number
  retryDelay?: number
}

// API Service Interface
export interface IApiService {
  get<T>(url: string, config?: RequestConfig): Promise<ApiResponse<T>>
  post<T>(
    url: string,
    data?: unknown,
    config?: RequestConfig
  ): Promise<ApiResponse<T>>
  put<T>(
    url: string,
    data?: unknown,
    config?: RequestConfig
  ): Promise<ApiResponse<T>>
  delete<T>(url: string, config?: RequestConfig): Promise<ApiResponse<T>>
}
