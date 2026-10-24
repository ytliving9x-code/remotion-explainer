import React from "react";
import { interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { XRayHUDOverlay } from "./XRayHUDOverlay";
import { XRayLaserScan } from "./XRayLaserScan";
import { XRayPistolExploded } from "./XRayPistolExploded";
import { TikTokHeader } from "../PistolExplainer/TikTokHeader";
import { KineticCaptions } from "../PistolExplainer/KineticCaptions";
import { AudioTracks } from "../PistolExplainer/AudioTracks";

export const XRayVideo: React.FC = () => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();

  // Dynamic Camera Zoom & Orbit Tilt
  let cameraScale = 1.0;
  let cameraTranslateX = 0;
  let cameraTranslateY = 0;

  if (frame < 75) {
    // Stage 1: Laser Scan Intro
    cameraScale = interpolate(frame, [0, 75], [0.92, 1.0], { extrapolateRight: "clamp" });
  } else if (frame >= 75 && frame < 220) {
    // Stage 2: Exploded View (Pull back slightly to see all floating parts)
    cameraScale = interpolate(frame, [75, 110], [1.0, 0.94], { extrapolateRight: "clamp" });
    cameraTranslateY = -15;
  } else if (frame >= 220 && frame < 420) {
    // Stage 3: Zoom into Firing Pin & Chamber
    cameraScale = interpolate(frame, [220, 260], [0.94, 1.22], { extrapolateRight: "clamp" });
    cameraTranslateX = interpolate(frame, [220, 260], [0, 60], { extrapolateRight: "clamp" });
    cameraTranslateY = -20;
  } else if (frame >= 420 && frame < 650) {
    // Stage 4: Recoil & Casing Ejection view
    cameraScale = interpolate(frame, [420, 460], [1.22, 1.12], { extrapolateRight: "clamp" });
    cameraTranslateX = 0;
    cameraTranslateY = 0;
  } else {
    // Stage 5: Outro Rapid Fire Hologram
    cameraScale = 1.02;
    cameraTranslateX = 0;
    cameraTranslateY = 0;
  }

  return (
    <div
      style={{
        position: "relative",
        width: 1080,
        height: 1920,
        backgroundColor: "#030712",
        overflow: "hidden",
        fontFamily: "'Segoe UI', Roboto, -apple-system, sans-serif",
      }}
    >
      {/* Sci-Fi Cyan Radial Nebula Core */}
      <div
        style={{
          position: "absolute",
          top: "40%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 900,
          height: 900,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(0, 245, 255, 0.12) 0%, rgba(2, 132, 199, 0.04) 50%, transparent 70%)",
          filter: "blur(90px)",
          pointerEvents: "none",
        }}
      />

      {/* Cyber Hexagonal/Grid Matrix Texture */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `
            linear-gradient(rgba(0, 245, 255, 0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 245, 255, 0.04) 1px, transparent 1px)
          `,
          backgroundSize: "48px 48px",
          pointerEvents: "none",
        }}
      />

      {/* Clean Top Header (Title + Progress Bar + 4 Step Pills) */}
      <TikTokHeader
        totalFrames={durationInFrames}
        accentColor="#00F5FF"
        secondaryColor="#38BDF8"
      />

      {/* Sci-Fi HUD Overlay Elements */}
      <XRayHUDOverlay />

      {/* Dynamic Laser Scanline */}
      <XRayLaserScan />

      {/* Exploded View & X-Ray Mechanics */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          transform: `translate(${cameraTranslateX}px, ${cameraTranslateY}px) scale(${cameraScale})`,
          transformOrigin: "center center",
          transition: "transform 0.05s linear",
        }}
      >
        <XRayPistolExploded />
      </div>

      {/* Kinetic Word-by-Word Captions */}
      <KineticCaptions />

      {/* Multi-layered Synchronized Audio */}
      <AudioTracks />
    </div>
  );
};
