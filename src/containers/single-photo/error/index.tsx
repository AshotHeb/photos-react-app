import React from 'react'
import { ErrorContainer, ErrorIcon, ErrorText, BackButton } from '../styled'
import type { ErrorDisplayProps } from '../types'

export const Error: React.FC<ErrorDisplayProps> = ({ error, onBackClick }) => {
  return (
    <ErrorContainer>
      <ErrorIcon>⚠️</ErrorIcon>
      <ErrorText>{error || 'Photo not found'}</ErrorText>
      <BackButton onClick={onBackClick}>← Back to Photos</BackButton>
    </ErrorContainer>
  )
}
