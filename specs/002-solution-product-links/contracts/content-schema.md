# Contract: Vendor Solution Card Content Schema

## Purpose

Define the folder and frontmatter contract for vendor solution entries that surface as interactive solution cards on category pages.

## Folder Layout

### `content/vendors/<vendorSlug>/solutions/<solutionSlug>/`

- Required contents:
  - `<solutionSlug>.mdx`
- Optional contents:
  - any number of `.png`, `.jpg`, or `.jpeg` files used by the solution card gallery
- Guarantees:
  - all supported image files in this folder are eligible for the middle thumbnail strip
  - the same image set supplies the default enlarged preview in the upper card area
  - assets outside this folder are ignored by the solution card gallery

## Frontmatter Fields

### Required for published entries

- `id`
- `slug`
- `name`
- `summary`
- `categoryIds`
- `vendorIds` or `partnerIds`
- `status`

### Optional for this feature

- `productUrl`

## Field Rules

- `productUrl`, when present, must be an absolute `http` or `https` URL.
- `status` must be `draft` or `published`.
- `slug` must match the folder name and MDX filename for nested vendor solution entries.
- Published entries must remain discoverable under `content/vendors/<vendorSlug>/solutions/<solutionSlug>/<solutionSlug>.mdx`.

## Asset Discovery Rules

- All `.png`, `.jpg`, and `.jpeg` files in the solution folder are discovered at build time.
- The discovered assets are sorted deterministically before rendering.
- The first sorted asset becomes the default enlarged image.
- If no supported image assets exist, the card renders a placeholder state instead of a broken gallery.

## CTA Rules

- When `productUrl` is present and valid, the lower card area renders `View product details`.
- When `productUrl` is absent or invalid, the card must not render a dead or disabled external link.

## Editorial Example

Reference folder: `qds-web/content/vendors/vertiv/solutions/koldlok/`

- `koldlok.mdx` holds the solution content and `productUrl` field.
- `image1.png` through `image4.png` are all included in the middle thumbnail strip.