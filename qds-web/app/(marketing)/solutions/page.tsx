import { Metadata } from 'next';
import SiteHeader from '@/components/layout/site-header';
import SiteFooter from '@/components/layout/site-footer';
import Container from '@/components/layout/container';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Solutions | Quantum Data Systems',
  description: 'Discover data center infrastructure solutions tailored to your business needs.',
};

const solutions = [
  { 
    id: 'data-center-airflow-optimization', 
    name: 'Data Center Airflow Optimization', 
    summary: 'Transform your cooling efficiency with comprehensive airflow management.' 
  },
  { 
    id: 'modular-rack-modernization', 
    name: 'Modular Rack Modernization', 
    summary: 'Modernize legacy infrastructure with intelligent monitoring and management.' 
  },
];

export default function SolutionsPage() {
  return (
    <>
      <SiteHeader />
      <main>
        <section className="bg-slate-50 py-12">
          <Container>
            <h1 className="text-4xl font-bold text-slate-900 mb-4">Solutions</h1>
            <p className="text-slate-600 max-w-3xl">
              Our solutions address common data center challenges with proven,
              industry-leading technologies and approaches.
            </p>
          </Container>
        </section>
        <Container>
          <div className="py-12 grid grid-cols-1 md:grid-cols-2 gap-6">
            {solutions.map((solution) => (
              <Link
                key={solution.id}
                href={`/solutions/${solution.id}`}
                className="block p-6 bg-white border border-slate-200 rounded-lg hover:shadow-lg transition-shadow"
              >
                <h2 className="text-xl font-semibold text-slate-900 mb-2">{solution.name}</h2>
                <p className="text-slate-600">{solution.summary}</p>
              </Link>
            ))}
          </div>
        </Container>
      </main>
      <SiteFooter />
    </>
  );
}
