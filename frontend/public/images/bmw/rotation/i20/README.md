# BMW iX 360-degree extraction

Extracted on 2026-10-10 from the exact user-supplied BMW configuration.

- Vehicle: BMW iX xDrive45, I20 / 41CF, Arctic Race Blue metallic.
- 36 original exterior views: 0 through 350 degrees in 10-degree increments.
- `original/`: 2560 x 1440 unmodified BMW WebP images.
- `preview/`: 960 x 540 unmodified BMW WebP images.
- `source.json`: complete observed BMW manifest and configuration URL.
- `manifest.json`: saved files, source URLs, dimensions, byte counts and SHA-256 checksums.
- Local viewer: `/ix-360.html`. It decodes every preview frame before enabling drag/keyboard/slider controls.

No optical-flow interpolation, synthetic angles or geometry were generated. This is an image sequence, not a 3D mesh. It has the same 36-angle source density as the earlier BMW sequences; extraction alone does not remove the 10-degree angular steps. It is kept separate from the requested F70/G60/G68/G70 collection.

To download the captured sources again, run `node frontend/scripts/download-bmw-rotation.mjs` from the repository root. The downloader validates the source host, HTTP content type and WebP signature, then records checksums.
