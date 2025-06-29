import type { Photo } from '@/stores/photo-store/types'

export interface ErrorDisplayProps {
  error: string
  onBackClick: () => void
}

export interface HeaderProps {
  onBackClick: () => void
}

export interface PhotoDisplayProps {
  photo: Photo
}

export interface PhotoInfoProps {
  photo: Photo
}

export interface DownloadSectionProps {
  photo: Photo
}
