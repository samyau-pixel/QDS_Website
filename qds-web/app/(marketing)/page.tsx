import { Metadata } from 'next';
import SiteHeader from '@/components/layout/site-header';
import SiteFooter from '@/components/layout/site-footer';
import Container from '@/components/layout/container';
import Hero from '@/components/marketing/hero';
import TrustSignals from '@/components/marketing/trust-signals';
import VendorCard from '@/components/marketing/vendor-card';
import CategoryCard from '@/components/marketing/category-card';
import OfferingList from '@/components/marketing/offering-list';
import CtaBand from '@/components/marketing/cta-band';
import ServiceCard from '@/components/marketing/service-card';
import { trackCTAClick } from '@/lib/analytics/events';

export const metadata: Metadata = {
  title: 'Home | Quantum Data Systems',
  description: 'Your Partner in Data Success - Leading provider of data center infrastructure solutions since 1982.',
};

export default function HomePage() {
  const handleCTAClick = (label: string, href: string) => {
    trackCTAClick(label, href);
  };

  // Hero section matching quantum.hk style
  const hero = {
    headline: 'Your Partner in Data Success',
    subheadline: 'Your data. Our Infrastructure.\nTrusted since 1982, we provide innovative data center solutions across the APAC region.',
    primaryCta: {
      label: 'Contact Us',
      href: '/contact',
      style: 'primary',
    },
    secondaryCta: {
      label: 'Our Solutions',
      href: '/categories',
      style: 'secondary',
    },
  };

  // Trust signals from quantum.hk
  const trustSignals = [
    { label: 'Founded', value: '1982' },
    { label: 'Years of Experience', value: '40+' },
    { label: 'Data Centers Served', value: '500+' },
    { label: 'APAC Region Coverage', value: '100%' },
  ];

  // Solutions grid matching quantum.hk
  const featuredCategories = [
    { id: 'aisle-containment', name: 'Aisle Containment', summary: 'Optimize cooling efficiency with professional containment solutions.' },
    { id: 'airflow-management', name: 'Airflow Management', summary: 'Precision airflow solutions to eliminate hot spots.' },
    { id: 'smart-rack', name: 'Smart Rack', summary: 'Intelligent rack solutions with integrated monitoring.' },
    { id: 'power-management', name: 'Power Management', summary: 'Reliable power distribution and monitoring systems.' },
    { id: 'environmental-monitoring', name: 'Environmental Monitoring', summary: 'Real-time monitoring of temperature, humidity, and more.' },
    { id: 'asset-tracking', name: 'Real-Time Asset Tracking', summary: 'Track IT assets with precision and efficiency.' },
    { id: 'remote-access-management', name: 'Remote Access & Management', summary: 'Secure remote access to your data center infrastructure.' },
    { id: 'data-center-infrastructure-management', name: 'Data Center Infrastructure Management', summary: 'Comprehensive DCIM solutions for optimal operations.' },
    { id: 'connectivity-solutions', name: 'Connectivity Solutions', summary: 'Advanced connectivity and cabling solutions.' },
  ];

  // Services section matching quantum.hk
  const services = [
    {
      title: 'Implementation and Deployment',
      description: 'QDS provides on-site installation support for products and solutions. Our services span from basic remote assistance to on-site support and complete turn-key installations.',
    },
    {
      title: 'System Design and Consultation',
      description: 'QDS specialises in System Design and Consultation, offering tailored solutions to meet diverse needs. From conceptualization to implementation, we provide comprehensive support.',
    },
    {
      title: 'Containment Design',
      description: 'For any project, whether it\'s a data centre or cleanroom, the smart design ensures the perfect fit, ultimate protection, and optimised performance.',
    },
    {
      title: 'System Maintenance',
      description: 'QDS is committed to delivering top-tier, comprehensive services. Should you have inquiries regarding support services, please don\'t hesitate to contact us.',
    },
  ];

  return (
    <>
      <SiteHeader />
      <main>
        <Hero
          headline={hero.headline}
          subheadline={hero.subheadline}
          primaryCta={hero.primaryCta}
          secondaryCta={hero.secondaryCta}
        />
        
        <TrustSignals signals={trustSignals} />
        
        {/* Solutions Grid - matching quantum.hk */}
        <section className="py-16 bg-white">
          <Container>
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-slate-900 mb-4">
                Solutions for your Data Center
              </h2>
              <p className="text-slate-600 max-w-2xl mx-auto">
                Comprehensive data center infrastructure solutions to optimize your facility\'s efficiency and reliability.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {featuredCategories.map((category) => (
                <CategoryCard key={category.id} {...category} />
              ))}
            </div>
          </Container>
        </section>

        {/* Services Section - matching quantum.hk */}
        <section className="py-16 bg-slate-50">
          <Container>
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-slate-900 mb-4">
                We provide a huge range of services
              </h2>
              <p className="text-slate-600 max-w-2xl mx-auto">
                From initial consultation to ongoing maintenance, QDS delivers comprehensive support for your data center needs.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {services.map((service, index) => (
                <ServiceCard key={index} title={service.title} description={service.description} />
              ))}
            </div>
          </Container>
        </section>

        {/* CTA Band - matching quantum.hk */}
        <CtaBand
          headline="Let's start working to build a brighter future."
          subheadline="Contact us today to discuss your data center requirements."
          cta={{
            label: 'Contact Us Now',
            href: '/contact',
          }}
        />
      </main>
      <SiteFooter />
    </>
  );

}
