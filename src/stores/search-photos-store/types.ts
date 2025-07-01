import type { Photo } from '@/stores/photo-store/types'

export interface SearchState {
  // Query state
  query: string
  results: Photo[]
  isLoading: boolean
  error: string | null

  // Pagination
  currentPage: number
  hasMore: boolean
  totalResults: number

  // Filters
  orientation: 'landscape' | 'portrait' | 'square' | null
  size: 'large' | 'medium' | 'small' | null
  color: string | null
  locale: string | null
}

export interface SearchActions {
  // Query actions
  setQuery: (query: string) => void
  clearQuery: () => void

  // Execution actions
  searchPhotos: (query: string) => Promise<void>
  loadMore: () => Promise<void>

  // Results actions
  setResults: (results: Photo[]) => void
  addResults: (results: Photo[]) => void
  clearResults: () => void

  // State actions
  setLoading: (isLoading: boolean) => void
  setError: (error: string | null) => void

  // Pagination actions
  setCurrentPage: (page: number) => void
  setHasMore: (hasMore: boolean) => void
  setTotalResults: (total: number) => void

  // Filter actions
  setOrientation: (
    orientation: 'landscape' | 'portrait' | 'square' | null
  ) => void
  setSize: (size: 'large' | 'medium' | 'small' | null) => void
  setColor: (color: string | null) => void
  setLocale: (locale: string | null) => void

  // Reset actions
  reset: () => void

  // Internal actions
  _fetchResults: (page: number, perPage: number) => Promise<void>
}

export interface SearchStore extends SearchState, SearchActions {}

export interface SearchPhotosParams {
  query: string
  page?: number
  perPage?: number
  orientation?: 'landscape' | 'portrait' | 'square'
  size?: 'large' | 'medium' | 'small'
  color?: string
  locale?: string
}
