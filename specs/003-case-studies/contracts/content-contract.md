# Case Studies Content Contract

**Version**: 1.0.0 | **Created**: 2026-07-21

## Purpose

This contract defines the interface for case study content, ensuring consistency across all case studies and enabling dynamic page generation.

## Content Provider Contract

### File Location

All case study files MUST be stored in:
```
qds-web/content/cases/
```

### File Naming

Files MUST follow this naming convention:
- Format: `{slug}.mdx`
- Slug MUST be: lowercase, hyphen-separated, URL-safe
- Example: `acme-datacenter-transformation.mdx`

### Frontmatter Schema

All case study files MUST include valid frontmatter with the following structure:

```yaml
---
# Required fields
id: string (unique identifier)
slug: string (URL-safe slug)
name: string (display title)
company: string (company name)
status: 'draft' | 'published'

# Optional fields
summary: string (max 200 characters recommended)
solution: string
categories: string[] (array of category slugs)
target: string
relatedPartnerIds: string[] (array of partner IDs)
relatedSolutionIds: string[] (array of solution IDs)
seo:
  title: string
  description: string
---
```

### Content Requirements

**Body Content**:
- MUST be valid MDX format
- CAN include: headings, paragraphs, lists, images, components
- SHOULD follow case study structure: Challenge, Solution, Results, Conclusion
- MUST NOT include frontmatter markers in body

**Field Constraints**:

| Field | Type | Required | Constraints |
|----------|------|---|--|
| `id` | string | Yes | Unique across all case studies |
| `slug` | string | Yes | Lowercase, hyphens, no spaces |
| `name` | string | Yes | Non-empty, max 100 characters |
| `company` | string | Yes | Non-empty |
| `summary` | string | No | Max 200 characters recommended |
| `categories` | string[] | No | Must reference existing category slugs |
| `relatedPartnerIds` | string[] | No | Must reference existing partner IDs |
| `relatedSolutionIds` | string[] | No | Must reference existing solution IDs |
| `status` | enum | Yes | Must be 'draft' or 'published' |

## Content Consumer Contract

### Content Helpers

The following functions MUST be available in `qds-web/lib/content/cases.ts`:

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

// Get all case studies (including drafts)
export function getAllCases(): Promise<CaseContent[]>

// Get only published case studies
export function getPublishedCases(): Promise<CaseContent[]>

