import React from 'react'
import { useSearch } from './hooks'

import * as Styled from './styled'
import { InputSpinner } from '@/lib/components/input-spinner'

export const SearchSection = React.memo(() => {
  const {
    inputValue,
    isSearching,
    inputRef,
    handleInputChange,
    handleKeyDown
  } = useSearch()

  return (
    <Styled.SearchSection>
      <Styled.SearchContainer>
        <Styled.SearchInputWrapper>
          <Styled.SearchInput
            ref={inputRef}
            type="text"
            placeholder="Search photos..."
            value={inputValue}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            disabled={isSearching}
          />
          {isSearching && (
            <Styled.SearchSpinner>
              <InputSpinner />
            </Styled.SearchSpinner>
          )}
        </Styled.SearchInputWrapper>
      </Styled.SearchContainer>
    </Styled.SearchSection>
  )
})
