import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const data = await request.json();
    console.log("Generating itinerary for:", data);
    
    // Mimic processing delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    return NextResponse.json({ success: true, message: `Itinerary to ${data.location} generated.` });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to generate itinerary" }, { status: 500 });
  }
}
