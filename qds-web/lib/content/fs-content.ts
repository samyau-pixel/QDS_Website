import fs from 'fs/promises';
import type { Dirent } from 'fs';
import path from 'path';
import matter from 'gray-matter';

export interface SolutionImageAsset {
  fileName: string;
  relativePath: string;
  publicPath: string;
  extension: string;
  sortOrder: number;
  isDefaultSelected: boolean;
}

export interface SolutionCardViewModel {
  id: string;
  slug: string;
  name: string;
  summary: string;
  productUrl: string | undefined;
  images: SolutionImageAsset[];
  selectedImage: SolutionImageAsset | undefined;
  showProductDetails: boolean;
  vendorSlug: string;
  vendorName: string;
}

export interface FsContentEntry {
  id: string;
  slug: string;
  name: string;
  summary: string;
  body: string;
  status: 'draft' | 'published';
  relativePath: string;
  pathSegments: string[];
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
  categoryIds: string[];
  vendorIds: string[];
  offeringIds: string[];
  relatedPartnerIds: string[];
  relatedSolutionIds: string[];
  relatedCategoryIds: string[];
  relatedOfferingIds: string[];
  seo: {
    title: string | undefined;
    description: string | undefined;
  } | undefined;
  productUrl: string | undefined;
}

function toArray(value: unknown): string[] {
  return Array.isArray(value) ? value.filter((item): item is string => typeof item === 'string') : [];
}

/**
 * Validates that a string is a valid absolute HTTP/HTTPS URL
 */
export function isValidProductUrl(url: unknown): boolean {
  if (typeof url !== 'string') return false;
  try {
    const parsed = new URL(url);
    return parsed.protocol === 'http:' || parsed.protocol === 'https:';
  } catch {
    return false;
  }
}

/**
 * Discovers all supported image files (.png, .jpg, .jpeg) in a directory
 * Returns them sorted lexically with metadata for the solution card
 * Generates API route URLs to serve images from the content directory
 */
export async function discoverSolutionImages(solutionFolderPath: string, vendorSlug: string, solutionSlug: string): Promise<SolutionImageAsset[]> {
  try {
    const entries = await fs.readdir(solutionFolderPath, { withFileTypes: true });
    const imageExtensions = ['.png', '.jpg', '.jpeg'];
    
    const images: SolutionImageAsset[] = [];
    
    for (const entry of entries) {
      if (!entry.isFile()) continue;
      
      const ext = path.extname(entry.name).toLowerCase();
      if (!imageExtensions.includes(ext)) continue;
      
      const fileName = entry.name;
      const relativePath = path.join(solutionFolderPath, fileName);
      // Generate API route URL: /api/images/{vendor}/{solution}/{image}
      const publicUrlPath = `/api/images/${encodeURIComponent(vendorSlug)}/${encodeURIComponent(solutionSlug)}/${encodeURIComponent(fileName)}`;
      
      images.push({
        fileName,
        relativePath,
        publicPath: publicUrlPath,
        extension: ext,
        sortOrder: 0, // Will be set after sorting
        isDefaultSelected: false,
      });
    }
    
    // Sort lexically for deterministic ordering
    images.sort((a, b) => a.fileName.localeCompare(b.fileName));
    
    // Assign sort order and mark first as default
    images.forEach((img, index) => {
      img.sortOrder = index;
      if (index === 0) {
        img.isDefaultSelected = true;
      }
    });
    
    return images;
  } catch {
    return [];
  }
}

/**
 * Creates a SolutionCardViewModel from a vendor solution entry
 */
