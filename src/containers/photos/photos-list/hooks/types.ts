import type { PhotoSetMap } from '../types'

// Re-export types from main types file
export type {
  Photo,
  UseMasonryLayoutProps,
  UseMasonryLayoutReturn,
  ViewportState,
  VisibleSetsInfo
} from '../types'

export interface UseVirtualizedRenderingProps {
  layouts: PhotoSetMap
  totalHeight: number
  bufferSets?: number // Number of sets to render above and below viewport
}
