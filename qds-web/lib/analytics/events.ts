// Analytics event tracking utilities
export interface AnalyticsEvent {
  event: string;
  category: string;
  action: string;
  label?: string;
  value?: number;
}

export function trackEvent(event: AnalyticsEvent): void {
  if (typeof window === 'undefined') return;
  
  // Push to dataLayer if gtag is available
  if ((window as unknown as { gtag?: (event: string, ...args: unknown[]) => void }).gtag) {
    (window as unknown as { gtag: (event: string, ...args: unknown[]) => void }).gtag('event', event.action, {
      event_category: event.category,
      event_label: event.label,
      value: event.value,
    });
  }
}

export function trackPageView(path: string): void {
  if (typeof window === 'undefined') return;
  
  if ((window as unknown as { gtag?: (event: string, ...args: unknown[]) => void }).gtag) {
    (window as unknown as { gtag: (event: string, ...args: unknown[]) => void }).gtag('event', 'page_view', {
      page_path: path,
    });
  }
}

export function trackCTAClick(label: string, href: string): void {
  trackEvent({
    event: 'cta_click',
    category: 'engagement',
    action: 'click',
    label: `${label}:${href}`,
  });
}
