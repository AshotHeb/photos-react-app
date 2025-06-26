import React from 'react'
import * as Styled from './styled'
import type { FooterLogoProps } from './types'

export const FooterLogo: React.FC<FooterLogoProps> = React.memo(
  ({ className }) => {
    return (
      <Styled.FooterLogoContainer className={className}>
        <Styled.FooterLogoIcon>P</Styled.FooterLogoIcon>
        <Styled.FooterLogoText>PhotoGallery</Styled.FooterLogoText>
      </Styled.FooterLogoContainer>
    )
  }
)
