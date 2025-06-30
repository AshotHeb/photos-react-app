export interface UseMasonryLayoutProps {
  gap?: number
  debounceDelay?: number
}

export interface UseMasonryLayoutReturn {
  layouts: Array<{
    id: number
    column: number
    left: number
    top: number
    height: number
    width: number
    photo: {
      id: number
      src: string
      alt: string
      aspectRatio: number
    }
  }>
  totalHeight: number
  containerRef: React.RefObject<HTMLDivElement | null>
  containerWidth: number
  isCalculating: boolean
}
