import { useMemo } from 'react'
import {
  usePhotoFetchPhotos,
  usePhotoHasMore,
  usePhotoPhotos,
  useSearchQuery,
  useSearchResults,
  useSearchHasMore,
  useLoadMoreSearchResults
} from '@/stores'

export const usePhotosLoadMoreData = () => {
  const hasSearchQuery = !!useSearchQuery()

  // All Photos
  const photoFetchPhotos = usePhotoFetchPhotos()
  const photoHasMore = usePhotoHasMore()
  const photoPhotos = usePhotoPhotos()

  // Search Photos
  const searchResults = useSearchResults()
  const searchHasMore = useSearchHasMore()
  const searchLoadMore = useLoadMoreSearchResults()

  const searchData = useMemo(
    () => ({
      fetchPhotos: searchLoadMore,
      hasMore: searchHasMore,
      photos: searchResults
    }),
    [searchLoadMore, searchHasMore, searchResults]
  )

  const photoData = useMemo(
    () => ({
      fetchPhotos: photoFetchPhotos,
      hasMore: photoHasMore,
      photos: photoPhotos
    }),
    [photoFetchPhotos, photoHasMore, photoPhotos]
  )

  if (hasSearchQuery) {
    return searchData
  }

  return photoData
}
