import React from 'react'
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
    <Styled.PhotosGrid>
      {photos.map((photo) => (
        <div key={photo.id}>
          <img src={photo.src.medium} alt={photo.alt} />
        </div>
      ))}
    </Styled.PhotosGrid>
  )
})
