"use client";

import React, { useId } from "react";

interface TechnixGraffitiLogoProps {
  progress?: number; // 0 to 100
  mode?: "fill-progress" | "hero" | "nav";
  className?: string;
  glow?: boolean;
}

export default function TechnixGraffitiLogo({
  progress = 100,
  mode = "hero",
  className = "w-full max-w-2xl h-auto",
  glow = true,
}: TechnixGraffitiLogoProps) {
  const uniqueId = useId().replace(/:/g, "_");
  const clipId = `tech-clip-${uniqueId}`;
  const glowId = `tech-glow-${uniqueId}`;

  const clampedProgress = Math.min(100, Math.max(0, progress));
  // Total height is 270. Fills from bottom (y=270) to top (y=0)
  const fillY = 270 - (clampedProgress / 100) * 270;

  // Render the typography texts
  const TypographyGroup = ({ fillStyle }: { fillStyle?: string }) => (
    <g
      id={`typo-${uniqueId}`}
      style={{
        fontFamily: "var(--font-bangers), Impact, 'Arial Black', sans-serif",
      }}
      paintOrder="stroke fill"
    >
      {/* ROW 1: "TECHNIX" */}
      <text
        x="50%"
        y="125"
        textAnchor="middle"
        fontSize="130"
        fontWeight="900"
        letterSpacing="6"
        stroke="#060913"
        strokeWidth="10"
        strokeLinejoin="round"
        fill={fillStyle || "currentColor"}
      >
        TECHNIX
      </text>

      {/* ROW 2: "8.0" (Centered below TECHNIX) */}
      <text
        x="50%"
        y="245"
        textAnchor="middle"
        fontSize="115"
        fontWeight="900"
        letterSpacing="8"
        stroke="#060913"
        strokeWidth="10"
        strokeLinejoin="round"
        fill={fillStyle || "currentColor"}
      >
        8.0
      </text>
    </g>
  );

  // HERO MODE: Solid Brilliant White with clean outline & dual Tech-Cyan / Mystic-Violet convergence glow
  if (mode === "hero") {
    return (
      <svg
        viewBox="0 0 680 270"
        className={className}
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <filter id={glowId} x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="8" stdDeviation="14" floodColor="#000000" floodOpacity="0.95" />
            <feDropShadow dx="0" dy="0" stdDeviation="10" floodColor="#38BDF8" floodOpacity="0.5" />
            <feDropShadow dx="0" dy="0" stdDeviation="22" floodColor="#A855F7" floodOpacity="0.4" />
          </filter>
        </defs>
        <g filter={`url(#${glowId})`}>
          <TypographyGroup fillStyle="#FFFFFF" />
        </g>
      </svg>
    );
  }

  // NAV MODE: Crisp compact
  if (mode === "nav") {
    return (
      <svg
        viewBox="0 0 680 270"
        className={className}
        xmlns="http://www.w3.org/2000/svg"
      >
        <TypographyGroup fillStyle="#FFFFFF" />
      </svg>
    );
  }

  // DYNAMIC FILL PROGRESS MODE:
  // Base concrete grey underneath, filled with neon hot pink from bottom to top!
  return (
    <div className="relative inline-block w-full">
      <svg
        viewBox="0 0 680 270"
        className={className}
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Dynamic rising clip rect */}
          <clipPath id={clipId}>
            <rect
              x="0"
              y={fillY}
              width="680"
              height={270 - fillY + 10}
              className="transition-[y,height] duration-100 ease-out"
            />
          </clipPath>

          {/* Liquid gradient fill in neon hot pink */}
          <linearGradient id={`pinkGrad-${uniqueId}`} x1="0%" y1="100%" x2="0%" y2="0%">
            <stop offset="0%" stopColor="#E60067" />
            <stop offset="60%" stopColor="#FF1E82" />
            <stop offset="100%" stopColor="#FF4F9E" />
          </linearGradient>

          {/* Grey base unfilled */}
          <linearGradient id={`greyGrad-${uniqueId}`} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#E2E8F0" />
            <stop offset="100%" stopColor="#94A3B8" />
          </linearGradient>

          {/* Glow for waterline */}
          <filter id={glowId} x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="0" stdDeviation="6" floodColor="#FF1E82" floodOpacity="0.9" />
          </filter>
        </defs>

        {/* 1. Base Unfilled Concrete Grey Layer */}
        <TypographyGroup fillStyle={`url(#greyGrad-${uniqueId})`} />

        {/* 2. Vibrant Hot Pink Filled Layer (Clipped to current progress) */}
        <g clipPath={`url(#${clipId})`}>
          <TypographyGroup fillStyle={`url(#pinkGrad-${uniqueId})`} />
        </g>

        {/* 3. Horizontal Liquid Waterline Edge */}
        {clampedProgress > 2 && clampedProgress < 98 && (
          <line
            x1="40"
            y1={fillY}
            x2="640"
            y2={fillY}
            stroke="#FFFFFF"
            strokeWidth="3"
            strokeOpacity="0.9"
            filter={glow ? `url(#${glowId})` : undefined}
            className="transition-[y1,y2] duration-100 ease-out"
          />
        )}
      </svg>
    </div>
  );
}
