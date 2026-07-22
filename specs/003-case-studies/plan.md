# Implementation Plan: Case Studies

**Branch**: `[003-case-studies]` | **Date**: 2026-07-21 | **Spec**: [spec.md](./spec.md)

**Input**: Feature specification from `/specs/003-case-studies/spec.md`

**User Requirements**: All cases are MDX format stored in `/content/cases`. The webpage shouldn't be hardcoded. The case studies page should display a list according to the MDX files in `/content/cases` folder. When clicking a case, it shows the content of the case MDX file. Using the same method as the categories.

## Summary

Implement a dynamic case studies feature that:
- Stores case studies as MDX files in `/content/cases` directory
- Dynamically generates a list page at `/cases` by reading MDX files
- Creates dynamic detail pages at `/cases/[slug]` for each case study
- Adds "Case Studies" navigation link next to "Categories" in the header
- Follows the exact same pattern as the existing categories implementation

## Technical Context

**Language/Version**: TypeScript 5.x, Next.js 14+ (App Router)

**Primary Dependencies**: Next.js, MDX, gray-matter (already in use)

**Storage**: File-based MDX content in `/content/cases` directory

**Testing**: Vitest (existing test framework)

**Target Platform**: Next.js web application

**Project Type**: Marketing website with dynamic content pages

**Performance Goals**: Standard page load budgets (Lighthouse targets)

**Constraints**: Must follow existing categories pattern exactly

**Scale/Scope**: Dynamic content pages, no database required

## Constitution Check

*Gates determined based on constitution file:*

✅ **Code Quality**: Will include unit tests for content parsing logic
✅ **User Experience Consistency**: Will use existing components (SiteHeader, SiteFooter, Container)
✅ **Performance & Accessibility**: Will follow existing patterns that already meet WCAG 2.1 AA
✅ **Simplicity & Incrementalism**: Simple file-based approach, no new infrastructure needed
✅ **Technology Stack**: Uses existing stack (Next.js, MDX, TypeScript)

**No violations detected** - all constitution requirements can be met with the proposed approach.

## Project Structure

### Documentation (this feature)

```text
specs/003-case-studies/
├── plan.md              # This file
├── research.md          # Phase 0 output
├── data-model.md        # Phase 1 output
├── quickstart.md        # Phase 1 output
├── contracts/           # Phase 1 output
└── tasks.md             # Phase 2 output (created by /speckit.tasks)
```

### Source Code (repository root)

```text
qds-web/
├── content/
│   └── cases/                    # NEW: Case study MDX files
│       ├── example-case.mdx
│       └── [slug].mdx            # Dynamic case study files
│
├── app/
│   └── (marketing)/
│       ├── cases/                # NEW: Case studies routes
│       │   ├── page.tsx          # List page (dynamic from MDX files)
│       │   └── [slug]/
│       │       └── page.tsx      # Detail page (dynamic route)
│       └── ... (existing routes)
│
├── lib/
│   └── content/
│       ├── cases.ts              # NEW: Case studies content helpers
│       └── ... (existing helpers)
│
├── components/
│   └── layout/
│       └── site-header.tsx       # MODIFIED: Add Case Studies link
│
└── tests/
    └── unit/
        └── lib/content/cases.test.ts  # NEW: Tests for cases.ts
```

**Structure Decision**: Following the exact same pattern as categories implementation:
- Content files in `/content/cases` (parallel to `/content/categories`)
- Content helpers in `/lib/content/cases.ts` (parallel to `/lib/content/categories.ts`)
- Routes in `/app/(marketing)/cases/` (parallel to `/app/(marketing)/categories/`)
- Dynamic routing with `[slug]` folder for detail pages

## Research Findings (Phase 0)

Based on analysis of existing categories implementation:

### 1. Case Study MDX Frontmatter Schema

**Required Fields**:
- `id`: Unique identifier (string)
- `slug`: URL-friendly slug (string)
- `name`: Display title (string)
- `company`: Company name (string)
- `status`: 'published' or 'draft' (string)

**Optional Fields**:
- `summary`: Brief summary for list view (string)
- `solution`: Solution name or ID (string)
- `categories`: Array of category slugs (string[])
- `target`: Target/outcome description (string)
- `relatedPartnerIds`: Array of partner IDs (string[])
- `relatedSolutionIds`: Array of solution IDs (string[])
- `seo`: SEO metadata object with `title` and `description`

**Body Content**:
- Full MDX content supporting all MDX features
- Can include headings, paragraphs, lists, images, components

### 2. List Display Pattern

Following categories pattern:
- Grid layout with responsive columns (1 col mobile, 3 cols desktop)
- Each card shows: name, company, summary
- Click navigates to detail page
- Hover effects with shadow transition

### 3. Detail Page Pattern

Following categories pattern:
- Reuse MDX rendering from existing content pages
- Display all frontmatter fields prominently
- Full MDX content body rendering
- Breadcrumb navigation
- 404 handling for non-existent slugs

### 4. Navigation Integration

- "Case Studies" link positioned after "Categories" in main navigation
- Simple link to `/cases` (no dropdown initially)
- Can add dropdown in future if needed

## Design Decisions (Phase 1)

### Data Model

