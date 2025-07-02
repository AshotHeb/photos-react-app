import { calculateMasonryLayout } from '../containers/photos/photos-list/hooks/utils'

self.onmessage = (event) => {
  const {
    photos,
    containerWidth,
    gap,
    existingLayouts,
    previousPhotos,
    previousWidth,
    windowHeight,
    previousWindowHeight
  } = event.data

  try {
    const result = calculateMasonryLayout(
      photos,
      containerWidth,
      gap,
      existingLayouts,
      previousPhotos,
      previousWidth,
      windowHeight,
      previousWindowHeight
    )

    self.postMessage({ success: true, result })
  } catch (error) {
    self.postMessage({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    })
  }
}

export type {}
