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

- A solution has more than one image asset in its folder; the card should use the first discovered image as the default preview so the card stays consistent.
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

## Clarifications

### Session 2026-07-13

- Q: Should the solution frontmatter include `images` array and `primaryImage` fields, or rely solely on co-located folder images discovered at build time? → A: Remove `images` and `primaryImage` from frontmatter; use only co-located folder images discovered at build time.

## Design: Solution Card

### Overview

Each solution card is a compact, self-contained presentation that surfaces imagery, identity, summary, and a clear call-to-action to the product destination. The card is divided into three vertical regions: an upper enlarged-image area, a middle thumbnail gallery, and a lower content & action area.

### Layout

- **Upper (Enlarged image):** Displays one large primary image for the solution. By default this shows the primary image from the solution content. When a visitor clicks any thumbnail in the middle region, the upper area updates to show the clicked image enlarged. The enlarged image maintains aspect-fit so it does not crop important content; the card reserves a fixed visual height proportional to the card width for layout stability.

- **Middle (Thumbnail gallery):** Shows all available images from the solution's content folder as small, tappable thumbnails in a single horizontal strip or a compact grid depending on available width. Thumbnails include a visible selected state (outline or subtle shadow) indicating the image currently shown in the upper area. Clicking or keyboard-activating a thumbnail swaps the enlarged image in the upper area.

- **Lower (Name, summary, CTA):** Contains the solution name (prominent), a one-line summary (secondary text), and a visible `View product details` action. The CTA opens the configured external product URL in a new tab/window. If there is no valid product URL the CTA is hidden.

### Interaction & Behavior

- Clicking/tapping a thumbnail updates the enlarged image with a smooth cross-fade transition (200ms ease-in-out).
- Keyboard support: thumbnails are focusable (Tab), selectable via `Enter`/`Space`, and the selected thumbnail exposes `aria-current="true"` while the enlarged image has an accessible description (aria-describedby) describing the image and its role.
- Lazy loading: thumbnails and enlarged images load lazily with a low-quality placeholder to improve perceived performance.
- If the enlarged image fails to load, show a consistent fallback placeholder (e.g., a neutral product silhouette) and preserve the layout height to avoid content reflow.

### Content Model / Example Frontmatter

Solution content entries MUST include fields supporting the card. Example MDX frontmatter:

---
title: "Solution Name"
summary: "One-line summary for category card"
productUrl: "https://vendor.example.com/product/123"
---

- `productUrl` (optional): absolute external destination for the `View product details` CTA.
- All `.png`, `.jpg`, and `.jpeg` files in the same solution folder are automatically discovered at build time and used as the thumbnail gallery. The first discovered image becomes the default enlarged preview.

### Accessibility

- All images must include `alt` text in the content metadata or fallback to the solution `title` if absent.
- Thumbnails expose `role="tablist"` semantics with `aria-selected` on the active thumbnail for screen readers.
- The `View product details` CTA is a standard anchor with `rel="noopener noreferrer"` and `target="_blank"` and includes a visually hidden hint for screen-reader users that it opens in a new tab.

### Responsive Behavior

- Desktop: show the thumbnail strip horizontally centered below the enlarged image.
- Tablet / small screens: thumbnail strip becomes horizontally scrollable if there are more items than fit; the enlarged image scales down proportionally.
- Mobile: use a single-row thumbnail scroller or a collapsed control (e.g., small gallery button) when vertical space is constrained.

### Edge Cases & Requirements Mapping

- If multiple images exist in the solution folder, the first discovered image is used as the default enlarged preview (FR-006).
- If no images exist in the solution folder, render a standard placeholder image that preserves layout (maps to FR-007).
- If no `productUrl` is provided or it fails basic validation, hide the CTA to avoid a broken action (FR-005).

### Implementation Notes for Developers

- CSS: prefer CSS grid for the card, with aspect-ratio utilities (or padding-top trick) to reserve enlarged-image height.
- JS: minimal client-side logic to swap enlarged image, manage selected thumbnail state, and ensure keyboard interaction. Prefer progressive enhancement—cards render sensibly without JS (show primary image + content + CTA).
