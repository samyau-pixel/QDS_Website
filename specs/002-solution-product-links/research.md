# Phase 0 Research: Solution Product Links

## Decision 1: Use co-located folder images as the source of truth

- Decision: Keep solution card artwork in the same folder as the solution MDX entry and treat supported sibling image files as the gallery source, while adding only a `productUrl` field to frontmatter for the lower CTA.
- Rationale: This gives content editors a more readable and maintainable workflow because the solution folder holds both the content entry and all gallery assets without requiring a duplicated `images` array in frontmatter.
- Alternatives considered: A required `images` frontmatter array was rejected because it duplicates filesystem state and increases maintenance overhead. A separate data file for card assets was rejected because it splits one authoring concern across multiple files.

## Decision 2: Discover thumbnails at build time in the existing content loader

- Decision: Extend `qds-web/lib/content/fs-content.ts` to scan the solution entry directory for `.png`, `.jpg`, and `.jpeg` files, sort them deterministically, and attach the ordered list to the solution view model consumed by category pages.
- Rationale: Build-time discovery preserves static generation, avoids runtime API requests, and fits the repository's current content-loading approach where vendor solution entries are already derived from filesystem traversal.
- Alternatives considered: Client-side image discovery was rejected because browsers cannot inspect local content folders and it would force a dynamic data path. A separate route handler for asset lookup was rejected because the data already exists at build time.

## Decision 3: Render a server-first card with a tiny interactive image-selection island

- Decision: Render the initial enlarged image, name, summary, and conditional CTA on the server, then use a small client component only for switching the selected image when users click or keyboard-select thumbnails in the middle strip.
- Rationale: This preserves a fully usable no-JavaScript default, keeps hydration limited to the actual interaction, and supports the specified upper/middle/lower card layout without converting the whole category page to client rendering.
- Alternatives considered: A fully client-rendered card was rejected because it adds unnecessary JavaScript to a static marketing page. A non-interactive multi-image stack was rejected because it does not satisfy the enlarged-image selection behavior.

## Decision 4: Validate the behavior at loader, page, and interaction levels

- Decision: Cover the feature with unit tests for folder scanning and `productUrl` gating, integration tests for category-page mapping, and Playwright checks for thumbnail selection, external-link attributes, and accessible focus behavior.
- Rationale: Most risk sits in data-shaping rules and the small interactive gallery surface, so the plan prioritizes fast deterministic tests first and browser checks only for the user-visible interaction path.
- Alternatives considered: Relying on manual QA alone was rejected because image-discovery regressions are easy to miss and can affect every category page. End-to-end-only testing was rejected because it is slower and less precise for content-loader failures.