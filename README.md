# Photos React App

A modern, responsive photo gallery application built with React, TypeScript, and Vite. Features include debounced search, infinite scroll, masonry layout, and virtualized rendering for optimal performance.

## 🚀 Project Run Process

### Prerequisites

- **Node version** -- 22.0.0
- **npm version** -- 10.0.0

### Installation & Setup

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd photos-react-app
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Environment Configuration**

   ```bash
   # Create environment file
   cp .env.example .env

   # Add your environment variables to .env file
   # Follow the structure provided in .env.example
   ```

4. **Start Development Server**

   ```bash
   npm run dev
   ```

   The application will be available at `http://localhost:5173` (or the port shown in your terminal)

5. **Build for Production**

   ```bash
   npm run build

   **⚠️ Important Note**: The built project uses client-side routing. This means:
   - ✅ Navigation within the app works perfectly
   - ❌ Direct URL access or page refresh on routes like `/photos` or `/photos/123` will show a 404 error
   - 🔧 **Solution**: Configure your server to serve `index.html` for all routes (see deployment section below)

   ```

## 📦 Packages & Technologies

### Core Framework

- **React 18** -- Modern React with concurrent features and hooks
- **TypeScript** -- Type safety and better developer experience

### Build Tool

- **Vite** -- Next-generation frontend build tool
  - **Why Vite?**
    - Lightning-fast hot module replacement (HMR)
    - Instant server start with native ES modules
    - Optimized build output with Rollup
    - Excellent TypeScript support out of the box
    - Smaller bundle sizes compared to webpack
    - Better development experience with faster refresh times

### State Management

- **Zustand** -- Lightweight state management library
  - **Why Zustand?**
    - **Small bundle size** -- 2.9KB bundle size (Redux Toolkit size is 13.5KB)
    - **Excellent TypeScript support** -- First-class TypeScript integration
    - **Perfect for simple and small apps** -- Minimal boilerplate code
    - **Memoized selectors** -- Built-in performance optimization
    - **Great debugging** -- Excellent debugging with Redux DevTools support
    - **Simple API** -- No providers, no complex setup, just create and use

### Styling

- **Styled Components** -- CSS-in-JS styling solution
  - Component-scoped styles
  - Dynamic styling based on props
  - Theme support and global styles

### Routing

- **React Router DOM** -- Client-side routing for React applications
  - Declarative routing with JSX
  - Nested routes and dynamic routing
  - Browser history management

### API Integration

- **Fetch API** -- Native browser API for HTTP requests

  - Built-in browser support
  - Promise-based API
  - No additional dependencies

    **⚠️ Important Note**: The Pexels API occasionally returns duplicate photos across different pages (e.g., pages 7 and 8). This is a limitation of the API itself, not our application. To handle this:

## 🎯 Virtualized Grid System

### Overview

The virtualized grid system optimizes performance by rendering only the photos that are currently visible in the viewport, plus a small buffer. This allows handling thousands of photos without performance issues.

**Cursor AI** -- Used during development

### How It Works

#### 1. **Photo Set Organization**

```typescript
// Photos are organized into sets based on their vertical position and window height
const setKey = `${Math.floor(top / windowHeight)}` // e.g., "0", "1", "2"
// Each set contains photos that fall within one window height of vertical space
```

````

#### 2. **Viewport Calculation**

```typescript
// Calculate which sets should be visible based on scroll position
const currentSetIndex = Math.floor(scrollTop / setHeight)
const startSetIndex = Math.max(0, currentSetIndex - bufferSets)
const endSetIndex = Math.min(totalSets - 1, currentSetIndex + bufferSets)
````

#### 3. **Visible Set Detection**

- **Scroll Position**: Tracks current scroll position
- **Set Height**: Divides total container height by number of sets
- **Buffer**: Renders 1 set above and below the viewport for smooth scrolling
- **Visible Sets**: Only renders photos from visible sets

#### 4. **Performance Optimizations**

**RAF Throttling**:

```typescript
const handleScroll = useCallback(() => {
  if (rafRef.current) return // Skip if already scheduled

  rafRef.current = requestAnimationFrame(() => {
    // Update visible sets
    setVisibleSetsInfo(newVisibleSetsInfo)
    rafRef.current = undefined
  })
}, [])
```

**Layout Calculation**:

- Uses Web Workers for heavy masonry calculations
- Debounced width updates (150ms delay)
- Incremental layout updates when possible

### Key Components

#### **useVirtualizedRendering Hook**

- Calculates which photo sets are visible
- Manages scroll event listeners
- Returns only visible layouts for rendering

#### **useMasonryLayout Hook**

- Calculates optimal photo positioning
- Integrates with virtualized rendering
- Handles responsive column adjustments

#### **Photo Set Structure**

```typescript
interface PhotoSetMap {
  [setKey: string]: PhotoLayout[] // e.g., "set-0": [layout1, layout2, ...]
}

