import styled from 'styled-components'

export const PhotosPage = styled.div`
  min-height: 100vh;
  background: #f8fafc;
  padding: 0;
  width: 100%;
`

export const SearchSection = styled.section`
  position: sticky;
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

export const SearchInput = styled.input`
  flex: 1;
  padding: 1rem 1.5rem;
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
`

export const PhotosSection = styled.section`
  padding: 2rem;
  width: 100%;

  @media (max-width: 768px) {
    padding: 1rem;
  }
`

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

export const PhotosGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
  padding: 1rem 0;
  width: 100%;
`

export const ResponsiveContainer = styled.div`
  @media (max-width: 768px) {
    ${SearchSection} {
      padding: 1rem;
    }

    ${PhotosSection} {
      padding: 1rem;
    }

    ${PhotosGrid} {
      grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
      gap: 1rem;
    }
  }

  @media (max-width: 480px) {
    ${PhotosGrid} {
      grid-template-columns: 1fr;
    }
  }
`
