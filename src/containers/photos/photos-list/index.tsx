import React, { useCallback, useMemo, useEffect } from 'react'
import {
  usePhotoPhotos,
  usePhotoLoading,
  usePhotoError,
  usePhotoFetchPhotos
} from '@/stores/photo-store'
import { LoadMore } from './load-more'
import * as Styled from './styled'
import type { PhotosListProps } from './types'

export const PhotosList: React.FC<PhotosListProps> = React.memo(() => {
  const photos = usePhotoPhotos()
  const loading = usePhotoLoading()
  const error = usePhotoError()
  const fetchPhotos = usePhotoFetchPhotos()
  const emptyPhotos = useMemo(() => photos.length === 0, [photos])

  // Initial load
  useEffect(() => {
    if (emptyPhotos) {
      fetchPhotos()
    }
  }, [fetchPhotos, emptyPhotos])

  const handleRetry = useCallback(() => {
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

  if (loading && emptyPhotos) {
    return (
      <Styled.LoadingContainer>
        <Styled.Spinner />
      </Styled.LoadingContainer>
    )
  }

  if (error && emptyPhotos) {
    return (
      <Styled.ErrorContainer>
        <p>Error: {error}</p>
        <button onClick={handleRetry}>Retry</button>
      </Styled.ErrorContainer>
    )
  }

  return (
    <>
      <Styled.MasonryGrid>
        {photoItems.map((photo) => (
          <Styled.MasonryItem key={`photo-${photo.id}`}>
            <Styled.PhotoImage
              src={photo.src}
              alt={photo.alt}
              loading="lazy"
              $aspectRatio={photo.aspectRatio}
            />
          </Styled.MasonryItem>
        ))}
      </Styled.MasonryGrid>

      <LoadMore />
    </>
  )
})
