import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import SiteHeader from '@/components/layout/site-header';
import SiteFooter from '@/components/layout/site-footer';
import Container from '@/components/layout/container';
import Breadcrumbs from '@/components/layout/breadcrumbs';
import RelatedContent from '@/components/marketing/related-content';
import OfferingList from '@/components/marketing/offering-list';
import { getCategoryBySlug, getCategorySlugs } from '@/lib/content/categories';
import { loadContentEntries } from '@/lib/content/fs-content';

interface CategoryPageProps {
  params: Promise<{ categorySlug: string }>;
}

export async function generateStaticParams() {
  const slugs = await getCategorySlugs();
  return slugs.map((categorySlug) => ({ categorySlug }));
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { categorySlug } = await params;
  const category = await getCategoryBySlug(categorySlug);

  if (!category) {
    return {
      title: 'Category Not Found | Quantum Data Systems',
    };
  }

  return {
    title: `${category.name} | Quantum Data Systems`,
    description: category.seo?.description || category.summary,
  };
}

export default async function CategoryDetailPage({ params }: CategoryPageProps) {
  const { categorySlug } = await params;
  const category = await getCategoryBySlug(categorySlug);
  const partners = await loadContentEntries('partners');
  const offerings = await loadContentEntries('offerings');
  const solutions = await loadContentEntries('solutions');

  if (!category) {
    notFound();
  }

  const breadcrumbs = [
    { label: 'Home', href: '/' },
    { label: 'Categories', href: '/categories' },
    { label: category.name },
  ];

  return (
    <>
      <SiteHeader />
      <main>
        <Container>
          <Breadcrumbs items={breadcrumbs} />
          <section className="py-12">
            <h1 className="text-4xl font-bold text-slate-900 mb-4">{category.name}</h1>
            <p className="text-slate-600 mb-8">{category.summary}</p>
            <div className="prose prose-slate max-w-none text-slate-600 mb-8">
              {category.body.split('\n\n').map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
            <h2 className="text-2xl font-semibold text-slate-800 mb-4">Key Benefits</h2>
            <ul className="list-disc list-inside text-slate-600 space-y-2 mb-8">
              <li><strong>Energy Efficiency:</strong> Reduce cooling costs by up to 40%</li>
              <li><strong>Improved Capacity:</strong> Increase cooling capacity without additional equipment</li>
              <li><strong>Enhanced Reliability:</strong> Maintain consistent temperatures</li>
              <li><strong>Scalability:</strong> Modular designs that grow with your needs</li>
            </ul>
            <OfferingList
              offerings={category.offeringIds
                .map((id) => offerings.find((offering) => offering.id === id))
                .filter((offering): offering is (typeof offerings)[number] => Boolean(offering))
                .map((offering) => ({
                  id: offering.slug,
                  name: offering.name,
                  summary: offering.summary,
                }))}
            />
            <RelatedContent
              title="Related Partners"
              items={category.relatedPartnerIds
                .map((id) => partners.find((partner) => partner.id === id))
                .filter((partner): partner is (typeof partners)[number] => Boolean(partner))
                .map((partner) => ({
                  id: partner.slug,
                  name: partner.name,
                  summary: partner.summary,
                  type: 'partner' as const,
                }))}
            />
            <RelatedContent
              title="Related Solutions"
              items={category.relatedSolutionIds
                .map((id) => solutions.find((solution) => solution.id === id))
                .filter((solution): solution is (typeof solutions)[number] => Boolean(solution))
                .map((solution) => ({
                  id: solution.slug,
                  name: solution.name,
                  summary: solution.summary,
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
