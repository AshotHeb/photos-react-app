import styled, { keyframes } from 'styled-components'

const shimmer = keyframes`
  0% {
    background-position: -200px 0;
  }
  100% {
    background-position: calc(200px + 100%) 0;
  }
`

interface SkeletonContainerProps {
  $width: string | number
  $height: string | number
  $borderRadius: string | number
}

export const SkeletonContainer = styled.div<SkeletonContainerProps>`
  width: ${({ $width }) =>
    typeof $width === 'number' ? `${$width}px` : $width};
  height: ${({ $height }) =>
    typeof $height === 'number' ? `${$height}px` : $height};
  border-radius: ${({ $borderRadius }) =>
    typeof $borderRadius === 'number' ? `${$borderRadius}px` : $borderRadius};
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200px 100%;
  animation: ${shimmer} 1.5s infinite;
  display: block;
  border: 1px solid #d0d0d0;
`
