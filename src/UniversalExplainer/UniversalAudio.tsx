import React from "react";
import { Audio } from "@remotion/media";
import { Sequence, staticFile } from "remotion";
import { UniversalSegment } from "./types";

interface UniversalAudioProps {
  audioFolder?: string;
  segments: UniversalSegment[];
}

export const UniversalAudio: React.FC<UniversalAudioProps> = ({
  audioFolder = "audio",
  segments,
}) => {
  // Safe helper to generate static path
  const getAudioPath = (filename: string) => {
    return staticFile(`${audioFolder}/${filename}`);
  };

  const getSfxPath = (filename: string) => {
    // SFX can be in general audio/ folder
    return staticFile(`audio/${filename}`);
  };

  const segSpan = (780 - 90) / segments.length;

  return (
    <>
      {/* Background Music Loop */}
      <Sequence from={0} durationInFrames={300}>
        <Audio src={getSfxPath("bgm_tension.wav")} volume={0.16} />
      </Sequence>
      <Sequence from={300} durationInFrames={300}>
        <Audio src={getSfxPath("bgm_tension.wav")} volume={0.16} />
      </Sequence>
      <Sequence from={600} durationInFrames={300}>
        <Audio src={getSfxPath("bgm_tension.wav")} volume={0.16} />
      </Sequence>

      {/* Intro Voice (0s - 3s) */}
      <Sequence from={10} durationInFrames={80}>
        <Audio src={getAudioPath("voice_0.mp3")} volume={1.0} />
      </Sequence>

      {/* Dynamic Voiceover Segments */}
      {segments.map((seg, idx) => {
        const fromFrame = Math.floor(90 + idx * segSpan + 5);
        const duration = Math.floor(segSpan - 10);
        return (
          <Sequence key={seg.step} from={fromFrame} durationInFrames={duration}>
            <Audio src={getAudioPath(`voice_${seg.step}.mp3`)} volume={1.0} />
          </Sequence>
        );
      })}

      {/* Outro Voice (26s - 30s) */}
      <Sequence from={785} durationInFrames={115}>
        <Audio src={getAudioPath("voice_5.mp3")} volume={1.0} />
      </Sequence>

      {/* SFX triggers for steps */}
      <Sequence from={100} durationInFrames={30}>
        <Audio src={getSfxPath("sfx_click.wav")} volume={0.8} />
      </Sequence>
      <Sequence from={270} durationInFrames={50}>
        <Audio src={getSfxPath("sfx_blast.wav")} volume={0.85} />
      </Sequence>
      <Sequence from={450} durationInFrames={40}>
        <Audio src={getSfxPath("sfx_slide.wav")} volume={0.7} />
      </Sequence>
      <Sequence from={620} durationInFrames={40}>
        <Audio src={getSfxPath("sfx_chamber.wav")} volume={0.8} />
      </Sequence>
    </>
  );
};
