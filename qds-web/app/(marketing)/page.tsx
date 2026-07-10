import { Metadata } from 'next';
import SiteHeader from '@/components/layout/site-header';
import SiteFooter from '@/components/layout/site-footer';
import Container from '@/components/layout/container';
import Hero from '@/components/marketing/hero';
import TrustSignals from '@/components/marketing/trust-signals';
import VendorCard from '@/components/marketing/vendor-card';
import CategoryCard from '@/components/marketing/category-card';
import { trackCTAClick } from '@/lib/analytics/events';

export const metadata: Metadata = {
  title: 'Home | Quantum Data Systems',
  description: 'Leading provider of data center infrastructure solutions including aisle containment, airflow management, and smart rack systems.',
};

export default function HomePage() {
  // In a real implementation, this data would come from content collections
  const handleCTAClick = (label: string, href: string) => {
    trackCTAClick(label, href);
  };

  const hero = {
    headline: 'Data Center Infrastructure Solutions That Drive Efficiency',
    subheadline: 'From aisle containment to smart rack systems, we help you optimize every aspect of your data center operations.',
    primaryCta: {
      label: 'Explore Our Solutions',
      href: '/solutions',
      style: 'primary',
    },
    secondaryCta: {
      label: 'View Our Vendors',
      href: '/vendors',
      style: 'secondary',
    },
  };

  const trustSignals = [
    { label: 'Years of Experience', value: '15+' },
    { label: 'Data Centers Optimized', value: '500+' },
    { label: 'Vendor Brands', value: '20+' },
    { label: 'Customer Satisfaction', value: '98%' },
  ];

  const featuredVendors = [
    { id: 'huawei', name: 'Huawei', summary: 'Global leader in ICT infrastructure and smart data center solutions.' },
    { id: 'sunbird-dcim', name: 'Sunbird DCIM', summary: 'Leading DCIM software for data center capacity management.' },
    { id: 'vertiv', name: 'Vertiv', summary: 'Global leader in critical infrastructure for data centers.' },
  ];

  const featuredCategories = [
    { id: 'aisle-containment', name: 'Aisle Containment', summary: 'Optimize cooling efficiency with professional containment solutions.' },
    { id: 'airflow-management', name: 'Airflow Management', summary: 'Precision airflow solutions to eliminate hot spots.' },
    { id: 'smart-rack', name: 'Smart Rack', summary: 'Intelligent rack solutions with integrated monitoring.' },
  ];

  return (
    <>
      <SiteHeader />
      <main>
        <Hero
          headline={hero.headline}
          subheadline={hero.subheadline}
          primaryCta={{...hero.primaryCta, onClick: () => handleCTAClick(hero.primaryCta.label, hero.primaryCta.href)}}
          secondaryCta={hero.secondaryCta ? {...hero.secondaryCta, onClick: () => handleCTAClick(hero.secondaryCta.label, hero.secondaryCta.href)} : undefined}
        />
        <TrustSignals signals={trustSignals} />
        <Container>
          <section className="py-12">
            <h2 className="text-2xl font-bold text-slate-900 mb-4 text-center">
              Welcome to Quantum Data Systems
            </h2>
            <p className="text-slate-600 text-center max-w-3xl mx-auto">
              Quantum Data Systems works with industry-leading vendors to deliver comprehensive
              data center infrastructure solutions. Whether you need to improve airflow
              efficiency, maximize space utilization, or modernize your rack infrastructure,
              we have the expertise and products to help.
            </p>
          </section>
        </Container>
        <section className="py-12">
          <Container>
            <h2 className="text-2xl font-bold text-slate-900 mb-6">Our Vendors</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {featuredVendors.map((vendor) => (
                <VendorCard key={vendor.id} {...vendor} />
              ))}
            </div>
          </Container>
        </section>
        <section className="py-12 bg-slate-50">
          <Container>
            <h2 className="text-2xl font-bold text-slate-900 mb-6">Solution Categories</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {featuredCategories.map((category) => (
                <CategoryCard key={category.id} {...category} />
              ))}
            </div>
          </Container>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
