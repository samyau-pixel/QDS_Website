import { Metadata } from 'next';
import SiteHeader from '@/components/layout/site-header';
import SiteFooter from '@/components/layout/site-footer';
import Container from '@/components/layout/container';
import Breadcrumbs from '@/components/layout/breadcrumbs';
import RelatedContent from '@/components/marketing/related-content';
import OfferingList from '@/components/marketing/offering-list';

export const metadata: Metadata = {
  title: 'Aisle Containment | Quantum Data Systems',
  description: 'Professional aisle containment solutions to optimize data center cooling efficiency.',
};

export default function CategoryDetailPage({ params }: { params: { categorySlug: string } }) {
  const categoryId = params.categorySlug;
  
  // In real implementation, fetch category data from content collections
  const category = {
    name: categoryId === 'aisle-containment' ? 'Aisle Containment' : 
          categoryId === 'airflow-management' ? 'Airflow Management' : 'Smart Rack',
    summary: categoryId === 'aisle-containment' ? 'Optimize cooling efficiency with professional containment solutions.' :
             categoryId === 'airflow-management' ? 'Precision airflow solutions to eliminate hot spots.' :
             'Intelligent rack solutions with integrated monitoring.',
    content: categoryId === 'aisle-containment' ? `Aisle containment is a proven strategy to improve data center cooling efficiency
              by separating hot and cold air streams. Our solutions help reduce energy costs,
              improve cooling capacity, and enhance overall data center reliability.` :
             categoryId === 'airflow-management' ? `Effective airflow management is critical for maintaining optimal data center
              temperatures. Our solutions ensure that cool air reaches your equipment
              efficiently while hot air is properly exhausted.` :
             `Smart rack solutions combine physical infrastructure with intelligent monitoring
              to provide real-time visibility into your data center operations.`,
    offerings: categoryId === 'aisle-containment' ? [
      { id: 'gem2-generation-modular', name: 'GeM2 Generation Modular', summary: 'Next-generation modular aisle containment system' },
      { id: 'aislelok', name: 'AisleLok', summary: 'Premium sliding door aisle containment system' }
    ] : categoryId === 'airflow-management' ? [
      { id: 'koldlok', name: 'KoldLok', summary: 'Advanced cold aisle containment solution' },
      { id: 'hotlok', name: 'HotLok', summary: 'Hot aisle containment system' }
    ] : [
      { id: 'austin-hughes', name: 'Austin Hughes', summary: 'Premium smart rack solutions' }
    ],
    relatedPartners: [
      { id: 'vertiv', name: 'Vertiv', summary: 'Global leader in critical infrastructure for data centers.', type: 'partner' },
      { id: 'huawei', name: 'Huawei', summary: 'Global leader in ICT infrastructure and smart data center solutions.', type: 'partner' }
    ],
    relatedSolutions: [
      { id: 'data-center-airflow-optimization', name: 'Data Center Airflow Optimization', summary: 'Transform your cooling efficiency with comprehensive airflow management.', type: 'solution' }
    ]
  };

  const breadcrumbs = [
    { label: 'Home', href: '/' },
    { label: 'Categories', href: '/categories' },
    { label: category.name }
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
            <p className="text-slate-600 mb-8">{category.content}</p>
            <h2 className="text-2xl font-semibold text-slate-800 mb-4">Key Benefits</h2>
            <ul className="list-disc list-inside text-slate-600 space-y-2 mb-8">
              <li><strong>Energy Efficiency:</strong> Reduce cooling costs by up to 40%</li>
              <li><strong>Improved Capacity:</strong> Increase cooling capacity without additional equipment</li>
              <li><strong>Enhanced Reliability:</strong> Maintain consistent temperatures</li>
              <li><strong>Scalability:</strong> Modular designs that grow with your needs</li>
            </ul>
            <OfferingList offerings={category.offerings} />
            <RelatedContent 
              title="Related Partners" 
              items={category.relatedPartners} 
            />
            <RelatedContent 
              title="Related Solutions" 
              items={category.relatedSolutions} 
            />
          </section>
        </Container>
      </main>
      <SiteFooter />
    </>
  );
}
