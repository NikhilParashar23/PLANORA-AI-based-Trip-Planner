"use client";
import React, { useState, useEffect } from 'react';
import {MapPinned} from "lucide-react"
export const Navbar = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            // 1. Target the specific transition element
            const transitionEl = document.getElementById("transition-end");
            if (!transitionEl) return;

            const rect = transitionEl.getBoundingClientRect();

            /**
             * 🔥 SYNC LOGIC:
             * rect.top is the distance from the top of the viewport to the element.
             * window.innerHeight is the height of the screen.
             * We show the navbar when the transition text is roughly 80% up the screen.
             */
            if (rect.top <= window.innerHeight * 0.8) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }

            // 2. APPLY GLASS EFFECT
            // When the transition text starts moving past the top of the screen
            if (rect.top <= 50) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        window.addEventListener("scroll", handleScroll);
        // Run once on mount to check initial position
        handleScroll();

        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const navLinks = [
        { name: 'Home', href: '#' },
        { name: 'Features', href: '#features' },
        { name: 'Itinerary', href: '#itinerary' },
        { name: 'About Us', href: '#about' },
    ];

    return (
        <nav
            className={`fixed top-0 left-0 w-full z-[1000] transition-all duration-700 ease-out px-6 md:px-12 flex justify-between items-center 
      ${isVisible ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"}
      ${isScrolled
                    ? "bg-[#0B0F14]/40 backdrop-blur-xl py-3 border-b border-white/10"
                    : "bg-transparent py-8"
                }`}
        >
            {/* LOGO */}
            <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-gradient-to-br from-[#3BA4A6] to-[#7ED7C1] rounded-lg shadow-[0_0_15px_rgba(59,164,166,0.3)] flex items-center justify-center">
  <MapPinned size={18} className="text-white" />
</div>
                <span className="text-xl font-serif font-bold tracking-tighter text-white uppercase">
                    Plan<span className="text-[#3BA4A6] ">ora</span>
                </span>
            </div>

            {/* LINKS */}
            <div className="hidden md:flex items-center gap-10">
                {navLinks.map((link) => (
                    <a
                        key={link.name}
                        href={link.href}
                        className="text-[11px] font-bold uppercase tracking-[0.3em] text-white/70 hover:text-[#7ED7C1] transition-all duration-300"
                    >
                        {link.name}
                    </a>
                ))}
            </div>
        </nav>
    );
};