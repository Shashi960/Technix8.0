"use client";

import React from "react";
import Link from "next/link";
import { festConfig } from "@/data/festConfig";
import { eventsData } from "@/data/eventsData";
import { usePageTransition } from "./PageTransitionContext";
import TechnixGraffitiLogo from "./TechnixGraffitiLogo";
import { ArrowUp } from "lucide-react";

interface FooterProps {
  onOpenEventDetails?: (eventId: string) => void;
}

export default function Footer({ onOpenEventDetails }: FooterProps) {
  const { navigateTo } = usePageTransition();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Cultural Arena", href: "/cultural" },
    { name: "Sports & Gaming", href: "/sports" },
    { name: "All 9 Events", href: "/events" },
    { name: "Fest Schedule", href: "/schedule" },
    { name: "Passes & Registration", href: "/passes" },
    { name: "Sponsors & Partners", href: "/sponsors" },
  ];

  return (
    <footer className="relative bg-[#030509] border-t border-slate-900 text-slate-400 pt-16 pb-12 px-4 overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-900">
          {/* Brand & Mission Statement */}
          <div className="lg:col-span-2 space-y-4">
            <div className="w-36 h-auto">
              <TechnixGraffitiLogo mode="nav" className="w-full h-auto" glow={false} />
            </div>

            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed max-w-sm">
              The premier intercollegiate technical and cultural convergence celebrating innovation, coding mastery, esports tournaments, and creative arts.
            </p>

            <div className="pt-2 text-xs font-mono-code text-pink-400">
              <span>VENUE // {festConfig.institution.campus}, {festConfig.institution.city}</span>
            </div>
          </div>

          {/* Quick Nav Links */}
          <div>
            <h4 className="font-heading text-xs font-bold text-white uppercase tracking-wider mb-4">
              QUICK NAVIGATION
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm font-tech font-semibold">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <button
                    onClick={() => navigateTo(link.href, `OPENING ${link.name.toUpperCase()}...`)}
                    className="hover:text-pink-400 transition-colors text-left cursor-pointer"
                  >
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Events Quick List */}
          <div className="lg:col-span-2">
            <h4 className="font-heading text-xs font-bold text-white uppercase tracking-wider mb-4">
              9 FEATURED ARENAS
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2 text-xs font-mono-code">
              {eventsData.map((ev) => (
                <button
                  key={ev.id}
                  onClick={() => {
                    if (onOpenEventDetails) {
                      onOpenEventDetails(ev.id);
                    } else {
                      navigateTo("/events", `OPENING ${ev.title.toUpperCase()}...`);
                    }
                  }}
                  className="text-left text-slate-400 hover:text-pink-400 transition-colors truncate cursor-pointer"
                  title={ev.title}
                >
                  <span className="text-pink-500 mr-1.5 font-bold">›</span>
                  {ev.title}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Theme Disclaimer & Copyright */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-6 text-xs text-slate-500">
          <div className="max-w-2xl leading-relaxed text-center md:text-left">
            <p className="font-mono-code text-[11px] text-slate-500 mb-1 font-semibold uppercase">
              THE CONVERGENCE IS HERE:
            </p>
            <p className="text-[11px] text-slate-500 leading-normal">
              {festConfig.disclaimer}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4 flex-shrink-0">
            <span className="text-center sm:text-right font-mono-code text-[11px]">
              © 2026 {festConfig.name} • All Rights Reserved.
            </span>
            <button
              onClick={scrollToTop}
              className="p-2 rounded-xl bg-slate-900 hover:bg-pink-600 text-slate-400 hover:text-white transition-colors border border-slate-800 cursor-pointer"
              aria-label="Scroll back to top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
