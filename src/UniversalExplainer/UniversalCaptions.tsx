import React from "react";
import { spring, useCurrentFrame, useVideoConfig } from "remotion";
import { UniversalSegment, UniversalTheme } from "./types";

interface UniversalCaptionsProps {
  title: string;
  segments: UniversalSegment[];
  outro: {
    highlight: string;
    subText: string;
    cta: string;
  };
  theme: UniversalTheme;
}

export const UniversalCaptions: React.FC<UniversalCaptionsProps> = ({
  title,
  segments,
  outro,
  theme,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  let highlight = "";
  let sub = "";
  let badge = "";
  let badgeColor = theme.accentColor || "#F59E0B";
  let segmentStart = 0;

  if (frame < 90) {
    // Phase 0: Intro (0 - 3s)
    highlight = title;
    sub = "Cỗ máy này hoạt động như thế nào trong 30 giây?";
    badge = "MỞ ĐẦU // 30 GIÂY";
    badgeColor = theme.secondaryColor || "#38BDF8";
    segmentStart = 0;
  } else if (frame >= 780) {
    // Outro (26s - 30s)
    highlight = outro.highlight;
    sub = `${outro.subText} ${outro.cta}`;
    badge = "HOÀN TẤT // CHIA SẺ";
    badgeColor = "#10B981";
    segmentStart = 780;
  } else {
    // 4 Segments across 90 - 780 frames (span = ~172 frames)
    const segSpan = (780 - 90) / segments.length;
    const idx = Math.min(segments.length - 1, Math.floor((frame - 90) / segSpan));
    const activeSeg = segments[idx];
    highlight = activeSeg.highlight;
    sub = activeSeg.subText;
    badge = `0${activeSeg.step} // ${activeSeg.name}`;
    badgeColor = theme.accentColor;
    segmentStart = Math.floor(90 + idx * segSpan);
  }

  const segmentFrame = frame - segmentStart;
  const popProgress = spring({
    frame: segmentFrame,
    fps,
    config: { damping: 14, stiffness: 200 },
  });

  return (
    <div
      style={{
        position: "absolute",
        bottom: 220,
        left: 0,
        right: 0,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "0 48px",
        zIndex: 50,
        fontFamily: "'Segoe UI', Roboto, -apple-system, sans-serif",
      }}
    >
      <div
        style={{
          transform: `scale(${popProgress})`,
          width: "100%",
          maxWidth: 960,
          background:
            "linear-gradient(180deg, rgba(15, 23, 42, 0.95) 0%, rgba(10, 15, 29, 0.98) 100%)",
          padding: "24px 32px",
          borderRadius: 28,
          border: `2px solid ${badgeColor}60`,
          boxShadow: `0 16px 40px rgba(0,0,0,0.8), 0 0 30px ${badgeColor}30`,
          backdropFilter: "blur(16px)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          gap: 12,
        }}
      >
        {/* Phase Badge */}
        <span
          style={{
            padding: "6px 18px",
            borderRadius: 999,
            backgroundColor: `${badgeColor}25`,
            color: badgeColor,
            border: `1px solid ${badgeColor}80`,
            fontSize: 16,
            fontWeight: 800,
            letterSpacing: 1.5,
            textTransform: "uppercase",
          }}
        >
          {badge}
        </span>

        {/* Highlight Main Text */}
        <h2
          style={{
            fontSize: 38,
            fontWeight: 900,
            color: "#FFF",
            margin: 0,
            letterSpacing: -0.5,
            lineHeight: 1.25,
            textShadow: "0 2px 10px rgba(0,0,0,0.5)",
          }}
        >
          {highlight.split("➔").map((part, index, arr) => (
            <React.Fragment key={index}>
              <span
                style={{
                  color: index === 0 ? "#FFFFFF" : "#FDE047",
                }}
              >
                {part.trim()}
              </span>
              {index < arr.length - 1 && (
                <span
                  style={{
                    color: theme.secondaryColor || "#38BDF8",
                    margin: "0 8px",
                    fontWeight: 900,
                  }}
                >
                  ➔
                </span>
              )}
            </React.Fragment>
          ))}
        </h2>

        {/* Sub explanation Text */}
        <p
          style={{
            fontSize: 24,
            fontWeight: 600,
            color: "#CBD5E1",
            margin: 0,
            lineHeight: 1.45,
            maxWidth: 860,
          }}
        >
          {sub}
        </p>
      </div>
    </div>
  );
};
