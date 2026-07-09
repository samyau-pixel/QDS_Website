import type { Metadata } from 'next';

interface SEOProps {
  title?: string;
  description?: string;
  canonicalUrl?: string;
  ogImage?: string;
  type?: 'website' | 'article';
}

export function buildMetadata({
  title,
  description,
  canonicalUrl,
  ogImage,
  type = 'website',
}: SEOProps): Metadata {
  const siteTitle = 'Quantum Data Systems';
  const defaultDescription = 'Leading provider of data center infrastructure solutions including aisle containment, airflow management, and smart rack systems.';
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://quantumdatasystems.com';

  return {
    title: title ? `${title} | ${siteTitle}` : siteTitle,
    description: description || defaultDescription,
    alternates: {
      canonical: canonicalUrl || baseUrl,
    },
    openGraph: {
      type,
      title: title || siteTitle,
      description: description || defaultDescription,
      url: canonicalUrl || baseUrl,
      images: ogImage ? [{ url: ogImage }] : undefined,
      siteName: siteTitle,
    },
    twitter: {
      card: 'summary_large_image',
      title: title || siteTitle,
      description: description || defaultDescription,
      images: ogImage ? [ogImage] : undefined,
    },
  };
}

export function buildStructuredData({
  type,
  data,
}: {
  type: 'Organization' | 'BreadcrumbList' | 'Product' | 'Service';
  data: Record<string, unknown>;
}): string {
  return JSON.stringify({
    '@context': 'https://schema.org',
    '@type': type,
    ...data,
  });
}
