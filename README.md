# SiamPlots visual preview

Review branch `preview/siamplots-visual-study`. Production remains on `main`.
Base commit `8b99a55f6d23e9cbfebe2bac8b8e38a081538cba`.

## Run

Use Node 22 or later. Run `npm ci`, `npm run dev`, `npm run check`, and `npm run build`.
The build creates `dist/` and language entry pages `/en/`, `/zh/`, `/ja/` with Thai at `/`.
For managed review use `sites-preview start /absolute/path/to/checkout`.
No API key or environment variables are required.

## Review scope

Ten section anchors are retained. New Thai-first editorial copy is localized into English, Chinese and Japanese. Full original translation data remains in constants.ts. Historical source descriptions, original company and connection tables, business-use ideas and six analysis chapters remain in labeled disclosures. The old research is identified as Q3 2025, pending review. Existing telephone, email, WhatsApp and seller map destinations are retained.

Eight AI-generated concept photographs are clearly labeled in every placement. They do not represent the property, actual staff, installed utilities, access conditions or nearby businesses. Full-resolution original PNGs are retained separately in the delivered SiamPlots-Visual-Preview.zip under design-originals/. The review branch contains the optimized web images and an asset manifest. Web delivery uses 640, 960 and 1600 pixel WebP derivatives in public/media/. Replace concepts with verified property photography before a sales release where real evidence is required. Original repository Street View screenshots remain untouched but are not displayed in this preview.

Fonts are self-hosted through @fontsource. Runtime Tailwind CDN, obsolete index.css link and unused Gemini client-key substitution were removed. Preview is noindex. The verified GA4 stream G-YTH1CE6XB4 is configured in analytics.ts and loads only on siamplot.com or www.siamplot.com; local, Netlify alias and review hosts send no analytics events. Contact clicks use contact_click with phone/email/whatsapp method and page language; they do not claim a completed enquiry. Production indexing metadata, structured data, social cards, prerendering, hreflang, analytics and full accessibility/performance signoff are release work, not claims made by this visual preview.

## Verification

TypeScript check and Vite production build pass. Browser checks at desktop and simulated phone/tablet widths covered ten sections, no document horizontal overflow, mobile menu to price, modal Escape and restored opener focus, language switching in all four languages, and English reload. Contact destinations were inspected without sending messages. This is not physical-device testing or a WCAG certification. No matched before/after Lighthouse series was run on this preview.

## Delivery and rollback

This branch is for review only. Do not merge or deploy to production without explicit approval. The custom domain previously showed a registrar clientHold and needs account-level resolution; this change does not resolve it. Production repository branch is main; known Netlify site is 257rai, ID 5809108b-70a1-47c5-930b-0f17239b768b. No production deployment was created.

Discarding this review branch leaves production unchanged. If later released, record the precise production commit and deploy ID; rollback by reverting the release commit through the same reviewed CI workflow. Do not delete originals during image replacement.

## Domain transition, 4 November 2026

The requested domain is www.siamplot.com (singular), registered at Spaceship. Netlify project 257rai remains the hosting target; the old www.siamplots.com spelling is a separate domain. External DNS should direct www by CNAME to 257rai.netlify.app and the apex by an ALIAS/flattened CNAME to apex-loadbalancer.netlify.com, or Netlify’s documented A-record fallback. Preserve existing MX/TXT and unrelated records. Netlify dashboard and GA4 stream URL have been updated to the new hostname. DNS verification and HTTPS must be completed before claiming the domain live. Connecting the domain does not authorize merging this design preview.
