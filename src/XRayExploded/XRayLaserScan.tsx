import React from "react";
import { interpolate, useCurrentFrame } from "remotion";

export const XRayLaserScan: React.FC = () => {
  const frame = useCurrentFrame();

  // Laser sweep progress:
  // 0 - 65 frames: First epic scan from Left to Right
  // 350 - 410 frames: Second diagnostic scan
  let laserX = -100;
  let laserOpacity = 0;

  if (frame < 75) {
    laserX = interpolate(frame, [10, 65], [120, 960], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    });
    laserOpacity = interpolate(frame, [10, 20, 60, 75], [0, 1, 1, 0], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    });
  } else if (frame >= 350 && frame < 420) {
    laserX = interpolate(frame, [350, 410], [960, 120], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    });
    laserOpacity = interpolate(frame, [350, 360, 400, 420], [0, 0.8, 0.8, 0], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    });
  }

  if (laserOpacity <= 0) return null;

  return (
    <div
      style={{
        position: "absolute",
        top: 260,
        bottom: 340,
        left: laserX,
        width: 4,
        background: "#00F5FF",
        boxShadow: "0 0 20px #00F5FF, 0 0 40px #00F5FF, 0 0 80px #00F5FF",
        opacity: laserOpacity,
        pointerEvents: "none",
        zIndex: 35,
      }}
    >
      {/* Laser glow beam spreading vertically */}
      <div
        style={{
          position: "absolute",
          top: -20,
          bottom: -20,
          left: -40,
          width: 84,
          background:
            "linear-gradient(90deg, transparent 0%, rgba(0, 245, 255, 0.3) 50%, transparent 100%)",
          filter: "blur(4px)",
        }}
      />
    </div>
  );
};
