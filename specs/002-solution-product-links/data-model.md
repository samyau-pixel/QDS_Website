# Data Model: Solution Product Links

## Overview

The feature extends the existing filesystem-backed vendor solution entries used on category pages. Content remains MDX-driven, while solution card gallery assets are derived from image files stored beside each solution's MDX file.

## Entities

### VendorSolutionEntry

- Purpose: Source content record for a solution or product family shown on category pages.
- Fields:
  - `id`: stable content identifier
  - `slug`: solution slug derived from frontmatter or filename
  - `name`: card title and detail label
  - `summary`: short card description
  - `body`: long-form MDX body
  - `status`: `draft` or `published`
  - `categoryIds`: categories that should surface the solution card
  - `vendorIds`: owning vendor identifiers
  - `relativePath`: path to the MDX source file
  - `pathSegments`: parsed path metadata used to identify nested vendor solution entries
  - `productUrl`: optional absolute external destination for `View product details`
- Validation rules:
  - published entries require `id`, `slug`, `name`, `summary`, `status`, and at least one `categoryId`
  - `productUrl`, when present, must be an absolute `http` or `https` URL
  - only entries under `content/vendors/<vendorSlug>/solutions/<solutionSlug>/<solutionSlug>.mdx` qualify for this card experience

### SolutionImageAsset

- Purpose: A gallery image discovered from the same folder as a vendor solution MDX file.
- Fields:
  - `fileName`: basename such as `image1.png`
  - `relativePath`: repository-relative path to the asset
  - `publicPath`: path the rendered card can pass to `next/image` or `img`
  - `extension`: normalized image type
  - `sortOrder`: deterministic lexical ordering used for the gallery strip
  - `isDefaultSelected`: whether the image is the initial enlarged preview
- Validation rules:
  - only `.png`, `.jpg`, and `.jpeg` files in the same solution folder are included
  - ordering must be deterministic across builds
  - the first sorted image becomes the default enlarged image when no future override exists

### SolutionCardViewModel

- Purpose: Category-page projection consumed by the solution card component.
- Fields:
  - `id`: stable UI key
  - `slug`: card slug
  - `name`: lower-section heading
  - `summary`: lower-section support copy
  - `productUrl`: optional CTA destination
  - `images`: ordered array of `SolutionImageAsset`
  - `selectedImage`: initial enlarged image
  - `showProductDetails`: derived boolean controlling CTA visibility
  - `vendorSlug`: used for asset-path derivation and traceability
- Validation rules:
  - `showProductDetails` is true only when `productUrl` is present and valid
  - `selectedImage` must resolve to the first `images` item when any images exist
  - when `images` is empty, the card must still render with a stable placeholder state

### ProductDestinationUrl

- Purpose: External destination users open from the lower CTA.
- Fields:
  - `href`: absolute URL string
  - `target`: `_blank`
  - `rel`: `noopener noreferrer`
  - `isRenderable`: boolean derived from validation
- Validation rules:
  - only absolute `http` or `https` URLs are renderable
  - invalid or missing URLs suppress the CTA instead of rendering a broken action

## Relationships

- One `VendorSolutionEntry` maps to zero or more `SolutionImageAsset` records discovered from its folder.
- One `VendorSolutionEntry` maps to one `SolutionCardViewModel` on each category page whose slug appears in `categoryIds`.
- One `SolutionCardViewModel` may expose zero or one `ProductDestinationUrl`.

## State Model

### Publication State

- `draft`: excluded from category-page card generation and image discovery for published routes.
- `published`: included in category-page card generation when the solution matches the current category.

### Card Interaction State

- `default-selected`: the first ordered image is shown in the upper preview.
- `thumbnail-selected`: the user has selected a different image from the middle strip.
- `no-images`: the card renders a placeholder preview and no thumbnail strip.
- `no-link`: the card renders content without the product-details CTA.

## Derived Fields

- `solutionFolderPath`: derived from the MDX file path and used for sibling image discovery.
- `galleryImages`: all supported image files in the solution folder, sorted lexically.
- `selectedImage`: first `galleryImages` entry by default.
- `showProductDetails`: true only when `productUrl` passes URL validation.
- `thumbnailCount`: number of discovered gallery images used for responsive layout decisions.

## Integrity Rules

- Published category pages cannot surface solution cards for draft or malformed vendor solution entries.
- Assets outside the solution folder are ignored for this feature.
- The gallery strip must use the same ordered image set as the upper preview selector.
- Missing images or missing `productUrl` must degrade gracefully without breaking layout or producing dead links.