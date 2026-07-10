import fs from 'fs/promises';
import path from 'path';
import matter from 'gray-matter';

export interface FsContentEntry {
  id: string;
  slug: string;
  name: string;
  summary: string;
  body: string;
  status: 'draft' | 'published';
  logo: string | undefined;
  certifications: string[];
  problemStatement: string | undefined;
  targetIndustries: string[];
  outcomes: string[];
  primaryCta: {
    id: string | undefined;
    label: string;
    href: string;
    style: 'primary' | 'secondary' | 'text';
    trackingKey: string | undefined;
  } | undefined;
  offeringIds: string[];
  relatedPartnerIds: string[];
  relatedSolutionIds: string[];
  relatedCategoryIds: string[];
  relatedOfferingIds: string[];
  seo: {
    title: string | undefined;
    description: string | undefined;
  } | undefined;
}

function toArray(value: unknown): string[] {
  return Array.isArray(value) ? value.filter((item): item is string => typeof item === 'string') : [];
}

export async function loadContentEntries(folderName: string): Promise<FsContentEntry[]> {
  const folderPath = path.join(process.cwd(), 'content', folderName);
  const entries = await fs.readdir(folderPath).catch(() => []);

  const parsed = await Promise.all(
    entries
      .filter((entry) => entry.endsWith('.mdx'))
      .map(async (fileName) => {
        const source = await fs.readFile(path.join(folderPath, fileName), 'utf8');
        const parsedMatter = matter(source);
        const data = parsedMatter.data as Record<string, unknown>;
        const slug = typeof data.slug === 'string' ? data.slug : fileName.replace(/\.mdx$/, '');

        return {
          id: typeof data.id === 'string' ? data.id : slug,
          slug,
          name: typeof data.name === 'string' ? data.name : slug,
          summary: typeof data.summary === 'string' ? data.summary : '',
          body: parsedMatter.content.trim(),
          status: (data.status === 'published' ? 'published' : 'draft') as 'draft' | 'published',
          logo: typeof data.logo === 'string' ? data.logo : undefined,
          certifications: toArray(data.certifications),
          problemStatement: typeof data.problemStatement === 'string' ? data.problemStatement : undefined,
          targetIndustries: toArray(data.targetIndustries),
          outcomes: toArray(data.outcomes),
          primaryCta: data.primaryCta && typeof data.primaryCta === 'object' && data.primaryCta !== null
            ? {
                id: typeof (data.primaryCta as Record<string, unknown>).id === 'string' ? (data.primaryCta as Record<string, unknown>).id as string : undefined,
                label: typeof (data.primaryCta as Record<string, unknown>).label === 'string' ? (data.primaryCta as Record<string, unknown>).label as string : '',
                href: typeof (data.primaryCta as Record<string, unknown>).href === 'string' ? (data.primaryCta as Record<string, unknown>).href as string : '',
                style: (['primary', 'secondary', 'text'].includes(String((data.primaryCta as Record<string, unknown>).style))
                  ? (data.primaryCta as Record<string, unknown>).style
                  : 'primary') as 'primary' | 'secondary' | 'text',
                trackingKey: typeof (data.primaryCta as Record<string, unknown>).trackingKey === 'string' ? (data.primaryCta as Record<string, unknown>).trackingKey as string : undefined,
              }
            : undefined,
          offeringIds: toArray(data.offeringIds),
          relatedPartnerIds: toArray(data.relatedPartnerIds),
          relatedSolutionIds: toArray(data.relatedSolutionIds),
          relatedCategoryIds: toArray(data.relatedCategoryIds),
          relatedOfferingIds: toArray(data.relatedOfferingIds),
          seo: data.seo && typeof data.seo === 'object' && data.seo !== null
            ? {
                title: typeof (data.seo as Record<string, unknown>).title === 'string' ? (data.seo as Record<string, unknown>).title as string : undefined,
                description: typeof (data.seo as Record<string, unknown>).description === 'string' ? (data.seo as Record<string, unknown>).description as string : undefined,
              }
            : undefined,
        };
      })
  );

  return parsed;
}
