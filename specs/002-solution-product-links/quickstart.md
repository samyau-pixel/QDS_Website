# Quickstart: Solution Product Links

## Goal

Implement category-page solution cards that use co-located solution-folder images for a thumbnail gallery, show the selected image enlarged above the gallery, and expose `View product details` from a new `productUrl` field when present.

## Prerequisites

- Node.js 20 LTS
- npm
- Existing workspace checked out at `C:\Users\Sam\QDS_web`

## Authoring Model

Each solution keeps its MDX file and all card images in the same folder. The existing Vertiv example is the reference structure.

```text
qds-web/content/vendors/vertiv/solutions/koldlok/
├── koldlok.mdx
├── image1.png
├── image2.png
├── image3.png
└── image4.png
```

Add `productUrl` to the solution frontmatter and keep all thumbnail/enlarged-preview images as `.png` or `.jpg` files in that same folder.

```mdx
---
id: koldlok
slug: koldlok
name: KoldLok
summary: Advanced cold aisle containment solution with integrated airflow optimization.
categoryIds:
  - airflow-management
vendorIds:
  - vertiv
productUrl: https://www.vertiv.com/en-us/products-catalog/thermal-management/rack-cooling/vertiv-koldlok/
status: published
---
```

## Implementation Steps

1. Extend `qds-web/lib/content/fs-content.ts` to parse `productUrl` and to collect sibling `.png` / `.jpg` / `.jpeg` files for each vendor solution MDX entry.
2. Update the category-page mapping in `qds-web/app/(marketing)/categories/[categorySlug]/page.tsx` so it passes image-gallery and CTA data instead of only `id`, `name`, and `summary`.
3. Replace or extend `qds-web/components/marketing/offering-list.tsx` with a solution-card component that renders:
   - upper enlarged selected image
   - middle thumbnail strip containing every supported image found in the solution folder
   - lower name, summary, and conditional `View product details` CTA
4. Add tests for folder image discovery, invalid or missing `productUrl`, and thumbnail selection behavior.

## Local Run Commands

From the workspace root:

```powershell
npm run dev
npm run lint
```

From `qds-web/` when running browser and unit checks directly:

```powershell
npx vitest run
npx playwright test
```

## Validation Checklist

1. A category page with published solutions shows the first discovered solution image enlarged by default.
2. Every `.png` or `.jpg` image in the solution folder appears in the middle thumbnail strip.
3. Clicking or keyboard-activating a thumbnail updates the enlarged preview without layout shift.
4. The lower section always shows the solution name and summary.
5. `View product details` opens in a new tab only when `productUrl` is valid.
6. Solutions without images or without `productUrl` still render readable cards without broken UI.