"use client";

import { useRef } from "react";
import { CanvasScroller } from "@/components/animations/CanvasScroller";
import { Hero } from "@/components/sections/Hero";
import { MidTransition } from "@/components/sections/MidTransition";
import { Transition } from "@/components/sections/Transition";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { ItineraryEngine } from "@/components/sections/ItineraryEngine";
import { Footer } from "@/components/layout/Footer";

const frames = Array.from({ length: 1264 }, (_, i) =>
  `/NewFrames/frame_${(i + 1).toString().padStart(4, "0")}.webp`
);

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <main className="relative">
      <div ref={containerRef} className="relative h-[550vh]">

        {/* Background */}
        <div className="sticky top-0 h-screen w-full overflow-hidden z-0">
          <CanvasScroller frames={frames} containerRef={containerRef} />

        </div>

        {/* Scroll Content */}
        <div className="absolute top-0 left-0 w-full z-20">

          <div className="h-[100vh] flex items-center justify-center">
            <Hero />
          </div>

          <div className="h-[150vh]" />

          <div className="h-[100vh] flex items-center justify-center">
            <MidTransition />
          </div>

          <div className="h-[63vh]" />

          <div className="h-[137vh] flex items-center justify-center">
            <Transition />
          </div>

        </div>
      </div>

      {/* Static Sections */}
      <div className="relative z-30">
        <HowItWorks />

        <div className="text-white">
          <ItineraryEngine />
        </div>

        <Footer />
      </div>
    </main>
  );
}