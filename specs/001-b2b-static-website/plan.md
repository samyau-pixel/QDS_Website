# Implementation Plan: B2B Static Website

**Branch**: `master` | **Date**: 2026-07-09 | **Spec**: `/specs/001-b2b-static-website/spec.md`

**Input**: Feature specification from `/specs/001-b2b-static-website/spec.md`

**Note**: This template is filled in by the `/speckit.plan` command. See `.specify/templates/plan-template.md` for the execution workflow.

## Summary

Build a fast, SEO-optimized B2B marketing website for Quantum Data Systems using Next.js App Router with primarily static rendering, MDX-authored rich content, type-safe content collections, Tailwind CSS, and Vercel deployment. The site will use SSG for canonical marketing pages, selective ISR for mutable derived content, and limited Edge Functions for low-risk personalization and form routing while preserving consistent SEO and performance.

## Technical Context

**Language/Version**: TypeScript 5.x on Node.js 20 LTS

**Primary Dependencies**: Next.js 16 App Router, React 19, Tailwind CSS 4.x, `@next/mdx`, remark/rehype plugins, Content Collections, Zod, Vercel Analytics, Playwright, Vitest, `@axe-core/playwright`, Lighthouse CI

**Storage**: Repository-managed MDX and collection metadata for primary content; optional webhook/CRM destination for contact submissions; Vercel cache for static assets and ISR artifacts

**Testing**: Vitest for schema and utility validation, Playwright for end-to-end flows, `@axe-core/playwright` for accessibility assertions, Lighthouse CI for performance and SEO checks

**Target Platform**: Modern evergreen desktop and mobile browsers, Vercel-hosted production and preview environments

**Project Type**: Web application, static-content-first marketing site

**Performance Goals**: LCP under 2.0s p75 on mid-tier mobile over 4G, CLS under 0.05, INP under 200ms, TTFB under 200ms for cached static routes, Lighthouse 90+ Performance and 95+ Accessibility/SEO on key templates

**Constraints**: Canonical content must stay SEO-stable, Edge runtime cannot host ISR routes, content edits in repository require deploy publish, initial route JS under 100KB gzipped for home and under 130KB for detail pages, WCAG 2.1 AA for core journeys, request-time personalization and legacy redirects are handled through `proxy.ts` rather than `middleware.ts`

**Scale/Scope**: Initial release covers home, partner index/detail, category index/detail, solution index/detail, contact path, shared layout and content model templates, and extensible collections for dozens of partners/categories/solutions

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- Code Quality: PASS. Plan includes typed content schemas, automated tests, CI-enforceable lint/type/test checks, and documented route/runtime boundaries.
- UX Consistency: PASS. Design uses a shared component system, common content templates, consistent navigation, and accessibility validation across page types.
- Performance & Accessibility Minimums: PASS. Static-first rendering, constrained client JS, Lighthouse targets, and automated a11y checks are included.
- Simplicity & Incrementalism: PASS. Canonical pages remain static-first; Edge personalization is intentionally limited; no unnecessary CMS or runtime publishing layer is introduced.

Post-Phase-1 Re-check: PASS. Data model, route contracts, and quickstart preserve the same static-first and typed-content constraints without introducing governance violations.

## Project Structure

### Documentation (this feature)

```text
specs/001-b2b-static-website/
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
app/
├── (marketing)/
│   ├── page.tsx
│   ├── partners/
│   │   ├── page.tsx
│   │   └── [partnerSlug]/page.tsx
│   ├── categories/
│   │   ├── page.tsx
│   │   └── [categorySlug]/page.tsx
│   ├── solutions/
│   │   ├── page.tsx
│   │   └── [solutionSlug]/page.tsx
│   └── contact/page.tsx
├── api/
│   └── contact/route.ts
├── sitemap.ts
└── robots.ts

content/
├── site/
├── partners/
├── categories/
├── solutions/
└── shared/

components/
├── layout/
├── marketing/
├── mdx/
└── forms/

lib/
├── content/
├── seo/
├── analytics/
└── validation/

proxy.ts
mdx-components.tsx

tests/
├── contract/
├── integration/
└── unit/
```

**Structure Decision**: Use a single Next.js App Router project with repository-backed content collections. This keeps the feature static-first, preserves SEO-friendly routing, and avoids unnecessary separation into frontend/backend projects for a mostly static marketing workload.

## Complexity Tracking

No constitution violations currently require justification.
