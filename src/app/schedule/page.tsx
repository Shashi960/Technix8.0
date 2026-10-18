"use client";

import React from "react";
import Navbar from "@/components/Navbar";
import AboutSection from "@/components/AboutSection";
import HighlightsSection from "@/components/HighlightsSection";
import CountdownTimer from "@/components/CountdownTimer";
import Footer from "@/components/Footer";
import { Calendar, Clock, MapPin, Zap } from "lucide-react";

export default function SchedulePage() {
  const scheduleDays = [
    {
      day: "Day 1 — Convergence Awakening",
      date: "October 16, 2026",
      events: [
        { time: "09:00 AM", title: "Grand Inauguration & Quantum Opening", venue: "Grand Auditorium" },
        { time: "10:30 AM", title: "Code of Iron (Speed Hackathon)", venue: "Turing Lab, 3rd Floor" },
        { time: "11:00 AM", title: "Multiverse Web Dev (Frontend Arena)", venue: "Ada Lovelace Computing Suite" },
        { time: "01:30 PM", title: "Lunch & Cinematic Multiverse Showcase", venue: "Food Street & Central Lawn" },
        { time: "02:30 PM", title: "God of Thunder Gaming Arena (Valorant & BGMI)", venue: "Esports Hub" },
        { time: "05:00 PM", title: "Twilight Cultural Prelude & Flash Mob", venue: "Amphitheatre" },
      ],
    },
    {
      day: "Day 2 — The Cosmic Climax",
      date: "October 17, 2026",
      events: [
        { time: "09:30 AM", title: "Mystic Bug Hunt (Debugging Trial)", venue: "Systems Lab 1" },
        { time: "10:30 AM", title: "Infinity Pitch (Startup & Innovation Summit)", venue: "Seminar Hall A" },
        { time: "11:30 AM", title: "Cosmic Cosplay & Character Parade", venue: "Main Quadrangle" },
        { time: "02:00 PM", title: "Ragnarok Stage Showdown (Music & Dance)", venue: "Open Air Theatre" },
        { time: "05:30 PM", title: "Valedictory Ceremony & ₹1,00,000+ Prize Distribution", venue: "Grand Auditorium" },
        { time: "07:00 PM", title: "Technix 8.0 DJ Night & Starlight Bash", venue: "Festival Arena" },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-[#04060C] text-slate-100 flex flex-col selection:bg-pink-600 selection:text-white">
      <Navbar />

      <main className="flex-1 pt-24 pb-16 px-4">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-slate-900 border border-pink-500/30 text-pink-400 font-mono-code text-xs tracking-widest uppercase mb-4">
              <Calendar className="w-3.5 h-3.5 text-pink-400" />
              <span>OFFICIAL ITINERARY</span>
            </div>
            <h1 className="font-heading text-4xl sm:text-5xl font-black text-slate-100 mb-4 tracking-tight uppercase">
              FEST <span className="text-pink-500">SCHEDULE</span>
            </h1>
            <p className="text-slate-400 text-sm sm:text-base max-w-xl mx-auto">
              Plan your convergence across two electrifying days of technical clashes, esports battlegrounds, and cultural performances.
            </p>

            <div className="max-w-md mx-auto mt-8">
              <CountdownTimer />
            </div>
          </div>

          {/* Schedule Days */}
          <div className="space-y-10">
            {scheduleDays.map((dayGroup, idx) => (
              <div
                key={idx}
                className="bg-slate-950/70 border border-slate-800/80 rounded-2xl p-6 sm:p-8 backdrop-blur-md shadow-xl"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 mb-6 border-b border-slate-800 gap-2">
                  <div>
                    <h2 className="font-heading text-xl sm:text-2xl font-bold text-white tracking-wide">
                      {dayGroup.day}
                    </h2>
                    <p className="font-mono-code text-xs text-pink-400 mt-1">
                      {dayGroup.date}
                    </p>
                  </div>
                  <span className="font-mono-code text-xs text-slate-400 bg-slate-900 px-3 py-1 rounded-full border border-slate-800 w-fit">
                    {dayGroup.events.length} SESSIONS
                  </span>
                </div>

                <div className="grid gap-4">
                  {dayGroup.events.map((evt, eIdx) => (
                    <div
                      key={eIdx}
                      className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-xl bg-slate-900/60 border border-slate-800/60 hover:border-pink-500/40 transition-all gap-3"
                    >
                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-1.5 font-mono-code text-xs font-bold text-amber-400 bg-amber-950/40 border border-amber-500/30 px-2.5 py-1 rounded-lg">
                          <Clock className="w-3.5 h-3.5" />
                          <span>{evt.time}</span>
                        </div>
                        <span className="font-sans font-semibold text-sm sm:text-base text-slate-100">
                          {evt.title}
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5 font-mono-code text-xs text-slate-400">
                        <MapPin className="w-3.5 h-3.5 text-pink-400" />
                        <span>{evt.venue}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Telemetry Highlights */}
          <div className="mt-16">
            <HighlightsSection />
          </div>

          {/* About Manifesto */}
          <div className="mt-12">
            <AboutSection />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
