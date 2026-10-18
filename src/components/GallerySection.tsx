"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { galleryData } from "@/data/galleryData";
import { GalleryItem } from "@/types";
import { Camera, X, ChevronLeft, ChevronRight, Eye, Sparkles } from "lucide-react";

export default function GallerySection() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [activeItem, setActiveItem] = useState<GalleryItem | null>(null);

  const categories = ["All", "Technical", "Cultural", "Gaming", "Behind The Scenes"];

  const filteredItems = galleryData.filter((item) =>
    selectedCategory === "All" ? true : item.category === selectedCategory
  );

  // Lightbox keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!activeItem) return;
      if (e.key === "Escape") setActiveItem(null);
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "ArrowRight") handleNext();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeItem, filteredItems]);

  const handlePrev = () => {
    if (!activeItem) return;
    const currentIndex = filteredItems.findIndex((i) => i.id === activeItem.id);
    const prevIndex = (currentIndex - 1 + filteredItems.length) % filteredItems.length;
    setActiveItem(filteredItems[prevIndex]);
  };

  const handleNext = () => {
    if (!activeItem) return;
    const currentIndex = filteredItems.findIndex((i) => i.id === activeItem.id);
    const nextIndex = (currentIndex + 1) % filteredItems.length;
    setActiveItem(filteredItems[nextIndex]);
  };

  return (
    <section id="gallery" className="relative py-24 px-4 bg-[#05070B] overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-slate-900 border border-red-500/30 text-red-400 font-mono-code text-xs tracking-widest uppercase mb-4">
            <Camera className="w-3.5 h-3.5 text-red-400" />
            VISUAL CHRONICLES // FLASHBACKS
          </div>

          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-black uppercase text-metallic-silver tracking-tight mb-4">
            CINEMATIC <span className="text-metallic-red">GALLERY</span>
          </h2>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Flashbacks and moments of adrenaline, celebration, hardware triumphs, and team bonds across previous editions.
          </p>

          <p className="text-amber-400/80 text-xs font-mono-code mt-2">
            [NOTE: Represented using high-resolution demo photography until current fest coverage is uploaded]
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-tech font-bold tracking-wide transition-all ${
                selectedCategory === cat
                  ? "bg-red-600 text-white shadow-lg shadow-red-950 glow-red border border-red-400/60"
                  : "bg-slate-900 text-slate-400 hover:text-white hover:bg-slate-800 border border-slate-800"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Masonry / Grid Gallery */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              onClick={() => setActiveItem(item)}
              className="group relative rounded-2xl overflow-hidden bg-slate-950 border border-slate-800/90 hover:border-red-500/60 cursor-pointer shadow-xl transition-all duration-300 hover:-translate-y-1.5"
            >
              <div className="relative w-full h-64 sm:h-72">
                <Image
                  src={item.imageUrl}
                  alt={item.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500 filter brightness-90 group-hover:brightness-100"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-80 group-hover:opacity-60 transition-opacity" />

                {/* Category Pill */}
                <div className="absolute top-3 left-3 px-2 py-0.5 rounded-md bg-black/70 backdrop-blur-md border border-white/10 text-[10px] font-mono-code text-amber-300">
                  {item.category}
                </div>

                {/* Inspect Overlay Icon */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="w-12 h-12 rounded-full bg-red-600/90 text-white flex items-center justify-center shadow-lg shadow-red-950 glow-red">
                    <Eye className="w-5 h-5" />
                  </div>
                </div>

                {/* Title & Caption Bar */}
                <div className="absolute bottom-3 left-3 right-3">
                  <h4 className="font-heading text-sm font-bold text-white truncate drop-shadow">
                    {item.title}
                  </h4>
                  <span className="font-mono-code text-[10px] text-slate-400 block mt-0.5">
                    {item.year}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Interactive Lightbox Modal */}
      {activeItem && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/95 backdrop-blur-lg animate-in fade-in duration-200"
        >
          {/* Close Button */}
          <button
            onClick={() => setActiveItem(null)}
            className="absolute top-4 right-4 z-50 p-3 rounded-full bg-slate-900/80 hover:bg-red-600 text-white transition-colors border border-slate-700"
            aria-label="Close Lightbox"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Previous Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              handlePrev();
            }}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-50 p-3 rounded-full bg-slate-900/80 hover:bg-slate-800 text-white transition-colors border border-slate-700"
            aria-label="Previous Image"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* Next Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleNext();
            }}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-50 p-3 rounded-full bg-slate-900/80 hover:bg-slate-800 text-white transition-colors border border-slate-700"
            aria-label="Next Image"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Lightbox Content Container */}
          <div className="relative max-w-5xl max-h-[85vh] w-full flex flex-col items-center">
            <div className="relative w-full h-[65vh] rounded-2xl overflow-hidden bg-slate-950 border border-slate-800">
              <Image
                src={activeItem.imageUrl}
                alt={activeItem.title}
                fill
                className="object-contain"
                priority
              />
            </div>

            <div className="mt-4 text-center max-w-xl">
              <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded bg-slate-900 text-[10px] font-mono-code text-amber-400 mb-1 border border-slate-800">
                {activeItem.category} • {activeItem.year}
              </div>
              <h3 className="font-heading text-lg font-bold text-white">
                {activeItem.title}
              </h3>
              <p className="text-slate-400 text-xs sm:text-sm mt-1">
                {activeItem.description}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
