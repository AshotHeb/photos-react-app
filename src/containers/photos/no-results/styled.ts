import styled from 'styled-components'

export const NoResultsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 4rem 2rem;
  text-align: center;
  min-height: 400px;
  background: white;
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  margin: 2rem auto;
  max-width: 600px;
`

export const NoResultsIcon = styled.div`
  font-size: 4rem;
  margin-bottom: 1.5rem;
  opacity: 0.7;
`

export const NoResultsTitle = styled.h2`
  font-size: 1.8rem;
  font-weight: 700;
  color: #374151;
  margin: 0 0 1rem 0;
`

export const NoResultsMessage = styled.p`
  font-size: 1.1rem;
  color: #6b7280;
  margin: 0 0 2rem 0;
  line-height: 1.6;
`

export const NoResultsSuggestions = styled.div`
  text-align: left;
  background: #f9fafb;
  padding: 1.5rem;
  border-radius: 12px;
  border-left: 4px solid #667eea;

  p {
    font-weight: 600;
    color: #374151;
    margin: 0 0 0.75rem 0;
  }

  ul {
    margin: 0;
    padding-left: 1.5rem;
    color: #6b7280;
  }

  li {
    margin-bottom: 0.5rem;
    line-height: 1.5;
  }
`
