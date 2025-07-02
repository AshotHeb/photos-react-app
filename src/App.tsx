import { BrowserRouter } from 'react-router-dom'
import { Pages } from '@pages'
import { ErrorBoundary } from '@/lib/components/error-boundary'

function App() {
  return (
    // Sentry for error reporting
    <ErrorBoundary>
      <BrowserRouter>
        <Pages />
      </BrowserRouter>
    </ErrorBoundary>
  )
}

export default App
