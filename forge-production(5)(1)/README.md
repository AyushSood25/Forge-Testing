# Forge — Production Build V9.4

UX + polish pass on top of V9.3.

## What changed (V9.4)
- **Track horizontal-overflow fixed:** sections now clip stray horizontal overflow
  (`.section { overflow-x: hidden }`), so swiping no longer shifts the screen sideways. Safe for the sticky nav.
- **Smooth theme switch:** night ↔ light now crossfades via the View Transitions API
  (graceful instant fallback + colour transition on older browsers). Respects reduced-motion.
- **More motion:** subtle press feedback (scale / fade) on buttons, pills, chips, toggles, FABs and
  setting rows; existing section fade kept.
- **Removed the permanent "Synced" text** from the top banner — the small status dot stays (colour = state).
- **Swipe-down to dismiss** on the three bottom sheets: Settings, AI chat, and Quick-Log.
  Drag from the top (or anywhere at scroll-top) > ~90px to close; release short to snap back.
  Added grab handles to Settings + chat (Quick-Log already had one).
- Build tag → V9.4, SW cache `forge-v9.3` → `forge-v9.4`.

## Note
The earlier-flagged `🔔` in the JS notification fallback (`NOTIF_DETAILS`) is still there
(OS-notification text, not in-app UI) — left untouched on purpose.

---

# Forge — Production Build V9.3

"New You" logo system + Quiet Mark settings redesign + subtle app-wide branding.
Drop-in replacement for your previous deploy.

## What changed
### V9.3 — settings + branding (this release)
- **Settings redesigned ("Quiet Mark"):** brand header (mark + *Forge*) at the top,
  account row, and a quiet footer (mark + *Forge · v9.3*). Feel preserved — just more refined.
- **Emoji → crafted SVG line icons** for every settings row (night mode, reminders, export,
  install, sign out). This fixes the prior "no emoji" rule break and is the main premium lift.
- **Logo woven into more places (subtle):**
  - AI chat header — small mark before *Forge AI*
  - Coach popup — small mark before *Your week with Forge*
  - Empty states — faded mark as a quiet illustration (meal-ideas ×2, first-photo)
  - (Already from V9.2: auth screen, loader, nav bar)
- Core daily screens (Today / Workout / Diet / Track) untouched — the app's feel is intact.
- All marks are theme-reactive (`var(--accent)` + `--logo-ghost`) — auto light/night.
- Build tag → V9.3, SW cache `forge-v9.2` → `forge-v9.3` (forces update).

### V9.2 — logo system (carried over)
- Theme-reactive mark in auth/loader/nav; Fraunces *Forge* wordmark.
- Icon set: `favicon.svg`, `favicon-32`, `apple-touch-icon` (180),
  `icon-192/512` (any) + `icon-maskable-192/512` (maskable) in `manifest.json`.

## Deploy (Cloudflare Worker + Static Assets)
`_worker.js` serves everything via `env.ASSETS`. Upload/replace the root files:
`index.html, _worker.js, sw.js, manifest.json, favicon.svg, favicon-32.png,
apple-touch-icon.png, icon-192.png, icon-512.png, icon-maskable-192.png, icon-maskable-512.png`
Deploy. The SW bump auto-updates installed PWAs on next load. Keep the Worker URL stable.

## /brand  (design + APK assets — not needed on the web server)
Master vector logo set (light + night), `icon-rounded.svg`, `icon-maskable.svg`,
and `splash-light/dark.png` (2732², for the Phase-1 Capacitor APK).
SVGs are the masters — scale losslessly.

## Noted (out of scope, optional later)
One emoji remains in JS (`NOTIF_DETAILS` fallback `🔔`) used for OS notification bodies,
not in-app UI. Left untouched to avoid changing notification logic — easy to swap later.
