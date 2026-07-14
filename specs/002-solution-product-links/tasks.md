# Tasks: Solution Product Links

**Input**: Design documents from `/specs/002-solution-product-links/`

**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md, contracts/

**Tests**: Automated tests are MANDATORY per the project Constitution (Code Quality principle). Test tasks below are required and should be written before implementation.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Path Conventions

- **Single project**: `qds-web/` at repository root
- Paths shown below assume the existing Next.js App Router structure

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and basic structure

- [X] T001 Verify existing Next.js project structure and dependencies in `qds-web/`
- [X] T002 [P] Ensure ESLint, Playwright, and Vitest are configured in `qds-web/package.json`

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story can be implemented

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [X] T003 [P] Extend `qds-web/lib/content/fs-content.ts` to parse `productUrl` from solution MDX frontmatter
- [X] T004 [P] Extend `qds-web/lib/content/fs-content.ts` to discover sibling `.png`, `.jpg`, `.jpeg` files in solution folders
- [X] T005 [P] Add `SolutionImageAsset` and `SolutionCardViewModel` types to `qds-web/lib/content/fs-content.ts`
- [X] T006 [P] Implement deterministic lexical sorting for discovered images in `qds-web/lib/content/fs-content.ts`
- [X] T007 [P] Add URL validation helper for `productUrl` in `qds-web/lib/content/fs-content.ts`

**Checkpoint**: Foundation ready - user story implementation can now begin in parallel

---

## Phase 3: User Story 1 - Scan Solution Cards (Priority: P1) 🎯 MVP

**Goal**: Category pages display solution cards with enlarged preview image, thumbnail gallery, name, and summary

**Independent Test**: Open a category page with published solutions and verify each visible solution card shows a solution-specific image from its own content folder, plus the solution name and summary.

### Implementation for User Story 1

- [X] T008 [P] [US1] Create `qds-web/components/marketing/solution-card.tsx` with three-region layout (upper, middle, lower)
- [X] T009 [P] [US1] Implement upper region in `qds-web/components/marketing/solution-card.tsx` to display selected enlarged image
- [X] T010 [P] [US1] Implement middle region in `qds-web/components/marketing/solution-card.tsx` to display thumbnail gallery from discovered images
- [X] T011 [P] [US1] Implement lower region in `qds-web/components/marketing/solution-card.tsx` to display name and summary
- [X] T012 [US1] Add client-side state management in `qds-web/components/marketing/solution-card.tsx` for thumbnail selection and image swapping
- [X] T013 [US1] Implement keyboard interaction handlers (Tab, Enter, Space) in `qds-web/components/marketing/solution-card.tsx`
- [X] T014 [US1] Add ARIA attributes for accessibility (aria-selected, aria-current, role="tablist") in `qds-web/components/marketing/solution-card.tsx`
- [X] T015 [US1] Implement placeholder image fallback for missing images in `qds-web/components/marketing/solution-card.tsx` (use neutral product silhouette)
- [X] T016 [US1] Add CSS grid layout with aspect-ratio utilities in `qds-web/components/marketing/solution-card.tsx`
- [X] T016b [US1] Implement lazy-loading for enlarged and thumbnail images in `qds-web/components/marketing/solution-card.tsx`
- [X] T017 [US1] Implement responsive behavior (desktop, tablet, mobile) in `qds-web/components/marketing/solution-card.tsx`
- [X] T018 [US1] Update `qds-web/app/(marketing)/categories/[categorySlug]/page.tsx` to map vendor solutions to `SolutionCardViewModel`
- [X] T019 [US1] Replace or extend `qds-web/components/marketing/offering-list.tsx` to use `solution-card.tsx` for solution cards

**Checkpoint**: At this point, User Story 1 should be fully functional and testable independently

---

## Phase 4: User Story 2 - Open Product Details (Priority: P1)

**Goal**: Solution cards display a conditional "View product details" CTA that opens the external product URL in a new tab

**Independent Test**: Click View product details on a published solution card and confirm the configured external page opens in a new tab or window while the category page remains available.

### Implementation for User Story 2

- [X] T020 [P] [US2] Add CTA rendering logic in `qds-web/components/marketing/solution-card.tsx` lower region for `productUrl`
- [X] T021 [US2] Implement conditional CTA visibility (hide when `productUrl` is missing or invalid) in `qds-web/components/marketing/solution-card.tsx`
- [X] T022 [US2] Add `target="_blank"` and `rel="noopener noreferrer"` attributes to CTA anchor in `qds-web/components/marketing/solution-card.tsx`
- [X] T023 [US2] Add visually hidden screen-reader hint for new tab behavior in `qds-web/components/marketing/solution-card.tsx`

