"use client";

import React from "react";
import Navbar from "@/components/Navbar";
import SponsorsSection from "@/components/SponsorsSection";
import GallerySection from "@/components/GallerySection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

export default function SponsorsPage() {
  return (
    <div className="min-h-screen bg-[#04060C] text-slate-100 flex flex-col selection:bg-pink-600 selection:text-white">
      <Navbar />

      <main className="flex-1 pt-20">
        <SponsorsSection />
        <GallerySection />
        <ContactSection />
      </main>

      <Footer />
    </div>
  );
}
