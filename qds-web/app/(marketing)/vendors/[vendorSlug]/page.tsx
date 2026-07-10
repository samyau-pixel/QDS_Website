import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import SiteHeader from '@/components/layout/site-header';
import SiteFooter from '@/components/layout/site-footer';
import Container from '@/components/layout/container';
import Breadcrumbs from '@/components/layout/breadcrumbs';
import OfferingList from '@/components/marketing/offering-list';
import RelatedContent from '@/components/marketing/related-content';
import { loadContentEntries } from '@/lib/content/fs-content';

interface VendorPageProps {
  params: Promise<{ vendorSlug: string }>;
}

export async function generateStaticParams() {
  const entries = await loadContentEntries('vendors');
  return entries
    .filter((entry) => entry.status === 'published' && entry.pathSegments.length === 3 && entry.pathSegments[2] === `${entry.slug}.mdx`)
    .map((vendor) => ({ vendorSlug: vendor.slug }));
}

export async function generateMetadata({ params }: VendorPageProps): Promise<Metadata> {
  const { vendorSlug } = await params;
  const vendor = (await loadContentEntries('vendors')).find((entry) => entry.slug === vendorSlug && entry.pathSegments.length === 3);

  if (!vendor) {
    return { title: 'Vendor Not Found | Quantum Data Systems' };
  }

  return {
    title: vendor.seo?.title || `${vendor.name} | Quantum Data Systems`,
    description: vendor.seo?.description || vendor.summary,
  };
}

export default async function VendorDetailPage({ params }: VendorPageProps) {
  const { vendorSlug } = await params;
  const entries = await loadContentEntries('vendors');
  const vendor = entries.find((entry) => entry.slug === vendorSlug && entry.pathSegments.length === 3);

  if (!vendor) {
    notFound();
  }

  const vendorSolutions = entries.filter(
    (entry) => entry.status === 'published' && entry.pathSegments[0] === 'vendors' && entry.pathSegments[1] === vendorSlug && entry.pathSegments[2] === 'solutions'
  );
  const categories = await loadContentEntries('categories');
  const relatedCategories = categories.filter((entry) => vendor.relatedCategoryIds.includes(entry.id));

  const breadcrumbs = [
    { label: 'Home', href: '/' },
    { label: 'Vendors', href: '/vendors' },
    { label: vendor.name },
  ];

  return (
    <>
      <SiteHeader />
      <main>
        <Container>
          <Breadcrumbs items={breadcrumbs} />
          <section className="py-12">
            <h1 className="text-4xl font-bold text-slate-900 mb-4">{vendor.name}</h1>
            <p className="text-slate-600 mb-8">{vendor.summary}</p>
            <div className="prose prose-slate max-w-none text-slate-600 mb-8">
              {vendor.body.split('\n\n').map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
            {vendor.certifications.length ? (
              <>
                <h2 className="text-2xl font-semibold text-slate-800 mb-4">Certifications</h2>
                <ul className="list-disc list-inside text-slate-600 space-y-2 mb-8">
                  {vendor.certifications.map((certification) => (
                    <li key={certification}>{certification}</li>
                  ))}
                </ul>
              </>
            ) : null}
            {vendorSolutions.length ? <OfferingList offerings={vendorSolutions.map((entry) => ({ id: entry.slug, name: entry.name, summary: entry.summary }))} /> : null}
            <RelatedContent
              title="Related Categories"
              items={relatedCategories.map((entry) => ({
                id: entry.slug,
                name: entry.name,
                summary: entry.summary,
                type: 'category' as const,
              }))}
            />
          </section>
        </Container>
      </main>
      <SiteFooter />
    </>
  );
}