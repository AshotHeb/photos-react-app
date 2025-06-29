import React, { useCallback, useEffect, useRef } from 'react'
import {
  usePhotoLoading,
  usePhotoError,
  usePhotoFetchPhotos
} from '@/stores/photo-store'
import { LoadMore } from './load-more'
import { PhotoItem } from './photo-item'
import { ScrollToTop } from './scroll-to-top'
import { useMasonryLayout } from './hooks'
import * as Styled from './styled'
import type { PhotosListProps } from './types'
import { useIsPhotosEmpty } from '@/stores/photo-store/selectors'

export const PhotosList: React.FC<PhotosListProps> = React.memo(() => {
  const loading = usePhotoLoading()
  const error = usePhotoError()
  const fetchPhotos = usePhotoFetchPhotos()
  const emptyPhotos = useIsPhotosEmpty()
  const hasInitialFetch = useRef(false)

  // Use masonry layout hook with viewport rendering
  const { layouts, totalHeight, containerRef, isCalculating } =
    useMasonryLayout({
      gap: 20
    })

  // Initial load - only fetch once when photos are empty
  useEffect(() => {
    if (emptyPhotos && !hasInitialFetch.current) {
      hasInitialFetch.current = true
      fetchPhotos()
    }
  }, [emptyPhotos])

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
              <PhotoItem
                key={`photo-${layout.id}`}
                id={layout.id}
                src={layout.photo.src}
                alt={layout.photo.alt}
                aspectRatio={layout.photo.aspectRatio}
                transform={transform}
                width={layout.width}
              />
            )
          })}
        </Styled.MasonryContent>
      </Styled.MasonryContainer>

      <LoadMore isLoading={loading} />

      {/* Scroll to top button */}
      <ScrollToTop threshold={500} smooth={true} />
    </>
  )
})
