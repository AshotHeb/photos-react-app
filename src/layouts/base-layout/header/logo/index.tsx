import React from 'react'
import * as Styled from './styled'
import type { LogoProps } from './types'

export const Logo: React.FC<LogoProps> = React.memo(({ className }) => {
  return (
    <Styled.LogoContainer className={className}>
      <Styled.LogoIcon>P</Styled.LogoIcon>
      <Styled.LogoText>PhotoGallery</Styled.LogoText>
    </Styled.LogoContainer>
  )
})
