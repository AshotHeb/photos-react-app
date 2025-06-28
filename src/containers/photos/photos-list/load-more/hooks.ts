import { useCallback, useRef, useEffect } from 'react'
import {
  usePhotoHasMore,
  usePhotoLoading,
  usePhotoCurrentPage,
  usePhotoIncrementPage,
  usePhotoFetchPhotos
} from '@/stores/photo-store'

export const useLoadMore = () => {
  const hasMore = usePhotoHasMore()
  const loading = usePhotoLoading()
  const currentPage = usePhotoCurrentPage()
  const incrementPage = usePhotoIncrementPage()
  const fetchPhotos = usePhotoFetchPhotos()

  const observerRef = useRef<HTMLDivElement>(null)

  const loadMore = useCallback(async () => {
    if (!hasMore || loading) return

    incrementPage()
    await fetchPhotos({ page: currentPage + 1, perPage: 20 })
  }, [hasMore, loading, incrementPage, fetchPhotos, currentPage])

  // Intersection Observer for infinite scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries
        if (entry.isIntersecting && hasMore && !loading) {
          loadMore()
        }
      },
      {
        root: null,
        rootMargin: '100px', // Start loading 100px before reaching the bottom
        threshold: 0.1
      }
    )

    if (observerRef.current) {
      observer.observe(observerRef.current)
    }

    return () => {
      if (observerRef.current) {
        observer.unobserve(observerRef.current)
      }
    }
  }, [hasMore, loading, loadMore])

  return {
    observerRef,
    hasMore,
    loading
  }
}
