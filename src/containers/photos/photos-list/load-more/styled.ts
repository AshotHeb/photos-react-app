import styled from 'styled-components'

export const LoadMoreTrigger = styled.div<{ $isVisible: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem;
  margin: 1rem 0;
  background: white;
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  opacity: ${(props) => (props.$isVisible ? 1 : 0)};
`

export const Spinner = styled.div`
  display: inline-block;
  width: 50px;
  height: 50px;
  border: 3px solid rgba(102, 126, 234, 0.3);
  border-radius: 50%;
  border-top-color: #667eea;
  animation: spin 1s ease-in-out infinite;

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`

export const EndMessage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 3rem;
  margin: 1rem 0;
  background: white;
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);

  p {
    color: #10b981;
    font-size: 1.1rem;
    font-weight: 600;
    margin: 0;
  }
`
