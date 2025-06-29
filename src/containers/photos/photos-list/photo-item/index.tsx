import React from 'react'
import { useNavigate } from 'react-router-dom'
import * as Styled from './styled'
import type { PhotoItemProps } from '../types'

export const PhotoItem: React.FC<PhotoItemProps> = React.memo(
  ({ id, src, alt, aspectRatio, transform, width }) => {
    const navigate = useNavigate()

    const handlePhotoClick = () => {
      navigate(`/photos/${id}`)
    }

    return (
      <Styled.MasonryItem style={{ width, transform }}>
        <Styled.PhotoItemWrapper onClick={handlePhotoClick}>
          <Styled.PhotoImage
            src={src}
            alt={alt}
            loading="lazy"
            $aspectRatio={aspectRatio}
          />
          <Styled.PhotoOverlay>
            <Styled.ViewDetailsText>View Details</Styled.ViewDetailsText>
          </Styled.PhotoOverlay>
        </Styled.PhotoItemWrapper>
      </Styled.MasonryItem>
    )
  }
)

PhotoItem.displayName = 'PhotoItem'
