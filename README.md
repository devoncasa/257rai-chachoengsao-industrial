# SiamPlot

Production: https://www.siamplot.com/ (Spaceship DNS, Netlify hosting).
Repository: `devoncasa/257rai-chachoengsao-industrial`; production branch `main`.
Netlify project `257rai`, site ID `5809108b-70a1-47c5-930b-0f17239b768b`.

## Release: 4 November 2026

The owner approved the editorial design at `https://deploy-preview-1--257rai.netlify.app/`
for production. This release uses its ivory/forest layouts, photography, self-hosted
fonts, disclosures and four languages, combined with the existing live Land Studio.
The preview source was `6881d0cd478f652a76f8069834a5a3cd8b338b1c`; the production
baseline was `9a48a026293301506831e7ad6b070f9cda525f94`. Historical filenames and
repository identifiers retain their real paths; the visible brand is SiamPlot.

Thai is `/`; English `/en/`, Chinese `/zh/`, Japanese `/ja/`. `/th/` redirects to `/`.
All ten original section anchors and the new `#land-studio` anchor remain. Original
listing content, tables and six research chapters remain in labeled disclosures.
Historical research is labeled Q3 2025; listing facts and prices require seller
confirmation. No old pages or original property images were deleted.

Eight concept photographs from the approved preview are clearly labeled, including
on mobile. They are not pictures of the property, its employees or installed utilities.
`public/media/` contains responsive 640/960/1600px WebP derivatives. Original PNGs
remain in the previously delivered `SiamPlots-Visual-Preview.zip`; the asset manifest
`scripts/image-assets.json` records their provenance and hashes. Do not remove the
concept-image captions or present this imagery as evidence of the actual property.

## Run and verify

Use Node 22 or later. No API keys or environment variables are required.

```sh
npm ci
npm run dev
npm run check
npm run build
node scripts/check-land-studio.mjs
python3 scripts/check-release.py
```

`npm run build` runs Vite then `scripts/locale-pages.mjs`. It renders four complete
localized HTML documents using React server rendering at build time. The browser
hydrates this content. Each locale has a distinct title/description, self-canonical,
reciprocal hreflang, social metadata and factual WebSite/WebPage JSON-LD. The build
also creates robots.txt and sitemap.xml. Netlify production is indexable; nonproduction
CONTEXT builds retain noindex. Netlify also supplies its preview noindex headers.

The release script checks generated anchors, images/dimensions, locale metadata,
unique IDs, one H1, all six scenarios, robots and sitemap. The geometry script checks
footprint corners inside the schematic outline, budgets and four-language content.
Use `sites-preview start /absolute/checkout` for managed browser QA. Simulated
phone/tablet checks do not replace physical device or GPU testing.

## Analytics and contacts

GA4 `G-YTH1CE6XB4` is retained in `analytics.ts`. It loads only on `siamplot.com` and
`www.siamplot.com`, after window load. Local/preview hosts send no Google events.
Contact clicks emit `contact_click` with method and language; this is not a claim
of completed enquiry. Contact destinations remain `tel:+66818519922`,
`https://wa.me/66818519922`, `mailto:k.laohasiri@gmail.com`, and the seller map
`https://maps.app.goo.gl/w3rbjKfWmFMmLvBc7`. The website has no enquiry form endpoint.

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


### Rendering and performance

The initial view is an accessible SVG poster. Three.js/OrbitControls load only after
activation. WebGL 2 failure switches to a lazy SVG software 3D renderer supporting
rotation, pitch, zoom, top/reset, drag, keyboard and automatic 360-degree rotation.
Both renderers stop animation offscreen; WebGL also pauses in hidden tabs.
Rotation starts paused. No new server, secrets, formula or API writes are involved.

Before editorial release: main JS 547.85 kB / 160.94 kB gzip. The combined editorial
release is approximately 539.4 kB / 161.4 kB gzip, CSS 29.5 / 6.8 kB. The on-demand
WebGL chunk remains 591.8 / 150.4 kB; fallback about 3.9 / 1.8 kB. These are build
bytes, not measured LCP, INP, CLS or complete page transfer. Runtime Tailwind CDN and
remote font loading are removed; images are responsive WebP with dimensions and
lazy offscreen loading. The hero is eager/high priority. Field metrics for the new
release are not yet available; no matched Lighthouse result is claimed.

## Delivery and recovery

Publish by committing to `main` through the existing Git-connected Netlify CI.
Verify the deploy state is ready and commit matches the intended release, then check
the live customer domain, contact flow, languages and Land Studio. Keep `.netlify`
and environment files ignored. No DNS or database migration is needed for this release.

To undo this release, revert its commit(s) on `main` and let CI publish the correction;
verify the resulting live site. A failed build leaves the prior published version live.
