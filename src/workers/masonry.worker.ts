self.onmessage = async (event) => {
  const {
    photos,
    containerWidth,
    gap,
    existingLayouts,
    previousPhotos,
    previousWidth
  } = event.data

  try {
    // Import the calculation function
    const { calculateMasonryLayout } = await import(
      '../containers/photos/photos-list/hooks/utils'
    )

    // In workers, we can run calculations directly since we're already off the main thread
    // No need for requestIdleCallback as the main thread is already free
    const result = calculateMasonryLayout(
      photos,
      containerWidth,
      gap,
      existingLayouts,
      previousPhotos,
      previousWidth
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
