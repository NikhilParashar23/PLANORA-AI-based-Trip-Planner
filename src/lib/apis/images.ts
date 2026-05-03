// lib/apis/images.ts

export async function getImage(query: string) {
  const res = await fetch(
    `https://api.unsplash.com/search/photos?query=${encodeURIComponent(
      query
    )}&per_page=1`,
    {
      headers: {
        Authorization: `Client-ID ${process.env.UNSPLASH_ACCESS_KEY}`,
      },
    }
  );

  if (!res.ok) {
    throw new Error("Image API failed");
  }

  const data = await res.json();

  return data?.results?.[0]?.urls?.regular || null;
}