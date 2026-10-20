"use client";

import React, { useState, useEffect, useCallback } from "react";
import Navbar from "@/components/Navbar";
import EventsSection from "@/components/EventsSection";
import EventDetailModal from "@/components/EventDetailModal";
import Footer from "@/components/Footer";
import EventsLoading from "@/components/EventsLoading";
import { FestEvent } from "@/types";
import { eventsData } from "@/data/eventsData";
import { usePageTransition } from "@/components/PageTransitionContext";

export default function EventsPage() {
  const [selectedEvent, setSelectedEvent] = useState<FestEvent | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const { navigateTo } = usePageTransition();

  // Events Loading Lifecycle
  const [isLoading, setIsLoading] = useState(true);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [loadError, setLoadError] = useState<string | null>(null);

  const loadEventResources = useCallback(async () => {
    try {
      setIsLoading(true);
      setIsFadingOut(false);
      setLoadError(null);

      // Verify event dataset integrity
      if (!eventsData || eventsData.length === 0) {
        throw new Error("No event protocols were found in the local dossier.");
      }

      // Cinematic portal summon duration (850ms) to experience the golden vortex without stalling
      await new Promise((resolve) => setTimeout(resolve, 850));

      // Smooth fade-out into the Events arena
      setIsFadingOut(true);
      setTimeout(() => {
        setIsLoading(false);
      }, 450);
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : "Failed to summon event protocols.";
      setLoadError(message);
    }
  }, []);

  useEffect(() => {
    loadEventResources();
  }, [loadEventResources]);

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

  const handleSelectForRegistration = (_eventId?: string) => {
    navigateTo("/passes", "OPENING PASSES & REGISTRATION...");
  };

  return (
    <div className="min-h-screen bg-[#04060C] text-slate-100 flex flex-col selection:bg-pink-600 selection:text-white">
      {/* Golden Spark Vortex Portal Loading Animation (Active only during Events Loading) */}
      {isLoading && (
        <EventsLoading
          error={loadError}
          onRetry={loadEventResources}
          isFadingOut={isFadingOut}
        />
      )}

      <Navbar />

      <main className="flex-1 pt-20">
        <EventsSection
          onOpenEventDetails={handleOpenEventDetails}
          onSelectForRegistration={handleSelectForRegistration}
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
