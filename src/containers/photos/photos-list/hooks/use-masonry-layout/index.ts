import { useEffect, useRef, useState, useCallback } from 'react'
import type { PhotoSetMap, Photo } from '../../types'
import { useWorker } from '../use-worker'
import { useVirtualizedRendering } from '../use-virtualized-rendering'

import isEqual from 'lodash.isequal'

import { useDebounce } from '@/hooks/use-debounce'
import type { UseMasonryLayoutProps, UseMasonryLayoutReturn } from './types'
import { usePhotosData } from '@/stores/app-selectors/use-photos-data'
import { useWindowHeight } from '@/hooks/use-window-height'

export const useMasonryLayout = ({
  gap = 20,
  debounceDelay = 150
}: UseMasonryLayoutProps): UseMasonryLayoutReturn => {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isCalculating, setIsCalculating] = useState(false)
  const windowHeight = useWindowHeight()

  const {
    photos,
    layouts,
    totalHeight,
    containerWidth,
    setLayouts,
    setTotalHeight,
    setContainerWidth
  } = usePhotosData()

  // Track previous state for optimization
  const previousPhotosRef = useRef<Photo[]>([])
  const previousContainerWidthRef = useRef(0)
  const previousLayoutsRef = useRef<PhotoSetMap>({})
  const previousWindowHeightRef = useRef(0)

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
    const previousWindowHeight = previousWindowHeightRef.current

    return calculateLayout({
      photos,
      containerWidth: debouncedWidth,
      gap,
      existingLayouts: previousLayouts,
      previousPhotos,
      previousWidth,
      windowHeight,
      previousWindowHeight
    })
  }, [photos, debouncedWidth, gap, calculateLayout, windowHeight])

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
        previousWindowHeightRef.current = windowHeight
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
  }, [
    calculateLayouts,
    layouts,
    totalHeight,
    photos,
    debouncedWidth,
    windowHeight,
    setLayouts,
    setTotalHeight
  ])

  // Handle resize events
  useEffect(() => {
    const updateWidth = () => {
      if (containerRef.current) {
        const newWidth = containerRef.current.clientWidth
        setContainerWidth(newWidth)
      }
    }

    updateWidth()
    window.addEventListener('resize', updateWidth, { passive: true })
    return () => window.removeEventListener('resize', updateWidth)
  }, [setContainerWidth])

  return {
    layouts: visibleLayouts, // Return only visible layouts
    totalHeight,
    containerRef,
    containerWidth: debouncedWidth,
    isCalculating
  }
}

export type * from './types'
