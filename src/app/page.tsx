"use client";

import React, { useState } from "react";
import SplashScreen from "@/components/SplashScreen";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";

export default function Home() {
  const [showSplash, setShowSplash] = useState(true);
  const [splashKey, setSplashKey] = useState(0);

  const handleReplaySplash = () => {
    setSplashKey((prev) => prev + 1);
    setShowSplash(true);
  };

  return (
    <div className="relative min-h-screen bg-[#04060C] text-slate-100 flex flex-col selection:bg-pink-600 selection:text-white overflow-hidden">
      {/* Starting Flash Screen with Cinematic Timing & Dynamic Color Filling */}
      {showSplash && (
        <SplashScreen
          key={splashKey}
          onComplete={() => setShowSplash(false)}
          speedMs={3400} // Slower cinematic timing so Spider-Man's entrance & wave are fully visible
          showLoadingBar={false}
        />
      )}

      {/* Sticky Navigation (Falak 26 Header Style) */}
      <Navbar onReplaySplash={handleReplaySplash} />

      {/* Pure Falak-Style Hero Screen (Standalone, no clutter below) */}
      <main className="flex-1 flex flex-col">
        <HeroSection onReplaySplash={handleReplaySplash} />
      </main>
    </div>
  );
}
