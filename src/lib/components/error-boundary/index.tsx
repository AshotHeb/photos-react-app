import { Component } from 'react'
import type { ErrorInfo, ReactNode } from 'react'
import * as Styled from './styled'

interface Props {
  children: ReactNode
  fallback?: ReactNode
  onError?: (error: Error, errorInfo: ErrorInfo) => void
}

interface State {
  hasError: boolean
  error?: Error
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error): State {
    // Update state so the next render will show the fallback UI
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Log the error to console in development
    if (process.env.NODE_ENV === 'development') {
      console.error('Error Boundary caught an error:', error, errorInfo)
    }

    // Call the onError callback if provided
    this.props.onError?.(error, errorInfo)

    // In production, you might want to log to an error reporting service
    // Example: Sentry.captureException(error, { extra: errorInfo })
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      if (this.props.fallback) {
        return this.props.fallback
      }

      return (
        <Styled.ErrorBoundaryContainer>
          <Styled.ErrorIcon>⚠️</Styled.ErrorIcon>
          <Styled.ErrorTitle>Something went wrong</Styled.ErrorTitle>
          <Styled.ErrorMessage>
            We're sorry, but something unexpected happened. Please try
            refreshing the page.
          </Styled.ErrorMessage>
          <Styled.RetryButton onClick={() => window.location.reload()}>
            Refresh Page
          </Styled.RetryButton>
          {process.env.NODE_ENV === 'development' && this.state.error && (
            <Styled.ErrorDetails>
              <details>
                <summary>Error Details (Development)</summary>
                <pre>{this.state.error.toString()}</pre>
              </details>
            </Styled.ErrorDetails>
          )}
        </Styled.ErrorBoundaryContainer>
      )
    }

    return this.props.children
  }
}
