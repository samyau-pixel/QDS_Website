# Contract: Route and Runtime Boundaries

## Purpose

Define the public route structure and runtime expectations for the Quantum Data Systems website.

## Canonical Routes

### `GET /`

- Purpose: Home page summarizing company value proposition and key paths.
- Rendering: Static generation
- Inputs: `siteSettings`, `homePage`, featured published entities
- Guarantees:
  - returns canonical SEO metadata
  - includes navigation to partners, categories, and solutions
  - includes at least one contact-oriented CTA

### `GET /partners`

- Purpose: Partner index page
- Rendering: Static generation
- Inputs: published `partners`
- Guarantees:
  - lists published partner entries only
  - each listed partner links to a canonical detail route

### `GET /partners/[partnerSlug]`

- Purpose: Partner detail page
- Rendering: Static generation
- Inputs: published `partner` entry and resolved related entities
- Guarantees:
  - unknown slugs return not found
  - legacy slugs redirect according to redirect mappings
  - canonical metadata and related content blocks are present

### `GET /categories`

- Purpose: Category index page
- Rendering: Static generation
- Inputs: published `categories`
- Guarantees:
  - lists published categories only
  - each listed category links to a canonical detail route

### `GET /categories/[categorySlug]`

- Purpose: Category detail page
- Rendering: Static generation
- Inputs: published `category` entry, related offerings, related entities
- Guarantees:
  - unknown slugs return not found
  - page presents enough content to avoid empty-state navigation dead ends

### `GET /solutions`

- Purpose: Solution index page
- Rendering: Static generation
- Inputs: published `solutions`
- Guarantees:
  - lists published solution entries only
  - each listed solution links to a canonical detail route

### `GET /solutions/[solutionSlug]`

- Purpose: Solution detail page
- Rendering: Static generation
- Inputs: published `solution` entry and related entities
- Guarantees:
  - page stands alone as a solution explanation and conversion path
  - includes primary CTA and related exploration paths

### `GET /contact`

- Purpose: Contact or inquiry page
- Rendering: Static generation
- Inputs: `siteSettings`, CTA configuration
- Guarantees:
  - presents a clear inquiry path
  - uses the approved contact processing flow

## Dynamic and Operational Routes

### `POST /api/contact`

- Purpose: Process inquiry submissions
- Runtime: Node.js runtime
- Inputs:
  - visitor contact fields
  - company or inquiry context fields
  - optional campaign or personalization context headers
- Guarantees:
  - validates required fields before processing
  - does not expose secrets or internal error details to end users
  - returns a success or actionable validation error payload

### `MIDDLEWARE /`

- Purpose: Apply low-risk personalization and redirect rules before route resolution
- Runtime: Edge runtime
- Allowed behaviors:
  - campaign-source banners
  - regional CTA variants
  - redirect mapping for retired slugs or landing aliases
- Disallowed behaviors:
  - modifying canonical metadata or core indexed body content by user segment
  - owning ISR behavior

### `GET /sitemap.xml`

- Purpose: Expose canonical published routes for crawling
- Rendering: Static or ISR-backed derived artifact
- Guarantees:
  - includes only canonical published URLs
  - excludes draft, not-found, and redirected legacy paths

### `GET /robots.txt`

- Purpose: Search engine crawl policy
- Rendering: Static generation
- Guarantees:
  - references sitemap location
  - reflects production crawl policy only

## Runtime Split Rules

- Canonical content pages remain static-first.
- ISR, if used, stays on Node-compatible handlers or derived artifacts.
- Edge runtime is limited to request-time routing and personalization that does not undermine SEO stability.
- Unknown canonical slugs must return not found rather than fallback-rendering unintended pages.
