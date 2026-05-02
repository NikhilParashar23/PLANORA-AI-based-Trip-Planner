import React from 'react';
import { Footer } from '../layout/Footer';

interface Props {
  result: any;
  resultsRef: React.RefObject<HTMLDivElement>;
}

export const ItineraryDisplay = ({ result, resultsRef }: Props) => {
  if (!result) return null;

  return (
    <div className="flex flex-col min-h-screen w-full">

      <div ref={resultsRef} className="w-full max-w-4xl mx-auto" style={{ width: '100%', marginTop: '2rem', position: 'relative', zIndex: 10 }}>
        {result && (
          <div style={{
            background: 'rgba(0,0,0,0.7)',
            borderRadius: 24,
            padding: '2rem 1.25rem',
            minHeight: '200px',
            display: 'block'
          }}>

            {/* Destination title */}
            <div style={{ textAlign: 'center', marginBottom: '1.75rem' }}>
              <h2 style={{ fontSize: '2rem', fontWeight: 500, color: '#fff' }}>{result.itinerary?.destination}</h2>
              <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.7)', marginTop: 5 }}>{result.itinerary?.tagline}</p>
            </div>

            {/* Arrival Logistics Card */}
            {result.itinerary?.arrivalLogistics && (
              <div style={{
                gridColumn: '1 / -1', // Makes this span both columns in your grid
                background: 'linear-gradient(90deg, rgba(14, 107, 158, 0.4), rgba(126, 215, 193, 0.2))',
                borderRadius: '20px',
                padding: '20px',
                marginBottom: '1rem',
                border: '1px solid #3BA4A6',
                color: '#fff'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <h3 style={{ margin: 0, fontSize: '18px' }}>🚀 Getting There</h3>
                    <p style={{ margin: '5px 0 0', opacity: 0.8 }}>{result.itinerary.arrivalLogistics.route}</p>
                    {result.itinerary.arrivalLogistics.warning && (
                      <p style={{ color: '#ffcc00', fontSize: '12px', marginTop: '5px' }}>
                        ⚠️ {result.itinerary.arrivalLogistics.warning}
                      </p>
                    )}
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: '24px' }}>
                      {result.weather.condition === 'Rainy' ? '🌧️' : result.weather.condition === 'Cloudy' ? '☁️' : '☀️'}
                    </div>
                    <div style={{ fontSize: '14px', fontWeight: 'bold' }}>{result.weather.temp}°C</div>
                  </div>
                </div>
              </div>
            )}

            {/* Display itinerary days with images */}
            {result.itinerary && result.itinerary.days && result.itinerary.days.length > 0 ? (
              result.itinerary.days.map((day: any, i: number) => (
                <React.Fragment key={i}>
                  {result.dayImages && result.dayImages[i] && (
                    <div style={{
                      width: '100%',
                      height: '200px',
                      backgroundImage: `url(${result.dayImages[i]})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                      borderRadius: '16px 16px 0 0',
                      marginBottom: '-16px',
                      position: 'relative',
                      zIndex: 5,
                      boxShadow: '0 4px 15px rgba(0,0,0,0.2)'
                    }}>
                      {/*  Add a small badge on the image */}
                      <div style={{
                        position: 'absolute',
                        bottom: '25px',
                        left: '18px',
                        background: 'rgba(0,0,0,0.6)',
                        padding: '4px 12px',
                        borderRadius: '20px',
                        color: '#fff',
                        fontSize: '12px',
                        backdropFilter: 'blur(4px)'
                      }}>
                        {typeof day.morning?.[0] === 'object'
                          ? day.morning[0].name
                          : day.morning?.[0]?.split(' — ')[0] || "Explore"}
                      </div>
                    </div>
                  )}

                  {/* Day card */}
                  <div key={i} style={{
                    background: 'rgba(255,255,255,0.18)',
                    backdropFilter: 'blur(16px)',
                    WebkitBackdropFilter: 'blur(16px)',
                    border: '1px solid rgba(255,255,255,0.25)',
                    borderRadius: 16, marginBottom: '1rem', overflow: 'hidden'
                  }}>
                    {/* Day header */}
                    <div style={{
                      background: 'rgba(255,255,255,0.15)',
                      borderBottom: '1px solid rgba(255,255,255,0.15)',
                      color: '#fff', padding: '10px 18px', fontSize: 14, fontWeight: 500,
                      display: 'flex', alignItems: 'center', gap: 10
                    }}>
                      <span style={{ background: 'rgba(255,255,255,0.2)', borderRadius: 999, padding: '2px 10px', fontSize: 12 }}>
                        Day {day.day}
                      </span>
                      <span>{day.date || `Day ${day.day}`}</span>
                    </div>
                    <div style={{ padding: '16px 18px' }}>
                      {/* ✅ Places: handles both string[] and {name,detail}[] safely */}
                      {[['🌅 Morning', day.morning], ['☀️ Midday', day.midday], ['🌇 Evening', day.evening]]
                        .map(([label, places]: any) =>
                          places?.length ? (
                            <div key={label}>
                              <div style={{ fontSize: 11, letterSpacing: '0.8px', textTransform: 'uppercase', fontWeight: 500, color: 'rgba(255,255,255,0.5)', marginBottom: 6, marginTop: 12 }}>
                                {label}
                              </div>

                              {places.map((p: any, idx: number) => (
                                <div key={idx} style={{
                                  fontSize: 13,
                                  color: 'rgba(255,255,255,0.9)',
                                  padding: '8px 0',
                                  display: 'flex',
                                  alignItems: 'flex-start',
                                  gap: 10
                                }}>
                                  {/* The Bullet Point */}
                                  <div style={{
                                    width: 6,
                                    height: 6,
                                    borderRadius: '50%',
                                    background: 'rgba(255,255,255,0.5)',
                                    marginTop: 6,
                                    flexShrink: 0
                                  }} />

                                  <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
                                    {typeof p === 'string' ? (
                                      <span>{p}</span>
                                    ) : (
                                      <>
                                        {/* Place Name */}
                                        <span style={{
                                          fontWeight: 600,
                                          display: 'block',
                                          fontSize: '14px',
                                          color: '#fff'
                                        }}>
                                          {p.name}
                                        </span>

                                        {/* Description*/}
                                        {p.description && (
                                          <span style={{
                                            display: 'block',
                                            fontSize: '12px',
                                            color: 'rgba(255,255,255,0.9)',
                                            marginTop: '4px',
                                            lineHeight: '1.5',
                                            fontWeight: 400
                                          }}>
                                            {p.description}
                                          </span>
                                        )}
                                      </>
                                    )}
                                  </div>
                                </div>
                              ))}
                            </div>
                          ) : null
                        )
                      }

                      <hr style={{ border: 'none', borderTop: '1px solid rgba(255,255,255,0.12)', margin: '12px 0' }} />
                      {/* ✅ Meals: handles both string[] and {name}[] safely */}
                      <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginBottom: 8 }}>
                        {['breakfast', 'lunch', 'dinner'].map(meal => {
                          const items = day[meal];
                          if (!items?.length) return null;
                          const emoji = meal === 'breakfast' ? '🌄' : meal === 'lunch' ? '🍽' : '🌙';
                          return (
                            <div key={meal}>
                              <div style={{ fontSize: 11, letterSpacing: '0.8px', textTransform: 'uppercase', fontWeight: 500, color: 'rgba(255,255,255,0.5)', marginBottom: 4 }}>
                                {emoji} {meal}
                              </div>
                              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                                {items.map((r: any, idx: number) => (
                                  <span key={idx} style={{ fontSize: 12, padding: '4px 11px', borderRadius: 8, background: 'rgba(255,200,100,0.18)', color: '#ffe5aa', border: '1px solid rgba(255,200,100,0.25)' }}>
                                    {typeof r === 'string' ? r : `${r.name}${r.knownFor ? ` — ${r.knownFor}` : ''}`}
                                  </span>
                                ))}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                      {/* ✅ Stay: handles both string[] and {name}[] safely */}
                      {day.stay?.length > 0 && (
                        <div>
                          <div style={{ fontSize: 11, letterSpacing: '0.8px', textTransform: 'uppercase', fontWeight: 500, color: 'rgba(255,255,255,0.5)', marginBottom: 4 }}>
                            🏨 Stay options
                          </div>
                          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                            {day.stay.map((h: any, idx: number) => (
                              <span key={idx} style={{ fontSize: 12, padding: '4px 11px', borderRadius: 8, background: 'rgba(100,200,255,0.18)', color: '#b8eaff', border: '1px solid rgba(100,200,255,0.25)' }}>
                                {typeof h === 'string' ? h : `${h.name}${h.pricePerNight ? ` — ₹${h.pricePerNight}/night` : ''}`}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                    {/* Budget strip */}
                    {day.budget && (
                      <div style={{ background: 'rgba(0,0,0,0.25)', borderTop: '1px solid rgba(255,255,255,0.1)', padding: '10px 18px', display: 'flex', gap: 16, flexWrap: 'wrap' }}>
                        {[['💰 Total', day.budget.total], ['🍽 Food', day.budget.food], ['🚌 Travel', day.budget.travel], ['🏨 Stay', day.budget.stay]].map(([k, v]: any) => (
                          <div key={k} style={{ fontSize: 12, color: 'rgba(255,255,255,0.65)' }}>
                            <strong style={{ color: '#fff' }}>{k}:</strong> ₹{(v || 0).toLocaleString('en-IN')}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </React.Fragment>
              ))
            ) : (
              <div style={{ textAlign: 'center', padding: '2rem', color: 'rgba(255,255,255,0.7)' }}>
                <p>No itinerary days found. Please try again.</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>


  );


};

