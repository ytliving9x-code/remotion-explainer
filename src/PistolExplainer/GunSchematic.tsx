import React from "react";
import { interpolate, useCurrentFrame } from "remotion";

export const GunSchematic: React.FC = () => {
  const frame = useCurrentFrame();

  // Phase ranges:
  // Phase 0: 0 - 90 (Intro / Blueprint Overview)
  // Phase 1: 90 - 240 (Trigger pull & Firing Pin Strike)
  // Phase 2: 240 - 420 (Gunpowder detonation & Bullet Acceleration)
  // Phase 3: 420 - 600 (Slide Recoil & Empty Casing Ejection)
  // Phase 4: 600 - 780 (Spring Reset & Chambering New Round)
  // Phase 5: 780 - 900 (Loop rapid continuous cycle)

  // 1. Trigger pull angle
  let triggerAngle = 0;
  if (frame >= 90 && frame < 150) {
    triggerAngle = interpolate(frame, [90, 130], [0, 18], {
      extrapolateRight: "clamp",
    });
  } else if (frame >= 150 && frame < 650) {
    triggerAngle = 18;
  } else if (frame >= 650 && frame < 720) {
    triggerAngle = interpolate(frame, [650, 700], [18, 0], {
      extrapolateRight: "clamp",
    });
  } else if (frame >= 780) {
    // Rapid cyclic motion in outro
    const loopCycle = (frame - 780) % 25;
    triggerAngle = loopCycle < 8 ? 18 : 0;
  }

  // 2. Firing Pin strike position
  let firingPinX = 0; // 0 = resting back, +28 = struck forward
  if (frame >= 130 && frame < 170) {
    firingPinX = interpolate(frame, [130, 145], [0, 28], {
      extrapolateRight: "clamp",
    });
  } else if (frame >= 170 && frame < 450) {
    firingPinX = 28;
  } else if (frame >= 450 && frame < 650) {
    firingPinX = interpolate(frame, [450, 520], [28, 0], {
      extrapolateRight: "clamp",
    });
  } else if (frame >= 780) {
    const loopCycle = (frame - 780) % 25;
    firingPinX = loopCycle >= 5 && loopCycle < 15 ? 28 : 0;
  }

  // 3. Gunpowder ignition glow (Frames 140 - 320)
  let explosionOpacity = 0;
  let explosionScale = 0;
  if (frame >= 145 && frame < 220) {
    explosionOpacity = interpolate(frame, [145, 155, 210], [0, 1, 0], {
      extrapolateRight: "clamp",
    });
    explosionScale = interpolate(frame, [145, 170], [0.3, 1.4], {
      extrapolateRight: "clamp",
    });
  } else if (frame >= 780) {
    const loopCycle = (frame - 780) % 25;
    if (loopCycle >= 6 && loopCycle <= 12) {
      explosionOpacity = 0.9;
      explosionScale = 1.2;
    }
  }

  // 4. Bullet flying position (Frame 150 onwards)
  let bulletProgress = 0; // 0 = in chamber, 1 = exiting barrel, >1 = out of screen
  if (frame >= 150 && frame < 290) {
    bulletProgress = interpolate(frame, [150, 220], [0, 1.6], {
      extrapolateRight: "clamp",
    });
  } else if (frame >= 290 && frame < 680) {
    bulletProgress = 2.0; // out
  } else if (frame >= 780) {
    const loopCycle = (frame - 780) % 25;
    bulletProgress = loopCycle >= 7 ? interpolate(loopCycle, [7, 18], [0, 1.8]) : 0;
  }

  // 5. Slide recoil displacement (Frame 420 - 750)
  let slideOffset = 0; // 0 = locked forward, -110 = full recoil back
  if (frame >= 420 && frame < 520) {
    slideOffset = interpolate(frame, [420, 480], [0, -110], {
      extrapolateRight: "clamp",
    });
  } else if (frame >= 520 && frame < 620) {
    slideOffset = -110;
  } else if (frame >= 620 && frame < 720) {
    slideOffset = interpolate(frame, [620, 680], [-110, 0], {
      extrapolateRight: "clamp",
    });
  } else if (frame >= 780) {
    const loopCycle = (frame - 780) % 25;
    if (loopCycle >= 10 && loopCycle < 18) {
      slideOffset = -100;
    } else {
      slideOffset = 0;
    }
  }

  // 6. Spent casing ejection (Frame 460 - 620)
  let casingEjectX = 0;
  let casingEjectY = 0;
  let casingRotate = 0;
  let casingOpacity = 0;
  if (frame >= 460 && frame < 590) {
    casingOpacity = 1;
    casingEjectX = interpolate(frame, [460, 560], [0, 180], {
      extrapolateRight: "clamp",
    });
    casingEjectY = interpolate(frame, [460, 500, 560], [0, -220, -100], {
      extrapolateRight: "clamp",
    });
    casingRotate = interpolate(frame, [460, 560], [0, 450], {
      extrapolateRight: "clamp",
    });
  }

  // 7. New round chambering (Frame 620 - 720)
  let newRoundY = 0; // moves up from magazine into chamber
  let newRoundX = 0;
  if (frame < 600) {
    newRoundY = 45; // waiting in magazine
    newRoundX = -30;
  } else if (frame >= 600 && frame < 670) {
    newRoundY = interpolate(frame, [600, 650], [45, 0], {
      extrapolateRight: "clamp",
    });
    newRoundX = interpolate(frame, [630, 670], [-30, 0], {
      extrapolateRight: "clamp",
    });
  } else {
    newRoundY = 0;
    newRoundX = 0;
  }

  // Callout highlighting by phase
  const isPhase1 = frame >= 90 && frame < 240;
  const isPhase2 = frame >= 240 && frame < 420;
  const isPhase3 = frame >= 420 && frame < 600;
  const isPhase4 = frame >= 600 && frame < 780;

  return (
    <div
      style={{
        position: "absolute",
        top: 360,
        left: 0,
        right: 0,
        height: 880,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 20,
      }}
    >
      <svg
        width="1000"
        height="800"
        viewBox="0 0 1000 800"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{
          overflow: "visible",
          filter: "drop-shadow(0 20px 40px rgba(0,0,0,0.7))",
        }}
      >
        <defs>
          {/* Blueprint Grid Pattern */}
          <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path
              d="M 40 0 L 0 0 0 40"
              fill="none"
              stroke="rgba(56, 189, 248, 0.07)"
              strokeWidth="1"
            />
          </pattern>

          {/* Gradients */}
          <linearGradient id="slideGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#475569" />
            <stop offset="50%" stopColor="#334155" />
            <stop offset="100%" stopColor="#1E293B" />
          </linearGradient>

          <linearGradient id="frameGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#1E293B" />
            <stop offset="100%" stopColor="#0F172A" />
          </linearGradient>

          <linearGradient id="barrelGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#64748B" />
            <stop offset="50%" stopColor="#94A3B8" />
            <stop offset="100%" stopColor="#475569" />
          </linearGradient>

          <linearGradient id="brassGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#F59E0B" />
            <stop offset="50%" stopColor="#FDE047" />
            <stop offset="100%" stopColor="#D97706" />
          </linearGradient>

          <linearGradient id="bulletHeadGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#EA580C" />
            <stop offset="100%" stopColor="#C2410C" />
          </linearGradient>

          <radialGradient id="explosionGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FEF08A" stopOpacity="1" />
            <stop offset="40%" stopColor="#F97316" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#DC2626" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Blueprint Grid Backdrop Circle */}
        <circle cx="500" cy="400" r="370" fill="url(#grid)" />
        <circle
          cx="500"
          cy="400"
          r="370"
          stroke="rgba(56, 189, 248, 0.2)"
          strokeWidth="2"
          strokeDasharray="6 6"
        />

        {/* ========================================================
            STATIC LOWER FRAME & GRIP (Khung dưới & Tay cầm)
            ======================================================== */}
        <g id="lower-frame">
          {/* Grip and trigger guard */}
          <path
            d="M 230 330 
               L 410 330 
               L 420 440 
               L 350 440 
               L 330 670 
               L 200 640 
               L 250 410 
               L 210 410 
               Z"
            fill="url(#frameGrad)"
            stroke="#475569"
            strokeWidth="3"
          />

          {/* Grip Texture Grip Lines */}
          <line x1="230" y1="460" x2="310" y2="480" stroke="#334155" strokeWidth="3" />
          <line x1="225" y1="490" x2="305" y2="510" stroke="#334155" strokeWidth="3" />
          <line x1="220" y1="520" x2="300" y2="540" stroke="#334155" strokeWidth="3" />
          <line x1="215" y1="550" x2="295" y2="570" stroke="#334155" strokeWidth="3" />
          <line x1="210" y1="580" x2="290" y2="600" stroke="#334155" strokeWidth="3" />

          {/* Trigger Guard Loop */}
          <path
            d="M 330 370 C 330 450, 430 460, 440 370"
            fill="none"
            stroke="#64748B"
            strokeWidth="5"
          />

          {/* Trigger (Cò súng có thể gập) */}
          <g transform={`rotate(${triggerAngle}, 380, 360)`}>
            <path
              d="M 375 360 C 370 395, 390 415, 400 425 C 395 405, 385 390, 385 360 Z"
              fill={isPhase1 ? "#F59E0B" : "#CBD5E1"}
              stroke={isPhase1 ? "#FDE047" : "#94A3B8"}
              strokeWidth="2"
            />
          </g>

          {/* Magazine Housing (Hộp tiếp đạn bên trong báng) */}
          <rect
            x="240"
            y="430"
            width="65"
            height="190"
            fill="rgba(15, 23, 42, 0.6)"
            stroke="rgba(56, 189, 248, 0.3)"
            strokeWidth="2"
            strokeDasharray="4 4"
          />

          {/* Stored cartridges in magazine */}
          {/* Cartridge 2 in magazine (waiting) */}
          <g transform="translate(244, 480)">
            <rect x="0" y="0" width="38" height="18" rx="3" fill="#D97706" />
            <path d="M 38 0 L 52 5 L 52 13 L 38 18 Z" fill="#EA580C" />
          </g>
          {/* Cartridge 3 in magazine */}
          <g transform="translate(242, 530)">
            <rect x="0" y="0" width="38" height="18" rx="3" fill="#B45309" />
            <path d="M 38 0 L 52 5 L 52 13 L 38 18 Z" fill="#C2410C" />
          </g>
          {/* Magazine Spring at bottom */}
          <path
            d="M 250 580 L 290 590 L 250 600 L 290 610"
            fill="none"
            stroke="#94A3B8"
            strokeWidth="3"
          />
        </g>

        {/* ========================================================
            BARREL & CHAMBER (Cố định hoặc hơi nâng khóa)
            ======================================================== */}
        <g id="barrel-assembly">
          {/* Outer Barrel Body */}
          <rect
            x="360"
            y="265"
            width="380"
            height="46"
            rx="4"
            fill="url(#barrelGrad)"
            stroke="#64748B"
            strokeWidth="2"
          />

          {/* Internal Bore / Rifling Tube */}
          <rect
            x="440"
            y="275"
            width="295"
            height="26"
            fill="#0F172A"
            stroke="#38BDF8"
            strokeWidth="1.5"
          />

          {/* Spiral rifling lines inside barrel */}
          <line
            x1="450"
            y1="280"
            x2="520"
            y2="296"
            stroke="rgba(56, 189, 248, 0.4)"
            strokeWidth="2"
          />
          <line
            x1="530"
            y1="280"
            x2="600"
            y2="296"
            stroke="rgba(56, 189, 248, 0.4)"
            strokeWidth="2"
          />
          <line
            x1="610"
            y1="280"
            x2="680"
            y2="296"
            stroke="rgba(56, 189, 248, 0.4)"
            strokeWidth="2"
          />

          {/* Chamber Area (Buồng đạn phía sau nòng) */}
          <rect
            x="370"
            y="273"
            width="75"
            height="30"
            fill="#1E293B"
            stroke="#E2E8F0"
            strokeWidth="2"
          />
        </g>

        {/* ========================================================
            RECOIL SPRING (Lò xo hồi vị dưới nòng)
            ======================================================== */}
        <g id="recoil-spring-group">
          {/* Guide Rod */}
          <rect x="430" y="318" width="220" height="8" rx="2" fill="#94A3B8" />

          {/* Spring Coils - compress when slideOffset is negative */}
          {Array.from({ length: 14 }).map((_, i) => {
            const normalSpacing = 14;
            const compressedSpacing = interpolate(
              slideOffset,
              [-110, 0],
              [7, normalSpacing],
              { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
            );
            const x = 440 + i * compressedSpacing;
            return (
              <line
                key={i}
                x1={x}
                y1="312"
                x2={x + 5}
                y2="332"
                stroke={isPhase4 ? "#F59E0B" : "#CBD5E1"}
                strokeWidth="4"
                strokeLinecap="round"
              />
            );
          })}
        </g>

        {/* ========================================================
            THE CARTRIDGE IN CHAMBER (Đạn đang trong buồng)
            ======================================================== */}
        {bulletProgress < 1.8 && (
          <g id="active-cartridge" transform={`translate(${newRoundX}, ${newRoundY})`}>
            {/* Brass Casing */}
            <rect
              x="374"
              y="276"
              width="38"
              height="24"
              rx="3"
              fill="url(#brassGrad)"
              stroke="#B45309"
              strokeWidth="1.5"
            />
            {/* Primer Cap at base */}
            <circle
              cx="376"
              cy="288"
              r="4"
              fill={isPhase1 ? "#EF4444" : "#94A3B8"}
              stroke="#475569"
            />

            {/* Bullet Head flying out with bulletProgress */}
            <g
              transform={`translate(${
                bulletProgress > 0 ? bulletProgress * 320 : 0
              }, 0)`}
            >
              <path
                d="M 412 277 L 434 282 Q 442 288 434 294 L 412 299 Z"
                fill="url(#bulletHeadGrad)"
                stroke="#7C2D12"
                strokeWidth="1"
              />
              {/* Bullet shockwave & speed trail */}
              {bulletProgress > 0.1 && (
                <>
                  <line
                    x1="400"
                    y1="288"
                    x2="370"
                    y2="288"
                    stroke="#F97316"
                    strokeWidth="4"
                    strokeDasharray="4 2"
                  />
                  <line
                    x1="438"
                    y1="280"
                    x2="450"
                    y2="276"
                    stroke="#FDE047"
                    strokeWidth="2"
                  />
                  <line
                    x1="438"
                    y1="296"
                    x2="450"
                    y2="300"
                    stroke="#FDE047"
                    strokeWidth="2"
                  />
                </>
              )}
            </g>
          </g>
        )}

        {/* Gunpowder Explosion Shockwave Flash */}
        {explosionOpacity > 0 && (
          <g
            transform={`translate(390, 288) scale(${explosionScale})`}
            opacity={explosionOpacity}
          >
            <circle cx="0" cy="0" r="45" fill="url(#explosionGlow)" />
            <path
              d="M -10 -25 L 15 -10 L 35 -30 L 25 5 L 45 15 L 10 20 L -5 35 L -15 15 Z"
              fill="#FEF08A"
              opacity="0.9"
            />
          </g>
        )}

        {/* Ejected Empty Casing Fly & Spin */}
        {casingOpacity > 0 && (
          <g
            transform={`translate(${380 + casingEjectX}, ${
              260 + casingEjectY
            }) rotate(${casingRotate}, 18, 12)`}
            opacity={casingOpacity}
          >
            <rect
              x="0"
              y="0"
              width="36"
              height="20"
              rx="2"
              fill="url(#brassGrad)"
              stroke="#B45309"
              strokeWidth="2"
            />
            {/* Hollow open mouth of spent casing */}
            <ellipse cx="36" cy="10" rx="3" ry="10" fill="#0F172A" />
            {/* Smoke puff trail */}
            <circle
              cx="-10"
              cy="10"
              r="8"
              fill="rgba(255, 255, 255, 0.4)"
              filter="blur(3px)"
            />
          </g>
        )}

        {/* ========================================================
            SLIDE & STRIKER (Nắp trượt di động - Horizontal Slide)
            ======================================================== */}
        <g id="moving-slide" transform={`translate(${slideOffset}, 0)`}>
          {/* Main Slide Steel Block */}
          <path
            d="M 210 240 
               L 750 240 
               L 750 320 
               L 660 320 
               L 650 335 
               L 410 335 
               L 410 270 
               L 370 270 
               L 360 320 
               L 210 320 
               Z"
            fill="url(#slideGrad)"
            stroke={isPhase3 ? "#F59E0B" : "#64748B"}
            strokeWidth="3"
          />

          {/* Rear Slide Serrations (Rãnh khía phía sau nắp trượt) */}
          <line x1="225" y1="250" x2="225" y2="305" stroke="#1E293B" strokeWidth="4" />
          <line x1="235" y1="250" x2="235" y2="305" stroke="#1E293B" strokeWidth="4" />
          <line x1="245" y1="250" x2="245" y2="305" stroke="#1E293B" strokeWidth="4" />
          <line x1="255" y1="250" x2="255" y2="305" stroke="#1E293B" strokeWidth="4" />

          {/* Sights: Front and Rear Sight */}
          <rect x="735" y="230" width="8" height="10" fill="#94A3B8" />
          <rect x="220" y="230" width="12" height="10" fill="#94A3B8" />

          {/* Striker / Firing Pin Channel & Pin */}
          <rect
            x="270"
            y="282"
            width="100"
            height="12"
            fill="#0F172A"
            stroke="#475569"
            strokeWidth="1.5"
          />

          {/* Firing Pin (Kim hỏa chuyển động) */}
          <g transform={`translate(${firingPinX}, 0)`}>
            <rect
              x="280"
              y="284"
              width="70"
              height="8"
              rx="2"
              fill={isPhase1 ? "#EF4444" : "#E2E8F0"}
              stroke="#000"
              strokeWidth="1"
            />
            {/* Sharp needle tip of firing pin */}
            <polygon
              points="350,285 365,288 350,291"
              fill={isPhase1 ? "#FDE047" : "#E2E8F0"}
            />
            {/* Striker spring */}
            <line
              x1="275"
              y1="288"
              x2="300"
              y2="288"
              stroke="#64748B"
              strokeWidth="3"
              strokeDasharray="2 2"
            />
          </g>

          {/* Ejector claw / Extractor (Móc giữ vỏ đạn) */}
          <rect
            x="368"
            y="266"
            width="8"
            height="10"
            rx="1"
            fill="#F59E0B"
            stroke="#000"
          />
        </g>

        {/* ========================================================
            TECHNICAL POINTER LABELS (Chú thích các bộ phận kỹ thuật)
            ======================================================== */}
        {/* Label 1: Firing Pin */}
        <g opacity={isPhase1 ? 1 : 0.45}>
          <line
            x1="320"
            y1="280"
            x2="280"
            y2="170"
            stroke={isPhase1 ? "#F59E0B" : "#64748B"}
            strokeWidth="2"
            strokeDasharray="4 4"
          />
          <circle
            cx="320"
            cy="280"
            r="5"
            fill={isPhase1 ? "#F59E0B" : "#64748B"}
          />
          <rect
            x="190"
            y="135"
            width="180"
            height="34"
            rx="8"
            fill="rgba(15, 23, 42, 0.9)"
            stroke={isPhase1 ? "#F59E0B" : "#334155"}
            strokeWidth="2"
          />
          <text
            x="280"
            y="158"
            textAnchor="middle"
            fill={isPhase1 ? "#FDE047" : "#E2E8F0"}
            fontSize="14"
            fontWeight="800"
            fontFamily="sans-serif"
          >
            1. KIM HỎA (FIRING PIN)
          </text>
        </g>

        {/* Label 2: Chamber & Gunpowder */}
        <g opacity={isPhase2 ? 1 : 0.45}>
          <line
            x1="400"
            y1="270"
            x2="450"
            y2="150"
            stroke={isPhase2 ? "#F59E0B" : "#64748B"}
            strokeWidth="2"
            strokeDasharray="4 4"
          />
          <circle
            cx="400"
            cy="270"
            r="5"
            fill={isPhase2 ? "#F59E0B" : "#64748B"}
          />
          <rect
            x="360"
            y="115"
            width="190"
            height="34"
            rx="8"
            fill="rgba(15, 23, 42, 0.9)"
            stroke={isPhase2 ? "#F59E0B" : "#334155"}
            strokeWidth="2"
          />
          <text
            x="455"
            y="138"
            textAnchor="middle"
            fill={isPhase2 ? "#FDE047" : "#E2E8F0"}
            fontSize="14"
            fontWeight="800"
            fontFamily="sans-serif"
          >
            2. BUỒNG ĐẠN (CHAMBER)
          </text>
        </g>

        {/* Label 3: Slide Recoil */}
        <g opacity={isPhase3 ? 1 : 0.45}>
          <line
            x1="620"
            y1="240"
            x2="650"
            y2="170"
            stroke={isPhase3 ? "#F59E0B" : "#64748B"}
            strokeWidth="2"
            strokeDasharray="4 4"
          />
          <circle
            cx="620"
            cy="240"
            r="5"
            fill={isPhase3 ? "#F59E0B" : "#64748B"}
          />
          <rect
            x="570"
            y="135"
            width="170"
            height="34"
            rx="8"
            fill="rgba(15, 23, 42, 0.9)"
            stroke={isPhase3 ? "#F59E0B" : "#334155"}
            strokeWidth="2"
          />
          <text
            x="655"
            y="158"
            textAnchor="middle"
            fill={isPhase3 ? "#FDE047" : "#E2E8F0"}
            fontSize="14"
            fontWeight="800"
            fontFamily="sans-serif"
          >
            3. NẮP TRƯỢT (SLIDE)
          </text>
        </g>

        {/* Label 4: Recoil Spring */}
        <g opacity={isPhase4 ? 1 : 0.45}>
          <line
            x1="520"
            y1="335"
            x2="560"
            y2="410"
            stroke={isPhase4 ? "#F59E0B" : "#64748B"}
            strokeWidth="2"
            strokeDasharray="4 4"
          />
          <circle
            cx="520"
            cy="335"
            r="5"
            fill={isPhase4 ? "#F59E0B" : "#64748B"}
          />
          <rect
            x="480"
            y="410"
            width="180"
            height="34"
            rx="8"
            fill="rgba(15, 23, 42, 0.9)"
            stroke={isPhase4 ? "#F59E0B" : "#334155"}
            strokeWidth="2"
          />
          <text
            x="570"
            y="433"
            textAnchor="middle"
            fill={isPhase4 ? "#FDE047" : "#E2E8F0"}
            fontSize="14"
            fontWeight="800"
            fontFamily="sans-serif"
          >
            4. LÒ XO HỒI VỊ (SPRING)
          </text>
        </g>
      </svg>
    </div>
  );
};
