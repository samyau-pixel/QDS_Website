import { Metadata } from 'next';

type MarketingLayoutProps = {
  children: React.ReactNode;
};

export const metadata: Metadata = {
  title: {
    template: '%s | Quantum Data Systems',
    default: 'Quantum Data Systems | Data Center Infrastructure Solutions',
  },
  description: 'Explore our data center infrastructure solutions, partners, and categories to optimize your facility efficiency.',
};

export default function MarketingLayout({ children }: MarketingLayoutProps) {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">{children}</main>
      <footer className="bg-slate-900 text-white py-8 mt-auto">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; {new Date().getFullYear()} Quantum Data Systems. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
