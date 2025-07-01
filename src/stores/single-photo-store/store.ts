import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import type { SinglePhotoStore } from './types'
import { pexelsApi } from '@/api/services/pexels'

export const useSinglePhotoStore = create<SinglePhotoStore>()(
  devtools(
    (set, get) => ({
      photo: null,
      loading: false,
      error: null,

      setPhoto: (photo) => set({ photo }),
      setLoading: (loading) => set({ loading }),
      setError: (error) => set({ error }),
      clearError: () => set({ error: null }),
      reset: () =>
        set({
          photo: null,
          loading: false,
          error: null
        }),

      fetchPhoto: async (id: number) => {
        const { setLoading, setError, setPhoto } = get()

        try {
          setLoading(true)
          setError(null)
          const photoData = await pexelsApi.getPhotoById({ id })
          setPhoto(photoData)
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
