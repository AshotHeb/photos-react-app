import styled from 'styled-components'

export const FooterLinksContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`

export const FooterLinksTitle = styled.h4`
  font-size: 16px;
  font-weight: 600;
  color: #1f2937;
  margin: 0;
`

export const FooterLinksList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 8px;
`

export const FooterLink = styled.a`
  color: #6b7280;
  text-decoration: none;
  font-size: 14px;
  transition: color 0.2s ease;

  &:hover {
    color: #ff6b6b;
  }
`
