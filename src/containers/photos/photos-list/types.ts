export interface PhotosListProps {
  onPhotoClick?: (photoId: number) => void
  showLoading?: boolean
  showError?: boolean
}

export interface PhotoItemProps {
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
