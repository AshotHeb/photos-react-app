import React, { useMemo } from 'react'
import {
  usePhotoPhotos,
  usePhotoLoading,
  usePhotoError,
  usePhotoFetchPhotos
} from '@/stores/photo-store'
import * as Styled from './styled'
import type { PhotosListProps } from './types'

export const PhotosList: React.FC<PhotosListProps> = React.memo(() => {
  const photos = usePhotoPhotos()
  const loading = usePhotoLoading()
  const error = usePhotoError()
  const fetchPhotos = usePhotoFetchPhotos()

  React.useEffect(() => {
    fetchPhotos()
  }, [fetchPhotos])

  const photoItems = useMemo(
    () =>
      photos.map((photo) => ({
        id: photo.id,
        src: photo.src.medium,
        alt: photo.alt,
        width: photo.width,
        height: photo.height,
        aspectRatio: photo.height / photo.width
      })),
    [photos]
  )

  if (loading) {
    return (
      <Styled.LoadingContainer>
        <Styled.Spinner />
      </Styled.LoadingContainer>
    )
  }

  if (error) {
    return (
      <Styled.ErrorContainer>
        <p>Error: {error}</p>
        <button onClick={() => fetchPhotos()}>Retry</button>
      </Styled.ErrorContainer>
    )
  }

  return (
    <Styled.MasonryGrid>
      {photoItems.map((photo) => (
        <Styled.MasonryItem key={photo.id}>
          <Styled.PhotoImage
            src={photo.src}
            alt={photo.alt}
            loading="lazy"
            $aspectRatio={photo.aspectRatio}
          />
        </Styled.MasonryItem>
      ))}
    </Styled.MasonryGrid>
  )
})
