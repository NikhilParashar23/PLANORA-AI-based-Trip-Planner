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

    const finalData = { ...data, ...resultData };
  
    sessionStorage.setItem('last_itinerary', JSON.stringify(finalData));
    
    window.location.href = '/itinerary-result'; 

  } catch (e) {
    console.error(e);
  }
};

  return (
   
    <section style={{ 
      width: '100%', 
      backgroundColor: '#e6f0f2',
      padding: '4rem 1rem',       
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center',
      minHeight: '100vh'          
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
        

        <ItineraryForm onSubmit={handleFormSubmit} loading={loading} />
        
      </div>
    </section>
  );
};