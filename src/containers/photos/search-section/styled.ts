import styled from 'styled-components'

export const SearchSection = styled.section`
  position: relative;
  top: 0;
  z-index: 100;
  background: rgba(255, 255, 255, 0.98);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid #e2e8f0;
  padding: 1.5rem 2rem;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  width: 100%;
`

export const SearchContainer = styled.div`
  display: flex;
  gap: 1rem;
  max-width: 600px;
  margin: 0 auto;
`

export const SearchInputWrapper = styled.div`
  position: relative;
  flex: 1;
  display: flex;
  align-items: center;
`

export const SearchInput = styled.input`
  width: 100%;
  padding: 1rem 1.5rem;
  padding-right: 3rem; /* Make room for spinner */
  border: 2px solid #e1e5e9;
  border-radius: 12px;
  font-size: 1rem;
  background: white;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: #667eea;
    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
  }

  &::placeholder {
    color: #9ca3af;
  }

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`

export const SearchSpinner = styled.div`
  position: absolute;
  right: 1rem;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  align-items: center;
  justify-content: center;
`
