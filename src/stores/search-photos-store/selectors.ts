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
