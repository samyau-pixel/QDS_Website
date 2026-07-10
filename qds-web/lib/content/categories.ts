import fs from 'fs/promises';
import path from 'path';
import matter from 'gray-matter';

export interface CategoryContent {
  id: string;
  slug: string;
  name: string;
  summary: string;
  body: string;
  offeringIds: string[];
  relatedPartnerIds: string[];
  relatedSolutionIds: string[];
  seo?: {
    title?: string;
    description?: string;
  };
  status: 'draft' | 'published';
  sourcePath: string;
}

const categoriesDir = path.join(process.cwd(), 'content', 'categories');

async function readCategoryFiles(): Promise<string[]> {
  try {
    const entries = await fs.readdir(categoriesDir);
    return entries.filter((entry) => entry.endsWith('.mdx'));
  } catch {
    return [];
  }
}

function toArray(value: unknown): string[] {
  return Array.isArray(value) ? value.filter((item): item is string => typeof item === 'string') : [];
}

function parseCategoryFile(fileName: string, source: string): CategoryContent | null {
  const parsed = matter(source);
  const data = parsed.data as Record<string, unknown>;
  const slug = typeof data.slug === 'string' ? data.slug : fileName.replace(/\.mdx$/, '');
  const name = typeof data.name === 'string' ? data.name : slug;
  const summary = typeof data.summary === 'string' ? data.summary : '';
  const status = data.status === 'published' ? 'published' : 'draft';

  return {
    id: typeof data.id === 'string' ? data.id : slug,
    slug,
    name,
    summary,
    body: parsed.content.trim(),
    offeringIds: toArray(data.offeringIds),
    relatedPartnerIds: toArray(data.relatedPartnerIds),
    relatedSolutionIds: toArray(data.relatedSolutionIds),
    seo: typeof data.seo === 'object' && data.seo ? {
      title: typeof (data.seo as Record<string, unknown>).title === 'string' ? (data.seo as Record<string, unknown>).title as string : undefined,
      description: typeof (data.seo as Record<string, unknown>).description === 'string' ? (data.seo as Record<string, unknown>).description as string : undefined,
    } : undefined,
    status,
    sourcePath: path.join(categoriesDir, fileName),
  };
}

export async function getAllCategories(): Promise<CategoryContent[]> {
  const files = await readCategoryFiles();
  const categories = await Promise.all(
    files.map(async (fileName) => {
      const source = await fs.readFile(path.join(categoriesDir, fileName), 'utf8');
      return parseCategoryFile(fileName, source);
    })
  );

  return categories.filter((category): category is CategoryContent => Boolean(category));
}

export async function getPublishedCategories(): Promise<CategoryContent[]> {
  const categories = await getAllCategories();
  return categories.filter((category) => category.status === 'published');
}

export async function getCategoryBySlug(slug: string): Promise<CategoryContent | null> {
  const categories = await getAllCategories();
  return categories.find((category) => category.slug === slug && category.status === 'published') ?? null;
}

export async function getCategorySlugs(): Promise<string[]> {
  const categories = await getPublishedCategories();
  return categories.map((category) => category.slug);
}