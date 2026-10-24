import React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";

interface ProgressBarProps {
  currentSection: string;
  brandName?: string;
  accentColor?: string;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  currentSection,
  brandName = "REMOTION EXPLAINER",
  accentColor = "#6366F1",
}) => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();

  const progress = Math.min(100, Math.max(0, (frame / durationInFrames) * 100));

  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        padding: "48px 80px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        zIndex: 50,
        fontFamily: "'Segoe UI', -apple-system, Roboto, sans-serif",
      }}
    >
      {/* Brand logo & title */}
      <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
        <div
          style={{
            width: "36px",
            height: "36px",
            borderRadius: "10px",
            background: `linear-gradient(135deg, ${accentColor}, #06B6D4)`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: `0 0 20px ${accentColor}66`,
          }}
        >
          <span style={{ color: "#fff", fontWeight: 800, fontSize: "18px" }}>▶</span>
        </div>
        <span
          style={{
            color: "#F1F5F9",
            fontWeight: 700,
            letterSpacing: "1.5px",
            fontSize: "20px",
            textTransform: "uppercase",
          }}
        >
          {brandName}
        </span>
      </div>

      {/* Chapter Indicator */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "12px",
          backgroundColor: "rgba(255, 255, 255, 0.06)",
          padding: "8px 20px",
          borderRadius: "999px",
          border: "1px solid rgba(255, 255, 255, 0.12)",
          backdropFilter: "blur(12px)",
        }}
      >
        <span
          style={{
            width: "8px",
            height: "8px",
            borderRadius: "50%",
            backgroundColor: "#10B981",
            boxShadow: "0 0 10px #10B981",
          }}
        />
        <span
          style={{
            color: "#E2E8F0",
            fontSize: "16px",
            fontWeight: 500,
          }}
        >
          {currentSection}
        </span>
      </div>

      {/* Progress Bar Line at Bottom */}
      <div
        style={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          height: "6px",
          backgroundColor: "rgba(255, 255, 255, 0.1)",
        }}
      >
        <div
          style={{
            height: "100%",
            width: `${progress}%`,
            background: `linear-gradient(90deg, ${accentColor}, #06B6D4, #10B981)`,
            boxShadow: `0 0 12px ${accentColor}`,
          }}
        />
      </div>
    </div>
  );
};
