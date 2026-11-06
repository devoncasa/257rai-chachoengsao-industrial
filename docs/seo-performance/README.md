# SiamPlot search and performance review — 6 November 2026

Implementation: preview commit `980d2acd1c38078f207038105523e4ff56e4b813`, PR #2, branch `preview/field-atlas-20261106`. Production `main` remains `292ab4aad66b017617be81820381a0a2ddba89f2`. Host: Netlify 257rai. Canonical origin: https://www.siamplot.com.

Preview: https://6aedbdfc0cbc788992400d23--257rai.netlify.app/

## Coverage and changes

- 32 HTML pages: four homepages and seven investor pages per language, Thai, English, Simplified Chinese and Japanese. All metadata and local links checked; preview HTTP results recorded separately.
- Distinct titles and descriptions; self canonicals; reciprocal language alternates and x-default; sitemap; localized social metadata, captions and image descriptions; WebPage/WebSite and guide BreadcrumbList structured data. No fabricated price, reviews, parcel permits or incentive eligibility.
- Added full guide localization rather than linking foreign-language users to Thai-only guides. Native vocabulary includes cross-docking / 越库配送 / クロスドック and build-to-suit / 定制建设 / 専用施設.
- Visible localized buyer answers explain EEC location versus project eligibility, whole-parcel sale, size conversions, feasibility checks and arranging a site visit. Existing references remain attached to the investment guides. AI visibility is not guaranteed; there is no special AI schema or meta-keyword trick.
- Original homepage content preservation: 457 normalized text nodes per language remain; no original images removed; original section sequence retained, with buyer answers appended.
- Browser JavaScript: 354.21 KB → 3.78 KB, approximately 114.52 KB → 1.76 KB gzip. Build-time React rendering retained; native HTML controls enhanced by a small script. Fixed heading hierarchy and font-swap CLS. Inlined the measured 12 KB gzip blocking stylesheet. All checked browser images use WebP. Existing original images, map references and contact routes retained.

## Representative lab results (median of three cold runs)

| Page/device | Performance before → after | LCP before → after | CLS before → after | Transferred bytes before → after |
|---|---|---|---|---|
| Thai home/mobile | 92 → 98 | 3.106 s → 2.187 s | 0.0893 → 0 | 481,171 → 424,156 |
| Thai home/desktop | 100 → 100 | 0.681 s → 0.549 s | 0.0207 → 0 | 641,492 → 530,268 |
| Thai logistics/mobile | 100 → 100 | 1.210 s → 0.756 s | 0 → 0 | 195,298 → 196,114 |
| Thai logistics/desktop | 100 → 100 | 0.286 s → 0.404 s | 0 → 0 | 195,298 → 196,114 |

After-build Accessibility, Best Practices and SEO are 100 for these four samples. Home mobile Performance runs were 98, 98, 99: **the all-four-100 goal is not yet met for mobile home**. The new language navigation changes the guide layout and LCP candidate; the desktop guide's LCP increased by 118 ms while remaining well within target. Randomized backgrounds cause home byte totals to vary, so use medians, not a fixed payload claim.

Method: Lighthouse 13.6.0 / Chromium 153 in a Linux container, local gzip HTTP fixture, default mobile simulation (412×823, DPR 1.75, 150 ms RTT, 1,638.4 Kbps, CPU ×4) and default desktop profile. Fresh browser per run. Geographic test location unavailable. Tests run serially for the final recorded set. Discarded intermediate concurrent runs. Baseline uses original preview artifacts; final set uses the same candidate built with production indexing directives. Therefore the baseline SEO 69 versus final 100 reflects deliberate preview noindex and is **not an SEO improvement attributable to removing a production defect**. The deployed preview remains noindex and its SEO score will reflect that.

These are local lab results, not live PageSpeed scores or field Core Web Vitals. Public PageSpeed API returned HTTP 429; a direct remote Lighthouse attempt could not load through this executor's network (ERR_EMPTY_RESPONSE). No CrUX/GSC field LCP, INP or CLS baseline is available. Production-only GA4 was absent from local/preview runs and must be included in live verification after authorized release. No live all-100 claim is made.

## Verification and remaining work

Pass: TypeScript, both build contexts, 32 unique title/description pairs, H1 count, canonical destinations, reciprocal alternates, JSON-LD parsing, sitemap inventory, local asset/link existence, image dimensions/alt attributes and absence of unintended Thai in translated guide bodies. Preview language navigation and English guide mouse click worked; Chinese/Japanese retained the same topic, Japanese reload preserved language, and Japanese guide CTA reached localized contact anchors. Phone, WhatsApp and email targets checked without sending a message. Browser console showed extension-origin messages, not a site error in the inspected output.

Not yet verified: real phone/tablet interactions, mobile menu on physical hardware, all 32 pages through Lighthouse, live production GA4 overhead, live PSI/CrUX, indexing/rankings or actual AI citations. Browser UI did not provide a supported viewport-resize API; Lighthouse mobile devices are simulations. Automated accessibility scores do not replace full manual WCAG review. Final release requires authorization; after release verify canonical live URLs and retest PSI with three comparable runs per key device. Investigate the remaining mobile LCP/CPU work without deleting content or compromising photographs.

Evidence: `search-inventory.json`, `preservation.json`, `preview-http.json`, `lab-summary.json`, `lab-runs.json`, `locale-lab.json`. Rollback instructions are in the repository README.

Official guidance consulted:
- https://developers.google.com/search/docs/specialty/international/localized-versions
- https://developers.google.com/search/docs/fundamentals/ai-optimization-guide
- https://developer.chrome.com/docs/lighthouse/performance/performance-scoring
- https://www.eeco.or.th/chachoengsao-th/

Additional single-run mobile checks: English home 99, Chinese home 100, Japanese home 97 Performance; all three logistics guides 100. Accessibility, Best Practices and SEO were 100 on all six additional samples. Single runs are spot checks, not medians.
