import type { ApiResponse, RequestConfig, IApiService } from './types'
import {
  BaseApiError,
  HttpError,
  TimeoutError,
  RateLimitError,
  AuthenticationError,
  createApiError,
  shouldRetry
} from './errors'

export abstract class BaseApiService implements IApiService {
  protected baseURL: string
  protected defaultHeaders: Record<string, string>
  protected defaultTimeout: number
  protected defaultRetries: number
  protected defaultRetryDelay: number

  constructor(
    baseURL: string,
    defaultHeaders: Record<string, string> = {},
    defaultTimeout = 10000,
    defaultRetries = 3,
    defaultRetryDelay = 1000
  ) {
    this.baseURL = baseURL
    this.defaultHeaders = defaultHeaders
    this.defaultTimeout = defaultTimeout
    this.defaultRetries = defaultRetries
    this.defaultRetryDelay = defaultRetryDelay
  }

  async get<T>(url: string, config?: RequestConfig): Promise<ApiResponse<T>> {
    return this.request<T>(url, 'GET', undefined, config)
  }

  async post<T>(
    url: string,
    data?: unknown,
    config?: RequestConfig
  ): Promise<ApiResponse<T>> {
    return this.request<T>(url, 'POST', data, config)
  }

  async put<T>(
    url: string,
    data?: unknown,
    config?: RequestConfig
  ): Promise<ApiResponse<T>> {
    return this.request<T>(url, 'PUT', data, config)
  }

  async delete<T>(
    url: string,
    config?: RequestConfig
  ): Promise<ApiResponse<T>> {
    return this.request<T>(url, 'DELETE', undefined, config)
  }

  protected async request<T>(
    url: string,
    method: string,
    data?: unknown,
    config?: RequestConfig
  ): Promise<ApiResponse<T>> {
    const fullUrl = this.buildUrl(url)
    const requestConfig = this.mergeConfig(config)
    const headers = this.buildHeaders(requestConfig.headers)

    let lastError: BaseApiError

    for (let attempt = 0; attempt <= requestConfig.retries!; attempt++) {
      try {
        const controller = new AbortController()
        const timeoutId = setTimeout(
          () => controller.abort(),
          requestConfig.timeout
        )

        const response = await fetch(fullUrl, {
          method,
          headers,
          body: data ? JSON.stringify(data) : undefined,
          signal: controller.signal
        })

        clearTimeout(timeoutId)

        if (!response.ok) {
          throw this.handleHttpError(response)
        }

        const responseData = await this.parseResponse<T>(response)

        return {
          data: responseData,
          status: response.status,
          headers: response.headers
        }
      } catch (error) {
        lastError = createApiError(error)

        // Handle specific error types
        if (error instanceof Error && error.name === 'AbortError') {
          lastError = new TimeoutError('Request timeout', requestConfig.timeout)
        }

        // Check if we should retry
        if (!shouldRetry(lastError, attempt, requestConfig.retries!)) {
          throw lastError
        }

        // Wait before retrying (exponential backoff)
        if (attempt < requestConfig.retries!) {
          const delay = requestConfig.retryDelay! * Math.pow(2, attempt)
          await this.delay(delay)
        }
      }
    }

    throw lastError!
  }

  protected buildUrl(url: string): string {
    if (url.startsWith('http')) {
      return url
    }
    return `${this.baseURL}${url.startsWith('/') ? url : `/${url}`}`
  }

  protected mergeConfig(config?: RequestConfig): Required<RequestConfig> {
    return {
      headers: { ...this.defaultHeaders, ...config?.headers },
      timeout: config?.timeout ?? this.defaultTimeout,
      retries: config?.retries ?? this.defaultRetries,
      retryDelay: config?.retryDelay ?? this.defaultRetryDelay
    }
  }

  protected buildHeaders(customHeaders?: Record<string, string>): HeadersInit {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      ...this.defaultHeaders,
      ...customHeaders
    }

    // Remove undefined values
    Object.keys(headers).forEach((key) => {
      if (headers[key] === undefined) {
        delete headers[key]
      }
    })

    return headers
  }

  protected async parseResponse<T>(response: Response): Promise<T> {
    const contentType = response.headers.get('content-type')

    if (contentType?.includes('application/json')) {
      return response.json()
    }

    if (contentType?.includes('text/')) {
      return response.text() as T
    }

    return response.blob() as T
  }

  protected handleHttpError(response: Response): BaseApiError {
    const status = response.status
    const message = `HTTP ${status}`

    switch (status) {
      case 400:
        return new HttpError('Bad request', status)
      case 401:
        return new AuthenticationError('Authentication failed')
      case 403:
        return new HttpError('Forbidden', status)
      case 404:
        return new HttpError('Resource not found', status)
      case 429: {
        const retryAfter = response.headers.get('Retry-After')
        return new RateLimitError(
          'Rate limit exceeded',
          retryAfter ? parseInt(retryAfter) : undefined
        )
      }
      case 500:
        return new HttpError('Internal server error', status)
      case 502:
        return new HttpError('Bad gateway', status)
      case 503:
        return new HttpError('Service unavailable', status)
      case 504:
        return new HttpError('Gateway timeout', status)
      default:
        if (status >= 500) {
          return new HttpError('Server error', status)
        }
        return new HttpError(message, status)
    }
  }

  protected delay(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms))
  }

  // Utility methods for building query parameters
  protected buildQueryParams(
    params: Record<string, string | number | boolean | undefined>
  ): string {
    const searchParams = new URLSearchParams()

    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        searchParams.append(key, String(value))
      }
    })

    const queryString = searchParams.toString()
    return queryString ? `?${queryString}` : ''
  }

  // Method to validate required environment variables
  protected validateEnvironment(requiredVars: Record<string, string>): void {
    const missing: string[] = []

    Object.entries(requiredVars).forEach(([name, value]) => {
      if (!value) {
        missing.push(name)
      }
    })

    if (missing.length > 0) {
      throw new Error(
        `Missing required environment variables: ${missing.join(', ')}`
      )
    }
  }
}
