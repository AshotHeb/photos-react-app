import type { ChangeEvent, KeyboardEvent } from 'react'

export interface SearchHookReturn {
  // State
  inputValue: string
  isSearching: boolean

  // Event handlers
  handleInputChange: (e: ChangeEvent<HTMLInputElement>) => void
  handleSearchClick: () => void
  handleKeyDown: (e: KeyboardEvent<HTMLInputElement>) => void

  // Computed values
  isSearchDisabled: boolean
}
