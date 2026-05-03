# Lab 2 — Task 1: Event Catalog

A React Native screen presenting a catalog of events with search, category
filtering and per-item state changes. Built for CodeSandbox / Expo.

## Features
- Header with title, subtitle and live count of visible results.
- `TextInput` search filtering by event title.
- Horizontal category filter bar (All / Science / Sport / Music / Film) — the
  active category is visually distinct.
- `FlatList` of events rendered through a reusable `EventCard` component.
- Each card receives `title`, `date`, `category`, `location`, `favorite` and a
  `badge` prop, and exposes a `Pressable` favorites toggle that updates the
  individual item's state.
- The filtered list is **derived** from state (via `useMemo`) — never stored.

## Custom extensions (above the minimum)
1. **Favorites-only mode** — toggle in the search bar.
2. **`New` / `Popular` badges** rendered on event cards.
3. **Light / dark theme** toggle in the header.

## Files
- `App.js` — screen composition, state and derived filtering.
- `components/Header.js` — title, subtitle, theme toggle, results counter.
- `components/SearchBar.js` — `TextInput` and favorites-only `Pressable`.
- `components/CategoryFilter.js` — horizontal chip bar (`Pressable` chips).
- `components/EventCard.js` — reusable list item.
- `data/events.js` — event data and category list.
- `theme.js` — light and dark palettes.

## Notes
- Styling exclusively through `StyleSheet.create()`.
- All interactions use `Pressable`, no `Button`.
- No external UI libraries.
