"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import { eventsData } from "@/data/eventsData";
import { FestEvent } from "@/types";
import { Search, Sparkles, Eye, AlertCircle, Calendar } from "lucide-react";

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
    <section id="events" className="relative w-full bg-[#1F1D1C] overflow-hidden">
      {/* ================================================================= */}
      {/* 1. TOP MARVEL ANNOUNCEMENT TICKER                                  */}
      {/* ================================================================= */}
      <div className="w-full bg-[#0E0E0E] border-b border-black/40 text-[#CCCCCC] py-2 px-4 flex items-center justify-center text-[11px] sm:text-xs font-mono-code tracking-widest uppercase select-none z-20 relative">
        <span className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-red-600 animate-pulse" />
          STREAM TECHNIX 8.0 EXCLUSIVELY AT FEST ARENAS • NOVEMBER 18 – 19, 2026 • BMSIT YELAHANKA BENGALURU
        </span>
      </div>

      {/* ================================================================= */}
      {/* 2. CINEMATIC HERO HEADER BANNER (MARVEL MOVIES STYLE)              */}
      {/* ================================================================= */}
      <div className="relative w-full min-h-[300px] sm:min-h-[340px] md:min-h-[380px] bg-gradient-to-b from-[#59544e] via-[#524d47] to-[#45413b] flex items-center justify-center overflow-hidden">
        {/* Subtle Architectural Perspective / Glass Grid Overlay */}
        <div className="absolute inset-0 pointer-events-none opacity-15">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern
                id="hero-grid"
                width="80"
                height="80"
                patternUnits="userSpaceOnUse"
              >
                <path
                  d="M 80 0 L 0 0 0 80"
                  fill="none"
                  stroke="#FFFFFF"
                  strokeWidth="0.8"
                />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#hero-grid)" />
          </svg>
        </div>

        {/* Soft Vignette Shadows */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-black/25 pointer-events-none" />
        <div className="absolute bottom-0 inset-x-0 h-16 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />

        {/* Dynamic Spider-Man on Right Side (Matching reference screenshot) */}
        <div className="absolute right-0 top-0 bottom-0 w-[46%] max-w-[500px] pointer-events-none overflow-hidden hidden sm:block z-10">
          <div
            className="relative w-full h-full"
            style={{
              WebkitMaskImage:
                "linear-gradient(to right, transparent 0%, rgba(0,0,0,0.4) 15%, black 40%)",
              maskImage:
                "linear-gradient(to right, transparent 0%, rgba(0,0,0,0.4) 15%, black 40%)",
            }}
          >
            <Image
              src="/images/technix/marvel_spidey_banner_figure.webp"
              alt="Spider-Man in Action"
              fill
              priority
              sizes="(max-width: 1024px) 45vw, 500px"
              className="object-cover object-right"
            />
          </div>
        </div>

        {/* Centered Typography: MOVIES / EVENTS Title */}
        <div className="relative z-10 max-w-4xl mx-auto text-center px-4 py-16 sm:py-20 md:py-24 flex flex-col items-center justify-center">
          <h1 className="font-heading font-black text-4xl sm:text-5xl md:text-6xl lg:text-7xl uppercase text-white tracking-widest drop-shadow-[0_4px_16px_rgba(0,0,0,0.6)]">
            EVENTS
          </h1>

          <p className="text-slate-200 text-sm sm:text-base md:text-lg max-w-2xl mx-auto mt-4 font-sans font-normal tracking-wide leading-relaxed drop-shadow-md">
            Journey into the cosmic depths of the mighty TECHNIX 8.0 Multiverse!
          </p>

          <div className="mt-5 inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-black/40 backdrop-blur-md border border-white/15 text-white/90 text-xs font-mono-code uppercase tracking-wider">
            <Calendar className="w-3.5 h-3.5 text-amber-400" />
            <span>NOVEMBER 18 – 19, 2026 • BMSIT YELAHANKA BENGALURU</span>
          </div>
        </div>
      </div>

      {/* ================================================================= */}
      {/* 3. WHITE GALLERY SHOWROOM CONTAINER                                */}
      {/* ================================================================= */}
      <div className="w-full bg-[#FFFFFF] text-slate-900 pt-8 pb-24 px-4 sm:px-6 lg:px-8 border-t border-slate-300 shadow-2xl relative z-20">
        <div className="max-w-[1440px] mx-auto">
          {/* Sub-Navigation & Filter Bar */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 pb-6 mb-8 border-b border-slate-200">
            {/* Marvel Style Category Tabs */}
            <div className="flex flex-wrap items-center gap-1 sm:gap-2 w-full md:w-auto">
              {categories.map((cat) => {
                const isActive = selectedCategory === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`relative px-4 py-2 text-xs sm:text-sm font-tech font-bold uppercase tracking-wider transition-colors cursor-pointer ${
                      isActive
                        ? "text-red-600 after:absolute after:bottom-0 after:left-2 after:right-2 after:h-[3px] after:bg-red-600 after:rounded-full"
                        : "text-slate-600 hover:text-black"
                    }`}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>

            {/* Search Box & Counter */}
            <div className="flex items-center gap-3 w-full md:w-auto">
              <div className="relative w-full md:w-72">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search events or heroes..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 rounded-lg bg-slate-50 border border-slate-300 focus:border-red-600 focus:bg-white focus:outline-none text-slate-900 text-xs sm:text-sm font-sans placeholder:text-slate-400 transition-all shadow-sm"
                />
              </div>

              <div className="hidden lg:flex items-center px-3 py-2 rounded-lg bg-slate-100 border border-slate-200 text-xs font-mono-code font-bold text-slate-600 whitespace-nowrap">
                {filteredEvents.length} PROTOCOLS
              </div>
            </div>
          </div>

          {/* Empty State */}
          {filteredEvents.length === 0 && (
            <div className="text-center py-20 px-4 rounded-2xl bg-slate-50 border border-slate-200 my-8">
              <AlertCircle className="w-12 h-12 text-slate-400 mx-auto mb-3" />
              <h3 className="font-heading text-lg font-bold text-slate-800">
                No Protocols Found
              </h3>
              <p className="text-slate-500 text-xs sm:text-sm mt-1 max-w-sm mx-auto">
                No events matched your search query &ldquo;{searchQuery}&rdquo;.
                Try clearing filters or searching for another character.
              </p>
              <button
                onClick={() => {
                  setSelectedCategory("All");
                  setSearchQuery("");
                }}
                className="mt-4 px-4 py-2 rounded-lg bg-red-600 text-white text-xs font-heading font-bold hover:bg-red-700 transition-colors cursor-pointer shadow-md"
              >
                RESET FILTERS
              </button>
            </div>
          )}

          {/* =============================================================== */}
          {/* 4. POSTERS GRID (CINEMA MOVIE POSTER FORMAT)                     */}
          {/* =============================================================== */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 sm:gap-6">
            {filteredEvents.map((event, index) => {
              // Extract clean primary title and subtitle
              const titleParts = event.title.split("—");
              const mainTitle = titleParts[0].trim();
              const subTitle = titleParts[1]
                ? titleParts[1].trim()
                : event.shortDescription;
              const heroName = event.marvelCharacter.split("—")[0].trim();

              return (
                <div
                  key={event.id}
                  data-event-id={event.id}
                  onClick={() => onOpenEventDetails(event)}
                  className="group relative flex flex-col cursor-pointer select-none text-left"
                >
                  {/* Poster Image Container (2:3 Cinema Aspect Ratio) */}
                  <div className="relative w-full aspect-[2/3] overflow-hidden rounded-none sm:rounded-[2px] bg-slate-900 shadow-[0_4px_14px_rgba(0,0,0,0.12)] group-hover:shadow-[0_16px_36px_rgba(0,0,0,0.28)] transition-all duration-300 ease-out group-hover:-translate-y-2">
                    <Image
                      src={event.image}
                      alt={event.title}
                      fill
                      priority={index === 0}
                      loading={index === 0 ? "eager" : "lazy"}
                      sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
                      className="object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
                    />

                    {/* Marvel Top Red Line on Hover */}
                    <div className="absolute top-0 inset-x-0 h-1 bg-red-600 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left z-20" />

                    {/* Hero Character Badge */}
                    <div className="absolute top-2.5 left-2.5 z-10">
                      <span className="px-2 py-0.5 bg-black/85 backdrop-blur-md text-[9px] sm:text-[10px] font-mono-code font-bold text-white uppercase tracking-wider rounded-sm border border-white/10 shadow-sm flex items-center gap-1">
                        <span
                          className="w-1.5 h-1.5 rounded-full"
                          style={{
                            backgroundColor: event.heroTheme.accentColor,
                          }}
                        />
                        {heroName}
                      </span>
                    </div>

                    {/* Category Tag */}
                    <div className="absolute top-2.5 right-2.5 z-10">
                      <span className="px-1.5 py-0.5 bg-black/75 backdrop-blur-sm text-[8px] sm:text-[9px] font-mono-code text-slate-300 uppercase tracking-widest rounded-sm border border-white/10">
                        {event.category}
                      </span>
                    </div>

                    {/* Classified TBD Tag */}
                    {event.isTBD && (
                      <div className="absolute bottom-12 left-2 right-2 z-10 px-2 py-1 rounded bg-purple-950/95 border border-purple-500/60 text-[9px] font-mono-code font-bold text-purple-200 text-center uppercase tracking-wider shadow-lg">
                        CLASSIFIED PROTOCOL
                      </div>
                    )}

                    {/* Hover Action Drawer (Dossier & Register Buttons) */}
                    <div className="absolute inset-x-0 bottom-0 p-2.5 bg-gradient-to-t from-black/95 via-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center gap-1.5 z-20">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          onOpenEventDetails(event);
                        }}
                        className="flex-1 py-1.5 px-2 rounded bg-white/15 hover:bg-white/25 backdrop-blur-md border border-white/20 text-white text-[10px] font-heading font-bold uppercase tracking-wider transition-colors flex items-center justify-center gap-1 cursor-pointer"
                      >
                        <Eye className="w-3 h-3" />
                        DOSSIER
                      </button>

                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          onSelectForRegistration(event.id);
                        }}
                        className="flex-1 py-1.5 px-2 rounded bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white text-[10px] font-heading font-bold uppercase tracking-wider transition-all shadow-md flex items-center justify-center gap-1 cursor-pointer"
                      >
                        <Sparkles className="w-3 h-3 text-amber-300" />
                        REGISTER
                      </button>
                    </div>
                  </div>

                  {/* Card Metadata Below Poster (Marvel Movies Style) */}
                  <div className="pt-2.5 pb-1 flex flex-col">
                    {/* Line 1: Bold Movie/Event Title */}
                    <h3 className="font-heading font-black text-xs sm:text-sm md:text-base text-slate-900 group-hover:text-red-600 transition-colors uppercase tracking-tight line-clamp-1">
                      {mainTitle}
                    </h3>

                    {/* Line 2: Subtitle / Discipline / Schedule */}
                    <p className="text-[10px] sm:text-xs font-semibold text-slate-500 uppercase tracking-wider line-clamp-1 mt-0.5">
                      {subTitle} • Schedule: Updating Soon
                    </p>

                    {/* Line 3: Meta details */}
                    <p className="text-[9px] sm:text-[10px] font-mono-code text-slate-400 uppercase tracking-widest mt-0.5">
                      {event.teamSize.label}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
