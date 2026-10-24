import React from "react";
import { Audio } from "@remotion/media";
import { Sequence, staticFile } from "remotion";

export const AudioTracks: React.FC = () => {
  return (
    <>
      {/* Background Music Loop - low volume ambient tension */}
      <Sequence from={0} durationInFrames={300}>
        <Audio src={staticFile("audio/bgm_tension.wav")} volume={0.16} />
      </Sequence>
      <Sequence from={300} durationInFrames={300}>
        <Audio src={staticFile("audio/bgm_tension.wav")} volume={0.16} />
      </Sequence>
      <Sequence from={600} durationInFrames={300}>
        <Audio src={staticFile("audio/bgm_tension.wav")} volume={0.16} />
      </Sequence>

      {/* 1. Voiceover Segments */}
      {/* Phase 0: Intro (0s - 3s) */}
      <Sequence from={10} durationInFrames={80}>
        <Audio src={staticFile("audio/voice_0.mp3")} volume={1.0} />
      </Sequence>

      {/* Phase 1: Step 1 Firing Pin (3s - 8s) */}
      <Sequence from={95} durationInFrames={145}>
        <Audio src={staticFile("audio/voice_1.mp3")} volume={1.0} />
      </Sequence>

      {/* Phase 2: Step 2 Explosion & Pressure (8s - 14s) */}
      <Sequence from={245} durationInFrames={175}>
        <Audio src={staticFile("audio/voice_2.mp3")} volume={1.0} />
      </Sequence>

      {/* Phase 3: Step 3 Recoil & Ejection (14s - 20s) */}
      <Sequence from={425} durationInFrames={175}>
        <Audio src={staticFile("audio/voice_3.mp3")} volume={1.0} />
      </Sequence>

      {/* Phase 4: Step 4 Spring & Chambering (20s - 26s) */}
      <Sequence from={605} durationInFrames={175}>
        <Audio src={staticFile("audio/voice_4.mp3")} volume={1.0} />
      </Sequence>

      {/* Phase 5: Outro & Call to Action (26s - 30s) */}
      <Sequence from={785} durationInFrames={115}>
        <Audio src={staticFile("audio/voice_5.mp3")} volume={1.0} />
      </Sequence>

      {/* 2. Sound Effects (SFX) Synchronized with Mechanical Actions */}
      {/* Trigger Click: When trigger is squeezed */}
      <Sequence from={120} durationInFrames={30}>
        <Audio src={staticFile("audio/sfx_click.wav")} volume={0.8} />
      </Sequence>

      {/* Gunshot Blast: When firing pin strikes primer & powder burns */}
      <Sequence from={148} durationInFrames={60}>
        <Audio src={staticFile("audio/sfx_blast.wav")} volume={0.9} />
      </Sequence>

      {/* Slide Recoil Clack: When slide kicks back */}
      <Sequence from={435} durationInFrames={40}>
        <Audio src={staticFile("audio/sfx_slide.wav")} volume={0.7} />
      </Sequence>

      {/* Brass Casing Ejection Ping: When casing flips into air */}
      <Sequence from={470} durationInFrames={40}>
        <Audio src={staticFile("audio/sfx_eject.wav")} volume={0.75} />
      </Sequence>

      {/* Chamber Lock Snap: When new round is pushed into battery */}
      <Sequence from={645} durationInFrames={35}>
        <Audio src={staticFile("audio/sfx_chamber.wav")} volume={0.8} />
      </Sequence>

      {/* Outro rapid firing SFX bursts */}
      <Sequence from={790} durationInFrames={30}>
        <Audio src={staticFile("audio/sfx_blast.wav")} volume={0.5} />
      </Sequence>
      <Sequence from={815} durationInFrames={30}>
        <Audio src={staticFile("audio/sfx_blast.wav")} volume={0.5} />
      </Sequence>
      <Sequence from={840} durationInFrames={30}>
        <Audio src={staticFile("audio/sfx_blast.wav")} volume={0.5} />
      </Sequence>
      <Sequence from={865} durationInFrames={30}>
        <Audio src={staticFile("audio/sfx_blast.wav")} volume={0.5} />
      </Sequence>
    </>
  );
};
