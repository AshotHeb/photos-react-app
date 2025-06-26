import React, { useState, useCallback } from 'react'
import * as Styled from './styled'
import { Logo } from './logo'
import { Navigation } from './navigation'
import { MobileMenu } from './mobile-menu'
import type { HeaderProps } from './types'

export const Header: React.FC<HeaderProps> = React.memo(({ className }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const handleToggleMobileMenu = useCallback(() => {
    setIsMobileMenuOpen((prev) => !prev)
  }, [])

  const handleCloseMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(false)
  }, [])

  return (
    <>
      <Styled.HeaderContainer className={className}>
        <Styled.HeaderLeft>
          <Logo />
        </Styled.HeaderLeft>
        <Styled.HeaderRight>
          <Navigation
            isMobileMenuOpen={isMobileMenuOpen}
            onToggleMobileMenu={handleToggleMobileMenu}
          />
        </Styled.HeaderRight>
        <Styled.MobileMenuButton onClick={handleToggleMobileMenu}>
          <Styled.BurgerIcon $isOpen={isMobileMenuOpen} />
        </Styled.MobileMenuButton>
      </Styled.HeaderContainer>

      <MobileMenu isOpen={isMobileMenuOpen} onClose={handleCloseMobileMenu} />
    </>
  )
})
