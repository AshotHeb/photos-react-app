import styled, { keyframes } from 'styled-components'

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`

export const SpinnerContainer = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;
`

export const SmallSpinnerIcon = styled.div`
  width: 18px;
  height: 18px;
  border: 2px solid rgba(102, 126, 234, 0.3);
  border-top: 2px solid #667eea;
  border-radius: 50%;
  animation: ${spin} 1s linear infinite;
`
