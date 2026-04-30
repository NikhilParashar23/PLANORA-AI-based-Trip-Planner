"use client";
import React from 'react';

export const Transition = () => {
  return (
    <div
      id="transition-end"   // 👈 THIS LINE IS THE FIX
      className="flex flex-col items-center justify-center min-h-screen text-white text-center px-4 mix-blend-difference"
    >
      <h2 className="font-serif tracking-[0.2em] uppercase text-4xl md:text-6xl mb-8">
        What are you waiting for?
      </h2>

      <button className="px-8 py-4 border border-white text-white font-sans text-sm tracking-widest uppercase hover:bg-accent hover:border-accent transition-colors duration-500 rounded-sm">
        Start Your Journey
      </button>
    </div>
  );
};