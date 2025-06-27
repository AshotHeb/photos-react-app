export interface PhotosListProps {
  onPhotoClick?: (photoId: number) => void
  showLoading?: boolean
  showError?: boolean
}

export interface PhotoItemProps {
  id: number
  src: string
  alt: string
  onClick?: () => void
}
