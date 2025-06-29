import type { MasonryLayout } from '../types'

export interface Photo {
  id: number
  width: number
  height: number
  src: {
    medium: string
  }
  alt: string
}

export interface UseMasonryLayoutProps {
  gap?: number
  debounceDelay?: number
}

export interface UseMasonryLayoutReturn {
  layouts: MasonryLayout[]
  totalHeight: number
  containerRef: React.RefObject<HTMLDivElement | null>
  containerWidth: number
  isCalculating: boolean
}
