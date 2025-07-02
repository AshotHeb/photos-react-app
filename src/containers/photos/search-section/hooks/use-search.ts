import { useState, useCallback, useEffect, useRef } from 'react'
import { useDebounceString } from '@/hooks/use-debounce-string'
import {
  useIsSearching,
  useSearchPhotos,
  useSearchQuery,
  useClearSearchQuery
} from '@/stores/search-photos-store'
import type { SearchHookReturn } from './types'

const SEARCH_DEBOUNCE_DELAY = 700 // 700ms delay

export const useSearch = (): SearchHookReturn => {
  const storeQuery = useSearchQuery()
  const [inputValue, setInputValue] = useState(storeQuery)
  const isSearching = useIsSearching()
  const searchPhotos = useSearchPhotos()
  const clearSearchQuery = useClearSearchQuery()
  const inputRef = useRef<HTMLInputElement>(null)

  // Debounce the input value for search
  const debouncedInputValue = useDebounceString(
    inputValue,
    SEARCH_DEBOUNCE_DELAY
  )

  // Sync input value with store query when store query changes
  useEffect(() => {
    setInputValue(storeQuery)
  }, [storeQuery])

  // Handle debounced search
  useEffect(() => {
    const trimmedValue = debouncedInputValue.trim()

    if (trimmedValue && trimmedValue !== storeQuery) {
      searchPhotos(trimmedValue)
    } else if (!trimmedValue && storeQuery.trim()) {
      clearSearchQuery()
    }
  }, [debouncedInputValue, storeQuery, searchPhotos, clearSearchQuery])

  // Keep focus on input after search completes

  // Handle input change
  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.value
      setInputValue(newValue)
    },
    []
  )

  // Handle Enter key press (optional, for immediate search)
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter') {
        const trimmedValue = inputValue.trim()
        if (trimmedValue && trimmedValue !== storeQuery) {
          searchPhotos(trimmedValue)
        }
      }
    },
    [inputValue, searchPhotos, storeQuery]
  )

  // Handle clear search
  const handleClearSearch = useCallback(() => {
    setInputValue('')
    clearSearchQuery()
  }, [clearSearchQuery])

  return {
    // State
    inputValue,
    isSearching,
    inputRef,

    // Handlers
    handleInputChange,
    handleKeyDown,
    handleClearSearch
  }
}
