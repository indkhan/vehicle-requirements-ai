# FORM — vehicle requirements frontend

A local React/Vite frontend with a BMW sedan scroll journey inspired by the pinned scenes and vehicle transitions at https://unitedcarriers.com/. It opens with an animated collection and leads into the existing requirements workspace.

## Run

Requires Node.js 22.12+ (verified with Node 26.7) and npm.

```powershell
cd frontend
npm ci
npm run dev
```

Open the printed local URL. `npm test` runs interaction tests; `npm run build` creates `dist/`.

## Implemented

- One persistent canvas studio: F70, G60, G68 and G70 rotate through front, side and rear views on a shared, reversible scroll timeline. Frame-independent damping smooths native scroll input; the camera angle carries across family handoffs.
- All 23 requested named variants plus one standard G68 China long-wheelbase entry. Family filters and selected-variant handoff into the workspace.
- Responsive compositions, chapter navigation, an animation skip link and static chapters for reduced-motion preferences.
- Responsive vehicle workspace with the selected model image, detail view and keyboard-accessible seat finding.
- Findings, source evidence, proposal editing, linked evidence graph and session history.
- Run setup with autonomous/guided selection, Deep Dive toggle and local file selection validation.
- Modal keyboard focus containment, Escape dismissal and focus restoration.
- Shared `contracts/scenarios.json` fixture data; no invented feedback totals or real-world competitor claims.

## Current scope

This is a synthetic frontend demo, not a completed implementation of every package in `frontend_plan.md`. State and edits last for the current browser session. Creating another demo run resets the proposal and history.

Files are selected and validated locally; they are never uploaded or parsed. Demo creation uses the shared fixture regardless of selected model or files. Model descriptions are exploratory persona prompts, not customer research or verified specifications. Deep Dive displays the contract's partial synthetic research example. Reimagine explains the annotation-only support; it does not call a generation provider.

The journey uses locally stored official BMW configurator angle sequences: 36 source views per family, with optical-flow in-between views baked into 144 WebP frames. This is a 360-degree image sequence, not a WebGL mesh. Family imagery represents the body style rather than each individual engine/trim configuration. Source pages and image URLs are recorded in `public/images/bmw/rotation-sources.json`; the earlier overview assets retain `sources.json`. This is an independent concept, not an official BMW product.

Runtime rendering keeps a bounded 64-frame image cache and a small bidirectional look-ahead ring. Canvas painting stops when the scene is still or the document is hidden. No animation library or Python dependency is needed to run the frontend. To rebuild interpolated assets only, install Pillow, numpy and opencv-python-headless into an isolated Python environment and run `python scripts/bake-rotation.py`. The original generated sedan remains the standalone workspace fallback.

Live authentication, API uploads, events/reconnection, version conflict handling, renderer integration, variants and authorized exports remain to be connected to the backend contract. No backend code is changed by this frontend. Fonts load from Google Fonts with system fallbacks.
