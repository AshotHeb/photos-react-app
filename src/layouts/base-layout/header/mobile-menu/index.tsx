import React from 'react'
import * as Styled from './styled'
import { useMobileMenu } from './hook'
import type { MobileMenuProps } from './types'

export const MobileMenu: React.FC<MobileMenuProps> = React.memo(
  ({ isOpen, onClose }) => {
    const { handleOverlayClick } = useMobileMenu({ isOpen, onClose })

    return (
      <>
        <Styled.MobileMenuOverlay
          isOpen={isOpen}
          onClick={handleOverlayClick}
        />
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
