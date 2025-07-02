import { useEffect, useState, useRef } from 'react'

export const useWindowHeight = (delay: number = 150): number => {
  const [windowHeight, setWindowHeight] = useState(() => {
    // Initialize with current window height, or 0 if window is not available (SSR)
    if (typeof window !== 'undefined') {
      return window.innerHeight
    }
    return 0
  })

  const timeoutRef = useRef<ReturnType<typeof setTimeout> | undefined>(
    undefined
  )

  useEffect(() => {
    const handleResize = () => {
      // Clear existing timeout
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }

      // Set new timeout to update height after delay
      timeoutRef.current = setTimeout(() => {
        setWindowHeight(window.innerHeight)
      }, delay)
    }

    // Set initial height
    setWindowHeight(window.innerHeight)

    // Add event listener
    window.addEventListener('resize', handleResize, { passive: true })

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize)
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [delay])

  return windowHeight
}
