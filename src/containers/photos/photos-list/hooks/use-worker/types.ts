import type { PhotoSetMap, Photo } from '../../types'

export interface WorkerParams {
  photos: Photo[]
  containerWidth: number
  gap: number
  existingLayouts: PhotoSetMap
  previousPhotos: Photo[]
  previousWidth: number
  windowHeight: number
  previousWindowHeight: number
}

export interface WorkerResult {
  layouts: PhotoSetMap
  totalHeight: number
}

export interface UseWorkerReturn {
  calculateLayout: (params: WorkerParams) => Promise<WorkerResult>
}
