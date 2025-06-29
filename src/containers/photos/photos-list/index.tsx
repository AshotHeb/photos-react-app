import React, { useCallback, useEffect } from 'react'
import {
  usePhotoLoading,
  usePhotoError,
  usePhotoFetchPhotos
} from '@/stores/photo-store'
import { LoadMore } from './load-more'
import { PhotoItem } from './photo-item'
import { useMasonryLayout } from './hooks'
import * as Styled from './styled'
import type { PhotosListProps } from './types'
import { useIsPhotosEmpty } from '@/stores/photo-store/selectors'

export const PhotosList: React.FC<PhotosListProps> = React.memo(() => {
  const loading = usePhotoLoading()
  const error = usePhotoError()
  const fetchPhotos = usePhotoFetchPhotos()
  const emptyPhotos = useIsPhotosEmpty()

  // Use masonry layout hook
  const { layouts, totalHeight, containerRef, isCalculating } =
    useMasonryLayout({
      gap: 20
    })

  // Initial load
  useEffect(() => {
    if (emptyPhotos) {
      fetchPhotos()
    }
  }, [fetchPhotos, emptyPhotos])

  const handleRetry = useCallback(() => {
    fetchPhotos()
  }, [fetchPhotos])

  if ((loading || isCalculating) && emptyPhotos) {
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
      <Styled.MasonryContainer ref={containerRef}>
        <Styled.MasonryContent style={{ height: totalHeight }}>
          {layouts.map((layout) => {
            const transform = `translate3d(${layout.left}px, ${layout.top}px, 0)`

            return (
              <Styled.MasonryItem
                key={`photo-${layout.id}`}
                style={{ width: layout.width, transform }}
              >
                <PhotoItem
                  src={layout.photo.src}
                  alt={layout.photo.alt}
                  aspectRatio={layout.photo.aspectRatio}
                />
              </Styled.MasonryItem>
            )
          })}
        </Styled.MasonryContent>
      </Styled.MasonryContainer>

      <LoadMore isLoading={isCalculating || loading} />
    </>
  )
})
