import styled from 'styled-components'

// Header Container Styles
export const HeaderContainer = styled.header`
  background: #ffffff;
  border-bottom: 1px solid #e5e7eb;
  position: sticky;
  top: 0;
  z-index: 101;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 24px;
`

export const HeaderLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`

export const HeaderRight = styled.div`
  display: flex;
  align-items: center;
  gap: 32px;

  @media (max-width: 768px) {
    display: none;
  }
`

// Logo Styles
export const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`

export const LogoIcon = styled.div`
  width: 40px;
  height: 40px;
  background: linear-gradient(135deg, #ff6b6b 0%, #ff8e8e 100%);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: 700;
  font-size: 20px;
  box-shadow: 0 4px 12px rgba(255, 107, 107, 0.3);
`

export const LogoText = styled.h1`
  font-size: 24px;
  font-weight: 700;
  color: #1f2937;
  margin: 0;
  font-family: 'Poppins', sans-serif;
`

// Navigation Styles
export const NavigationContainer = styled.nav`
  display: flex;
  align-items: center;
  gap: 32px;

  @media (max-width: 768px) {
    display: none;
  }
`

export const NavLink = styled.a`
  color: #6b7280;
  text-decoration: none;
  font-weight: 500;
  font-size: 16px;
  padding: 8px 16px;
  border-radius: 8px;
  transition: all 0.2s ease;
  position: relative;

  &:hover {
    color: #ff6b6b;
    background: rgba(255, 107, 107, 0.1);
  }

  &.active {
    color: #ff6b6b;
    background: rgba(255, 107, 107, 0.1);
  }
`

// Mobile Menu Button Styles
export const MobileMenuButton = styled.button`
  display: none;
  background: none;
  border: none;
  padding: 8px;
  border-radius: 8px;
  cursor: pointer;
  transition: background 0.2s ease;

  &:hover {
    background: rgba(0, 0, 0, 0.05);
  }

  @media (max-width: 768px) {
    display: flex;
    align-items: center;
    justify-content: center;
  }
`

export const BurgerIcon = styled.div<{ $isOpen: boolean }>`
  width: 24px;
  height: 2px;
  background: #1f2937;
  position: relative;
  transition: all 0.3s ease;

  &::before,
  &::after {
    content: '';
    position: absolute;
    width: 24px;
    height: 2px;
    background: #1f2937;
    transition: all 0.3s ease;
  }

  &::before {
    top: -8px;
    transform: ${({ $isOpen }) =>
      $isOpen ? 'rotate(45deg) translate(6px, 6px)' : 'none'};
  }

  &::after {
    bottom: -8px;
    transform: ${({ $isOpen }) =>
      $isOpen ? 'rotate(-45deg) translate(6px, -6px)' : 'none'};
  }

  ${({ $isOpen }) =>
    $isOpen &&
    `
    background: transparent;
  `}
`

// Mobile Menu Styles
export const MobileMenuOverlay = styled.div<{ isOpen: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1000;
  opacity: ${({ isOpen }) => (isOpen ? 1 : 0)};
  visibility: ${({ isOpen }) => (isOpen ? 'visible' : 'hidden')};
  transition: all 0.3s ease;
`

export const MobileMenuContainer = styled.div<{ isOpen: boolean }>`
  position: fixed;
  top: 0;
  right: 0;
  width: 300px;
  height: 100vh;
  background: white;
  box-shadow: -4px 0 12px rgba(0, 0, 0, 0.1);
  transform: ${({ isOpen }) => (isOpen ? 'translateX(0)' : 'translateX(100%)')};
  transition: transform 0.3s ease;
  z-index: 1001;
  padding: 24px;
`

export const MobileMenuHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 32px;
  padding-bottom: 16px;
  border-bottom: 1px solid #e5e7eb;
`

export const MobileMenuTitle = styled.h2`
  font-size: 20px;
  font-weight: 600;
  color: #1f2937;
  margin: 0;
`

export const CloseButton = styled.button`
  background: none;
  border: none;
  padding: 8px;
  border-radius: 8px;
  cursor: pointer;
  transition: background 0.2s ease;

  &:hover {
    background: rgba(0, 0, 0, 0.05);
  }
`

export const MobileNav = styled.nav`
  display: flex;
  flex-direction: column;
  gap: 8px;
`

export const MobileNavLink = styled.a`
  color: #6b7280;
  text-decoration: none;
  font-weight: 500;
  font-size: 18px;
  padding: 16px;
  border-radius: 12px;
  transition: all 0.2s ease;

  &:hover {
    color: #ff6b6b;
    background: rgba(255, 107, 107, 0.1);
  }

  &.active {
    color: #ff6b6b;
    background: rgba(255, 107, 107, 0.1);
  }
`
