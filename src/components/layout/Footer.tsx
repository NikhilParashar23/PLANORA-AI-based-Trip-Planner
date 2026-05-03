"use client";
import React from 'react';

export const Footer = () => {
    return (
        <footer className="bg-zinc-950 text-white pt-10 pb-4 px-6 md:px-12 border-t border-white/5">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-16 mb-11">

                {/* 1. About Us */}
                <div className="space-y-4">
                    <h3 className="font-serif text-3xl tracking-tighter">PLANORA</h3>
                    <p className="text-zinc-400 text-base leading-relaxed">
                        An AI-powered travel platform creating personalized itineraries based on your budget and goals.
                        We simplify decisions so you can focus on the journey.
                    </p>
                </div>

                {/* 2. Quick Links */}
                <div>
                    <h4 className="text-sm uppercase tracking-[0.2em] font-bold mb-6 text-zinc-200">Quick Links</h4>
                    <ul className="space-y-3 text-base text-zinc-400">
                        <li><a href="#" className="hover:text-white transition-colors duration-300">Home</a></li>
                        <li><a href="#features" className="hover:text-white transition-colors duration-300">How It Works</a></li>
                        <li><a href="#itinerary" className="hover:text-white transition-colors duration-300">Plan My Trip</a></li>
                        <li><a href="#about" className="hover:text-white transition-colors duration-300">Contact Us</a></li>
                    </ul>
                </div>

                {/* 3. Features (Mapping to your 'AI Planner' list) */}
                <div>
                    <h4 className="text-sm uppercase tracking-[0.2em] font-bold mb-6 text-zinc-200">Features</h4>
                    <ul className="space-y-3 text-base text-zinc-400">
                        <li><a href="#features" className="hover:text-white transition-colors duration-300">AI Planner</a></li>
                        <li><a href="#features" className="hover:text-white transition-colors duration-300">Budget Optimization</a></li>
                        <li><a href="#features" className="hover:text-white transition-colors duration-300">Hotel Selection</a></li>
                        <li><a href="#features" className="hover:text-white transition-colors duration-300">Route Mapping</a></li>
                    </ul>
                </div>

                {/* 4. Contact Section */}
                <div>
                    <h4 className="text-sm uppercase tracking-[0.2em] font-bold mb-6 text-zinc-200">Contact</h4>
                    <ul className="space-y-3 text-base text-zinc-400">
                        <li className="flex items-center gap-2">
                            <span>📧</span> hello@planora.in
                        </li>
                        <li>
                           
                                <span>📸</span> @planora
                            
                        </li>
                        <li className="flex items-center gap-2">
                            <span>🌐</span> India
                        </li>
                    </ul>
                </div>
            </div>

            {/* 5. Bottom Bar */}
            <div className="max-w-7xl mx-auto pt-1 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-[13px] uppercase tracking-widest text-zinc-500">
                <div className="text-center md:text-left">
                    © 2026 Planora. All rights reserved. <span className="mx-2 hidden md:inline">|</span> Designed with ❤️ for smarter travel.
                </div>
                <div className="flex gap-6">
                    <a href="#" className="hover:text-white transition-colors">Privacy</a>
                    <a href="#" className="hover:text-white transition-colors">Terms</a>
                </div>
            </div>
        </footer>
    );
};