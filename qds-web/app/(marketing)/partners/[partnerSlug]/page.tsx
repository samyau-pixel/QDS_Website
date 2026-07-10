import { Metadata } from 'next';
import { redirect } from 'next/navigation';

interface PartnerPageProps {
  params: Promise<{ partnerSlug: string }>;
}

export async function generateStaticParams() {
  return [];
}

export async function generateMetadata({ params }: PartnerPageProps): Promise<Metadata> {
  const { partnerSlug } = await params;
  return {
    title: `${partnerSlug} | Quantum Data Systems`,
  };
}

export default async function PartnerDetailPage({ params }: PartnerPageProps) {
  const { partnerSlug } = await params;
  redirect(`/vendors/${partnerSlug}`);
}
