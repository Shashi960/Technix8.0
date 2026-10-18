"use client";

import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import RegistrationSection from "@/components/RegistrationSection";
import Footer from "@/components/Footer";

export default function PassesPage() {
  const [selectedEventId, setSelectedEventId] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-[#04060C] text-slate-100 flex flex-col selection:bg-pink-600 selection:text-white">
      <Navbar />

      <main className="flex-1 pt-20">
        <RegistrationSection
          preSelectedEventId={selectedEventId}
          onClearPreSelected={() => setSelectedEventId(null)}
        />
      </main>

      <Footer />
    </div>
  );
}
