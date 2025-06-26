import React from 'react'
import * as Styled from './styled'
import { FooterLogo } from './logo'
import { FooterLinks } from './links'
import type { FooterProps } from './types'

export const Footer: React.FC<FooterProps> = React.memo(({ className }) => {
  const currentYear = new Date().getFullYear()

  return (
    <Styled.FooterContainer className={className}>
      <Styled.FooterContent>
        <Styled.FooterLeft>
          <FooterLogo />
          <Styled.FooterDescription>
            Discover and explore beautiful photos from talented photographers
            around the world. Your gateway to visual inspiration and creativity.
          </Styled.FooterDescription>
        </Styled.FooterLeft>

        <Styled.FooterRight>
          <FooterLinks />
        </Styled.FooterRight>
      </Styled.FooterContent>

      <Styled.FooterBottom>
        <Styled.FooterCopyright>
          © {currentYear} PhotoGallery. All rights reserved.
        </Styled.FooterCopyright>
      </Styled.FooterBottom>
    </Styled.FooterContainer>
  )
})
