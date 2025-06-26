import React from 'react'
import * as Styled from './styled'
import type { NavigationProps } from './types'

export const Navigation: React.FC<NavigationProps> = React.memo(
  ({ className }) => {
    return (
      <Styled.NavigationContainer className={className}>
        <Styled.NavLink href="/" className="active">
          Home
        </Styled.NavLink>
        <Styled.NavLink href="/photos">Photos</Styled.NavLink>
      </Styled.NavigationContainer>
    )
  }
)
