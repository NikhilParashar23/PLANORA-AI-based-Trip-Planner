"use client";
import React, { useState, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { SubmitHandler } from "react-hook-form";
import {
  Sparkles, Crown, Mountain, Umbrella, Landmark,
  Trees, Music, Backpack, Utensils, HeartPulse,
  Camera, Users
} from "lucide-react";

const formSchema = z.object({
  destination: z.string().min(1, 'Destination is required'),
  from: z.string().min(1).default("Mumbai"),
  startDate: z.string().min(1).default(new Date().toISOString().split('T')[0]),
  days: z.number().min(1),
  travellers: z.number().min(1),
  budget: z.number().min(5000).max(100000),
  weather: z.string().default(""),
  accommodation: z.enum(['Hotel', 'Villa', 'Resort', 'Hostel', 'Camping']).default('Hotel'),
  transport: z.enum(['Car', 'Bike', 'Public Transport', 'Flight', 'Train', 'Boat']).optional(),
  diet: z.enum(['Veg', 'Non-Veg', 'Vegan', 'Jain']).optional(),
  notes: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

const STYLES = [
  'Budget', 'Luxury', 'Adventure', 'Relaxation',
  'Cultural', 'Nature', 'Party', 'Backpacking',
  'Foodie', 'Wellness', 'Photography', 'Family'
];

/* ICON MAP */
const STYLE_ICONS: Record<string, any> = {
  Budget: Sparkles,
  Luxury: Crown,
  Adventure: Mountain,
  Relaxation: Umbrella,
  Cultural: Landmark,
  Nature: Trees,
  Party: Music,
  Backpacking: Backpack,
  Foodie: Utensils,
  Wellness: HeartPulse,
  Photography: Camera,
  Family: Users
};

export const ItineraryEngine = () => {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [selectedStyles, setSelectedStyles] = useState<Set<string>>(new Set());
  const resultsRef = useRef<HTMLDivElement>(null);

  const { register, handleSubmit, watch, setValue } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      destination: "",
      from: "Mumbai",
      startDate: new Date().toISOString().split("T")[0],
      days: 3,
      travellers: 2,
      budget: 15000,
      accommodation: "Hotel",
      weather: "",
      diet: "Veg"
    }
  });

  const budgetValue = watch('budget');
  const peopleValue = watch('travellers');

  const toggleStyle = (style: string) => {
    setSelectedStyles(prev => {
      const next = new Set(prev);
      next.has(style) ? next.delete(style) : next.add(style);
      return next;
    });
  };

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    setLoading(true);
    const styleStr = selectedStyles.size > 0 ? [...selectedStyles].join(', ') : 'Budget';

    const res = await fetch("/api/generate-itinerary", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...data, travelStyle: styleStr }),
    });

    const resultData = await res.json();
    setResult(resultData);
    setLoading(false);

    setTimeout(() => resultsRef.current?.scrollIntoView({ behavior: 'smooth' }), 100);
  };

  return (
    <div
      className="itinerary-bg"
      style={{
        minHeight: '100vh',
        backgroundImage: result?.image ? `url(${result.image})` : undefined,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: result?.image ? 'fixed' : 'scroll',
        padding: '3rem 1rem',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '100%',
        position: 'relative'
      }}
    >

      <div style={{
        position: 'relative',
        zIndex: 10,
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
      }}>

        {/* HERO */}
        <div style={{
          textAlign: 'center',
          marginBottom: '2.5rem',
          maxWidth: '680px'
        }}>
          <h1 style={{
            fontSize: '2.6rem',
            fontWeight: 600,
            color: '#0A1F2C'
          }}>
            Plan Your Dream Trip 🌴
          </h1>

          <p style={{
            marginTop: '0.6rem',
            fontSize: '15px',
            color: 'rgba(10,31,44,0.65)'
          }}>
            Just fill a few details and we'll handle the rest
          </p>
        </div>

        {/* FORM */}
        <div className="itinerary-card" style={{
          width: '100%',
          maxWidth: '760px',
          borderRadius: '24px',
          padding: '2.2rem'
        }}>
          <form onSubmit={handleSubmit(onSubmit)}>

            <SectionLabel>📍 Where & When</SectionLabel>

            <div style={gridStyle}>

              <Field label="Destination">
                <input
                  className="inp"
                  placeholder="Where to?"
                  style={inputStyle}
                  {...register("destination")}
                />
              </Field>

              <Field label="Travelling from">
                <input
                  className="inp"
                  style={inputStyle}
                  {...register("from")}
                />
              </Field>

              <Field label="Start date">
                <input
                  type="date"
                  className="inp"
                  style={inputStyle}
                  {...register("startDate")}
                />
              </Field>

              <Field label="Number of days">
                <input
                  type="number"
                  className="inp"
                  style={inputStyle}
                  {...register("days", { valueAsNumber: true })}
                />
              </Field>

            </div>

            <SectionLabel>👥 Travellers & Budget</SectionLabel>

            <div style={gridStyle}>
              <Field label="Travellers">
                <div style={stepperStyle}>
                  <button
                    type="button"
                    onClick={() => setValue('travellers', Math.max(1, peopleValue - 1))}
                    style={stepBtn}
                  >
                    −
                  </button>

                  <span style={{ fontSize: '16px', fontWeight: 500 }}>
                    {peopleValue}
                  </span>

                  <button
                    type="button"
                    onClick={() => setValue('travellers', peopleValue + 1)}
                    style={stepBtn}
                  >
                    +
                  </button>
                </div>
              </Field>

              <Field label="Budget">

                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>

                  <input
                    type="range"
                    min={5000}
                    max={100000}
                    {...register("budget", { valueAsNumber: true })}
                    style={sliderStyle}
                  />

                  <div style={budgetBadge}>
                    ₹{budgetValue.toLocaleString()}
                  </div>

                </div>

              </Field>
            </div>

            <SectionLabel>🌿 Travel Style</SectionLabel>

            {/* AIRBNB STYLE CHIPS */}
            <div style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '12px',
              maxWidth: '100%'
            }}>
              {STYLES.map(s => {
                const Icon = STYLE_ICONS[s];
                const active = selectedStyles.has(s);

                return (
                  <button
                    key={s}
                    type="button"
                    onClick={() => toggleStyle(s)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      padding: '10px 18px',
                      borderRadius: '999px',
                      border: active
                        ? '1px solid #3BA4A6'
                        : '1px solid rgba(10,31,44,0.15)',
                      background: active ? '#3BA4A6' : '#fff',
                      color: active ? '#fff' : '#0A1F2C',
                      fontSize: '14px', // 👈 increased
                      fontWeight: 500,
                      cursor: 'pointer',
                      transition: 'all 0.25s ease',
                      boxShadow: active
                        ? '0 6px 18px rgba(59,164,166,0.3)'
                        : '0 2px 6px rgba(0,0,0,0.05)'
                    }}
                    onMouseEnter={e => {
                      if (!active) {
                        e.currentTarget.style.transform = 'scale(1.05)';
                      }
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.transform = 'scale(1)';
                    }}
                  >
                    <Icon size={16} />
                    {s}
                  </button>
                );
              })}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="submit-btn"
              style={{
                marginTop: '2rem',
                fontSize: '16px'
              }}
            >
              {loading ? 'Planning...' : '✈ Design My Journey'}
            </button>

          </form>
        </div>

        {/* RESULTS */}
        <div ref={resultsRef} style={{
          width: '100%',
          maxWidth: '760px',
          marginTop: '2.5rem'
        }}>
          {result && (
            <div style={{
              background: '#ffffff',
              borderRadius: '20px',
              padding: '2rem',
              color: '#0A1F2C'
            }}>
              <h2 style={{ fontSize: '1.6rem' }}>
                {result.itinerary?.destination}
              </h2>
              <p style={{ opacity: 0.7 }}>
                {result.itinerary?.tagline}
              </p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

/* ---------- UI HELPERS ---------- */

const gridStyle: React.CSSProperties = {
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  gap: '18px'
};

const counterStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  border: '1px solid rgba(10,31,44,0.15)',
  borderRadius: '10px',
  padding: '8px 12px'
};

const SectionLabel = ({ children }: { children: React.ReactNode }) => (
  <div style={{
    fontSize: 11,
    fontWeight: 600,
    letterSpacing: '1.2px',
    textTransform: 'uppercase',
    color: '#3BA4A6',
    margin: '1.8rem 0 1rem',
    borderBottom: '1px solid rgba(59,164,166,0.3)',
    paddingBottom: '4px'
  }}>
    {children}
  </div>
);

const Field = ({ label, children }: { label: string; children: React.ReactNode }) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
    <label style={{
      fontSize: 12,
      fontWeight: 500,
      color: '#0A1F2C'
    }}>
      {label}
    </label>
    {children}
  </div>
);

const inputStyle: React.CSSProperties = {
  borderRadius: '14px',
  padding: '12px 14px',
  border: '1px solid rgba(10,31,44,0.15)',
  background: '#ffffff',
  fontSize: '14px',
  transition: '0.2s'
};

const stepperStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  borderRadius: '999px',
  border: '1px solid rgba(10,31,44,0.15)',
  padding: '6px 10px',
  background: '#fff'
};

const stepBtn: React.CSSProperties = {
  width: '34px',
  height: '34px',
  borderRadius: '50%',
  border: '1px solid rgba(10,31,44,0.2)',
  background: '#fff',
  cursor: 'pointer',
  fontSize: '16px',
  transition: '0.2s'
};

const sliderStyle: React.CSSProperties = {
  width: '100%',
  cursor: 'pointer'
};

const budgetBadge: React.CSSProperties = {
  alignSelf: 'flex-start',
  padding: '6px 12px',
  borderRadius: '999px',
  background: '#3BA4A6',
  color: '#fff',
  fontSize: '13px',
  fontWeight: 500
};