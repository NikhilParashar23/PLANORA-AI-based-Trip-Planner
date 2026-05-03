export async function getHotels(city: string) {
  try {
    // Step 1: Get city coordinates (Same as places.tsx)
    const geoRes = await fetch(
      `https://nominatim.openstreetmap.org/search?city=${encodeURIComponent(city)}&format=json&limit=1`,
      { headers: { "User-Agent": "Planora/1.0" } }
    );
    const geoData = await geoRes.json();
    if (!geoData.length) return [];

    const { lat, lon } = geoData[0];
    const radius = 8000; // Expanded to 8km for hotels

    // Step 2: Query Overpass for nodes tagged as 'hotel' or 'guest_house'
    const query = `[out:json];
      (
        node["tourism"~"hotel|guest_house|resort"](around:${radius},${lat},${lon});
        way["tourism"~"hotel|guest_house|resort"](around:${radius},${lat},${lon});
      );
      out tags 10;`;

    const res = await fetch("https://overpass-api.de/api/interpreter", {
      method: "POST",
      body: query,
    });

    const data = await res.json();
    
    // Step 3: Map real hotel data
    return data.elements
      .map((el: any) => {
        // OSM tags can vary, so we extract the most useful ones
        const stars = el.tags["stars"] ? " ⭐".repeat(parseInt(el.tags["stars"])) : "";
        
        return {
          name: el.tags.name || "Unnamed Accommodation",
          type: el.tags.tourism,
          stars: stars,
          website: el.tags.website || "",
          address: el.tags["addr:street"] || "Central Area",
          // Estimating price based on OSM "luxury" or "stars" tags if available, 
          // otherwise defaulting to a standard symbol
          priceRange: el.tags["stars"] && parseInt(el.tags["stars"]) > 3 ? "₹₹₹" : "₹₹"
        };
      })
      .filter((h: any) => h.name !== "Unnamed Accommodation");

  } catch (error) {
    console.error("Hotels API failed:", error);
    return [];
  }
}