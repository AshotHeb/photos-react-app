import React from 'react'
import * as Styled from './styled'

export const SearchSection = React.memo(() => {
  return (
    <Styled.SearchSection>
      <Styled.SearchContainer>
        <Styled.SearchInput type="text" placeholder="Search photos..." />
        <Styled.SearchButton>Search</Styled.SearchButton>
      </Styled.SearchContainer>
    </Styled.SearchSection>
  )
})
