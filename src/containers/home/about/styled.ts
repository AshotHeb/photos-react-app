import styled from 'styled-components'

// About Section Container
export const AboutSection = styled.section`
  padding: 80px 24px;
  background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
  min-height: 100vh;
  display: flex;
  align-items: center;
`

export const AboutContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
`

export const AboutHeader = styled.div`
  text-align: center;
  margin-bottom: 64px;
`

export const AboutTitle = styled.h1`
  font-size: 48px;
  font-weight: 700;
  color: #1f2937;
  margin: 0 0 16px 0;
  font-family: 'Poppins', sans-serif;
  background: linear-gradient(135deg, #ff6b6b 0%, #ff8e8e 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;

  @media (max-width: 768px) {
    font-size: 36px;
  }
`

export const AboutSubtitle = styled.p`
  font-size: 20px;
  color: #6b7280;
  margin: 0;
  line-height: 1.6;
  max-width: 600px;
  margin: 0 auto;

  @media (max-width: 768px) {
    font-size: 18px;
  }
`

// About Content
export const AboutContent = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 64px;
  align-items: center;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 48px;
  }
`

export const AboutText = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`

export const AboutDescription = styled.p`
  font-size: 18px;
  color: #4b5563;
  line-height: 1.8;
  margin: 0;
`

export const AboutFeatures = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`

export const AboutFeature = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 16px;
  color: #6b7280;
`

export const FeatureIcon = styled.span`
  width: 24px;
  height: 24px;
  background: #ff6b6b;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 12px;
  font-weight: bold;
`

// About Cards
export const AboutCards = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 24px;
`

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

// CTA Section
export const AboutCTA = styled.div`
  text-align: center;
  margin-top: 64px;
  padding: 48px;
  background: white;
  border-radius: 20px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
`

export const CTATitle = styled.h2`
  font-size: 32px;
  font-weight: 600;
  color: #1f2937;
  margin: 0 0 16px 0;
`

export const CTADescription = styled.p`
  font-size: 16px;
  color: #6b7280;
  margin: 0 0 32px 0;
  max-width: 500px;
  margin: 0 auto 32px auto;
`

export const CTAButton = styled.button`
  background: linear-gradient(135deg, #ff6b6b 0%, #ff8e8e 100%);
  color: white;
  border: none;
  padding: 16px 32px;
  border-radius: 12px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(255, 107, 107, 0.3);
  text-decoration: none;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 20px rgba(255, 107, 107, 0.4);
  }

  &:active {
    transform: translateY(0);
  }
`
