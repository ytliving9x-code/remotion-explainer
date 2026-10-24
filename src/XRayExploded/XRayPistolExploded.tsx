import React from "react";
import { interpolate, useCurrentFrame } from "remotion";

export const XRayPistolExploded: React.FC = () => {
  const frame = useCurrentFrame();

  // 1. Solid to X-Ray Transition (Frames 0 - 75)
  // Scan line reveals X-Ray effect
  const xRayReveal = interpolate(frame, [15, 65], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // 2. Exploded View Offsets (Frames 75 - 240)
  // At frame 75, parts detach and float into exploded view; at frame 200 they snap back together!
  const explodeFactor = interpolate(
    frame,
    [75, 110, 195, 230],
    [0, 1, 1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  const slideExplodeY = explodeFactor * -160;
  const slideExplodeRot = explodeFactor * -3.5;
  const barrelExplodeX = explodeFactor * 70;
  const barrelExplodeY = explodeFactor * -45;
  const springExplodeY = explodeFactor * 90;
  const strikerExplodeX = explodeFactor * -90;
  const strikerExplodeY = explodeFactor * -70;
  const magExplodeY = explodeFactor * 140;

  // 3. Firing & Recoil Mechanics (Frames 240 - 780)
  // In assembled phase:
  const isAssembled = frame >= 230;

  // Trigger pull
  let triggerAngle = 0;
  if (isAssembled && frame >= 270 && frame < 330) {
    triggerAngle = interpolate(frame, [270, 300], [0, 18], { extrapolateRight: "clamp" });
  } else if (frame >= 330 && frame < 650) {
    triggerAngle = 18;
  } else if (frame >= 650 && frame < 720) {
    triggerAngle = interpolate(frame, [650, 700], [18, 0], { extrapolateRight: "clamp" });
  } else if (frame >= 780) {
    const loop = (frame - 780) % 25;
    triggerAngle = loop < 8 ? 18 : 0;
  }

  // Firing pin strike
  let pinStrikeX = 0;
  if (isAssembled && frame >= 295 && frame < 330) {
    pinStrikeX = interpolate(frame, [295, 310], [0, 30], { extrapolateRight: "clamp" });
  } else if (frame >= 330 && frame < 450) {
    pinStrikeX = 30;
  } else if (frame >= 450 && frame < 600) {
    pinStrikeX = interpolate(frame, [450, 520], [30, 0], { extrapolateRight: "clamp" });
  } else if (frame >= 780) {
    const loop = (frame - 780) % 25;
    pinStrikeX = loop >= 5 && loop < 15 ? 30 : 0;
  }

  // Gunpowder explosion
  let explosionOpacity = 0;
  let explosionScale = 0;
  if (isAssembled && frame >= 310 && frame < 380) {
    explosionOpacity = interpolate(frame, [310, 320, 370], [0, 1, 0], { extrapolateRight: "clamp" });
    explosionScale = interpolate(frame, [310, 335], [0.3, 1.5], { extrapolateRight: "clamp" });
  } else if (frame >= 780) {
    const loop = (frame - 780) % 25;
    if (loop >= 6 && loop <= 12) {
      explosionOpacity = 0.95;
      explosionScale = 1.3;
    }
  }

  // Bullet flight
  let bulletProgress = 0;
  if (isAssembled && frame >= 315 && frame < 450) {
    bulletProgress = interpolate(frame, [315, 375], [0, 1.8], { extrapolateRight: "clamp" });
  } else if (frame >= 450 && frame < 650) {
    bulletProgress = 2.0;
  } else if (frame >= 780) {
    const loop = (frame - 780) % 25;
    bulletProgress = loop >= 7 ? interpolate(loop, [7, 18], [0, 1.8]) : 0;
  }

  // Slide recoil displacement
  let slideRecoilX = 0;
  if (isAssembled && frame >= 430 && frame < 530) {
    slideRecoilX = interpolate(frame, [430, 480], [0, -110], { extrapolateRight: "clamp" });
  } else if (frame >= 530 && frame < 620) {
    slideRecoilX = -110;
  } else if (frame >= 620 && frame < 700) {
    slideRecoilX = interpolate(frame, [620, 670], [-110, 0], { extrapolateRight: "clamp" });
  } else if (frame >= 780) {
    const loop = (frame - 780) % 25;
    slideRecoilX = loop >= 10 && loop < 18 ? -100 : 0;
  }

  // Ejected spent casing
  let casingEjectX = 0;
  let casingEjectY = 0;
  let casingRotate = 0;
  let casingOpacity = 0;
  if (isAssembled && frame >= 470 && frame < 590) {
    casingOpacity = 1;
    casingEjectX = interpolate(frame, [470, 560], [0, 190], { extrapolateRight: "clamp" });
    casingEjectY = interpolate(frame, [470, 510, 560], [0, -220, -90], { extrapolateRight: "clamp" });
    casingRotate = interpolate(frame, [470, 560], [0, 540], { extrapolateRight: "clamp" });
  }

  // Pulse & holographic glow
  const holoGlow = interpolate(Math.sin((frame / 10) * Math.PI), [-1, 1], [0.75, 1.0]);

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
        zIndex: 25,
      }}
    >
      <svg
        width="1040"
        height="840"
        viewBox="0 0 1040 840"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{
          overflow: "visible",
          filter: "drop-shadow(0 0 35px rgba(0, 245, 255, 0.25))",
        }}
      >
        <defs>
          {/* Cyber X-Ray Grid Pattern */}
          <pattern id="xrayGrid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(0, 245, 255, 0.08)" strokeWidth="1" />
          </pattern>

          {/* Hologram Shader Linear Gradients */}
          <linearGradient id="holoSlide" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#00F5FF" stopOpacity="0.4" />
            <stop offset="50%" stopColor="#0284C7" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#0F172A" stopOpacity="0.8" />
          </linearGradient>

          <linearGradient id="holoFrame" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#00F5FF" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#0369A1" stopOpacity="0.15" />
          </linearGradient>

          <linearGradient id="holoBarrel" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#38BDF8" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#0F172A" stopOpacity="0.6" />
          </linearGradient>

          <radialGradient id="plasmaExplosion" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="1" />
            <stop offset="30%" stopColor="#00F5FF" stopOpacity="0.9" />
            <stop offset="70%" stopColor="#3B82F6" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#EF4444" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Backdrop Grid Circle */}
        <circle cx="520" cy="420" r="390" fill="url(#xrayGrid)" />
        <circle cx="520" cy="420" r="390" stroke="rgba(0, 245, 255, 0.25)" strokeWidth="1.5" strokeDasharray="6 6" />

        {/* ========================================================
            1. LOWER FRAME & GRIP (Khung dưới & Báng súng)
            ======================================================== */}
        <g id="xray-lower-frame">
          <path
            d="M 240 340 L 420 340 L 430 450 L 360 450 L 340 680 L 210 650 L 260 420 L 220 420 Z"
            fill={xRayReveal > 0.5 ? "url(#holoFrame)" : "#1E293B"}
            stroke="#00F5FF"
            strokeWidth={xRayReveal > 0.5 ? 2.5 : 3}
            opacity={xRayReveal > 0.5 ? holoGlow : 1}
          />
          {/* Skeleton internal struts */}
          {xRayReveal > 0.5 && (
            <>
              <line x1="240" y1="470" x2="320" y2="490" stroke="#00F5FF" strokeWidth="1.5" strokeDasharray="4 4" opacity="0.6" />
              <line x1="235" y1="530" x2="310" y2="550" stroke="#00F5FF" strokeWidth="1.5" strokeDasharray="4 4" opacity="0.6" />
              <line x1="230" y1="590" x2="300" y2="610" stroke="#00F5FF" strokeWidth="1.5" strokeDasharray="4 4" opacity="0.6" />
            </>
          )}

          {/* Trigger Guard */}
          <path d="M 340 380 C 340 460, 440 470, 450 380" fill="none" stroke="#00F5FF" strokeWidth="3.5" />

          {/* Trigger */}
          <g transform={`rotate(${triggerAngle}, 390, 370)`}>
            <path
              d="M 385 370 C 380 405, 400 425, 410 435 C 405 415, 395 400, 395 370 Z"
              fill="#00F5FF"
              opacity="0.8"
            />
          </g>

          {/* Magazine Assembly (Detaches down in Exploded View) */}
          <g transform={`translate(0, ${magExplodeY})`}>
            {/* Magazine casing */}
            <rect
              x="250"
              y="440"
              width="68"
              height="200"
              rx="6"
              fill={xRayReveal > 0.5 ? "rgba(2, 132, 199, 0.2)" : "#0F172A"}
              stroke="#00F5FF"
              strokeWidth="2"
              strokeDasharray={explodeFactor > 0.2 ? "none" : "4 4"}
            />
            {/* Magazine Cartridges stacked inside */}
            {[470, 520, 570].map((yPos, i) => (
              <g key={i} transform={`translate(254, ${yPos})`}>
                <rect x="0" y="0" width="40" height="20" rx="3" fill="#F59E0B" stroke="#B45309" strokeWidth="1" />
                <path d="M 40 0 L 56 6 L 56 14 L 40 20 Z" fill="#EA580C" />
              </g>
            ))}
            {/* Magazine Follower Spring */}
            <path d="M 260 600 L 305 610 L 260 620 L 305 630" fill="none" stroke="#00F5FF" strokeWidth="2.5" />

            {/* Exploded Callout Tag for Magazine */}
            {explodeFactor > 0.5 && (
              <g transform="translate(140, 560)">
                <line x1="0" y1="0" x2="105" y2="0" stroke="#00F5FF" strokeWidth="2" strokeDasharray="3 3" />
                <rect x="-120" y="-18" width="120" height="36" rx="6" fill="rgba(15, 23, 42, 0.9)" stroke="#00F5FF" strokeWidth="1.5" />
                <text x="-60" y="5" textAnchor="middle" fill="#00F5FF" fontSize="13" fontWeight="800">HỘP TIẾP ĐẠN</text>
              </g>
            )}
          </g>
        </g>

        {/* ========================================================
            2. RECOIL SPRING (Tách rời bay xuống dưới)
            ======================================================== */}
        <g id="xray-recoil-spring" transform={`translate(0, ${springExplodeY})`}>
          <rect x="440" y="328" width="220" height="8" rx="2" fill="#00F5FF" opacity="0.6" />
          {Array.from({ length: 14 }).map((_, i) => {
            const normalSpacing = 14;
            const compressedSpacing = interpolate(
              slideRecoilX,
              [-110, 0],
              [7, normalSpacing],
              { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
            );
            const x = 450 + i * (explodeFactor > 0.2 ? 15 : compressedSpacing);
            return (
              <line
                key={i}
                x1={x}
                y1="322"
                x2={x + 6}
                y2="342"
                stroke="#00F5FF"
                strokeWidth="4"
                strokeLinecap="round"
                opacity={holoGlow}
              />
            );
          })}

          {explodeFactor > 0.5 && (
            <g transform="translate(710, 335)">
              <line x1="0" y1="0" x2="-45" y2="0" stroke="#00F5FF" strokeWidth="2" strokeDasharray="3 3" />
              <rect x="0" y="-18" width="130" height="36" rx="6" fill="rgba(15, 23, 42, 0.9)" stroke="#00F5FF" strokeWidth="1.5" />
              <text x="65" y="5" textAnchor="middle" fill="#00F5FF" fontSize="13" fontWeight="800">LÒ XO HỒI VỊ</text>
            </g>
          )}
        </g>

        {/* ========================================================
            3. BARREL & CHAMBER (Nòng súng & Buồng đạn tách rời)
            ======================================================== */}
        <g id="xray-barrel" transform={`translate(${barrelExplodeX}, ${barrelExplodeY})`}>
          {/* Barrel Body */}
          <rect
            x="370"
            y="275"
            width="380"
            height="46"
            rx="4"
            fill="url(#holoBarrel)"
            stroke="#00F5FF"
            strokeWidth="2.5"
            opacity={holoGlow}
          />
          {/* Inner Rifling Bore */}
          <rect x="450" y="285" width="295" height="26" fill="#021424" stroke="#00F5FF" strokeWidth="1.5" />
          {/* Rifling spirals */}
          <line x1="460" y1="290" x2="540" y2="306" stroke="#00F5FF" strokeWidth="2" opacity="0.6" />
          <line x1="550" y1="290" x2="630" y2="306" stroke="#00F5FF" strokeWidth="2" opacity="0.6" />
          <line x1="640" y1="290" x2="720" y2="306" stroke="#00F5FF" strokeWidth="2" opacity="0.6" />

          {/* Chamber */}
          <rect x="380" y="283" width="75" height="30" fill="#0B2545" stroke="#38BDF8" strokeWidth="2" />

          {/* Active Cartridge inside chamber */}
          {bulletProgress < 1.8 && (
            <g id="xray-cartridge">
              <rect x="384" y="286" width="38" height="24" rx="3" fill="#F59E0B" stroke="#B45309" strokeWidth="1.5" />
              <circle cx="386" cy="298" r="4" fill="#EF4444" />

              {/* Bullet Head flying out */}
              <g transform={`translate(${bulletProgress > 0 ? bulletProgress * 320 : 0}, 0)`}>
                <path d="M 422 287 L 444 292 Q 452 298 444 304 L 422 309 Z" fill="#EA580C" stroke="#7C2D12" strokeWidth="1" />
                {bulletProgress > 0.1 && (
                  <line x1="410" y1="298" x2="380" y2="298" stroke="#00F5FF" strokeWidth="4" strokeDasharray="4 2" />
                )}
              </g>
            </g>
          )}

          {/* Plasma Explosion */}
          {explosionOpacity > 0 && (
            <g transform={`translate(400, 298) scale(${explosionScale})`} opacity={explosionOpacity}>
              <circle cx="0" cy="0" r="50" fill="url(#plasmaExplosion)" />
            </g>
          )}

          {explodeFactor > 0.5 && (
            <g transform="translate(800, 290)">
              <line x1="0" y1="0" x2="-45" y2="0" stroke="#00F5FF" strokeWidth="2" strokeDasharray="3 3" />
              <rect x="0" y="-18" width="140" height="36" rx="6" fill="rgba(15, 23, 42, 0.9)" stroke="#00F5FF" strokeWidth="1.5" />
              <text x="70" y="5" textAnchor="middle" fill="#00F5FF" fontSize="13" fontWeight="800">NÒNG & BUỒNG ĐẠN</text>
            </g>
          )}
        </g>

        {/* Ejected Spent Casing */}
        {casingOpacity > 0 && (
          <g
            transform={`translate(${390 + casingEjectX}, ${270 + casingEjectY}) rotate(${casingRotate}, 18, 12)`}
            opacity={casingOpacity}
          >
            <rect x="0" y="0" width="36" height="20" rx="2" fill="#F59E0B" stroke="#00F5FF" strokeWidth="2" />
            <ellipse cx="36" cy="10" rx="3" ry="10" fill="#021424" />
          </g>
        )}

        {/* ========================================================
            4. SLIDE (Nắp trượt bốc tách nhấc bổng lên cao)
            ======================================================== */}
        <g
          id="xray-slide"
          transform={`translate(${slideRecoilX}, ${slideExplodeY}) rotate(${slideExplodeRot}, 480, 280)`}
        >
          {/* Slide Body */}
          <path
            d="M 220 250 L 760 250 L 760 330 L 670 330 L 660 345 L 420 345 L 420 280 L 380 280 L 370 330 L 220 330 Z"
            fill={xRayReveal > 0.5 ? "url(#holoSlide)" : "#334155"}
            stroke="#00F5FF"
            strokeWidth="3"
            opacity={xRayReveal > 0.5 ? holoGlow : 1}
          />

          {/* Slide Serrations */}
          <line x1="235" y1="260" x2="235" y2="315" stroke="#00F5FF" strokeWidth="3" opacity="0.7" />
          <line x1="245" y1="260" x2="245" y2="315" stroke="#00F5FF" strokeWidth="3" opacity="0.7" />
          <line x1="255" y1="260" x2="255" y2="315" stroke="#00F5FF" strokeWidth="3" opacity="0.7" />

          {/* Sights */}
          <rect x="745" y="240" width="8" height="10" fill="#00F5FF" />
          <rect x="230" y="240" width="12" height="10" fill="#00F5FF" />

          {/* Striker Channel */}
          <rect x="280" y="292" width="100" height="12" fill="#021424" stroke="#00F5FF" strokeWidth="1.5" />

          {/* Striker / Firing Pin (Tách rời lùi về sau trong exploded view) */}
          <g transform={`translate(${pinStrikeX + strikerExplodeX}, ${strikerExplodeY})`}>
            <rect x="290" y="294" width="70" height="8" rx="2" fill="#EF4444" stroke="#FFF" strokeWidth="1" />
            <polygon points="360,295 375,298 360,301" fill="#FEF08A" />
            <line x1="285" y1="298" x2="310" y2="298" stroke="#00F5FF" strokeWidth="2.5" strokeDasharray="2 2" />

            {explodeFactor > 0.5 && (
              <g transform="translate(190, 275)">
                <line x1="0" y1="0" x2="95" y2="0" stroke="#00F5FF" strokeWidth="2" strokeDasharray="3 3" />
                <rect x="-110" y="-18" width="110" height="36" rx="6" fill="rgba(15, 23, 42, 0.9)" stroke="#00F5FF" strokeWidth="1.5" />
                <text x="-55" y="5" textAnchor="middle" fill="#00F5FF" fontSize="13" fontWeight="800">KIM HỎA</text>
              </g>
            )}
          </g>

          {/* Exploded Callout Tag for Slide */}
          {explodeFactor > 0.5 && (
            <g transform="translate(480, 190)">
              <line x1="0" y1="0" x2="0" y2="55" stroke="#00F5FF" strokeWidth="2" strokeDasharray="3 3" />
              <rect x="-70" y="-36" width="140" height="36" rx="6" fill="rgba(15, 23, 42, 0.9)" stroke="#00F5FF" strokeWidth="1.5" />
              <text x="0" y="-13" textAnchor="middle" fill="#00F5FF" fontSize="13" fontWeight="800">NẮP TRƯỢT (SLIDE)</text>
            </g>
          )}
        </g>
      </svg>
    </div>
  );
};
