"use client";

import React, { useEffect, useState } from "react";
import { festConfig } from "@/data/festConfig";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isExpired: boolean;
}

export default function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isExpired: false,
  });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const target = new Date(festConfig.eventDate).getTime();

    const calculate = () => {
      const now = new Date().getTime();
      const difference = target - now;

      if (difference <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0, isExpired: true });
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds, isExpired: false });
    };

    calculate();
    const interval = setInterval(calculate, 1000);
    return () => clearInterval(interval);
  }, []);

  if (!mounted) {
    return (
      <div className="flex items-center justify-center gap-3 sm:gap-4 py-2">
        {["DAYS", "HOURS", "MINS", "SECS"].map((label) => (
          <div
            key={label}
            className="flex flex-col items-center justify-center w-16 sm:w-20 md:w-24 h-18 sm:h-22 rounded-xl bg-slate-900/80 border border-red-900/40 p-2"
          >
            <span className="font-heading text-xl sm:text-2xl md:text-3xl font-bold text-slate-300">--</span>
            <span className="font-mono-code text-[10px] sm:text-xs text-slate-500 tracking-wider mt-1">{label}</span>
          </div>
        ))}
      </div>
    );
  }

  if (timeLeft.isExpired) {
    return (
      <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-red-950/60 border border-red-500/50 glow-red">
        <span className="relative flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
        </span>
        <span className="font-heading font-bold text-red-100 tracking-wider text-sm sm:text-base">
          THE ASSEMBLY HAS BEGUN // PROTOCOL ACTIVE
        </span>
      </div>
    );
  }

  const timeUnits = [
    { label: "DAYS", value: String(timeLeft.days).padStart(2, "0"), color: "text-white" },
    { label: "HOURS", value: String(timeLeft.hours).padStart(2, "0"), color: "text-red-400" },
    { label: "MINS", value: String(timeLeft.minutes).padStart(2, "0"), color: "text-amber-400" },
    { label: "SECS", value: String(timeLeft.seconds).padStart(2, "0"), color: "text-cyan-400" },
  ];

  return (
    <div className="flex flex-col items-center">
      <div className="flex items-center gap-2 sm:gap-4">
        {timeUnits.map((unit, index) => (
          <React.Fragment key={unit.label}>
            <div className="group relative flex flex-col items-center justify-center w-16 sm:w-20 md:w-24 h-18 sm:h-22 md:h-24 rounded-xl bg-slate-950/80 backdrop-blur-md border border-slate-800 hover:border-red-500/60 transition-all duration-300 shadow-lg shadow-black/80">
              {/* Corner tech notch */}
              <div className="absolute top-1 left-1 w-1.5 h-1.5 bg-red-500/60 rounded-full group-hover:scale-125 transition-transform" />
              <div className="absolute bottom-1 right-1 w-1.5 h-1.5 bg-cyan-500/60 rounded-full group-hover:scale-125 transition-transform" />

              <span className={`font-heading text-xl sm:text-2xl md:text-3xl font-extrabold ${unit.color} tracking-tight drop-shadow-md`}>
                {unit.value}
              </span>
              <span className="font-mono-code text-[9px] sm:text-[11px] text-slate-400 tracking-widest mt-1 font-semibold uppercase">
                {unit.label}
              </span>
            </div>

            {index < timeUnits.length - 1 && (
              <span className="font-heading text-lg sm:text-2xl text-red-600/70 font-bold animate-pulse -mx-1 sm:-mx-2">
                :
              </span>
            )}
          </React.Fragment>
        ))}
      </div>
      <p className="font-mono-code text-xs text-slate-400 tracking-widest mt-2 flex items-center gap-1.5">
        <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
        TARGET: {festConfig.eventDateDisplay}
      </p>
    </div>
  );
}
