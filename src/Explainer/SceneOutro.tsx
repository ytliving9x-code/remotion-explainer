import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";

export const SceneOutro: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleSpring = spring({ frame, fps, config: { damping: 14 } });
  const terminalSpring = spring({ frame: frame - 15, fps, config: { damping: 12 } });
  const buttonSpring = spring({ frame: frame - 30, fps, config: { damping: 12 } });

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
          transform: `scale(${titleSpring})`,
          opacity: titleSpring,
          display: "inline-flex",
          alignItems: "center",
          gap: "10px",
          padding: "10px 24px",
          borderRadius: "999px",
          background: "rgba(16, 185, 129, 0.15)",
          border: "1px solid rgba(16, 185, 129, 0.4)",
          color: "#6EE7B7",
          fontSize: "18px",
          fontWeight: 600,
          letterSpacing: "2px",
          textTransform: "uppercase",
          marginBottom: "28px",
        }}
      >
        <span>🚀</span> SẴN SÀNG TRẢI NGHIỆM
      </div>

      {/* Main Title */}
      <h2
        style={{
          transform: `translateY(${interpolate(titleSpring, [0, 1], [30, 0])}px)`,
          opacity: titleSpring,
          fontSize: "76px",
          fontWeight: 900,
          lineHeight: 1.2,
          margin: 0,
          maxWidth: "1300px",
          background: "linear-gradient(135deg, #FFFFFF, #67E8F9, #818CF8)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          letterSpacing: "-1.5px",
        }}
      >
        Tự Động Hóa Video Ngay Trong Dự Án Của Bạn
      </h2>

      {/* Terminal Command box */}
      <div
        style={{
          transform: `scale(${terminalSpring})`,
          opacity: terminalSpring,
          marginTop: "44px",
          background: "rgba(15, 23, 42, 0.85)",
          borderRadius: "20px",
          border: "1px solid rgba(255, 255, 255, 0.14)",
          padding: "20px 40px",
          display: "flex",
          alignItems: "center",
          gap: "20px",
          boxShadow: "0 20px 50px rgba(0, 0, 0, 0.4)",
          backdropFilter: "blur(16px)",
        }}
      >
        <span style={{ color: "#10B981", fontSize: "24px" }}>$</span>
        <span style={{ fontFamily: "monospace", fontSize: "26px", color: "#F1F5F9" }}>
          npm run dev
        </span>
        <span style={{ color: "#64748B", fontSize: "20px", marginLeft: "12px" }}>
          # Mở Remotion Studio xem trước trực quan
        </span>
      </div>

      {/* CTA Button */}
      <div
        style={{
          transform: `scale(${buttonSpring})`,
          opacity: buttonSpring,
          marginTop: "40px",
          padding: "18px 48px",
          borderRadius: "16px",
          background: "linear-gradient(135deg, #6366F1, #06B6D4)",
          color: "#FFFFFF",
          fontSize: "22px",
          fontWeight: 800,
          boxShadow: "0 10px 30px rgba(99, 102, 241, 0.4)",
          display: "inline-flex",
          alignItems: "center",
          gap: "12px",
        }}
      >
        <span>Khám Phá Remotion Ngay</span>
        <span>→</span>
      </div>
    </div>
  );
};
