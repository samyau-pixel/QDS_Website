import { Metadata } from 'next';
import SiteHeader from '@/components/layout/site-header';
import SiteFooter from '@/components/layout/site-footer';
import Container from '@/components/layout/container';
import Breadcrumbs from '@/components/layout/breadcrumbs';
import SolutionHero from '@/components/marketing/solution-hero';
import SolutionOutcomes from '@/components/marketing/solution-outcomes';
import RelatedContent from '@/components/marketing/related-content';

export const metadata: Metadata = {
  title: 'Data Center Airflow Optimization | Quantum Data Systems',
  description: 'Transform your data center cooling efficiency with our comprehensive airflow optimization solutions.',
};

export default function SolutionDetailPage({ params }: { params: { solutionSlug: string } }) {
  const solutionId = params.solutionSlug;
  
  // In real implementation, fetch solution data from content collections
  const solution = {
    name: solutionId === 'data-center-airflow-optimization' ? 'Data Center Airflow Optimization' : 'Modular Rack Modernization',
    problemStatement: solutionId === 'data-center-airflow-optimization' 
      ? 'Many data centers struggle with inefficient cooling, hot spots, and rising energy costs due to poor airflow management.'
      : 'Legacy rack infrastructure often lacks the monitoring, power management, and scalability needed for modern data center operations.',
    content: solutionId === 'data-center-airflow-optimization'
      ? `Our comprehensive airflow optimization solutions combine aisle containment,
              precision airflow management, and intelligent monitoring to transform how
              your data center handles cooling. By separating hot and cold air streams
              and directing cooling precisely where it's needed, we help you achieve
              significant energy savings while improving reliability.`
      : `Our modular rack modernization solutions transform legacy infrastructure
              into intelligent, manageable assets. By integrating smart monitoring,
              power management, and access control, we help you achieve better
              operational efficiency and reduce unplanned downtime.`,
    outcomes: solutionId === 'data-center-airflow-optimization'
      ? [
          'Up to 40% reduction in cooling energy costs',
          'Elimination of hot spots and thermal hot zones',
          'Improved equipment reliability and lifespan',
          'Better PUE (Power Usage Effectiveness) scores'
        ]
      : [
          'Real-time visibility into rack-level operations',
          'Improved power efficiency and capacity planning',
          'Enhanced security with integrated access control',
          'Scalable infrastructure that grows with your needs'
        ],
    relatedPartners: [
      { id: 'vertiv', name: 'Vertiv', summary: 'Global leader in critical infrastructure for data centers.', type: 'partner' },
      { id: 'huawei', name: 'Huawei', summary: 'Global leader in ICT infrastructure and smart data center solutions.', type: 'partner' }
    ],
    relatedCategories: [
      { id: 'aisle-containment', name: 'Aisle Containment', summary: 'Optimize cooling efficiency with professional containment solutions.', type: 'category' },
      { id: 'airflow-management', name: 'Airflow Management', summary: 'Precision airflow solutions to eliminate hot spots.', type: 'category' }
    ],
    relatedOfferings: [
      { id: 'koldlok', name: 'KoldLok', summary: 'Advanced cold aisle containment solution', type: 'offering' },
      { id: 'hotlok', name: 'HotLok', summary: 'Hot aisle containment system', type: 'offering' }
    ]
  };

  const breadcrumbs = [
    { label: 'Home', href: '/' },
    { label: 'Solutions', href: '/solutions' },
    { label: solution.name }
  ];
  return (
    <>
      <SiteHeader />
      <main>
        <SolutionHero title={solution.name} problemStatement={solution.problemStatement} />
        <Container>
          <Breadcrumbs items={breadcrumbs} />
          <section className="py-12">
            <p className="text-slate-600 mb-8 text-lg">{solution.content}</p>
            <SolutionOutcomes outcomes={solution.outcomes} />
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
              items={solution.relatedPartners} 
            />
            <RelatedContent 
              title="Related Categories" 
              items={solution.relatedCategories} 
            />
            <RelatedContent 
              title="Related Offerings" 
              items={solution.relatedOfferings} 
            />
            <section className="py-12 bg-blue-600 text-white text-center">
              <Container>
                <h2 className="text-2xl font-bold mb-4">Ready to Optimize Your Data Center?</h2>
                <a 
                  href="/contact?inquiryType=sales" 
                  className="inline-block bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors">
                  Get a Free Assessment
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
