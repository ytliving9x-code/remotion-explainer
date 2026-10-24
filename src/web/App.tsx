import React, { useState, useMemo } from "react";
import { Player } from "@remotion/player";
import { XRayVideo } from "../XRayExploded";
import { UniversalExplainerVideo } from "../UniversalExplainer";
import { PistolExplainerVideo } from "../PistolExplainer";
import { UniversalTopicConfig, UniversalSegment } from "../UniversalExplainer/types";

// PRESET SCRIPT LIBRARIES
const PRESET_TOPICS: Record<string, UniversalTopicConfig> = {
  jet: {
    id: "jet-engine-30s",
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
      voiceText: "Xong trong 30 giây! Bạn muốn mổ xẻ cỗ máy nào tiếp theo, hãy bình luận nhé!",
      highlight: "30 GIÂY ĐÃ HẾT! ✈️",
      subText: "Bạn muốn mổ xẻ cỗ máy nào tiếp theo?",
      cta: "Bình luận ngay ý tưởng của bạn!",
    },
    audioFolder: "audio/jet-engine",
  },
  microwave: {
    id: "microwave-30s",
    title: "LÒ VI SÓNG LÀM NÓNG THỨC ĂN RA SAO?",
    category: "VẬT LÝ HẰNG NGÀY TRONG 30S",
    theme: {
      accentColor: "#F59E0B",
      secondaryColor: "#EF4444",
      visualPack: "science",
    },
    segments: [
      {
        step: 1,
        name: "PHÁT SÓNG MAGNETRON",
        voiceText: "Bước một: Đèn Magnetron bên trong tạo ra chùm sóng điện từ tần số 2.45 Gigahertz.",
        highlight: "BƯỚC 1: ĐÈN MAGNETRON PHÁT SÓNG",
        subText: "Bắn sóng điện từ công suất cực cao xuyên qua khoang nấu.",
        icon: "wave",
      },
      {
        step: 2,
        name: "PHẢN XẠ THÀNH LÒ",
        voiceText: "Bước hai: Vách kim loại phản xạ sóng dội liên tục, tập trung toàn bộ năng lượng vào thức ăn.",
        highlight: "BƯỚC 2: VÁCH KIM LOẠI PHẢN XẠ",
        subText: "Sóng bật qua lại không thoát ra ngoài, hướng thẳng vào đĩa thức ăn.",
        icon: "pressure",
      },
      {
        step: 3,
        name: "RUNG PHÂN TỬ NƯỚC",
        voiceText: "Bước ba: Các phân tử nước trong món ăn bị đảo cực hàng tỷ lần mỗi giây, cọ xát dữ dội.",
        highlight: "BƯỚC 3: PHÂN TỬ NƯỚC ĐẢO HÀNG TỶ LẦN",
        subText: "Ma sát vi mô giữa các phân tử sinh ra nhiệt lượng tức thì từ bên trong.",
        icon: "fire",
      },
      {
        step: 4,
        name: "SÔI VÀ CHÍN ĐỀU",
        voiceText: "Bước bốn: Thức ăn sôi sùng sục và nóng hổi từ trong ra ngoài chỉ sau vài chục giây!",
        highlight: "BƯỚC 4: LÀM NÓNG CỰC TỐC TỪ BÊN TRONG",
        subText: "Không cần ngọn lửa hay bếp than, thức ăn chín đều thơm phức!",
        icon: "thrust",
      },
    ],
    outro: {
      voiceText: "Hiểu lò vi sóng trong 30 giây! Bạn muốn giải mã đồ gia dụng nào tiếp theo?",
      highlight: "30 GIÂY THẤU SUỐT! 🍲",
      subText: "Bạn muốn giải mã bí mật nào tiếp theo?",
      cta: "Để lại bình luận bên dưới nhé!",
    },
    audioFolder: "audio",
  },
  gear: {
    id: "differential-gear-30s",
    title: "BỘ VI SAI Ô TÔ HOẠT ĐỘNG THẾ NÀO?",
    category: "CƠ KHÍ Ô TÔ TRONG 30 GIÂY",
    theme: {
      accentColor: "#10B981",
      secondaryColor: "#3B82F6",
      visualPack: "blueprint",
    },
    segments: [
      {
        step: 1,
        name: "TRỤC TRUYỀN ĐỘNG",
        voiceText: "Bước một: Động cơ truyền lực quay dọc xe qua trục các-đăng thẳng vào cụm bánh răng cầu.",
        highlight: "BƯỚC 1: TRỤC CÁC-ĐĂNG TRUYỀN LỰC",
        subText: "Mô-men xoắn mạnh mẽ từ động cơ đưa thẳng tới trục sau của xe.",
        icon: "gear",
      },
      {
        step: 2,
        name: "BÁNH RĂNG VÀNH CHẬU",
        voiceText: "Bước hai: Bánh răng vành chậu chuyển hướng trục quay 90 độ sang hai bên bánh xe.",
        highlight: "BƯỚC 2: CHUYỂN HƯỚNG QUAY 90 ĐỘ",
        subText: "Biến chuyển động xoay dọc thành lực xoay ngang sang hai trục láp.",
        icon: "gear",
      },
      {
        step: 3,
        name: "BÁNH RĂNG HÀNH TINH",
        voiceText: "Bước ba: Khi vào cua, cụm bánh răng hành tinh tự xoay quanh mình để phân bổ tốc độ.",
        highlight: "BƯỚC 3: BÁNH RĂNG HÀNH TINH TỰ ĐIỀU CHỈNH",
        subText: "Bánh xe ngoài cua đi đường vòng xa hơn, bánh trong đi đường ngắn hơn.",
        icon: "gear",
      },
      {
        step: 4,
        name: "BÁNH NGOÀI QUAY NHANH",
        voiceText: "Bước bốn: Bánh ngoài tự động quay nhanh hơn bánh trong, giúp xe bo cua mượt mà không lật!",
        highlight: "BƯỚC 4: XE BO CUA HOÀN HẢO KHÔNG TRƯỢT",
        subText: "Xe cân bằng tuyệt đối, lốp không bị mài mòn hay rê bánh!",
        icon: "thrust",
      },
    ],
    outro: {
      voiceText: "Hiểu bộ vi sai trong 30 giây! Cùng bấm theo dõi để xem thêm nhiều cỗ máy kỳ diệu nhé!",
      highlight: "BO CUA ÊM ÁI! 🏎️",
      subText: "Muốn mổ xẻ bí mật cơ khí nào tiếp theo?",
      cta: "Thả tim & bình luận ngay!",
    },
    audioFolder: "audio",
  },
  hairDryer: {
    id: "hair-dryer-30s",
    title: "MÁY SẤY TÓC HOẠT ĐỘNG THẾ NÀO?",
    category: "CÔNG NGHỆ TRONG 30 GIÂY",
    theme: {
      accentColor: "#F97316",
      secondaryColor: "#EF4444",
      visualPack: "thermal",
    },
    segments: [
      {
        step: 1,
        name: "HÚT GIÓ",
        voiceText: "Bước một: Cánh quạt mini bên trong quay tít, hút luồng không khí mát từ phía sau vào.",
        highlight: "BƯỚC 1: HÚT GIÓ ➔ NẠP KHÍ MÁT",
        subText: "Cánh quạt mini quay tít, hút không khí từ ngoài vào buồng máy.",
        icon: "fan",
      },
      {
        step: 2,
        name: "LÀM NÓNG",
        voiceText: "Bước hai: Dòng điện chạy qua cuộn dây mayso khiến nó nóng đỏ rực lên ngay lập tức.",
        highlight: "BƯỚC 2: CUỘN DÂY NÓNG ĐỎ ➔ TỎA NHIỆT CAO",
        subText: "Dòng điện chạy qua dây mayso biến đổi điện năng thành nhiệt lượng cực lớn.",
        icon: "heat-coil",
      },
      {
        step: 3,
        name: "TRUYỀN NHIỆT",
        voiceText: "Bước ba: Không khí mát bị ép lướt qua cuộn dây nóng, nhanh chóng hấp thụ nhiệt và tăng nhiệt độ.",
        highlight: "BƯỚC 3: ĐỐI LƯU KHÍ ➔ BIẾN GIÓ THÀNH HƠI NÓNG",
        subText: "Luồng khí bị ép qua cuộn dây, nhanh chóng biến thành luồng hơi nóng rực.",
        icon: "wind-thermal",
      },
      {
        step: 4,
        name: "THỔI KHÍ NÓNG",
        voiceText: "Bước bốn: Luồng khí nóng được đẩy mạnh ra đầu vòi, làm bốc hơi các hạt nước trên tóc bạn trong chớp mắt!",
        highlight: "BƯỚC 4: PHUN HƠI NÓNG ➔ LÀM KHÔ CỰC NHANH",
        subText: "Gió nóng thổi mạnh làm bay hơi nước bám trên tóc trong tích tắc.",
        icon: "blow-dry",
      },
    ],
    outro: {
      voiceText: "Xong trong 30 giây! Bạn muốn mổ xẻ thiết bị nào tiếp theo, hãy bình luận nhé!",
      highlight: "30 GIÂY ĐÃ HẾT! 💨",
      subText: "Bạn muốn mổ xẻ thiết bị gia dụng nào tiếp theo?",
      cta: "Bình luận ngay ý tưởng của bạn!",
    },
    audioFolder: "audio",
  },
};

