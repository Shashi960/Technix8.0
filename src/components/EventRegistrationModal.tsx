"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import confetti from "canvas-confetti";
import { FestEvent, RegistrationSubmission } from "@/types";
import { eventsData } from "@/data/eventsData";
import { festConfig } from "@/data/festConfig";
import {
  X,
  Zap,
  CheckCircle2,
  AlertCircle,
  Shield,
  User,
  Mail,
  Phone,
  School,
  Users,
  Calendar,
  MapPin,
  Award,
  Printer,
  Sparkles,
  ChevronDown,
  Plus,
  Trash2,
  RotateCcw,
  ArrowRight,
} from "lucide-react";

interface EventRegistrationModalProps {
  event: FestEvent | null;
  isOpen: boolean;
  onClose: () => void;
  onSelectEvent?: (eventId: string) => void;
}

export default function EventRegistrationModal({
  event,
  isOpen,
  onClose,
  onSelectEvent,
}: EventRegistrationModalProps) {
  // Current active event for this registration modal
  const [activeEvent, setActiveEvent] = useState<FestEvent | null>(event);

  // Form states
  const [leadName, setLeadName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [collegeName, setCollegeName] = useState("");
  const [department, setDepartment] = useState("");
  const [yearOfStudy, setYearOfStudy] = useState("3rd Year UG");
  const [teamName, setTeamName] = useState("");
  const [members, setMembers] = useState<string[]>([]);
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  // Submission & ticket state
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [ticketData, setTicketData] = useState<RegistrationSubmission | null>(null);

  // 3D Card Flip States: Pop up hero card first, then auto-flip to register after 2.5s
  const [isFlipped, setIsFlipped] = useState(false);
  const [flipProgress, setFlipProgress] = useState(0);

  // Sync incoming event prop when modal opens or changes
  useEffect(() => {
    if (event) {
      setActiveEvent(event);
      setTicketData(null);
      // Reset members if switching event format
      const maxExtra = Math.max(0, event.teamSize.max - 1);
      setMembers((prev) => prev.slice(0, maxExtra));
    }
  }, [event, isOpen]);

  // Auto-flip effect when modal opens for a selected event
  useEffect(() => {
    if (!isOpen || !event) {
      setIsFlipped(false);
      setFlipProgress(0);
      return;
    }

    // Reset to front face
    setIsFlipped(false);
    setFlipProgress(0);

    const FLIP_DURATION = 2600; // ~2.6 seconds
    const startTime = Date.now();

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const pct = Math.min(100, (elapsed / FLIP_DURATION) * 100);
      setFlipProgress(pct);
    }, 25);

    const timer = setTimeout(() => {
      setIsFlipped(true);
      setFlipProgress(100);
      clearInterval(interval);
    }, FLIP_DURATION);

    return () => {
      clearTimeout(timer);
      clearInterval(interval);
    };
  }, [isOpen, event?.id]);

  const handleManualFlip = () => {
    setIsFlipped(true);
    setFlipProgress(100);
  };

  const handleFlipBack = () => {
    setIsFlipped(false);
  };

  // Handle ESC key and scroll locking
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen || !activeEvent) return null;

  const maxAdditionalMembers = Math.max(0, activeEvent.teamSize.max - 1);

  const handleMemberChange = (index: number, val: string) => {
    const updated = [...members];
    updated[index] = val;
    setMembers(updated);
  };

  const handleAddMember = () => {
    if (members.length < maxAdditionalMembers) {
      setMembers([...members, ""]);
    }
  };

  const handleRemoveMember = (index: number) => {
    setMembers(members.filter((_, i) => i !== index));
  };

  const handleSwitchEvent = (newEventId: string) => {
    const found = eventsData.find((e) => e.id === newEventId);
    if (found) {
      setActiveEvent(found);
      const newMaxExtra = Math.max(0, found.teamSize.max - 1);
      setMembers((prev) => prev.slice(0, newMaxExtra));
      if (onSelectEvent) onSelectEvent(found.id);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreedToTerms) return;

    setIsSubmitting(true);

    setTimeout(() => {
      const heroCode = activeEvent.marvelCharacter
        .split("—")[0]
        .replace(/[^A-Za-z]/g, "")
        .slice(0, 4)
        .toUpperCase();
      const randomDigits = Math.floor(1000 + Math.random() * 9000);
      const passCode = `TX8-${heroCode || "HERO"}-${randomDigits}`;

      const newSubmission: RegistrationSubmission = {
        id: `reg-${Date.now()}`,
        timestamp: new Date().toISOString(),
        eventId: activeEvent.id,
        eventTitle: activeEvent.title,
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

      setTicketData(newSubmission);
      setIsSubmitting(false);

      // Marvel Confetti Celebration
      try {
        confetti({
          particleCount: 110,
          spread: 75,
          origin: { y: 0.6 },
          colors: [
            activeEvent.heroTheme.accentColor || "#E23636",
            "#F59E0B",
            "#38BDF8",
            "#FFFFFF",
          ],
        });
      } catch (err) {
        // Fallback gracefully
      }
    }, 700);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="reg-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-hidden bg-black/85 backdrop-blur-md animate-in fade-in duration-200"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      {/* 3D Perspective Stage: Rock-solid center alignment, fixed dimensions */}
      <div className="relative w-full max-w-3xl lg:max-w-4xl h-[88vh] max-h-[820px] min-h-[580px] [perspective:1800px]">
        {/* 3D Flipper Container */}
        <div
          className={`relative w-full h-full transition-transform duration-700 ease-out [transform-style:preserve-3d] ${
            isFlipped ? "[transform:rotateY(180deg)]" : "[transform:rotateY(0deg)]"
          }`}
        >
          {/* ============================================================== */}
          {/* FRONT FACE: CINEMATIC HERO PROTOCOL POP-UP CARD */}
          {/* ============================================================== */}
          <div
            onClick={handleManualFlip}
            className={`absolute inset-0 w-full h-full rounded-3xl overflow-hidden [backface-visibility:hidden] [-webkit-backface-visibility:hidden] border shadow-2xl bg-[#070A14] select-none cursor-pointer flex flex-col justify-between transition-opacity duration-300 ${
              isFlipped ? "pointer-events-none opacity-0" : "pointer-events-auto opacity-100"
            }`}
            style={{
              borderColor: `${activeEvent.heroTheme.accentColor}99`,
              boxShadow: `0 25px 70px -10px ${activeEvent.heroTheme.glowColor}`,
            }}
          >
            {/* Full-bleed Hero Artwork Background */}
            <div className="absolute inset-0 z-0 overflow-hidden">
              <Image
                src={activeEvent.image}
                alt={activeEvent.title}
                fill
                priority
                sizes="(max-width: 640px) 100vw, 672px"
                className="object-cover object-center filter brightness-[0.95] contrast-110 scale-100 hover:scale-105 transition-transform duration-1000"
              />

              {/* Gradient Vignettes: Cinematic Contrast */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#04060C] via-[#04060C]/40 to-[#04060C]/85" />
              <div className="absolute inset-0 bg-radial from-transparent via-[#04060C]/25 to-[#04060C]/75" />

              {/* Ambient Glowing Hero Core */}
              <div
                className="absolute -bottom-20 -left-20 w-80 h-80 rounded-full blur-3xl opacity-40 pointer-events-none"
                style={{ backgroundColor: activeEvent.heroTheme.accentColor }}
              />
              <div
                className="absolute top-10 -right-20 w-72 h-72 rounded-full blur-3xl opacity-35 pointer-events-none"
                style={{ backgroundColor: activeEvent.heroTheme.accentColor }}
              />

              {/* High-Tech Animated Scan Line */}
              <div className="absolute inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-white/80 to-transparent animate-hero-scan pointer-events-none" />
            </div>

            {/* Front Header */}
            <div className="relative z-10 p-5 sm:p-6 flex items-center justify-between">
              {/* Brand Pill */}
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/80 border border-slate-700/80 backdrop-blur-md shadow-lg">
                <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
                <span className="text-[11px] font-mono-code font-bold tracking-widest text-slate-200">
                  TECHNIX 8.0 × MARVEL
                </span>
              </div>

              {/* Character Badge & Close Button */}
              <div className="flex items-center gap-2">
                <span
                  className="px-3 py-1 rounded-full text-xs font-mono-code font-black uppercase tracking-wider bg-black/85 border shadow-lg"
                  style={{
                    borderColor: activeEvent.heroTheme.accentColor,
                    color: activeEvent.heroTheme.accentColor,
                  }}
                >
                  ● {activeEvent.marvelCharacter}
                </span>

                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onClose();
                  }}
                  className="p-2 rounded-full bg-black/70 hover:bg-red-600 text-white transition-colors border border-white/20 cursor-pointer"
                  aria-label="Close modal"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Front Center: Holographic HUD Frame with Corner Reticles */}
            <div className="relative z-10 px-6 sm:px-8 pointer-events-none flex-1 flex flex-col justify-center items-center text-center">
              <div
                className="w-full max-w-sm p-4 rounded-2xl border border-dashed relative bg-black/40 backdrop-blur-xs"
                style={{ borderColor: `${activeEvent.heroTheme.accentColor}55` }}
              >
                {/* Corner Reticles */}
                <span className="absolute -top-1 -left-1 text-xs font-mono-code text-white/60">┌</span>
                <span className="absolute -top-1 -right-1 text-xs font-mono-code text-white/60">┐</span>
                <span className="absolute -bottom-1 -left-1 text-xs font-mono-code text-white/60">└</span>
                <span className="absolute -bottom-1 -right-1 text-xs font-mono-code text-white/60">┘</span>

                <span className="text-[10px] font-mono-code uppercase tracking-[0.25em] text-slate-300 block mb-1">
                  TACTICAL PROTOCOL REVEAL
                </span>
                <p className="font-heading text-lg sm:text-xl font-black text-white uppercase tracking-wider drop-shadow-[0_2px_12px_rgba(0,0,0,0.9)]">
                  {activeEvent.title.split("—")[0].trim()}
                </p>
                <p className="text-xs text-amber-300/90 italic font-sans mt-0.5">
                  &ldquo;{activeEvent.characterTitle}&rdquo;
                </p>
              </div>
            </div>

            {/* Front Footer: Event Info & Auto-Flip Progress Bar */}
            <div className="relative z-10 p-5 sm:p-7 bg-gradient-to-t from-black via-black/95 to-transparent backdrop-blur-md border-t border-slate-800/60">
              <div className="flex items-center justify-between gap-2 text-xs font-mono-code text-slate-300 mb-3">
                <span className="px-2.5 py-0.5 rounded-md bg-slate-900/90 border border-slate-700">
                  {activeEvent.category.toUpperCase()} ARENA
                </span>
                <span className="text-amber-400 font-bold">
                  {activeEvent.teamSize.label}
                </span>
              </div>

              {/* Progress bar label & action button */}
              <div className="flex items-center justify-between gap-3 mb-2">
                <div className="flex items-center gap-2">
                  <span
                    className="w-2 h-2 rounded-full animate-ping"
                    style={{ backgroundColor: activeEvent.heroTheme.accentColor }}
                  />
                  <span className="text-[11px] font-mono-code tracking-wider text-slate-300">
                    OPENING REGISTRATION TERMINAL...
                  </span>
                </div>

                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleManualFlip();
                  }}
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-heading font-black tracking-wider text-white bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-500 hover:to-pink-500 shadow-lg cursor-pointer hover:scale-105 active:scale-95 transition-all"
                >
                  <span>FLIP NOW</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Auto-flip 2.5s Progress Track */}
              <div className="w-full h-1.5 bg-slate-800/90 rounded-full overflow-hidden border border-slate-700/60">
                <div
                  className="h-full transition-all duration-75 rounded-full"
                  style={{
                    width: `${flipProgress}%`,
                    background: `linear-gradient(90deg, #E23636, ${activeEvent.heroTheme.accentColor}, #F59E0B)`,
                  }}
                />
              </div>
            </div>
          </div>

          {/* ============================================================== */}
          {/* BACK FACE: REGISTRATION TERMINAL (FORM / TICKET) */}
          {/* ============================================================== */}
          <div
            className={`absolute inset-0 w-full h-full rounded-3xl bg-[#070A14] border shadow-2xl text-slate-100 flex flex-col [backface-visibility:hidden] [-webkit-backface-visibility:hidden] [transform:rotateY(180deg)] overflow-hidden transition-opacity duration-300 ${
              !isFlipped ? "pointer-events-none opacity-0" : "pointer-events-auto opacity-100"
            }`}
            style={{
              borderColor: `${activeEvent.heroTheme.accentColor}55`,
              boxShadow: `0 20px 60px -15px ${activeEvent.heroTheme.glowColor}`,
            }}
          >
            {/* CINEMATIC THEME BACKGROUND */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-3xl z-0">
              <Image
                src={activeEvent.image}
                alt={activeEvent.title}
                fill
                sizes="(max-width: 768px) 100vw, 896px"
                className="object-cover object-center filter brightness-[0.28] contrast-125 scale-105 transition-all duration-700"
              />

              <div
                className="absolute inset-0"
                style={{
                  background: `linear-gradient(180deg, rgba(7, 10, 20, 0.88) 0%, rgba(6, 9, 18, 0.94) 40%, rgba(4, 6, 12, 0.98) 100%)`,
                }}
              />

              <div
                className="absolute -top-24 -left-24 w-96 h-96 rounded-full blur-3xl opacity-30 pointer-events-none transition-all duration-700"
                style={{ backgroundColor: activeEvent.heroTheme.accentColor }}
              />
              <div
                className="absolute -bottom-24 -right-24 w-96 h-96 rounded-full blur-3xl opacity-20 pointer-events-none transition-all duration-700"
                style={{ backgroundColor: activeEvent.heroTheme.accentColor }}
              />
            </div>

            {/* TOP HEADER CONTROLS (FLIP BACK & CLOSE) */}
            <div className="absolute top-4 right-4 z-30 flex items-center gap-2">
              <button
                type="button"
                onClick={handleFlipBack}
                title="Flip back to hero card"
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-full bg-black/60 hover:bg-slate-800 text-amber-300 hover:text-white transition-all border border-white/20 text-xs font-mono-code cursor-pointer backdrop-blur-md shadow-md"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">VIEW HERO CARD</span>
              </button>

              <button
                onClick={onClose}
                className="p-2.5 rounded-full bg-black/60 hover:bg-red-600/90 text-white transition-all border border-white/20 focus:outline-none focus:ring-2 focus:ring-red-400 cursor-pointer shadow-md"
                aria-label="Close registration modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* HERO HEADER: IMAGE BANNER & PROTOCOL METADATA (PINNED TOP) */}
            <div className="relative z-10 w-full p-5 sm:p-6 sm:pb-4 border-b border-slate-800/80 bg-slate-950/70 backdrop-blur-md flex-shrink-0">
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pr-16 sm:pr-24">
                {/* Left: Event Thumbnail & Character Dossier Badge */}
                <div className="flex items-start sm:items-center gap-4">
                  <div
                    className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-2xl overflow-hidden border-2 flex-shrink-0 shadow-lg cursor-pointer group"
                    style={{ borderColor: activeEvent.heroTheme.accentColor }}
                    onClick={handleFlipBack}
                    title="Click to view hero card"
                  >
                    <Image
                      src={activeEvent.image}
                      alt={activeEvent.title}
                      fill
                      className="object-cover object-center group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                      <RotateCcw className="w-5 h-5 text-white" />
                    </div>
                  </div>

                  <div>
                    <div className="inline-flex items-center gap-2 px-3 py-0.5 rounded-full bg-black/70 border border-slate-700 text-[11px] font-mono-code text-amber-400 mb-1.5 backdrop-blur-md">
                      <span
                        className="w-2 h-2 rounded-full animate-pulse"
                        style={{ backgroundColor: activeEvent.heroTheme.accentColor }}
                      />
                      <span>{activeEvent.category.toUpperCase()} PROTOCOL</span>
                      <span>•</span>
                      <span className="text-white font-bold">
                        {activeEvent.marvelCharacter}
                      </span>
                    </div>

                    <h2
                      id="reg-modal-title"
                      className="font-heading text-xl sm:text-2xl md:text-3xl font-black uppercase text-white tracking-wide drop-shadow-md"
                    >
                      {activeEvent.title}
                    </h2>
                    <p className="text-xs sm:text-sm text-slate-300 italic font-sans mt-0.5">
                      &ldquo;{activeEvent.characterTitle}&rdquo;
                    </p>
                  </div>
                </div>

                {/* Right: Protocol Switcher dropdown */}
                <div className="w-full md:w-auto flex flex-col items-start md:items-end">
                  <span className="text-[10px] font-mono-code text-slate-400 uppercase tracking-widest mb-1">
                    SWITCH PROTOCOL:
                  </span>
                  <div className="relative w-full sm:w-64">
                    <select
                      value={activeEvent.id}
                      onChange={(e) => handleSwitchEvent(e.target.value)}
                      className="w-full appearance-none pl-3 pr-8 py-1.5 rounded-xl bg-slate-900/90 border border-slate-700 text-xs font-tech font-bold text-slate-200 focus:outline-none focus:border-red-500 cursor-pointer"
                    >
                      {eventsData.map((ev) => (
                        <option key={ev.id} value={ev.id}>
                          {ev.title.split("—")[0].trim()} ({ev.marvelCharacter.split("—")[0].trim()})
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400 pointer-events-none" />
                  </div>
                </div>
              </div>

              {/* Quick Stats Strip */}
              <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-3 pt-3 border-t border-slate-800/80 text-xs font-mono-code">
                <div className="flex items-center gap-2">
                  <Users className="w-3.5 h-3.5 text-cyan-400" />
                  <div>
                    <span className="text-slate-400 block text-[10px]">FORMAT</span>
                    <span className="text-white font-bold">{activeEvent.teamSize.label}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Award className="w-3.5 h-3.5 text-amber-400" />
                  <div>
                    <span className="text-slate-400 block text-[10px]">ENTRY FEE</span>
                    <span className="text-amber-300 font-bold">{activeEvent.registrationFee}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Calendar className="w-3.5 h-3.5 text-red-400" />
                  <div>
                    <span className="text-slate-400 block text-[10px]">SCHEDULE</span>
                    <span className="text-slate-200 font-bold">{activeEvent.scheduleTime}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                  <div>
                    <span className="text-slate-400 block text-[10px]">SECTOR VENUE</span>
                    <span className="text-slate-200 font-bold truncate max-w-[130px] block" title={activeEvent.venue}>
                      {activeEvent.venue}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* MODAL BODY CONTENT (SCROLLABLE FORM / TICKET) */}
            <div className="relative z-10 p-5 sm:p-8 flex-1 overflow-y-auto">
          {ticketData ? (
            /* ============================================================== */
            /* SUCCESS STATE: HOLOGRAPHIC FESTIVAL PROTOCOL PASS */
            /* ============================================================== */
            <div className="space-y-6 animate-in zoom-in-95 duration-300">
              <div
                className="p-6 sm:p-8 rounded-3xl bg-slate-950/90 border shadow-2xl relative overflow-hidden"
                style={{
                  borderColor: activeEvent.heroTheme.accentColor,
                  boxShadow: `0 0 35px ${activeEvent.heroTheme.glowColor}`,
                }}
              >
                {/* Holographic Watermark Shield */}
                <div className="absolute top-0 right-0 p-6 opacity-10 pointer-events-none">
                  <Shield className="w-56 h-56 text-white" />
                </div>

                <div className="relative z-10">
                  {/* Pass Header */}
                  <div className="flex flex-wrap items-center justify-between gap-4 pb-5 border-b border-slate-800">
                    <div className="flex items-center gap-3">
                      <div
                        className="w-12 h-12 rounded-2xl flex items-center justify-center text-white font-heading font-black text-xl shadow-lg"
                        style={{ backgroundColor: activeEvent.heroTheme.accentColor }}
                      >
                        TX8
                      </div>
                      <div>
                        <h3 className="font-heading text-lg sm:text-xl font-black text-white uppercase tracking-wider">
                          OFFICIAL ADMISSION PROTOCOL PASS
                        </h3>
                        <span className="font-mono-code text-xs text-amber-400 font-bold">
                          {festConfig.name} • {festConfig.edition}
                        </span>
                      </div>
                    </div>

                    <div className="text-left sm:text-right">
                      <span className="font-mono-code text-[11px] text-slate-400 block uppercase">
                        SECURITY PASSCODE
                      </span>
                      <span
                        className="font-heading text-xl sm:text-2xl font-black tracking-widest"
                        style={{ color: activeEvent.heroTheme.accentColor }}
                      >
                        {ticketData.passCode}
                      </span>
                    </div>
                  </div>

                  {/* Pass Details Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 py-5 border-b border-slate-800 text-sm">
                    <div>
                      <span className="font-mono-code text-[10px] text-slate-500 uppercase block">
                        CONFIRMED PROTOCOL
                      </span>
                      <span className="font-heading text-base font-bold text-white block mt-0.5">
                        {ticketData.eventTitle}
                      </span>
                      <span
                        className="text-xs font-mono-code font-bold"
                        style={{ color: activeEvent.heroTheme.accentColor }}
                      >
                        {activeEvent.marvelCharacter}
                      </span>
                    </div>

                    <div>
                      <span className="font-mono-code text-[10px] text-slate-500 uppercase block">
                        PRIMARY CANDIDATE / LEAD
                      </span>
                      <span className="font-bold text-slate-100 block mt-0.5">
                        {ticketData.leadName}
                      </span>
                      <span className="text-xs text-slate-400 font-mono-code">
                        {ticketData.email} • {ticketData.phone}
                      </span>
                    </div>

                    <div>
                      <span className="font-mono-code text-[10px] text-slate-500 uppercase block">
                        INSTITUTION &amp; BRANCH
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
                        <span className="font-mono-code text-[10px] text-slate-500 uppercase block">
                          TEAM CODENAME
                        </span>
                        <span className="font-bold text-cyan-400 mt-0.5 block">
                          {ticketData.teamName}
                        </span>
                      </div>
                    )}

                    {ticketData.members.length > 0 && (
                      <div className="sm:col-span-2">
                        <span className="font-mono-code text-[10px] text-slate-500 uppercase block mb-1">
                          REGISTERED SQUAD MEMBERS ({ticketData.members.length + 1} TOTAL)
                        </span>
                        <div className="flex flex-wrap gap-1.5">
                          {ticketData.members.map((m, idx) => (
                            <span
                              key={idx}
                              className="px-2.5 py-0.5 rounded-lg bg-slate-900 border border-slate-700 text-xs font-mono-code text-slate-300"
                            >
                              Ally #{idx + 2}: {m}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Pass Security Barcode */}
                  <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div>
                      <div className="font-mono-code text-base tracking-[6px] text-slate-400 select-none">
                        ||| | |||| | ||||| || ||| ||||
                      </div>
                      <span className="font-mono-code text-[10px] text-slate-500">
                        HASH: {ticketData.id} • PRESENT VALID COLLEGE PHOTO ID AT REPORTING
                      </span>
                    </div>

                    <div className="flex items-center gap-3 w-full sm:w-auto">
                      <button
                        onClick={handlePrint}
                        className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white border border-slate-700 text-xs font-heading font-bold cursor-pointer transition-colors"
                      >
                        <Printer className="w-3.5 h-3.5 text-cyan-400" />
                        PRINT PASS
                      </button>

                      <button
                        onClick={() => {
                          setTicketData(null);
                        }}
                        className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl text-white text-xs font-heading font-extrabold cursor-pointer transition-all shadow-md"
                        style={{
                          background: `linear-gradient(135deg, ${activeEvent.heroTheme.accentColor}, #b91c1c)`,
                        }}
                      >
                        <Sparkles className="w-3.5 h-3.5" />
                        REGISTER ANOTHER
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Close Button below pass */}
              <div className="text-center pt-2">
                <button
                  onClick={onClose}
                  className="px-6 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-700 text-xs font-heading font-bold cursor-pointer"
                >
                  CLOSE &amp; RETURN TO EVENTS
                </button>
              </div>
            </div>
          ) : (
            /* ============================================================== */
            /* REGISTRATION FORM (THEMED) */
            /* ============================================================== */
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Notice Banner */}
              <div className="flex items-center gap-3 p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 text-xs text-slate-300 backdrop-blur-md">
                <Zap className="w-4 h-4 flex-shrink-0" style={{ color: activeEvent.heroTheme.accentColor }} />
                <span>
                  Registering for <strong className="text-white">{activeEvent.title}</strong> under the{" "}
                  <strong style={{ color: activeEvent.heroTheme.accentColor }}>{activeEvent.marvelCharacter}</strong> directive.
                </span>
              </div>

              {/* SECTION 1: PRIMARY CANDIDATE / LEAD */}
              <div className="p-5 rounded-2xl bg-slate-950/70 border border-slate-800/90 backdrop-blur-md space-y-4">
                <div className="flex items-center gap-2 border-b border-slate-800/80 pb-2">
                  <User className="w-4 h-4" style={{ color: activeEvent.heroTheme.accentColor }} />
                  <h3 className="font-heading text-xs font-bold uppercase tracking-wider text-amber-400">
                    1. PRIMARY CANDIDATE / TEAM LEAD CREDENTIALS
                  </h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Full Name */}
                  <div>
                    <label className="block text-xs font-mono-code text-slate-300 mb-1">
                      Full Legal Name *
                    </label>
                    <div className="relative">
                      <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                      <input
                        type="text"
                        required
                        value={leadName}
                        onChange={(e) => setLeadName(e.target.value)}
                        placeholder="e.g. Tony Stark"
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900/90 border border-slate-700/80 text-white text-xs sm:text-sm focus:outline-none focus:border-red-500 transition-colors"
                      />
                    </div>
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-xs font-mono-code text-slate-300 mb-1">
                      Email Address *
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="tony@stark.edu"
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900/90 border border-slate-700/80 text-white text-xs sm:text-sm focus:outline-none focus:border-red-500 transition-colors"
                      />
                    </div>
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="block text-xs font-mono-code text-slate-300 mb-1">
                      WhatsApp / Phone Number *
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                      <input
                        type="tel"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="+91 98765 43210"
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900/90 border border-slate-700/80 text-white text-xs sm:text-sm focus:outline-none focus:border-red-500 transition-colors"
                      />
                    </div>
                  </div>

                  {/* Year of Study */}
                  <div>
                    <label className="block text-xs font-mono-code text-slate-300 mb-1">
                      Current Year of Study *
                    </label>
                    <select
                      value={yearOfStudy}
                      onChange={(e) => setYearOfStudy(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-900/90 border border-slate-700/80 text-white text-xs sm:text-sm focus:outline-none focus:border-red-500 transition-colors"
                    >
                      <option value="1st Year UG">1st Year UG</option>
                      <option value="2nd Year UG">2nd Year UG</option>
                      <option value="3rd Year UG">3rd Year UG</option>
                      <option value="4th Year UG">4th Year UG</option>
                      <option value="Postgraduate / MCA / MSc">Postgraduate / MCA / MSc</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* SECTION 2: INSTITUTION DETAILS */}
              <div className="p-5 rounded-2xl bg-slate-950/70 border border-slate-800/90 backdrop-blur-md space-y-4">
                <div className="flex items-center gap-2 border-b border-slate-800/80 pb-2">
                  <School className="w-4 h-4" style={{ color: activeEvent.heroTheme.accentColor }} />
                  <h3 className="font-heading text-xs font-bold uppercase tracking-wider text-amber-400">
                    2. INSTITUTION &amp; ACADEMIC BRANCH
                  </h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* College Name */}
                  <div>
                    <label className="block text-xs font-mono-code text-slate-300 mb-1">
                      College / University Name *
                    </label>
                    <div className="relative">
                      <School className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                      <input
                        type="text"
                        required
                        value={collegeName}
                        onChange={(e) => setCollegeName(e.target.value)}
                        placeholder="e.g. Apex Institute of Engineering"
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900/90 border border-slate-700/80 text-white text-xs sm:text-sm focus:outline-none focus:border-red-500 transition-colors"
                      />
                    </div>
                  </div>

                  {/* Department */}
                  <div>
                    <label className="block text-xs font-mono-code text-slate-300 mb-1">
                      Department / Branch *
                    </label>
                    <input
                      type="text"
                      required
                      value={department}
                      onChange={(e) => setDepartment(e.target.value)}
                      placeholder="e.g. Computer Science / IT / AI & DS"
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-900/90 border border-slate-700/80 text-white text-xs sm:text-sm focus:outline-none focus:border-red-500 transition-colors"
                    />
                  </div>
                </div>
              </div>

              {/* SECTION 3: SQUAD DETAILS (IF TEAM SIZE > 1) */}
              {activeEvent.teamSize.max > 1 && (
                <div className="p-5 rounded-2xl bg-slate-950/70 border border-slate-800/90 backdrop-blur-md space-y-4">
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800/80 pb-2">
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4" style={{ color: activeEvent.heroTheme.accentColor }} />
                      <h3 className="font-heading text-xs font-bold uppercase tracking-wider text-amber-400">
                        3. SQUAD ALLIES ({activeEvent.teamSize.label})
                      </h3>
                    </div>

                    <span className="text-[11px] font-mono-code text-slate-400">
                      Team Capacity: {1 + members.length} / {activeEvent.teamSize.max} Max
                    </span>
                  </div>

                  {/* Team Codename */}
                  <div>
                    <label className="block text-xs font-mono-code text-slate-300 mb-1">
                      Squad / Team Codename (Optional)
                    </label>
                    <input
                      type="text"
                      value={teamName}
                      onChange={(e) => setTeamName(e.target.value)}
                      placeholder="e.g. The Avengers Initiative"
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-900/90 border border-slate-700/80 text-white text-xs sm:text-sm focus:outline-none focus:border-red-500 transition-colors"
                    />
                  </div>

                  {/* Additional Members List */}
                  {members.map((member, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <div className="flex-1">
                        <label className="block text-[11px] font-mono-code text-slate-400 mb-1">
                          Ally #{idx + 2} Full Name *
                        </label>
                        <input
                          type="text"
                          required
                          value={member}
                          onChange={(e) => handleMemberChange(idx, e.target.value)}
                          placeholder={`Ally ${idx + 2} Name`}
                          className="w-full px-4 py-2 rounded-xl bg-slate-900/90 border border-slate-700/80 text-white text-xs sm:text-sm focus:outline-none focus:border-red-500 transition-colors"
                        />
                      </div>

                      <button
                        type="button"
                        onClick={() => handleRemoveMember(idx)}
                        className="mt-5 p-2.5 rounded-xl bg-red-950/60 hover:bg-red-900/80 text-red-300 border border-red-500/30 transition-colors cursor-pointer"
                        aria-label={`Remove ally ${idx + 2}`}
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}

                  {/* Add Member Button */}
                  {members.length < maxAdditionalMembers && (
                    <button
                      type="button"
                      onClick={handleAddMember}
                      className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-xs font-mono-code text-slate-300 border border-slate-700 cursor-pointer transition-colors"
                    >
                      <Plus className="w-3.5 h-3.5 text-amber-400" />
                      <span>Add Squad Ally ({members.length + 1}/{maxAdditionalMembers})</span>
                    </button>
                  )}
                </div>
              )}

              {/* SECTION 4: TERMS & CONDITIONS CHECKBOX */}
              <div className="flex items-start gap-3 p-4 rounded-xl bg-slate-900/60 border border-slate-800 text-xs text-slate-300">
                <input
                  id="reg-terms-check"
                  type="checkbox"
                  required
                  checked={agreedToTerms}
                  onChange={(e) => setAgreedToTerms(e.target.checked)}
                  className="mt-0.5 w-4 h-4 rounded border-slate-700 text-red-600 focus:ring-red-500 focus:ring-offset-slate-900 cursor-pointer"
                />
                <label htmlFor="reg-terms-check" className="cursor-pointer select-none leading-relaxed">
                  I agree to abide by all the rules and guidelines for <strong className="text-white">{activeEvent.title}</strong>, present valid student identification at reporting time, and maintain fair play throughout the protocol.
                </label>
              </div>

              {/* ACTION FOOTER */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-300 text-xs font-heading font-bold cursor-pointer transition-colors"
                >
                  CANCEL
                </button>

                <button
                  type="submit"
                  disabled={isSubmitting || !agreedToTerms}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3 rounded-xl text-white text-xs sm:text-sm font-heading font-black tracking-wider uppercase shadow-xl transition-all hover:scale-105 disabled:opacity-50 disabled:hover:scale-100 cursor-pointer"
                  style={{
                    background: `linear-gradient(135deg, ${activeEvent.heroTheme.accentColor}, #b91c1c)`,
                    boxShadow: `0 8px 25px ${activeEvent.heroTheme.glowColor}`,
                  }}
                >
                  <Zap className="w-4 h-4 text-amber-300" />
                  {isSubmitting
                    ? "COMMISSIONING PROTOCOL PASS..."
                    : `CONFIRM REGISTRATION FOR ${activeEvent.title.split("—")[0].trim().toUpperCase()}`}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  </div>

  <style jsx>{`
    @keyframes heroScan {
      0% {
        top: 0%;
        opacity: 0;
      }
      25%, 75% {
        opacity: 0.85;
      }
      100% {
        top: 100%;
        opacity: 0;
      }
    }
    .animate-hero-scan {
      animation: heroScan 2.2s ease-in-out infinite;
    }
  `}</style>
</div>
  );
}
