"use client";
import React, { useRef, useEffect } from 'react';
import { useScroll, useTransform, useSpring } from 'framer-motion';

interface Props {
  frames: string[];
  containerRef: React.RefObject<HTMLDivElement>;
}

export const CanvasScroller = ({ frames, containerRef }: Props) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);

  // 1. Get the scroll progress of the entire page/container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  /** * 2. THE FIX: MAP THE SCROLL
   * We want the animation to finish by the time the user scrolls 40% of the way.
   * From 0% to 40% scroll -> Frames go 0 to 1263.
   * From 40% to 100% scroll -> Frame stays at 1263.
   */
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  const frameIndex = useTransform(
    smoothProgress,
    [0, 0.4], // Animation finishes at 40% scroll depth
    [0, frames.length - 1],
    { clamp: true } // THIS IS CRITICAL: Keeps it at the last frame
  );

  useEffect(() => {
    // Preload images logic (Stayed the same as your working version)
    if (imagesRef.current.length === 0) {
      frames.forEach((src) => {
        const img = new Image();
        img.src = src;
        imagesRef.current.push(img);
      });
    }

    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext("2d");
    if (!context) return;

    const resizeCanvas = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      context.scale(dpr, dpr);
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const render = (latest: number) => {
      const index = Math.floor(latest);
      const img = imagesRef.current[index];

      if (img && img.complete) {
        const canvasRect = canvas.getBoundingClientRect();
        const canvasAspect = canvasRect.width / canvasRect.height;
        if (img.height === 0) return;
        const imgAspect = img.width / img.height;

        let drawWidth = canvasRect.width;
        let drawHeight = canvasRect.height;
        let offsetX = 0;
        let offsetY = 0;

        if (canvasAspect > imgAspect) {
          drawHeight = canvasRect.width / imgAspect;
          offsetY = (canvasRect.height - drawHeight) / 2;
        } else {
          drawWidth = canvasRect.height * imgAspect;
          offsetX = (canvasRect.width - drawWidth) / 2;
        }

        context.clearRect(0, 0, canvasRect.width, canvasRect.height);
        context.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
      }
    };

    if (imagesRef.current[0]) {
      if (imagesRef.current[0].complete) render(0);
      else imagesRef.current[0].onload = () => render(0);
    }

    const unsubscribe = frameIndex.on("change", (latest) => {
      render(latest);
    });

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      unsubscribe();
    };
  }, [frameIndex, frames]);

  // CanvasScroller.tsx
  // Update the return statement for better layering and performance
  return (
    <div className="fixed inset-0 z-0 pointer-events-none">
      <canvas
        ref={canvasRef}
        className="h-full w-full object-cover brightness-[0.5]"
      />
    </div>
  );
};