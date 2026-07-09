# Contract: Content Schema

## Purpose

Define the collection-level contract for content authored in the Quantum Data Systems static website.

## Collections

### `siteSettings`

- Cardinality: exactly one published entry
- Required fields:
  - `companyName`
  - `tagline`
  - `primaryNav`
  - `footerNav`
  - `contact`
  - `defaultSeo`
  - `theme`
- Guarantees:
  - provides the canonical base URL
  - provides theme tokens used across page templates
  - provides the primary navigation structure consumed by layout components

### `homePage`

- Cardinality: exactly one published entry
- Required fields:
  - `hero`
  - `intro`
  - `featuredPartners`
  - `featuredCategories`
  - `featuredSolutions`
- Guarantees:
  - all featured references resolve to published entries
  - at least one CTA is present in the hero block

### `partners`

- Cardinality: zero to many
- Required fields for published entries:
  - `id`
  - `name`
  - `summary`
  - `body`
  - `logo`
  - `status`
- Optional fields:
  - `certifications`
  - `relatedCategoryIds`
  - `relatedSolutionIds`
  - `relatedOfferingIds`
  - `seo`
  - `redirectFrom`
- Guarantees:
  - published entries expose a canonical slug and URL
  - related references resolve to existing entries

### `categories`

- Cardinality: zero to many
- Required fields for published entries:
  - `id`
  - `name`
  - `summary`
  - `body` or linked offerings/solutions sufficient for overview rendering
  - `status`
- Optional fields:
  - `offeringIds`
  - `relatedPartnerIds`
  - `relatedSolutionIds`
  - `seo`
- Guarantees:
  - published categories can render a valid overview page
  - relationships are resolvable during build

### `offerings`

- Cardinality: zero to many
- Required fields for published entries:
  - `id`
  - `name`
  - `summary`
  - `categoryIds`
  - `status`
- Optional fields:
  - `partnerIds`
  - `assetGallery`
- Guarantees:
  - every published offering is attached to at least one category

### `solutions`

- Cardinality: zero to many
- Required fields for published entries:
  - `id`
  - `name`
  - `problemStatement`
  - `outcomes`
  - `body`
  - `primaryCta`
  - `status`
- Optional fields:
  - `targetIndustries`
  - `relatedPartnerIds`
  - `relatedCategoryIds`
  - `relatedOfferingIds`
  - `seo`
- Guarantees:
  - every published solution can render an independent sales-enablement page
  - all related references resolve during build

## Shared Rules

- `status` must be one of `draft` or `published`.
- Stable IDs are the canonical reference key across collections.
- Slugs are unique within each route namespace.
- Published entries cannot reference draft or missing entries.
- Legacy redirects cannot collide with active canonical slugs.
- Collection validation failures block builds.
