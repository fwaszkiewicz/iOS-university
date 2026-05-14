# Lab 4 — Task 1: Weather "here & now" from device GPS

A React Native (Expo) screen that reads the device's current GPS position,
queries the public [Open-Meteo](https://open-meteo.com/en/docs) forecast API
and shows the current weather plus the next 24 hourly records. Built for the
Expo runtime, no external UI / HTTP libraries — only `fetch`, `expo-location`
and `expo-sqlite`.

## Required scope
- **Acquire current location.** On mount the app asks for foreground
  location permission via `Location.requestForegroundPermissionsAsync()`.
  Only after `status === "granted"` does it call
  `Location.getCurrentPositionAsync()`.
- **Query the weather API.** Coordinates are passed to
  `https://api.open-meteo.com/v1/forecast` with the parameters from the lab
  brief (`current=temperature_2m,wind_speed_10m,precipitation`,
  `hourly=temperature_2m,precipitation_probability,precipitation`,
  `forecast_days=2`, `timezone=auto`).
- **Display temperature, wind speed and precipitation** for the current
  reading, plus the matching hourly series.
- **Permission denial is handled.** When the user declines, the app shows a
  warning banner with an "Open settings" deep link, and still tries to fall
  back to the last cached result.

## Extensions (beyond the minimum)
- **Manual refresh** — header button re-runs the full
  permission → GPS → API → cache pipeline.
- **Persistent last-result cache** via `expo-sqlite`. On launch the app
  hydrates from the cache first (instant UI), then refreshes in the
  background. A `cached` / `live` tag and the saved-at timestamp tell the
  user which they're looking at.
- **24-hour horizontal forecast strip** that starts from the next full hour
  (not midnight of the current day), with temperature, precipitation
  probability and precipitation amount per hour.
- **Light / dark theme toggle** in the header.

## Files
- `App.js` — screen composition, permission flow and state orchestration.
- `api/weather.js` — `fetch`-based Open-Meteo client; trims the hourly
  series to the next 24 records and normalises units.
- `storage/cache.js` — single-row `expo-sqlite` cache for the last good
  response (works with both the legacy and the new async SQLite API).
- `components/Header.js` — title, manual refresh and theme toggle.
- `components/CurrentWeather.js` — current temperature card with wind and
  precipitation metrics plus metadata (coords, measurement time, fetch
  time, source tag).
- `components/HourlyForecast.js` — horizontal 24h list.
- `components/StatusBanner.js` — reusable info / warning / error banner
  with an optional action button.
- `theme.js` — light and dark palettes.

## Hints applied
- Location is requested **before** any GPS read.
- `latitude` and `longitude` from `expo-location` are forwarded verbatim to
  the API call.
- The hourly section is filtered to the next 24 entries starting from the
  current hour.
- The last successful response is written to SQLite and re-read on the next
  launch so the app stays useful offline / before GPS resolves.

## Notes
- Styling exclusively via `StyleSheet.create()`.
- Interactions through `Pressable`, no `Button`.
- No external UI / form / HTTP libraries — only the built-in `fetch`.
- `useEffect` is used only for the initial bootstrap (cache hydrate +
  permission + first fetch).
