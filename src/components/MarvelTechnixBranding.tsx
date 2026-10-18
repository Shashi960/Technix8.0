"use client";

import React from "react";
import Image from "next/image";
import TechnixGraffitiLogo from "./TechnixGraffitiLogo";

interface MarvelTechnixBrandingProps {
  className?: string;
  glow?: boolean;
  showSheen?: boolean;
  priority?: boolean;
  progress?: number;
  mode?: "fill-progress" | "hero" | "nav";
}

export default function MarvelTechnixBranding({
  className = "",
  glow = true,
  showSheen = false,
  priority = false,
  progress = 100,
  mode = "hero",
}: MarvelTechnixBrandingProps) {
  return (
    <div
      className={`relative flex flex-col items-center w-full select-none ${className}`}
    >
      {/* Marvel Crossover Top Lockup */}
      <div className="flex items-center justify-center gap-2.5 sm:gap-3 mb-3 sm:mb-4">
        {/* Authentic Official Marvel Red Box Logo */}
        <div className="relative w-32 sm:w-40 aspect-[2.22/1] rounded overflow-hidden shadow-[0_0_25px_rgba(226,54,54,0.65)] ring-1 ring-red-500/40">
          <Image
            src="/images/marvel-official-logo.png"
            alt="MARVEL"
            fill
            priority={priority}
            unoptimized
            className="object-cover"
          />
        </div>

        {/* Cinematic Crossover Glyph ✕ */}
        <span
          className="font-heading text-base sm:text-xl font-black text-red-500 drop-shadow-[0_0_12px_#EF4444] select-none"
          aria-hidden="true"
        >
          ✕
        </span>
      </div>

      {/* Primary TECHNIX 8.0 Graffiti Display Wordmark */}
      <div className="w-full flex justify-center mb-5 sm:mb-7">
        <TechnixGraffitiLogo
          mode={mode}
          progress={progress}
          glow={glow}
          className="w-full max-w-[480px] sm:max-w-[620px] md:max-w-[720px] lg:max-w-[780px] h-auto drop-shadow-[0_20px_50px_rgba(0,0,0,0.95)]"
        />
      </div>

      {/* Cinematic Theatrical Light Sheen Effect */}
      {showSheen && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-2xl z-30">
          <div
            className="absolute inset-y-0 w-1/3 bg-gradient-to-r from-transparent via-white/25 to-transparent skew-x-[-25deg] filter blur-sm"
            style={{
              animation: "marvelSheenSweep 1.1s cubic-bezier(0.4, 0, 0.2, 1) forwards",
            }}
          />
          <style jsx>{`
            @keyframes marvelSheenSweep {
              0% {
                transform: translateX(-150%) skewX(-25deg);
                opacity: 0;
              }
              25% {
                opacity: 0.8;
              }
              75% {
                opacity: 0.8;
              }
              100% {
                transform: translateX(350%) skewX(-25deg);
                opacity: 0;
              }
            }
          `}</style>
        </div>
      )}
    </div>
  );
}
