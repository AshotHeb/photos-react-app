import { useSinglePhotoStore as useSinglePhotoStoreBase } from './store'

export const useSinglePhoto = () =>
  useSinglePhotoStoreBase((state) => state.photo)
export const useSinglePhotoLoading = () =>
  useSinglePhotoStoreBase((state) => state.loading)
export const useSinglePhotoError = () =>
  useSinglePhotoStoreBase((state) => state.error)
export const useSinglePhotoActions = () =>
  useSinglePhotoStoreBase((state) => ({
    setPhoto: state.setPhoto,
    setLoading: state.setLoading,
    setError: state.setError,
    clearError: state.clearError,
    reset: state.reset,
    fetchPhoto: state.fetchPhoto
  }))

export const useSinglePhotoStoreData = () => {
  const photo = useSinglePhoto()
  const loading = useSinglePhotoLoading()
  const error = useSinglePhotoError()
  const actions = useSinglePhotoActions()

  return {
    photo,
    loading,
    error,
    ...actions
  }
}
