import React from 'react'
import * as Styled from './styled'
import type { PhotoItemProps } from './types'

export const PhotoItem: React.FC<PhotoItemProps> = React.memo(
  ({ id, src, alt, aspectRatio }) => {
    return (
      <Styled.MasonryItem key={`photo-${id}`}>
        <Styled.PhotoImage
          src={src}
          alt={alt}
          loading="lazy"
          $aspectRatio={aspectRatio}
        />
      </Styled.MasonryItem>
    )
  }
)

PhotoItem.displayName = 'PhotoItem'
