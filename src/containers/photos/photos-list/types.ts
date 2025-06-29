export interface PhotosListProps {
  onPhotoClick?: (photoId: number) => void
  showLoading?: boolean
  showError?: boolean
}

export interface PhotoItemProps {
  id: number
  src: string
  alt: string
  aspectRatio: number
  onClick?: () => void
  transform: string
  width: number
}

export interface MasonryPhoto {
  id: number
  src: string
  alt: string
  aspectRatio: number
}

export interface MasonryLayout {
  id: number
  column: number
  left: number
  top: number
  height: number
  width: number
  photo: MasonryPhoto
}

export interface PhotoSetMap {
  [key: string]: MasonryLayout[]
}

// Hook types
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
  viewportState?: ViewportState
  visibleSetsInfo?: VisibleSetsInfo
  allLayouts?: MasonryLayout[]
}

// Viewport-based rendering types
export interface ViewportState {
  scrollTop: number
  viewportHeight: number
  containerHeight: number
}

export interface VisibleSetsInfo {
  visibleSets: string[]
  currentSetIndex: number
  totalSets: number
  setHeight: number
}
