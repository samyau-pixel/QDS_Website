import { Metadata } from 'next';
import SiteHeader from '@/components/layout/site-header';
import SiteFooter from '@/components/layout/site-footer';
import Container from '@/components/layout/container';
import Breadcrumbs from '@/components/layout/breadcrumbs';
import RelatedContent from '@/components/marketing/related-content';

export const metadata: Metadata = {
  title: 'Huawei | Quantum Data Systems',
  description: 'Huawei provides cutting-edge ICT infrastructure and smart data center solutions.',
};

export default function PartnerDetailPage({ params }: { params: { partnerSlug: string } }) {
  const partnerId = params.partnerSlug;
  
  // In real implementation, fetch partner data from content collections
  const partner = {
    name: partnerId === 'huawei' ? 'Huawei' : partnerId === 'sunbird-dcim' ? 'Sunbird DCIM' : 'Vertiv',
    summary: partnerId === 'huawei' ? 'Global leader in ICT infrastructure and smart data center solutions.' : 
             partnerId === 'sunbird-dcim' ? 'Leading DCIM software for data center capacity management.' :
             'Global leader in critical infrastructure for data centers.',
    content: partnerId === 'huawei' ? `Huawei is a global leader in ICT infrastructure, offering comprehensive smart
              data center solutions that help organizations achieve higher efficiency,
              reliability, and sustainability.` :
             partnerId === 'sunbird-dcim' ? `Sunbird DCIM is a leading provider of Data Center Infrastructure Management
              (DCIM) software, helping organizations optimize capacity, improve efficiency,
              and reduce downtime.` :
             `Vertiv is a global leader in critical infrastructure for data centers,
              communication networks, and commercial and industrial facilities.`,
    offerings: partnerId === 'huawei' ? [
      { id: 'fusionmodule', name: 'FusionModule', summary: 'Prefabricated modular data center solutions' },
      { id: 'smartli', name: 'SmartLi', summary: 'Smart lithium battery UPS systems' }
    ] : partnerId === 'sunbird-dcim' ? [
      { id: 'dcpowerdc', name: 'dCPowerDC', summary: 'Power management and capacity planning' },
      { id: 'imonium', name: 'iMonium', summary: 'Real-time monitoring and alerting' }
    ] : [
      { id: 'liebert-crac', name: 'Liebert CRAC', summary: 'Precision cooling systems' },
      { id: 'smartslot', name: 'SmartSlot', summary: 'Modular UPS systems' }
    ],
    relatedCategories: [
      { id: 'smart-rack', name: 'Smart Rack', summary: 'Intelligent rack solutions with integrated monitoring.', type: 'category' },
      { id: 'airflow-management', name: 'Airflow Management', summary: 'Precision airflow solutions to eliminate hot spots.', type: 'category' }
    ],
    relatedSolutions: [
      { id: 'data-center-airflow-optimization', name: 'Data Center Airflow Optimization', summary: 'Transform your cooling efficiency with comprehensive airflow management.', type: 'solution' }
    ]
  };

  const breadcrumbs = [
    { label: 'Home', href: '/' },
    { label: 'Partners', href: '/partners' },
    { label: partner.name }
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
            <p className="text-slate-600 mb-8">{partner.content}</p>
            <h2 className="text-2xl font-semibold text-slate-800 mb-4">Key Offerings</h2>
            <ul className="list-disc list-inside text-slate-600 space-y-2 mb-8">
              {partner.offerings.map((offering) => (
                <li key={offering.id}>
                  <strong>{offering.name}:</strong> {offering.summary}
                </li>
              ))}
            </ul>
            <RelatedContent 
              title="Related Categories" 
              items={partner.relatedCategories} 
            />
            <RelatedContent 
              title="Related Solutions" 
              items={partner.relatedSolutions} 
            />
          </section>
        </Container>
      </main>
      <SiteFooter />
    </>
  );
}
