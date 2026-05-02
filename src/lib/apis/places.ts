export async function getPlaces(city: string, category: "restaurant" | "tourism" = "tourism") {
  try {
    // Step 1: Get city coordinates using Nominatim (Free, No Key)
    const geoRes = await fetch(
      `https://nominatim.openstreetmap.org/search?city=${encodeURIComponent(city)}&format=json&limit=1`,
      { headers: { "User-Agent": "Planora/1.0" } }
    );
    const geoData = await geoRes.json();
    if (!geoData.length) return [];

    const { lat, lon } = geoData[0];
    const radius = 5000; // 5km search radius

    // Step 2: Query Overpass API for real nodes
    const query = `[out:json];
      (
        node["${category === "restaurant" ? "amenity" : "tourism"}"](around:${radius},${lat},${lon});
      );
      out body 10;`;

    const res = await fetch("https://overpass-api.de/api/interpreter", {
      method: "POST",
      body: query,
    });

    const data = await res.json();
    
    // Return a list of names and their "tags" for the AI to understand the vibe
    return data.elements.map((el: any) => ({
      name: el.tags.name || "Unnamed Place",
      cuisine: el.tags.cuisine || "Local",
      type: el.tags.tourism || el.tags.amenity,
      address: el.tags["addr:street"] || ""
    })).filter((p: any) => p.name !== "Unnamed Place");

  } catch (error) {
    console.error("Places API failed:", error);
    return [];
  }
}