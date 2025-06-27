export interface SearchSectionProps {
  onSearch?: (query: string) => void
  placeholder?: string
  disabled?: boolean
}

export interface SearchState {
  query: string
  isSearching: boolean
}
