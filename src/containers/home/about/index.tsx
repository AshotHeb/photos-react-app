import React from 'react'
import { Link } from 'react-router-dom'
import * as Styled from './styled'
import { AboutCard } from './card'
import type { AboutSectionProps } from './types'
import { HOME_ABOUT_CARDS, HOME_ABOUT_FEATURES } from './data'

export const AboutSection: React.FC<AboutSectionProps> = React.memo(
  ({ className }) => {
    return (
      <Styled.AboutSection className={className}>
        <Styled.AboutContainer>
          <Styled.AboutHeader>
            <Styled.AboutTitle>Welcome to PhotoGallery</Styled.AboutTitle>
            <Styled.AboutSubtitle>
              Discover, explore, and get inspired by beautiful photography from
              around the world
            </Styled.AboutSubtitle>
          </Styled.AboutHeader>

          <Styled.AboutContent>
            <Styled.AboutText>
              <Styled.AboutDescription>
                PhotoGallery is your gateway to visual inspiration and
                creativity. Our platform showcases stunning photography from
                talented artists worldwide, featuring a modern, responsive
                design that makes browsing and discovering new images a
                delightful experience.
              </Styled.AboutDescription>

              <Styled.AboutFeatures>
                {HOME_ABOUT_FEATURES.map((feature, index) => (
                  <Styled.AboutFeature key={index}>
                    <Styled.FeatureIcon>✓</Styled.FeatureIcon>
                    {feature}
                  </Styled.AboutFeature>
                ))}
              </Styled.AboutFeatures>
            </Styled.AboutText>

            <Styled.AboutCards>
              {HOME_ABOUT_CARDS.map((card, index) => (
                <AboutCard
                  key={index}
                  icon={card.icon}
                  title={card.title}
                  description={card.description}
                />
              ))}
            </Styled.AboutCards>
          </Styled.AboutContent>

          <Styled.AboutCTA>
            <Styled.CTATitle>Ready to Explore?</Styled.CTATitle>
            <Styled.CTADescription>
              Start your journey through thousands of beautiful photos and
              discover your next inspiration.
            </Styled.CTADescription>
            <Styled.CTAButton as={Link} to="/photos">
              Explore Photos
            </Styled.CTAButton>
          </Styled.AboutCTA>
        </Styled.AboutContainer>
      </Styled.AboutSection>
    )
  }
)
