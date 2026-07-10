# Tasks: B2B Static Website

**Input**: Design documents from `/specs/001-b2b-static-website/`

**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md, contracts/

**Tests**: Automated validation is included because the constitution and plan require linting, type safety, accessibility, and behavior checks for production changes.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g. US1, US2, US3)
- Include exact file paths in descriptions

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Initialize the Next.js project, tooling, and repository structure required for the marketing site.

- [X] T001 Initialize the Next.js App Router project and dependency scripts in package.json
- [X] T002 Configure TypeScript, Next.js, and path aliases in tsconfig.json and next.config.ts
- [X] T003 [P] Configure Tailwind and global styling entrypoints in postcss.config.mjs and app/globals.css
- [X] T004 [P] Configure linting, formatting, and repository ignores in eslint.config.mjs, .prettierrc, and .gitignore
- [X] T005 [P] Configure test and audit tooling in vitest.config.ts, playwright.config.ts, and lighthouserc.json
- [X] T006 Create the application and content directory scaffolds in app/layout.tsx, app/(marketing)/layout.tsx, components/, content/, lib/, and tests/

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Build the shared content, layout, SEO, and runtime infrastructure that every user story depends on.

**⚠️ CRITICAL**: No user story work can begin until this phase is complete.

- [X] T007 Define typed content collection schemas and validation rules in content-collections.ts and lib/validation/content-schemas.ts
- [X] T008 Implement content loading, relationship resolution, and published-entry guards in lib/content/queries.ts and lib/content/resolve-related.ts
- [X] T009 [P] Implement the shared MDX component allowlist in mdx-components.tsx and components/mdx/index.tsx
- [X] T010 [P] Build the site shell, navigation, footer, and layout primitives in components/layout/site-header.tsx, components/layout/site-footer.tsx, components/layout/container.tsx, and app/(marketing)/layout.tsx
- [X] T011 [P] Implement shared metadata and structured-data helpers in lib/seo/metadata.ts and lib/seo/structured-data.ts
- [X] T012 [P] Implement Edge personalization and redirect proxy logic in proxy.ts and lib/analytics/personalization.ts
- [X] T013 Implement the contact validation model and Node runtime handler scaffold in lib/validation/contact-form.ts and app/api/contact/route.ts
- [X] T014 Seed global site settings and reusable call-to-action content in content/site/site-settings.mdx and content/shared/call-to-actions.mdx
- [X] T015 Configure CI quality gates for lint, tests, accessibility, and performance checks in .github/workflows/ci.yml

**Checkpoint**: Foundation ready. User story implementation can now proceed in parallel.

---

## Phase 3: User Story 1 - Understand company offerings from the home page (Priority: P1) 🎯 MVP

**Goal**: Deliver a clear, branded home page that explains Quantum Data Systems' value proposition and routes visitors to vendors and categories.

**Independent Test**: Visit `/` on desktop and mobile widths and confirm that the company message, featured offerings, and primary navigation to vendors and categories are all visible and usable without relying on any other route.

### Implementation for User Story 1

- [X] T016 [US1] Create the home page content entry and featured references in content/site/home-page.mdx
- [X] T017 [P] [US1] Implement the hero, trust-signal, featured-grid, and CTA-band components in components/marketing/hero.tsx, components/marketing/trust-signals.tsx, components/marketing/featured-grid.tsx, and components/marketing/cta-band.tsx
- [X] T018 [US1] Implement the home page route with static metadata wiring in app/(marketing)/page.tsx
- [X] T019 [US1] Add organization structured data and home-page analytics hooks in app/(marketing)/page.tsx and lib/analytics/events.ts
- [X] T020 [US1] Apply the blue, light blue, and white responsive visual system to the home experience in app/globals.css and components/marketing/hero.tsx

**Checkpoint**: User Story 1 is independently functional as the MVP landing experience.

---

## Phase 4: User Story 2 - Explore vendors and categories relevant to a business need (Priority: P2)

**Goal**: Let visitors browse vendor and category listings, open detail pages, and understand the offerings connected to each area.

**Independent Test**: Visit `/vendors` and `/categories`, open at least one vendor detail and one category detail page, and confirm that each page has valid overview content, related links, and offering information without depending on any additional public route.

### Implementation for User Story 2

