import { Loading } from './loading'
import { Error } from './error'
import { HeaderComponent } from './header'
import { PhotoDisplay } from './photo-display'
import { PhotoInfo } from './photo-info'
import { usePhotoData, useNavigation } from './hooks'
import { Container, Content } from './styled'

export const SinglePhoto = () => {
  const { photo, loading, error } = usePhotoData()
  const { handleBackClick } = useNavigation()

  if (loading) {
    return (
      <Container>
        <Loading />
      </Container>
    )
  }

  if (error || !photo) {
    return (
      <Container>
        <Error
          error={error || 'Photo not found'}
          onBackClick={handleBackClick}
        />
      </Container>
    )
  }

  return (
    <Container>
      <HeaderComponent onBackClick={handleBackClick} />

      <Content>
        <PhotoDisplay photo={photo} />
        <PhotoInfo photo={photo} />
      </Content>
    </Container>
  )
}
