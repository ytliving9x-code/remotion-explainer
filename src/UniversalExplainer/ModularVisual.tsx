import React from "react";
import { interpolate, useCurrentFrame } from "remotion";
import { UniversalSegment, UniversalTheme } from "./types";

interface ModularVisualProps {
  activeSegment: UniversalSegment | null;
  theme: UniversalTheme;
  isOutro?: boolean;
}

export const ModularVisual: React.FC<ModularVisualProps> = ({
  activeSegment,
  theme,
  isOutro = false,
}) => {
  const frame = useCurrentFrame();
  const iconType = activeSegment?.icon || "generic";
  const accent = theme.accentColor || "#06B6D4";
  const secondary = theme.secondaryColor || "#3B82F6";

  // Rotation angles
  const rotFast = (frame * 12) % 360;
  const rotSlow = (frame * 3) % 360;
  const pulseScale = interpolate(Math.sin((frame / 15) * Math.PI), [-1, 1], [0.96, 1.04]);

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
          filter: "drop-shadow(0 20px 40px rgba(0,0,0,0.8))",
        }}
      >
        <defs>
          <pattern id="universalGrid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path
              d="M 40 0 L 0 0 0 40"
              fill="none"
              stroke="rgba(255, 255, 255, 0.05)"
              strokeWidth="1"
            />
          </pattern>

          <radialGradient id="centerGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor={accent} stopOpacity="0.4" />
            <stop offset="60%" stopColor={secondary} stopOpacity="0.15" />
            <stop offset="100%" stopColor="transparent" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Backdrop Grid & Circles */}
        <circle cx="500" cy="400" r="360" fill="url(#universalGrid)" />
        <circle cx="500" cy="400" r="360" fill="url(#centerGlow)" />
        <circle
          cx="500"
          cy="400"
          r="360"
          stroke={`${accent}30`}
          strokeWidth="2"
          strokeDasharray="8 8"
        />

        {/* Orbiting Tech Ring */}
        <g transform={`rotate(${rotSlow}, 500, 400)`}>
          <circle cx="500" cy="400" r="320" stroke={`${secondary}40`} strokeWidth="1.5" />
          <circle cx="500" cy="80" r="6" fill={accent} />
          <circle cx="500" cy="720" r="6" fill={accent} />
          <circle cx="180" cy="400" r="6" fill={secondary} />
          <circle cx="820" cy="400" r="6" fill={secondary} />
        </g>

        {/* ========================================================
            MODULAR VISUAL GRAPHIC ENGINES
            ======================================================== */}

        {/* 1. FAN / TURBINE BLADES */}
        {iconType === "fan" && (
          <g transform={`scale(${pulseScale})`} style={{ transformOrigin: "500px 400px" }}>
            {/* Suction Air Trail Arrows from Left */}
            {[-120, -40, 40, 120].map((yOff, i) => {
              const xOffset = ((frame * 16 + i * 80) % 360) - 180;
              return (
                <g key={i} transform={`translate(${200 + xOffset}, ${400 + yOff})`}>
                  <line x1="0" y1="0" x2="60" y2="0" stroke={accent} strokeWidth="3" opacity="0.7" />
                  <polygon points="60,-5 72,0 60,5" fill={accent} opacity="0.8" />
                </g>
              );
            })}

            {/* Turbine Cowling / Casing */}
            <circle cx="500" cy="400" r="220" stroke="#475569" strokeWidth="16" />
            <circle cx="500" cy="400" r="210" stroke={accent} strokeWidth="3" />

            {/* Rotating Blades */}
            <g transform={`rotate(${rotFast}, 500, 400)`}>
              {Array.from({ length: 12 }).map((_, i) => (
                <g key={i} transform={`rotate(${i * 30}, 500, 400)`}>
                  <path
                    d="M 500 400 C 510 320, 540 240, 525 200 C 515 200, 490 280, 500 400 Z"
                    fill={`url(#centerGlow)`}
                    stroke={accent}
                    strokeWidth="2.5"
                  />
                </g>
              ))}
            </g>

            {/* Central Spinner Cone */}
            <circle cx="500" cy="400" r="50" fill="#0F172A" stroke={accent} strokeWidth="4" />
            {/* Spiral Line on Cone */}
            <path
              d="M 500 370 Q 525 390 500 420 Q 480 435 500 445"
              fill="none"
              stroke="#FFF"
              strokeWidth="4"
              strokeLinecap="round"
              transform={`rotate(${rotFast * 2}, 500, 400)`}
            />
          </g>
        )}

        {/* 2. PRESSURE / COMPRESSION PISTON & GAUGE */}
        {iconType === "pressure" && (
          <g>
            {/* Pressure Chamber Body */}
            <rect
              x="320"
              y="220"
              width="360"
              height="360"
              rx="16"
              fill="#0F172A"
              stroke="#475569"
              strokeWidth="4"
            />

            {/* Moving Piston compressing down */}
            {(() => {
              const pistonY = interpolate(
                Math.sin((frame / 12) * Math.PI),
                [-1, 1],
                [250, 420]
              );
              return (
                <>
                  {/* Piston Rod */}
                  <rect x="475" y="140" width="50" height={pistonY - 140} fill="#64748B" />
                  {/* Piston Head */}
                  <rect
                    x="330"
                    y={pistonY}
                    width="340"
                    height="50"
                    rx="6"
                    fill={accent}
                    stroke="#FFF"
                    strokeWidth="3"
                  />
                  {/* High Density Gas Particles being compressed */}
                  {Array.from({ length: 24 }).map((_, i) => {
                    const px = 360 + (i % 6) * 50;
                    const py = pistonY + 65 + Math.floor(i / 6) * 25;
                    return (
                      <circle
                        key={i}
                        cx={px + Math.sin(frame + i) * 6}
                        cy={Math.min(540, py)}
                        r="6"
                        fill="#EF4444"
                        opacity="0.85"
                      />
                    );
                  })}
                </>
              );
            })()}

            {/* Pressure Gauge Dial on Right */}
            <g transform="translate(740, 360)">
              <circle cx="0" cy="0" r="65" fill="#0F172A" stroke="#475569" strokeWidth="4" />
              <circle cx="0" cy="0" r="55" stroke={accent} strokeWidth="2" strokeDasharray="4 4" />
              {/* Needle rotating into RED zone */}
              {(() => {
                const needleAngle = interpolate(
                  Math.sin((frame / 12) * Math.PI),
                  [-1, 1],
                  [-60, 95]
                );
                return (
                  <g transform={`rotate(${needleAngle})`}>
                    <line x1="0" y1="0" x2="48" y2="0" stroke="#EF4444" strokeWidth="4" />
                    <circle cx="0" cy="0" r="6" fill="#FFF" />
                  </g>
                );
              })()}
              <text
                x="0"
                y="35"
                textAnchor="middle"
                fill="#FDE047"
                fontSize="12"
                fontWeight="800"
              >
                PSI HIGH
              </text>
            </g>
          </g>
        )}

        {/* 3. FIRE / COMBUSTION CHAMBER */}
        {iconType === "fire" && (
          <g transform={`scale(${pulseScale})`} style={{ transformOrigin: "500px 400px" }}>
            {/* Combustion Outer Glow Ring */}
            <circle cx="500" cy="400" r="180" fill="url(#centerGlow)" opacity="0.8" />

            {/* Swirling Fire Core */}
            {Array.from({ length: 8 }).map((_, i) => {
              const rot = ((frame * 8 + i * 45) % 360);
              const flameScale = 0.8 + Math.sin(frame * 0.3 + i) * 0.25;
              return (
                <g key={i} transform={`rotate(${rot}, 500, 400) scale(${flameScale})`}>
                  <path
                    d="M 500 400 C 470 330, 480 250, 500 200 C 520 250, 530 330, 500 400 Z"
                    fill={i % 2 === 0 ? "#F97316" : "#EF4444"}
                    opacity="0.7"
                  />
                </g>
              );
            })}

            {/* Intense White-Yellow Core */}
            <circle cx="500" cy="400" r="70" fill="#FEF08A" />
            <circle cx="500" cy="400" r="50" fill="#FFFFFF" />

            {/* Flying Spark Particles */}
            {Array.from({ length: 16 }).map((_, i) => {
              const dist = ((frame * 9 + i * 25) % 240) + 70;
              const angle = (i * 22.5 * Math.PI) / 180;
              const sx = 500 + Math.cos(angle) * dist;
              const sy = 400 + Math.sin(angle) * dist;
              return (
                <circle key={i} cx={sx} cy={sy} r="4" fill="#FDE047" opacity="0.8" />
              );
            })}
          </g>
        )}

        {/* 4. THRUST / SUPERSONIC EXHAUST */}
        {iconType === "thrust" && (
          <g>
            {/* Engine Nozzle on Left */}
            <path
              d="M 240 260 L 400 320 L 400 480 L 240 540 Z"
              fill="#1E293B"
              stroke="#64748B"
              strokeWidth="4"
            />
            {/* Nozzle Inner Lip */}
            <line x1="400" y1="320" x2="400" y2="480" stroke="#EF4444" strokeWidth="6" />

            {/* Blazing Jet Plume extending right */}
            <path
              d="M 400 330 Q 600 300 860 380 Q 880 400 860 420 Q 600 500 400 470 Z"
              fill="url(#centerGlow)"
              stroke={accent}
              strokeWidth="3"
            />

            {/* Mach Shock Diamonds in exhaust */}
            {[480, 580, 680, 780].map((xPos, i) => {
              const diamondSize = 35 - i * 5;
              const flicker = Math.sin(frame * 0.8 + i) * 4;
              return (
                <polygon
                  key={i}
                  points={`
                    ${xPos - diamondSize + flicker},400 
                    ${xPos},${400 - diamondSize - flicker} 
                    ${xPos + diamondSize - flicker},400 
                    ${xPos},${400 + diamondSize + flicker}
                  `}
                  fill="#FEF08A"
                  opacity="0.85"
                />
              );
            })}

            {/* High Speed Velocity Streaks */}
            {[-60, -20, 20, 60].map((offset, i) => (
              <line
                key={i}
                x1={450 + ((frame * 25 + i * 60) % 200)}
                y1={400 + offset}
                x2={650 + ((frame * 25 + i * 60) % 200)}
                y2={400 + offset}
                stroke="#FFF"
                strokeWidth="3"
                strokeDasharray="16 8"
                opacity="0.9"
              />
            ))}
          </g>
        )}

        {/* 5. GEARS / MECHANICAL TRANSMISSION */}
        {iconType === "gear" && (
          <g>
            {/* Large Driving Gear */}
            <g transform={`rotate(${rotFast / 2}, 420, 400)`}>
              <circle cx="420" cy="400" r="140" fill="#0F172A" stroke={accent} strokeWidth="8" />
              {Array.from({ length: 12 }).map((_, i) => (
                <rect
                  key={i}
                  x="410"
                  y="245"
                  width="20"
                  height="30"
                  rx="4"
                  fill={accent}
                  transform={`rotate(${i * 30}, 420, 400)`}
                />
              ))}
              <circle cx="420" cy="400" r="40" fill="#1E293B" stroke="#64748B" strokeWidth="4" />
            </g>

            {/* Small Driven Gear (Opposite rotation) */}
            <g transform={`rotate(${-rotFast}, 650, 400)`}>
              <circle cx="650" cy="400" r="80" fill="#0F172A" stroke={secondary} strokeWidth="6" />
              {Array.from({ length: 8 }).map((_, i) => (
                <rect
                  key={i}
                  x="642"
                  y="308"
                  width="16"
                  height="22"
                  rx="3"
                  fill={secondary}
                  transform={`rotate(${i * 45}, 650, 400)`}
                />
              ))}
              <circle cx="650" cy="400" r="25" fill="#1E293B" stroke="#64748B" strokeWidth="3" />
            </g>
          </g>
        )}

        {/* 6. HEAT COIL (CUỘN DÂY MAYSO NÓNG ĐỎ) */}
        {(iconType === "heat-coil" || iconType === "coil") && (
          <g>
            {/* Mica Ceramic Insulator Frame */}
            <rect
              x="250"
              y="320"
              width="500"
              height="160"
              rx="20"
              fill="#1E293B"
              stroke="#475569"
              strokeWidth="4"
              opacity="0.9"
            />
            <line
              x1="250"
              y1="400"
              x2="750"
              y2="400"
              stroke="#64748B"
              strokeWidth="6"
              strokeDasharray="16 16"
            />

            {/* Glowing Heating Coils (Spring loops) */}
            {Array.from({ length: 14 }).map((_, i) => {
              const xPos = 290 + i * 32;
              const heatIntensity = interpolate(
                Math.sin((frame / 8) * Math.PI + i * 0.4),
                [-1, 1],
                [0.75, 1.0]
              );
              const coilGlow = heatIntensity > 0.88 ? "#FEF08A" : "#EF4444";
              return (
                <g key={i}>
                  <ellipse
                    cx={xPos}
                    cy="400"
                    rx="14"
                    ry="60"
                    fill="none"
                    stroke={coilGlow}
                    strokeWidth={6 * heatIntensity}
                    opacity={heatIntensity}
                    style={{ filter: "drop-shadow(0 0 10px #F97316)" }}
                  />
                  {/* Heat Shimmer Waves */}
                  <path
                    d={`M ${xPos - 5} 330 Q ${xPos} 300 ${xPos - 5} 270 Q ${xPos} 240 ${xPos - 5} 210`}
                    fill="none"
                    stroke="#F97316"
                    strokeWidth="2.5"
                    opacity={((frame * 2 + i * 15) % 60) / 60}
                  />
                </g>
              );
            })}

            {/* Terminal Connectors (220V) */}
            <rect x="220" y="380" width="30" height="40" rx="4" fill="#94A3B8" />
            <rect x="750" y="380" width="30" height="40" rx="4" fill="#94A3B8" />
            <text
              x="500"
              y="270"
              textAnchor="middle"
              fill="#FEF08A"
              fontSize="20"
              fontWeight="900"
              letterSpacing="3"
            >
              ⚡ DÂY NIKEN-CROM NÓNG ĐỎ 800°C ⚡
            </text>
          </g>
        )}

        {/* 7. WIND THERMAL (ĐỐI LƯU KHÍ MÁT ➔ HƠI NÓNG) */}
        {(iconType === "wind-thermal" || iconType === "thermal") && (
          <g>
            {/* Center Mesh Barrier */}
            <line
              x1="500"
              y1="200"
              x2="500"
              y2="600"
              stroke="#EF4444"
              strokeWidth="8"
              strokeDasharray="12 12"
            />
            <rect x="490" y="190" width="20" height="420" rx="6" fill="#F97316" opacity="0.3" />

            {/* Left side: Cold ambient airflow (Cyan) */}
            {[-120, -60, 0, 60, 120].map((yOff, i) => {
              const xPos = 160 + ((frame * 18 + i * 65) % 300);
              return (
                <g key={i} transform={`translate(${xPos}, ${400 + yOff})`}>
                  <line
                    x1="0"
                    y1="0"
                    x2="80"
                    y2="0"
                    stroke="#38BDF8"
                    strokeWidth="5"
                    strokeLinecap="round"
                    opacity="0.85"
                  />
                  <polygon points="80,-6 96,0 80,6" fill="#38BDF8" />
                  <text x="30" y="-12" fill="#38BDF8" fontSize="13" fontWeight="800">
                    25°C
                  </text>
                </g>
              );
            })}

            {/* Right side: Blazing Hot Airflow (Red-Orange) */}
            {[-130, -70, -10, 50, 110, 170].map((yOff, i) => {
              const xPos = 520 + ((frame * 24 + i * 50) % 360);
              const waveY = Math.sin(frame * 0.2 + i) * 12;
              return (
                <g key={i} transform={`translate(${xPos}, ${400 + yOff + waveY})`}>
                  <path
                    d="M 0 0 Q 30 -10 60 0 T 120 0"
                    fill="none"
                    stroke="#EF4444"
                    strokeWidth="6"
                    strokeLinecap="round"
                    style={{ filter: "drop-shadow(0 0 8px #F97316)" }}
                  />
                  <polygon points="120,-7 138,0 120,7" fill="#FEF08A" />
                  <text x="40" y="-12" fill="#FEF08A" fontSize="14" fontWeight="900">
                    120°C 🔥
                  </text>
                </g>
              );
            })}
          </g>
        )}

        {/* 8. COMPLETE HAIR DRYER (MẶT CẮT TOÀN DIỆN CHIẾC MÁY SẤY TÓC) */}
        {(iconType === "blow-dry" ||
          iconType === "hair-dryer" ||
          iconType === "dryer") && (
          <g transform="translate(40, 20)">
            {/* Outer Ergonomic Body Casing (Chamber + Nozzle) */}
            <path
              d="
                M 260 300 
                L 620 320 
                L 720 340 
                L 720 460 
                L 620 480 
                L 440 480 
                L 410 660 
                L 330 650 
                L 350 480 
                L 260 480 
                Z
              "
              fill="#0F172A"
              stroke="#64748B"
              strokeWidth="5"
            />

            {/* Handle Grip & Switch */}
            <rect x="340" y="520" width="16" height="35" rx="4" fill="#EF4444" />
            <text x="370" y="542" fill="#FEF08A" fontSize="13" fontWeight="900">
              ON // MAX
            </text>

            {/* Rear Air Intake Grill (Left) */}
            <path d="M 260 310 L 260 470" stroke="#38BDF8" strokeWidth="8" strokeDasharray="6 6" />
            {/* Suction arrows behind */}
            {[-40, 0, 40].map((yOff, i) => {
              const xArr = 180 + ((frame * 12 + i * 30) % 60);
              return (
                <polygon
                  key={i}
                  points={`${xArr},${390 + yOff} ${xArr + 15},${390 + yOff - 6} ${xArr + 15},${390 + yOff + 6}`}
                  fill="#38BDF8"
                />
              );
            })}

            {/* Internal Mini Motor & Fan */}
            <rect
              x="290"
              y="350"
              width="50"
              height="80"
              rx="8"
              fill="#334155"
              stroke="#94A3B8"
              strokeWidth="3"
            />
            <g transform={`rotate(${rotFast * 2}, 315, 390)`}>
              <circle cx="315" cy="390" r="12" fill="#06B6D4" />
              <line x1="315" y1="365" x2="315" y2="415" stroke="#FFF" strokeWidth="4" />
              <line x1="290" y1="390" x2="340" y2="390" stroke="#FFF" strokeWidth="4" />
            </g>

            {/* Internal Mica Frame with Glowing Nichrome Wire */}
            <rect
              x="420"
              y="345"
              width="170"
              height="90"
              rx="8"
              fill="#1E1B4B"
              stroke="#F97316"
              strokeWidth="3"
            />
            {Array.from({ length: 6 }).map((_, i) => (
              <ellipse
                key={i}
                cx={445 + i * 24}
                cy="390"
                rx="8"
                ry="35"
                fill="none"
                stroke={Math.sin(frame * 0.4 + i) > 0 ? "#FEF08A" : "#EF4444"}
                strokeWidth="4"
                style={{ filter: "drop-shadow(0 0 8px #F97316)" }}
              />
            ))}

            {/* Concentrator Nozzle at front (Right) */}
            <rect
              x="700"
              y="345"
              width="25"
              height="110"
              rx="4"
              fill="#475569"
              stroke="#94A3B8"
              strokeWidth="3"
            />

            {/* Blast of Hot Air & Evaporating Water Droplets */}
            {[-35, -10, 15, 40].map((yOff, i) => {
              const xPos = 725 + ((frame * 25 + i * 50) % 220);
              return (
                <g key={i} transform={`translate(${xPos}, ${400 + yOff})`}>
                  <path
                    d="M 0 0 Q 30 -8 60 0"
                    fill="none"
                    stroke="#F97316"
                    strokeWidth="6"
                    strokeLinecap="round"
                  />
                  <polygon points="60,-5 72,0 60,5" fill="#FEF08A" />
                </g>
              );
            })}

            {/* Water Droplets Evaporating into Steam */}
            {[50, 90, 140, 180].map((dx, i) => {
              const evapProgress = ((frame * 3 + i * 20) % 100) / 100;
              return (
                <g
                  key={i}
                  transform={`translate(${740 + dx}, ${360 + (i % 2) * 60 - evapProgress * 40})`}
                  opacity={1 - evapProgress}
                >
                  <circle cx="0" cy="0" r={7 * (1 - evapProgress)} fill="#38BDF8" />
                  <path d="M -4 -8 Q 0 -16 4 -8" stroke="#E2E8F0" strokeWidth="2" fill="none" />
                </g>
              );
            })}

            <text
              x="490"
              y="280"
              textAnchor="middle"
              fill="#FEF08A"
              fontSize="18"
              fontWeight="900"
              letterSpacing="2"
            >
              MÁY SẤY TÓC // LÀM KHÔ SIÊU TỐC
            </text>
          </g>
        )}

        {/* 9. GENERIC / TECH CORE PULSE (Default Fallback) */}
        {(iconType === "generic" || isOutro) && (
          <g transform={`scale(${pulseScale})`} style={{ transformOrigin: "500px 400px" }}>
            <circle cx="500" cy="400" r="180" stroke={accent} strokeWidth="4" />
            <circle cx="500" cy="400" r="140" stroke={secondary} strokeWidth="3" strokeDasharray="12 6" />
            <circle cx="500" cy="400" r="90" fill="#0F172A" stroke={accent} strokeWidth="5" />
            <circle cx="500" cy="400" r="40" fill="#FFF" />
          </g>
        )}
      </svg>
    </div>
  );
};
