"use client";

import React, { useState } from "react";
import Image from "next/image";
import confetti from "canvas-confetti";
import { eventsData } from "@/data/eventsData";
import { festConfig } from "@/data/festConfig";
import { RegistrationSubmission } from "@/types";
import {
  Shield,
  Zap,
  Printer,
  User,
  Mail,
  Phone,
  School,
  Users,
  Calendar,
  MapPin,
  CheckCircle2,
  AlertTriangle,
} from "lucide-react";

interface RegistrationSectionProps {
  preSelectedEventId?: string | null;
  onClearPreSelected?: () => void;
}

export default function RegistrationSection({
  preSelectedEventId,
  onClearPreSelected,
}: RegistrationSectionProps) {
  const [selectedEventId, setSelectedEventId] = useState<string>(
    preSelectedEventId || eventsData[0].id
  );

  const [leadName, setLeadName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [collegeName, setCollegeName] = useState("");
  const [department, setDepartment] = useState("");
  const [yearOfStudy, setYearOfStudy] = useState("3rd Year");
  const [teamName, setTeamName] = useState("");
  const [members, setMembers] = useState<string[]>([]);
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [ticketData, setTicketData] = useState<RegistrationSubmission | null>(
    null
  );

  const [prevPreSelected, setPrevPreSelected] = useState<string | null>(
    preSelectedEventId || null
  );
  if (preSelectedEventId && preSelectedEventId !== prevPreSelected) {
    setPrevPreSelected(preSelectedEventId);
    setSelectedEventId(preSelectedEventId);
  }

  const currentEvent =
    eventsData.find((e) => e.id === selectedEventId) || eventsData[0];
  const maxAdditionalMembers = Math.max(0, currentEvent.teamSize.max - 1);

  const handleMemberChange = (index: number, val: string) => {
    const updated = [...members];
    updated[index] = val;
    setMembers(updated);
  };

  const addMemberField = () => {
    if (members.length < maxAdditionalMembers) {
      setMembers([...members, ""]);
    }
  };

  const removeMemberField = (index: number) => {
    setMembers(members.filter((_, i) => i !== index));
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreedToTerms) return;

    setIsSubmitting(true);

    setTimeout(() => {
      const passCode = `TX8-${currentEvent.marvelCharacter
        .slice(0, 4)
        .toUpperCase()
        .replace(/[^A-Z]/g, "")}-${Math.floor(1000 + Math.random() * 9000)}`;

      const newTicket: RegistrationSubmission = {
        id: `reg-${Date.now()}`,
        timestamp: new Date().toISOString(),
        eventId: currentEvent.id,
        eventTitle: currentEvent.title,
        teamName: teamName || undefined,
        leadName,
        email,
        phone,
        collegeName,
        department,
        yearOfStudy,
        members: members.filter((m) => m.trim().length > 0),
        passCode,
      };

      setTicketData(newTicket);
      setIsSubmitting(false);

      // Confetti Blast
      try {
        confetti({
          particleCount: 110,
          spread: 75,
          origin: { y: 0.6 },
          colors: ["#E23636", "#F59E0B", "#38BDF8", "#FFFFFF"],
        });
      } catch (err) {
        // fallback
      }
    }, 800);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <section id="register" className="relative w-full bg-[#1F1D1C] overflow-hidden">
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
                id="passes-hero-grid"
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
            <rect width="100%" height="100%" fill="url(#passes-hero-grid)" />
          </svg>
        </div>

        {/* Soft Vignette Shadows */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-black/25 pointer-events-none" />
        <div className="absolute bottom-0 inset-x-0 h-16 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />

        {/* Dynamic Spider-Man on Right Side */}
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

        {/* Centered Typography: PASSES Title */}
        <div className="relative z-10 max-w-4xl mx-auto text-center px-4 py-16 sm:py-20 md:py-24 flex flex-col items-center justify-center">
          <h1 className="font-heading font-black text-4xl sm:text-5xl md:text-6xl lg:text-7xl uppercase text-white tracking-widest drop-shadow-[0_4px_16px_rgba(0,0,0,0.6)]">
            PASSES
          </h1>

          <p className="text-slate-200 text-sm sm:text-base md:text-lg max-w-2xl mx-auto mt-4 font-sans font-normal tracking-wide leading-relaxed drop-shadow-md">
            Claim your official festival badge & credentials for TECHNIX 8.0
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
        <div className="max-w-4xl mx-auto">
          {/* Top Status & Security Bar */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-6 mb-8 border-b border-slate-200">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="font-tech font-bold text-sm tracking-wider uppercase text-slate-800">
                OFFICIAL ADMISSION GATEWAY
              </span>
            </div>

            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-100 border border-slate-300 text-xs font-mono-code text-slate-700">
              <Shield className="w-3.5 h-3.5 text-red-600" />
              <span>COLLEGE ID CARD VERIFICATION MANDATORY</span>
            </div>
          </div>

          {/* Ticket View If Generated */}
          {ticketData ? (
            <div
              className="p-6 sm:p-10 rounded-3xl bg-slate-950 text-white border shadow-2xl relative overflow-hidden animate-in zoom-in-95 duration-300"
              style={{
                borderColor: currentEvent.heroTheme.accentColor,
                boxShadow: `0 0 45px ${currentEvent.heroTheme.glowColor}`,
              }}
            >
              {/* Watermark Shield */}
              <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
                <Shield className="w-64 h-64 text-red-500" />
              </div>

              <div className="relative z-10">
                <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-slate-800">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-12 h-12 rounded-2xl flex items-center justify-center text-white font-heading font-black text-xl shadow-lg"
                      style={{
                        backgroundColor: currentEvent.heroTheme.accentColor,
                      }}
                    >
                      TX8
                    </div>
                    <div>
                      <h3 className="font-heading text-xl sm:text-2xl font-black text-white uppercase tracking-tight">
                        OFFICIAL ADMISSION PASS
                      </h3>
                      <span className="font-mono-code text-xs text-amber-400 font-bold">
                        {festConfig.name} • BMSIT Yelahanka Bengaluru
                      </span>
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="font-mono-code text-xs text-slate-400 block uppercase">
                      PASSCODE ID
                    </span>
                    <span className="font-heading text-lg sm:text-xl font-black text-amber-400 tracking-wider">
                      {ticketData.passCode}
                    </span>
                  </div>
                </div>

                {/* Ticket Details Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 py-6 border-b border-slate-800 text-sm">
                  <div>
                    <span className="font-mono-code text-[11px] text-slate-500 block uppercase">
                      REGISTERED PROTOCOL
                    </span>
                    <span className="font-heading text-base font-bold text-white block mt-0.5">
                      {ticketData.eventTitle}
                    </span>
                    <span className="text-xs text-amber-400 font-mono-code">
                      {currentEvent.marvelCharacter}
                    </span>
                  </div>

                  <div>
                    <span className="font-mono-code text-[11px] text-slate-500 block uppercase">
                      PARTICIPANT / TEAM LEAD
                    </span>
                    <span className="font-bold text-slate-100 block mt-0.5">
                      {ticketData.leadName}
                    </span>
                    <span className="text-xs text-slate-400 font-mono-code">
                      {ticketData.email} • {ticketData.phone}
                    </span>
                  </div>

                  <div>
                    <span className="font-mono-code text-[11px] text-slate-500 block uppercase">
                      INSTITUTION / COLLEGE
                    </span>
                    <span className="font-bold text-slate-100 block mt-0.5">
                      {ticketData.collegeName}
                    </span>
                    <span className="text-xs text-slate-400 font-mono-code">
                      {ticketData.department} ({ticketData.yearOfStudy})
                    </span>
                  </div>

                  {ticketData.teamName && (
                    <div>
                      <span className="font-mono-code text-[11px] text-slate-500 block uppercase">
                        TEAM NAME
                      </span>
                      <span className="font-bold text-cyan-400">
                        {ticketData.teamName}
                      </span>
                    </div>
                  )}

                  {ticketData.members.length > 0 && (
                    <div className="sm:col-span-2">
                      <span className="font-mono-code text-[11px] text-slate-500 block uppercase mb-1">
                        ASSEMBLED TEAM SQUAD
                      </span>
                      <div className="flex flex-wrap gap-2">
                        {ticketData.members.map((m, idx) => (
                          <span
                            key={idx}
                            className="px-2.5 py-1 rounded bg-slate-900 border border-slate-800 text-xs font-mono-code text-slate-300"
                          >
                            Member {idx + 1}: {m}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Barcode & Security Hologram Footer */}
                <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-6">
                  <div>
                    <div className="flex items-center gap-1 font-mono-code text-lg tracking-[8px] text-slate-400 select-none">
                      ||| | |||| | ||||| || ||| ||||
                    </div>
                    <span className="font-mono-code text-[10px] text-slate-500">
                      CRYPTOGRAPHIC HASH: {ticketData.id} • VALID COLLEGE ID REQUIRED AT ENTRANCE
                    </span>
                  </div>

                  <div className="flex items-center gap-3 w-full sm:w-auto">
                    <button
                      onClick={handlePrint}
                      className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white border border-slate-700 text-xs font-heading font-bold transition-colors cursor-pointer"
                    >
                      <Printer className="w-4 h-4 text-cyan-400" />
                      PRINT PASS
                    </button>
                    <button
                      onClick={() => {
                        setTicketData(null);
                        if (onClearPreSelected) onClearPreSelected();
                      }}
                      className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-red-600 to-amber-600 text-white text-xs font-heading font-extrabold hover:from-red-500 hover:to-amber-500 transition-all shadow-md cursor-pointer"
                    >
                      <Zap className="w-4 h-4 text-amber-300" />
                      REGISTER ANOTHER PROTOCOL
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            /* High-Contrast White Registration Form */
            <form
              onSubmit={handleRegister}
              className="p-6 sm:p-10 rounded-2xl bg-white border border-slate-200 shadow-xl space-y-8"
            >
              {/* Step 1: Select Protocol / Event */}
              <div>
                <label className="block text-xs font-mono-code text-red-600 uppercase tracking-wider mb-2 font-bold">
                  1. SELECT PROTOCOL / ARENA *
                </label>
                <select
                  value={selectedEventId}
                  onChange={(e) => setSelectedEventId(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-sm sm:text-base font-tech font-bold focus:border-red-600 focus:bg-white focus:outline-none cursor-pointer shadow-sm transition-all"
                >
                  {eventsData.map((ev) => (
                    <option key={ev.id} value={ev.id}>
                      {ev.title} [{ev.marvelCharacter.split("—")[0].trim()}] — {ev.category}
                    </option>
                  ))}
                </select>

                {/* Event Hero Theme Card Banner */}
                <div className="mt-4 p-4 rounded-xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row items-start sm:items-center gap-4 shadow-sm">
                  <div
                    className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden border-2 flex-shrink-0 shadow-md bg-slate-900"
                    style={{ borderColor: currentEvent.heroTheme.accentColor }}
                  >
                    <Image
                      src={currentEvent.image}
                      alt={currentEvent.title}
                      fill
                      className="object-cover object-center"
                    />
                  </div>

                  <div className="flex-1">
                    <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-slate-900 text-[10px] font-mono-code text-white mb-1 shadow-xs">
                      <span
                        className="w-2 h-2 rounded-full"
                        style={{
                          backgroundColor: currentEvent.heroTheme.accentColor,
                        }}
                      />
                      <span className="uppercase font-bold">
                        {currentEvent.category} PROTOCOL
                      </span>
                      <span>•</span>
                      <span className="text-amber-300 font-bold">
                        {currentEvent.marvelCharacter}
                      </span>
                    </div>

                    <h3 className="font-heading text-base sm:text-lg font-black text-slate-900 uppercase tracking-tight">
                      {currentEvent.title}
                    </h3>

                    <div className="mt-2 flex flex-wrap items-center gap-3 text-[11px] font-mono-code text-slate-600">
                      <span className="flex items-center gap-1 font-semibold">
                        <Users className="w-3 h-3 text-red-600" />
                        {currentEvent.teamSize.label}
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1 font-semibold">
                        <Calendar className="w-3 h-3 text-amber-600" />
                        Schedule: {currentEvent.scheduleTime}
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1 font-semibold">
                        <MapPin className="w-3 h-3 text-emerald-600" />
                        {currentEvent.venue}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Step 2: Primary Candidate / Team Lead */}
              <div>
                <label className="block text-xs font-mono-code text-red-600 uppercase tracking-wider mb-4 font-bold">
                  2. PRIMARY CANDIDATE / TEAM LEAD *
                </label>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono-code text-slate-600 mb-1 font-semibold">
                      Full Name *
                    </label>
                    <div className="relative">
                      <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <input
                        type="text"
                        required
                        value={leadName}
                        onChange={(e) => setLeadName(e.target.value)}
                        placeholder="e.g. Tony Stark"
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-sm focus:border-red-600 focus:bg-white focus:outline-none transition-all shadow-xs"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-mono-code text-slate-600 mb-1 font-semibold">
                      Email Address *
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="tony@starkindustries.org"
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-sm focus:border-red-600 focus:bg-white focus:outline-none transition-all shadow-xs"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-mono-code text-slate-600 mb-1 font-semibold">
                      WhatsApp / Phone *
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <input
                        type="tel"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="+91 98765 43210"
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-sm focus:border-red-600 focus:bg-white focus:outline-none transition-all shadow-xs"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-mono-code text-slate-600 mb-1 font-semibold">
                      Year of Study *
                    </label>
                    <select
                      value={yearOfStudy}
                      onChange={(e) => setYearOfStudy(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-sm focus:border-red-600 focus:bg-white focus:outline-none transition-all shadow-xs"
                    >
                      <option value="1st Year">1st Year UG</option>
                      <option value="2nd Year">2nd Year UG</option>
                      <option value="3rd Year">3rd Year UG</option>
                      <option value="4th Year">4th Year UG</option>
                      <option value="Postgraduate">Postgraduate / MCA / MSc</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Step 3: Institution & Squad Details */}
              <div>
                <label className="block text-xs font-mono-code text-red-600 uppercase tracking-wider mb-4 font-bold">
                  3. INSTITUTION &amp; SQUAD IDENTIFIER
                </label>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono-code text-slate-600 mb-1 font-semibold">
                      College / University Name *
                    </label>
                    <div className="relative">
                      <School className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <input
                        type="text"
                        required
                        value={collegeName}
                        onChange={(e) => setCollegeName(e.target.value)}
                        placeholder="e.g. BMSIT & Management"
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-sm focus:border-red-600 focus:bg-white focus:outline-none transition-all shadow-xs"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-mono-code text-slate-600 mb-1 font-semibold">
                      Department / Branch *
                    </label>
                    <input
                      type="text"
                      required
                      value={department}
                      onChange={(e) => setDepartment(e.target.value)}
                      placeholder="e.g. Computer Science / BCA / IT"
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-sm focus:border-red-600 focus:bg-white focus:outline-none transition-all shadow-xs"
                    />
                  </div>

                  {currentEvent.teamSize.max > 1 && (
                    <div className="sm:col-span-2">
                      <label className="block text-xs font-mono-code text-slate-600 mb-1 font-semibold">
                        Team Name (Optional)
                      </label>
                      <input
                        type="text"
                        value={teamName}
                        onChange={(e) => setTeamName(e.target.value)}
                        placeholder="e.g. Avengers Initiative / Stark Coders"
                        className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-sm focus:border-red-600 focus:bg-white focus:outline-none transition-all shadow-xs"
                      />
                    </div>
                  )}
                </div>
              </div>

              {/* Dynamic Additional Team Members */}
              {maxAdditionalMembers > 0 && (
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-mono-code text-xs text-slate-700 font-bold uppercase">
                      ADDITIONAL TEAM MEMBERS ({members.length}/{maxAdditionalMembers})
                    </span>
                    {members.length < maxAdditionalMembers && (
                      <button
                        type="button"
                        onClick={addMemberField}
                        className="text-xs font-tech font-bold text-red-600 hover:text-red-700 transition-colors cursor-pointer"
                      >
                        + ADD TEAM MEMBER
                      </button>
                    )}
                  </div>

                  {members.length === 0 ? (
                    <p className="text-xs text-slate-500 font-mono-code">
                      No additional team members added. Click &ldquo;+ Add Team Member&rdquo; if competing as a squad.
                    </p>
                  ) : (
                    <div className="space-y-2">
                      {members.map((member, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <input
                            type="text"
                            required
                            value={member}
                            onChange={(e) =>
                              handleMemberChange(index, e.target.value)
                            }
                            placeholder={`Team Member ${index + 2} Full Name`}
                            className="flex-1 px-3.5 py-2 rounded-xl bg-white border border-slate-300 text-slate-900 text-xs sm:text-sm focus:border-red-600 focus:outline-none shadow-xs"
                          />
                          <button
                            type="button"
                            onClick={() => removeMemberField(index)}
                            className="p-2 rounded-lg bg-slate-200 hover:bg-red-600 hover:text-white text-slate-700 text-xs transition-colors cursor-pointer"
                          >
                            Remove
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Terms and MCU Code of Conduct */}
              <div className="space-y-3 pt-2">
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    required
                    checked={agreedToTerms}
                    onChange={(e) => setAgreedToTerms(e.target.checked)}
                    className="mt-1 w-4 h-4 rounded border-slate-300 text-red-600 focus:ring-red-500 cursor-pointer"
                  />
                  <span className="text-xs text-slate-600 leading-relaxed font-sans">
                    I agree to abide by the TECHNIX 8.0 Fest Code of Conduct, confirm that all information provided is accurate, and understand that physical college ID cards must be presented at the check-in desk at BMSIT Yelahanka Bengaluru.
                  </span>
                </label>
              </div>

              {/* Submit Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting || !agreedToTerms}
                  className="w-full inline-flex items-center justify-center gap-2 py-4 rounded-xl text-white font-heading text-sm sm:text-base font-extrabold tracking-wider shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-[1.01] active:scale-[0.99] cursor-pointer bg-gradient-to-r from-red-600 via-rose-600 to-red-700 hover:from-red-500 hover:to-rose-500 shadow-red-950/20"
                >
                  {isSubmitting ? (
                    <>
                      <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      TRANSMITTING PROTOCOL CLEARANCE...
                    </>
                  ) : (
                    <>
                      <Zap className="w-5 h-5 text-amber-300" />
                      CONFIRM REGISTRATION FOR {currentEvent.title.split("—")[0].trim().toUpperCase()}
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
