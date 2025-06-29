import React from 'react'
import { useLoadMore } from './hooks'
import * as Styled from './styled'
import { usePhotoHasMore } from '@/stores'
import type { LoadMoreProps } from './types'

export const LoadMore: React.FC<LoadMoreProps> = React.memo(({ isLoading }) => {
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
    <Styled.LoadMoreTrigger ref={observerRef} $isVisible={isLoading}>
      <Styled.Spinner />
    </Styled.LoadMoreTrigger>
  )
})
