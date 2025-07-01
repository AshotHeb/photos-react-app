import { useSearchPhotosStore as useSearchPhotosStoreBase } from './store'

// State selectors
export const useSearchQuery = () =>
  useSearchPhotosStoreBase((state) => state.query)

export const useSearchResults = () =>
  useSearchPhotosStoreBase((state) => state.results)

export const useIsSearching = () =>
  useSearchPhotosStoreBase((state) => state.isLoading)

export const useSearchError = () =>
  useSearchPhotosStoreBase((state) => state.error)

export const useSearchPagination = () =>
  useSearchPhotosStoreBase((state) => ({
    currentPage: state.currentPage,
    hasMore: state.hasMore,
    totalResults: state.totalResults
  }))

export const useSearchFilters = () =>
  useSearchPhotosStoreBase((state) => ({
    orientation: state.orientation,
    size: state.size,
    color: state.color,
    locale: state.locale
  }))

// Action selectors
export const useSearchActions = () =>
  useSearchPhotosStoreBase((state) => ({
    setSearchQuery: state.setQuery,
    clearSearchQuery: state.clearQuery,
    searchPhotos: state.searchPhotos,
    loadMoreSearchResults: state.loadMore,
    resetSearch: state.reset
  }))

export const useSearchFilterActions = () =>
  useSearchPhotosStoreBase((state) => ({
    setOrientation: state.setOrientation,
    setSize: state.setSize,
    setColor: state.setColor,
    setLocale: state.setLocale
  }))

// Individual action selectors
export const useSetSearchQuery = () =>
  useSearchPhotosStoreBase((state) => state.setQuery)

export const useClearSearchQuery = () =>
  useSearchPhotosStoreBase((state) => state.clearQuery)

export const useSearchPhotos = () =>
  useSearchPhotosStoreBase((state) => state.searchPhotos)

export const useLoadMoreSearchResults = () =>
  useSearchPhotosStoreBase((state) => state.loadMore)

export const useResetSearch = () =>
  useSearchPhotosStoreBase((state) => state.reset)

// Computed selectors
export const useIsSearchActive = () =>
  useSearchPhotosStoreBase((state) => state.query.trim().length > 0)

export const useHasSearchResults = () =>
  useSearchPhotosStoreBase((state) => state.results.length > 0)

export const useSearchResultsCount = () =>
  useSearchPhotosStoreBase((state) => state.results.length)

// Layout selectors
export const useSearchLayoutData = () =>
  useSearchPhotosStoreBase((state) => state.layoutData)
export const useSetSearchLayoutData = () =>
  useSearchPhotosStoreBase((state) => state.setLayoutData)
export const useClearSearchLayoutData = () =>
  useSearchPhotosStoreBase((state) => state.clearLayoutData)
export const useHasSearchLayoutData = () =>
  useSearchPhotosStoreBase((state) => !!state.layoutData)

// Separate layout selectors with stable references
export const useSearchLayouts = () =>
  useSearchPhotosStoreBase((state) => state.layoutData?.layouts ?? {})
export const useSearchTotalHeight = () =>
  useSearchPhotosStoreBase((state) => state.layoutData?.totalHeight ?? 0)
export const useSearchContainerWidth = () =>
  useSearchPhotosStoreBase((state) => state.layoutData?.containerWidth ?? 0)
export const useSearchVisibleSetsInfo = () =>
  useSearchPhotosStoreBase(
    (state) =>
      state.layoutData?.visibleSetsInfo ?? {
        visibleSets: [],
        currentSetIndex: 0,
        totalSets: 0,
        setHeight: 0
      }
  )
export const useSearchScrollTop = () =>
  useSearchPhotosStoreBase((state) => state.layoutData?.scrollTop ?? 0)

// Separate layout action selectors
export const useSetSearchLayouts = () =>
  useSearchPhotosStoreBase((state) => state.setLayouts)
export const useSetSearchTotalHeight = () =>
  useSearchPhotosStoreBase((state) => state.setTotalHeight)
export const useSetSearchContainerWidth = () =>
  useSearchPhotosStoreBase((state) => state.setContainerWidth)
export const useSetSearchVisibleSetsInfo = () =>
  useSearchPhotosStoreBase((state) => state.setVisibleSetsInfo)
export const useSetSearchScrollTop = () =>
  useSearchPhotosStoreBase((state) => state.setScrollTop)

// Combined selector for common use cases
export const useSearchState = () =>
  useSearchPhotosStoreBase((state) => ({
    // State
    searchQuery: state.query,
    searchResults: state.results,
    isSearching: state.isLoading,
    searchError: state.error,
    currentPage: state.currentPage,
    hasMore: state.hasMore,
    totalResults: state.totalResults,

    // Computed
    isSearchActive: state.query.trim().length > 0,
    hasResults: state.results.length > 0,
    resultsCount: state.results.length,

    // Actions
    setSearchQuery: state.setQuery,
    clearSearchQuery: state.clearQuery,
    searchPhotos: state.searchPhotos,
    loadMoreSearchResults: state.loadMore,
    resetSearch: state.reset
  }))
