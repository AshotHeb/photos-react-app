import type { PhotoSetMap } from '../../types'

export interface UseVirtualizedRenderingProps {
  layouts: PhotoSetMap
  totalHeight: number
  bufferSets?: number
}

export interface UseVirtualizedRenderingReturn {
  visibleLayouts: Array<{
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
}
