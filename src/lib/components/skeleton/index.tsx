import React from 'react'
import type { SkeletonProps } from './types'
import * as Styled from './styled'

export const Skeleton: React.FC<SkeletonProps> = React.memo(
  ({
    width = '100%',
    height = '20px',
    borderRadius = '4px',
    className,
    ...props
  }) => {
    return (
      <Styled.SkeletonContainer
        $width={width}
        $height={height}
        $borderRadius={borderRadius}
        className={className}
        {...props}
      />
    )
  }
)

Skeleton.displayName = 'Skeleton'
