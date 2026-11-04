# Static imagery, verified context and investor positioning — 4 November 2026

## Owner decisions and location correction

The owner requested removal of every arrow, still non-clickable imagery, updated
information in all four languages, relevant stock images, investor marketing based
on Google Maps, and production deployment.

The existing short link resolves to **13.689956, 101.258538**. Google Maps displays
**Muang Mai, Ratchasan District, Chachoengsao**. This conflicts with the former
Si Maha Phot / Prachinburi copy. The owner explicitly confirmed: use the Google
Maps pin. Titles, descriptions, visible location and all four locale versions now
use **Chachoengsao**. The Google label is identified as a map label, not a verified
legal address. Exact administrative address and ownership boundary still need
matching title documents. The original map link is unchanged.

The map view shows Highway 304 in the surroundings. No measured frontage, gate
permission, drive time, truck route or parcel boundary is inferred from a point.

## Published changes

- Removed arrow glyphs, photo enlargement and image links, including wordmark links.
- Removed background parallax/zoom and hover image transforms.
- Six land-use concepts are static isometric views with expandable technical notes;
  no rotating viewer, thumbnail controls or WebGL download remains.
- Replaced the publicly rendered Q3 2025 report and assertive old listing narratives
  with localized current-context/checklist content. Raw historical source remains
  in repository history, with working URLs and section anchors preserved.
- Removed claims of likely permit approval, ready 115kV connection, guaranteed
  industrial-park services, tenant demand, journey estimates and rail benefits.
- Area 257 rai / 411,200m² and frontages 120m / 495m remain explicitly seller claims,
  subject to survey/title/access checks. The offer is whole-parcel, not subdivision.
- Added a buyer evidence list: titles, authority to sell, surveyed boundary,
  encumbrances, land-use/access checks, ground/flood/drainage investigations,
  provider capacity letters, total price and transaction terms. Missing evidence
  is identified rather than fabricated.
- Added four conditional buyer propositions: produce aggregation/packing,
  regional logistics, roadside services and phased whole-parcel development.
  Each has a practical demand/access test. A suggested 30-day validation plan
  covers document checks, real-vehicle route tests, ten customer interviews and
  preliminary design/cost decisions. It is a recommendation, not a demand study.
- Added two licensed stock photos, visibly labeled as not the property, credited
  in every language. Originals retained; responsive 640/960/1600px WebP delivered
  lazily with explicit image dimensions.

## Primary sources and scope

- Seller map: https://maps.app.goo.gl/w3rbjKfWmFMmLvBc7
- DPT land-use service: https://townsquare.dpt.go.th/lup/
  distinguishes online lookup from written verification.
- BOI land ownership: https://www.boi.go.th/index.php?page=after_promo_benefit4
  and https://www.boi.go.th/th/faqs-11 ; privileges are project- and approval-specific.
- EECO: https://www.eeco.or.th/en/why-invest-in-eec/
  EEC covers Chachoengsao, Chon Buri and Rayong. Provincial location does not grant
  parcel-specific privileges, permit status or approved-zone membership.
- DRT release dated 27 July 2026:
  https://www.drt.go.th/public-relations/คมนาคม-เร่งเดินหน้ารถ
  discusses phase-one construction and phase-two preparation. The site does not
  present a target completion date as a confirmed operating service or freight link.
- Department of Highways: https://highwayweigh.go.th/page-shortcut
  route 7 describes the 304 corridor through Chachoengsao, Phanom Sarakham and
  Kabin Buri toward the Northeast. This does not verify a particular truck route.
- 304 Industrial Park: https://304industrialpark.com/en/contact-us/
  lists the Chachoengsao development at Khao Hin Son, Phanom Sarakham. It is a
  market-research target, not an adjacency, customer or utility-supply claim.

## Stock provenance

- Nelson Axigoth / Pexels, “A Man Surveying the Area”:
  https://www.pexels.com/photo/a-man-surveying-the-area-5802827/
  License: https://www.pexels.com/license/
- American Public Power Association / Unsplash, VuR4oHZ3ucc:
  https://unsplash.com/photos/VuR4oHZ3ucc
  License: https://unsplash.com/license

These are editorial illustrations of due-diligence work and power infrastructure.
They do not depict this property, its contractors, its supply capacity or endorsement.
Original hashes and derivatives are recorded in `scripts/stock-assets.json`.

## Verification

Production build and TypeScript checks pass. Release script checks every locale for
one H1, six static concepts, four current-information cards, no arrow glyphs, no image
inside a link/button, existing image files/dimensions, no unit prices, correct canonicals,
hreflang, anchors and sitemap. Scenario geometry and 100% budgets are checked separately.

Browser profiles: 390px Thai, 820px English and 320px Japanese (375/805/305px usable
width with scrollbars). Expanded-topic, isolated-surface axe A/AA scans found no
violations or incomplete checks in these profiles. Actual layered compositions and
stock image placement are also checked visually. This is not full WCAG certification.
Chinese copy/structure is checked in the rendered page as well as the build.

JavaScript build output is about 330.9kB / 108.2kB gzip, down from about 539.5kB /
162.8kB before this change; the interactive Three.js chunk is no longer shipped.
These are build byte sizes, not a matched LCP/INP/CLS or full-transfer comparison.
