export function getStructuredData(type: string, data: Record<string, unknown>): string {
  return JSON.stringify({
    '@context': 'https://schema.org',
    '@type': type,
    ...data,
  });
}

export function buildOrganizationSchema(
  name: string,
  url: string,
  logo: string
): string {
  return getStructuredData('Organization', {
    name,
    url,
    logo,
    sameAs: [],
  });
}

export function buildBreadcrumbSchema(
  items: Array<{ name: string; url: string }>
): string {
  return getStructuredData('BreadcrumbList', {
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  });
}

export function buildServiceSchema(
  name: string,
  description: string,
  provider: string
): string {
  return getStructuredData('Service', {
    name,
    description,
    provider: {
      '@type': 'Organization',
      name: provider,
    },
  });
}
