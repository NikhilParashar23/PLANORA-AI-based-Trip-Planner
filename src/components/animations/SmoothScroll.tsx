"use client";
import { ReactLenis } from 'lenis/react';

// SmoothScroller.tsx
export function SmoothScroll({ children }: { children: React.ReactNode }) {
  return (
    <ReactLenis root options={{
      lerp: 0.08, // Slightly lower value (0.08) makes the scroll feel "heavier" and more cinematic
      duration: 1.2,
      smoothWheel: true
    }}>
      {children}
    </ReactLenis>
  );
}
