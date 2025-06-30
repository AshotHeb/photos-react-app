export interface Photo {
  id: number
  width: number
  height: number
  url: string
  photographer: string
  photographer_url: string
  photographer_id: number
  avg_color: string
  src: {
    original: string
    large2x: string
    large: string
    medium: string
    small: string
    portrait: string
    landscape: string
    tiny: string
  }
  liked: boolean
  alt: string
}

export interface PhotoResponse {
  page: number
  per_page: number
  photos: Photo[]
  total_results: number
  next_page?: string
  prev_page?: string
}

export interface SearchParams {
  query: string
  page?: number
  per_page?: number
  orientation?: 'landscape' | 'portrait' | 'square'
  size?: 'large' | 'medium' | 'small'
  color?: string
  locale?: string
}

export type LoadingState = 'idle' | 'loading' | 'success' | 'error'

export interface ApiError {
  message: string
  status?: number
  code?: string
  details?: unknown
}

export interface BaseState {
  loading: boolean
  error: string | null
}

export interface BaseActions {
  setLoading: (loading: boolean) => void
  setError: (error: string | null) => void
  clearError: () => void
  reset: () => void
}

export interface PhotoSetMap {
  [key: string]: MasonryLayout[]
}

export interface MasonryLayout {
  id: number
  column: number
  left: number
  top: number
  height: number
  width: number
  photo: {
    id: number
    src: string
    alt: string
    aspectRatio: number
  }
}

export interface VisibleSetsInfo {
  visibleSets: string[]
  currentSetIndex: number
  totalSets: number
  setHeight: number
}

export interface LayoutData {
  layouts: PhotoSetMap
  totalHeight: number
  containerWidth: number
  visibleSetsInfo: VisibleSetsInfo
}

export interface PhotoActions {
  // Photo data actions
  setPhotos: (photos: Photo[]) => void
  addPhotos: (newPhotos: Photo[]) => void
  clearPhotos: () => void
  setSelectedPhoto: (photo: Photo | null) => void
  updatePhoto: (photoId: number, updates: Partial<Photo>) => void
  removePhoto: (photoId: number) => void

  // Single photo actions
  setSinglePhoto: (photo: Photo | null) => void
  setSinglePhotoLoading: (loading: boolean) => void
  setSinglePhotoError: (error: string | null) => void
  fetchSinglePhoto: (id: number) => Promise<void>

  // Pagination actions
  setCurrentPage: (page: number) => void
  setHasMore: (hasMore: boolean) => void
  setTotalResults: (total: number) => void
  incrementPage: () => void

  // Search actions
  setSearchQuery: (query: string) => void
  clearSearch: () => void

  // Layout actions
  setLayoutData: (data: LayoutData) => void
  clearLayoutData: () => void
  setLayouts: (layouts: PhotoSetMap) => void
  setTotalHeight: (totalHeight: number) => void
  setContainerWidth: (containerWidth: number) => void
  setVisibleSetsInfo: (visibleSetsInfo: VisibleSetsInfo) => void

  // API response actions
  setPhotoResponse: (response: PhotoResponse) => void

  // API actions
  fetchPhotos: (params?: {
    perPage?: number
    loadMore?: boolean
  }) => Promise<void>

  // Helper functions (internal)
  _fetchPhotosFromApi: (
    page: number,
    perPage: number,
    errorMessage: string
  ) => Promise<void>
  _validateLoadMore: () => boolean
}

export type Store<T> = T & BaseState & BaseActions & PhotoActions
