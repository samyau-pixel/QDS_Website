# Contract: Category Solution Card Rendering

## Purpose

Define the route and UI guarantees for solution cards rendered on category detail pages.

## Canonical Route

### `GET /categories/[categorySlug]`

- Purpose: Render the published category detail page and all related vendor solution cards.
- Rendering: Static generation
- Inputs:
  - published category entry for `categorySlug`
  - published vendor solution entries whose `categoryIds` include the current category
  - supported sibling `.png` / `.jpg` / `.jpeg` image assets from each matched solution folder
- Guarantees:
  - unknown category slugs return not found
  - each matched solution card renders a stable three-part layout
  - route remains static-first and does not depend on runtime asset lookup APIs

## Solution Card UI Contract

Each rendered solution card must provide the following regions:

### Upper Region

- Displays the currently selected enlarged solution image.
- Uses the first ordered folder image as the default selected preview.
- Preserves a stable aspect ratio or reserved height to avoid layout shift.

### Middle Region

- Displays every supported folder image as a small thumbnail.
- Supports pointer and keyboard activation for thumbnail selection.
- Shows an explicit selected state that matches the upper-region image.

### Lower Region

- Displays the solution `name`.
- Displays the solution `summary`.
- Displays `View product details` only when `productUrl` is valid.

## External Link Contract

When present, `View product details` must:

- use the `productUrl` from the solution frontmatter
- open with `target="_blank"`
- include `rel="noopener noreferrer"`
- leave the category page available in the original tab

## Degradation Rules

- If a solution has no supported images, the card renders a placeholder preview and no broken thumbnail UI.
- If a solution has no valid `productUrl`, the card renders without the CTA.
- If an image fails to load, the preview region keeps its layout and falls back gracefully.

## Accessibility Rules

- Thumbnails must be keyboard reachable.
- The selected thumbnail state must be programmatically exposed.
- Enlarged and thumbnail images must use meaningful alt text or a safe fallback based on the solution name.
- External-link behavior must be understandable to assistive-technology users.