- [X] T021 [P] [US2] Seed vendor detail content in content/vendors/huawei/huawei.mdx, content/vendors/sunbird-dcim/sunbird-dcim.mdx, and content/vendors/vertiv/vertiv.mdx
- [X] T022 [P] [US2] Seed category and nested vendor offering content in content/categories/aisle-containment.mdx, content/categories/airflow-management.mdx, content/categories/smart-rack.mdx, and content/vendors/*/solutions/*.mdx
- [X] T023 [P] [US2] Implement vendor and category card, offering list, and related-content components in components/marketing/vendor-card.tsx, components/marketing/category-card.tsx, components/marketing/offering-list.tsx, and components/marketing/related-content.tsx
- [X] T024 [US2] Implement the vendors index and vendor detail routes with filesystem-backed MDX content in app/(marketing)/vendors/page.tsx and app/(marketing)/vendors/[vendorSlug]/page.tsx
- [X] T025 [US2] Implement the categories index and category detail routes with filesystem-backed MDX content in app/(marketing)/categories/page.tsx and app/(marketing)/categories/[categorySlug]/page.tsx
- [X] T026 [US2] Add breadcrumbs, canonical metadata, and legacy redirect handling for vendor and category pages in components/layout/breadcrumbs.tsx, lib/seo/metadata.ts, and proxy.ts

**Checkpoint**: User Stories 1 and 2 both work independently, with vendor and category discovery fully navigable.

---

## Phase 5: Removed from Current Scope

**Note**: The original solution-page story was removed from the current public site. The following archived tasks remain for historical traceability only.

- [X] T027 [US3] Archived solution content seed files in content/solutions/data-center-airflow-optimization.mdx and content/solutions/modular-rack-modernization.mdx
- [X] T028 [US3] Archived solution-focused UI components in components/marketing/solution-hero.tsx, components/marketing/solution-outcomes.tsx, and components/forms/contact-form.tsx
- [X] T029 [US3] Archived the solution index and solution detail routes in app/(marketing)/solutions/page.tsx and app/(marketing)/solutions/[solutionSlug]/page.tsx
- [X] T030 [US3] Archived the contact page and inquiry submission flow in app/(marketing)/contact/page.tsx and app/api/contact/route.ts
- [X] T031 [US3] Archived related partner, category, and solution navigation plus primary CTAs on solution pages in components/marketing/related-content.tsx and app/(marketing)/solutions/[solutionSlug]/page.tsx

**Checkpoint**: The current public site scope is vendors, categories, and contact.

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Finalize quality gates, discoverability, performance, and authoring guidance across the full site.

- [X] T032 [P] Add schema and route contract validation coverage in tests/contract/content-schema.spec.ts, tests/contract/route-contracts.spec.ts, and tests/unit/content-resolver.spec.ts
- [X] T033 [P] Add end-to-end coverage for the primary journeys in tests/integration/home.spec.ts, tests/integration/vendors-categories.spec.ts, and tests/integration/contact.spec.ts
- [X] T034 [P] Implement sitemap and robots generation in app/sitemap.ts and app/robots.ts
- [ ] T035 Optimize accessibility, performance, and responsive behavior across core templates in app/(marketing)/page.tsx, app/(marketing)/vendors/[vendorSlug]/page.tsx, and app/(marketing)/categories/[categorySlug]/page.tsx
- [ ] T036 [P] Document content authoring, publishing, and validation workflow in README.md and specs/001-b2b-static-website/quickstart.md
- [ ] T037 Run the full quickstart validation and CI baseline updates in specs/001-b2b-static-website/quickstart.md and .github/workflows/ci.yml
- [X] T038 Refactor vendor listing and detail routes to generate from MDX files using the shared filesystem content loader in app/(marketing)/vendors/page.tsx, app/(marketing)/vendors/[vendorSlug]/page.tsx, and lib/content/fs-content.ts

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies and can start immediately.
- **Foundational (Phase 2)**: Depends on Setup completion and blocks all user stories.
- **User Stories (Phases 3-5)**: Depend on Foundational completion.
- **Polish (Phase 6)**: Depends on the completion of the user stories being shipped.

### User Story Dependencies

- **User Story 1 (P1)**: Starts after Foundational completion and has no dependency on other user stories.
- **User Story 2 (P2)**: Starts after Foundational completion and depends on shared layout/content infrastructure, but remains independently testable without any additional public routes.
- **User Story 3 (P3)**: Removed from the current public scope.

### Within Each User Story

- Shared content entries should be created before route implementation that consumes them.
- Reusable components should be built before final route composition.
- Metadata, breadcrumbs, and CTA wiring should be added before story sign-off.
- Story validation should complete before moving to the next release checkpoint.

### Parallel Opportunities

- T003, T004, and T005 can run in parallel after T001-T002.
- T009, T010, T011, and T012 can run in parallel after T007-T008.
- T021 and T022 can run in parallel as separate content-seeding tasks.
- T023 can proceed in parallel with content seeding once shared schemas are in place.
- T032, T033, T034, and T036 can run in parallel during the polish phase.

---

## Parallel Example: User Story 2

```text
Task: T021 Seed vendor detail content in content/vendors/huawei/huawei.mdx, content/vendors/sunbird-dcim/sunbird-dcim.mdx, and content/vendors/vertiv/vertiv.mdx
Task: T022 Seed category and nested vendor offering content in content/categories/aisle-containment.mdx, content/categories/airflow-management.mdx, content/categories/smart-rack.mdx, and content/vendors/*/solutions/*.mdx
Task: T023 Implement vendor and category card, offering list, and related-content components in components/marketing/vendor-card.tsx, components/marketing/category-card.tsx, components/marketing/offering-list.tsx, and components/marketing/related-content.tsx
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup.
2. Complete Phase 2: Foundational.
3. Complete Phase 3: User Story 1.
4. Validate the home page independently on desktop and mobile widths.
5. Ship or demo the MVP landing experience.

### Incremental Delivery

1. Finish Setup and Foundational to establish the content and route platform.
2. Deliver User Story 1 as the first user-facing increment.
3. Add User Story 2 for vendor and category exploration.
4. Keep the current public scope focused on vendors, categories, and contact.
5. Complete Polish to harden quality, SEO, and authoring workflows.

### Parallel Team Strategy

1. One developer can own Setup and CI while another prepares content schema scaffolding.
2. After Foundational is complete, one developer can own home page composition, another can build vendor/category routes, and another can build contact and redirect flows.
3. Polish work can be split across test automation, SEO artifacts, and documentation.

---

## Notes

- All tasks use the required checklist format with sequential task IDs.
- `[P]` tasks are parallelizable because they target separate files or non-blocking workstreams.
- Story-labeled tasks appear only in user story phases.
- Tasks are written to preserve independent testability for each user story.
- Content collection validation and route contracts are treated as mandatory because the plan and constitution require typed, verified production changes.
