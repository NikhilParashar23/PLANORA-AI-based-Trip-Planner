"use client";
import React, { useState, useRef } from 'react';
import { ItineraryForm, FormValues } from './ItineraryForm';
import { useRouter } from 'next/navigation';
import { ItineraryDisplay } from './ItineraryDisplay';

export const ItineraryEngine = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleFormSubmit = async (data: FormValues, travelStyle: string) => {
    setLoading(true);
    try {
      const res = await fetch("/api/generate-itinerary", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, travelStyle }),
      });
      const resultData = await res.json();
      sessionStorage.setItem('last_itinerary', JSON.stringify(resultData));
      router.push('/itinerary-result');
    } catch (error) {
      console.error("Failed to generate itinerary", error);
      alert("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    /* This is the section background wrapper */
    <section style={{ 
      width: '100%', 
      backgroundColor: '#e6f0f2', // Force the section background to white
      padding: '4rem 1rem',       // Space at top and bottom
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center',
      minHeight: '100vh'          // Ensures it fills the "frame" of your scroll
    }}>
      
      {/* Container for the content */}
      <div style={{ 
        position: 'relative', 
        zIndex: 10, 
        width: '100%', 
        maxWidth: '1200px',
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center' 
      }}>
        
        {/* Title: Changed color to #0A1F2C because white text won't show on white BG */}
        {/* <div style={{ textAlign: 'center', marginBottom: '1rem', color: '#0A1F2C' }}>
           <h1 style={{ fontSize: '2.8rem', fontWeight: 600, fontFamily: 'serif' }}>
             Plan Your Dream Trip 🌴
           </h1>
        </div> */}

        {/* The Form */}
        <ItineraryForm onSubmit={handleFormSubmit} loading={loading} />
        
      </div>
    </section>
  );
};