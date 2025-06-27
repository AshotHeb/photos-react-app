import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import type { Photo, Store, PhotoResponse } from './types'

interface PhotoState {
  photos: Photo[]
  selectedPhoto: Photo | null

  currentPage: number
  hasMore: boolean
  totalResults: number

  searchQuery: string
}

export const usePhotoStore = create<Store<PhotoState>>()(
  devtools(
    (set, get) => ({
      loading: false,
      error: null,

      photos: [],
      selectedPhoto: null,
      currentPage: 1,
      hasMore: false,
      totalResults: 0,
      searchQuery: '',

      // Base actions
      setLoading: (loading) => set({ loading }),
      setError: (error) => set({ error }),
      clearError: () => set({ error: null }),
      reset: () =>
        set({
          loading: false,
          error: null,
          photos: [],
          selectedPhoto: null,
          currentPage: 1,
          hasMore: false,
          totalResults: 0,
          searchQuery: ''
        }),

      // Photo actions
      setPhotos: (photos: Photo[]) => set({ photos }),
      addPhotos: (newPhotos: Photo[]) => {
        const { photos } = get()
        set({ photos: [...photos, ...newPhotos] })
      },
      clearPhotos: () => set({ photos: [], currentPage: 1, hasMore: false }),

      setSelectedPhoto: (photo: Photo | null) => set({ selectedPhoto: photo }),

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

      // Photo interaction actions
      togglePhotoLike: (photoId: number) => {
        const { photos } = get()
        const updatedPhotos = photos.map((photo) =>
          photo.id === photoId ? { ...photo, liked: !photo.liked } : photo
        )
        set({ photos: updatedPhotos })
      },

      // API response handling
      setPhotoResponse: (response: PhotoResponse) => {
        const { photos: existingPhotos, currentPage } = get()
        const newPhotos =
          currentPage === 1
            ? response.photos
            : [...existingPhotos, ...response.photos]

        set({
          photos: newPhotos,
          currentPage: response.page,
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
      }
    }),
    {
      name: 'photo-store'
    }
  )
)
