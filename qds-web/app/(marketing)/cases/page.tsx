import { Metadata } from 'next';
import SiteHeader from '@/components/layout/site-header';
import SiteFooter from '@/components/layout/site-footer';
import Container from '@/components/layout/container';
import CaseCard from '@/components/marketing/case-card';
import { getPublishedCases } from '@/lib/content/cases';

export const metadata: Metadata = {
  title: 'Case Studies | Quantum Data Systems',
  description: 'Browse case studies and customer success stories.',
};

export default async function CasesPage() {
  const cases = await getPublishedCases();

  return (
    <>
      <SiteHeader />
      <main>
        <section className="bg-slate-50 py-12">
          <Container>
            <h1 className="text-4xl font-bold text-slate-900 mb-4">Case Studies</h1>
            <p className="text-slate-600 max-w-3xl mb-6">Read customer success stories and implementations.</p>
          </Container>
        </section>
        <Container>
          <div className="py-12 grid grid-cols-1 md:grid-cols-3 gap-6">
            {cases.map((c) => (
              <CaseCard key={c.slug} slug={c.slug} name={c.name} company={c.company} summary={c.summary} />
            ))}
          </div>
        </Container>
      </main>
      <SiteFooter />
    </>
  );
}
