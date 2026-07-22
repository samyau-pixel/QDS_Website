# Tasks: Case Studies

**Feature**: Case Studies | **Spec**: [spec.md](./spec.md) | **Plan**: [plan.md](./plan.md)

## Phase 1: Setup

- [ ] T001 Initialize feature branch and create content directory `qds-web/content/cases/`
- [ ] T002 Add example MDX case file `qds-web/content/cases/example-case.mdx`

## Phase 2: Foundational

- [ ] T003 Implement content helpers `qds-web/lib/content/cases.ts`
- [ ] T004 Add unit tests `tests/unit/lib/content/cases.test.ts`

## Phase 3: User Stories (Priority order)

### User Story 1 - Navigate to Case Studies (Priority: P1)
- [ ] T005 [US1] Update site header to include Case Studies link in `qds-web/components/layout/site-header.tsx`
- [ ] T006 [US1] Create list page at `qds-web/app/(marketing)/cases/page.tsx`
- [ ] T007 [US1] Create detail dynamic route at `qds-web/app/(marketing)/cases/[slug]/page.tsx`

### User Story 2 - Browse Case Study List (Priority: P1)
- [ ] T008 [P] [US2] Implement `qds-web/components/marketing/case-card.tsx` and integrate in list page

### User Story 3 - View Case Study Details (Priority: P1)
- [ ] T009 [US3] Implement 404 handling and breadcrumb on detail page (`qds-web/app/(marketing)/cases/[slug]/page.tsx`)

## Final Phase: Polish & Cross-Cutting Concerns
- [ ] T010 Update documentation and quickstart in `specs/003-case-studies/quickstart.md` and link examples

## Dependencies
- T003 must be completed before T006 and T007 (content helpers used by pages)
- T005 should be completed before any release (navigation change)

## Parallel Execution Examples
- T003 and T005 can be worked on in parallel (content helpers and header change independent)
- T008 (component work) can be parallelized across multiple developers (marked [P])

## Independent Test Criteria
- US1: Header shows "Case Studies" and clicking navigates to `/cases` (manual test)
- US2: `/cases` displays published MDX case files as cards with name, company, summary
- US3: `/cases/[slug]` renders full MDX content and displays required fields; unknown slug returns 404

## Implementation Strategy
- Follow existing `categories` implementation as pattern: mirror `qds-web/lib/content/categories.ts` and `qds-web/app/(marketing)/categories` routes
- Deliver minimal MVP first: list page and detail page with example MDX
- Add tests for parsing logic before styling polish

## Total Tasks: 10