**Checkpoint**: At this point, User Stories 1 AND 2 should both work independently

---

## Phase 5: User Story 3 - Maintain Solution Metadata (Priority: P2)

**Goal**: Content editors can add `productUrl` to solution MDX frontmatter and add/replace images in solution folders

**Independent Test**: Update a solution entry with a new URL and image asset, publish it, and verify the category page reflects the updated destination and artwork.

### Implementation for User Story 3

- [X] T024 [P] [US3] Document `productUrl` frontmatter field in `specs/002-solution-product-links/contracts/content-schema.md`
- [X] T025 [US3] Create example solution content with `productUrl` and multiple images in `qds-web/content/vendors/vertiv/solutions/koldlok/`
- [X] T026 [US3] Verify build-time image discovery works for the example solution in `qds-web/content/vendors/vertiv/solutions/koldlok/`

**Checkpoint**: All user stories should now be independently functional

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Improvements that affect multiple user stories

- [ ] T027 [P] Add unit tests for image discovery and sorting in `qds-web/tests/unit/test-image-discovery.test.ts`
- [ ] T028 [P] Add unit tests for `productUrl` validation in `qds-web/tests/unit/test-product-url-validation.test.ts`
- [ ] T029 [P] Add integration tests for category-page solution card mapping in `qds-web/tests/integration/test-category-solution-mapping.test.ts`
- [ ] T030 [P] Add Playwright tests for thumbnail selection and image swapping in `qds-web/tests/e2e/test-solution-card-interaction.spec.ts`
- [ ] T031 [P] Add Playwright tests for CTA external link behavior in `qds-web/tests/e2e/test-solution-card-cta.spec.ts`
- [ ] T032 [P] Add accessibility checks with `@axe-core/playwright` for solution card component in `qds-web/tests/e2e/test-solution-card-a11y.spec.ts`
- [ ] T033 Run Lighthouse performance and accessibility checks on category pages
- [ ] T034 Update `specs/002-solution-product-links/quickstart.md` with authoring examples and validation checklist

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion - BLOCKS all user stories
- **User Stories (Phase 3+)**: All depend on Foundational phase completion
  - User stories can then proceed in parallel (if staffed)
  - Or sequentially in priority order (P1 → P2)
- **Polish (Phase 6)**: Depends on all desired user stories being complete

### User Story Dependencies

- **User Story 1 (P1)**: Can start after Foundational (Phase 2) - No dependencies on other stories
- **User Story 2 (P1)**: Can start after Foundational (Phase 2) - May integrate with US1 but should be independently testable
- **User Story 3 (P2)**: Can start after Foundational (Phase 2) - May integrate with US1/US2 but should be independently testable

### Within Each User Story

- Models/types before services
- Services before components
- Core implementation before integration
- Story complete before moving to next priority

### Parallel Opportunities

- All Setup tasks marked [P] can run in parallel
- All Foundational tasks marked [P] can run in parallel (within Phase 2)
- Once Foundational phase completes, all user stories can start in parallel (if team capacity allows)
- All tests for a user story marked [P] can run in parallel
- Different user stories can be worked on in parallel by different team members

---

## Parallel Example: User Story 1

```bash
# Launch all models/types for User Story 1 together:
Task: "Implement upper region in qds-web/components/marketing/solution-card.tsx"
Task: "Implement middle region in qds-web/components/marketing/solution-card.tsx"
Task: "Implement lower region in qds-web/components/marketing/solution-card.tsx"
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup
2. Complete Phase 2: Foundational (CRITICAL - blocks all stories)
3. Complete Phase 3: User Story 1
4. **STOP and VALIDATE**: Test User Story 1 independently
5. Deploy/demo if ready

### Incremental Delivery

1. Complete Setup + Foundational → Foundation ready
2. Add User Story 1 → Test independently → Deploy/Demo (MVP!)
3. Add User Story 2 → Test independently → Deploy/Demo
4. Add User Story 3 → Test independently → Deploy/Demo
5. Each story adds value without breaking previous stories

### Parallel Team Strategy

With multiple developers:

1. Team completes Setup + Foundational together
2. Once Foundational is done:
   - Developer A: User Story 1
   - Developer B: User Story 2
   - Developer C: User Story 3
3. Stories complete and integrate independently

---

## Notes

- [P] tasks = different files, no dependencies
- [Story] label maps task to specific user story for traceability
- Each user story should be independently completable and testable
- Commit after each task or logical group
- Stop at any checkpoint to validate story independently
- Avoid: vague tasks, same file conflicts, cross-story dependencies that break independence
