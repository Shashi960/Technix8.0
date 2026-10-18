"use client";

import React from "react";
import Image from "next/image";
import MarvelTechnixBranding from "./MarvelTechnixBranding";
import ParticleCanvas from "./ParticleCanvas";
import { usePageTransition } from "./PageTransitionContext";
import { Compass, Shield, Play } from "lucide-react";

interface HeroSectionProps {
  onReplaySplash?: () => void;
  isSplashActive?: boolean;
}

export default function HeroSection({
  onReplaySplash,
  isSplashActive = false,
}: HeroSectionProps) {
  const { navigateTo } = usePageTransition();

  const handleOpenEvents = (e: React.MouseEvent) => {
    e.preventDefault();
    navigateTo("/events", "OPENING EVENTS ARENA...");
  };

  const handleOpenPasses = (e: React.MouseEvent) => {
    e.preventDefault();
    navigateTo("/passes", "OPENING PASSES & REGISTRATION...");
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-between pt-24 pb-10 sm:pt-28 sm:pb-14 px-4 overflow-hidden bg-[#04060C]"
    >
      {/* Marvel Convergence Dimensional Arena Background */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hero/marvel-convergence-hero.jpg"
          alt="Marvel Multiverse Convergence Technix 8.0"
          fill
          priority
          unoptimized
          className="object-cover object-center select-none scale-100 transition-transform duration-1000"
        />

        {/* Cinematic Vignettes: Transparent Center to Highlight Cosmic Rift */}
        {/* 1. Top Header Shade for Crystal-Clear Navbar Navigation */}
        <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-[#04060C] via-[#04060C]/65 to-transparent pointer-events-none" />

        {/* 2. Soft Radial Center Vignette for Typography Separation */}
        <div className="absolute inset-0 bg-radial from-transparent via-[#04060C]/15 to-[#04060C]/60 pointer-events-none" />

        {/* 3. Bottom Horizon Shade for Smooth Action Controls Blend */}
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#04060C] via-[#04060C]/75 to-transparent pointer-events-none" />
      </div>

      {/* Floating Stardust & Cosmic Embers */}
      <ParticleCanvas />

      {/* Hero Content Container (Framed in the Center Space Rift) */}
      <div className="relative z-20 max-w-5xl mx-auto flex flex-col items-center text-center my-auto pt-4 sm:pt-8 w-full">
        {/* FLIP Destination Anchor: MARVEL × TECHNIX 8.0 Branding */}
        <div
          id="hero-branding-target"
          className={`w-full flex justify-center transition-opacity duration-300 ${isSplashActive
            ? "opacity-0 pointer-events-none select-none"
            : "opacity-100"
            }`}
        >
          <MarvelTechnixBranding priority />
        </div>

        {/* Primary Subtitle: "The Convergence Is Here." */}
        <h2 className="font-sans text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold tracking-wide text-white mb-2 drop-shadow-[0_4px_20px_rgba(0,0,0,0.95)]">
          The Convergence Is Here.
        </h2>

        {/* Fest Dates */}
        <p className="font-mono-code text-xs sm:text-sm tracking-[0.3em] uppercase text-amber-200/90 font-medium mb-5 sm:mb-7 drop-shadow-[0_2px_10px_rgba(0,0,0,0.9)]">
          OCTOBER 12 – 18, 2026
        </p>

        {/* Center Neon Pill Badge */}
        <div className="inline-flex items-center justify-center mb-7 sm:mb-9">
          <button
            onClick={handleOpenEvents}
            className="group relative inline-flex items-center gap-2.5 px-6 sm:px-8 py-2 sm:py-2.5 rounded-full border border-pink-500/80 bg-black/60 hover:bg-pink-950/50 text-pink-300 hover:text-white font-mono-code text-xs sm:text-sm font-semibold tracking-[0.25em] uppercase transition-all duration-300 shadow-[0_0_30px_rgba(255,30,130,0.45)] hover:shadow-[0_0_40px_rgba(255,30,130,0.7)] hover:scale-105 active:scale-95 cursor-pointer backdrop-blur-md"
          >
            <span className="w-2 h-2 rounded-full bg-pink-500 animate-ping" />
            <span>TECHNIX IS NOT LIVE</span>
          </button>
        </div>
      </div>

      {/* Sleek Bottom Bar with Fast Direct Links */}
      <div className="relative z-20 flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-[11px] font-mono-code text-slate-300 uppercase tracking-widest mt-4">
        <button
          onClick={() => navigateTo("/cultural", "OPENING CULTURAL ARENA...")}
          className="hover:text-amber-400 transition-colors cursor-pointer drop-shadow"
        >
          [ CULTURAL SHOWDOWNS ]
        </button>
        <button
          onClick={() => navigateTo("/sports", "OPENING SPORTS ARENA...")}
          className="hover:text-amber-400 transition-colors cursor-pointer drop-shadow"
        >
          [ SPORTS & ESPORTS ]
        </button>
        <button
          onClick={() => navigateTo("/schedule", "OPENING SCHEDULE...")}
          className="hover:text-amber-400 transition-colors cursor-pointer drop-shadow"
        >
          [ FEST SCHEDULE ]
        </button>
      </div>
    </section >
  );
}
