import React from 'react'
import { BaseLayout } from '@layouts/base-layout'
import * as Styled from './styled'
import { SearchSection } from './search-section'
import { PhotosList } from './photos-list'

export const Photos = React.memo(() => {
  return (
    <BaseLayout>
      <Styled.PhotosPage>
        <SearchSection />
        <Styled.PhotosSection>
          <PhotosList />
        </Styled.PhotosSection>
      </Styled.PhotosPage>
    </BaseLayout>
  )
})
