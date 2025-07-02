import type { HTMLAttributes } from 'react'

export interface SkeletonProps extends HTMLAttributes<HTMLDivElement> {
  /** Width of the skeleton (CSS value) */
  width?: string | number
  /** Height of the skeleton (CSS value) */
  height?: string | number
  /** Border radius of the skeleton (CSS value) */
  borderRadius?: string | number
}
