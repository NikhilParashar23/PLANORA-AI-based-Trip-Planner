"use client";
import { useRef } from "react";
import { CanvasScroller } from "@/components/animations/CanvasScroller";
import { Hero } from "@/components/sections/Hero";
import { MidTransition } from "@/components/sections/MidTransition";
import { Transition } from "@/components/sections/Transition";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { ItineraryEngine } from "@/components/sections/ItineraryEngine";
import { Footer } from "@/components/layout/Footer";

// 1. Updated to match your new folder name and .webp extension
const frames = Array.from({ length: 1264 }, (_, i) =>
  `/NewFrames/frame_${(i + 1).toString().padStart(4, '0')}.webp`
);

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <main className="relative">
      <div ref={containerRef} className="relative h-[550vh]">

        {/* Background sticking layer */}
        <div className="sticky top-0 h-screen w-full overflow-hidden z-0">
          <CanvasScroller frames={frames} containerRef={containerRef} />

          {/* FIXED: smooth overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/10 to-transparent z-10" />
        </div>

        {/* Content layer */}
        <div className="absolute top-0 left-0 w-full z-20">

          <div className="h-screen flex items-center justify-center">
            <Hero />
          </div>

          <div className="h-[50vh]" />

          {/* Reduced height for faster scrolling through MidTransition */}
          <div className="h-[32vh] flex items-center justify-center">
            <MidTransition />
          </div>

          <div className="h-[40vh]" />

          <div className="h-screen flex items-center justify-center">
            <Transition />
          </div>
        </div>
      </div>

      {/* STATIC SECTIONS */}
      <div className="relative z-30">
        <HowItWorks />

        {/* Removed the blueish gradient to let your 1264th frame show through */}
        <div className="text-white">
          <ItineraryEngine />
        </div>

        <Footer />
      </div>
    </main>
  );
}