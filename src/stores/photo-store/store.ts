import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import type {
  Photo,
  Store,
  PhotoResponse,
  LayoutData,
  PhotoSetMap,
  VisibleSetsInfo
} from './types'
import { pexelsApi } from '@/api/services/pexels'

interface PhotoState {
  loading: boolean
  error: string | null

  photos: Photo[]

  singlePhoto: Photo | null
  singlePhotoLoading: boolean
  singlePhotoError: string | null

  currentPage: number
  hasMore: boolean
  totalResults: number

  searchQuery: string
  perPage: number

  // Layout state
  layoutData: LayoutData | null
}

export const usePhotoStore = create<Store<PhotoState>>()(
  devtools(
    (set, get) => ({
      loading: false,
      error: null,

      photos: [],
      selectedPhoto: null,
      singlePhoto: null,
      singlePhotoLoading: false,
      singlePhotoError: null,
      currentPage: 1,
      hasMore: false,
      totalResults: 0,
      searchQuery: '',
      perPage: 20,

      // Layout state
      layoutData: null,

      // Base actions
      setLoading: (loading) => set({ loading }),
      setError: (error) => set({ error }),
      clearError: () => set({ error: null }),
      reset: () =>
        set({
          loading: false,
          error: null,
          photos: [],
          singlePhoto: null,
          singlePhotoLoading: false,
          singlePhotoError: null,
          currentPage: 1,
          hasMore: false,
          totalResults: 0,
          searchQuery: '',
          perPage: 20,
          layoutData: null
        }),

      // Photo actions
      setPhotos: (photos: Photo[]) => set({ photos }),
      addPhotos: (newPhotos: Photo[]) => {
        const { photos } = get()
        set({ photos: [...photos, ...newPhotos] })
      },
      clearPhotos: () => set({ photos: [], currentPage: 1, hasMore: false }),

      // Single photo actions
      setSinglePhoto: (photo: Photo | null) => set({ singlePhoto: photo }),
      setSinglePhotoLoading: (loading: boolean) =>
        set({ singlePhotoLoading: loading }),
      setSinglePhotoError: (error: string | null) =>
        set({ singlePhotoError: error }),
      fetchSinglePhoto: async (id: number) => {
        const { setSinglePhotoLoading, setSinglePhotoError, setSinglePhoto } =
          get()

        try {
          setSinglePhotoLoading(true)
          setSinglePhotoError(null)
          const photoData = await pexelsApi.getPhotoById({ id })
          setSinglePhoto(photoData)
        } catch (err) {
          setSinglePhotoError('Failed to load photo. Please try again.')
          console.error('Error fetching photo:', err)
        } finally {
          setSinglePhotoLoading(false)
        }
      },

      // Pagination actions
      setCurrentPage: (page: number) => set({ currentPage: page }),
      setHasMore: (hasMore: boolean) => set({ hasMore }),
      setTotalResults: (total: number) => set({ totalResults: total }),
      incrementPage: () => {
        const { currentPage } = get()
        set({ currentPage: currentPage + 1 })
      },

      // Search actions
      setSearchQuery: (query: string) => set({ searchQuery: query }),
      clearSearch: () => set({ searchQuery: '', currentPage: 1 }),

      // API response handling
      setPhotoResponse: (response: PhotoResponse) => {
        const { photos: existingPhotos, currentPage } = get()
        const newPhotos =
          currentPage === 1
            ? response.photos
            : [...existingPhotos, ...response.photos]

        set({
          photos: newPhotos,
          totalResults: response.total_results,
          hasMore: !!response.next_page
        })
      },

      // Utility actions
      updatePhoto: (photoId: number, updates: Partial<Photo>) => {
        const { photos } = get()
        const updatedPhotos = photos.map((photo) =>
          photo.id === photoId ? { ...photo, ...updates } : photo
        )
        set({ photos: updatedPhotos })
      },

      removePhoto: (photoId: number) => {
        const { photos } = get()
        const filteredPhotos = photos.filter((photo) => photo.id !== photoId)
        set({ photos: filteredPhotos })
      },

      _fetchPhotosFromApi: async (
        page: number,
        perPage: number,
        errorMessage: string
      ) => {
        const { setLoading, setError, setPhotoResponse } = get()

        try {
          setLoading(true)
          setError(null)

          const response = await pexelsApi.getCuratedPhotos({
            page,
            perPage
          })

          setPhotoResponse(response)
        } catch (error) {
          setError(error instanceof Error ? error.message : errorMessage)
        } finally {
          setLoading(false)
        }
      },

      _validateLoadMore: () => {
        const { hasMore, loading } = get()
        return hasMore && !loading
      },

      // API actions
      fetchPhotos: async (params: { loadMore?: boolean } = {}) => {
        const {
          _fetchPhotosFromApi,
          _validateLoadMore,
          setCurrentPage,
          perPage
        } = get()
        const { loadMore = false } = params

        // Handle load more scenario
        if (loadMore) {
          if (!_validateLoadMore()) return

          const { currentPage } = get()
          const nextPage = currentPage + 1

          setCurrentPage(nextPage)
          await _fetchPhotosFromApi(
            nextPage,
            perPage,
            'Failed to load more photos'
          )
          return
        }

        await _fetchPhotosFromApi(1, perPage, 'Failed to fetch photos')
      },

      // Layout actions
      setLayoutData: (data: LayoutData) =>
        set({ layoutData: data }, false, 'setLayoutData'),
      clearLayoutData: () =>
        set({ layoutData: null }, false, 'clearLayoutData'),

      // Separate layout actions
      setLayouts: (layouts: PhotoSetMap) =>
        set(
          (state) => ({
            layoutData: state.layoutData
              ? { ...state.layoutData, layouts }
              : {
                  layouts,
                  totalHeight: 0,
                  containerWidth: 0,
                  visibleSetsInfo: {
                    visibleSets: [],
                    currentSetIndex: 0,
                    totalSets: 0,
                    setHeight: 0
                  },
                  scrollTop: 0
                }
          }),
          false,
          'setLayouts'
        ),
      setTotalHeight: (totalHeight: number) =>
        set(
          (state) => ({
            layoutData: state.layoutData
              ? { ...state.layoutData, totalHeight }
              : {
                  layouts: {},
                  totalHeight,
                  containerWidth: 0,
                  visibleSetsInfo: {
                    visibleSets: [],
                    currentSetIndex: 0,
                    totalSets: 0,
                    setHeight: 0
                  },
                  scrollTop: 0
                }
          }),
          false,
          'setTotalHeight'
        ),
      setContainerWidth: (containerWidth: number) =>
        set(
          (state) => ({
            layoutData: state.layoutData
              ? { ...state.layoutData, containerWidth }
              : {
                  layouts: {},
                  totalHeight: 0,
                  containerWidth,
                  visibleSetsInfo: {
                    visibleSets: [],
                    currentSetIndex: 0,
                    totalSets: 0,
                    setHeight: 0
                  },
                  scrollTop: 0
                }
          }),
          false,
          'setContainerWidth'
        ),
      setVisibleSetsInfo: (visibleSetsInfo: VisibleSetsInfo) =>
        set(
          (state) => ({
            layoutData: state.layoutData
              ? { ...state.layoutData, visibleSetsInfo }
              : {
                  layouts: {},
                  totalHeight: 0,
                  containerWidth: 0,
                  visibleSetsInfo,
                  scrollTop: 0
                }
          }),
          false,
          'setVisibleSetsInfo'
        ),
      setScrollTop: (scrollTop: number) =>
        set(
          (state) => ({
            layoutData: state.layoutData
              ? { ...state.layoutData, scrollTop }
              : {
                  layouts: {},
                  totalHeight: 0,
                  containerWidth: 0,
                  visibleSetsInfo: {
                    visibleSets: [],
                    currentSetIndex: 0,
                    totalSets: 0,
                    setHeight: 0
                  },
                  scrollTop
                }
          }),
          false,
          'setScrollTop'
        )
    }),
    {
      name: 'photo-store'
    }
  )
)
