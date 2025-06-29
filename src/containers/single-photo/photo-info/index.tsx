import React from 'react'
import {
  InfoSection,
  InfoCard,
  Title,
  InfoGrid,
  InfoItem,
  InfoLabel,
  InfoValue,
  PhotographerLink,
  ColorSwatch,
  ColorBox,
  ColorValue,
  DownloadSection,
  DownloadTitle,
  DownloadGrid,
  DownloadButton
} from '../styled'
import type { PhotoInfoProps, DownloadSectionProps } from '../types'

export const PhotoInfo: React.FC<PhotoInfoProps> = ({ photo }) => {
  return (
    <InfoSection>
      <InfoCard>
        <Title>{photo.alt || 'Untitled Photo'}</Title>

        <InfoGrid>
          <InfoItem>
            <InfoLabel>Photographer</InfoLabel>
            <InfoValue>
              {photo.photographer_url ? (
                <PhotographerLink
                  href={photo.photographer_url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {photo.photographer}
                </PhotographerLink>
              ) : (
                photo.photographer
              )}
            </InfoValue>
          </InfoItem>

          <InfoItem>
            <InfoLabel>Dimensions</InfoLabel>
            <InfoValue>
              {photo.width} × {photo.height} px
            </InfoValue>
          </InfoItem>

          <InfoItem>
            <InfoLabel>Photo ID</InfoLabel>
            <InfoValue>{photo.id}</InfoValue>
          </InfoItem>

          <InfoItem>
            <InfoLabel>Average Color</InfoLabel>
            <ColorSwatch>
              <ColorBox $color={photo.avg_color} />
              <ColorValue>{photo.avg_color}</ColorValue>
            </ColorSwatch>
          </InfoItem>
        </InfoGrid>

        <DownloadSectionComponent photo={photo} />
      </InfoCard>
    </InfoSection>
  )
}

const DownloadSectionComponent: React.FC<DownloadSectionProps> = ({
  photo
}) => {
  return (
    <DownloadSection>
      <DownloadTitle>Download Options</DownloadTitle>
      <DownloadGrid>
        <DownloadButton
          href={photo.src.original}
          target="_blank"
          rel="noopener noreferrer"
        >
          Original ({photo.width}×{photo.height})
        </DownloadButton>
        <DownloadButton
          href={photo.src.large2x}
          target="_blank"
          rel="noopener noreferrer"
        >
          Large 2x
        </DownloadButton>
        <DownloadButton
          href={photo.src.large}
          target="_blank"
          rel="noopener noreferrer"
        >
          Large
        </DownloadButton>
      </DownloadGrid>
    </DownloadSection>
  )
}
