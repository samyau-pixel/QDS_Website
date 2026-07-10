import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Regional CTA variants
const regionalCTAs: Record<string, { label: string; href: string }> = {
  US: { label: 'Contact US Sales', href: '/contact?region=us' },
  EU: { label: 'Contact EU Sales', href: '/contact?region=eu' },
  APAC: { label: 'Contact APAC Sales', href: '/contact?region=apac' },
};

// Campaign source tracking
const campaignSources = ['email', 'social', 'search', 'partner'];

export function proxy(request: NextRequest) {
  const response = NextResponse.next();

  // Regional personalization - add region header based on geo or query
  const region = request.nextUrl.searchParams.get('region') || request.headers.get('x-region') || 'US';

  if (regionalCTAs[region]) {
    response.headers.set('x-regional-cta', JSON.stringify(regionalCTAs[region]));
  }

  // Campaign source tracking
  const source = request.nextUrl.searchParams.get('source');
  if (source && campaignSources.includes(source)) {
    response.cookies.set('campaign_source', source, {
      path: '/',
      maxAge: 60 * 60 * 24 * 30,
    });
  }

  // Legacy redirect handling
  const pathname = request.nextUrl.pathname;
  const legacyPartnerRedirects: Record<string, string> = {
    '/partner/huawei': '/vendors/huawei',
    '/partner/sunbird': '/vendors/sunbird-dcim',
    '/partner/vertiv': '/vendors/vertiv',
    '/partners': '/vendors',
    '/partners/huawei': '/vendors/huawei',
    '/partners/sunbird-dcim': '/vendors/sunbird-dcim',
    '/partners/vertiv': '/vendors/vertiv',
  };

  if (legacyPartnerRedirects[pathname]) {
    return NextResponse.redirect(new URL(legacyPartnerRedirects[pathname], request.url));
  }

  return response;
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)'],
};
