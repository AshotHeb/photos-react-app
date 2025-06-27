import type { MainProps } from './types'
import * as Styled from './styled'

export const Main = ({ children }: MainProps) => {
  return <Styled.Main>{children}</Styled.Main>
}
