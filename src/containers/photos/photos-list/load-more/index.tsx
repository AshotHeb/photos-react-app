import React from 'react'
import { useLoadMore } from './hooks'
import * as Styled from './styled'

export const LoadMore: React.FC = React.memo(() => {
  const { observerRef, hasMore } = useLoadMore()

  if (!hasMore) {
    return (
      <Styled.EndMessage>
        <p>You've reached the end! 🎉</p>
      </Styled.EndMessage>
    )
  }

  return (
    <Styled.LoadMoreTrigger ref={observerRef}>
      <Styled.Spinner />
    </Styled.LoadMoreTrigger>
  )
})
