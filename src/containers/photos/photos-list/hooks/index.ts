import { useMemo, useEffect, useRef, useState, useCallback } from 'react'
import type { MasonryLayout } from '../types'
import type {
  UseMasonryLayoutProps,
  UseMasonryLayoutReturn,
  Photo
} from './types'
import { calculateMasonryLayout } from './utils'
import isEqual from 'lodash.isequal'
import { usePhotoPhotos } from '@/stores'

// Debounce utility
const useDebounce = (value: number, delay: number): number => {
  const [debouncedValue, setDebouncedValue] = useState(value)

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    return () => {
      clearTimeout(handler)
    }
  }, [value, delay])

  return debouncedValue
}

export const useMasonryLayout = ({
  gap = 20,
  debounceDelay = 150
}: UseMasonryLayoutProps): UseMasonryLayoutReturn => {
  const photos = usePhotoPhotos()
  const containerRef = useRef<HTMLDivElement>(null)
  const [containerWidth, setContainerWidth] = useState(0)
  const [layouts, setLayouts] = useState<MasonryLayout[]>([])
  const [totalHeight, setTotalHeight] = useState(0)

  // Track previous state for optimization
  const previousPhotosRef = useRef<Photo[]>([])
  const previousContainerWidthRef = useRef(0)
  const previousLayoutsRef = useRef<MasonryLayout[]>([])

  // Debounce width updates
  const debouncedWidth = useDebounce(containerWidth, debounceDelay)

  // Memoized calculation function to prevent recreation
  const calculateLayouts = useCallback(() => {
    const previousPhotos = previousPhotosRef.current
    const previousWidth = previousContainerWidthRef.current
    const previousLayouts = previousLayoutsRef.current

    return calculateMasonryLayout(
      photos,
      debouncedWidth,
      gap,
      previousLayouts,
      previousPhotos,
      previousWidth
    )
  }, [photos, debouncedWidth, gap])

  // Calculate layouts only when dependencies change
  const result = useMemo(() => {
    return calculateLayouts()
  }, [calculateLayouts])

  // Update layouts and track previous state only when result changes
  useEffect(() => {
    // Only update if result actually changed
    const layoutsChanged = !isEqual(result.layouts, layouts)
    const heightChanged = result.totalHeight !== totalHeight

    if (layoutsChanged || heightChanged) {
      setLayouts(result.layouts)
      setTotalHeight(result.totalHeight)
      previousLayoutsRef.current = result.layouts
    }

    previousPhotosRef.current = photos
    previousContainerWidthRef.current = debouncedWidth
  }, [
    result.layouts,
    result.totalHeight,
    layouts,
    totalHeight,
    photos,
    debouncedWidth
  ])

  // Handle resize events
  useEffect(() => {
    const updateWidth = () => {
      if (containerRef.current) {
        const newWidth = containerRef.current.clientWidth
        setContainerWidth((prevWidth) => {
          return prevWidth !== newWidth ? newWidth : prevWidth
        })
      }
    }

    updateWidth()
    window.addEventListener('resize', updateWidth, { passive: true })
    return () => window.removeEventListener('resize', updateWidth)
  }, [])

  return {
    layouts,
    totalHeight,
    containerRef,
    containerWidth: debouncedWidth
  }
}
