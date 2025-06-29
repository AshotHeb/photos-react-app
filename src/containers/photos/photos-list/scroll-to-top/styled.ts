import styled, { keyframes } from 'styled-components'

const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(30px) scale(0.8);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
`

const pulse = keyframes`
  0% {
    box-shadow: 0 0 0 0 rgba(99, 102, 241, 0.7);
  }
  70% {
    box-shadow: 0 0 0 10px rgba(99, 102, 241, 0);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(99, 102, 241, 0);
  }
`

const float = keyframes`
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-5px);
  }
`

export const ScrollToTopButton = styled.button`
  position: fixed;
  bottom: 40px;
  right: 40px;
  width: 56px;
  height: 56px;
  background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #a855f7 100%);
  border: none;
  border-radius: 18px;
  color: white;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 8px 32px rgba(99, 102, 241, 0.3), 0 2px 8px rgba(0, 0, 0, 0.1),
    inset 0 1px 0 rgba(255, 255, 255, 0.2);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  z-index: 1000;
  animation: ${fadeInUp} 0.6s ease-out, ${float} 3s ease-in-out infinite;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);

  &:hover {
    transform: translateY(-3px) scale(1.05);
    box-shadow: 0 12px 40px rgba(99, 102, 241, 0.4),
      0 4px 12px rgba(0, 0, 0, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.3);
    animation: ${pulse} 1.5s infinite;
  }

  &:active {
    transform: translateY(-1px) scale(1.02);
    transition: all 0.1s ease;
  }

  &:focus {
    outline: none;
    box-shadow: 0 8px 32px rgba(99, 102, 241, 0.3), 0 2px 8px rgba(0, 0, 0, 0.1),
      0 0 0 3px rgba(99, 102, 241, 0.3);
  }

  /* Glass morphism effect */
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    border-radius: 18px;
    background: linear-gradient(
      135deg,
      rgba(255, 255, 255, 0.1) 0%,
      rgba(255, 255, 255, 0.05) 100%
    );
    pointer-events: none;
  }

  @media (max-width: 768px) {
    bottom: 24px;
    right: 24px;
    width: 52px;
    height: 52px;
    border-radius: 16px;

    &:hover {
      transform: translateY(-2px) scale(1.03);
    }
  }

  @media (max-width: 480px) {
    bottom: 20px;
    right: 20px;
    width: 48px;
    height: 48px;
    border-radius: 14px;
  }
`

export const ArrowIcon = styled.div`
  position: relative;
  width: 0;
  height: 0;
  border-left: 10px solid transparent;
  border-right: 10px solid transparent;
  border-bottom: 16px solid white;
  margin-top: 2px;
  filter: drop-shadow(0 1px 2px rgba(0, 0, 0, 0.1));
  transition: all 0.3s ease;

  /* Arrow glow effect */
  &::after {
    content: '';
    position: absolute;
    top: -2px;
    left: -10px;
    width: 20px;
    height: 20px;
    background: radial-gradient(
      circle,
      rgba(255, 255, 255, 0.3) 0%,
      transparent 70%
    );
    border-radius: 50%;
    z-index: -1;
  }

  ${ScrollToTopButton}:hover & {
    transform: translateY(-1px);
    filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.15));
  }

  @media (max-width: 768px) {
    border-left: 9px solid transparent;
    border-right: 9px solid transparent;
    border-bottom: 14px solid white;

    &::after {
      width: 18px;
      height: 18px;
      left: -9px;
    }
  }

  @media (max-width: 480px) {
    border-left: 8px solid transparent;
    border-right: 8px solid transparent;
    border-bottom: 12px solid white;

    &::after {
      width: 16px;
      height: 16px;
      left: -8px;
    }
  }
`
