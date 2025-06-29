import React from 'react'
import * as Styled from './styled'
import type { PhotoItemProps } from '../types'

export const PhotoItem: React.FC<PhotoItemProps> = React.memo(
  ({ src, alt, aspectRatio }) => {
    return (
      <Styled.PhotoItemWrapper>
        <Styled.PhotoImage
          src={src}
          alt={alt}
          loading="lazy"
          $aspectRatio={aspectRatio}
        />
      </Styled.PhotoItemWrapper>
    )
  }
)

PhotoItem.displayName = 'PhotoItem'
