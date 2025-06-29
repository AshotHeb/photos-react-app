import styled, { keyframes } from 'styled-components'

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`

// Main Container
export const Container = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 20px;
`

export const Content = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 400px;
  gap: 40px;
  align-items: start;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
    gap: 30px;
  }
`

// Loading Spinner
export const LoadingSpinner = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 60vh;
  gap: 20px;
`

export const Spinner = styled.div`
  width: 50px;
  height: 50px;
  border: 4px solid rgba(255, 255, 255, 0.3);
  border-top: 4px solid white;
  border-radius: 50%;
  animation: ${spin} 1s linear infinite;
`

export const LoadingText = styled.p`
  color: white;
  font-size: 18px;
  font-weight: 500;
  margin: 0;
`

// Error Display
export const ErrorContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 60vh;
  gap: 20px;
  text-align: center;
`

export const ErrorIcon = styled.div`
  font-size: 48px;
  margin-bottom: 10px;
`

export const ErrorText = styled.p`
  color: white;
  font-size: 18px;
  font-weight: 500;
  margin: 0;
  max-width: 400px;
`

export const BackButton = styled.button`
  background: rgba(255, 255, 255, 0.9);
  border: none;
  border-radius: 8px;
  padding: 12px 20px;
  font-size: 16px;
  font-weight: 500;
  color: #333;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);

  &:hover {
    background: rgba(255, 255, 255, 1);
    transform: translateY(-2px);
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
  }

  &:active {
    transform: translateY(0);
  }
`

// Header
export const Header = styled.header`
  margin-bottom: 30px;
`

// Photo Display
export const PhotoSection = styled.div`
  display: flex;
  justify-content: center;
`

export const PhotoWrapper = styled.div`
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
  background: white;
  max-width: 100%;
`

export const PhotoImage = styled.img`
  width: 100%;
  height: auto;
  display: block;
  object-fit: cover;
`

// Photo Info
export const InfoSection = styled.div`
  position: sticky;
  top: 20px;
`

export const InfoCard = styled.div`
  background: rgba(255, 255, 255, 0.95);
  border-radius: 16px;
  padding: 30px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  backdrop-filter: blur(10px);
`

export const Title = styled.h1`
  font-size: 24px;
  font-weight: 600;
  color: #333;
  margin: 0 0 25px 0;
  line-height: 1.3;
`

export const InfoGrid = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-bottom: 30px;
`

export const InfoItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`

export const InfoLabel = styled.span`
  font-size: 14px;
  font-weight: 500;
  color: #666;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`

export const InfoValue = styled.span`
  font-size: 16px;
  color: #333;
  font-weight: 500;
`

export const PhotographerLink = styled.a`
  color: #667eea;
  text-decoration: none;
  font-weight: 500;
  transition: color 0.3s ease;

  &:hover {
    color: #764ba2;
    text-decoration: underline;
  }
`

export const ColorSwatch = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`

export const ColorBox = styled.div<{ $color: string }>`
  width: 30px;
  height: 30px;
  border-radius: 6px;
  background-color: ${(props) => props.$color};
  border: 2px solid #e0e0e0;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`

export const ColorValue = styled.span`
  font-family: 'Courier New', monospace;
  font-size: 14px;
  color: #666;
`

export const DownloadSection = styled.div`
  border-top: 1px solid #e0e0e0;
  padding-top: 25px;
`

export const DownloadTitle = styled.h3`
  font-size: 18px;
  font-weight: 600;
  color: #333;
  margin: 0 0 15px 0;
`

export const DownloadGrid = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`

export const DownloadButton = styled.a`
  background: #667eea;
  color: white;
  text-decoration: none;
  padding: 12px 16px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  text-align: center;
  transition: all 0.3s ease;

  &:hover {
    background: #764ba2;
    transform: translateY(-2px);
    box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
  }
`
