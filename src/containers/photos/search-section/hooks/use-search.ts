import { useState, useCallback, useEffect } from 'react'
import {
  useIsSearching,
  useSearchPhotos,
  useSearchQuery
} from '@/stores/search-photos-store'
import type { SearchHookReturn } from './types'

export const useSearch = (): SearchHookReturn => {
  const [inputValue, setInputValue] = useState('')
  const isSearching = useIsSearching()
  const searchPhotos = useSearchPhotos()
  const storeQuery = useSearchQuery()

  // Sync input value with store query when component mounts or store query changes
  useEffect(() => {
    setInputValue(storeQuery)
  }, [storeQuery])

  // Handle input change
  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setInputValue(e.target.value)
    },
    []
  )

  // Handle search button click
  const handleSearchClick = useCallback(() => {
    if (inputValue.trim()) {
      searchPhotos(inputValue.trim())
    }
  }, [inputValue, searchPhotos])

  // Handle Enter key press
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter' && inputValue.trim()) {
        searchPhotos(inputValue.trim())
      }
    },
    [inputValue, searchPhotos]
  )

  return {
    // State
    inputValue,
    isSearching,

    // Handlers
    handleInputChange,
    handleSearchClick,
    handleKeyDown,

    // Computed values
    isSearchDisabled: isSearching || !inputValue.trim()
  }
}
