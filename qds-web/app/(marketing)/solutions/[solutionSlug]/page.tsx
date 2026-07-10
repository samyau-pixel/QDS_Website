import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import SiteHeader from '@/components/layout/site-header';
import SiteFooter from '@/components/layout/site-footer';
import Container from '@/components/layout/container';
import Breadcrumbs from '@/components/layout/breadcrumbs';
import SolutionHero from '@/components/marketing/solution-hero';
import SolutionOutcomes from '@/components/marketing/solution-outcomes';
import RelatedContent from '@/components/marketing/related-content';
import OfferingList from '@/components/marketing/offering-list';
import { loadContentEntries } from '@/lib/content/fs-content';

interface SolutionPageProps {
  params: Promise<{ solutionSlug: string }>;
}

export async function generateStaticParams() {
  const solutions = (await loadContentEntries('solutions')).filter((solution) => solution.status === 'published');
  return solutions.map((solution) => ({ solutionSlug: solution.slug }));
}

export async function generateMetadata({ params }: SolutionPageProps): Promise<Metadata> {
  const { solutionSlug } = await params;
  const solution = (await loadContentEntries('solutions')).find((entry) => entry.slug === solutionSlug && entry.status === 'published');

  if (!solution) {
    return { title: 'Solution Not Found | Quantum Data Systems' };
  }

  return {
    title: solution.seo?.title || `${solution.name} | Quantum Data Systems`,
    description: solution.seo?.description || solution.summary,
  };
}

export default async function SolutionDetailPage({ params }: SolutionPageProps) {
  const { solutionSlug } = await params;
  const solutions = (await loadContentEntries('solutions')).filter((entry) => entry.status === 'published');
  const solution = solutions.find((entry) => entry.slug === solutionSlug);

  if (!solution) {
    notFound();
  }

  const partners = (await loadContentEntries('partners')).filter((entry) => solution.relatedPartnerIds.includes(entry.id));
  const categories = (await loadContentEntries('categories')).filter((entry) => solution.relatedCategoryIds?.includes(entry.id));
  const offerings = (await loadContentEntries('offerings')).filter((entry) => solution.relatedOfferingIds?.includes(entry.id));

  const breadcrumbs = [
    { label: 'Home', href: '/' },
    { label: 'Solutions', href: '/solutions' },
    { label: solution.name },
  ];

  return (
    <>
      <SiteHeader />
      <main>
        <SolutionHero title={solution.name} problemStatement={solution.problemStatement || solution.summary} />
        <Container>
          <Breadcrumbs items={breadcrumbs} />
          <section className="py-12">
            <p className="text-slate-600 mb-8 text-lg">{solution.body}</p>
            {solution.outcomes?.length ? <SolutionOutcomes outcomes={solution.outcomes} /> : null}
            <section className="py-12">
              <Container>
                <h2 className="text-2xl font-semibold text-slate-800 mb-6">How It Works</h2>
                <ul className="list-disc list-inside text-slate-600 space-y-2">
                  <li>Initial assessment and site analysis</li>
                  <li>Custom solution design and planning</li>
                  <li>Professional installation and configuration</li>
                  <li>Ongoing monitoring and optimization</li>
                </ul>
              </Container>
            </section>
            <RelatedContent
              title="Related Partners"
              items={partners.map((entry) => ({
                id: entry.slug,
                name: entry.name,
                summary: entry.summary,
                type: 'partner' as const,
              }))}
            />
            <RelatedContent
              title="Related Categories"
              items={categories.map((entry) => ({
                id: entry.slug,
                name: entry.name,
                summary: entry.summary,
                type: 'category' as const,
              }))}
            />
            <OfferingList
              offerings={offerings.map((entry) => ({
                id: entry.slug,
                name: entry.name,
                summary: entry.summary,
              }))}
            />
            <section className="py-12 bg-blue-600 text-white text-center">
              <Container>
                <h2 className="text-2xl font-bold mb-4">Ready to Optimize Your Data Center?</h2>
                <a
                  href={solution.primaryCta?.href || '/contact?inquiryType=sales'}
                  className="inline-block bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
                >
                  {solution.primaryCta?.label || 'Get a Free Assessment'}
                </a>
              </Container>
            </section>
          </section>
        </Container>
      </main>
      <SiteFooter />
    </>
  );
}
