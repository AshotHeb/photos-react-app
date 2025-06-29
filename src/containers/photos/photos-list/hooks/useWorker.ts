import { useRef, useCallback } from 'react'
import type { PhotoSetMap, Photo } from '../types'
import { runWhenIdle, calculateMasonryLayout } from './utils'

export const useWorker = () => {
  const workerRef = useRef<Worker | null>(null)

  const calculateLayout = useCallback(
    async (params: {
      photos: Photo[]
      containerWidth: number
      gap: number
      existingLayouts: PhotoSetMap
      previousPhotos: Photo[]
      previousWidth: number
    }) => {
      // Try web worker first
      try {
        if (!workerRef.current) {
          workerRef.current = new Worker(
            new URL('@/workers/masonry.worker.ts', import.meta.url)
          )
        }

        return new Promise<{ layouts: PhotoSetMap; totalHeight: number }>(
          (resolve, reject) => {
            const worker = workerRef.current!

            worker.onmessage = (event) => {
              if (event.data.success) {
                resolve(event.data.result)
              } else {
                reject(new Error(event.data.error))
              }
            }

            worker.postMessage(params)
          }
        )
      } catch {
        // Fallback to requestIdleCallback on main thread
        return runWhenIdle(() => {
          return calculateMasonryLayout(
            params.photos,
            params.containerWidth,
            params.gap,
            params.existingLayouts,
            params.previousPhotos,
            params.previousWidth
          )
        })
      }
    },
    []
  )

  return { calculateLayout }
}
