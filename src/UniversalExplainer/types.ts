export interface UniversalSegment {
  step: number;
  name: string;
  voiceText: string;
  highlight: string;
  subText: string;
  sfx?: string; // "click", "blast", "whoosh", "compress", "ignite", "thrust", "wave", "gear"
  icon?: string; // "fan", "pressure", "fire", "thrust", "gear", "wave", "network", "generic"
  startFrame?: number;
  durationFrames?: number;
}

export interface UniversalTheme {
  visualPack?: "blueprint" | "cyber" | "science";
  accentColor: string;
  secondaryColor: string;
  warningColor?: string;
}

export interface UniversalTopicConfig {
  id: string;
  title: string;
  category: string;
  theme: UniversalTheme;
  segments: UniversalSegment[];
  outro: {
    voiceText: string;
    highlight: string;
    subText: string;
    cta: string;
  };
  audioFolder?: string; // relative to public/ e.g. "audio/jet-engine"
}
