import styled from 'styled-components'

export const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 400px;
  background: white;
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
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

export const ErrorContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  padding: 3rem;
  background: white;
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);

  p {
    color: #ef4444;
    font-size: 1.1rem;
    margin: 0;
  }

  button {
    padding: 0.75rem 1.5rem;
    background: #ef4444;
    color: white;
    border: none;
    border-radius: 8px;
    font-size: 1rem;
    cursor: pointer;
    transition: all 0.3s ease;

    &:hover {
      background: #dc2626;
      transform: translateY(-1px);
    }
  }
`

export const MasonryContainer = styled.div`
  position: relative;
  width: 100%;
  padding: 1rem 0;
`

export const MasonryContent = styled.div`
  position: relative;
  width: 100%;
`

export const MasonryItem = styled.div`
  position: absolute;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  cursor: pointer;
`
