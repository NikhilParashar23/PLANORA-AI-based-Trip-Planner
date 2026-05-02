"use client";
import React, { useEffect, useState, useRef} from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Plane, MapPin, Calendar, Clock,IndianRupee } from 'lucide-react';
import { ItineraryDisplay } from '@/components/sections/ItineraryDisplay';

export default function ItineraryResultPage() {
  const router = useRouter();
  const [data, setData] = useState<any>(null);
  const resultsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // 1. Get data from storage
    const savedData = sessionStorage.getItem('last_itinerary');
    
    // 2. If no data (direct link access), send them home
    if (!savedData) {
      router.push('/');
      return;
    }
    
    setData(JSON.parse(savedData));
  }, [router]);

  // Loading state while checking session storage
  if (!data) return (
    <div className="h-screen bg-zinc-950 flex items-center justify-center text-white">
      Loading your itinerary...
    </div>
  );

  return (
    <main className="min-h-screen bg-white">
      {/* Background Layer (Static Image from API) */}
      <div 
        className="fixed inset-0 z-0"
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url(${data.image || ''})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed' // Keeps image steady while scrolling
        }}
      />

      {/* Content Layer */}
      <div className="relative z-10 p-4 md:p-12">
                            {/* 1. Plan Another Adventure Button */}
  <button 
    onClick={() => router.push('/')}
    className="group flex items-center gap-2 bg-white/10 backdrop-blur-xl px-5 py-2.5 rounded-xl font-medium border border-white/20 text-white hover:bg-white hover:text-black hover:scale-105 transition-all duration-300 shadow-lg shrink-0"
  >
    <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform duration-300" />
    <span className="text-sm tracking-wide">Plan Another Adventure</span>
  </button>
  
        <div className="max-w-4xl mx-auto flex flex-col items-center">   
        <div className="w-full flex justify-start">
  
{/* TOP HEADER BAR */}
<div className="w-full flex items-center justify-between flex-wrap md:flex-nowrap bg-white/10 backdrop-blur-xl px-4 md:px-8 py-4 rounded-2xl border border-white/20 text-white shadow-lg gap-4">
  
  

  {/* 2. Destination */}
  <div className="flex items-center gap-3 border-l border-white/10 pl-6">
    <div className="p-2 bg-white/10 rounded-full shrink-0"><MapPin size={16} /></div>
    <div>
      <p className="text-[10px] uppercase tracking-wider opacity-90">Destination</p>
      <p className="text-sm font-semibold whitespace-nowrap">{data.destination}</p>
    </div>
  </div>

  {/* 3. From */}
  <div className="flex items-center gap-3 border-l border-white/10 pl-6">
    <div className="p-2 bg-white/10 rounded-full shrink-0"><Plane size={16} /></div>
    <div>
      <p className="text-[10px] uppercase tracking-wider opacity-90">From</p>
      <p className="text-sm font-semibold whitespace-nowrap">{data.from || 'Mumbai'}</p>
    </div>
  </div>

  {/* 4. Dates */}
  <div className="flex items-center gap-3 border-l border-white/10 pl-6">
    <div className="p-2 bg-white/10 rounded-full shrink-0"><Calendar size={16} /></div>
    <div>
      <p className="text-[10px] uppercase tracking-wider opacity-90">Start Date</p>
      <p className="text-sm font-semibold whitespace-nowrap">{data.startDate}</p>
    </div>
  </div>

  {/* 5. Duration */}
  <div className="flex items-center gap-3 border-l border-white/10 pl-6">
    <div className="p-2 bg-white/10 rounded-full shrink-0"><Clock size={16} /></div>
    <div>
      <p className="text-[10px] uppercase tracking-wider opacity-90">Duration</p>
      <p className="text-sm font-semibold whitespace-nowrap">{data.days} Days</p>
    </div>
  </div>

  {/* 6. Budget */}
  <div className="flex items-center gap-3 border-l border-white/10 pl-6">
    <div className="p-2 bg-white/10 rounded-full shrink-0"><IndianRupee size={16} /></div>
    <div>
      <p className="text-[10px] uppercase tracking-wider opacity-90">Budget</p>
      <p className="text-sm font-semibold whitespace-nowrap">₹{data.budget?.toLocaleString()}</p>
    </div>
  </div>
</div>
          </div>

          <ItineraryDisplay result={data} />
          
        </div>
      </div>
    </main>
  );
}