import fs from 'fs/promises';
import path from 'path';
import matter from 'gray-matter';

export interface CaseContent {
  id: string;
  slug: string;
  name: string;
  company: string;
  summary: string;
  body: string;
  solution?: string;
  categories: string[];
  target?: string;
  relatedPartnerIds: string[];
  relatedSolutionIds: string[];
  seo?: {
    title?: string;
    description?: string;
  };
  status: 'draft' | 'published';
  sourcePath: string;
}

const casesDir = path.join(process.cwd(), 'content', 'cases');

async function readCaseFiles(): Promise<string[]> {
  try {
    const entries = await fs.readdir(casesDir);
    return entries.filter((entry) => entry.endsWith('.mdx'));
  } catch {
    return [];
  }
}

function toArray(value: unknown): string[] {
  return Array.isArray(value) ? value.filter((item): item is string => typeof item === 'string') : [];
}

function parseCaseFile(fileName: string, source: string): CaseContent | null {
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
    company: typeof data.company === 'string' ? data.company : '',
    summary,
    body: parsed.content.trim(),
    solution: typeof data.solution === 'string' ? data.solution : undefined,
    categories: toArray(data.categories),
    target: typeof data.target === 'string' ? data.target : undefined,
    relatedPartnerIds: toArray(data.relatedPartnerIds),
    relatedSolutionIds: toArray(data.relatedSolutionIds),
    seo: typeof data.seo === 'object' && data.seo ? {
      title: typeof (data.seo as Record<string, unknown>).title === 'string' ? (data.seo as Record<string, unknown>).title as string : undefined,
      description: typeof (data.seo as Record<string, unknown>).description === 'string' ? (data.seo as Record<string, unknown>).description as string : undefined,
    } : undefined,
    status,
    sourcePath: path.join(casesDir, fileName),
  };
}

export async function getAllCases(): Promise<CaseContent[]> {
  const files = await readCaseFiles();
  const cases = await Promise.all(
    files.map(async (fileName) => {
      try {
        const source = await fs.readFile(path.join(casesDir, fileName), 'utf8');
        return parseCaseFile(fileName, source);
      } catch {
        return null;
      }
    })
  );

  return cases.filter((c): c is CaseContent => Boolean(c));
}

export async function getPublishedCases(): Promise<CaseContent[]> {
  const cases = await getAllCases();
  return cases.filter((c) => c.status === 'published').sort((a, b) => a.name.localeCompare(b.name));
}

export async function getCaseBySlug(slug: string): Promise<CaseContent | null> {
  const files = await readCaseFiles();
  for (const fileName of files) {
    try {
      const source = await fs.readFile(path.join(casesDir, fileName), 'utf8');
      const parsed = matter(source);
      const data = parsed.data as Record<string, unknown>;
      const fileSlug = typeof data.slug === 'string' ? data.slug : fileName.replace(/\.mdx$/, '');
      if (fileSlug === slug) {
        return parseCaseFile(fileName, source);
      }
    } catch {
      // ignore
    }
  }
  return null;
}

export async function getCaseSlugs(): Promise<string[]> {
  const cases = await getPublishedCases();
  return cases.map((c) => c.slug);
}
