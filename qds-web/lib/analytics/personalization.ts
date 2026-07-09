export function trackPersonalizationVariant(variant: string, region: string): void {
  if (typeof window === 'undefined') return;
  
  if ((window as unknown as { gtag?: (event: string, ...args: unknown[]) => void }).gtag) {
    (window as unknown as { gtag: (event: string, ...args: unknown[]) => void }).gtag('event', 'personalization_view', {
      event_category: 'personalization',
      event_label: `${variant}:${region}`,
    });
  }
}
