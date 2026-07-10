# Phase 0 Research: B2B Static Website

## Decision 1: Use Next.js App Router with static-first rendering

- Decision: Use Next.js App Router with Server Components by default, prerender all published marketing routes at build time, generate route params from typed content collections, and set canonical detail routes to reject unknown slugs.
- Rationale: The site is editorial, SEO-sensitive, and content-driven. Static prerendering provides predictable performance, clean metadata handling, and simple cache semantics for a B2B marketing site.
- Alternatives considered: Pages Router was rejected because App Router provides better layout, metadata, and server rendering primitives. Full per-request rendering was rejected because it increases runtime cost and weakens cacheability for mostly stable content.

## Decision 2: Constrain ISR to derived or externally mutable content

- Decision: Use SSG for all canonical marketing pages and reserve ISR for derived artifacts or external data fragments such as sitemap-related derivatives, partner trust metrics, or future remote assets. Prefer high revalidation windows with optional path/tag revalidation hooks.
- Rationale: Repository-authored MDX content still publishes through deployments, so route-wide ISR does not provide meaningful editorial publishing value by itself. Selective ISR leaves room for future mutable data without compromising the static-first model.
- Alternatives considered: Full-route ISR for all pages was rejected because it adds complexity without helping local file publishing. Pure build-only SSG everywhere was rejected because it leaves no path for future live-updating fragments.

## Decision 3: Use local MDX with a constrained component allowlist

- Decision: Author long-form and rich marketing content in local MDX using `@next/mdx`, a shared `mdx-components.tsx`, and a curated set of embedded visual components such as CTA cards, stat bands, comparison blocks, and testimonials.
- Rationale: Local MDX keeps content in version control, supports rich editorial layouts, and fits the visual-first architecture without requiring a remote CMS.
- Alternatives considered: Remote MDX was rejected because it complicates trust, caching, and failure modes. Plain Markdown was rejected because it limits rich content composition.

## Decision 4: Model content with type-safe collections and stable IDs

 Decision: Use typed content collections for `siteSettings`, `homePage`, `vendors`, `categories`, and reusable content blocks. Use stable IDs for relationships and compute slugs, URLs, SEO fields, and related-content references at build time.
 Rationale: Typed collections reduce content drift, enforce schema validation, and simplify static route generation across vendor and category relationships.
 Alternatives considered: Manual frontmatter parsing with ad hoc validation was rejected because it recreates content plumbing with weaker safety. A full headless CMS was rejected as unnecessary for the initial scope.

## Decision 5: Limit Edge personalization to non-canonical presentation changes

 Decision: Use route-level metadata generation, canonical URLs, structured data for Organization, BreadcrumbList, and service-oriented pages, plus generated `sitemap.xml` and `robots.txt`.
- Rationale: This preserves SEO consistency and avoids cache fragmentation while still allowing request-time relevance improvements for business visitors.
- Alternatives considered: Full HTML personalization was rejected because it conflicts with static delivery and canonical SEO. No personalization at all was rejected because lightweight B2B relevance improvements are valuable.

 Rationale: The site must perform well in search and support a structured information architecture for vendor and category discovery.
 Alternatives considered: Client-side SEO management was rejected because bots need server-rendered metadata. A minimal metadata strategy was rejected because deeply linked marketing pages benefit from stronger search semantics.
- Decision: Use Edge for lightweight request enrichment, validation pre-checks, and abuse screening, then forward form submission handling to a Node runtime route handler or server action for CRM or webhook integration.
 Decision: Use a shallow structure with home, vendors index/detail, categories index/detail, and contact. Cross-link detail pages through related vendors, categories, and offerings.
 Rationale: This matches how B2B buyers evaluate vendors and capabilities, and it improves both discoverability and conversion paths.
 Alternatives considered: A deeper product taxonomy was rejected for initial scope because it would slow navigation and content production. A blog-led structure was rejected because the site is capability-led rather than publication-led.
## Decision 7: Implement a route-level SEO architecture

- Decision: Use route-level metadata generation, canonical URLs, structured data for Organization, BreadcrumbList, and service-oriented pages, plus generated `sitemap.xml` and `robots.txt`.
- Rationale: The site must perform well in search and support a structured information architecture for vendor and category discovery.
- Alternatives considered: Client-side SEO management was rejected because bots need server-rendered metadata. A minimal metadata strategy was rejected because deeply linked marketing pages benefit from stronger search semantics.

## Decision 8: Keep information architecture shallow and cross-linked

- Decision: Use a shallow structure with home, vendors index/detail, categories index/detail, and contact. Cross-link detail pages through related vendors, categories, and offerings.
- Rationale: This matches how B2B buyers evaluate vendors and capabilities, and it improves both discoverability and conversion paths.
- Alternatives considered: A deeper product taxonomy was rejected for initial scope because it would slow navigation and content production. A blog-led structure was rejected because the site is capability-led rather than publication-led.

## Decision 9: Use a focused testing stack for content and key journeys

- Decision: Use Vitest for schema and utility validation, Playwright for navigation and conversion-path testing, `@axe-core/playwright` for accessibility checks, and Lighthouse CI for performance and SEO regressions.
- Rationale: This test mix covers the highest-risk areas for a static content-heavy site: content integrity, route correctness, accessibility, and page quality.
- Alternatives considered: Cypress was rejected because Playwright is stronger for modern preview-deployment flows. Jest adds little value over Vitest for a new Next.js stack.

## Decision 10: Separate Node and Edge runtime responsibilities explicitly

- Decision: Deploy on Vercel with static output for canonical pages, Node runtime for ISR-capable handlers and form processing, and Edge runtime only for middleware and request-time personalization.
- Rationale: ISR is not supported on Edge runtime, so clear runtime boundaries prevent implementation drift and cache surprises.
- Alternatives considered: Edge-only deployment was rejected because it conflicts with ISR requirements. Static export was rejected because it would remove incremental revalidation and server-side form handling options.

## Performance Targets

- Decision: Target LCP under 2.0s p75 on mid-tier mobile over 4G, CLS under 0.05, INP under 200ms, cached TTFB under 200ms globally, and under 50ms added p95 latency from Edge personalization.
- Rationale: These targets are realistic for a static-first B2B site and align with the constitution's performance minimums.
- Alternatives considered: More aggressive thresholds were rejected as premature without content and media audits. Looser thresholds were rejected because the site is explicitly performance-sensitive.

## Risks and Constraints

- Decision: Treat repository content as deploy-published, validate cross-collection references strictly, and keep interactive MDX components minimal.
- Rationale: The main risks are misunderstanding ISR with local content, bundle growth from MDX components, and drift across related partner/category/solution data.
- Alternatives considered: Relaxed validation was rejected because content relationship errors would directly affect user navigation and SEO.
