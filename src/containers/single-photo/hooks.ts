import { useEffect, useRef } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import {
  useSinglePhoto,
  useSinglePhotoLoading,
  useSinglePhotoError
} from '@/stores/photo-store/selectors'
import { usePhotoStore } from '@/stores/photo-store/store'

export const usePhotoData = () => {
  const { id } = useParams<{ id: string }>()
  const photo = useSinglePhoto()
  const loading = useSinglePhotoLoading()
  const error = useSinglePhotoError()
  const store = usePhotoStore()
  const fetchSinglePhotoRef = useRef(store.fetchSinglePhoto)

  // Update ref when store changes
  useEffect(() => {
    fetchSinglePhotoRef.current = store.fetchSinglePhoto
  }, [store.fetchSinglePhoto])

  useEffect(() => {
    if (!id) {
      return
    }
    fetchSinglePhotoRef.current(parseInt(id))
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
