import styled from 'styled-components'

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
