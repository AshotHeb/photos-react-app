import { usePhotoStore as usePhotoStoreBase } from './store'

// Stable default values to prevent infinite loops
export const EMPTY_LAYOUTS = {}
export const DEFAULT_VISIBLE_SETS_INFO = {
  visibleSets: [],
  currentSetIndex: 0,
  totalSets: 0,
  setHeight: 0
}

export const usePhotoLoading = () => usePhotoStoreBase((state) => state.loading)
export const usePhotoError = () => usePhotoStoreBase((state) => state.error)
export const usePhotoPhotos = () => usePhotoStoreBase((state) => state.photos)
export const useIsPhotosEmpty = () =>
  usePhotoStoreBase((state) => state.photos.length === 0)

export const usePhotoCurrentPage = () =>
  usePhotoStoreBase((state) => state.currentPage)
export const usePhotoHasMore = () => usePhotoStoreBase((state) => state.hasMore)
export const usePhotoTotalResults = () =>
  usePhotoStoreBase((state) => state.totalResults)

export const usePhotoPerPage = () => usePhotoStoreBase((state) => state.perPage)

export const usePhotoPagination = () =>
  usePhotoStoreBase((state) => ({
    currentPage: state.currentPage,
    hasMore: state.hasMore,
    totalResults: state.totalResults
  }))

export const usePhotoStoreActions = () =>
  usePhotoStoreBase((state) => ({
    setLoading: state.setLoading,
    setError: state.setError,
    clearError: state.clearError,
    reset: state.reset
  }))

export const usePhotoSetLoading = () =>
  usePhotoStoreBase((state) => state.setLoading)
export const usePhotoSetError = () =>
  usePhotoStoreBase((state) => state.setError)
export const usePhotoClearError = () =>
  usePhotoStoreBase((state) => state.clearError)
export const usePhotoReset = () => usePhotoStoreBase((state) => state.reset)

export const usePhotoSetPhotos = () =>
  usePhotoStoreBase((state) => state.setPhotos)
export const usePhotoAddPhotos = () =>
  usePhotoStoreBase((state) => state.addPhotos)
export const usePhotoClearPhotos = () =>
  usePhotoStoreBase((state) => state.clearPhotos)
export const usePhotoUpdate = () =>
  usePhotoStoreBase((state) => state.updatePhoto)
export const usePhotoRemove = () =>
  usePhotoStoreBase((state) => state.removePhoto)

export const usePhotoSetCurrentPage = () =>
  usePhotoStoreBase((state) => state.setCurrentPage)
export const usePhotoSetHasMore = () =>
  usePhotoStoreBase((state) => state.setHasMore)
export const usePhotoSetTotalResults = () =>
  usePhotoStoreBase((state) => state.setTotalResults)
export const usePhotoIncrementPage = () =>
  usePhotoStoreBase((state) => state.incrementPage)

export const usePhotoSetResponse = () =>
  usePhotoStoreBase((state) => state.setPhotoResponse)

export const usePhotoFetchPhotos = () =>
  usePhotoStoreBase((state) => state.fetchPhotos)

export const usePhotoDataActions = () =>
  usePhotoStoreBase((state) => ({
    setPhotos: state.setPhotos,
    addPhotos: state.addPhotos,
    clearPhotos: state.clearPhotos,
    setSelectedPhoto: state.setSelectedPhoto,
    updatePhoto: state.updatePhoto,
    removePhoto: state.removePhoto
  }))

export const usePhotoPaginationActions = () =>
  usePhotoStoreBase((state) => ({
    setCurrentPage: state.setCurrentPage,
    setHasMore: state.setHasMore,
    setTotalResults: state.setTotalResults,
    incrementPage: state.incrementPage
  }))

export const usePhotoStore = () => {
  const loading = usePhotoLoading()
  const error = usePhotoError()
  const photos = usePhotoPhotos()
  const currentPage = usePhotoCurrentPage()
  const hasMore = usePhotoHasMore()
  const totalResults = usePhotoTotalResults()
  const actions = usePhotoStoreActions()

  return {
    loading,
    error,
    photos,
    currentPage,
    hasMore,
    totalResults,
    ...actions
  }
}

// Layout selectors
export const useLayoutData = () =>
  usePhotoStoreBase((state) => state.layoutData)
export const useSetLayoutData = () =>
  usePhotoStoreBase((state) => state.setLayoutData)
export const useClearLayoutData = () =>
  usePhotoStoreBase((state) => state.clearLayoutData)
export const useHasLayoutData = () =>
  usePhotoStoreBase((state) => !!state.layoutData)

// Separate layout selectors with stable references
export const useLayouts = () =>
  usePhotoStoreBase((state) => state.layoutData?.layouts ?? EMPTY_LAYOUTS)
export const useTotalHeight = () =>
  usePhotoStoreBase((state) => state.layoutData?.totalHeight ?? 0)
export const useContainerWidth = () =>
  usePhotoStoreBase((state) => state.layoutData?.containerWidth ?? 0)
export const useVisibleSetsInfo = () =>
  usePhotoStoreBase(
    (state) => state.layoutData?.visibleSetsInfo ?? DEFAULT_VISIBLE_SETS_INFO
  )
export const useScrollTop = () =>
  usePhotoStoreBase((state) => state.layoutData?.scrollTop ?? 0)

// Separate layout action selectors
export const useSetLayouts = () =>
  usePhotoStoreBase((state) => state.setLayouts)
export const useSetTotalHeight = () =>
  usePhotoStoreBase((state) => state.setTotalHeight)
export const useSetContainerWidth = () =>
  usePhotoStoreBase((state) => state.setContainerWidth)
export const useSetVisibleSetsInfo = () =>
  usePhotoStoreBase((state) => state.setVisibleSetsInfo)
export const useSetScrollTop = () =>
  usePhotoStoreBase((state) => state.setScrollTop)
