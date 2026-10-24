import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";

export const SceneProblem: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleSpring = spring({ frame, fps, config: { damping: 14 } });

  const problems = [
    {
      icon: "⏳",
      title: "Chỉnh Sửa Thủ Công Tốn Sức",
      desc: "Làm việc thủ công trên Premiere hay After Effects tiêu tốn hàng giờ cho các tác vụ lặp đi lặp lại.",
      color: "#F43F5E",
    },
    {
      icon: "⚡",
      title: "Không Thể Scale Hàng Loạt",
      desc: "Nếu muốn tạo 1,000 video cá nhân hóa theo từng người dùng hoặc đơn hàng? Không thể làm bằng tay!",
      color: "#FB923C",
    },
    {
      icon: "🔄",
      title: "Khó Cập Nhật & Bảo Trì",
      desc: "Mỗi khi đổi logo, đổi số liệu hay màu sắc thương hiệu, bạn phải mở project render lại từ đầu.",
      color: "#FACC15",
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
            color: "#F43F5E",
            fontWeight: 700,
            letterSpacing: "2px",
            textTransform: "uppercase",
            marginBottom: "12px",
          }}
        >
          ● THỰC TRẠNG HIỆN TẠI
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
          Hạn Chế Của Dựng Video Truyền Thống
        </h2>
      </div>

      {/* 3 Problem Cards */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "32px",
          width: "100%",
          maxWidth: "1500px",
        }}
      >
        {problems.map((item, idx) => {
          const cardSpring = spring({
            frame: frame - 15 - idx * 12,
            fps,
            config: { damping: 13, mass: 0.7 },
          });

          return (
            <div
              key={idx}
              style={{
                transform: `scale(${cardSpring}) translateY(${interpolate(cardSpring, [0, 1], [40, 0])}px)`,
                opacity: cardSpring,
                background: "rgba(17, 24, 39, 0.75)",
                borderRadius: "24px",
                padding: "44px 36px",
                border: "1px solid rgba(255, 255, 255, 0.1)",
                boxShadow: "0 20px 40px rgba(0, 0, 0, 0.4)",
                display: "flex",
                flexDirection: "column",
                position: "relative",
                overflow: "hidden",
                backdropFilter: "blur(16px)",
              }}
            >
              {/* Accent top line */}
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  height: "4px",
                  background: item.color,
                  boxShadow: `0 0 15px ${item.color}`,
                }}
              />

              <div
                style={{
                  width: "68px",
                  height: "68px",
                  borderRadius: "18px",
                  backgroundColor: `${item.color}20`,
                  border: `1px solid ${item.color}40`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "32px",
                  marginBottom: "28px",
                }}
              >
                {item.icon}
              </div>

              <h3
                style={{
                  fontSize: "28px",
                  fontWeight: 700,
                  color: "#F9FAFB",
                  margin: "0 0 16px 0",
                  lineHeight: 1.3,
                }}
              >
                {item.title}
              </h3>

              <p
                style={{
                  fontSize: "20px",
                  color: "#9CA3AF",
                  lineHeight: 1.6,
                  margin: 0,
                }}
              >
                {item.desc}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};
