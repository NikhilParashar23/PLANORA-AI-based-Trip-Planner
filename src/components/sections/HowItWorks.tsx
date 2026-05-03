"use client";
import React from 'react';

const steps = [
    { title: "Start With a Feeling", desc: "Destinations are secondary. Tell us your mood, and we'll build the world around it." },
    { title: "AI Heavy Lifting", desc: "Our engine scans millions of data points so you don't have to open 27 tabs." },
    { title: "Main Character Stays", desc: "No random listings. We only curate spaces that pass the vibe check." },
    { title: "Budget ≠ Breakdown", desc: "Stay on budget without killing the vibe." },
    { title: "Plans That Don’t Break", desc: "Itineraries that evolve in real-time." },
    { title: "Send It to the Group", desc: "Collaborate and tweak with your people." },
    { title: "The Final Flow", desc: "A journey designed like a story." },
];

export const HowItWorks = () => {
    return (
        <section
            className="relative min-h-screen w-full overflow-hidden bg-gradient-to-b from-transparent via-[#0A1F2C]/30 to-[#eef6f8]"
            style={{
                maskImage: "linear-gradient(to bottom, transparent 0%, black 12%, black 100%)"
            }}
        >
            {/* FIXED: extended smooth transition (no harsh band) */}
            <div className="absolute top-0 left-0 w-full h-[900px] bg-gradient-to-b from-transparent via-[#1b6f82]/10 to-[#eef6f8]/80 z-10" />

            {/* Soft ambient glow */}
            <div className="absolute inset-0 z-0">
                <div className="absolute top-[20%] right-[10%] w-[500px] h-[500px] bg-[#3BA4A6]/10 rounded-full blur-[120px]" />
                <div className="absolute bottom-[10%] left-[5%] w-[600px] h-[600px] bg-[#7ED7C1]/8 rounded-full blur-[140px]" />
            </div>

            <div className="relative z-20 max-w-7xl mx-auto px-6 py-32 flex flex-col items-center">

                {/* Header */}
                <div className="text-center mb-8 ">
                    <h2 className="text-4xl md:text-6xl font-serif tracking-tight text-white mb-6">
                        How It Works
                    </h2>
                    <p className="text-[#12323E] text-[10px] md:text-xs tracking-[0.4em] uppercase font-medium">
                        Plan your perfect trip in just a few smart steps.
                    </p>
                </div>

                {/* Cards */}
                <div className="container-items">
                    {steps.map((step, idx) => (
                        <div key={idx} className="item-color">
                            <div className="card-content">
                                <h3 className="text-lg md:text-sm font-bold uppercase tracking-widest text-[#0A1F2C] mb-4">
                                    {step.title}
                                </h3>
                                <p className="text-md md:text-[11px] leading-relaxed text-[#0A1F2C]/70 font-medium">
                                    {step.desc}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};