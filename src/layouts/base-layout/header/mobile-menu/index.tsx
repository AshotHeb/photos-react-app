import React from 'react'
import * as Styled from './styled'
import { useMobileMenu } from './hook'
import type { MobileMenuProps } from './types'
import { MENU_ROUTES } from '@/pages/routes'

export const MobileMenu: React.FC<MobileMenuProps> = React.memo(
  ({ isOpen, onClose }) => {
    const { handleOverlayClick } = useMobileMenu({ isOpen, onClose })

    return (
      <>
        <Styled.MobileMenuOverlay
          $isOpen={isOpen}
          onClick={handleOverlayClick}
        />
        <Styled.MobileMenuContainer $isOpen={isOpen}>
          <Styled.MobileMenuHeader>
            <Styled.MobileMenuTitle>Menu</Styled.MobileMenuTitle>
            <Styled.CloseButton onClick={onClose}>✕</Styled.CloseButton>
          </Styled.MobileMenuHeader>
          <Styled.MobileNav>
            {MENU_ROUTES.map((route) => (
              <Styled.MobileNavLink
                key={route.path}
                to={route.path}
                className={({ isActive }) => (isActive ? 'active' : '')}
              >
                {route.name}
              </Styled.MobileNavLink>
            ))}
          </Styled.MobileNav>
        </Styled.MobileMenuContainer>
      </>
    )
  }
)
