import React from "react";
import { spring, useCurrentFrame, useVideoConfig } from "remotion";
import { CaptionSegment } from "./types";

const CAPTIONS: CaptionSegment[] = [
  {
    fromFrame: 0,
    toFrame: 90,
    highlightText: "SÚNG LỤC HOẠT ĐỘNG THẾ NÀO?",
    subText: "Khám phá toàn bộ cỗ máy cơ khí này chỉ trong 30 giây!",
    badge: "GIẢI THÍCH TRONG 30 GIÂY",
    phaseNumber: 0,
  },
  {
    fromFrame: 90,
    toFrame: 240,
    highlightText: "BƯỚC 1: BÓP CÒ ➔ KIM HỎA ĐẬP",
    subText: "Cò kéo nhả kim hỏa lao tới đập mạnh vào hạt nổ ở đuôi viên đạn!",
    badge: "01 // CÒ & KIM HỎA",
    phaseNumber: 1,
  },
  {
    fromFrame: 240,
    toFrame: 420,
    highlightText: "BƯỚC 2: KHÍ NÉN NỔ BUNG ➔ PHÓNG ĐẠN",
    subText: "Thuốc súng bốc cháy tạo áp lực cực lớn đẩy đầu đạn xoáy theo rãnh nòng bay đi!",
    badge: "02 // ĐỐT CHÁY & ÁP LỰC",
    phaseNumber: 2,
  },
  {
    fromFrame: 420,
    toFrame: 600,
    highlightText: "BƯỚC 3: PHẢN LỰC GIẬT LÙI ➔ HẤT VỎ RỖNG",
    subText: "Theo định luật 3 Newton, áp lực giật nắp trượt về sau, móc hất vỏ đạn bay ra ngoài!",
    badge: "03 // PHẢN LỰC & HẤT VỎ",
    phaseNumber: 3,
  },
  {
    fromFrame: 600,
    toFrame: 780,
    highlightText: "BƯỚC 4: LÒ XO ĐẨY ➔ NẠP VIÊN ĐẠN MỚI",
    subText: "Lò xo hồi vị đẩy slide về trước, gạt viên đạn mới vào buồng đạn trong chỉ 0.05 giây!",
    badge: "04 // LÒ XO & NẠP ĐẠN",
    phaseNumber: 4,
  },
  {
    fromFrame: 780,
    toFrame: 900,
    highlightText: "XONG TRONG 30 GIÂY! 🧠",
    subText: "Bạn muốn bóc tách cỗ máy nào tiếp theo? Hãy bình luận ngay nhé!",
    badge: "HOÀN TẤT // CHIA SẺ",
    phaseNumber: 5,
  },
];

export const KineticCaptions: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Find active caption segment
  const activeCaption =
    CAPTIONS.find((c) => frame >= c.fromFrame && frame < c.toFrame) || CAPTIONS[0];

  const segmentFrame = frame - activeCaption.fromFrame;
  const popProgress = spring({
    frame: segmentFrame,
    fps,
    config: { damping: 14, stiffness: 200 },
  });

  const badgeColor =
    activeCaption.phaseNumber === 0
      ? "#38BDF8"
      : activeCaption.phaseNumber === 5
      ? "#10B981"
      : "#F59E0B";

  return (
    <div
      style={{
        position: "absolute",
        bottom: 220, // TikTok Safe Zone (above caption bar)
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
          background: "linear-gradient(180deg, rgba(15, 23, 42, 0.95) 0%, rgba(10, 15, 29, 0.98) 100%)",
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
        {activeCaption.badge && (
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
            {activeCaption.badge}
          </span>
        )}

        {/* Highlight Main Text */}
        <h2
          style={{
            fontSize: 40,
            fontWeight: 900,
            color: "#FFF",
            margin: 0,
            letterSpacing: -0.5,
            lineHeight: 1.25,
            textShadow: "0 2px 10px rgba(0,0,0,0.5)",
          }}
        >
          {activeCaption.highlightText.split("➔").map((part, index, arr) => (
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
                    color: "#38BDF8",
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
          {activeCaption.subText}
        </p>
      </div>
    </div>
  );
};