**Case Study Interface** (`lib/content/cases.ts`):
```typescript
export interface CaseContent {
  id: string;
  slug: string;
  name: string;
  company: string;
  summary: string;
  body: string;
  solution: string;
  categories: string[];
  target: string;
  relatedPartnerIds: string[];
  relatedSolutionIds: string[];
  seo?: { title?: string; description?: string };
  status: 'draft' | 'published';
  sourcePath: string;
}
```

### Content Helpers (`lib/content/cases.ts`)

Following the exact same pattern as `categories.ts`:

```typescript
import fs from 'fs/promises';
import path from 'path';
import matter from 'gray-matter';

const casesDir = path.join(process.cwd(), 'content', 'cases');

export async function getAllCases(): Promise<CaseContent[]> { ... }
export async function getPublishedCases(): Promise<CaseContent[]> { ... }
export async function getCaseBySlug(slug: string): Promise<CaseContent | null> { ... }
```

### Routes

**List Page** (`app/(marketing)/cases/page.tsx`):
```typescript
import { getPublishedCases } from '@/lib/content/cases';

export default async function CasesPage() {
  const cases = await getPublishedCases();
  
  return (
    <>
      <SiteHeader />
      <main>
        <section>
          <Container>
            <h1>Case Studies</h1>
            {/* Grid of case cards */}
          </Container>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
```

**Detail Page** (`app/(marketing)/cases/[slug]/page.tsx`):
```typescript
import { getCaseBySlug } from '@/lib/content/cases';

export default async function CasePage({ params }: { params: { slug: string } }) {
  const caseStudy = await getCaseBySlug(params.slug);
  
  if (!caseStudy) {
    notFound();
  }
  
  return (
    <>
      <SiteHeader />
      <main>
        <Container>
          {/* Display all case study fields */}
          {/* Render MDX body */}
        </Container>
      </main>
      <SiteFooter />
    </>
  );
}
```

### Navigation Update

**Site Header** (`components/layout/site-header.tsx`):
- Add `<li><Link href="/cases">Case Studies</Link></li>` after Categories
- Position: right after Categories, before Contact

## Quickstart Guide

### Adding a New Case Study

1. Create MDX file in `qds-web/content/cases/`:
   ```bash
   touch qds-web/content/cases/my-case-study.mdx
   ```

2. Add frontmatter and content:
   ```mdx
   ---
   id: my-case-study
   slug: my-case-study
   name: My Case Study Title
   company: Acme Corporation
   summary: Brief summary of the case study
   solution: Data Center Management Solution
   categories:
     - airflow-management
     - power-management
   target: Reduce energy costs by 30%
   relatedPartnerIds:
     - vertiv
   status: published
   ---

   # Full Case Study Content

   Write your detailed case study here...
   ```

3. The case will automatically appear on `/cases` page when status is `published`

### Viewing Case Studies

- List page: `http://localhost:3000/cases`
- Detail page: `http://localhost:3000/cases/[slug]`

## Contracts

### Content Contract (Case Study MDX)

**Required Fields**:
- `id`: Unique identifier (string)
- `slug`: URL-friendly slug (string)
- `name`: Display title (string)
- `company`: Company name (string)
- `status`: 'published' or 'draft' (string)

**Optional Fields**:
- `summary`: Brief summary for list view (string)
- `solution`: Solution name or ID (string)
- `categories`: Array of category slugs (string[])
- `target`: Target/outcome description (string)
- `relatedPartnerIds`: Array of partner IDs (string[])
- `relatedSolutionIds`: Array of solution IDs (string[])
- `seo`: SEO metadata object

**Body Content**:
- Full MDX content supporting all MDX features
- Can include headings, paragraphs, lists, images, components

### API Contract (Content Helpers)

```typescript
interface CaseContent {
  id: string;
  slug: string;
  name: string;
  company: string;
  summary: string;
  body: string;
  solution: string;
  categories: string[];
  target: string;
  relatedPartnerIds: string[];
  relatedSolutionIds: string[];
  seo?: { title?: string; description?: string };
  status: 'draft' | 'published';
  sourcePath: string;
}

function getAllCases(): Promise<CaseContent[]>
function getPublishedCases(): Promise<CaseContent[]>
function getCaseBySlug(slug: string): Promise<CaseContent | null>
```

### UI Contract

**List Page** (`/cases`):
- Displays grid of published case studies
- Each card: name, company, summary
- Click navigates to detail page
- Empty state message if no cases published

**Detail Page** (`/cases/[slug]`):
- Shows all case study fields
- Full MDX content rendering
- Breadcrumb navigation
- 404 for non-existent slugs

**Navigation**:
- "Case Studies" link in main header
- Positioned after "Categories"
- Link to `/cases`

## Next Steps

1. ✅ **Phase 0**: Research completed - all clarifications resolved
2. ✅ **Phase 1**: Design completed - all decisions documented
3. **Phase 2**: Generate tasks.md using /speckit.tasks
4. **Phase 3**: Implement and test

---

**Plan Status**: Ready for Phase 2 (tasks generation)
**Constitution Compliance**: ✅ All requirements can be met
**Pattern Consistency**: ✅ Follows existing categories implementation exactly
**Research Complete**: ✅ All unknowns resolved
