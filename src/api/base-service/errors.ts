import type { ApiError } from './types'

// Base API Error Class
export class BaseApiError extends Error implements ApiError {
  public status?: number
  public code?: string
  public details?: unknown

  constructor(
    message: string,
    status?: number,
    code?: string,
    details?: unknown
  ) {
    super(message)
    this.name = this.constructor.name
    this.status = status
    this.code = code
    this.details = details

    // Maintains proper stack trace for where our error was thrown (only available on V8)
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor)
    }
  }
}

// Network Error - when request fails to reach the server
export class NetworkError extends BaseApiError {
  constructor(message = 'Network error occurred', details?: unknown) {
    super(message, 0, 'NETWORK_ERROR', details)
  }
}

// HTTP Error - when server responds with error status
export class HttpError extends BaseApiError {
  constructor(message: string, status: number, details?: unknown) {
    super(message, status, `HTTP_${status}`, details)
  }
}

// Timeout Error - when request times out
export class TimeoutError extends BaseApiError {
  constructor(message = 'Request timeout', timeout?: number) {
    super(message, 408, 'TIMEOUT_ERROR', { timeout })
  }
}

// Rate Limit Error - when API rate limit is exceeded
export class RateLimitError extends BaseApiError {
  constructor(message = 'Rate limit exceeded', retryAfter?: number) {
    super(message, 429, 'RATE_LIMIT_ERROR', { retryAfter })
  }
}

// Authentication Error - when API key is invalid or missing
export class AuthenticationError extends BaseApiError {
  constructor(message = 'Authentication failed', details?: unknown) {
    super(message, 401, 'AUTHENTICATION_ERROR', details)
  }
}

// Validation Error - when request parameters are invalid
export class ValidationError extends BaseApiError {
  constructor(message = 'Validation error', details?: unknown) {
    super(message, 400, 'VALIDATION_ERROR', details)
  }
}

// Server Error - when server returns 5xx errors
export class ServerError extends BaseApiError {
  constructor(
    message = 'Server error occurred',
    status = 500,
    details?: unknown
  ) {
    super(message, status, 'SERVER_ERROR', details)
  }
}

// Unknown Error - for unexpected errors
export class UnknownError extends BaseApiError {
  constructor(message = 'Unknown error occurred', details?: unknown) {
    super(message, 0, 'UNKNOWN_ERROR', details)
  }
}

// Error factory function
export function createApiError(
  error: unknown,
  defaultMessage = 'API error occurred'
): BaseApiError {
  if (error instanceof BaseApiError) {
    return error
  }

  if (error instanceof Error) {
    return new UnknownError(error.message, error)
  }

  if (typeof error === 'string') {
    return new UnknownError(error)
  }

  return new UnknownError(defaultMessage, error)
}

// Error type guard
export function isApiError(error: unknown): error is BaseApiError {
  return error instanceof BaseApiError
}

// Error retry logic
export function shouldRetry(
  error: BaseApiError,
  attempt: number,
  maxRetries: number
): boolean {
  if (attempt >= maxRetries) return false

  // Don't retry client errors (4xx) except rate limit
  if (error.status && error.status >= 400 && error.status < 500) {
    return error instanceof RateLimitError
  }

  // Retry server errors (5xx) and network errors
  return (
    error.status === undefined ||
    error.status >= 500 ||
    error instanceof NetworkError
  )
}
