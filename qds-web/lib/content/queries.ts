import { collections } from '../../content-collections';
import { z } from 'zod';

// Type exports for content
export type SiteSettings = z.infer<typeof collections.siteSettings.schema>;
export type HomePage = z.infer<typeof collections.homePage.schema>;
export type Vendor = z.infer<typeof collections.vendors.schema>;
export type Partner = Vendor;
export type Category = z.infer<typeof collections.categories.schema>;
export type Offering = z.infer<typeof collections.offerings.schema>;
export type Solution = z.infer<typeof collections.solutions.schema>;
export type Redirect = z.infer<typeof collections.redirects.schema>;

// Published entry guard
export function isPublished<T extends { status: 'draft' | 'published' }>(
  entry: T
): entry is T & { status: 'published' } {
  return entry.status === 'published';
}

// Get all published entries from a collection
export function getPublished<T extends { status: 'draft' | 'published' }>(
  entries: T[]
): T[] {
  return entries.filter(isPublished);
}

// Validate that all referenced IDs exist and are published
export function validateReferences<T extends { id: string; status?: 'draft' | 'published' }>(
  entries: T[],
  references: string[],
  collectionName: string
): { valid: boolean; missing: string[]; draft: string[] } {
  const entryMap = new Map(entries.map(e => [e.id, e]));
  const missing: string[] = [];
  const draft: string[] = [];

  for (const refId of references) {
    const entry = entryMap.get(refId);
    if (!entry) {
      missing.push(refId);
    } else if ('status' in entry && entry.status === 'draft') {
      draft.push(refId);
    }
  }

  return { valid: missing.length === 0 && draft.length === 0, missing, draft };
}

// Resolve related content by IDs
export function resolveRelated<T extends { id: string }>(
  entries: T[],
  relatedIds: string[]
): T[] {
  const entryMap = new Map(entries.map(e => [e.id, e]));
  return relatedIds
    .map(id => entryMap.get(id))
    .filter((entry): entry is T => entry !== undefined);
}

// Build slug from name (fallback if not explicitly provided)
export function buildSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

// Build canonical URL from slug and base URL
export function buildCanonicalUrl(slug: string, baseUrl: string): string {
  const cleanSlug = slug.replace(/^\/|\/$/g, '');
  return `${baseUrl}/${cleanSlug}`;
}
