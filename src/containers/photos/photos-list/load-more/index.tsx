import React from 'react'
import { useLoadMore } from './hooks'
import * as Styled from './styled'
import { usePhotoHasMore } from '@/stores'

export const LoadMore: React.FC = React.memo(() => {
  const { observerRef } = useLoadMore()

  const hasMore = usePhotoHasMore()

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