interface VisibleSetsInfo {
  visibleSets: string[] // ["set-1", "set-2", "set-3"]
  currentSetIndex: number // Currently centered set
  totalSets: number // Total number of sets
  setHeight: number // Height per set
}
```

### Benefits

- **Performance**: Only renders ~60 photos instead of thousands
- **Memory**: Minimal DOM nodes regardless of photo count
- **Smooth Scrolling**: 60fps performance with RAF throttling
- **Responsive**: Adapts to different screen sizes automatically

### Usage Example

```typescript
// In PhotosList component
const { layouts, totalHeight, containerRef } = useMasonryLayout({
  gap: 20
})

// Only visible layouts are rendered
{
  layouts.map((layout) => (
    <PhotoItem
      key={`photo-${layout.id}`}
      transform={`translate3d(${layout.left}px, ${layout.top}px, 0)`}
      width={layout.width}
    />
  ))
}
```

### Technical Flow

1. **Scroll Event** → Calculate visible sets
2. **Visible Sets** → Extract layouts from those sets only
3. **Layouts** → Render only visible photos
4. **Performance** → Smooth 60fps scrolling with minimal memory usage

## �� Scroll Persistence - Core Logic

### What It Does

This hook remembers where you scrolled to and puts you back there when you return to the page.

### Simple Steps

1. **Remember Position**

   - Watches where you scroll
   - Saves that position in memory

2. **Restore Position**
   - When you come back to the page
   - Automatically scrolls you back to where you were

### How It Works

**While You're Scrolling**:

```typescript
// Keeps track of your scroll position
const handleScroll = () => {
  lastScrollPosition.current = window.scrollY
}
```

**When You Leave**:

```typescript
// Saves your position before you go
setScrollTop(lastScrollPosition.current)
```

**When You Return**:

```typescript
// Puts you back where you were
window.scrollTo({ top: scrollTop, behavior: 'instant' })
```

### Why It's Useful

- You scroll down to photo #500
- You click on a photo to see details
- You go back to the photos list
- You're automatically back at photo #500 (not at the top)

## 🎯 App Selectors - Core Logic

### What They Do

App selectors are like smart helpers that figure out which data to show based on what the user is doing.

### Why We Use Them

Instead of components trying to figure out what data they need, we have these selectors that do the thinking for them.

### Simple Example

**Without Selectors (Confusing)**:

```typescript
// Component has to figure out everything
const Component = () => {
  const hasSearch = !!useSearchQuery()
  const photos = hasSearch ? useSearchResults() : usePhotoPhotos()
  const layouts = hasSearch ? useSearchLayouts() : useLayouts()
  // ... more confusing logic
}
```

**With Selectors (Clean)**:

```typescript
// Component just asks for what it needs
const Component = () => {
  const { photos, layouts } = usePhotosData() // Selector figures it out
}
```

### How They Work

#### **usePhotosData Selector**

- **Question**: "What photos should I show?"
- **Answer**:
  - If user is searching → show search results
  - If user is browsing → show all photos
- **Result**: Component gets the right data automatically

#### **usePhotosLoadMoreData Selector**

- **Question**: "What should I load when user scrolls?"
- **Answer**:
  - If searching → load more search results
  - If browsing → load more curated photos
- **Result**: Load more button works for both modes

#### **useShowSearchNoResults Selector**

- **Question**: "Should I show 'no results' message?"
- **Answer**:
  - User typed something + not searching + no results = show message
- **Result**: Shows helpful message when search finds nothing

### Benefits

1. **Components Stay Simple**

   - Components don't need to know about search vs browse logic
   - They just ask for what they need

2. **Logic is Centralized**

   - All the "which data to show" logic is in one place
   - Easy to change and maintain

3. **Reusable**

   - Multiple components can use the same selectors
   - No duplicate logic

4. **Performance**
   - Selectors are memoized (remember their results)
   - Only recalculate when data actually changes

### Real-World Analogy

Think of selectors like a smart waiter at a restaurant:

- You just say "I want food"
- The waiter figures out if you want breakfast, lunch, or dinner
- You get the right menu without having to think about it

### Usage Example

```typescript
// Component doesn't care about search logic
const PhotosList = () => {
  const { photos, layouts } = usePhotosData() // Selector handles the logic
  const { fetchPhotos, hasMore } = usePhotosLoadMoreData() // Selector handles load more

  return (
    <div>
      {photos.map((photo) => (
        <PhotoItem key={photo.id} {...photo} />
      ))}
      {hasMore && <LoadMoreButton onClick={fetchPhotos} />}
    </div>
  )
}
```

The selectors make the code cleaner and easier to understand by hiding the complex logic of "which data to use when."

## ⚡ Performance Optimizations

### Smart Image Loading

#### **Lazy Loading**

```html
<img loading="lazy" />
```

- Images only load when you scroll to them
- Makes the page load **5 times faster** at the start
- Saves internet data and makes everything feel snappy

#### **Right Image Size**

We pick the middle size (`photo.src.large`) because it's just right:

| Size       | How Big | How Good | Should We Use? |
| ---------- | ------- | -------- | -------------- |
| **Large**  | 43KB    | Perfect  | ✅ Yes!        |
| **Medium** | 14-17KB | Good     | Too blurry     |
| **Small**  | 3KB     | Bad      | Too blurry     |

**Why Medium?**

- Looks good on phones and computers
- Not too big, not too small
- Loads fast but still looks nice

### Smart Comparisons

#### **lodash.isequal**

- **What it does**: Checks if things are really different
- **Why we use it**: Only updates the page when something actually changed
- **Result**: Page doesn't flicker or re-render unnecessarily

### What You Get

- **Fast Start**: Page loads quickly because images load later
- **Less Data**: Only downloads images you actually see
- **Works on Mobile**: Images are the right size for phones
- **Smooth Scrolling**: No weird jumps or flickers
- **Uses Less Memory**: Only keeps track of what you can see

## 📦 Bundle Size

### How Big Is Our App?

### What Each File Does

| File                         | Size   | What It Is              |
| ---------------------------- | ------ | ----------------------- |
| `index-CJBmeIkK.js`          | 101 kB | Main app code           |
| `index-BWcWP2Qx.css`         | 0.5 kB | Styles                  |
| `masonry.worker-C8fpwi9Y.js` | 1.2 kB | Background calculations |
| `index.html`                 | 0.4 kB | HTML page               |

### Total Size

- **Everything together**: ~104 kB (when compressed)
- **Build time**: 682ms (very fast!)

### How We Compare

- **Our app**: ~100 kB
- **Other React apps**: 200-500 kB
- **We're**: **50-80% smaller** than most React apps!

### Why It's So Small

- **Vite**: Smart build tool that removes unused code
- **Zustand**: Tiny state management (2.9kB vs Redux 13.5kB)
- **Virtualization**: Only shows what you can see
- **Web Workers**: Heavy work happens in background
- **Lazy Images**: Pictures load when you scroll to them
- **Right Image Size**: Not too big, not too small

### What This Means

- **Fast Loading**: App starts quickly
- **Less Data**: Uses less internet
- **Works on Slow Connections**: Even on mobile data
- **Better User Experience**: Everything feels snappy

## 🚨 Error Handling

The app has comprehensive error handling with Error Boundaries wrapping the whole application to catch React component crashes, and a robust API error handling mechanism with proper error states, retry mechanisms, and user-friendly error messages.
