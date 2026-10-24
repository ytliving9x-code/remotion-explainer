import React from "react";
import { interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { UniversalHeader } from "./UniversalHeader";
import { ModularVisual } from "./ModularVisual";
import { UniversalCaptions } from "./UniversalCaptions";
import { UniversalAudio } from "./UniversalAudio";
import { UniversalTopicConfig } from "./types";

const DEFAULT_TOPIC: UniversalTopicConfig = {
  id: "sample-30s",
  title: "ĐỘNG CƠ PHẢN LỰC HOẠT ĐỘNG THẾ NÀO?",
  category: "CÔNG NGHỆ TRONG 30 GIÂY",
  theme: {
    accentColor: "#06B6D4",
    secondaryColor: "#3B82F6",
    visualPack: "blueprint",
  },
  segments: [
    {
      step: 1,
      name: "HÚT KHÍ",
      voiceText: "Bước một: Cánh quạt khổng lồ hút hàng tấn không khí vào buồng nén mỗi giây.",
      highlight: "BƯỚC 1: HÚT KHÍ ➔ NẠP KHÍ VÀO",
      subText: "Cánh quạt khổng lồ hút hàng tấn không khí vào buồng nén mỗi giây.",
      icon: "fan",
    },
    {
      step: 2,
      name: "NÉN ÁP SUẤT",
      voiceText: "Bước hai: Các tầng tuabin liên tục nén khí lại khiến áp suất và nhiệt độ tăng vọt.",
      highlight: "BƯỚC 2: NÉN KHÍ ➔ ÁP SUẤT CỰC ĐẠI",
      subText: "Các tầng tuabin liên tục nén khí lại khiến áp suất và nhiệt độ tăng vọt.",
      icon: "pressure",
    },
    {
      step: 3,
      name: "ĐỐT CHÁY",
      voiceText: "Bước ba: Nhiên liệu phun vào buồng đốt phát hỏa tạo luồng khí giãn nở kinh hoàng.",
      highlight: "BƯỚC 3: PHUN NHIÊN LIỆU ➔ KÍCH NỔ",
      subText: "Nhiên liệu phun vào buồng đốt phát hỏa tạo luồng khí giãn nở kinh hoàng.",
      icon: "fire",
    },
    {
      step: 4,
      name: "PHẢN LỰC PHUN",
      voiceText: "Bước bốn: Khí phụt cực mạnh ra đuôi máy bay, đẩy phi cơ lao đi xé toạc bầu trời!",
      highlight: "BƯỚC 4: KHÍ PHỤT RA ĐUÔI ➔ ĐẨY PHI CƠ",
      subText: "Khí phụt cực mạnh ra đuôi máy bay, đẩy phi cơ lao đi xé toạc bầu trời!",
      icon: "thrust",
    },
  ],
  outro: {
    voiceText: "Xong trong ba mươi giây! Bạn muốn giải thích cỗ máy nào tiếp theo, hãy bình luận nhé!",
    highlight: "30 GIÂY ĐÃ HẾT! ✈️",
    subText: "Bạn muốn mổ xẻ cỗ máy nào tiếp theo?",
    cta: "Hãy để lại bình luận ngay bên dưới!",
  },
  audioFolder: "audio/jet-engine",
};

export const UniversalExplainerVideo: React.FC<Partial<UniversalTopicConfig>> = (props) => {
  const config = {
    ...DEFAULT_TOPIC,
    ...props,
    theme: { ...DEFAULT_TOPIC.theme, ...(props.theme || {}) },
    segments: props.segments && props.segments.length > 0 ? props.segments : DEFAULT_TOPIC.segments,
    outro: { ...DEFAULT_TOPIC.outro, ...(props.outro || {}) },
  };

  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();

  // Find active segment for visual engine
  const segSpan = (780 - 90) / config.segments.length;
  let activeSeg = null;
  let isOutro = false;

  if (frame >= 780) {
    isOutro = true;
  } else if (frame >= 90) {
    const idx = Math.min(config.segments.length - 1, Math.floor((frame - 90) / segSpan));
    activeSeg = config.segments[idx];
  }

  // Camera dynamics
  const cameraScale = interpolate(
    Math.sin((frame / 45) * Math.PI),
    [-1, 1],
    [0.98, 1.04]
  );

  return (
    <div
      style={{
        position: "relative",
        width: 1080,
        height: 1920,
        backgroundColor: "#070B14",
        overflow: "hidden",
        fontFamily: "'Segoe UI', Roboto, -apple-system, sans-serif",
      }}
    >
      {/* Background Gradients */}
      <div
        style={{
          position: "absolute",
          top: -200,
          left: -200,
          width: 800,
          height: 800,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${config.theme.secondaryColor}30 0%, transparent 70%)`,
          filter: "blur(80px)",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: 300,
          right: -200,
          width: 900,
          height: 900,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${config.theme.accentColor}25 0%, transparent 70%)`,
          filter: "blur(100px)",
          pointerEvents: "none",
        }}
      />

      {/* Grid Overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `
            linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
          pointerEvents: "none",
        }}
      />

      {/* Header with 30s Countdown */}
      <UniversalHeader
        title={config.title}
        category={config.category}
        segments={config.segments}
        theme={config.theme}
        totalFrames={durationInFrames}
      />

      {/* Modular Visual Graphics Engine */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          transform: `scale(${cameraScale})`,
          transformOrigin: "center center",
          transition: "transform 0.1s linear",
        }}
      >
        <ModularVisual
          activeSegment={activeSeg}
          theme={config.theme}
          isOutro={isOutro}
        />
      </div>

      {/* Punchy Kinetic Captions */}
      <UniversalCaptions
        title={config.title}
        segments={config.segments}
        outro={config.outro}
        theme={config.theme}
      />

      {/* Synchronized Audio Stream */}
      <UniversalAudio
        audioFolder={config.audioFolder}
        segments={config.segments}
      />
    </div>
  );
};
