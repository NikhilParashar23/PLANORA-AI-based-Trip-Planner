export async function getWeather(city: string) {
  try {
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${process.env.OPENWEATHER_API_KEY}&units=metric`
    );
    const data = await res.json();
    return {
      temp: Math.round(data.main.temp),
      condition: data.weather[0].main,
    };
  } catch (e) {
    return { temp: "N/A", condition: "unknown" };
  }
}