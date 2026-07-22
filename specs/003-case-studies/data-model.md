# Data Model: Case Studies

**Feature**: Case Studies | **Created**: 2026-07-21

## Overview

Case studies are stored as MDX files in the `/content/cases` directory. Each file contains frontmatter metadata and MDX body content.

## Entity: CaseStudy

Represents a customer success story or implementation example.

### Properties

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `id` | string | Yes | Unique identifier for the case study |
| `slug` | string | Yes | URL-friendly slug (used in routing) |
| `name` | string | Yes | Display title of the case study |
| `company` | string | Yes | Company/organization featured |
| `summary` | string | No | Brief summary for list view |
| `solution` | string | No | Solution implemented |
| `categories` | string[] | No | Array of category slugs |
| `target` | string | No | Target audience or outcomes achieved |
| `relatedPartnerIds` | string[] | No | Related partner IDs |
| `relatedSolutionIds` | string[] | No | Related solution IDs |
| `seo.title` | string | No | SEO title |
| `seo.description` | string | No | SEO description |
| `status` | 'draft' \| 'published' | Yes | Publication status |
| `body` | string | Yes | Full MDX content |

### Frontmatter Schema

```yaml
---
id: unique-identifier
slug: case-study-slug
name: Case Study Title
company: Company Name
summary: Brief summary for list view (optional)
solution: Solution name or ID (optional)
categories:
  - category-slug-1
  - category-slug-2
target: Target audience or business objective (optional)
relatedPartnerIds:
  - partner-id-1
  - partner-id-2
relatedSolutionIds:
  - solution-id-1
seo:
  title: SEO title (optional)
  description: SEO description (optional)
status: published
---
```

### Relationships

- **Categories**: Many-to-many (case studies can belong to multiple categories)
- **Partners**: Many-to-many (related partners via `relatedPartnerIds`)
- **Solutions**: Many-to-many (related solutions via `relatedSolutionIds`)

## Storage Location

- **Directory**: `qds-web/content/cases/`
- **File Format**: `.mdx`
- **Naming Convention**: `{slug}.mdx`

## Example Case Study File

```mdx
---
id: acme-datacenter-transformation
slug: acme-datacenter-transformation
name: Acme Corporation Data Center Transformation
company: Acme Corporation
summary: How Acme Corporation reduced energy costs by 30% through comprehensive data center infrastructure management.
solution: Complete DCIM solution with airflow management and power monitoring
categories:
  - airflow-management
  - power-management
  - environmental-monitoring
target: Reduce energy costs by 30% while improving cooling efficiency
relatedPartnerIds:
  - vertiv
  - huawei
relatedSolutionIds:
  - data-center-airflow-optimization
  - smart-rack-solutions
seo:
  title: Acme Corporation Case Study | Data Center Transformation
  description: Learn how Acme Corporation achieved 30% energy cost reduction through strategic data center infrastructure improvements.
status: published
---

# Acme Corporation Data Center Transformation

## Challenge

Acme Corporation faced rising energy costs and cooling inefficiencies in their primary data center...

## Solution

Implemented a comprehensive DCIM solution including:
- Airflow management systems
- Power monitoring infrastructure
- Environmental monitoring sensors

## Results

- 30% reduction in energy costs
- 25% improvement in cooling efficiency
- Zero unplanned downtime

## Conclusion

The transformation demonstrates the value of strategic infrastructure investment...
```

## Validation Rules

### Required Fields
- `id`: Must be unique and non-empty
- `slug`: Must be URL-safe, lowercase, hyphen-separated
- `name`: Must be non-empty
- `company`: Must be non-empty
- `status`: Must be either 'draft' or 'published'

### Optional Fields
- `summary`: Recommended for list view, max 200 characters
- `categories`: Should reference existing category slugs
- `relatedPartnerIds`: Should reference existing partner IDs
- `relatedSolutionIds`: Should reference existing solution IDs

### Status Behavior
- `published`: Visible on `/cases` page and detail pages
- `draft`: Only visible during development, not included in production listings

## Content Helpers

Located in `qds-web/lib/content/cases.ts`:

```typescript
// Get all case studies (including drafts)
getAllCases(): Promise<CaseContent[]>

// Get only published case studies
getPublishedCases(): Promise<CaseContent[]>

// Get single case study by slug
getCaseBySlug(slug: string): Promise<CaseContent | null>
```

## Migration Notes

- No database migration required (file-based storage)
- New directory creation: `qds-web/content/cases/`
- Existing patterns from categories can be reused
