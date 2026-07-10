import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import SiteHeader from '@/components/layout/site-header';
import SiteFooter from '@/components/layout/site-footer';
import Container from '@/components/layout/container';
import Breadcrumbs from '@/components/layout/breadcrumbs';
import RelatedContent from '@/components/marketing/related-content';
import { loadContentEntries } from '@/lib/content/fs-content';

interface PartnerPageProps {
  params: Promise<{ partnerSlug: string }>;
}

export async function generateStaticParams() {
  const partners = (await loadContentEntries('partners')).filter((partner) => partner.status === 'published');
  return partners.map((partner) => ({ partnerSlug: partner.slug }));
}

export async function generateMetadata({ params }: PartnerPageProps): Promise<Metadata> {
  const { partnerSlug } = await params;
  const partner = (await loadContentEntries('partners')).find((entry) => entry.slug === partnerSlug && entry.status === 'published');

  if (!partner) {
    return { title: 'Partner Not Found | Quantum Data Systems' };
  }

  return {
    title: partner.seo?.title || `${partner.name} | Quantum Data Systems`,
    description: partner.seo?.description || partner.summary,
  };
}

export default async function PartnerDetailPage({ params }: PartnerPageProps) {
  const { partnerSlug } = await params;
  const partners = (await loadContentEntries('partners')).filter((entry) => entry.status === 'published');
  const partner = partners.find((entry) => entry.slug === partnerSlug);

  if (!partner) {
    notFound();
  }

  const offerings = (await loadContentEntries('offerings')).filter((entry) => partner.relatedOfferingIds?.includes(entry.id));
  const categories = (await loadContentEntries('categories')).filter((entry) => partner.relatedCategoryIds?.includes(entry.id));
  const solutions = (await loadContentEntries('solutions')).filter((entry) => partner.relatedSolutionIds.includes(entry.id));

  const breadcrumbs = [
    { label: 'Home', href: '/' },
    { label: 'Partners', href: '/partners' },
    { label: partner.name },
  ];

  return (
    <>
      <SiteHeader />
      <main>
        <Container>
          <Breadcrumbs items={breadcrumbs} />
          <section className="py-12">
            <h1 className="text-4xl font-bold text-slate-900 mb-4">{partner.name}</h1>
            <p className="text-slate-600 mb-8">{partner.summary}</p>
            <div className="prose prose-slate max-w-none text-slate-600 mb-8">
              {partner.body.split('\n\n').map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
            {partner.certifications?.length ? (
              <>
                <h2 className="text-2xl font-semibold text-slate-800 mb-4">Certifications</h2>
                <ul className="list-disc list-inside text-slate-600 space-y-2 mb-8">
                  {partner.certifications.map((certification) => (
                    <li key={certification}>{certification}</li>
                  ))}
                </ul>
              </>
            ) : null}
            {offerings.length ? (
              <>
                <h2 className="text-2xl font-semibold text-slate-800 mb-4">Key Offerings</h2>
                <ul className="list-disc list-inside text-slate-600 space-y-2 mb-8">
                  {offerings.map((offering) => (
                    <li key={offering.id}>
                      <strong>{offering.name}:</strong> {offering.summary}
                    </li>
                  ))}
                </ul>
              </>
            ) : null}
            <RelatedContent
              title="Related Categories"
              items={categories.map((entry) => ({
                id: entry.slug,
                name: entry.name,
                summary: entry.summary,
                type: 'category' as const,
              }))}
            />
            <RelatedContent
              title="Related Solutions"
              items={solutions.map((entry) => ({
                id: entry.slug,
                name: entry.name,
                summary: entry.summary,
                type: 'solution' as const,
              }))}
            />
          </section>
        </Container>
      </main>
      <SiteFooter />
    </>
  );
}
