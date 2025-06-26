import styled from 'styled-components'

export const FooterLogoContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`

export const FooterLogoIcon = styled.div`
  width: 32px;
  height: 32px;
  background: linear-gradient(135deg, #ff6b6b 0%, #ff8e8e 100%);
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: 700;
  font-size: 16px;
  box-shadow: 0 2px 8px rgba(255, 107, 107, 0.3);
`

export const FooterLogoText = styled.h3`
  font-size: 20px;
  font-weight: 700;
  color: #1f2937;
  margin: 0;
  font-family: 'Poppins', sans-serif;
`

export const FooterDescription = styled.p`
  color: #6b7280;
  font-size: 14px;
  line-height: 1.6;
  margin: 0;
  max-width: 300px;
`
