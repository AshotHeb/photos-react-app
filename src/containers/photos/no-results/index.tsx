import React from 'react'
import { useSearchQuery } from '@/stores/search-photos-store'
import * as Styled from './styled'

export const NoResults: React.FC = React.memo(() => {
  const searchQuery = useSearchQuery()
  return (
    <Styled.NoResultsContainer>
      <Styled.NoResultsIcon>🔍</Styled.NoResultsIcon>
      <Styled.NoResultsTitle>No results found</Styled.NoResultsTitle>
      <Styled.NoResultsMessage>
        We couldn't find any photos matching "{searchQuery}"
      </Styled.NoResultsMessage>
      <Styled.NoResultsSuggestions>
        <p>Try:</p>
        <ul>
          <li>Using different keywords</li>
          <li>Checking your spelling</li>
          <li>Using more general terms</li>
          <li>Removing filters</li>
        </ul>
      </Styled.NoResultsSuggestions>
    </Styled.NoResultsContainer>
  )
})
