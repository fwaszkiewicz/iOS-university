// What works: async/await, fetch, try/catch.
// Custom extension: Wrapper function to handle dynamic coordinates.
// Main difficulty: Parsing the deeply nested JSON payload.

async function fetchWeather(lat = 50.29, lon = 19.10) {
  try {
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,wind_speed_10m`;
    const response = await fetch(url);
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    
    const data = await response.json();
    console.log(`Weather at [${lat}, ${lon}]:`);
    console.log(`Temperature: ${data.current.temperature_2m}°C`);
    console.log(`Wind Speed: ${data.current.wind_speed_10m} km/h`);
  } catch (error) {
    console.error("Failed to fetch weather data:", error.message);
  }
}

fetchWeather();
// extension
fetchWeather(52.22, 21.01); // Warsaw
