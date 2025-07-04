import styled from 'styled-components'

export const PhotoItemWrapper = styled.div`
  position: relative;
  border-radius: 8px;
  overflow: hidden;
  background: white;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  cursor: pointer;

  &:hover {
    transform: translateY(-4px) scale(1.02);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
    z-index: 10;
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(
      to bottom,
      transparent 0%,
      transparent 70%,
      rgba(0, 0, 0, 0.1) 100%
    );
    z-index: 1;
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  &:hover::before {
    opacity: 1;
  }
`

export const PhotoImage = styled.img<{
  $aspectRatio: number
  $isLoaded: boolean
}>`
  width: 100%;
  height: auto;
  display: block;
  object-fit: cover;
  transition: transform 0.3s ease, opacity 0.3s ease;
  opacity: ${({ $isLoaded }) => ($isLoaded ? 1 : 0)};

  ${PhotoItemWrapper}:hover & {
    transform: scale(1.05);
  }
`

export const PhotoOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s ease;
  z-index: 2;

  ${PhotoItemWrapper}:hover & {
    opacity: 1;
  }
`

export const ViewDetailsText = styled.span`
  color: white;
  font-size: 16px;
  font-weight: 500;
  text-align: center;
  padding: 20px;
`

export const MasonryItem = styled.div`
  position: absolute;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  cursor: pointer;
`
