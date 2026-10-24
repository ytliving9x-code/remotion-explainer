import React from "react";
import { interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { TikTokHeader } from "./TikTokHeader";
import { GunSchematic } from "./GunSchematic";
import { KineticCaptions } from "./KineticCaptions";
import { AudioTracks } from "./AudioTracks";
import { PistolExplainerProps } from "./types";

export const PistolExplainerVideo: React.FC<PistolExplainerProps> = ({
  accentColor = "#F59E0B",
  secondaryColor = "#38BDF8",
}) => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();

  // Dynamic Camera Zoom & Pan across phases
  let cameraScale = 1.0;
  let cameraTranslateX = 0;
  let cameraTranslateY = 0;

  if (frame < 90) {
    // Phase 0: Intro overview
    cameraScale = interpolate(frame, [0, 90], [0.95, 1.0], {
      extrapolateRight: "clamp",
    });
  } else if (frame >= 90 && frame < 240) {
    // Phase 1: Zoom into Firing Pin & Chamber
    cameraScale = interpolate(frame, [90, 130], [1.0, 1.2], {
      extrapolateRight: "clamp",
    });
    cameraTranslateX = interpolate(frame, [90, 130], [0, 80], {
      extrapolateRight: "clamp",
    });
    cameraTranslateY = interpolate(frame, [90, 130], [0, -20], {
      extrapolateRight: "clamp",
    });
  } else if (frame >= 240 && frame < 420) {
    // Phase 2: Follow Bullet accelerating down barrel
    cameraScale = interpolate(frame, [240, 280], [1.2, 1.25], {
      extrapolateRight: "clamp",
    });
    cameraTranslateX = interpolate(frame, [240, 320], [80, -120], {
      extrapolateRight: "clamp",
    });
    cameraTranslateY = -20;
  } else if (frame >= 420 && frame < 600) {
    // Phase 3: Recoil & Casing Ejection view
    cameraScale = interpolate(frame, [420, 460], [1.25, 1.15], {
      extrapolateRight: "clamp",
    });
    cameraTranslateX = interpolate(frame, [420, 460], [-120, 0], {
      extrapolateRight: "clamp",
    });
    cameraTranslateY = interpolate(frame, [420, 460], [-20, 10], {
      extrapolateRight: "clamp",
    });
  } else if (frame >= 600 && frame < 780) {
    // Phase 4: Focus on Recoil Spring & Magazine chambering
    cameraScale = interpolate(frame, [600, 640], [1.15, 1.2], {
      extrapolateRight: "clamp",
    });
    cameraTranslateX = interpolate(frame, [600, 640], [0, -30], {
      extrapolateRight: "clamp",
    });
    cameraTranslateY = interpolate(frame, [600, 640], [10, -30], {
      extrapolateRight: "clamp",
    });
  } else {
    // Phase 5: Outro rapid fire loop
    cameraScale = interpolate(frame, [780, 820], [1.2, 1.02], {
      extrapolateRight: "clamp",
    });
    cameraTranslateX = 0;
    cameraTranslateY = 0;
  }

  // Subtle background pulse
  const bgPulse = interpolate(
    Math.sin((frame / 30) * Math.PI * 2),
    [-1, 1],
    [0.15, 0.25]
  );

  return (
    <div
      style={{
        position: "relative",
        width: 1080,
        height: 1920,
        backgroundColor: "#070B14",
        overflow: "hidden",
        fontFamily: "'Segoe UI', Roboto, -apple-system, sans-serif",
      }}
    >
      {/* Background Gradients & Glows */}
      <div
        style={{
          position: "absolute",
          top: -200,
          left: -200,
          width: 800,
          height: 800,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${secondaryColor}35 0%, transparent 70%)`,
          filter: "blur(80px)",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: 300,
          right: -200,
          width: 900,
          height: 900,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${accentColor}${Math.round(
            bgPulse * 100
          )} 0%, transparent 70%)`,
          filter: "blur(100px)",
          pointerEvents: "none",
        }}
      />

      {/* Cyber Technical Grid Overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `
            linear-gradient(rgba(56, 189, 248, 0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(56, 189, 248, 0.04) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
          pointerEvents: "none",
        }}
      />

      {/* Persistent TikTok Header (Timer & Phase Stepper) */}
      <TikTokHeader
        totalFrames={durationInFrames}
        accentColor={accentColor}
        secondaryColor={secondaryColor}
      />

      {/* Dynamic Schematic Container with Camera Transform */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          transform: `translate(${cameraTranslateX}px, ${cameraTranslateY}px) scale(${cameraScale})`,
          transformOrigin: "center center",
          transition: "transform 0.05s linear",
        }}
      >
        <GunSchematic />
      </div>

      {/* Punchy Kinetic Captions at Safe Zone */}
      <KineticCaptions />

      {/* Voiceover and Sound Effects (SFX) Audio Tracks */}
      <AudioTracks />
    </div>
  );
};
