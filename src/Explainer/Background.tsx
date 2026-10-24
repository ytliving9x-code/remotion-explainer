import React from "react";
import { interpolate, useCurrentFrame } from "remotion";

interface BackgroundProps {
  accentColor?: string;
  secondaryColor?: string;
}

export const Background: React.FC<BackgroundProps> = ({
  accentColor = "#6366F1",
  secondaryColor = "#06B6D4",
}) => {
  const frame = useCurrentFrame();

  // Floating ambient orbs movement
  const orb1X = interpolate(Math.sin(frame / 45), [-1, 1], [15, 35]);
  const orb1Y = interpolate(Math.cos(frame / 60), [-1, 1], [20, 40]);
  const orb2X = interpolate(Math.cos(frame / 50), [-1, 1], [65, 85]);
  const orb2Y = interpolate(Math.sin(frame / 70), [-1, 1], [50, 75]);
  const orb3X = interpolate(Math.sin(frame / 40), [-1, 1], [40, 60]);
  const orb3Y = interpolate(Math.cos(frame / 45), [-1, 1], [60, 80]);

  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "#070A12",
        overflow: "hidden",
        zIndex: 0,
      }}
    >
      {/* Subtle perspective grid lines */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: `
            linear-gradient(to right, rgba(255, 255, 255, 0.04) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255, 255, 255, 0.04) 1px, transparent 1px)
          `,
          backgroundSize: "80px 80px",
          opacity: 0.6,
        }}
      />

      {/* Gradient Orb 1 */}
      <div
        style={{
          position: "absolute",
          left: `${orb1X}%`,
          top: `${orb1Y}%`,
          width: 700,
          height: 700,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${accentColor} 0%, transparent 70%)`,
          filter: "blur(140px)",
          opacity: 0.28,
          transform: "translate(-50%, -50%)",
        }}
      />

      {/* Gradient Orb 2 */}
      <div
        style={{
          position: "absolute",
          left: `${orb2X}%`,
          top: `${orb2Y}%`,
          width: 650,
          height: 650,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${secondaryColor} 0%, transparent 70%)`,
          filter: "blur(130px)",
          opacity: 0.24,
          transform: "translate(-50%, -50%)",
        }}
      />

      {/* Gradient Orb 3 - Violet/Indigo center highlight */}
      <div
        style={{
          position: "absolute",
          left: `${orb3X}%`,
          top: `${orb3Y}%`,
          width: 500,
          height: 500,
          borderRadius: "50%",
          background: "radial-gradient(circle, #8B5CF6 0%, transparent 70%)",
          filter: "blur(120px)",
          opacity: 0.18,
          transform: "translate(-50%, -50%)",
        }}
      />

      {/* Subtle vignette border */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          boxShadow: "inset 0 0 160px rgba(0, 0, 0, 0.85)",
          pointerEvents: "none",
        }}
      />
    </div>
  );
};