export async function createSolutionCardViewModel(
  entry: FsContentEntry,
  solutionFolderPath: string
): Promise<SolutionCardViewModel> {
  const vendorSlug = entry.pathSegments[1] || '';
  const solutionSlug = entry.slug;
  const images = await discoverSolutionImages(solutionFolderPath, vendorSlug, solutionSlug);
  const productUrl = isValidProductUrl(entry.productUrl) ? entry.productUrl : undefined;
  
  // Load vendor name from vendor file
  let vendorName = vendorSlug;
  try {
    const vendorFilePath = path.join(process.cwd(), 'content', 'vendors', vendorSlug, `${vendorSlug}.mdx`);
    const vendorSource = await fs.readFile(vendorFilePath, 'utf8');
    const vendorParsed = matter(vendorSource);
    const vendorData = vendorParsed.data as Record<string, unknown>;
    if (typeof vendorData.name === 'string') {
      vendorName = vendorData.name;
    }
  } catch {
    // If vendor file not found, use slug as name
  }
  
  return {
    id: entry.id,
    slug: entry.slug,
    name: entry.name,
    summary: entry.summary,
    productUrl,
    images,
    selectedImage: images.length > 0 ? images[0] : undefined,
    showProductDetails: productUrl !== undefined,
    vendorSlug,
    vendorName,
  };
}

async function readMdxFiles(basePath: string, relativeRoot = ''): Promise<FsContentEntry[]> {
  const directoryEntries = await fs.readdir(basePath, { withFileTypes: true }).catch(() => [] as Dirent[]);

  const parsedEntries = await Promise.all(
    directoryEntries.map(async (directoryEntry) => {
      const entryPath = path.join(basePath, directoryEntry.name);
      const relativePath = relativeRoot ? path.join(relativeRoot, directoryEntry.name) : directoryEntry.name;

      if (directoryEntry.isDirectory()) {
        return readMdxFiles(entryPath, relativePath);
      }

      if (!directoryEntry.name.endsWith('.mdx')) {
        return [] as FsContentEntry[];
      }

      const source = await fs.readFile(entryPath, 'utf8');
      const parsedMatter = matter(source);
      const data = parsedMatter.data as Record<string, unknown>;
      const slug = typeof data.slug === 'string' ? data.slug : directoryEntry.name.replace(/\.mdx$/, '');

      return [
        {
          id: typeof data.id === 'string' ? data.id : slug,
          slug,
          name: typeof data.name === 'string' ? data.name : slug,
          summary: typeof data.summary === 'string' ? data.summary : '',
          body: parsedMatter.content.trim(),
          status: (data.status === 'published' ? 'published' : 'draft') as 'draft' | 'published',
          relativePath,
          pathSegments: relativePath.split(path.sep).filter(Boolean),
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
          categoryIds: toArray(data.categoryIds),
          vendorIds: toArray(data.vendorIds).length ? toArray(data.vendorIds) : toArray(data.partnerIds),
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
          productUrl: typeof data.productUrl === 'string' ? data.productUrl : undefined,
        },
      ];
    })
  );

  return parsedEntries.flat();
}

export async function loadContentEntries(folderName: string): Promise<FsContentEntry[]> {
  const folderPath = path.join(process.cwd(), 'content', folderName);
  return readMdxFiles(folderPath, folderName);
}

export async function loadAllContentEntries(): Promise<FsContentEntry[]> {
  return readMdxFiles(path.join(process.cwd(), 'content'));
}

export function isVendorProfileEntry(entry: FsContentEntry): boolean {
  return (
    entry.status === 'published' &&
    entry.pathSegments[0] === 'vendors' &&
    entry.pathSegments.length === 3 &&
    entry.pathSegments[1] === entry.slug &&
    entry.pathSegments[2] === `${entry.slug}.mdx`
  );
}

export function isVendorSolutionEntry(entry: FsContentEntry, vendorSlug?: string): boolean {
  return (
    entry.status === 'published' &&
    entry.pathSegments[0] === 'vendors' &&
    entry.pathSegments.length === 5 &&
    entry.pathSegments[2] === 'solutions' &&
    entry.pathSegments[3] === entry.slug &&
    entry.pathSegments[4] === `${entry.slug}.mdx` &&
    (vendorSlug ? entry.pathSegments[1] === vendorSlug : true)
  );
}
