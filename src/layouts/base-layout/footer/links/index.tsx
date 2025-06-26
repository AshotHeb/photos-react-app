import React from 'react'
import * as Styled from './styled'
import type { FooterLinksProps } from './types'
import { MENU_ROUTES } from '@/pages/routes'

export const FooterLinks: React.FC<FooterLinksProps> = React.memo(
  ({ className }) => {
    return (
      <Styled.FooterLinksContainer className={className}>
        <Styled.FooterLinksTitle>Navigation</Styled.FooterLinksTitle>
        <Styled.FooterLinksList>
          {MENU_ROUTES.map((route) => (
            <li key={route.path}>
              <Styled.FooterLink href={route.path}>
                {route.name}
              </Styled.FooterLink>
            </li>
          ))}
        </Styled.FooterLinksList>
      </Styled.FooterLinksContainer>
    )
  }
)
