import { NextResponse } from "next/server";
import { generateItinerary } from "@/lib/apis/ai";
import { getWeather } from "@/lib/apis/weather";
import { getImage } from "@/lib/apis/images";
import { getHotels } from "@/lib/apis/hotels";
import { getPlaces } from "@/lib/apis/places";

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const { destination, from, transport, days } = data;

  //  PARALLEL FETCHING
 
    const [ weather, image, hotels, places] = await Promise.all([
    
      getWeather(data.destination),
      getImage(data.destination),
      getHotels(data.destination),
      getPlaces(data.destination),
    ]);

    const realHotels = await getHotels(destination);
  const realTourism = await getPlaces(destination, "tourism");
  const realFood = await getPlaces(destination, "restaurant");

  const shuffledHotels = realHotels.sort(() => 0.5 - Math.random());

     const weatherContext = `The current weather in ${destination} is ${weather.temp}°C with ${weather.condition} conditions.`;
   const transitContext = `The user is travelling from ${from} to ${destination} and prefers ${transport}.`;

    // PROMPT WITH LOGIC CONSTRAINTS
    const prompt = `
      You are an expert Indian Travel Consultant specializing in highly personalized, geographically optimized itineraries for ${data.destination}.
      
      USER PROFILE:
      - Origin: ${data.from}
      - Duration: ${data.days} Days (Starting ${data.startDate})
      - Group: ${data.travellers}
      - Budget: ₹${data.budget} total per person
      - Travel Style: ${data.travelStyle} (Priority: Ensure the activities strictly match this vibe)
      - Diet: ${data.diet} (CRITICAL: Every restaurant suggestion must have highly-rated ${data.diet} options)
      - Interests: ${data.interests || "general sightseeing"}
      - Notes: ${data.notes}

      STRICT LOGISTICAL RULES:
      1. GEOGRAPHIC CLUSTERING: Group all "morning", "midday", and "evening" spots within a 5-10km radius to minimize travel time.
      2. REALISM: Use only real, Google Maps-verifiable locations. No "Local Markets" or "Exploring streets".
      3. PRICING: All budget estimates must be current for 2026.
      4. DIETARY: If user is "Vegetarian", do not suggest a famous Steakhouse even if it has a salad. Suggest a top-rated Veg restaurant.
      5. EXPERIENCE: If style is "Adventure", include trekking/water sports. If "Relax", include spas/cafes/viewpoints.

      - WEATHER CONTEXT: ${weatherContext}
- LOGISTICS: 
  Start Point: ${from}
  End Point: ${destination}
  Preferred Mode: ${transport}

RULES:
1. MANDATORY LOGISTICS: Before "Day 1", include a "travelTo" object. 
   - Suggest a specific route (e.g., "Flight from Mumbai to Bhuntar, then taxi to Manali").
   - If the preferred mode (${transport}) is impossible (e.g., No flight to a small village), 
     explicitly state: "Note: Direct ${transport} is not available. Suggesting [Alternative] instead."
2. WEATHER ADAPTATION: Adjust the activities based on ${weather.condition}. 
   - If "Rainy", suggest indoor museums or cafes. 
   - If "Cold/Snow", suggest winter sports.

3. CRITICAL INSTRUCTIONS:
    - You MUST only use hotels from this list: ${JSON.stringify(realHotels.map((h: any) => h.name))}
    - You MUST only use attractions from this list: ${JSON.stringify(realTourism.map((t: any) => t.name))}
    - You MUST only use restaurants from this list: ${JSON.stringify(realFood.map((f: any) => f.name))}
    For EACH day, select a unique hotel from this pool: ${JSON.stringify(shuffledHotels.map((h: any) => h.name))}.
  Do not repeat the same hotel for consecutive days unless no other options are available.

4. OUTPUT FORMAT: Return a JSON field "arrivalLogistics" containing { method, route, warning }.

      OUTPUT FORMAT: RETURN ONLY A VALID JSON OBJECT. NO MARKDOWN. NO PREAMBLE.

      {
        "destination": "${data.destination}",
        "tagline": "A unique one-liner",
        "arrivalLogistics": { "method": "", "route": "", "warning": "" },
        "days": [
          {
            "day": 1,
            "date": "Full Date & Theme",
            "morning": [
              {
                "name": "Real Place Name",
                "description": "2-3 lines about the place's significance. E.g., 'Calangute Beach is known as the Queen of Beaches. You can enjoy parasailing and jet-skiing here while taking in the golden sands and vibrant shack culture.'"
              }
            ],
            "midday": [
              {
                "name": "Real Place Name",
                "description": "Descriptive activities and place context here."
              }
            ],
            "evening": [
              {
                "name": "Real Place Name",
                "description": "Descriptive activities and place context here."
              }
            ],
            "breakfast": ["Restaurant — Recommendation"],
            "lunch": ["Restaurant — Recommendation"],
            "dinner": ["Restaurant — Recommendation"],
            "stay": ["Hotel Name — ₹Price, USP"],
            "transport": "Logistical advice",
            "budget": { "food": 0, "travel": 0, "stay": 0, "total": 0 }
          }
        ]
      }

      Generate exactly ${data.days} days. Ensure the JSON is 100% parseable.
    `;

    const rawItinerary = await generateItinerary(prompt);

    // Clean the AI response (stripping markdown fences if the AI ignores instructions)
    let cleanedJson = rawItinerary.replace(/```json|```/g, "").trim();
   cleanedJson = cleanedJson
  .replace(/[\u201C\u201D]/g, '"') 
  .replace(/[\u2018\u2019]/g, "'"); 
   
  
    let itinerary;
    try {
      itinerary = JSON.parse(cleanedJson);
    } catch (err) {
      console.error("JSON Parse Error. Raw response:", rawItinerary);
      throw new Error("AI generated an invalid JSON format.");
    }

// 1. Create a Set to track used search queries to prevent repeats
const usedQueries = new Set();

const dayImagePromises = itinerary.days.map(async (day, index) => {
  const allPlaces = [
    ...(day.morning || []),
    ...(day.midday || []),
    ...(day.evening || []),
  ];

  const cleanPlaces = allPlaces
    .map(p => {
      if (!p) return null;
      const name = typeof p === 'string' ? p.split(' — ')[0] : p.name;
      return name !== data.destination ? name : null;
    })
    .filter(Boolean);

  let randomPlace = cleanPlaces.find(p => !usedQueries.has(p)) || cleanPlaces[0] || data.destination;
  usedQueries.add(randomPlace);

  const searchQuery = `${randomPlace} ${data.destination} travel photography day ${index + 1}`;

  try {
    const img = await getImage(searchQuery);
    
    if (!img) throw new Error("No image found");
    
    return img;
  } catch (err) {

    return `https://unsplash.com/photos/black-dslr-camera-near-passport-98WPMlTl5xo`;
  }
});

const dayImages = await Promise.all(dayImagePromises);

    return NextResponse.json({
      success: true,
      itinerary: itinerary,
      weather,
      dayImages: dayImages, 
  image: dayImages[0],
      hotels,
      places,
    });

  } catch (error: any) {
    console.error("API Route Error:", error.message);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to generate itinerary" },
      { status: 500 }
    );
  }
}