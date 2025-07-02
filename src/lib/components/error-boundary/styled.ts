import styled from 'styled-components'

export const ErrorBoundaryContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 60vh;
  padding: 2rem;
  text-align: center;
  background: white;
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  margin: 2rem;
`

export const ErrorIcon = styled.div`
  font-size: 3rem;
  margin-bottom: 1rem;
`

export const ErrorTitle = styled.h2`
  color: #ef4444;
  font-size: 1.5rem;
  font-weight: 600;
  margin: 0 0 1rem 0;
`

export const ErrorMessage = styled.p`
  color: #6b7280;
  font-size: 1rem;
  line-height: 1.5;
  margin: 0 0 2rem 0;
  max-width: 500px;
`

export const RetryButton = styled.button`
  padding: 0.75rem 1.5rem;
  background: #3b82f6;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: #2563eb;
    transform: translateY(-1px);
  }

  &:active {
    transform: translateY(0);
  }
`

export const ErrorDetails = styled.div`
  margin-top: 2rem;
  width: 100%;
  max-width: 600px;

  details {
    background: #f9fafb;
    border-radius: 8px;
    padding: 1rem;
    border: 1px solid #e5e7eb;
  }

  summary {
    cursor: pointer;
    font-weight: 500;
    color: #374151;
    margin-bottom: 0.5rem;
  }

  pre {
    background: #1f2937;
    color: #f9fafb;
    padding: 1rem;
    border-radius: 6px;
    font-size: 0.875rem;
    overflow-x: auto;
    white-space: pre-wrap;
    word-break: break-word;
  }
`
