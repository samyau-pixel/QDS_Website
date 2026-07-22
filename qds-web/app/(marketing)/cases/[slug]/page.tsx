import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import SiteHeader from '@/components/layout/site-header';
import SiteFooter from '@/components/layout/site-footer';
import Container from '@/components/layout/container';
import { getCaseBySlug, getCaseSlugs } from '@/lib/content/cases';

export async function generateStaticParams() {
  const slugs = await getCaseSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const caseStudy = await getCaseBySlug(params.slug);
  if (!caseStudy) return { title: 'Case Study' };
  return {
    title: caseStudy.seo?.title ?? `${caseStudy.name} | Case Study`,
    description: caseStudy.seo?.description ?? caseStudy.summary,
  };
}

export default async function CasePage({ params }: { params: { slug: string } }) {
  const caseStudy = await getCaseBySlug(params.slug);
  if (!caseStudy) notFound();

  return (
    <>
      <SiteHeader />
      <main>
        <Container>
          <div className="py-12">
            <h1 className="text-3xl font-bold mb-2">{caseStudy.name}</h1>
            <p className="text-sm text-slate-500 mb-4">{caseStudy.company}</p>
            {caseStudy.solution && <p className="mb-2"><strong>Solution:</strong> {caseStudy.solution}</p>}
            {caseStudy.categories?.length > 0 && (
              <p className="mb-2">
                {caseStudy.categories.map((cat) => (
                  <span key={cat} className="inline-block mr-2 px-2 py-1 bg-slate-100 rounded">{cat}</span>
                ))}
              </p>
            )}
            {caseStudy.target && <p className="mb-4"><strong>Target:</strong> {caseStudy.target}</p>}

            <div className="prose prose-slate max-w-none text-slate-600">
              {caseStudy.body.split('\n\n').map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
          </div>
        </Container>
      </main>
      <SiteFooter />
    </>
  );
}
