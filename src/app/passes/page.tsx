"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Navbar from "@/components/Navbar";
import RegistrationSection from "@/components/RegistrationSection";
import Footer from "@/components/Footer";

function PassesContent() {
  const searchParams = useSearchParams();
  const eventParam = searchParams.get("event");
  const [selectedEventId, setSelectedEventId] = useState<string | null>(eventParam);

  useEffect(() => {
    if (eventParam) {
      setSelectedEventId(eventParam);
    }
  }, [eventParam]);

  return (
    <RegistrationSection
      preSelectedEventId={selectedEventId}
      onClearPreSelected={() => setSelectedEventId(null)}
    />
  );
}

export default function PassesPage() {
  return (
    <div className="min-h-screen bg-[#04060C] text-slate-100 flex flex-col selection:bg-pink-600 selection:text-white">
      <Navbar />

      <main className="flex-1 pt-20">
        <Suspense
          fallback={
            <div className="py-24 text-center text-slate-400 font-mono-code text-sm">
              INITIALIZING REGISTRATION PORTAL...
            </div>
          }
        >
          <PassesContent />
        </Suspense>
      </main>

      <Footer />
    </div>
  );
}
