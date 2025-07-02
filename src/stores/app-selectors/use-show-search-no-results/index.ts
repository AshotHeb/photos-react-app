import {
  useSearchQuery,
  useHasSearchResults,
  useIsSearching
} from '@/stores/search-photos-store'

export const useShowSearchNoResults = (): boolean => {
  const searchQuery = useSearchQuery()
  const hasSearchResults = useHasSearchResults()
  const isSearching = useIsSearching()

  return !!searchQuery && !isSearching && !hasSearchResults
}
