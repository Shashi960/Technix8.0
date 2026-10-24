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
  priority = false,
  progress = 100,
  mode = "hero",
}: MarvelTechnixBrandingProps) {
  return (
    <div
      className={`relative flex flex-col items-center w-full select-none ${className}`}
    >
      {/* Primary TECHNIX 8.0 Graffiti Display Wordmark */}
      <div className="w-full flex justify-center mb-3 sm:mb-4">
        <TechnixGraffitiLogo
          mode={mode}
          progress={progress}
          glow={glow}
          className="w-full max-w-[480px] sm:max-w-[620px] md:max-w-[720px] lg:max-w-[780px] h-auto drop-shadow-[0_20px_50px_rgba(0,0,0,0.95)]"
        />
      </div>

      {/* TECHNIX × MARVEL Crossover Lockup */}
      <div className="flex items-center justify-center gap-2.5 sm:gap-3 mb-5 sm:mb-7">
        {/* Cinematic Crossover Glyph ✕ */}
        <span
          className="font-heading text-base sm:text-xl font-black text-red-500 drop-shadow-[0_0_12px_#EF4444] select-none"
          aria-hidden="true"
        >
          ✕
        </span>

        {/* Authentic Official Marvel Red Box Logo */}
        <div className="relative w-28 sm:w-36 aspect-[2.22/1] rounded overflow-hidden shadow-[0_0_25px_rgba(226,54,54,0.65)] ring-1 ring-red-500/40">
          <Image
            src="/images/marvel-official-logo.png"
            alt="MARVEL"
            fill
            priority={priority}
            unoptimized
            className="object-cover"
          />
        </div>
      </div>
    </div>
  );
}
