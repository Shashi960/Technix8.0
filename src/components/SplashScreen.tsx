"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import TechnixGraffitiLogo from "./TechnixGraffitiLogo";
import SpiderManEntrance from "./SpiderManEntrance";

interface SplashScreenProps {
  onComplete?: () => void;
  speedMs?: number;
  showLoadingBar?: boolean;
  subtitle?: string;
}

export default function SplashScreen({
  onComplete,
  speedMs = 3400, // Cinematic duration so Spider-Man is fully visible
  showLoadingBar = false,
  subtitle,
}: SplashScreenProps) {
  const [progress, setProgress] = useState(0);
  const [isFinishing, setIsFinishing] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const startTime = Date.now();
    let animationFrameId: number;

    const updateProgress = () => {
      const elapsed = Date.now() - startTime;
      const rawProgress = Math.min(1.0, elapsed / speedMs);

      // Fast, smooth, punchy fill curve
      const eased = Math.min(100, Math.floor(Math.pow(rawProgress, 1.2) * 100));
      setProgress(eased);

      if (rawProgress < 1.0) {
        animationFrameId = requestAnimationFrame(updateProgress);
      } else {
        setProgress(100);
        setTimeout(() => {
          setIsFinishing(true);
          setTimeout(() => {
            setIsVisible(false);
            if (onComplete) onComplete();
          }, 350);
        }, 150);
      }
    };

    animationFrameId = requestAnimationFrame(updateProgress);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [speedMs, onComplete]);

  if (!isVisible) return null;

  return (
    <div
      className={`fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-[#05070E] transition-all duration-300 ease-out select-none px-4 ${isFinishing
        ? "opacity-0 scale-105 pointer-events-none"
        : "opacity-100 scale-100"
        }`}
      aria-label="Marvel X Technix 8.0 Loading"
      role="status"
    >
      {/* Cinematic Marvel Red & Arc Ambient Halo */}
      <div className="absolute w-[650px] h-[650px] rounded-full bg-red-600/20 blur-[150px] pointer-events-none" />
      <div className="absolute -bottom-20 w-[500px] h-[500px] rounded-full bg-pink-600/20 blur-[130px] pointer-events-none" />

      {/* Spider-Man Hanging & Waving Entrance Animation (Above background, behind title if overlap) */}
      <SpiderManEntrance />

      {/* Main Crossover Ensemble: BIG MARVEL  ✕  TECHNIX 8.0 */}
      <div className="relative z-10 flex flex-col items-center justify-center max-w-3xl w-full">
        {/* 1. BIG Official Marvel Red Banner Logo with Character Lineup */}

        {/* Marvel logo — fill the wide banner */}
        <div className="relative w-full max-w-[1100px] h-28 sm:h-40 md:h-52 lg:h-60 mb-2 sm:mb-4 shadow-[0_0_50px_rgba(226,54,54,0.35)] rounded-md overflow-hidden animate-in fade-in zoom-in-95 duration-500">
          <Image
            src="/images/marvel-logo.png"
            alt="MARVEL"
            fill
            priority
            sizes="(max-width: 640px) 100vw, 1100px"
            className="object-contain"
          />
        </div>


        {/* 2. Bold Glowing Crossover Glyphs "✕" */}
        <div className="flex items-center gap-4 my-2 sm:my-3">
          <div className="h-[2px] w-16 sm:w-28 md:w-36 bg-gradient-to-r from-transparent via-red-500/80 to-transparent" />
          <span className="font-heading text-2xl sm:text-3xl md:text-4xl font-black text-red-500 drop-shadow-[0_0_16px_#EF4444]">
            ✕
          </span>
          <div className="h-[2px] w-16 sm:w-28 md:w-36 bg-gradient-to-r from-transparent via-red-500/80 to-transparent" />
        </div>

        {/* 3. High-Visibility, Bold TECHNIX 8.0 Logo with Dynamic Color Filling */}
        <div className="w-full flex justify-center py-2">
          <TechnixGraffitiLogo
            progress={progress}
            mode="fill-progress"
            className="w-full max-w-[420px] sm:max-w-[560px] md:max-w-[680px] h-auto drop-shadow-[0_15px_40px_rgba(255,30,130,0.4)]"
          />
        </div>

        {/* Optional Subtitle (e.g. When navigating between events) */}
        {subtitle && (
          <p className="font-mono-code text-xs sm:text-sm tracking-[0.25em] text-pink-400 uppercase mt-4 animate-pulse">
            {subtitle}
          </p>
        )}

        {/* Loading bar only if explicitly requested */}
        {showLoadingBar && (
          <div className="mt-6 flex flex-col items-center gap-2">
            <div className="w-56 h-[3px] bg-slate-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-red-600 via-pink-500 to-rose-400"
                style={{ width: `${progress}%` }}
              />
            </div>
            <span className="font-mono-code text-xs text-pink-400">
              {progress}%
            </span>
          </div>
        )}
      </div>

      {/* Cinematic Multiverse Tagline */}
      <div className="absolute bottom-6 text-center">
        <span className="font-mono-code text-[11px] sm:text-xs tracking-[0.35em] text-slate-400 uppercase font-semibold">
          MARVEL CINEMATIC EXPERIENCE • TECHNIX 8.0
        </span>
      </div>
    </div>
  );
}
