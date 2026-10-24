import React from "react";
import { useCurrentFrame } from "remotion";
import { UniversalSegment, UniversalTheme } from "./types";

interface UniversalHeaderProps {
  title: string;
  category: string;
  segments: UniversalSegment[];
  theme: UniversalTheme;
  totalFrames?: number;
}

export const UniversalHeader: React.FC<UniversalHeaderProps> = ({
  title,
  category,
  segments,
  theme,
  totalFrames = 900,
}) => {
  const frame = useCurrentFrame();

  const secondsLeft = Math.max(0, (totalFrames - frame) / 30);
  const progressRatio = frame / totalFrames;

  // Determine active step
  let activeStep = 0;
  if (frame >= 780) {
    activeStep = segments.length + 1; // Outro
  } else if (frame >= 90) {
    // 4 segments split between 90 and 780 frames (690 frames total / 4 = ~172 frames each)
    const segSpan = (780 - 90) / segments.length;
    const idx = Math.floor((frame - 90) / segSpan);
    activeStep = Math.min(segments.length, idx + 1);
  }

  const isUrgent = secondsLeft <= 5;
  const timerColor = isUrgent
    ? "#EF4444"
    : secondsLeft <= 10
    ? "#F59E0B"
    : theme.accentColor || "#10B981";

  return (
    <div
      style={{
        position: "absolute",
        top: 100,
        left: 0,
        right: 0,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        zIndex: 50,
        padding: "0 48px",
        fontFamily: "'Segoe UI', Roboto, -apple-system, sans-serif",
      }}
    >
      {/* Category Pill */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 12,
          padding: "8px 20px",
          background: "rgba(15, 23, 42, 0.85)",
          borderRadius: 999,
          border: "1px solid rgba(255, 255, 255, 0.15)",
          backdropFilter: "blur(12px)",
          marginBottom: 16,
        }}
      >
        <span
          style={{
            width: 10,
            height: 10,
            borderRadius: "50%",
            backgroundColor: timerColor,
            boxShadow: `0 0 12px ${timerColor}`,
          }}
        />
        <span
          style={{
            fontSize: 20,
            fontWeight: 800,
            letterSpacing: 2,
            color: "#E2E8F0",
            textTransform: "uppercase",
          }}
        >
          {category}
        </span>
      </div>

      {/* Main Topic Title */}
      <h1
        style={{
          fontSize: 50,
          fontWeight: 900,
          color: "#FFFFFF",
          textAlign: "center",
          margin: "0 0 12px 0",
          letterSpacing: -1,
          lineHeight: 1.15,
          textShadow: "0 4px 20px rgba(0,0,0,0.8)",
          maxWidth: 960,
        }}
      >
        {title}
      </h1>

      {/* Progress Bar */}
      <div
        style={{
          width: "100%",
          maxWidth: 960,
          marginTop: 8,
          height: 8,
          backgroundColor: "rgba(255, 255, 255, 0.1)",
          borderRadius: 999,
          overflow: "hidden",
        }}
      >
        <div
          style={{
            width: `${(1 - progressRatio) * 100}%`,
            height: "100%",
            background: `linear-gradient(90deg, ${theme.accentColor}, ${timerColor})`,
            boxShadow: `0 0 12px ${timerColor}`,
            transition: "width 0.1s linear",
          }}
        />
      </div>

      {/* Dynamic Steps Indicator */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          width: "100%",
          maxWidth: 960,
          marginTop: 20,
          gap: 10,
        }}
      >
        {segments.map((seg) => {
          const isActive = activeStep === seg.step;
          const isPassed = activeStep > seg.step;
          return (
            <div
              key={seg.step}
              style={{
                flex: 1,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 8,
                padding: "8px 6px",
                borderRadius: 14,
                backgroundColor: isActive
                  ? `${theme.accentColor}30`
                  : isPassed
                  ? "rgba(16, 185, 129, 0.15)"
                  : "rgba(255, 255, 255, 0.04)",
                border: isActive
                  ? `2px solid ${theme.accentColor}`
                  : isPassed
                  ? "1px solid rgba(16, 185, 129, 0.4)"
                  : "1px solid rgba(255, 255, 255, 0.08)",
                transform: isActive ? "scale(1.05)" : "scale(1)",
              }}
            >
              <div
                style={{
                  width: 22,
                  height: 22,
                  borderRadius: "50%",
                  backgroundColor: isActive
                    ? theme.accentColor
                    : isPassed
                    ? "#10B981"
                    : "rgba(255, 255, 255, 0.2)",
                  color: "#0F172A",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 13,
                  fontWeight: 900,
                }}
              >
                {seg.step}
              </div>
              <span
                style={{
                  fontSize: 15,
                  fontWeight: 800,
                  color: isActive ? "#FDE68A" : isPassed ? "#6EE7B7" : "#64748B",
                  letterSpacing: 0.5,
                }}
              >
                {seg.name}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
