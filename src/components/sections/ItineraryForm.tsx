"use client";
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import {
  Sparkles, Crown, Mountain, Umbrella, Landmark,
  Trees, Music, Backpack, Utensils, HeartPulse,
  Camera, Users, LucideIcon, MapPin, Plane, Calendar, Clock,Hotel, Bus, UtensilsCrossed, CloudSun, FileText 
} from "lucide-react";

const PREF_ICONS = {
  accommodation: Hotel,
  transport: Bus,
  diet: UtensilsCrossed,
  weather: CloudSun,
  notes: FileText
};

const WHERE_WHEN_ICONS = {
  destination: MapPin,
  from: Plane,
  startDate: Calendar,
  days: Clock
};

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

export type FormValues = z.infer<typeof formSchema>;

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

interface Props {
  onSubmit: (data: FormValues, styles: string) => void;
  loading: boolean;
}

export const ItineraryForm = ({ onSubmit, loading }: Props) => {
  const [selectedStyles, setSelectedStyles] = useState<Set<string>>(new Set());

const { register, handleSubmit, watch, setValue } = useForm<FormValues>({
  resolver: zodResolver(formSchema),
  defaultValues: {
    destination: "",
    from: "Mumbai", // Ensure this matches your schema
    startDate: new Date().toISOString().split("T")[0], // Standard YYYY-MM-DD
    days: 3, // This was missing or inconsistent
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

  const internalSubmit = (data: FormValues) => {
    const styleStr = selectedStyles.size > 0 ? [...selectedStyles].join(', ') : 'Budget';
    onSubmit(data, styleStr);
  };

 const InputWithIcon = React.forwardRef<
   HTMLInputElement, 
   { icon: LucideIcon } & React.InputHTMLAttributes<HTMLInputElement>
 >(({ icon: Icon, style, ...props }, ref) => {
   return (
     <div style={{ position: "relative", width: '100%' }}>
       <Icon
         size={16}
         style={{
           position: "absolute",
           left: "12px",
           top: "50%",
           transform: "translateY(-50%)",
           color: "rgba(10,31,44,0.5)",
           pointerEvents: 'none', 
           zIndex: 5
         }}
       />
       <input
         {...props}
         ref={ref} 
         className="inp"
         style={{
           ...inputStyle,
           paddingLeft: "38px",
           width: "100%",
           ...style 
         }}
       />
     </div>
   );
 });
 
 InputWithIcon.displayName = "InputWithIcon";
 

   return (

      <div style={{
        position: 'relative',
        zIndex: 10,
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}>

        {/* HERO */}
        <div style={{
          textAlign: 'center',
          marginBottom: '2.5rem',
          maxWidth: '680px'
        }}>
          <h1 style={{
            fontFamily: 'serif',
            fontSize: '3.5rem',
            fontWeight: 400,
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
          <form onSubmit={handleSubmit(internalSubmit)}>

            <SectionLabel>📍 Where & When</SectionLabel>

            <div style={gridStyle}>

              <Field label="Destination">
                <InputWithIcon
                  icon={WHERE_WHEN_ICONS.destination}
                  {...register("destination")}
                  placeholder="Where to?"
                />
              </Field>

              <Field label="Travelling from">
                <InputWithIcon
                  icon={WHERE_WHEN_ICONS.from}
                  {...register("from")}
            
                />
              </Field>

              <Field label="Start date">
                <InputWithIcon
                  icon={WHERE_WHEN_ICONS.startDate}
                  type="date"
                  {...register("startDate")}
                />
              </Field>

              <Field label="Number of days">
                <InputWithIcon
                  icon={WHERE_WHEN_ICONS.days}
                  type="number"
                  min={1}
                  step={1}
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

                  <span style={{
                    fontSize: '14px',
                    fontWeight: 500,
                    color: '#0A1F2C'
                  }}>
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

            <div style={{ position: 'relative', width: '100%' }}>

              {/* SCROLL ROW */}
              <div
                style={{
                  display: 'flex',
                  gap: '14px',
                  overflowX: 'auto',
                  paddingBottom: '6px',

                  /* smooth scroll */
                  scrollBehavior: 'smooth',

                  /* prevent wrapping */
                  whiteSpace: 'nowrap',

                  /* hide scrollbar (important) */
                  scrollbarWidth: 'none',
                  msOverflowStyle: 'none'
                }}
                className="no-scrollbar"
              >
                {STYLES.map(s => {
                  const Icon = STYLE_ICONS[s];
                  const active = selectedStyles.has(s);

                  return (
                    <button
                      key={s}
                      type="button"
                      onClick={() => toggleStyle(s)}
                      style={{
                        /*FIXED WIDTH FOR SCROLL */
                        minWidth: '84px',
                        height: '84px',
                        flexShrink: 0,

                        borderRadius: '16px',

                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '6px',

                        background: active ? '#E8F7F7' : '#fff',
                        border: active
                          ? '1.5px solid #3BA4A6'
                          : '1px solid rgba(10,31,44,0.12)',

                        color: active ? '#1E5F74' : '#0A1F2C',

                        fontSize: '12px',
                        fontWeight: 500,

                        cursor: 'pointer',
                        transition: 'all 0.25s ease',

                        boxShadow: active
                          ? '0 6px 16px rgba(59,164,166,0.25)'
                          : '0 2px 6px rgba(0,0,0,0.05)'
                      }}
                      onMouseEnter={e => {
                        if (!active) e.currentTarget.style.transform = 'translateY(-3px)';
                      }}
                      onMouseLeave={e => {
                        e.currentTarget.style.transform = 'translateY(0)';
                      }}
                    >
                      <Icon size={20} />
                      <span>{s}</span>
                    </button>
                  );
                })}
              </div>
            </div>
            {/* PREFERENCES */}
            <div style={{ position: 'relative', width: '100%' }}>
              <SectionLabel>⚙️ Preferences</SectionLabel>

              <div style={gridStyle}>

                <Field label="Accommodation">
                  <div style={{ position: "relative" }}>
                    <PREF_ICONS.accommodation
                      size={16}
                      style={{
                        position: "absolute",
                        left: "12px",
                        top: "50%",
                        transform: "translateY(-50%)",
                        color: "rgba(10,31,44,0.5)"
                      }}
                    />
                    <select
                      className="inp"
                      style={{ ...inputStyle, paddingLeft: "38px" }}
                      {...register("accommodation")}
                    >
                      {['Hotel', 'Villa', 'Resort', 'Hostel', 'Camping'].map(o => (
                        <option key={o}>{o}</option>
                      ))}
                    </select>
                  </div>
                </Field>

                <Field label="Transport">
                  <div style={{ position: "relative" }}>
                    <PREF_ICONS.transport
                      size={16}
                      style={{
                        position: "absolute",
                        left: "12px",
                        top: "50%",
                        transform: "translateY(-50%)",
                        color: "rgba(10,31,44,0.5)"
                      }}
                    />
                    <select
                      className="inp"
                      style={{ ...inputStyle, paddingLeft: "38px" }}
                      {...register("transport")}
                    >
                      {['Car', 'Bike', 'Public Transport', 'Flight', 'Train', 'Boat'].map(o => (
                        <option key={o}>{o}</option>
                      ))}
                    </select>
                  </div>
                </Field>

                <Field label="Diet">
                  <div style={{ position: "relative" }}>
                    <PREF_ICONS.diet
                      size={16}
                      style={{
                        position: "absolute",
                        left: "12px",
                        top: "50%",
                        transform: "translateY(-50%)",
                        color: "rgba(10,31,44,0.5)"
                      }}
                    />
                    <select
                      className="inp"
                      style={{ ...inputStyle, paddingLeft: "38px" }}
                      {...register("diet")}
                    >
                      {['Veg', 'Non-Veg', 'Vegan', 'Jain'].map(o => (
                        <option key={o}>{o}</option>
                      ))}
                    </select>
                  </div>
                </Field>

                <Field label="Weather">
                  <div style={{ position: "relative" }}>
                    <PREF_ICONS.weather
                      size={16}
                      style={{
                        position: "absolute",
                        left: "12px",
                        top: "50%",
                        transform: "translateY(-50%)",
                        color: "rgba(10,31,44,0.5)"
                      }}
                    />
                    <select
                      className="inp"
                      style={{ ...inputStyle, paddingLeft: "38px" }}
                      {...register("weather")}
                    >
                      <option value="">Any</option>
                      {['Sunny', 'Cold', 'Rainy'].map(o => (
                        <option key={o}>{o}</option>
                      ))}
                    </select>
                  </div>
                </Field>

                {/* FULL WIDTH NOTES */}
                <div style={{ gridColumn: 'span 2' }}>
                  <Field label="Anything else?">
                    <div style={{ position: "relative" }}>
                      <PREF_ICONS.notes
                        size={16}
                        style={{
                          position: "absolute",
                          left: "12px",
                          top: "14px",
                          color: "rgba(10,31,44,0.5)"
                        }}
                      />
                      <textarea
                        className="inp"
                        placeholder="Special requests, must visit places, accessibility..."
                        style={{
                          ...inputStyle,
                          paddingLeft: "38px",
                          width: "94%",
                          resize: "none"
                        }}
                        {...register("notes")}
                      />
                    </div>
                  </Field>
                </div>

              </div>

              {/* RIGHT FADE EFFECT */}
              <div style={{
                position: 'absolute',
                right: 0,
                top: 0,
                height: '100%',
                width: '40px',
                pointerEvents: 'none',
                background: 'linear-gradient(to left, white, transparent)'
              }} />

            </div>

<button
    
      disabled={loading}
      className="submit-btn"
    >
      {loading ? (
        <div className=" train-wrapper ">
          
          {/* The Entire Train (Engine + Boxes) */}
          <div className="train-group flip-horizontal">
            <span>🚂</span>
            <span style={{ marginLeft: '-4px' }}>🚃</span>
            <span style={{ marginLeft: '-4px' }}>🚃</span>
            <span style={{ marginLeft: '-4px' }}>🚃</span>
          </div>

          {/* The Track (Locked directly under the train) */}
         <div className="track-line" />

          {/* Status Text */}
          <span className="text-[10px] uppercase tracking-[0.2em] mt-2 opacity-90 font-bold">
           Designing your itinerary...
          </span>
          
        </div>
      ) : (
        <span className="text-lg">Plan my journey</span>
      )}
    </button>

          </form>
        </div>
    </div >
    
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
  borderRadius: '14px',
  border: '1px solid rgba(10,31,44,0.15)',
  padding: '6px 10px',
  background: '#fff'
};

const stepBtn: React.CSSProperties = {
  width: '32px',
  height: '32px',
  borderRadius: '8px',
  border: '1px solid rgba(10,31,44,0.15)',
  background: '#ffffff',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer',
  fontSize: '16px',
  fontWeight: 500,
  color: '#0A1F2C',
  transition: 'all 0.2s ease'
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
