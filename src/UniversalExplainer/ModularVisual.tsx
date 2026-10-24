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

        {/* 6. GENERIC / TECH CORE PULSE (Default Fallback) */}
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
