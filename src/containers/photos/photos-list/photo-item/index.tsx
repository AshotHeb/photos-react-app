import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import * as Styled from './styled'
import type { PhotoItemProps } from '../types'
import { Skeleton } from '@/lib/components/skeleton'

export const PhotoItem: React.FC<PhotoItemProps> = React.memo(
  ({ id, src, alt, aspectRatio, transform, width }) => {
    const navigate = useNavigate()
    const [isImageLoaded, setIsImageLoaded] = useState(false)
    const [hasImageError, setHasImageError] = useState(false)

    const handlePhotoClick = () => {
      navigate(`/photos/${id}`)
    }

    const handleImageLoad = () => {
      setIsImageLoaded(true)
    }

    const handleImageError = () => {
      setHasImageError(true)
      setIsImageLoaded(true) // Stop showing skeleton even on error
    }

    return (
      <Styled.MasonryItem style={{ width, transform }}>
        <Styled.PhotoItemWrapper onClick={handlePhotoClick}>
          {!isImageLoaded && (
            <Skeleton
              width={width}
              height={width * aspectRatio}
              borderRadius="8px"
            />
          )}
          <Styled.PhotoImage
            src={src}
            alt={alt}
            loading="lazy"
            $aspectRatio={aspectRatio}
            $isLoaded={isImageLoaded}
            onLoad={handleImageLoad}
            onError={handleImageError}
          />
          {isImageLoaded && !hasImageError && (
            <Styled.PhotoOverlay>
              <Styled.ViewDetailsText>View Details</Styled.ViewDetailsText>
            </Styled.PhotoOverlay>
          )}
        </Styled.PhotoItemWrapper>
      </Styled.MasonryItem>
    )
  }
)

PhotoItem.displayName = 'PhotoItem'