export const App: React.FC = () => {
  // Mobile Navigation Tabs: 'player' | 'script' | 'render'
  const [activeTab, setActiveTab] = useState<"player" | "script" | "render">("player");

  // Template Mode: 'xray' (Sci-Fi X-Ray Pistol) | 'universal' (Parametric Explainer) | 'pistol_blueprint'
  const [template, setTemplate] = useState<"xray" | "universal" | "pistol">("xray");

  // Script Data for Universal Template
  const [topicConfig, setTopicConfig] = useState<UniversalTopicConfig>(PRESET_TOPICS.jet);

  // Script Mode: 'form' | 'json'
  const [scriptMode, setScriptMode] = useState<"form" | "json">("form");
  const [rawJson, setRawJson] = useState<string>(JSON.stringify(PRESET_TOPICS.jet, null, 2));
  const [jsonError, setJsonError] = useState<string | null>(null);

  // Copy status
  const [copied, setCopied] = useState<string | null>(null);

  // Handle Preset Selection
  const loadPreset = (key: keyof typeof PRESET_TOPICS) => {
    const selected = PRESET_TOPICS[key];
    setTopicConfig(selected);
    setRawJson(JSON.stringify(selected, null, 2));
    setTemplate("universal");
    setJsonError(null);
  };

  // Handle Raw JSON Change
  const handleJsonChange = (val: string) => {
    setRawJson(val);
    try {
      const parsed = JSON.parse(val);
      if (parsed.title && Array.isArray(parsed.segments)) {
        setTopicConfig(parsed);
        setJsonError(null);
      }
    } catch (e: any) {
      setJsonError("JSON chưa hợp lệ: " + e.message);
    }
  };

  // Helper to copy text with feedback
  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopied(label);
    setTimeout(() => setCopied(null), 2500);
  };

  // Download script.json file
  const handleDownloadJson = () => {
    const blob = new Blob([JSON.stringify(topicConfig, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `kịch-bản-${topicConfig.id || "30s"}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // Active Video Component selection
  const activeComponent = useMemo(() => {
    if (template === "xray") {
      return XRayVideo;
    }
    if (template === "pistol") {
      return PistolExplainerVideo;
    }
    return UniversalExplainerVideo;
  }, [template]);

  const activeProps = useMemo(() => {
    if (template === "universal") {
      return topicConfig;
    }
    return {};
  }, [template, topicConfig]);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        backgroundColor: "#030712",
        color: "#F3F4F6",
        maxWidth: 640,
        margin: "0 auto",
        position: "relative",
        paddingBottom: 90, // safe area for mobile bottom nav
      }}
    >
      {/* MOBILE STICKY HEADER */}
      <header
        style={{
          position: "sticky",
          top: 0,
          zIndex: 50,
          backdropFilter: "blur(16px)",
          backgroundColor: "rgba(3, 7, 18, 0.88)",
          borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
          padding: "12px 16px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div
            style={{
              width: 38,
              height: 38,
              borderRadius: 10,
              background: "linear-gradient(135deg, #06B6D4, #3B82F6)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 20,
              boxShadow: "0 0 15px rgba(6, 182, 212, 0.5)",
            }}
          >
            ⚡
          </div>
          <div>
            <div style={{ fontSize: 16, fontWeight: 900, letterSpacing: "0.03em" }}>
              30S EXPLAINER <span style={{ color: "#06B6D4" }}>STUDIO</span>
            </div>
            <div style={{ fontSize: 11, color: "#9CA3AF" }}>
              Tạo video TikTok giải thích mọi thứ trong 30s
            </div>
          </div>
        </div>

        <button
          onClick={() => setActiveTab("render")}
          style={{
            background: "linear-gradient(135deg, #F59E0B, #EF4444)",
            color: "#FFF",
            border: "none",
            borderRadius: 8,
            padding: "8px 14px",
            fontSize: 12,
            fontWeight: 800,
            cursor: "pointer",
            boxShadow: "0 0 12px rgba(239, 68, 68, 0.4)",
            display: "flex",
            alignItems: "center",
            gap: 6,
          }}
        >
          <span>🔥</span> Xuất Video
        </button>
      </header>

      {/* QUICK TEMPLATE SELECTOR CHIPS */}
      <div
        style={{
          padding: "10px 16px",
          display: "flex",
          gap: 8,
          overflowX: "auto",
          whiteSpace: "nowrap",
          scrollbarWidth: "none",
          borderBottom: "1px solid rgba(255, 255, 255, 0.05)",
          backgroundColor: "rgba(17, 24, 39, 0.6)",
        }}
      >
        <button
          onClick={() => setTemplate("xray")}
          style={{
            padding: "7px 14px",
            borderRadius: 20,
            fontSize: 12,
            fontWeight: 700,
            cursor: "pointer",
            border: template === "xray" ? "1px solid #06B6D4" : "1px solid rgba(255,255,255,0.1)",
            backgroundColor: template === "xray" ? "rgba(6, 182, 212, 0.2)" : "rgba(31, 41, 55, 0.5)",
            color: template === "xray" ? "#22D3EE" : "#9CA3AF",
            transition: "all 0.2s ease",
          }}
        >
          🔍 X-Ray Thấu Thị 3D
        </button>

        <button
          onClick={() => {
            setTemplate("universal");
            loadPreset("jet");
          }}
          style={{
            padding: "7px 14px",
            borderRadius: 20,
            fontSize: 12,
            fontWeight: 700,
            cursor: "pointer",
            border: template === "universal" && topicConfig.id === "jet-engine-30s" ? "1px solid #3B82F6" : "1px solid rgba(255,255,255,0.1)",
            backgroundColor: template === "universal" && topicConfig.id === "jet-engine-30s" ? "rgba(59, 130, 246, 0.2)" : "rgba(31, 41, 55, 0.5)",
            color: template === "universal" && topicConfig.id === "jet-engine-30s" ? "#60A5FA" : "#9CA3AF",
            transition: "all 0.2s ease",
          }}
        >
          ✈️ Động Cơ Phản Lực
        </button>

        <button
          onClick={() => {
            setTemplate("universal");
            loadPreset("hairDryer");
          }}
          style={{
            padding: "7px 14px",
            borderRadius: 20,
            fontSize: 12,
            fontWeight: 700,
            cursor: "pointer",
            border:
              template === "universal" && topicConfig.id === "hair-dryer-30s"
                ? "1px solid #F97316"
                : "1px solid rgba(255,255,255,0.1)",
            backgroundColor:
              template === "universal" && topicConfig.id === "hair-dryer-30s"
                ? "rgba(249, 115, 22, 0.25)"
                : "rgba(31, 41, 55, 0.5)",
            color:
              template === "universal" && topicConfig.id === "hair-dryer-30s"
                ? "#FB923C"
                : "#9CA3AF",
            transition: "all 0.2s ease",
          }}
        >
          💨 Máy Sấy Tóc
        </button>

        <button
          onClick={() => {
            setTemplate("universal");
            loadPreset("microwave");
          }}
          style={{
            padding: "7px 14px",
            borderRadius: 20,
            fontSize: 12,
            fontWeight: 700,
            cursor: "pointer",
            border: template === "universal" && topicConfig.id === "microwave-30s" ? "1px solid #F59E0B" : "1px solid rgba(255,255,255,0.1)",
            backgroundColor: template === "universal" && topicConfig.id === "microwave-30s" ? "rgba(245, 158, 11, 0.2)" : "rgba(31, 41, 55, 0.5)",
            color: template === "universal" && topicConfig.id === "microwave-30s" ? "#FBBF24" : "#9CA3AF",
            transition: "all 0.2s ease",
          }}
        >
          🍲 Lò Vi Sóng
        </button>

        <button
          onClick={() => {
            setTemplate("universal");
            loadPreset("gear");
          }}
          style={{
            padding: "7px 14px",
            borderRadius: 20,
            fontSize: 12,
            fontWeight: 700,
            cursor: "pointer",
            border: template === "universal" && topicConfig.id === "differential-gear-30s" ? "1px solid #10B981" : "1px solid rgba(255,255,255,0.1)",
            backgroundColor: template === "universal" && topicConfig.id === "differential-gear-30s" ? "rgba(16, 185, 129, 0.2)" : "rgba(31, 41, 55, 0.5)",
            color: template === "universal" && topicConfig.id === "differential-gear-30s" ? "#34D399" : "#9CA3AF",
            transition: "all 0.2s ease",
          }}
        >
          🏎️ Bộ Vi Sai Ô Tô
        </button>

        <button
          onClick={() => setTemplate("pistol")}
          style={{
            padding: "7px 14px",
            borderRadius: 20,
            fontSize: 12,
            fontWeight: 700,
            cursor: "pointer",
            border: template === "pistol" ? "1px solid #F59E0B" : "1px solid rgba(255,255,255,0.1)",
            backgroundColor: template === "pistol" ? "rgba(245, 158, 11, 0.2)" : "rgba(31, 41, 55, 0.5)",
            color: template === "pistol" ? "#FBBF24" : "#9CA3AF",
            transition: "all 0.2s ease",
          }}
        >
          🔫 Bản Vẽ Cơ Khí
        </button>
      </div>

      {/* MAIN CONTENT AREA */}
      <main style={{ padding: "16px", flex: 1, display: "flex", flexDirection: "column", gap: 16 }}>
        {/* ======================================================== */}
        {/* TAB 1: 📱 TRÌNH PHÁT VIDEO TRỰC QUAN (MOBILE PLAYER) */}
        {/* ======================================================== */}
        {activeTab === "player" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {/* Player Container 9:16 Responsive */}
            <div
              style={{
                position: "relative",
                width: "100%",
                maxWidth: 380,
                margin: "0 auto",
                aspectRatio: "9 / 16",
                borderRadius: 20,
                overflow: "hidden",
                border: "2px solid rgba(6, 182, 212, 0.4)",
                boxShadow: "0 10px 40px rgba(0, 0, 0, 0.8), 0 0 25px rgba(6, 182, 212, 0.2)",
                backgroundColor: "#000",
              }}
            >
              <Player
                component={activeComponent}
                durationInFrames={900}
                compositionWidth={1080}
                compositionHeight={1920}
                fps={30}
                style={{
                  width: "100%",
                  height: "100%",
                }}
                controls
                autoPlay
                loop
                inputProps={activeProps}
              />

              {/* LIVE WATERMARK BADGE */}
              <div
                style={{
                  position: "absolute",
                  top: 12,
                  right: 12,
                  pointerEvents: "none",
                  backgroundColor: "rgba(0, 0, 0, 0.65)",
                  backdropFilter: "blur(8px)",
                  padding: "4px 8px",
                  borderRadius: 6,
                  fontSize: 10,
                  fontWeight: 800,
                  color: "#22D3EE",
                  border: "1px solid rgba(6, 182, 212, 0.4)",
                  letterSpacing: "0.05em",
                }}
              >
                ● LIVE 9:16
              </div>
            </div>

            {/* Video Info Card */}
            <div
              style={{
                backgroundColor: "rgba(17, 24, 39, 0.7)",
                borderRadius: 14,
                padding: "14px 16px",
                border: "1px solid rgba(255, 255, 255, 0.08)",
                display: "flex",
                flexDirection: "column",
                gap: 8,
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span
                  style={{
                    fontSize: 11,
                    fontWeight: 800,
                    color: "#06B6D4",
                    textTransform: "uppercase",
                    letterSpacing: "0.08em",
                  }}
                >
                  {template === "xray" ? "TEMPLATE X-RAY THẤU THỊ" : topicConfig.category}
                </span>
                <span style={{ fontSize: 11, color: "#9CA3AF" }}>⏱️ 30.0s (900 Frames)</span>
              </div>
              <div style={{ fontSize: 16, fontWeight: 800, color: "#FFF" }}>
                {template === "xray" ? "SÚNG LỤC HOẠT ĐỘNG THẾ NÀO?" : topicConfig.title}
              </div>

              {/* Action buttons below player */}
              <div style={{ display: "flex", gap: 8, marginTop: 6 }}>
                <button
                  onClick={() => setActiveTab("script")}
                  style={{
                    flex: 1,
                    padding: "10px",
                    borderRadius: 10,
                    backgroundColor: "rgba(31, 41, 55, 0.9)",
                    border: "1px solid rgba(255, 255, 255, 0.15)",
                    color: "#F3F4F6",
                    fontSize: 13,
                    fontWeight: 700,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 6,
                    cursor: "pointer",
                  }}
                >
                  <span>✏️</span> Sửa Kịch Bản
                </button>
                <button
                  onClick={() => setActiveTab("render")}
                  style={{
                    flex: 1,
                    padding: "10px",
                    borderRadius: 10,
                    background: "linear-gradient(135deg, #06B6D4, #3B82F6)",
                    border: "none",
                    color: "#FFF",
                    fontSize: 13,
                    fontWeight: 800,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 6,
                    cursor: "pointer",
                    boxShadow: "0 0 15px rgba(6, 182, 212, 0.4)",
                  }}
                >
                  <span>🚀</span> Xuất Video MP4
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* TAB 2: ✍️ NHẬP / DÁN KỊCH BẢN (SCRIPT EDITOR) */}
        {/* ======================================================== */}
        {activeTab === "script" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {/* Mode switch: Form or JSON */}
            <div
              style={{
                display: "flex",
                backgroundColor: "rgba(31, 41, 55, 0.6)",
                padding: 4,
                borderRadius: 10,
                border: "1px solid rgba(255, 255, 255, 0.08)",
              }}
            >
              <button
                onClick={() => setScriptMode("form")}
                style={{
                  flex: 1,
                  padding: "8px",
                  borderRadius: 8,
                  fontSize: 13,
                  fontWeight: 700,
                  cursor: "pointer",
                  border: "none",
                  backgroundColor: scriptMode === "form" ? "#06B6D4" : "transparent",
                  color: scriptMode === "form" ? "#000" : "#9CA3AF",
                  transition: "all 0.2s ease",
                }}
              >
                📝 Form Trực Quan (Dễ Dùng)
              </button>
              <button
                onClick={() => setScriptMode("json")}
                style={{
                  flex: 1,
                  padding: "8px",
                  borderRadius: 8,
                  fontSize: 13,
                  fontWeight: 700,
                  cursor: "pointer",
                  border: "none",
                  backgroundColor: scriptMode === "json" ? "#06B6D4" : "transparent",
                  color: scriptMode === "json" ? "#000" : "#9CA3AF",
                  transition: "all 0.2s ease",
                }}
              >
                📄 Dán Kịch Bản JSON
              </button>
            </div>

            {/* QUICK PRESET BUTTONS */}
            <div
              style={{
                backgroundColor: "rgba(17, 24, 39, 0.6)",
                padding: "12px",
                borderRadius: 12,
                border: "1px solid rgba(255, 255, 255, 0.06)",
              }}
            >
              <div style={{ fontSize: 12, color: "#9CA3AF", marginBottom: 8, fontWeight: 600 }}>
                💡 Chọn nhanh kịch bản mẫu 30s:
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
                <button
                  onClick={() => loadPreset("jet")}
                  style={{
                    padding: "8px 10px",
                    borderRadius: 8,
                    fontSize: 12,
                    fontWeight: 700,
                    backgroundColor: "rgba(59, 130, 246, 0.15)",
                    border: "1px solid rgba(59, 130, 246, 0.3)",
                    color: "#93C5FD",
                    cursor: "pointer",
                    textAlign: "left",
                  }}
                >
                  ✈️ Động cơ phản lực
                </button>
                <button
                  onClick={() => loadPreset("microwave")}
                  style={{
                    padding: "8px 10px",
                    borderRadius: 8,
                    fontSize: 12,
                    fontWeight: 700,
                    backgroundColor: "rgba(245, 158, 11, 0.15)",
                    border: "1px solid rgba(245, 158, 11, 0.3)",
                    color: "#FDE68A",
                    cursor: "pointer",
                    textAlign: "left",
                  }}
                >
                  🍲 Lò vi sóng nấu ăn
                </button>
                <button
                  onClick={() => loadPreset("gear")}
                  style={{
                    padding: "8px 10px",
                    borderRadius: 8,
                    fontSize: 12,
                    fontWeight: 700,
                    backgroundColor: "rgba(16, 185, 129, 0.15)",
                    border: "1px solid rgba(16, 185, 129, 0.3)",
                    color: "#A7F3D0",
                    cursor: "pointer",
                    textAlign: "left",
                  }}
                >
                  🏎️ Bộ vi sai ô tô
                </button>
                <button
                  onClick={() => loadPreset("hairDryer")}
                  style={{
                    padding: "8px 10px",
                    borderRadius: 8,
                    fontSize: 12,
                    fontWeight: 700,
                    backgroundColor: "rgba(249, 115, 22, 0.15)",
                    border: "1px solid rgba(249, 115, 22, 0.3)",
                    color: "#FDBA74",
                    cursor: "pointer",
                    textAlign: "left",
                  }}
                >
                  💨 Máy sấy tóc 30s
                </button>
                <button
                  onClick={() => {
                    setTemplate("xray");
                    setActiveTab("player");
                  }}
                  style={{
                    padding: "8px 10px",
                    borderRadius: 8,
                    fontSize: 12,
                    fontWeight: 700,
                    backgroundColor: "rgba(6, 182, 212, 0.15)",
                    border: "1px solid rgba(6, 182, 212, 0.3)",
                    color: "#67E8F9",
                    cursor: "pointer",
                    textAlign: "left",
                  }}
                >
                  🔍 Súng lục X-Ray 3D
                </button>
              </div>
            </div>

            {/* FORM MODE */}
            {scriptMode === "form" && (
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {/* Topic Title */}
                <div>
                  <label style={{ fontSize: 12, fontWeight: 700, color: "#D1D5DB", display: "block", marginBottom: 4 }}>
                    Tiêu đề video (Hỏi tò mò):
                  </label>
                  <input
                    type="text"
                    value={topicConfig.title}
                    onChange={(e) => {
                      const updated = { ...topicConfig, title: e.target.value };
                      setTopicConfig(updated);
                      setRawJson(JSON.stringify(updated, null, 2));
                      setTemplate("universal");
                    }}
                    style={{
                      width: "100%",
                      padding: "10px 12px",
                      borderRadius: 10,
                      backgroundColor: "rgba(17, 24, 39, 0.9)",
                      border: "1px solid rgba(255, 255, 255, 0.15)",
                      color: "#FFF",
                      fontSize: 14,
                      fontWeight: 700,
                      outline: "none",
                    }}
                    placeholder="VD: PIN LITHIUM TÍCH ĐIỆN THẾ NÀO?"
                  />
                </div>

                {/* 4 Steps */}
                <div style={{ fontSize: 13, fontWeight: 800, color: "#22D3EE", marginTop: 4 }}>
                  4 Bước giải thích trong 30 giây:
                </div>

                {topicConfig.segments.map((seg, idx) => (
                  <div
                    key={idx}
                    style={{
                      backgroundColor: "rgba(17, 24, 39, 0.7)",
                      border: "1px solid rgba(255, 255, 255, 0.08)",
                      borderRadius: 12,
                      padding: 12,
                      display: "flex",
                      flexDirection: "column",
                      gap: 8,
                    }}
                  >
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <span
                        style={{
                          fontSize: 12,
                          fontWeight: 800,
                          color: "#F59E0B",
                          backgroundColor: "rgba(245, 158, 11, 0.15)",
                          padding: "2px 8px",
                          borderRadius: 6,
                        }}
                      >
                        BƯỚC {idx + 1}
                      </span>

                      {/* Icon selector */}
                      <select
                        value={seg.icon || "generic"}
                        onChange={(e) => {
                          const newSegs = [...topicConfig.segments];
                          newSegs[idx] = { ...newSegs[idx], icon: e.target.value };
                          const updated = { ...topicConfig, segments: newSegs };
                          setTopicConfig(updated);
                          setRawJson(JSON.stringify(updated, null, 2));
                        }}
                        style={{
                          backgroundColor: "rgba(31, 41, 55, 0.9)",
                          color: "#FFF",
                          border: "1px solid rgba(255, 255, 255, 0.2)",
                          borderRadius: 6,
                          padding: "3px 6px",
                          fontSize: 11,
                        }}
                      >
                        <option value="fan">🌀 Quạt Hút (Fan)</option>
                        <option value="heat-coil">🔥 Dây Mayso (Heat Coil)</option>
                        <option value="wind-thermal">💨 Khí Nóng Đối Lưu (Thermal)</option>
                        <option value="blow-dry">🌪️ Máy Sấy Hoàn Chỉnh (Dryer)</option>
                        <option value="pressure">⚡ Áp Suất (Pressure)</option>
                        <option value="fire">🔥 Đốt Cháy (Fire)</option>
                        <option value="thrust">🚀 Phản Lực (Thrust)</option>
                        <option value="gear">⚙️ Bánh Răng (Gear)</option>
                        <option value="wave">📡 Sóng Vi Ba (Wave)</option>
                        <option value="generic">📦 Linh Kiện Khác</option>
                      </select>
                    </div>

                    <input
                      type="text"
                      value={seg.highlight}
                      onChange={(e) => {
                        const newSegs = [...topicConfig.segments];
                        newSegs[idx] = { ...newSegs[idx], highlight: e.target.value };
                        const updated = { ...topicConfig, segments: newSegs };
                        setTopicConfig(updated);
                        setRawJson(JSON.stringify(updated, null, 2));
                      }}
                      style={{
                        width: "100%",
                        padding: "8px 10px",
                        borderRadius: 8,
                        backgroundColor: "rgba(31, 41, 55, 0.7)",
                        border: "1px solid rgba(255, 255, 255, 0.1)",
                        color: "#FFF",
                        fontSize: 13,
                        fontWeight: 700,
                      }}
                      placeholder="Dòng chữ nổi bật lớn trên màn hình"
                    />

                    <textarea
                      rows={2}
                      value={seg.voiceText}
                      onChange={(e) => {
                        const newSegs = [...topicConfig.segments];
                        newSegs[idx] = { ...newSegs[idx], voiceText: e.target.value, subText: e.target.value };
                        const updated = { ...topicConfig, segments: newSegs };
                        setTopicConfig(updated);
                        setRawJson(JSON.stringify(updated, null, 2));
                      }}
                      style={{
                        width: "100%",
                        padding: "8px 10px",
                        borderRadius: 8,
                        backgroundColor: "rgba(31, 41, 55, 0.7)",
                        border: "1px solid rgba(255, 255, 255, 0.1)",
                        color: "#9CA3AF",
                        fontSize: 12,
                        resize: "none",
                      }}
                      placeholder="Lời thuyết minh của bước này..."
                    />
                  </div>
                ))}

                {/* Save and View button */}
                <button
                  onClick={() => {
                    setTemplate("universal");
                    setActiveTab("player");
                  }}
                  style={{
                    padding: "12px",
                    borderRadius: 12,
                    background: "linear-gradient(135deg, #06B6D4, #3B82F6)",
                    border: "none",
                    color: "#FFF",
                    fontSize: 14,
                    fontWeight: 800,
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 8,
                    marginTop: 6,
                    boxShadow: "0 0 20px rgba(6, 182, 212, 0.4)",
                  }}
                >
                  <span>▶️</span> Xem Video Ngay Lập Tức
                </button>
              </div>
            )}

            {/* JSON MODE */}
            {scriptMode === "json" && (
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                <div style={{ fontSize: 12, color: "#9CA3AF" }}>
                  Dán kịch bản JSON được tạo từ ChatGPT/Claude hoặc nhập trực tiếp:
                </div>

                <textarea
                  rows={14}
                  value={rawJson}
                  onChange={(e) => handleJsonChange(e.target.value)}
                  style={{
                    width: "100%",
                    padding: 12,
                    borderRadius: 12,
                    backgroundColor: "rgba(10, 15, 29, 0.95)",
                    border: jsonError ? "1px solid #EF4444" : "1px solid rgba(6, 182, 212, 0.3)",
                    color: "#67E8F9",
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: 11,
                    lineHeight: 1.5,
                  }}
                />

                {jsonError && (
                  <div style={{ color: "#EF4444", fontSize: 12, fontWeight: 600 }}>
                    ⚠️ {jsonError}
                  </div>
                )}

                <div style={{ display: "flex", gap: 8 }}>
                  <button
                    onClick={async () => {
                      try {
                        const clip = await navigator.clipboard.readText();
                        handleJsonChange(clip);
                      } catch {
                        alert("Không thể đọc từ clipboard! Hãy dán thủ công vào ô trên.");
                      }
                    }}
                    style={{
                      flex: 1,
                      padding: "10px",
                      borderRadius: 10,
                      backgroundColor: "rgba(31, 41, 55, 0.9)",
                      border: "1px solid rgba(255, 255, 255, 0.15)",
                      color: "#F3F4F6",
                      fontSize: 12,
                      fontWeight: 700,
                      cursor: "pointer",
                    }}
                  >
                    📋 Dán Từ Clipboard
                  </button>

                  <button
                    onClick={() => {
                      setTemplate("universal");
                      setActiveTab("player");
                    }}
                    disabled={!!jsonError}
                    style={{
                      flex: 1,
                      padding: "10px",
                      borderRadius: 10,
                      background: jsonError ? "#4B5563" : "linear-gradient(135deg, #06B6D4, #3B82F6)",
                      border: "none",
                      color: "#FFF",
                      fontSize: 12,
                      fontWeight: 800,
                      cursor: jsonError ? "not-allowed" : "pointer",
                    }}
                  >
                    ✓ Nạp Kịch Bản & Xem
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ======================================================== */}
        {/* TAB 3: 🚀 NÚT TẠO VIDEO & RENDER (RENDER & EXPORT) */}
        {/* ======================================================== */}
        {activeTab === "render" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {/* BIG ACTION HERO */}
            <div
              style={{
                background: "linear-gradient(135deg, rgba(6, 182, 212, 0.15), rgba(239, 68, 68, 0.15))",
                border: "1px solid rgba(6, 182, 212, 0.4)",
                borderRadius: 16,
                padding: "20px 16px",
                textAlign: "center",
                display: "flex",
                flexDirection: "column",
                gap: 12,
                boxShadow: "0 10px 30px rgba(0, 0, 0, 0.5)",
              }}
            >
              <div style={{ fontSize: 32 }}>🎬</div>
              <div style={{ fontSize: 18, fontWeight: 900, color: "#FFF" }}>
                XUẤT VIDEO TIKTOK 30 GIÂY
              </div>
              <div style={{ fontSize: 12, color: "#9CA3AF", lineHeight: 1.5 }}>
                Đang sẵn sàng cho chủ đề: <br />
                <strong style={{ color: "#22D3EE" }}>
                  {template === "xray" ? "SÚNG LỤC X-RAY THẤU THỊ" : topicConfig.title}
                </strong>
              </div>

              {/* GIANT ACTION BUTTON */}
              <button
                onClick={handleDownloadJson}
                style={{
                  width: "100%",
                  padding: "14px",
                  borderRadius: 12,
                  background: "linear-gradient(135deg, #F59E0B, #EF4444)",
                  border: "none",
                  color: "#FFF",
                  fontSize: 15,
                  fontWeight: 900,
                  cursor: "pointer",
                  boxShadow: "0 0 25px rgba(239, 68, 68, 0.5)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 8,
                }}
              >
                <span>📥</span> TẢI FILE KỊCH BẢN (JSON)
              </button>
            </div>

            {/* DIRECT VIDEO DOWNLOAD (READY-MADE SAMPLES) */}
            <div
              style={{
                backgroundColor: "rgba(17, 24, 39, 0.8)",
                borderRadius: 14,
                padding: "14px 16px",
                border: "1px solid rgba(255, 255, 255, 0.08)",
                display: "flex",
                flexDirection: "column",
                gap: 10,
              }}
            >
              <div style={{ fontSize: 13, fontWeight: 800, color: "#34D399" }}>
                ✅ VIDEO MP4 ĐÃ RENDER SẴN
              </div>
              <div style={{ fontSize: 12, color: "#9CA3AF" }}>
                Bản render hoàn chỉnh chất lượng cao 1080x1920 (X-Ray Exploded 30s) với đầy đủ âm thanh lồng tiếng Nam Minh Neural + SFX cơ khí:
              </div>

              <div
                style={{
                  backgroundColor: "rgba(0, 0, 0, 0.4)",
                  padding: 10,
                  borderRadius: 10,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: "#FFF" }}>
                    sung-luc-xray-exploded.mp4
                  </div>
                  <div style={{ fontSize: 11, color: "#9CA3AF" }}>10.5 MB • 1080x1920 • 30 Giây</div>
                </div>
                <a
                  href="./sung-luc-xray-exploded.mp4"
                  download="sung-luc-xray-exploded.mp4"
                  style={{
                    backgroundColor: "#10B981",
                    color: "#000",
                    padding: "6px 12px",
                    borderRadius: 8,
                    fontSize: 12,
                    fontWeight: 800,
                    textDecoration: "none",
                  }}
                >
                  Tải Về ⬇️
                </a>
              </div>
            </div>

            {/* RENDER INSTRUCTIONS */}
            <div
              style={{
                backgroundColor: "rgba(17, 24, 39, 0.8)",
                borderRadius: 14,
                padding: "14px 16px",
                border: "1px solid rgba(255, 255, 255, 0.08)",
                display: "flex",
                flexDirection: "column",
                gap: 10,
              }}
            >
              <div style={{ fontSize: 13, fontWeight: 800, color: "#06B6D4" }}>
                ⚡ LỆNH RENDER TỰ ĐỘNG BẰNG MÁY TÍNH / SERVER
              </div>
              <div style={{ fontSize: 12, color: "#9CA3AF" }}>
                Sao chép lệnh dưới đây để render file MP4 siêu tốc với Remotion CLI:
              </div>

              {/* Code Snippet Box */}
              <div
                style={{
                  backgroundColor: "rgba(10, 15, 29, 0.95)",
                  padding: 12,
                  borderRadius: 10,
                  border: "1px solid rgba(255, 255, 255, 0.1)",
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: 11,
                  color: "#67E8F9",
                  wordBreak: "break-all",
                  position: "relative",
                }}
              >
                {template === "xray"
                  ? "npx remotion render XRayExplodedTikTok out/sung-luc-xray.mp4"
                  : `npx remotion render UniversalExplainerTikTok out/${topicConfig.id || "video"}.mp4`}
              </div>

              <button
                onClick={() =>
                  handleCopy(
                    template === "xray"
                      ? "npx remotion render XRayExplodedTikTok out/sung-luc-xray.mp4"
                      : `npx remotion render UniversalExplainerTikTok out/${topicConfig.id || "video"}.mp4`,
                    "cli"
                  )
                }
                style={{
                  padding: "10px",
                  borderRadius: 8,
                  backgroundColor: "rgba(31, 41, 55, 0.9)",
                  border: "1px solid rgba(255, 255, 255, 0.15)",
                  color: "#FFF",
                  fontSize: 12,
                  fontWeight: 700,
                  cursor: "pointer",
                }}
              >
                {copied === "cli" ? "✓ Đã Sao Chép Lệnh!" : "📋 Sao Chép Lệnh Render"}
              </button>
            </div>
          </div>
        )}
      </main>

      {/* MOBILE BOTTOM NAVIGATION BAR (FIXED) */}
      <nav
        style={{
          position: "fixed",
          bottom: 0,
          left: "50%",
          transform: "translateX(-50%)",
          width: "100%",
          maxWidth: 640,
          backgroundColor: "rgba(3, 7, 18, 0.94)",
          backdropFilter: "blur(20px)",
          borderTop: "1px solid rgba(255, 255, 255, 0.1)",
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr",
          padding: "8px 12px 14px",
          zIndex: 60,
        }}
      >
        <button
          onClick={() => setActiveTab("player")}
          style={{
            background: "transparent",
            border: "none",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 4,
            cursor: "pointer",
            color: activeTab === "player" ? "#06B6D4" : "#6B7280",
            transition: "all 0.2s ease",
          }}
        >
          <span style={{ fontSize: 20 }}>📱</span>
          <span style={{ fontSize: 11, fontWeight: activeTab === "player" ? 800 : 600 }}>
            Xem Video
          </span>
        </button>

        <button
          onClick={() => setActiveTab("script")}
          style={{
            background: "transparent",
            border: "none",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 4,
            cursor: "pointer",
            color: activeTab === "script" ? "#06B6D4" : "#6B7280",
            transition: "all 0.2s ease",
          }}
        >
          <span style={{ fontSize: 20 }}>✍️</span>
          <span style={{ fontSize: 11, fontWeight: activeTab === "script" ? 800 : 600 }}>
            Kịch Bản
          </span>
        </button>

        <button
          onClick={() => setActiveTab("render")}
          style={{
            background: "transparent",
            border: "none",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 4,
            cursor: "pointer",
            color: activeTab === "render" ? "#EF4444" : "#6B7280",
            transition: "all 0.2s ease",
          }}
        >
          <span style={{ fontSize: 20 }}>🚀</span>
          <span style={{ fontSize: 11, fontWeight: activeTab === "render" ? 800 : 600 }}>
            Tạo Video
          </span>
        </button>
      </nav>
    </div>
  );
};
