# Readability release verification — 4 November 2026

Scope: approved pastel mounts, layered contours, type hierarchy, text surfaces,
caption placement, header reflow, table keyboard access and four locale templates.

## Baseline and design rules

Before: some visible studio metadata was 8px, mobile photo captions 8px, studio
hints 10px, footer notes 10px, and main introductory copy 13–14px.
After: main copy and topic content 16px; supporting text 14–15px; captions 12–13px;
H1 40–64px (36px below 360px); H2 32–52px; section/article headings 19–24px.
These are design choices, not a claim that WCAG sets a universal minimum font size.
Line height is 1.65–1.85 for small/reading copy, with wrapping and generous controls.

W3C references:
- https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html
- https://www.w3.org/WAI/WCAG22/Understanding/resize-text.html

## Calculated contrast pairs

Using sRGB relative luminance, before rounding for pass decisions:

| Foreground / background | Ratio | Use |
| --- | ---: | --- |
| #183e32 / #f0f2e8 | 10.47:1 | Headings and primary panels |
| #405843 / #f6f3eb | 7.03:1 | Secondary text |
| #574426 / #ede8d9 | 7.59:1 | Verification notices |
| #ffffff / #173f32 | 11.71:1 | Buttons and image caption badges |
| #f6f3eb / #244c3d | 8.70:1 | Expanded content in dark section |
| #e0e8d8 / #173f32 | 9.31:1 | Footer support copy |
| #99611e / #f6f3eb | 4.64:1 | Visible focus on light surfaces |

Opaque panels and caption badges give predictable contrast. The page scrim reduces
random background visibility behind unpaneled text. Decorative terrain strokes and
pastel picture mounts do not convey information or identify control state.

## Verification and limits

- TypeScript, production build, four-language release checks, canonical/hreflang,
  image assets, anchors and six land scenarios checked with repository scripts.
- Browser lab: 390px Thai, 820px English and 320px Japanese iframe profiles
  (usable CSS widths 375, 805 and 305px with scrollbars). Each has one H1 and no
  document-level horizontal overflow, including expanded topics.
- axe-core WCAG A/AA rule scan: no detected violations after fixing the named table
  scroll regions and the control-group role. Expanded content was scanned too.
- Decorative pseudo-elements prevent axe from deciding many contrast results in
  the actual composition. A second isolated-surface scan hid decoration only in
  the local QA harness. It found no violations; remaining incomplete checks were
  clipped offscreen table cells and non-text symbols. They are not recorded as
  automatic passes. Token calculations, opaque surfaces and manual visual checks
  supplement the scans. This is not a full-site WCAG certification.
- 200% text enlargement was simulated by the local harness; narrow layouts reflowed
  without document overflow. Native device testing and a complete assistive
  technology audit were not performed.
- Gallery enlargement, native topic disclosure, language selection, contact
  destinations and Land Studio controls are part of the browser smoke test.
- No new raster assets or external fonts/scripts were added. Existing responsive
  WebP images, eager hero and lazy offscreen loading remain. No matched Lighthouse
  LCP/CLS/transfer or field INP comparison is claimed for this visual release.

## Delivery

Production host: Netlify `257rai`; domain https://www.siamplot.com/.
Repository: devoncasa/257rai-chachoengsao-industrial, branch `main`.
Release requires the explicitly authorized push, followed by a ready production
deploy with matching commit and live-domain verification. Recovery is a Git revert
and a new CI build. A failed deploy leaves the previous production version live.
