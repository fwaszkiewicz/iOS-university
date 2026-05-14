const BASE_URL = "https://api.open-meteo.com/v1/forecast";

export async function fetchWeather({ latitude, longitude }) {
  const params = new URLSearchParams({
    latitude: String(latitude),
    longitude: String(longitude),
    current: "temperature_2m,wind_speed_10m,precipitation",
    hourly: "temperature_2m,precipitation_probability,precipitation",
    forecast_days: "2",
    timezone: "auto",
  });

  const url = `${BASE_URL}?${params.toString()}`;
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Weather request failed (${response.status}).`);
  }

  const data = await response.json();
  return normalize(data);
}

function normalize(raw) {
  const current = raw?.current ?? {};
  const hourly = raw?.hourly ?? {};
  const times = Array.isArray(hourly.time) ? hourly.time : [];
  const temps = Array.isArray(hourly.temperature_2m) ? hourly.temperature_2m : [];
  const probs = Array.isArray(hourly.precipitation_probability)
    ? hourly.precipitation_probability
    : [];
  const precs = Array.isArray(hourly.precipitation) ? hourly.precipitation : [];

  const nowMs = Date.now();
  let startIndex = times.findIndex((t) => new Date(t).getTime() >= nowMs);
  if (startIndex < 0) startIndex = 0;

  const hourlyRecords = [];
  for (let i = startIndex; i < times.length && hourlyRecords.length < 24; i += 1) {
    hourlyRecords.push({
      time: times[i],
      temperature: temps[i],
      precipitationProbability: probs[i],
      precipitation: precs[i],
    });
  }

  return {
    latitude: raw?.latitude,
    longitude: raw?.longitude,
    timezone: raw?.timezone,
    units: {
      temperature: raw?.current_units?.temperature_2m ?? "°C",
      windSpeed: raw?.current_units?.wind_speed_10m ?? "km/h",
      precipitation: raw?.current_units?.precipitation ?? "mm",
      precipitationProbability:
        raw?.hourly_units?.precipitation_probability ?? "%",
    },
    current: {
      time: current.time,
      temperature: current.temperature_2m,
      windSpeed: current.wind_speed_10m,
      precipitation: current.precipitation,
    },
    hourly: hourlyRecords,
    fetchedAt: new Date().toISOString(),
  };
}
