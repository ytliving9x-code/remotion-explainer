import React from "react";
import { useCurrentFrame } from "remotion";

export const XRayHUDOverlay: React.FC = () => {
  const frame = useCurrentFrame();

  const radarRot = (frame * 4) % 360;
  const blink = Math.floor(frame / 12) % 2 === 0;
  const scanFreq = (142.4 + (frame % 30) * 0.08).toFixed(1);

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        pointerEvents: "none",
        zIndex: 40,
        fontFamily: "'Courier New', monospace, sans-serif",
      }}
    >
      {/* 4 Corner Sci-Fi Brackets */}
      {/* Top Left */}
      <svg
        style={{ position: "absolute", top: 40, left: 40 }}
        width="100"
        height="100"
        viewBox="0 0 100 100"
      >
        <path d="M 0 50 L 0 0 L 50 0" fill="none" stroke="#00F5FF" strokeWidth="4" />
        <circle cx="15" cy="15" r="4" fill="#00F5FF" />
      </svg>

      {/* Top Right */}
      <svg
        style={{ position: "absolute", top: 40, right: 40 }}
        width="100"
        height="100"
        viewBox="0 0 100 100"
      >
        <path d="M 50 0 L 100 0 L 100 50" fill="none" stroke="#00F5FF" strokeWidth="4" />
        <circle cx="85" cy="15" r="4" fill="#00F5FF" />
      </svg>

      {/* Bottom Left */}
      <svg
        style={{ position: "absolute", bottom: 40, left: 40 }}
        width="100"
        height="100"
        viewBox="0 0 100 100"
      >
        <path d="M 0 50 L 0 100 L 50 100" fill="none" stroke="#00F5FF" strokeWidth="4" />
        <circle cx="15" cy="85" r="4" fill="#00F5FF" />
      </svg>

      {/* Bottom Right */}
      <svg
        style={{ position: "absolute", bottom: 40, right: 40 }}
        width="100"
        height="100"
        viewBox="0 0 100 100"
      >
        <path d="M 50 100 L 100 100 L 100 50" fill="none" stroke="#00F5FF" strokeWidth="4" />
        <circle cx="85" cy="85" r="4" fill="#00F5FF" />
      </svg>

      {/* Top Sci-Fi Telemetry Bar */}
      <div
        style={{
          position: "absolute",
          top: 60,
          left: 120,
          right: 120,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          color: "#00F5FF",
          fontSize: 16,
          fontWeight: 700,
          letterSpacing: 2,
          textShadow: "0 0 10px rgba(0, 245, 255, 0.6)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <span
            style={{
              width: 10,
              height: 10,
              borderRadius: "50%",
              backgroundColor: blink ? "#00F5FF" : "#0369A1",
              boxShadow: blink ? "0 0 12px #00F5FF" : "none",
            }}
          />
          <span>X-RAY THẤU THỊ // KHẢ DỤNG</span>
        </div>
        <div>TẦN SỐ: {scanFreq} THz</div>
        <div>HỆ THỐNG: 9x19mm NATO</div>
      </div>

      {/* Rotating Radar Sight Circle (Top Right) */}
      <div
        style={{
          position: "absolute",
          top: 250,
          right: 60,
          width: 90,
          height: 90,
          borderRadius: "50%",
          border: "2px solid rgba(0, 245, 255, 0.3)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            borderRadius: "50%",
            borderTop: "3px solid #00F5FF",
            transform: `rotate(${radarRot}deg)`,
          }}
        />
        <span style={{ color: "#00F5FF", fontSize: 11, fontWeight: 800 }}>LOCK</span>
      </div>

      {/* Crosshair Center Reticle overlay (centered on gun) */}
      <div
        style={{
          position: "absolute",
          top: 820,
          left: 540,
          transform: "translate(-50%, -50%)",
          width: 600,
          height: 400,
          pointerEvents: "none",
        }}
      >
        {/* Subtle Horizontal and Vertical Center Marks */}
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: 0,
            right: 0,
            height: 1,
            backgroundColor: "rgba(0, 245, 255, 0.15)",
          }}
        />
        <div
          style={{
            position: "absolute",
            left: "50%",
            top: 0,
            bottom: 0,
            width: 1,
            backgroundColor: "rgba(0, 245, 255, 0.15)",
          }}
        />
      </div>

      {/* Left Spec Data Readout */}
      <div
        style={{
          position: "absolute",
          bottom: 380,
          left: 60,
          color: "rgba(0, 245, 255, 0.75)",
          fontSize: 14,
          lineHeight: 1.8,
          letterSpacing: 1,
          borderLeft: "3px solid #00F5FF",
          paddingLeft: 14,
        }}
      >
        <div>VẬN TỐC ĐẦU NÒNG: 375 m/s</div>
        <div>ÁP SUẤT BUỒNG: 235 MPa</div>
        <div>CƠ CHẾ: KHÓA NÒNG LÙI NGẮN</div>
        <div>TRỌNG LƯỢNG: 625g (RỖNG)</div>
      </div>
    </div>
  );
};
