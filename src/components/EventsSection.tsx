"use client";

import React, { useState, useMemo, useEffect, useRef } from "react";
import Image from "next/image";
import { eventsData } from "@/data/eventsData";
import { FestEvent } from "@/types";
import {
  Search,
  Users,
  Zap,
  Eye,
  AlertCircle,
  Sparkles,
} from "lucide-react";

interface EventsSectionProps {
  onOpenEventDetails: (event: FestEvent) => void;
  onSelectForRegistration: (eventId: string) => void;
  initialCategory?: string;
}

export default function EventsSection({
  onOpenEventDetails,
  onSelectForRegistration,
  initialCategory = "All",
}: EventsSectionProps) {
  const [selectedCategory, setSelectedCategory] =
    useState<string>(initialCategory);
  const [searchQuery, setSearchQuery] = useState<string>("");

  const categories = ["All", "Technical", "Non-Technical", "Gaming", "Cultural"];

  // One-time deliberate entrance animations via direct DOM class toggle (0 React re-renders during scroll)
  useEffect(() => {
    if (typeof window === "undefined" || !("IntersectionObserver" in window))
      return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-revealed");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );

    const cards = document.querySelectorAll("[data-event-id]");
    cards.forEach((el) => observer.observe(el));

    return () => {
      observer.disconnect();
    };
  }, [selectedCategory]);

  const filteredEvents = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return eventsData.filter((event) => {
      const matchesCategory =
        selectedCategory === "All" || event.category === selectedCategory;
      if (!matchesCategory) return false;
      if (!q) return true;
      return (
        event.title.toLowerCase().includes(q) ||
        event.marvelCharacter.toLowerCase().includes(q) ||
        event.shortDescription.toLowerCase().includes(q)
      );
    });
  }, [selectedCategory, searchQuery]);

  return (
    <section id="events" className="relative py-24 px-4 bg-[#05070B] overflow-hidden">
      {/* Background Stark Arc Lighting */}
      <div className="absolute top-1/4 left-0 w-80 h-80 bg-red-900/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-0 w-80 h-80 bg-cyan-900/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-slate-900 border border-red-500/30 text-red-400 font-mono-code text-xs tracking-widest uppercase mb-4">
            <Zap className="w-3.5 h-3.5 text-amber-400" />
            9 HEROIC ARENAS ASSEMBLED
          </div>

          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight text-metallic-silver mb-4">
            CHOOSE YOUR <span className="text-metallic-red">PROTOCOL</span>
          </h2>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Every arena is forged around a distinct hero discipline. Inspect the dossier, assemble your allies, and compete for collegiate glory.
          </p>
        </div>

        {/* Filter Controls & Search Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-10 p-4 rounded-2xl bg-slate-950/80 border border-slate-800 backdrop-blur-md">
          {/* Category Pills */}
          <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-tech font-bold tracking-wide transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? "bg-red-600 text-white shadow-lg shadow-red-950 glow-red border border-red-400/60"
                    : "bg-slate-900 text-slate-400 hover:text-white hover:bg-slate-800 border border-slate-800"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-72">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search protocol or hero..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-900 border border-slate-800 focus:border-red-500 focus:outline-none text-slate-100 text-xs sm:text-sm font-sans placeholder:text-slate-500 transition-colors"
            />
          </div>
        </div>

        {/* Empty State */}
        {filteredEvents.length === 0 && (
          <div className="text-center py-16 px-4 rounded-3xl bg-slate-950/60 border border-slate-800">
            <AlertCircle className="w-12 h-12 text-slate-500 mx-auto mb-3" />
            <h3 className="font-heading text-lg font-bold text-slate-300">No Protocols Found</h3>
            <p className="text-slate-500 text-xs sm:text-sm mt-1 max-w-sm mx-auto">
              No events matched your search query &ldquo;{searchQuery}&rdquo;. Try clearing filters or searching for another character.
            </p>
            <button
              onClick={() => {
                setSelectedCategory("All");
                setSearchQuery("");
              }}
              className="mt-4 px-4 py-2 rounded-xl bg-slate-800 text-slate-200 text-xs font-heading font-bold hover:bg-slate-700 cursor-pointer"
            >
              RESET FILTERS
            </button>
          </div>
        )}

        {/* Responsive Events Grid (Exact 9 Events) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredEvents.map((event, index) => {
            const specificAnimClass =
              event.id === "infinity-iq-challenge"
                ? "card-strange"
                : event.id === "avengers-battleworld"
                ? "card-battleworld"
                : event.id === "project-what-if"
                ? "card-whatif"
                : "";

            return (
              <div
                key={event.id}
                data-event-id={event.id}
                className={`group relative flex flex-col rounded-3xl bg-slate-950/90 border border-slate-800/90 hover:border-slate-600 transition-colors duration-200 overflow-hidden shadow-xl [content-visibility:auto] [contain-intrinsic-size:0_480px] hover:-translate-y-1 ${specificAnimClass}`}
                style={{
                  boxShadow: `0 8px 24px -8px ${event.heroTheme.glowColor}`,
                }}
              >
                {/* Card Image Banner */}
                <div className="relative w-full h-56 bg-slate-950 overflow-hidden">
                  <Image
                    src={event.image}
                    alt={event.title}
                    fill
                    priority={index === 0}
                    loading={index === 0 ? "eager" : "lazy"}
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className={`object-cover object-center group-hover:scale-105 transition-transform duration-500 ${
                      event.id === "marvel-in-motion" ? "spidey-web-reveal" : ""
                    }`}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/35 to-transparent" />

                  {/* Hero Theme Badge */}
                  <div className="absolute top-3 left-3 flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-950/90 border border-slate-700/80 text-xs font-mono-code font-bold text-white z-10 shadow-md">
                    <span
                      className="w-2 h-2 rounded-full"
                      style={{ backgroundColor: event.heroTheme.accentColor }}
                    />
                    <span>{event.marvelCharacter.split("—")[0].trim()}</span>
                  </div>

                  {/* Category Pill */}
                  <div className="absolute top-3 right-3 px-2.5 py-0.5 rounded-full bg-black/75 border border-slate-800 text-[10px] font-mono-code text-slate-300 z-10">
                    {event.category}
                  </div>

                  {/* TBD Indicator Badge */}
                  {event.isTBD && (
                    <div className="absolute bottom-3 left-3 px-2.5 py-1 rounded-md bg-purple-950/90 border border-purple-500/50 text-[11px] font-mono-code font-bold text-purple-300 z-10">
                      CLASSIFIED SURPRISE PROTOCOL
                    </div>
                  )}

                  {/* One-time Deliberate Accent Overlays */}
                  {event.id === "marvel-in-motion" && (
                    <div className="absolute inset-0 pointer-events-none spidey-lens-flash" />
                  )}
                  {event.id === "avengers-battleworld" && (
                    <div className="absolute inset-0 pointer-events-none battleworld-arc-flash" />
                  )}
                </div>

                {/* Card Content */}
                <div className="p-6 flex flex-col flex-1">
                  <h3 className="font-heading text-lg sm:text-xl font-black text-white group-hover:text-amber-300 transition-colors tracking-wide mb-2 min-h-[3.5rem] line-clamp-2">
                    {event.title}
                  </h3>

                  <p className="text-slate-400 text-xs sm:text-sm leading-relaxed mb-6 line-clamp-3 font-sans flex-1">
                    {event.shortDescription}
                  </p>

                  {/* Event Metadata Footer */}
                  <div className="pt-4 border-t border-slate-900 flex items-center justify-between text-xs font-mono-code text-slate-400 mb-5">
                    <div className="flex items-center gap-1.5">
                      <Users className="w-3.5 h-3.5 text-slate-400" />
                      <span>{event.teamSize.label}</span>
                    </div>
                    <span
                      className={`text-[11px] font-bold ${
                        event.isTBD ? "text-purple-400" : "text-amber-400"
                      }`}
                    >
                      {event.isTBD ? "CLASSIFIED" : "ACTIVE"}
                    </span>
                  </div>

                  {/* Card CTA Buttons */}
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      onClick={() => onOpenEventDetails(event)}
                      className="flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 text-slate-200 text-xs font-heading font-bold transition-colors cursor-pointer"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      DOSSIER
                    </button>

                    <button
                      onClick={() => onSelectForRegistration(event.id)}
                      className="flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white text-xs font-heading font-bold transition-all shadow-md shadow-red-950/50 cursor-pointer"
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                      REGISTER
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <style jsx>{`
        /* 1. Spider-Man One-Time Web Drop Reveal (GPU Composited) */
        @keyframes spideyWebDrop {
          0% {
            transform: translateY(-14px) scale(1.03);
            opacity: 0.85;
          }
          100% {
            transform: translateY(0) scale(1);
            opacity: 1;
          }
        }
        .is-revealed .spidey-web-reveal {
          animation: spideyWebDrop 0.55s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        /* Spider-Man Quick Lens Shutter Flash */
        @keyframes spideyLensFlash {
          0% {
            opacity: 0.45;
            background: rgba(255, 255, 255, 0.3);
          }
          100% {
            opacity: 0;
            background: transparent;
          }
        }
        .is-revealed .spidey-lens-flash {
          animation: spideyLensFlash 0.45s ease-out forwards;
        }

        /* 2. Doctor Strange One-Time Portal Border Sweep (Border-color only, 0 box-shadow repaints) */
        @keyframes strangePortalSweep {
          0% {
            border-color: rgba(245, 158, 11, 0.9);
          }
          50% {
            border-color: rgba(168, 85, 247, 0.9);
          }
          100% {
            border-color: rgba(51, 65, 85, 0.9);
          }
        }
        .card-strange.is-revealed {
          animation: strangePortalSweep 0.85s ease-out forwards;
        }

        /* 3. Avengers Battleworld One-Time Lightning Strike */
        @keyframes battleworldBorderFlash {
          0% {
            border-color: #38bdf8;
          }
          30% {
            border-color: #f59e0b;
          }
          100% {
            border-color: rgba(51, 65, 85, 0.9);
          }
        }
        .card-battleworld.is-revealed {
          animation: battleworldBorderFlash 0.7s ease-out forwards;
        }

        @keyframes battleworldArc {
          0% {
            opacity: 0.35;
            background: rgba(56, 189, 248, 0.2);
          }
          100% {
            opacity: 0;
            background: transparent;
          }
        }
        .is-revealed .battleworld-arc-flash {
          animation: battleworldArc 0.35s ease-out forwards;
        }

        /* 4. Project What If Reality Shift */
        @keyframes realityShift {
          0% {
            opacity: 0.85;
          }
          100% {
            opacity: 1;
          }
        }
        .card-whatif.is-revealed {
          animation: realityShift 0.7s ease-out forwards;
        }

        /* Accessibility: Disable motion when user prefers reduced motion */
        @media (prefers-reduced-motion: reduce) {
          .card-strange.is-revealed,
          .card-battleworld.is-revealed,
          .card-whatif.is-revealed,
          .is-revealed .spidey-web-reveal,
          .is-revealed .spidey-lens-flash,
          .is-revealed .battleworld-arc-flash {
            animation: none !important;
            opacity: 1 !important;
          }
        }
      `}</style>
    </section>
  );
}
