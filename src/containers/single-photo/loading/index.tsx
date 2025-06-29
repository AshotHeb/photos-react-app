import React from 'react'
import { LoadingSpinner, Spinner, LoadingText } from '../styled'

export const Loading: React.FC = () => {
  return (
    <LoadingSpinner>
      <Spinner />
      <LoadingText>Loading photo...</LoadingText>
    </LoadingSpinner>
  )
}
