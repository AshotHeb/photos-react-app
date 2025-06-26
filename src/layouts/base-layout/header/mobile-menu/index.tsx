import React, { useEffect, useCallback } from 'react'
import * as Styled from './styled'
import type { MobileMenuProps } from './types'

export const MobileMenu: React.FC<MobileMenuProps> = React.memo(
  ({ isOpen, onClose }) => {
    const resetBodyOverflow = useCallback(() => {
      document.body.style.overflow = 'unset'
    }, [])

    useEffect(() => {
      if (isOpen) {
        document.body.style.overflow = 'hidden'
      } else {
        document.body.style.overflow = 'unset'
      }

      return resetBodyOverflow
    }, [isOpen, resetBodyOverflow])

    return (
      <>
        <Styled.MobileMenuOverlay isOpen={isOpen} onClick={onClose} />
        <Styled.MobileMenuContainer isOpen={isOpen}>
          <Styled.MobileMenuHeader>
            <Styled.MobileMenuTitle>Menu</Styled.MobileMenuTitle>
            <Styled.CloseButton onClick={onClose}>✕</Styled.CloseButton>
          </Styled.MobileMenuHeader>
          <Styled.MobileNav>
            <Styled.MobileNavLink href="/" className="active">
              Home
            </Styled.MobileNavLink>
            <Styled.MobileNavLink href="/photos">Photos</Styled.MobileNavLink>
          </Styled.MobileNav>
        </Styled.MobileMenuContainer>
      </>
    )
  }
)
