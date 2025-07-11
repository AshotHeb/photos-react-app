import type { MasonryLayout, PhotoSetMap, Photo } from '../types'

// Breakpoint constants
export const BREAKPOINTS = {
  desktop: 1200,
  tablet: 768,
  mobile: 480
} as const

// Utility function for requestIdleCallback with fallback
export const runWhenIdle = <T>(fn: () => T): Promise<T> => {
  return new Promise((resolve) => {
    if ('requestIdleCallback' in window) {
      requestIdleCallback(() => resolve(fn()))
    } else {
      // Fallback for older browsers
      setTimeout(() => resolve(fn()), 1)
    }
  })
}

// Calculate responsive column count
export const getColumnCount = (width: number): number => {
  if (width >= BREAKPOINTS.desktop) return 4
  if (width >= BREAKPOINTS.tablet) return 3
  if (width >= BREAKPOINTS.mobile) return 2
  return 1
}

// Check if existing layouts can be reused for incremental updates
export const canReuseExistingLayouts = (
  previousPhotos: Photo[],
  currentPhotos: Photo[],
  previousWidth: number,
  currentWidth: number,
  previousWindowHeight: number = 0,
  currentWindowHeight: number = 0
): boolean => {
  // Force recalculation if window height changed since sets are based on window height
  const windowHeightChanged =
    previousWindowHeight !== 0 && previousWindowHeight !== currentWindowHeight

  return (
    !windowHeightChanged &&
    previousPhotos.length > 0 &&
    previousWidth === currentWidth &&
    currentPhotos.length >= previousPhotos.length &&
    currentPhotos
      .slice(0, previousPhotos.length)
      .every((photo, index) => photo.id === previousPhotos[index].id)
  )
}

// Helper function to calculate a single photo layout
export const calculatePhotoLayout = (
  photo: Photo,
  index: number,
  columns: number,
  itemWidth: number,
  gap: number,
  columnHeights: number[]
): { layout: MasonryLayout; columnHeights: number[] } => {
  const column = index % columns
  const aspectRatio = photo.height / photo.width
  const itemHeight = itemWidth * aspectRatio
  const left = column * (itemWidth + gap)
  const top = columnHeights[column]

  const layout = {
    id: photo.id,
    column,
    left,
    top,
    height: itemHeight,
    width: itemWidth,
    photo: {
      id: photo.id,
      src: photo.src.large,
      alt: photo.alt,
      aspectRatio
    }
  }

  // Update column heights
  const newColumnHeights = [...columnHeights]
  newColumnHeights[column] += itemHeight + gap

  return { layout, columnHeights: newColumnHeights }
}

// Single function that handles both full and incremental calculations
export const calculateMasonryLayout = (
  photos: Photo[],
  containerWidth: number,
  gap: number,
  existingLayouts: PhotoSetMap = {},
  previousPhotos: Photo[] = [],
  previousWidth: number = 0,
  windowHeight: number,
  previousWindowHeight: number = 0
): { layouts: PhotoSetMap; totalHeight: number } => {
  if (photos.length === 0 || containerWidth === 0) {
    return { layouts: {}, totalHeight: 0 }
  }

  const columns = getColumnCount(containerWidth)
  const itemWidth = (containerWidth - (columns - 1) * gap) / columns
  let layouts: PhotoSetMap = {}
  let columnHeights = new Array(columns).fill(0)

  // Check if we can reuse existing layouts
  const canReuse = canReuseExistingLayouts(
    previousPhotos,
    photos,
    previousWidth,
    containerWidth,
    previousWindowHeight,
    windowHeight
  )

  // Use existing layouts if possible
  if (canReuse && Object.keys(existingLayouts).length > 0) {
    layouts = { ...existingLayouts }
    Object.values(existingLayouts).forEach((layout) => {
      layout.forEach((layout) => {
        columnHeights[layout.column] = Math.max(
          columnHeights[layout.column],
          layout.top + layout.height + gap
        )
      })
    })
  }

  // Calculate positions for photos (either all or just new ones)
  const existingPhotosCount = Object.values(existingLayouts).flat().length
  const startIndex = canReuse ? existingPhotosCount : 0

  for (let i = startIndex; i < photos.length; i++) {
    const { layout, columnHeights: newColumnHeights } = calculatePhotoLayout(
      photos[i],
      i,
      columns,
      itemWidth,
      gap,
      columnHeights
    )

    const top = layout.top
    const setKey = `set-${Math.floor(top / windowHeight)}`

    const resultLayouts = layouts[setKey] || []
    layouts[setKey] = [...resultLayouts, layout]

    columnHeights = newColumnHeights
  }

  return {
    layouts,
    totalHeight: Math.max(...columnHeights)
  }
}
