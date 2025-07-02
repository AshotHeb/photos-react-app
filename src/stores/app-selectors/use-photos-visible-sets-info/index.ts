import {
  useSearchVisibleSetsInfo,
  useVisibleSetsInfo as usePhotoVisibleSetsInfo,
  useSetSearchVisibleSetsInfo,
  useSetVisibleSetsInfo
} from '@/stores'
import type { VisibleSetsInfo } from '@/stores/photo-store/types'
import { useSearchQuery } from '@/stores'
import { useMemo } from 'react'

export const usePhotosVisibleSetsInfo = (): {
  visibleSetsInfo: VisibleSetsInfo
  setVisibleSetsInfo: ReturnType<typeof useSetVisibleSetsInfo>
} => {
  const hasSearchQuery = !!useSearchQuery()

  // All Photos
  const searchVisibleSetsInfo = useSearchVisibleSetsInfo()
  const visibleSetsInfo = usePhotoVisibleSetsInfo()

  // Search
  const setVisibleSetsInfo = useSetVisibleSetsInfo()
  const setSearchVisibleSetsInfo = useSetSearchVisibleSetsInfo()

  const searchData = useMemo(
    () => ({
      visibleSetsInfo: searchVisibleSetsInfo,
      setVisibleSetsInfo: setSearchVisibleSetsInfo
    }),
    [searchVisibleSetsInfo, setSearchVisibleSetsInfo]
  )

  const photoData = useMemo(
    () => ({
      visibleSetsInfo,
      setVisibleSetsInfo
    }),
    [visibleSetsInfo, setVisibleSetsInfo]
  )

  if (hasSearchQuery) {
    return searchData
  }

  return photoData
}
