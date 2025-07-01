import type { Photo } from '../photo-store/types'

export interface SinglePhotoState {
  photo: Photo | null
  loading: boolean
  error: string | null
}

export interface SinglePhotoActions {
  setPhoto: (photo: Photo | null) => void
  setLoading: (loading: boolean) => void
  setError: (error: string | null) => void
  clearError: () => void
  reset: () => void
  fetchPhoto: (id: number) => Promise<void>
}

export type SinglePhotoStore = SinglePhotoState & SinglePhotoActions
