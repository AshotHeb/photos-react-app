import React from 'react'
import { useSearch } from './hooks'

import * as Styled from './styled'
import { Spinner } from '@/lib/components/spinner'

export const SearchSection = React.memo(() => {
  const {
    inputValue,
    isSearching,
    handleInputChange,
    handleSearchClick,
    handleKeyDown,
    isSearchDisabled
  } = useSearch()

  return (
    <Styled.SearchSection>
      <Styled.SearchContainer>
        <Styled.SearchInput
          type="text"
          placeholder="Search photos..."
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          disabled={isSearching}
        />
        <Styled.SearchButton
          onClick={handleSearchClick}
          disabled={isSearchDisabled}
        >
          {isSearching ? <Spinner /> : 'Search'}
        </Styled.SearchButton>
      </Styled.SearchContainer>
    </Styled.SearchSection>
  )
})
