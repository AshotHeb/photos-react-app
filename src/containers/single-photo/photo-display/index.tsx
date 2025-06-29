import React from 'react'
import { PhotoSection, PhotoWrapper, PhotoImage } from '../styled'
import type { PhotoDisplayProps } from '../types'

export const PhotoDisplay: React.FC<PhotoDisplayProps> = ({ photo }) => {
  return (
    <PhotoSection>
      <PhotoWrapper>
        <PhotoImage
          src={photo.src.large}
          alt={photo.alt || 'Photo'}
          loading="eager"
        />
      </PhotoWrapper>
    </PhotoSection>
  )
}
