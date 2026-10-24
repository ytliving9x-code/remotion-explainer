import React from "react";
import { useCurrentFrame } from "remotion";

interface TikTokHeaderProps {
  accentColor?: string;
  secondaryColor?: string;
  totalFrames?: number;
}

export const TikTokHeader: React.FC<TikTokHeaderProps> = ({
  accentColor = "#F59E0B",
  secondaryColor = "#38BDF8",
  totalFrames = 900,
}) => {
  const frame = useCurrentFrame();

  // Seconds left calculated to 2 decimal places
  const secondsLeft = Math.max(0, (totalFrames - frame) / 30);
  const progressRatio = frame / totalFrames;

  // Active phase determination
  let activeStep = 0;
  if (frame >= 780) {
    activeStep = 5; // Outro / Loop
  } else if (frame >= 600) {
    activeStep = 4; // Lò xo nạp đạn
  } else if (frame >= 420) {
    activeStep = 3; // Phản lực hất vỏ
  } else if (frame >= 240) {
    activeStep = 2; // Kích nổ khí nén
  } else if (frame >= 90) {
    activeStep = 1; // Bóp cò kim hỏa
  }

  const isUrgent = secondsLeft <= 5;
  const timerColor = isUrgent ? "#EF4444" : secondsLeft <= 10 ? "#F59E0B" : "#10B981";

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
      {/* Top Banner Tag */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 12,
          padding: "8px 20px",
          background: "rgba(15, 23, 42, 0.8)",
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
          GIẢI THÍCH TRONG 30 GIÂY
        </span>
      </div>

      {/* Main Hook Title */}
      <h1
        style={{
          fontSize: 52,
          fontWeight: 900,
          color: "#FFFFFF",
          textAlign: "center",
          margin: "0 0 12px 0",
          letterSpacing: -1,
          lineHeight: 1.15,
          textShadow: "0 4px 20px rgba(0,0,0,0.8)",
        }}
      >
        SÚNG LỤC HOẠT ĐỘNG THẾ NÀO?
      </h1>

      {/* Linear Progress Bar */}
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
            background: `linear-gradient(90deg, ${accentColor}, ${timerColor})`,
            boxShadow: `0 0 12px ${timerColor}`,
            transition: "width 0.1s linear",
          }}
        />
      </div>

      {/* 4 Phases Indicators */}
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
        {[
          { num: 1, label: "BÓP CÒ" },
          { num: 2, label: "KÍCH NỔ" },
          { num: 3, label: "HẤT VỎ" },
          { num: 4, label: "NẠP ĐẠN" },
        ].map((step) => {
          const isActive = activeStep === step.num;
          const isPassed = activeStep > step.num;
          return (
            <div
              key={step.num}
              style={{
                flex: 1,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 8,
                padding: "8px 6px",
                borderRadius: 14,
                backgroundColor: isActive
                  ? "rgba(245, 158, 11, 0.25)"
                  : isPassed
                    ? "rgba(16, 185, 129, 0.15)"
                    : "rgba(255, 255, 255, 0.04)",
                border: isActive
                  ? `2px solid ${accentColor}`
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
                    ? accentColor
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
                {step.num}
              </div>
              <span
                style={{
                  fontSize: 15,
                  fontWeight: 800,
                  color: isActive ? "#FDE68A" : isPassed ? "#6EE7B7" : "#64748B",
                  letterSpacing: 0.5,
                }}
              >
                {step.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
