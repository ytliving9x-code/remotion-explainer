export interface CaptionSegment {
  fromFrame: number;
  toFrame: number;
  highlightText: string;
  subText: string;
  badge?: string;
  phaseNumber?: number;
}

export interface PistolExplainerProps {
  title?: string;
  fps?: number;
  durationInSeconds?: number;
  accentColor?: string;
  secondaryColor?: string;
  warningColor?: string;
}
