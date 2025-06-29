import React from 'react'
import * as Styled from './styled'
import type { PhotoItemProps } from '../types'

export const PhotoItem: React.FC<PhotoItemProps> = React.memo(
  ({ src, alt, aspectRatio, transform, width }) => {
    return (
      <Styled.MasonryItem style={{ width, transform }}>
        <Styled.PhotoItemWrapper>
          <Styled.PhotoImage
            src={src}
            alt={alt}
            loading="lazy"
            $aspectRatio={aspectRatio}
          />
        </Styled.PhotoItemWrapper>
      </Styled.MasonryItem>
    )
  }
)

PhotoItem.displayName = 'PhotoItem'
