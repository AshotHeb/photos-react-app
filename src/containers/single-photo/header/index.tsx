import React from 'react'
import { Header as HeaderStyled, BackButton } from '../styled'
import type { HeaderProps } from '../types'

export const HeaderComponent: React.FC<HeaderProps> = ({ onBackClick }) => {
  return (
    <HeaderStyled>
      <BackButton onClick={onBackClick}>← Back to Photos</BackButton>
    </HeaderStyled>
  )
}
