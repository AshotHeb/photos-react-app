import { Link } from 'react-router-dom'
import styled from 'styled-components'

export const MobileMenuOverlay = styled.div<{ $isOpen: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1000;
  opacity: ${({ $isOpen }) => ($isOpen ? 1 : 0)};
  visibility: ${({ $isOpen }) => ($isOpen ? 'visible' : 'hidden')};
  transition: all 0.3s ease;
`

export const MobileMenuContainer = styled.div<{ $isOpen: boolean }>`
  position: fixed;
  top: 0;
  right: 0;
  width: 300px;
  height: 100vh;
  background: white;
  box-shadow: -4px 0 12px rgba(0, 0, 0, 0.1);
  transform: ${({ $isOpen }) =>
    $isOpen ? 'translateX(0)' : 'translateX(100%)'};
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

export const MobileNavLink = styled(Link)`
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
