import { usePhotoStore as usePhotoStoreBase } from './store'

// Stable default values to prevent infinite loops
const EMPTY_LAYOUTS = {}
const DEFAULT_VISIBLE_SETS_INFO = {
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
export const usePhotoSelected = () =>
  usePhotoStoreBase((state) => state.selectedPhoto)
export const usePhotoCurrentPage = () =>
  usePhotoStoreBase((state) => state.currentPage)
export const usePhotoHasMore = () => usePhotoStoreBase((state) => state.hasMore)
export const usePhotoTotalResults = () =>
  usePhotoStoreBase((state) => state.totalResults)
export const usePhotoSearchQuery = () =>
  usePhotoStoreBase((state) => state.searchQuery)
export const usePhotoPerPage = () => usePhotoStoreBase((state) => state.perPage)

// Single photo selectors
export const useSinglePhoto = () =>
  usePhotoStoreBase((state) => state.singlePhoto)
export const useSinglePhotoLoading = () =>
  usePhotoStoreBase((state) => state.singlePhotoLoading)
export const useSinglePhotoError = () =>
  usePhotoStoreBase((state) => state.singlePhotoError)
export const useSinglePhotoActions = () =>
  usePhotoStoreBase((state) => ({
    setSinglePhoto: state.setSinglePhoto,
    setSinglePhotoLoading: state.setSinglePhotoLoading,
    setSinglePhotoError: state.setSinglePhotoError,
    fetchSinglePhoto: state.fetchSinglePhoto
  }))

export const usePhotoPagination = () =>
  usePhotoStoreBase((state) => ({
    currentPage: state.currentPage,
    hasMore: state.hasMore,
    totalResults: state.totalResults
  }))

export const usePhotoSearch = () =>
  usePhotoStoreBase((state) => ({
    searchQuery: state.searchQuery,
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
export const usePhotoSetSelected = () =>
  usePhotoStoreBase((state) => state.setSelectedPhoto)
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

export const usePhotoSetSearchQuery = () =>
  usePhotoStoreBase((state) => state.setSearchQuery)
export const usePhotoClearSearch = () =>
  usePhotoStoreBase((state) => state.clearSearch)

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

export const usePhotoSearchActions = () =>
  usePhotoStoreBase((state) => ({
    setSearchQuery: state.setSearchQuery,
    clearSearch: state.clearSearch
  }))

export const usePhotoStore = () => {
  const loading = usePhotoLoading()
  const error = usePhotoError()
  const photos = usePhotoPhotos()
  const selectedPhoto = usePhotoSelected()
  const currentPage = usePhotoCurrentPage()
  const hasMore = usePhotoHasMore()
  const totalResults = usePhotoTotalResults()
  const searchQuery = usePhotoSearchQuery()
  const actions = usePhotoStoreActions()

  return {
    loading,
    error,
    photos,
    selectedPhoto,
    currentPage,
    hasMore,
    totalResults,
    searchQuery,
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

// Separate layout action selectors
export const useSetLayouts = () =>
  usePhotoStoreBase((state) => state.setLayouts)
export const useSetTotalHeight = () =>
  usePhotoStoreBase((state) => state.setTotalHeight)
export const useSetContainerWidth = () =>
  usePhotoStoreBase((state) => state.setContainerWidth)
export const useSetVisibleSetsInfo = () =>
  usePhotoStoreBase((state) => state.setVisibleSetsInfo)
