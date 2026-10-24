export interface StepItem {
  number: string;
  title: string;
  desc: string;
  badge: string;
}

export interface MetricItem {
  value: string;
  label: string;
  detail: string;
}

export interface ExplainerProps {
  brandName?: string;
  topicTitle?: string;
  topicSubtitle?: string;
  accentColor?: string;
  secondaryColor?: string;
  steps?: StepItem[];
  metrics?: MetricItem[];
}
