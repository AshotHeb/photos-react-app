import React from 'react'
import * as Styled from './styled'
import type { AboutCardProps } from './types'

export const AboutCard: React.FC<AboutCardProps> = React.memo(
  ({ icon, title, description, className }) => {
    return (
      <Styled.AboutCard className={className}>
        <Styled.CardIcon>{icon}</Styled.CardIcon>
        <Styled.CardTitle>{title}</Styled.CardTitle>
        <Styled.CardDescription>{description}</Styled.CardDescription>
      </Styled.AboutCard>
    )
  }
)
