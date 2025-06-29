import { useCallback, useRef, useEffect } from 'react'
import {
  usePhotoFetchPhotos,
  usePhotoHasMore,
  usePhotoPhotos
} from '@/stores/photo-store'

export const useLoadMore = () => {
  const fetchPhotos = usePhotoFetchPhotos()
  const hasMore = usePhotoHasMore()
  const photos = usePhotoPhotos()
  const fetchPhotosRef = useRef(fetchPhotos)
  const isLoadingRef = useRef(false)
  const hasTriggeredRef = useRef(false)
  const isInitializedRef = useRef(false)

  // Update ref when fetchPhotos changes
  useEffect(() => {
    fetchPhotosRef.current = fetchPhotos
  }, [fetchPhotos])

  const loadMore = useCallback(async () => {
    // Don't load more if:
    // 1. Already loading
    // 2. No more photos to load
    // 3. No photos exist yet (initial state)
    // 4. Already triggered in this session
    // 5. Component just mounted (prevent immediate trigger)
    if (
      isLoadingRef.current ||
      !hasMore ||
      photos.length === 0 ||
      hasTriggeredRef.current ||
      !isInitializedRef.current
    ) {
      return
    }

    isLoadingRef.current = true
    hasTriggeredRef.current = true

    try {
      await fetchPhotosRef.current({ loadMore: true })
    } finally {
      isLoadingRef.current = false
    }
  }, [hasMore, photos.length])

  // Reset trigger flag when photos change (new search or reset)
  useEffect(() => {
    hasTriggeredRef.current = false
  }, [photos.length])

  // Initialize after a short delay to prevent immediate triggering
  useEffect(() => {
    const timer = setTimeout(() => {
      isInitializedRef.current = true
    }, 100)

    return () => clearTimeout(timer)
  }, [])

  // Intersection Observer for infinite scroll
  useEffect(() => {
    const currentRef = observerRef.current

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries
        if (entry.isIntersecting && hasMore && photos.length > 0) {
          loadMore()
        }
      },
      {
        root: null,
        rootMargin: '2000px', // Start loading 2000px before reaching the bottom
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
  }, [loadMore, hasMore, photos.length])

  const observerRef = useRef<HTMLDivElement>(null)

  return {
    observerRef
  }
}
