# BMW viewer assets

The existing collection retains all 24 requested variants. The interactive viewer uses representative family configurations, not trim-specific scans. The BMW iX xDrive45 is an additional selectable perspective.

- F70: BMW 120, German configurator `/F70/81GE`.
- G60: BMW 520i, German configurator `/G60/11FJ`.
- G70: BMW 740 xDrive, German configurator `/G70/61HZ`.
- G68: standard China long-wheelbase entry; source configurator selects 525Li luxury package, `series=5&rangeCode=G68&packageCode=11FM_0ZLU`.
- I20: exact user-supplied iX xDrive45 configuration; see `rotation/i20/source.json`.

Exterior sequences contain 36 source camera angles. The four family viewers use every fourth frame of the existing processed sequence (the original-angle frames with edge feathering); optical-flow in-between frames are no longer served by the viewer. G68 has a 40-degree starting offset. The iX uses unmodified original preview frames. All frames are decoded before a sequence is enabled. The scroll stage keeps four complete 768px sequences (roughly 182 MiB decoded); the inspection viewer owns one additional sequence and releases it on close or family change.

Interior sources captured 2026-10-10 are in `interior/*-source.json`. F70, G60, G70, I20 expose six 2000x2000 cube faces, ordered down/front/back/up/right/left. G68 exposes a 4000x2000 equirectangular panorama. No cabin has been synthesized. Fetch the cube faces again using `node frontend/scripts/download-bmw-interiors.mjs f70 g60 g70 i20` from the repository root.

The main scroll journey gives each family an exterior turn, a blended push into its cabin, a gentle interior camera pan, and a return to the exterior before the next family handoff. Adjacent original exterior frames blend continuously. Images are contained at their native aspect ratio in both the journey and inspection viewer, including the wider G68 source.

The journey dynamically loads one Three.js renderer and preloads 1024px cube faces (2048px for the China panorama). Texture upload and background shader warmup happen before display when possible. Painting occurs only when the scroll camera, cabin opacity or viewport changes; rendering is skipped offscreen and in hidden tabs. Device pixel ratio is capped at 1.5. Resources are disposed on unmount. The popup loads its own higher-resolution cabin only when selected. Reduced-motion users retain the static collection and optional inspection viewer.

Exterior rotation is an image sequence, not a geometric 3D model: native angular resolution remains 10 degrees, with adjacent-frame blending rather than synthesized geometry. Exterior-to-interior and family changes are aligned crossfades, not a continuous physical camera travelling through a 3D car.
