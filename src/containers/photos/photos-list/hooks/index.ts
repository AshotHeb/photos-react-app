import { useEffect, useRef, useState, useCallback } from 'react'
import type {
  PhotoSetMap,
  UseMasonryLayoutProps,
  UseMasonryLayoutReturn,
  Photo
} from '../types'
import { useWorker } from './useWorker'
import { useVirtualizedRendering } from './useVirtualizedRendering'
import isEqual from 'lodash.isequal'
import { usePhotoPhotos } from '@/stores'
import { useDebounce } from '@/hooks/use-debounce'

export const useMasonryLayout = ({
  gap = 20,
  debounceDelay = 150
}: UseMasonryLayoutProps): UseMasonryLayoutReturn => {
  const photos = usePhotoPhotos()
  const containerRef = useRef<HTMLDivElement>(null)
  const [containerWidth, setContainerWidth] = useState(0)
  const [layouts, setLayouts] = useState<PhotoSetMap>({})
  const [totalHeight, setTotalHeight] = useState(0)
  const [isCalculating, setIsCalculating] = useState(false)

  // Track previous state for optimization
  const previousPhotosRef = useRef<Photo[]>([])
  const previousContainerWidthRef = useRef(0)
  const previousLayoutsRef = useRef<PhotoSetMap>({})

  // Debounce width updates
  const debouncedWidth = useDebounce(containerWidth, debounceDelay)
  const { calculateLayout } = useWorker()

  // Use viewport rendering
  const { visibleLayouts } = useVirtualizedRendering({
    layouts,
    totalHeight,
    bufferSets: 1
  })

  // Memoized calculation function using worker with fallback
  const calculateLayouts = useCallback(async () => {
    const previousPhotos = previousPhotosRef.current
    const previousWidth = previousContainerWidthRef.current
    const previousLayouts = previousLayoutsRef.current

    return calculateLayout({
      photos,
      containerWidth: debouncedWidth,
      gap,
      existingLayouts: previousLayouts,
      previousPhotos,
      previousWidth
    })
  }, [photos, debouncedWidth, gap, calculateLayout])

  // Handle async layout calculation
  useEffect(() => {
    let isMounted = true

    const performCalculation = async () => {
      setIsCalculating(true)

      try {
        const result = await calculateLayouts()

        if (!isMounted) return

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
      } catch (error) {
        console.error('Failed to calculate layout:', error)
      } finally {
        if (isMounted) {
          setIsCalculating(false)
        }
      }
    }

    performCalculation()

    return () => {
      isMounted = false
    }
  }, [calculateLayouts, layouts, totalHeight, photos, debouncedWidth])

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
    layouts: visibleLayouts, // Return only visible layouts
    totalHeight,
    containerRef,
    containerWidth: debouncedWidth,
    isCalculating
  }
}
