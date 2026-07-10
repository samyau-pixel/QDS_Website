import { Metadata } from 'next';
import SiteHeader from '@/components/layout/site-header';
import SiteFooter from '@/components/layout/site-footer';
import Container from '@/components/layout/container';
import Link from 'next/link';
import { loadContentEntries } from '@/lib/content/fs-content';

export const metadata: Metadata = {
  title: 'Partners | Quantum Data Systems',
  description: 'Explore our partner network of industry-leading data center infrastructure providers.',
};

export default async function PartnersPage() {
  const partners = (await loadContentEntries('partners')).filter((partner) => partner.status === 'published');

  return (
    <>
      <SiteHeader />
      <main>
        <section className="bg-slate-50 py-12">
          <Container>
            <h1 className="text-4xl font-bold text-slate-900 mb-4">Our Partners</h1>
            <p className="text-slate-600 max-w-3xl">
              We partner with industry-leading providers to deliver comprehensive data center
              infrastructure solutions that meet your unique needs.
            </p>
          </Container>
        </section>
        <Container>
          <div className="py-12 grid grid-cols-1 md:grid-cols-3 gap-6">
            {partners.map((partner) => (
              <Link
                key={partner.slug}
                href={`/partners/${partner.slug}`}
                className="block p-6 bg-white border border-slate-200 rounded-lg hover:shadow-lg transition-shadow"
              >
                <h2 className="text-xl font-semibold text-slate-900 mb-2">{partner.name}</h2>
                <p className="text-slate-600">{partner.summary}</p>
              </Link>
            ))}
          </div>
        </Container>
      </main>
      <SiteFooter />
    </>
  );
}
