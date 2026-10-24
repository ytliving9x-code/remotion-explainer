import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";

interface SceneIntroProps {
  topicTitle?: string;
  topicSubtitle?: string;
  accentColor?: string;
}

export const SceneIntro: React.FC<SceneIntroProps> = ({
  topicTitle = "Lập Trình Video Với Remotion",
  topicSubtitle = "Biến mã nguồn React & Web thành video tương tác đỉnh cao không cần phần mềm dựng phim truyền thống.",
  accentColor = "#6366F1",
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Entrance springs
  const badgeSpring = spring({ frame, fps, config: { damping: 12, mass: 0.6 } });
  const titleSpring = spring({ frame: frame - 10, fps, config: { damping: 14 } });
  const subtitleSpring = spring({ frame: frame - 22, fps, config: { damping: 14 } });
  const cardSpring = spring({ frame: frame - 35, fps, config: { damping: 13, mass: 0.8 } });

  // Floating effect for the code preview card
  const cardFloat = Math.sin(frame / 20) * 8;

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "0 100px",
        textAlign: "center",
        fontFamily: "'Segoe UI', -apple-system, Roboto, sans-serif",
      }}
    >
      {/* Badge */}
      <div
        style={{
          transform: `scale(${badgeSpring})`,
          opacity: badgeSpring,
          display: "inline-flex",
          alignItems: "center",
          gap: "10px",
          padding: "10px 24px",
          borderRadius: "999px",
          background: "rgba(99, 102, 241, 0.15)",
          border: "1px solid rgba(99, 102, 241, 0.4)",
          color: "#A5B4FC",
          fontSize: "18px",
          fontWeight: 600,
          letterSpacing: "2px",
          textTransform: "uppercase",
          marginBottom: "28px",
        }}
      >
        <span>⚡</span> VIDEO GIẢI THÍCH TRỰC QUAN
      </div>

      {/* Main Title */}
      <h1
        style={{
          transform: `translateY(${interpolate(titleSpring, [0, 1], [40, 0])}px)`,
          opacity: titleSpring,
          fontSize: "84px",
          fontWeight: 900,
          lineHeight: 1.15,
          margin: 0,
          maxWidth: "1400px",
          background: "linear-gradient(135deg, #FFFFFF 20%, #E0E7FF 60%, #818CF8 100%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          letterSpacing: "-1.5px",
        }}
      >
        {topicTitle}
      </h1>

      {/* Subtitle */}
      <p
        style={{
          transform: `translateY(${interpolate(subtitleSpring, [0, 1], [30, 0])}px)`,
          opacity: subtitleSpring,
          fontSize: "26px",
          color: "#94A3B8",
          maxWidth: "1000px",
          lineHeight: 1.6,
          marginTop: "24px",
          marginBottom: "40px",
        }}
      >
        {topicSubtitle}
      </p>

      {/* Floating Code Mockup Card */}
      <div
        style={{
          transform: `scale(${cardSpring}) translateY(${cardFloat}px)`,
          opacity: cardSpring,
          background: "rgba(15, 23, 42, 0.8)",
          borderRadius: "20px",
          border: "1px solid rgba(255, 255, 255, 0.14)",
          boxShadow: "0 25px 60px rgba(0, 0, 0, 0.5), 0 0 30px rgba(99, 102, 241, 0.2)",
          padding: "24px 36px",
          display: "flex",
          alignItems: "center",
          gap: "28px",
          backdropFilter: "blur(20px)",
        }}
      >
        <div style={{ display: "flex", gap: "8px" }}>
          <span style={{ width: 14, height: 14, borderRadius: "50%", background: "#EF4444" }} />
          <span style={{ width: 14, height: 14, borderRadius: "50%", background: "#F59E0B" }} />
          <span style={{ width: 14, height: 14, borderRadius: "50%", background: "#10B981" }} />
        </div>
        <div style={{ fontFamily: "monospace", fontSize: "20px", color: "#F8FAFC", textAlign: "left" }}>
          <span style={{ color: "#F43F5E" }}>const</span>{" "}
          <span style={{ color: "#38BDF8" }}>video</span> ={" "}
          <span style={{ color: "#FBBF24" }}>renderWithReact</span>({"{ "}
          <span style={{ color: "#A7F3D0" }}>fps: 30, resolution: &apos;4K&apos;</span>
          {" }"});
        </div>
      </div>
    </div>
  );
};
