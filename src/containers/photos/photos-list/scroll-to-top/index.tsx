import React, { useState, useEffect, useCallback } from 'react'
import * as Styled from './styled'

interface ScrollToTopProps {
  threshold?: number // Scroll threshold to show the button
  smooth?: boolean // Whether to use smooth scrolling
}

export const ScrollToTop: React.FC<ScrollToTopProps> = React.memo(
  ({ threshold = 300, smooth = true }) => {
    const [isVisible, setIsVisible] = useState(false)

    // Check if scroll position exceeds threshold
    const toggleVisibility = useCallback(() => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop
      setIsVisible(scrollTop > threshold)
    }, [threshold])

    // Scroll to top function
    const scrollToTop = useCallback(() => {
      if (smooth) {
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        })
      } else {
        window.scrollTo(0, 0)
      }
    }, [smooth])

    // Add scroll event listener
    useEffect(() => {
      window.addEventListener('scroll', toggleVisibility, { passive: true })
      return () => {
        window.removeEventListener('scroll', toggleVisibility)
      }
    }, [toggleVisibility])

    if (!isVisible) {
      return null
    }

    return (
      <Styled.ScrollToTopButton
        onClick={scrollToTop}
        aria-label="Scroll to top"
        title="Scroll to top"
      >
        <Styled.ArrowIcon />
      </Styled.ScrollToTopButton>
    )
  }
)
