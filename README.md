<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/drive/1QcYXig6dQPZbyPygjRtyCsv6XUSO0xzo

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`

## Land Studio (SiamPlot)

Six concept layouts at `/#land-studio`: agriculture/packing, logistics/cold chain,
food processing, roadside services, demonstration/learning, and phased development.
`land-studio/data.ts` holds the common schematic boundary, massing and illustrative
space budgets. `copy.ts` holds Thai, English, Chinese and Japanese content.

The source is the existing `257-004.jpeg` sketch (original retained); its upper-right
end is cropped. The model closes that edge provisionally with a dashed line. It is
not surveyed, georeferenced, scaled or a terrain model. Heights, roads, water areas,
gates and footprints are concepts. Budget percentages are independent discussion
inputs, not measurements of the geometry or statutory building coverage. No zoning,
capacity, cost, return or permission outcome is asserted by this feature.

Before accurate design: obtain title and coordinate boundary/KML/DWG, topographic
and soil surveys, flood/drainage information, written land-use verification, highway
access conditions and utility capacity confirmation. The section links directly to
DPT, DOH and PEA channels; these are references, not endorsements or approvals.

### Development and checks

Run `npm ci`, `npm run dev`, `npm run build`, `npx tsc --noEmit`, and
`node scripts/check-land-studio.mjs`. The script checks all six layouts' footprint
corners, budgets totaling 100%, and technical copy in four languages.

The initial view is an accessible SVG poster. Three.js/OrbitControls load only after
activation. If WebGL 2 creation fails, a lazy SVG software 3D renderer provides yaw,
pitch, zoom, top/reset, drag, keyboard and 360-degree rotation without a GPU. Both
renderers stop animation offscreen; WebGL also pauses in hidden tabs. Rotation starts paused. No new
server, secrets, environment variables or API writes are needed. Existing GA4 is
preserved. Source drawings use responsive WebP derivatives with explicit dimensions.

Production build sizes (uncompressed/gzip): before this feature main JS 501.84/143.39
kB; after main JS approximately 547.6/160.9 kB, CSS 10.4/2.8 kB; on activation only,
WebGL chunk 591.8/150.4 kB, software fallback 4.0/1.8 kB if needed. These are build
bytes, not measured LCP, INP, CLS or complete page-transfer results. No field metrics
are available for the new feature. Physical mobile GPU testing remains outstanding.

### Delivery and rollback

Production is Netlify project `257rai`, repo `devoncasa/257rai-chachoengsao-industrial`,
branch `main`, canonical domain `https://www.siamplot.com`. Publish by the existing
Git-connected CI. The separate visual-redesign draft PR is not part of this feature.
Rollback through a revert commit of the Land Studio feature on `main`, let Netlify
redeploy, then verify the public domain and existing contact links. No database or
DNS migration is involved.
