import React from 'react'
import * as Styled from './styled'
import type { NavigationProps } from './types'
import { MENU_ROUTES } from '@/pages/routes'

export const Navigation: React.FC<NavigationProps> = React.memo(
  ({ className }) => {
    return (
      <Styled.NavigationContainer className={className}>
        {MENU_ROUTES.map((route) => (
          <Styled.Link
            key={route.path}
            to={route.path}
            className={({ isActive }) => (isActive ? 'active' : '')}
          >
            {route.name}
          </Styled.Link>
        ))}
      </Styled.NavigationContainer>
    )
  }
)
