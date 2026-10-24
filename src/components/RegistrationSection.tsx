"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import confetti from "canvas-confetti";
import { eventsData } from "@/data/eventsData";
import { festConfig } from "@/data/festConfig";
import { RegistrationSubmission } from "@/types";
import { Shield, Zap, CheckCircle2, AlertTriangle, Download, Printer, User, Mail, Phone, School, Users, Ticket, Calendar, MapPin, Award } from "lucide-react";

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
  const [ticketData, setTicketData] = useState<RegistrationSubmission | null>(null);

  const [prevPreSelected, setPrevPreSelected] = useState<string | null>(preSelectedEventId || null);
  if (preSelectedEventId && preSelectedEventId !== prevPreSelected) {
    setPrevPreSelected(preSelectedEventId);
    setSelectedEventId(preSelectedEventId);
  }

  const currentEvent = eventsData.find((e) => e.id === selectedEventId) || eventsData[0];
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
      const passCode = `TX8-${currentEvent.marvelCharacter.slice(0, 4).toUpperCase().replace(/[^A-Z]/g, "")}-${Math.floor(1000 + Math.random() * 9000)}`;

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

      // Trigger Confetti Blast
      try {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
          colors: ["#E23636", "#F59E0B", "#38BDF8", "#FFFFFF"],
        });
      } catch (err) {
        // graceful fallback if canvas blocked
      }
    }, 800);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <section id="register" className="relative py-24 px-4 bg-[#070912] border-t border-slate-900 overflow-hidden transition-colors duration-700">
      {/* Background Hero Artwork & Atmospheric Glow */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <Image
          src={currentEvent.image}
          alt={currentEvent.title}
          fill
          priority
          className="object-cover object-center filter brightness-[0.22] contrast-125 scale-105 transition-all duration-700"
        />
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(180deg, rgba(7, 9, 18, 0.88) 0%, rgba(6, 8, 16, 0.94) 40%, rgba(4, 6, 12, 0.98) 100%)`,
          }}
        />
        <div
          className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[750px] h-[450px] rounded-full blur-3xl opacity-25 pointer-events-none transition-all duration-700"
          style={{ backgroundColor: currentEvent.heroTheme.accentColor }}
        />
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-slate-900 border border-red-500/30 text-red-400 font-mono-code text-xs tracking-widest uppercase mb-4">
            <Zap className="w-3.5 h-3.5 text-amber-400" />
            OFFICIAL REGISTRATION PORTAL
          </div>

          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-black uppercase text-metallic-silver tracking-tight mb-4">
            ASSEMBLE <span className="text-metallic-red">YOUR TEAM</span>
          </h2>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Reserve your access badge for TECHNIX 8.0. Fill in your institutional credentials to generate your official festival protocol pass.
          </p>

          <div className="mt-3 inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-amber-950/40 border border-amber-500/40 text-[11px] font-mono-code text-amber-300">
            <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
            <span>DEV / PRE-EVENT REGISTRATION SIMULATOR [CONFIRMATION VERIFIED]</span>
          </div>
        </div>

        {/* If Ticket Generated -> Holographic Ticket View */}
        {ticketData ? (
          <div
            className="p-6 sm:p-10 rounded-3xl bg-slate-950/95 border shadow-2xl relative overflow-hidden animate-in zoom-in-95 duration-300"
            style={{
              borderColor: currentEvent.heroTheme.accentColor,
              boxShadow: `0 0 40px ${currentEvent.heroTheme.glowColor}`,
            }}
          >
            {/* Holographic Watermark Pattern */}
            <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
              <Shield className="w-64 h-64 text-red-500" />
            </div>

            <div className="relative z-10">
              <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-slate-800">
                <div className="flex items-center gap-3">
                  <div
                    className="w-12 h-12 rounded-2xl flex items-center justify-center text-white font-heading font-black text-xl shadow-lg"
                    style={{ backgroundColor: currentEvent.heroTheme.accentColor }}
                  >
                    TX8
                  </div>
                  <div>
                    <h3 className="font-heading text-xl sm:text-2xl font-black text-white uppercase">
                      OFFICIAL ADMISSION PASS
                    </h3>
                    <span className="font-mono-code text-xs text-amber-400 font-bold">
                      {festConfig.name} • {festConfig.edition}
                    </span>
                  </div>
                </div>

                <div className="text-right">
                  <span className="font-mono-code text-xs text-slate-400 block">PASSCODE ID</span>
                  <span className="font-heading text-lg sm:text-xl font-black text-cyan-400 tracking-wider">
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
                    <span className="font-bold text-cyan-400">{ticketData.teamName}</span>
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
                    className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white border border-slate-700 text-xs font-heading font-bold transition-colors"
                  >
                    <Printer className="w-4 h-4 text-cyan-400" />
                    PRINT PASS
                  </button>
                  <button
                    onClick={() => {
                      setTicketData(null);
                      if (onClearPreSelected) onClearPreSelected();
                    }}
                    className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-red-600 to-amber-600 text-white text-xs font-heading font-extrabold hover:from-red-500 hover:to-amber-500 transition-all shadow-md"
                  >
                    <Zap className="w-4 h-4 text-amber-300" />
                    REGISTER ANOTHER PROTOCOL
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* Registration Form */
          <form
            onSubmit={handleRegister}
            className="p-6 sm:p-10 rounded-3xl bg-slate-950/90 border backdrop-blur-md shadow-2xl space-y-8 transition-all duration-500"
            style={{
              borderColor: `${currentEvent.heroTheme.accentColor}55`,
              boxShadow: `0 20px 60px -15px ${currentEvent.heroTheme.glowColor}`,
            }}
          >
            {/* Event Selector */}
            <div>
              <label className="block text-xs font-mono-code text-amber-400 uppercase tracking-wider mb-2 font-bold">
                1. SELECT PROTOCOL / ARENA *
              </label>
              <select
                value={selectedEventId}
                onChange={(e) => setSelectedEventId(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-700 text-white text-sm sm:text-base font-tech font-bold focus:border-red-500 focus:outline-none cursor-pointer"
              >
                {eventsData.map((ev) => (
                  <option key={ev.id} value={ev.id}>
                    {ev.title} [{ev.marvelCharacter.split("—")[0].trim()}] — {ev.category}
                  </option>
                ))}
              </select>

              {/* Event Hero Theme Card Banner */}
              <div
                className="mt-4 p-4 rounded-2xl bg-slate-900/80 border flex flex-col sm:flex-row items-start sm:items-center gap-4 transition-all duration-300"
                style={{ borderColor: `${currentEvent.heroTheme.accentColor}66` }}
              >
                <div
                  className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden border-2 flex-shrink-0 shadow-lg"
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
                  <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-black/60 border border-slate-700 text-[10px] font-mono-code text-amber-400 mb-1">
                    <span
                      className="w-2 h-2 rounded-full animate-pulse"
                      style={{ backgroundColor: currentEvent.heroTheme.accentColor }}
                    />
                    <span>{currentEvent.category.toUpperCase()} PROTOCOL</span>
                    <span>•</span>
                    <span className="text-white font-bold">{currentEvent.marvelCharacter}</span>
                  </div>

                  <h3 className="font-heading text-base sm:text-lg font-black text-white uppercase tracking-wide">
                    {currentEvent.title}
                  </h3>
                  <p className="text-xs text-slate-300 italic font-sans">
                    &ldquo;{currentEvent.characterTitle}&rdquo;
                  </p>

                  <div className="mt-2 flex flex-wrap items-center gap-3 text-[11px] font-mono-code text-slate-400">
                    <span className="flex items-center gap-1 text-slate-200">
                      <Users className="w-3 h-3 text-cyan-400" />
                      {currentEvent.teamSize.label}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1 text-slate-200">
                      <Calendar className="w-3 h-3 text-red-400" />
                      {currentEvent.scheduleTime}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1 text-slate-200">
                      <MapPin className="w-3 h-3 text-emerald-400" />
                      {currentEvent.venue}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Team Lead Credentials */}
            <div>
              <label className="block text-xs font-mono-code text-amber-400 uppercase tracking-wider mb-4 font-bold">
                2. PRIMARY CANDIDATE / TEAM LEAD *
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono-code text-slate-400 mb-1">Full Name *</label>
                  <div className="relative">
                    <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                    <input
                      type="text"
                      required
                      value={leadName}
                      onChange={(e) => setLeadName(e.target.value)}
                      placeholder="e.g. Tony Stark"
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white text-sm focus:border-red-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono-code text-slate-400 mb-1">Email Address *</label>
                  <div className="relative">
                    <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="tony@starkindustries.org"
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white text-sm focus:border-red-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono-code text-slate-400 mb-1">WhatsApp / Phone *</label>
                  <div className="relative">
                    <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+91 98765 43210"
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white text-sm focus:border-red-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono-code text-slate-400 mb-1">Year of Study *</label>
                  <select
                    value={yearOfStudy}
                    onChange={(e) => setYearOfStudy(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white text-sm focus:border-red-500 focus:outline-none"
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

            {/* Institution Details */}
            <div>
              <label className="block text-xs font-mono-code text-amber-400 uppercase tracking-wider mb-4 font-bold">
                3. INSTITUTION &amp; SQUAD IDENTIFIER
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono-code text-slate-400 mb-1">College / University Name *</label>
                  <div className="relative">
                    <School className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                    <input
                      type="text"
                      required
                      value={collegeName}
                      onChange={(e) => setCollegeName(e.target.value)}
                      placeholder="e.g. Apex Institute of Engineering"
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white text-sm focus:border-red-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono-code text-slate-400 mb-1">Department / Branch *</label>
                  <input
                    type="text"
                    required
                    value={department}
                    onChange={(e) => setDepartment(e.target.value)}
                    placeholder="e.g. Computer Science / BCA / IT"
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white text-sm focus:border-red-500 focus:outline-none"
                  />
                </div>

                {currentEvent.teamSize.max > 1 && (
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-mono-code text-slate-400 mb-1">Team Name (Optional)</label>
                    <input
                      type="text"
                      value={teamName}
                      onChange={(e) => setTeamName(e.target.value)}
                      placeholder="e.g. Avengers Initiative / Stark Coders"
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white text-sm focus:border-red-500 focus:outline-none"
                    />
                  </div>
                )}
              </div>
            </div>

            {/* Dynamic Additional Team Members */}
            {maxAdditionalMembers > 0 && (
              <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800">
                <div className="flex items-center justify-between mb-3">
                  <span className="font-mono-code text-xs text-slate-300 font-bold uppercase">
                    ADDITIONAL TEAM MEMBERS ({members.length}/{maxAdditionalMembers})
                  </span>
                  {members.length < maxAdditionalMembers && (
                    <button
                      type="button"
                      onClick={addMemberField}
                      className="text-xs font-tech font-bold text-amber-400 hover:text-amber-300 transition-colors"
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
                          onChange={(e) => handleMemberChange(index, e.target.value)}
                          placeholder={`Team Member ${index + 2} Full Name`}
                          className="flex-1 px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs sm:text-sm focus:border-red-500 focus:outline-none"
                        />
                        <button
                          type="button"
                          onClick={() => removeMemberField(index)}
                          className="p-2 rounded-lg bg-slate-800 hover:bg-red-900/60 text-slate-400 hover:text-white text-xs"
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
                  className="mt-1 w-4 h-4 rounded bg-slate-900 border-slate-700 text-red-600 focus:ring-red-500"
                />
                <span className="text-xs text-slate-400 leading-relaxed font-sans">
                  I agree to abide by the TECHNIX 8.0 Fest Code of Conduct, confirm that all information provided is accurate, and understand that physical college ID cards must be presented at the check-in desk on fest day.
                </span>
              </label>
            </div>

            {/* Submit Button */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={isSubmitting || !agreedToTerms}
                className="w-full inline-flex items-center justify-center gap-2 py-4 rounded-xl text-white font-heading text-sm sm:text-base font-extrabold tracking-wider shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-[1.01] active:scale-[0.99] cursor-pointer"
                style={{
                  background: `linear-gradient(135deg, ${currentEvent.heroTheme.accentColor}, #b91c1c)`,
                  boxShadow: `0 8px 30px ${currentEvent.heroTheme.glowColor}`,
                }}
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
    </section>
  );
}
