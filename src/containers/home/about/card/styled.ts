import styled from 'styled-components'

export const AboutCard = styled.div`
  background: white;
  border-radius: 16px;
  padding: 32px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
  border: 1px solid #f3f4f6;

  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 12px 40px rgba(255, 107, 107, 0.15);
    border-color: #ff6b6b;
  }
`

export const CardIcon = styled.div`
  width: 64px;
  height: 64px;
  background: linear-gradient(135deg, #ff6b6b 0%, #ff8e8e 100%);
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 28px;
  margin-bottom: 20px;
  box-shadow: 0 4px 12px rgba(255, 107, 107, 0.3);
`

export const CardTitle = styled.h3`
  font-size: 20px;
  font-weight: 600;
  color: #1f2937;
  margin: 0 0 12px 0;
`

export const CardDescription = styled.p`
  font-size: 14px;
  color: #6b7280;
  line-height: 1.6;
  margin: 0;
`
