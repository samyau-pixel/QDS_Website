# Implementation Plan: Solution Product Links

**Branch**: `feature/solution-product-links` | **Date**: 2026-07-13 | **Spec**: `/specs/002-solution-product-links/spec.md`

**Input**: Feature specification from `/specs/002-solution-product-links/spec.md`

**Note**: This template is filled in by the `/speckit.plan` command. See `.specify/templates/plan-template.md` for the execution workflow.

## Summary

Enhance category-page solution cards so they render an upper enlarged preview image, a middle strip of all co-located solution images, and a lower content area with name, summary, and a conditional `View product details` CTA. The implementation keeps authoring simple by storing all solution card images in the same folder as each solution MDX file, discovering `.png` and `.jpg` assets at build time, and extending the existing `fs-content` pipeline and category-page rendering with minimal client-side state for thumbnail selection.

## Technical Context

**Language/Version**: TypeScript 5.x on Node.js 20 LTS

**Primary Dependencies**: Next.js 16 App Router, React 19, Tailwind CSS 4.x, `gray-matter`, Node `fs/promises`, ESLint 9, Playwright, Vitest, `@axe-core/playwright`

**Storage**: Repository-managed MDX solution content plus co-located `.png` / `.jpg` image assets under `qds-web/content/vendors/<vendorSlug>/solutions/<solutionSlug>/`

**Testing**: Vitest for content-loader and mapping logic, Playwright for category-page rendering and interaction checks, `@axe-core/playwright` for accessibility validation, ESLint for static analysis

**Target Platform**: Modern evergreen desktop and mobile browsers, Vercel-hosted static marketing pages

**Project Type**: Web application, static-content-first marketing site

**Performance Goals**: Preserve existing category-page static rendering, keep CLS effectively at 0 for card image swaps, avoid adding more than a small client island for thumbnail selection, and keep category-page interaction responsive under 200ms input latency on mid-tier mobile devices

**Constraints**: Category pages must remain statically generated; all solution-card thumbnails are sourced from sibling image files in the solution folder; the middle gallery must show all supported solution images found there; the lower CTA must open externally in a new tab and must not render when `productUrl` is missing or invalid; card layout must remain stable when images are missing or fail to load

**Scale/Scope**: Applies to all published vendor solution entries matched onto category pages, typically with 1-6 images per solution folder and dozens of solution folders across vendors

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- Code Quality: PASS. The change extends the existing content loader and category page with typed view-model additions and targeted automated tests for loader, rendering, and CTA behavior.
- UX Consistency: PASS. The card keeps the existing category-page surface while adding a consistent three-region visual hierarchy and explicit states for selected thumbnails and missing links.
- Performance & Accessibility Minimums: PASS. Asset discovery remains build-time, rendering remains static-first, and the interactive portion is limited to image selection with keyboard/focus support and external-link semantics.
- Simplicity & Incrementalism: PASS. The plan reuses the current nested vendor solution content structure and avoids a new CMS field for image lists by treating the solution folder as the single source of truth.

Post-Phase-1 Re-check: PASS. The data model and contracts keep the feature within the existing Next.js content pipeline and do not introduce new runtime services, storage systems, or governance exceptions.

## Project Structure

### Documentation (this feature)

```text
specs/002-solution-product-links/
├── plan.md
├── research.md
├── data-model.md
├── quickstart.md
├── contracts/
│   ├── content-schema.md
│   └── route-contracts.md
└── tasks.md
```

### Source Code (repository root)

```text
qds-web/
├── app/
│   └── (marketing)/
│       └── categories/
│           └── [categorySlug]/page.tsx
├── components/
│   └── marketing/
│       ├── offering-list.tsx
│       └── solution-card.tsx
├── content/
│   └── vendors/
│       └── <vendorSlug>/
│           └── solutions/
│               └── <solutionSlug>/
│                   ├── <solutionSlug>.mdx
│                   ├── image1.png
│                   └── imageN.jpg
├── lib/
│   └── content/
│       └── fs-content.ts
└── tests/
    ├── contract/
    ├── integration/
    └── unit/
```

**Structure Decision**: Extend the existing single Next.js application in `qds-web/` and its filesystem-based content loader. The feature is controlled by the category detail page, the marketing card component layer, and `lib/content/fs-content.ts`, with solution images remaining co-located beside each solution MDX file for simpler editorial management.

## Complexity Tracking

No constitution violations currently require justification.
