import styled from 'styled-components'

// Footer Container Styles
export const FooterContainer = styled.footer`
  background: #ffffff;
  border-top: 1px solid #e5e7eb;
  width: 100%;
  padding: 40px 24px 24px;
  box-shadow: 0 -1px 3px rgba(0, 0, 0, 0.1);
`

export const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 40px;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 32px;
  }
`

export const FooterLeft = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  flex: 1;
`

export const FooterRight = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 48px;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 32px;
    width: 100%;
  }
`

// Footer Logo Styles
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

// Footer Links Styles
export const FooterLinksContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`

export const FooterLinksTitle = styled.h4`
  font-size: 16px;
  font-weight: 600;
  color: #1f2937;
  margin: 0;
`

export const FooterLinksList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 8px;
`

export const FooterLink = styled.a`
  color: #6b7280;
  text-decoration: none;
  font-size: 14px;
  transition: color 0.2s ease;

  &:hover {
    color: #ff6b6b;
  }
`

// Footer Social Styles
export const FooterSocialContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`

export const FooterSocialTitle = styled.h4`
  font-size: 16px;
  font-weight: 600;
  color: #1f2937;
  margin: 0;
`

export const FooterSocialList = styled.div`
  display: flex;
  gap: 12px;
`

export const FooterSocialLink = styled.a`
  width: 40px;
  height: 40px;
  background: #f3f4f6;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #6b7280;
  text-decoration: none;
  transition: all 0.2s ease;

  &:hover {
    background: #ff6b6b;
    color: white;
    transform: translateY(-2px);
  }
`

// Footer Bottom
export const FooterBottom = styled.div`
  border-top: 1px solid #f3f4f6;
  margin-top: 32px;
  padding-top: 24px;
  text-align: center;
`

export const FooterCopyright = styled.p`
  color: #9ca3af;
  font-size: 12px;
  margin: 0;
`
