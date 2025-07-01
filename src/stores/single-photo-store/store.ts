import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import type { SinglePhotoStore } from './types'
import type { Photo } from '../photo-store/types'
import { pexelsApi } from '@/api/services/pexels'

export const useSinglePhotoStore = create<SinglePhotoStore>()(
  devtools(
    (set, get) => ({
      photo: null,
      loading: false,
      error: null,
      cache: new Map(),

      setPhoto: (photo) => set({ photo }),
      setLoading: (loading) => set({ loading }),
      setError: (error) => set({ error }),
      clearError: () => set({ error: null }),
      reset: () =>
        set({
          photo: null,
          loading: false,
          error: null,
          cache: new Map()
        }),

      addToCache: (photo: Photo) =>
        set((state) => {
          const newCache = new Map(state.cache)
          newCache.set(photo.id, photo)
          return { cache: newCache }
        }),
      getFromCache: (id: number) => {
        const { cache } = get()
        return cache.get(id) || null
      },
      clearCache: () => set({ cache: new Map() }),

      fetchPhoto: async (id: number) => {
        const { setLoading, setError, setPhoto, getFromCache, addToCache } =
          get()

        // Check if photo is already in cache
        const cachedPhoto = getFromCache(id)
        if (cachedPhoto) {
          setPhoto(cachedPhoto)
          return
        }

        try {
          setLoading(true)
          setError(null)
          const photoData = await pexelsApi.getPhotoById({ id })
          setPhoto(photoData)
          addToCache(photoData)
        } catch (err) {
          setError('Failed to load photo. Please try again.')
          console.error('Error fetching photo:', err)
        } finally {
          setLoading(false)
        }
      }
    }),
    {
      name: 'single-photo-store'
    }
  )
)
