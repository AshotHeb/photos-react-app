import React from 'react'
import { BaseLayout } from '@layouts/base-layout'
import { useShowSearchNoResults } from '@/stores/app-selectors'
import * as Styled from './styled'
import { SearchSection } from './search-section'
import { PhotosList } from './photos-list'
import { NoResults } from './no-results'

export const Photos = React.memo(() => {
  const showNoResults = useShowSearchNoResults()

  return (
    <BaseLayout>
      <Styled.PhotosPage>
        <SearchSection />
        <Styled.PhotosSection>
          {showNoResults ? <NoResults /> : <PhotosList />}
        </Styled.PhotosSection>
      </Styled.PhotosPage>
    </BaseLayout>
  )
})
