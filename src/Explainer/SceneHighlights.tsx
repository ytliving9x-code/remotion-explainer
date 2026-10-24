import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";

export const SceneHighlights: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleSpring = spring({ frame, fps, config: { damping: 14 } });

  const metrics = [
    {
      value: "100%",
      label: "Code-Driven",
      detail: "Quản lý phiên bản qua Git, review code và tích hợp CI/CD tự động.",
      color: "#6366F1",
    },
    {
      value: "10x",
      label: "Tốc Độ Sản Xuất",
      detail: "Tạo hàng nghìn video cá nhân hóa chỉ trong vài phút qua API.",
      color: "#06B6D4",
    },
    {
      value: "4K 60fps",
      label: "Chất Lượng Cao Cấp",
      detail: "Render sắc nét từng pixel, hỗ trợ định dạng MP4, WebM và ProRes.",
      color: "#10B981",
    },
    {
      value: "∞",
      label: "Hệ Sinh Thái NPM",
      detail: "Tận dụng toàn bộ thư viện React, Three.js, Tailwind, Canvas.",
      color: "#F59E0B",
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
            color: "#10B981",
            fontWeight: 700,
            letterSpacing: "2px",
            textTransform: "uppercase",
            marginBottom: "12px",
          }}
        >
          ● TẠI SAO LẬP TRÌNH VIÊN YÊU THÍCH REMOTION?
        </div>
        <h2
          style={{
            fontSize: "64px",
            fontWeight: 800,
            margin: 0,
            color: "#FFFFFF",
            letterSpacing: "-1px",
          }}
        >
          Lợi Thế Cạnh Tranh Vượt Trội
        </h2>
      </div>

      {/* Grid of 4 Metric Cards */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: "28px",
          width: "100%",
          maxWidth: "1540px",
        }}
      >
        {metrics.map((m, idx) => {
          const cardSpring = spring({
            frame: frame - 15 - idx * 10,
            fps,
            config: { damping: 14, mass: 0.6 },
          });

          return (
            <div
              key={idx}
              style={{
                transform: `scale(${cardSpring}) translateY(${interpolate(cardSpring, [0, 1], [40, 0])}px)`,
                opacity: cardSpring,
                background: "rgba(15, 23, 42, 0.75)",
                borderRadius: "24px",
                padding: "40px 30px",
                border: "1px solid rgba(255, 255, 255, 0.12)",
                boxShadow: "0 20px 40px rgba(0, 0, 0, 0.35)",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                textAlign: "center",
                backdropFilter: "blur(16px)",
              }}
            >
              <div
                style={{
                  fontSize: "56px",
                  fontWeight: 900,
                  color: m.color,
                  lineHeight: 1.1,
                  marginBottom: "12px",
                  textShadow: `0 0 25px ${m.color}60`,
                }}
              >
                {m.value}
              </div>

              <div
                style={{
                  fontSize: "22px",
                  fontWeight: 700,
                  color: "#FFFFFF",
                  marginBottom: "14px",
                }}
              >
                {m.label}
              </div>

              <p
                style={{
                  fontSize: "17px",
                  color: "#94A3B8",
                  lineHeight: 1.5,
                  margin: 0,
                }}
              >
                {m.detail}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};
