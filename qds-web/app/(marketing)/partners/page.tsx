import { Metadata } from 'next';
import { redirect } from 'next/navigation';

export const metadata: Metadata = {
  title: 'Vendors | Quantum Data Systems',
  description: 'Explore our vendor network of industry-leading data center infrastructure providers.',
};

export default function PartnersPage() {
  redirect('/vendors');
}
