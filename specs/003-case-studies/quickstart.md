# Quickstart: Case Studies Feature

**Feature**: Case Studies | **Created**: 2026-07-21

## Overview

This guide shows you how to add and manage case studies on the QDS website.

## Adding a New Case Study

### Step 1: Create the MDX File

Create a new file in `qds-web/content/cases/` with a descriptive slug:

```bash
# Example file name
qds-web/content/cases/acme-datacenter-transformation.mdx
```

### Step 2: Add Frontmatter

Copy this template and fill in your case study details:

```mdx
---
id: unique-identifier
slug: your-case-slug
name: Case Study Title
company: Company Name
summary: Brief summary for list view (1-2 sentences)
solution: Solution implemented
categories:
  - category-slug-1
  - category-slug-2
target: Target audience or business objective
relatedPartnerIds:
  - partner-id-1
status: published
---
```

### Step 3: Add Case Study Content

Write your case study in MDX format below the frontmatter:

```mdx
# Case Study Title

## Challenge

Describe the customer's challenge...

## Solution

Describe the solution implemented...

## Results

Describe the outcomes and metrics...

## Conclusion

Wrap up the case study...
```

### Step 4: Verify

The case study will automatically appear on the `/cases` page when:
- File is saved in `qds-web/content/cases/`
- `status` is set to `published`
- File has valid MDX syntax

## Viewing Case Studies

### List Page

Navigate to: `http://localhost:3000/cases`

Shows all published case studies in a grid layout.

### Detail Page

Navigate to: `http://localhost:3000/cases/[slug]`

Shows full case study details including:
- Name
- Company
- Solution
- Categories
- Target/Outcomes
- Full report content

## Navigation

Case Studies link appears in the main navigation:
- Position: Right after "Categories"
- URL: `/cases`
- Label: "Case Studies"

## Common Tasks

### Update an Existing Case Study

1. Edit the MDX file in `qds-web/content/cases/`
2. Update frontmatter or content
3. Save the file
4. Changes appear automatically on next page load

### Change Publication Status

To unpublish a case study:

```yaml
status: draft
```

To republish:

```yaml
status: published
```

### Add Multiple Categories

```yaml
categories:
  - airflow-management
  - power-management
  - environmental-monitoring
```

### Add Related Partners

```yaml
relatedPartnerIds:
  - vertiv
  - huawei
  - austin-hughes
```

## Troubleshooting

### Case study not appearing on list page

**Check:**
- File is in `qds-web/content/cases/`
- `status` is set to `published`
- File has valid MDX syntax
- Frontmatter is properly formatted with `---` markers

### 404 on detail page

**Check:**
- Slug in URL matches the `slug` field in frontmatter
- File exists with correct name: `{slug}.mdx`
- File has valid MDX syntax

### Categories not linking correctly

**Check:**
- Category slugs match existing category file names
- Categories exist in `qds-web/content/categories/`

## Next Steps

- Add your first case study
- Customize the content and styling
- Link case studies to relevant categories and partners
- Monitor analytics to see which case studies perform best

## Support

For questions or issues:
- Review the [specification](./spec.md)
- Check the [implementation plan](./plan.md)
- See the [data model](./data-model.md) for field details
