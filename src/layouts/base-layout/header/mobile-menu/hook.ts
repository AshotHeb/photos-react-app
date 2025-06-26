import { useEffect, useCallback } from 'react'

interface UseMobileMenuProps {
  isOpen: boolean
  onClose: () => void
}

export const useMobileMenu = ({ isOpen, onClose }: UseMobileMenuProps) => {
  const resetBodyOverflow = useCallback(() => {
    document.body.style.overflow = 'unset'
  }, [])

  const handleEscapeKey = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isOpen) {
        onClose()
      }
    },
    [isOpen, onClose]
  )

  const handleOverlayClick = useCallback(
    (event: React.MouseEvent) => {
      if (event.target === event.currentTarget) {
        onClose()
      }
    },
    [onClose]
  )

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
      document.addEventListener('keydown', handleEscapeKey)
    } else {
      document.body.style.overflow = 'unset'
    }

    return () => {
      document.removeEventListener('keydown', handleEscapeKey)
      resetBodyOverflow()
    }
  }, [isOpen, handleEscapeKey, resetBodyOverflow])

  return {
    handleOverlayClick,
    resetBodyOverflow
  }
}
