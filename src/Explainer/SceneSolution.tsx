import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";

export const SceneSolution: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleSpring = spring({ frame, fps, config: { damping: 14 } });

  const steps = [
    {
      num: "01",
      badge: "REACT & CSS",
      title: "Thiết Kế Bằng Code",
      desc: "Xây dựng các component UI quen thuộc bằng React, Tailwind, SVG hoặc Canvas.",
      gradient: "linear-gradient(135deg, #3B82F6, #06B6D4)",
    },
    {
      num: "02",
      badge: "MATH & SPRINGS",
      title: "Hoạt Hóa Theo Frame",
      desc: "Dùng useCurrentFrame() kết hợp spring() và interpolate() tạo hiệu ứng mượt mà tuyệt đối.",
      gradient: "linear-gradient(135deg, #8B5CF6, #EC4899)",
    },
    {
      num: "03",
      badge: "SCALE & CLOUD",
      title: "Render Tự Động",
      desc: "Xuất video MP4/ProRes qua CLI, Server Node.js hoặc Lambda với tốc độ vượt trội.",
      gradient: "linear-gradient(135deg, #10B981, #059669)",
    },
  ];

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
        fontFamily: "'Segoe UI', -apple-system, Roboto, sans-serif",
      }}
    >
      {/* Title */}
      <div
        style={{
          textAlign: "center",
          marginBottom: "56px",
          transform: `translateY(${interpolate(titleSpring, [0, 1], [30, 0])}px)`,
          opacity: titleSpring,
        }}
      >
        <div
          style={{
            display: "inline-block",
            fontSize: "18px",
            color: "#06B6D4",
            fontWeight: 700,
            letterSpacing: "2px",
            textTransform: "uppercase",
            marginBottom: "12px",
          }}
        >
          ● QUY TRÌNH 3 BƯỚC ĐƠN GIẢN
        </div>
        <h2
          style={{
            fontSize: "64px",
            fontWeight: 800,
            margin: 0,
            background: "linear-gradient(135deg, #FFFFFF, #93C5FD)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            letterSpacing: "-1px",
          }}
        >
          Remotion Hoạt Động Như Thế Nào?
        </h2>
      </div>

      {/* Steps Flow */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "36px",
          width: "100%",
          maxWidth: "1540px",
          position: "relative",
        }}
      >
        {steps.map((step, idx) => {
          const cardSpring = spring({
            frame: frame - 15 - idx * 14,
            fps,
            config: { damping: 13, mass: 0.7 },
          });

          return (
            <div
              key={idx}
              style={{
                transform: `scale(${cardSpring}) translateY(${interpolate(cardSpring, [0, 1], [40, 0])}px)`,
                opacity: cardSpring,
                background: "rgba(15, 23, 42, 0.75)",
                borderRadius: "24px",
                padding: "44px 36px",
                border: "1px solid rgba(255, 255, 255, 0.12)",
                boxShadow: "0 20px 45px rgba(0, 0, 0, 0.4)",
                display: "flex",
                flexDirection: "column",
                position: "relative",
                backdropFilter: "blur(18px)",
              }}
            >
              {/* Step indicator header */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginBottom: "28px",
                }}
              >
                <div
                  style={{
                    fontSize: "36px",
                    fontWeight: 900,
                    color: "#FFFFFF",
                    fontFamily: "monospace",
                    background: step.gradient,
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  {step.num}
                </div>
                <div
                  style={{
                    padding: "6px 14px",
                    borderRadius: "8px",
                    background: "rgba(255, 255, 255, 0.08)",
                    border: "1px solid rgba(255, 255, 255, 0.12)",
                    fontSize: "14px",
                    fontWeight: 700,
                    color: "#E2E8F0",
                    letterSpacing: "1px",
                  }}
                >
                  {step.badge}
                </div>
              </div>

              <h3
                style={{
                  fontSize: "30px",
                  fontWeight: 700,
                  color: "#FFFFFF",
                  margin: "0 0 16px 0",
                  lineHeight: 1.3,
                }}
              >
                {step.title}
              </h3>

              <p
                style={{
                  fontSize: "20px",
                  color: "#94A3B8",
                  lineHeight: 1.6,
                  margin: 0,
                }}
              >
                {step.desc}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};
