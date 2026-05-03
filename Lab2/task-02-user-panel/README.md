# Lab 2 — Task 2: User Panel

A React Native screen featuring a profile card, an edit form with validation
and a settings section. Built for CodeSandbox / Expo.

## Features
- Profile card with avatar (initials), name, city and short bio.
- Controlled edit form with fields: name, email, city, bio.
- `Save changes` button performing validation:
  - name cannot be empty,
  - email must contain `@`,
  - bio cannot exceed the configured limit (160 chars).
- Inline error / success feedback under the form.
- Settings section with at least four reusable `SettingsRow` items:
  - Notifications, Privacy, Dark theme, About app.
- Light / dark theme toggle that re-styles the entire screen.
- The screen is wrapped in `ScrollView`, so it remains scrollable on any
  device height.

## Custom extensions (above the minimum)
1. **Bio character counter** — live count under the bio field, turning red
   when over the limit.
2. **Log out button** in a highlighted, danger-styled section, with a
   confirmation alert.
3. **Password field with show / hide toggle** (a custom `Pressable` slot
   inside the reusable `FormField`).

## Files
- `App.js` — screen composition, controlled form state, validation.
- `components/ProfileCard.js` — profile preview block.
- `components/FormField.js` — reusable labeled `TextInput` with optional
  right-side slot and helper text.
- `components/SettingsRow.js` — reusable settings entry (toggle / link).
- `theme.js` — light and dark palettes.

## Notes
- All styles via `StyleSheet.create()`.
- All interactions use `Pressable`, no `Button`.
- No external UI / form libraries.
