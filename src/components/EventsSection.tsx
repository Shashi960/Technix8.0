"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import { eventsData } from "@/data/eventsData";
import { FestEvent, EventCategory } from "@/types";
import { Search, Filter, Users, ArrowUpRight, Zap, Eye, AlertCircle } from "lucide-react";

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
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);
  const [searchQuery, setSearchQuery] = useState<string>("");

  const categories = ["All", "Technical", "Non-Technical", "Gaming", "Cultural"];

  const filteredEvents = useMemo(() => {
    return eventsData.filter((event) => {
      const matchesCategory =
        selectedCategory === "All" || event.category === selectedCategory;
      const matchesSearch =
        event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.marvelCharacter.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.shortDescription.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
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
            11 HEROIC ARENAS ASSEMBLED
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
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-tech font-bold tracking-wide transition-all ${
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
              className="mt-4 px-4 py-2 rounded-xl bg-slate-800 text-slate-200 text-xs font-heading font-bold hover:bg-slate-700"
            >
              RESET FILTERS
            </button>
          </div>
        )}

        {/* Responsive Events Grid (All 11 Events) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredEvents.map((event) => (
            <div
              key={event.id}
              className="group relative flex flex-col rounded-3xl bg-slate-950/90 border border-slate-800/90 hover:border-slate-600 transition-all duration-300 overflow-hidden shadow-2xl hover:-translate-y-1.5"
              style={{
                boxShadow: `0 10px 30px -10px ${event.heroTheme.glowColor}`,
              }}
            >
              {/* Card Image Banner */}
              <div className="relative w-full h-52 bg-slate-950 overflow-hidden">
                <Image
                  src={event.image}
                  alt={event.title}
                  fill
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />

                {/* Hero Theme Badge */}
                <div className="absolute top-3 left-3 flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-950/80 backdrop-blur-md border border-slate-700 text-xs font-mono-code font-bold text-white">
                  <span
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: event.heroTheme.accentColor }}
                  />
                  <span>{event.marvelCharacter.split("—")[0].trim()}</span>
                </div>

                {/* Category Pill */}
                <div className="absolute top-3 right-3 px-2.5 py-0.5 rounded-full bg-black/60 border border-slate-800 text-[10px] font-mono-code text-slate-300">
                  {event.category}
                </div>

                {/* TBD Indicator Badge */}
                {event.isTBD && (
                  <div className="absolute bottom-3 left-3 px-2.5 py-1 rounded-md bg-amber-950/90 border border-amber-500/50 text-[11px] font-mono-code font-bold text-amber-300">
                    EVENT DETAILS COMING SOON
                  </div>
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
                  <span className="text-[11px] text-amber-400 font-bold">
                    {event.isTBD ? "TBD" : "ACTIVE"}
                  </span>
                </div>

                {/* Card CTA Buttons */}
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => onOpenEventDetails(event)}
                    className="flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 text-slate-200 text-xs font-heading font-bold transition-colors"
                  >
                    <Eye className="w-3.5 h-3.5 text-cyan-400" />
                    VIEW EVENT
                  </button>

                  <button
                    onClick={() => onSelectForRegistration(event.id)}
                    className="flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white text-xs font-heading font-extrabold tracking-wider transition-transform hover:scale-102 active:scale-98 glow-red shadow-lg"
                  >
                    <Zap className="w-3.5 h-3.5 text-amber-300" />
                    REGISTER
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
