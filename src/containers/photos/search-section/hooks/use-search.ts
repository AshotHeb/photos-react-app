import { useState, useCallback, useEffect } from 'react'
import {
  useIsSearching,
  useSearchPhotos,
  useSearchQuery,
  useClearSearchQuery
} from '@/stores/search-photos-store'
import type { SearchHookReturn } from './types'

export const useSearch = (): SearchHookReturn => {
  const [inputValue, setInputValue] = useState('')
  const isSearching = useIsSearching()
  const searchPhotos = useSearchPhotos()
  const clearSearchQuery = useClearSearchQuery()
  const storeQuery = useSearchQuery()

  // Sync input value with store query when component mounts or store query changes
  useEffect(() => {
    setInputValue(storeQuery)
  }, [storeQuery])

  // Check if the search would be the same as current
  const isSameSearch = inputValue.trim() === storeQuery

  // Handle input change
  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.value
      setInputValue(newValue)

      // If input becomes empty, clear search and show all photos
      if (!newValue.trim() && storeQuery.trim()) {
        clearSearchQuery()
      }
    },
    [storeQuery, clearSearchQuery]
  )

  // Handle search button click
  const handleSearchClick = useCallback(() => {
    if (inputValue.trim() && !isSameSearch) {
      searchPhotos(inputValue.trim())
    }
  }, [inputValue, searchPhotos, isSameSearch])

  // Handle Enter key press
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter' && inputValue.trim() && !isSameSearch) {
        searchPhotos(inputValue.trim())
      }
    },
    [inputValue, searchPhotos, isSameSearch]
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

    // Handlers
    handleInputChange,
    handleSearchClick,
    handleKeyDown,
    handleClearSearch,

    // Computed values
    isSearchDisabled: isSearching || !inputValue.trim() || isSameSearch
  }
}
