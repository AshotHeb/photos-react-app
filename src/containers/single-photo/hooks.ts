import { useEffect, useRef } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import {
  useSinglePhoto,
  useSinglePhotoLoading,
  useSinglePhotoError,
  useSinglePhotoStore
} from '@/stores/single-photo-store'

export const usePhotoData = () => {
  const { id } = useParams<{ id: string }>()
  const photo = useSinglePhoto()
  const loading = useSinglePhotoLoading()
  const error = useSinglePhotoError()
  const store = useSinglePhotoStore()
  const fetchPhotoRef = useRef(store.fetchPhoto)
  const lastFetchedId = useRef<string | null>(null)

  // Update ref when store changes
  useEffect(() => {
    fetchPhotoRef.current = store.fetchPhoto
  }, [store.fetchPhoto])

  useEffect(() => {
    if (!id || lastFetchedId.current === id) {
      return
    }

    lastFetchedId.current = id
    fetchPhotoRef.current(parseInt(id))
  }, [id])

  return {
    photo,
    loading,
    error
  }
}

export const useNavigation = () => {
  const navigate = useNavigate()

  const handleBackClick = () => {
    navigate('/photos')
  }

  return {
    handleBackClick
  }
}
