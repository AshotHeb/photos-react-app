import { useState, useEffect, useCallback, useRef } from 'react'
import type { PhotoSetMap, VisibleSetsInfo } from '../types'
import type { UseVirtualizedRenderingProps } from './types'

export const useVirtualizedRendering = ({
  layouts,
  totalHeight,
  bufferSets = 1
}: UseVirtualizedRenderingProps) => {
  const [visibleSetsInfo, setVisibleSetsInfo] = useState<VisibleSetsInfo>({
    visibleSets: [],
    currentSetIndex: 0,
    totalSets: 0,
    setHeight: 0
  })

  const rafRef = useRef<number | undefined>(undefined)

  // Calculate which sets should be visible
  const calculateVisibleSets = useCallback(
    (
      scrollTop: number,
      containerHeight: number,
      layouts: PhotoSetMap
    ): VisibleSetsInfo => {
      const setKeys = Object.keys(layouts).sort((a, b) => {
        const aIndex = parseInt(a.split('-')[1])
        const bIndex = parseInt(b.split('-')[1])
        return aIndex - bIndex
      })
      const totalSets = setKeys.length

      if (totalSets === 0 || containerHeight === 0) {
        return {
          visibleSets: [],
          currentSetIndex: 0,
          totalSets: 0,
          setHeight: 0
        }
      }

      // Calculate height per set (divide total height by number of sets)
      const setHeight = containerHeight / totalSets

      // Calculate current set index based on scroll position
      const currentSetIndex = Math.floor(scrollTop / setHeight)

      // Calculate visible range with buffer
      const startSetIndex = Math.max(0, currentSetIndex - bufferSets)
      const endSetIndex = Math.min(totalSets - 1, currentSetIndex + bufferSets)

      // Get visible set keys
      const visibleSets = setKeys.slice(startSetIndex, endSetIndex + 1)

      return {
        visibleSets,
        currentSetIndex,
        totalSets,
        setHeight
      }
    },
    [bufferSets]
  )

  // Handle scroll events with throttling
  const handleScroll = useCallback(() => {
    if (rafRef.current) {
      return
    }

    rafRef.current = requestAnimationFrame(() => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop
      const containerHeight = totalHeight

      const newVisibleSetsInfo = calculateVisibleSets(
        scrollTop,
        containerHeight,
        layouts
      )

      setVisibleSetsInfo(newVisibleSetsInfo)
      rafRef.current = undefined
    })
  }, [totalHeight, layouts, calculateVisibleSets])

  // Update viewport state when layouts change
  useEffect(() => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop
    const containerHeight = totalHeight

    const newVisibleSetsInfo = calculateVisibleSets(
      scrollTop,
      containerHeight,
      layouts
    )

    setVisibleSetsInfo(newVisibleSetsInfo)
  }, [layouts, totalHeight, calculateVisibleSets])

  // Add scroll event listener
  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('resize', handleScroll, { passive: true })

    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleScroll)
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current)
      }
    }
  }, [handleScroll])

  // Get visible layouts from visible sets
  const getVisibleLayouts = useCallback(() => {
    return visibleSetsInfo.visibleSets.flatMap(
      (setKey) => layouts[setKey] || []
    )
  }, [visibleSetsInfo.visibleSets, layouts])

  return {
    visibleLayouts: getVisibleLayouts()
  }
}
