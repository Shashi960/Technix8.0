"use client";

import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import EventsSection from "@/components/EventsSection";
import EventDetailModal from "@/components/EventDetailModal";
import Footer from "@/components/Footer";
import { FestEvent } from "@/types";
import { eventsData } from "@/data/eventsData";
import { usePageTransition } from "@/components/PageTransitionContext";

export default function SportsPage() {
  const [selectedEvent, setSelectedEvent] = useState<FestEvent | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const { navigateTo } = usePageTransition();

  const handleOpenEventDetails = (event: FestEvent) => {
    setSelectedEvent(event);
    setIsDetailModalOpen(true);
  };

  const handleOpenEventById = (eventId: string) => {
    const found = eventsData.find((e) => e.id === eventId);
    if (found) {
      setSelectedEvent(found);
      setIsDetailModalOpen(true);
    }
  };

  const handleSelectForRegistration = (eventId?: string) => {
    navigateTo("/passes", "OPENING PASSES & REGISTRATION...");
  };

  return (
    <div className="min-h-screen bg-[#04060C] text-slate-100 flex flex-col selection:bg-pink-600 selection:text-white">
      <Navbar />

      <main className="flex-1 pt-20">
        <EventsSection
          onOpenEventDetails={handleOpenEventDetails}
          onSelectForRegistration={handleSelectForRegistration}
          initialCategory="Gaming"
        />
      </main>

      <Footer onOpenEventDetails={handleOpenEventById} />

      <EventDetailModal
        event={selectedEvent}
        isOpen={isDetailModalOpen}
        onClose={() => setIsDetailModalOpen(false)}
        onSelectForRegistration={handleSelectForRegistration}
      />
    </div>
  );
}
