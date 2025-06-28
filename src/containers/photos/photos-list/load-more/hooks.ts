import { useCallback, useRef, useEffect } from 'react'
import { usePhotoFetchPhotos } from '@/stores/photo-store'

export const useLoadMore = () => {
  const fetchPhotos = usePhotoFetchPhotos()

  const observerRef = useRef<HTMLDivElement>(null)

  const loadMore = useCallback(async () => {
    await fetchPhotos({ loadMore: true, perPage: 20 })
  }, [fetchPhotos])

  // Intersection Observer for infinite scroll
  useEffect(() => {
    const currentRef = observerRef.current
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries
        if (entry.isIntersecting) {
          loadMore()
        }
      },
      {
        root: null,
        rootMargin: '100px', // Start loading 100px before reaching the bottom
        threshold: 0.1
      }
    )

    if (currentRef) {
      observer.observe(currentRef)
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef)
      }
    }
  }, [loadMore])

  return {
    observerRef
  }
}
