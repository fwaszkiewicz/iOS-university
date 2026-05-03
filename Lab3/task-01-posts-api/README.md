# Lab 3 — Task 1: Posts API client

A React Native screen demonstrating client–server communication with the
public REST API at `https://api.jsonplaceholder.dev` (resource `/posts`).
Built for CodeSandbox / Expo.

## Part A — fetching data
- On mount, the app calls `GET /posts` via `fetch` inside `useEffect`.
- Posts are rendered in a scrollable `FlatList` showing `id`, `userId`,
  `title` and `body` for each item.
- Loading state shows a spinner with a status message.
- Network or HTTP errors are caught with `try/catch`, and the response is
  validated via `response.ok`. A `Try again` button re-runs the request.

## Part B — sending data
- A form with `title`, `body` and `userId` fields, each backed by its own
  state variable.
- Empty fields (and a non-numeric `userId`) are rejected before any request.
- `Send` performs `POST /posts` with `Content-Type: application/json` and
  `JSON.stringify` body.
- On success: green confirmation banner, JSON server response shown
  verbatim, the form is cleared, and the new post is prepended to the list.
- On failure: red banner with the underlying error message.

## Custom extensions (above the minimum)
1. **Filter by `userId`** — horizontal chip bar derived from the loaded
   posts, with an `All` option.
2. **Delete via `DELETE /posts/:id`** — per-card delete button with optimistic
   list update.
3. **Per-post comments** — `Show comments` calls `GET /posts/:id/comments`
   on demand (lazy, cached, with its own loading/error state).
4. **Light / dark theme** toggle in the header, plus a manual refresh button.

## Files
- `App.js` — screen composition and state orchestration.
- `api/posts.js` — `fetch`-based REST client (`fetchPosts`, `fetchPost`,
  `fetchComments`, `createPost`, `deletePost`) with `response.ok` checks.
- `components/Header.js` — title, refresh and theme toggle.
- `components/NewPostForm.js` — POST form, feedback banner, server response.
- `components/UserFilter.js` — horizontal chip filter for `userId`.
- `components/PostCard.js` — list item with delete + on-demand comments.
- `theme.js` — light and dark palettes.

## Notes
- Styling exclusively via `StyleSheet.create()`.
- Interactions through `Pressable`, no `Button`.
- No external UI / form / HTTP libraries — only the built-in `fetch`.
- `useEffect` is used only where it makes sense (initial data fetch on mount).
