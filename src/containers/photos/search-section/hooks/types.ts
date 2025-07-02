import type { ChangeEvent, KeyboardEvent, RefObject } from 'react'

export interface SearchHookReturn {
  // State
  inputValue: string
  isSearching: boolean
  inputRef: RefObject<HTMLInputElement | null>

  // Event handlers
  handleInputChange: (e: ChangeEvent<HTMLInputElement>) => void
  handleKeyDown: (e: KeyboardEvent<HTMLInputElement>) => void
  handleClearSearch: () => void
}
