# Quickstart: B2B Static Website

## Goal

Stand up the Quantum Data Systems B2B marketing site as a static-first Next.js application with typed content collections, MDX content, Tailwind styling, and Vercel-aligned runtime boundaries.

## Prerequisites

- Node.js 20 LTS
- npm, pnpm, or yarn
- Vercel account and project for preview and production deployments
- Access to company branding assets, partner logos, and initial content drafts

## Suggested Setup

```powershell
npm create next-app@latest qds-web --ts --tailwind --app
cd qds-web
npm install @next/mdx remark-gfm rehype-slug rehype-autolink-headings zod
npm install @vercel/analytics
npm install -D vitest @vitest/ui playwright @axe-core/playwright lighthouse-ci
```

If you are working from the workspace root (`C:\Users\Sam\QDS_web`), run `npm run dev` there and it will forward to the app in `qds-web/`.

## Initial Project Layout

```text
app/
components/
content/
lib/
tests/
mdx-components.tsx
proxy.ts
content-collections.ts
```

## Content Setup

1. Create typed collections for `siteSettings`, `homePage`, `partners`, `categories`, `offerings`, and `solutions`.
2. Add schema validation for required fields, relationship IDs, and publication state.
3. Seed initial entries for Huawei, Sunbird DCIM, Vertiv, Aisle Containment, Airflow Management, Smart Rack, and at least one solution page.
4. Add redirect definitions for future slug changes.

## Rendering Strategy

1. Implement static route generation for partner, category, and solution detail pages with `generateStaticParams()`.
2. Keep canonical content pages statically rendered.
3. Reserve ISR for derived or externally mutable data only.
4. Use `proxy.ts` for regional CTA or campaign-level personalization without changing canonical body content.

## SEO Setup

1. Add route-level metadata for all index and detail pages.
2. Generate `sitemap.xml` and `robots.txt` from published routes.
3. Add Organization and BreadcrumbList structured data where relevant.
4. Ensure canonical URLs are emitted for every published page.

## Testing

```powershell
npm run test
npx playwright test
npx lhci autorun
```

## Validation Checklist

1. Home page communicates the company value proposition and routes to partners, categories, and solutions.
2. Partner, category, and solution pages render from typed content entries.
3. Lighthouse targets meet the thresholds defined in the plan.
4. Accessibility checks pass on core templates.
5. Edge personalization does not alter canonical metadata or break cache behavior.

## Deployment Notes

1. Deploy previews on every pull request.
2. Run performance, accessibility, and route-integrity checks against preview deployments.
3. Publish content changes through repository commits and Vercel deployments.
4. Keep Node runtime handlers isolated from `proxy.ts` logic and static routes.
