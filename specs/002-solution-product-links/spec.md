# Feature Specification: Solution Product Links

**Feature Branch**: `[feature/solution-product-links]`

**Created**: 2026-07-13

**Status**: Draft

**Input**: User description: "Create a new branch to implement solution cards on category pages so they show solution folder images, support a URL field in solution MDX, and let users open the linked product page from a visible View product details action."

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Scan Solution Cards (Priority: P1)

As a visitor browsing a solution category page, I can quickly scan solution cards that show a relevant image, name, and summary so I can identify the right product family at a glance.

**Why this priority**: The category page must communicate the product visually before the user decides whether to click through.

**Independent Test**: Open a category page with published solutions and verify each visible solution card shows a solution-specific image from its own content folder, plus the solution name and summary.

**Acceptance Scenarios**:

1. **Given** a published category page with solutions that have image assets, **When** the page loads, **Then** each solution card shows a relevant product image from the solution content.
2. **Given** a solution card on the category page, **When** the visitor scans the page, **Then** the card presents the solution name and summary without requiring an additional click.

---

### User Story 2 - Open Product Details (Priority: P1)

As a visitor browsing a category page, I can click a visible View product details action on a solution card to open the linked product page so I can review the vendor page without losing my place.

**Why this priority**: The call to action is the primary path from browsing to vendor product discovery.

**Independent Test**: Click View product details on a published solution card and confirm the configured product page opens in a new browser tab or window while the category page remains available.

**Acceptance Scenarios**:

1. **Given** a published solution card with a configured product URL, **When** the visitor clicks View product details, **Then** the configured external page opens in a new tab or window.
2. **Given** the external page opens, **When** the visitor returns to the category page, **Then** the original browsing context is still intact.

---

### User Story 3 - Maintain Solution Metadata (Priority: P2)

As a content editor, I can provide the product URL and image assets in the solution content so category pages can surface the right destination and artwork without manual page-specific editing.

**Why this priority**: The feature depends on content completeness, and editors need a simple way to keep solution cards current.

**Independent Test**: Update a solution entry with a new URL and image asset, publish it, and verify the category page reflects the updated destination and artwork.

**Acceptance Scenarios**:

1. **Given** a solution entry in content, **When** the editor adds or updates the product URL, **Then** the category page uses that URL for the View product details action after publish.
2. **Given** a solution entry in content, **When** the editor replaces or adds a primary image asset, **Then** the category page uses the updated image for the solution card after publish.

### Edge Cases

- A solution has more than one image asset in its folder; the card should use a single clearly chosen primary image so the card stays consistent.
- A solution is missing a product URL; the card should not expose a broken View product details action.
- A solution image is unavailable or fails to load; the page should preserve the card layout and avoid visual breakage.
- A product URL is long or includes query parameters; the destination should still open correctly and remain usable.
- A category page contains many solutions; the added image and CTA should not make the page difficult to scan.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: Solution content entries MUST support a product URL field that stores the external destination for the solution.
- **FR-002**: Published solution cards on category pages MUST display a solution-specific image sourced from the solution’s own content folder when an image is available.
- **FR-003**: Published solution cards on category pages MUST display the solution name, summary, and a visible View product details action.
- **FR-004**: Activating View product details MUST open the configured product URL in a new browser tab or window and keep the category page available.
- **FR-005**: A solution without a valid product URL MUST NOT render a broken product-details action.
- **FR-006**: Solution card artwork MUST remain tied to the solution content so different solutions can show different images on the same category page.
- **FR-007**: Published solution cards MUST remain readable and visually consistent even when solution images vary in shape or size.

### Key Entities *(include if feature involves data)*

- **Solution entry**: A published content record representing a product or product family, including name, summary, product URL, category membership, and image assets.
- **Solution card**: The summary presentation shown on a category page for one solution entry.
- **Product destination URL**: The external page a visitor reaches when selecting View product details.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: 100% of published solution cards on category pages show a solution-specific image and a visible product-details action when the solution includes complete metadata.
- **SC-002**: 100% of product-details clicks open the configured external product page in a new tab or window without replacing the category page.
- **SC-003**: Content editors can update a solution’s destination URL or image assets through content updates alone, and the published category page reflects the change after the normal publish cycle.
- **SC-004**: In a review of published category pages, there are zero visible broken product-detail links.

## Assumptions

- Each published solution is expected to have one primary image asset suitable for a category card.
- Product URLs are external absolute destinations.
- The category page keeps its existing navigation and solution grouping rules.
- Published solutions are expected to be content-complete before release.