import { useEffect, useRef } from 'react'
import { useScrollTop, useSetScrollTop } from '@/stores/photo-store'
import type { UseScrollPersistenceReturn } from './types'

export const useScrollPersistence = (): UseScrollPersistenceReturn => {
  const scrollTop = useScrollTop()
  const setScrollTop = useSetScrollTop()
  const lastScrollPosition = useRef(0)

  // Track scroll position in real-time
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollTop = Math.max(
        window.scrollY,
        document.documentElement.scrollTop,
        document.body.scrollTop
      )
      lastScrollPosition.current = currentScrollTop
    }

    // Add scroll listener
    window.addEventListener('scroll', handleScroll, { passive: true })

    // Save scroll position when component unmounts
    return () => {
      window.removeEventListener('scroll', handleScroll)
      setScrollTop(lastScrollPosition.current)
    }
  }, [setScrollTop])

  // Restore scroll position on mount
  useEffect(() => {
    if (scrollTop > 0) {
      // Use setTimeout to ensure DOM is ready
      requestAnimationFrame(() => {
        window.scrollTo({
          top: scrollTop,
          behavior: 'instant'
        })
      })
    }
  }, [scrollTop])

  return { scrollTop, setScrollTop }
}

export type * from './types'
