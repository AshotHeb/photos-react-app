import { Header } from './header'
import { Main } from './main'
import { Footer } from './footer'
import { BaseLayoutContainer } from './styled'
import type { BaseLayoutProps } from './types'

export const BaseLayout = ({ children }: BaseLayoutProps) => {
  return (
    <BaseLayoutContainer>
      <Header />
      <Main>{children}</Main>
      <Footer />
    </BaseLayoutContainer>
  )
}
