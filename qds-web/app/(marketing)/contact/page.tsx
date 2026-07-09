import { Metadata } from 'next';
import SiteHeader from '@/components/layout/site-header';
import SiteFooter from '@/components/layout/site-footer';
import Container from '@/components/layout/container';
import ContactForm from '@/components/forms/contact-form';

export const metadata: Metadata = {
  title: 'Contact | Quantum Data Systems',
  description: 'Get in touch with our data center infrastructure experts.',
};

export default function ContactPage() {
  return (
    <>
      <SiteHeader />
      <main>
        <section className="bg-slate-50 py-12">
          <Container>
            <h1 className="text-4xl font-bold text-slate-900 mb-4">Contact Us</h1>
            <p className="text-slate-600 max-w-3xl">
              Ready to optimize your data center infrastructure? Our experts are here to help.
            </p>
          </Container>
        </section>
        <Container>
          <section className="py-12 max-w-2xl">
            <ContactForm />
          </section>
        </Container>
      </main>
      <SiteFooter />
    </>
  );
}
