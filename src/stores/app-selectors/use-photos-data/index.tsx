import { useMemo } from 'react'
import {
  useLayouts,
  useContainerWidth,
  useTotalHeight,
  usePhotoPhotos,
  useSetLayouts,
  useSetContainerWidth,
  useSetTotalHeight,
  useSetVisibleSetsInfo,
  useSearchQuery,
  useSearchResults,
  useSearchLayouts,
  useSearchContainerWidth,
  useSearchTotalHeight,
  useSetSearchVisibleSetsInfo,
  useSetSearchContainerWidth,
  useSetSearchTotalHeight,
  useSetSearchLayouts
} from '@/stores'

export const usePhotosData = () => {
  const hasSearchQuery = !!useSearchQuery()

  // All Photos
  const photos = usePhotoPhotos()
  const layouts = useLayouts()
  const totalHeight = useTotalHeight()
  const containerWidth = useContainerWidth()

  const setLayouts = useSetLayouts()
  const setTotalHeight = useSetTotalHeight()
  const setContainerWidth = useSetContainerWidth()
  const setVisibleSetsInfo = useSetVisibleSetsInfo()

  // // Search Photos
  const searchResults = useSearchResults()
  const searchLayouts = useSearchLayouts()
  const searchTotalHeight = useSearchTotalHeight()
  const searchContainerWidth = useSearchContainerWidth()
  const setSearchLayouts = useSetSearchLayouts()
  const setSearchTotalHeight = useSetSearchTotalHeight()
  const setSearchContainerWidth = useSetSearchContainerWidth()
  const setSearchVisibleSetsInfo = useSetSearchVisibleSetsInfo()

  const searchData = useMemo(
    () => ({
      photos: searchResults,
      layouts: searchLayouts,
      totalHeight: searchTotalHeight,
      containerWidth: searchContainerWidth,
      setLayouts: setSearchLayouts,
      setTotalHeight: setSearchTotalHeight,
      setContainerWidth: setSearchContainerWidth,
      setVisibleSetsInfo: setSearchVisibleSetsInfo
    }),
    [
      searchResults,
      searchLayouts,
      searchTotalHeight,
      searchContainerWidth,
      setSearchLayouts,
      setSearchTotalHeight,
      setSearchContainerWidth,
      setSearchVisibleSetsInfo
    ]
  )

  const photoData = useMemo(
    () => ({
      photos,
      layouts,
      totalHeight,
      containerWidth,
      setLayouts,
      setTotalHeight,
      setContainerWidth,
      setVisibleSetsInfo
    }),
    [
      photos,
      layouts,
      totalHeight,
      containerWidth,
      setLayouts,
      setTotalHeight,
      setContainerWidth,
      setVisibleSetsInfo
    ]
  )

  if (hasSearchQuery) {
    return searchData
  }

  return photoData
}
