# Data Model: B2B Static Website

## Overview

The site uses repository-backed, type-safe content collections with build-time validation. Canonical relationships are modeled by stable IDs, while slugs and URLs are derived fields.

## Entities

### SiteSettings

- Purpose: Global site configuration for branding, navigation, footer content, contact methods, and default SEO.
- Fields:
  - `id`: stable identifier
  - `companyName`: string
  - `tagline`: string
  - `primaryNav`: array of nav items
  - `footerNav`: array of nav groups
  - `contact`: object with email, phone, inquiry endpoint, address
  - `defaultSeo`: object with title template, description, canonical base URL, OG fallback image
  - `theme`: object with blue, light blue, white tokens and neutral support colors
- Validation rules:
  - exactly one published entry
  - required canonical base URL
  - theme tokens must satisfy contrast requirements for primary UI roles

### HomePage

- Purpose: Home page content and featured navigation blocks.
- Fields:
  - `id`: stable identifier
  - `hero`: object with headline, subheadline, primary CTA, secondary CTA, hero visual
  - `intro`: rich text or MDX summary
  - `featuredVendors`: array of vendor IDs
  - `featuredCategories`: array of category IDs
  - `trustSignals`: array of stat or badge blocks
  - `seo`: SEO metadata override
- Validation rules:
  - all featured references must exist and be published
  - hero must include at least one CTA

### Vendor

- Purpose: Vendor detail page and listing metadata.
- Fields:
  - `id`: stable identifier
  - `slug`: derived from title or explicit source field
  - `name`: string
  - `summary`: string
  - `logo`: image reference
  - `status`: draft or published
  - `body`: MDX content
  - `certifications`: array of strings or badge objects
  - `relatedCategoryIds`: array of category IDs
  - `relatedSolutionIds`: array of solution or leaf-offering IDs
  - `relatedOfferingIds`: array of offering IDs
  - `seo`: SEO metadata override
  - `redirectFrom`: array of legacy slugs
- Validation rules:
  - name and summary required for published entries
  - body required for published entries
  - related references must exist
  - `redirectFrom` values must not collide with active slugs

### Category

- Purpose: Category index/detail content grouping related offerings.
- Fields:
  - `id`: stable identifier
  - `slug`: derived field
  - `name`: string
  - `summary`: string
  - `body`: MDX content
  - `offeringIds`: array of offering IDs
  - `relatedPartnerIds`: array of partner IDs
  - `relatedSolutionIds`: array of solution IDs
  - `seo`: SEO metadata override
  - `status`: draft or published
- Validation rules:
  - published categories require at least one related offering or solution
  - related references must exist and be published

### Offering

- Purpose: Named product or sub-offering shown under one or more categories.
- Fields:
  - `id`: stable identifier
  - `slug`: derived field
  - `name`: string
  - `summary`: string
  - `categoryIds`: array of category IDs
  - `partnerIds`: array of partner IDs
  - `assetGallery`: optional array of media references
  - `status`: draft or published
- Validation rules:
  - published offerings require at least one category
  - linked vendors and categories must exist

### CallToAction

- Purpose: Reusable action block used across home and detail pages.
- Fields:
  - `id`: stable identifier
  - `label`: string
  - `href`: relative or absolute URL
  - `style`: enum `primary | secondary | text`
  - `trackingKey`: optional string
- Validation rules:
  - internal links must resolve to supported routes or known anchors
  - label required

### Redirect

- Purpose: Preserve deep links when slugs change.
- Fields:
  - `from`: legacy path or slug
  - `to`: canonical path
  - `type`: permanent or temporary
- Validation rules:
  - `from` must be unique
  - `to` must resolve to an existing canonical route

## Relationships

- HomePage references many Vendors and Categories.
- Vendor relates to many Categories and Offerings.
- Category relates to many Vendors and Offerings.
- Offering belongs to one or more Categories and may reference many Vendors.
- CallToAction may be embedded in HomePage or detail content.
- Redirect supports Vendor and Category slug migrations.

## State Model

### Publication State

- `draft`: Entry may exist in collections but is excluded from canonical navigation and static route generation.
- `published`: Entry is included in static params, sitemap generation, navigation eligibility, and cross-linking.

### Route State

- Canonical route: statically generated from published collection entries.
- Legacy route: handled through redirect mapping and never indexed as canonical content.
- Unknown route: returns not found and is excluded from indexing.

## Derived Fields

- `slug`: normalized from explicit slug or title/name fallback.
- `url`: built from collection type plus slug.
- `excerpt`: derived from summary or first meaningful body paragraph.
- `breadcrumbs`: computed from route hierarchy.
- `relatedContent`: resolved from stable IDs at build time.

## Integrity Rules

- Published entries cannot reference draft or missing entries.
- Slugs must be unique within each route namespace.
- Canonical SEO URLs must be unique across all published entities.
- Shared CTA or media references must resolve during build.
- Home page featured content must resolve to published items.