// Get single case study by slug
export function getCaseBySlug(slug: string): Promise<CaseContent | null>
```

### Behavior Guarantees

**getAllCases()**:
- Returns ALL case studies regardless of status
- Returns empty array if no files exist
- Throws error only on filesystem error

**getPublishedCases()**:
- Returns ONLY case studies with `status: 'published'`
- Returns empty array if no published cases exist
- Sorted by: name (ascending)

**getCaseBySlug(slug)**:
- Returns case study matching exact slug
- Returns `null` if not found (does NOT throw)
- Ignores status (returns drafts too)

### Error Handling

| Scenario | Behavior |
|---|--|
| File not found | Return `null` |
| Invalid frontmatter | Skip file, log warning |
| Missing required field | Skip file, log warning |
| Filesystem error | Throw error with descriptive message |

## UI Contract

### List Page (`/cases`)

**Input**: Calls `getPublishedCases()`

**Output**: Displays grid of case study cards

**Each card displays**:
- `name` (heading)
- `company` (subheading)
- `summary` (description)

**Interaction**:
- Click card → Navigate to `/cases/[slug]`
- Empty state: Show message "No case studies available"

### Detail Page (`/cases/[slug]`)

**Input**: Calls `getCaseBySlug(params.slug)`

**Output**: Displays full case study

**Displays**:
- `name` (page title)
- `company` (prominent display)
- `solution` (if available)
- `categories` (as tags/links)
- `target` (if available)
- `body` (full MDX content)

**Error Handling**:
- If `null` returned → Show 404 page
- Include link back to `/cases`

### Navigation

**Location**: Main navigation header

**Position**: Immediately after "Categories" link

**Label**: "Case Studies"

**URL**: `/cases`

**Behavior**: Navigate to list page

## Validation Rules

### Frontmatter Validation

```typescript
function validateFrontmatter(data: Record<string, unknown>): ValidationError[] {
  const errors: ValidationError[] = [];
  
  // Required fields
  if (!data.id || typeof data.id !== 'string') {
    errors.push('Missing or invalid: id');
  }
  if (!data.slug || typeof data.slug !== 'string') {
    errors.push('Missing or invalid: slug');
  }
  if (!data.name || typeof data.name !== 'string') {
    errors.push('Missing or invalid: name');
  }
  if (!data.company || typeof data.company !== 'string') {
    errors.push('Missing or invalid: company');
  }
  if (!data.status || !['draft', 'published'].includes(data.status)) {
    errors.push('Missing or invalid: status');
  }
  
  // Slug format validation
  if (data.slug && !/^[a-z0-9-]+$/.test(data.slug)) {
    errors.push('Slug must be lowercase, hyphen-separated');
  }
  
  // Array field validation
  if (data.categories && !Array.isArray(data.categories)) {
    errors.push('categories must be an array');
  }
  if (data.relatedPartnerIds && !Array.isArray(data.relatedPartnerIds)) {
    errors.push('relatedPartnerIds must be an array');
  }
  
  return errors;
}
```

### Content Consistency

**Cross-Reference Validation**:
- `categories` MUST reference existing category slugs
- `relatedPartnerIds` MUST reference existing partner IDs
- `relatedSolutionIds` MUST reference existing solution IDs

**Uniqueness**:
- `id` MUST be unique across all case studies
- `slug` MUST be unique across all case studies

## Versioning

**Contract Version**: 1.0.0

**Backward Compatibility**:
- Adding optional fields: ✅ Compatible
- Removing optional fields: ⚠️ Breaking
- Changing required fields: ❌ Breaking

**Deprecation Policy**:
- Deprecated fields marked with `@deprecated` tag
- Minimum 6 months before removal
- Migration guide provided

## Examples

### Valid Case Study File

```mdx
---
id: acme-transformation
slug: acme-datacenter-transformation
name: Acme Corporation Data Center Transformation
company: Acme Corporation
summary: How Acme reduced energy costs by 30% through comprehensive DCIM.
solution: Complete DCIM solution with airflow and power management
categories:
  - airflow-management
  - power-management
target: Reduce energy costs by 30%
relatedPartnerIds:
  - vertiv
  - huawei
status: published
---

# Acme Corporation Data Center Transformation

## Challenge

Acme faced rising energy costs...

## Solution

Implemented comprehensive DCIM...

## Results

- 30% energy cost reduction
- 25% cooling efficiency improvement

## Conclusion

Successful transformation achieved...
```

### Invalid Case Study Files

**Missing required field**:
```mdx
---
id: test
slug: test-case
name: Test Case
# Missing: company, status
---
```
❌ Invalid: Missing required fields

**Invalid slug format**:
```mdx
---
id: test
slug: Test Case With Spaces
name: Test Case
company: Test
status: published
---
```
❌ Invalid: Slug contains spaces and uppercase

**Invalid status value**:
```mdx
---
id: test
slug: test-case
name: Test Case
company: Test
status: active
---
```
❌ Invalid: Status must be 'draft' or 'published'

## Compliance Checklist

- [ ] File located in `qds-web/content/cases/`
- [ ] File named with valid slug: `{slug}.mdx`
- [ ] Frontmatter includes all required fields
- [ ] Slug is lowercase, hyphen-separated
- [ ] Status is 'draft' or 'published'
- [ ] All array fields are valid arrays
- [ ] All referenced IDs exist in their respective collections
- [ ] Body content is valid MDX
- [ ] No duplicate `id` or `slug` values

---

**Last Updated**: 2026-07-21
**Next Review**: Upon major feature changes
