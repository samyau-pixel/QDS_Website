import { Metadata } from 'next';
import SiteHeader from '@/components/layout/site-header';
import SiteFooter from '@/components/layout/site-footer';
import Container from '@/components/layout/container';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Categories | Quantum Data Systems',
  description: 'Explore our data center infrastructure solution categories.',
};

const categories = [
  { id: 'aisle-containment', name: 'Aisle Containment', summary: 'Optimize cooling efficiency with professional containment solutions.' },
  { id: 'airflow-management', name: 'Airflow Management', summary: 'Precision airflow solutions to eliminate hot spots.' },
  { id: 'smart-rack', name: 'Smart Rack', summary: 'Intelligent rack solutions with integrated monitoring.' },
];

export default function CategoriesPage() {
  return (
    <>
      <SiteHeader />
      <main>
        <section className="bg-slate-50 py-12">
          <Container>
            <h1 className="text-4xl font-bold text-slate-900 mb-4">Solution Categories</h1>
            <p className="text-slate-600 max-w-3xl">
              Explore our comprehensive range of data center infrastructure solutions
              organized by category.
            </p>
          </Container>
        </section>
        <Container>
          <div className="py-12 grid grid-cols-1 md:grid-cols-3 gap-6">
            {categories.map((category) => (
              <Link
                key={category.id}
                href={`/categories/${category.id}`}
                className="block p-6 bg-white border border-slate-200 rounded-lg hover:shadow-lg transition-shadow"
              >
                <h2 className="text-xl font-semibold text-slate-900 mb-2">{category.name}</h2>
                <p className="text-slate-600">{category.summary}</p>
              </Link>
            ))}
          </div>
        </Container>
      </main>
      <SiteFooter />
    </>
  );
}
