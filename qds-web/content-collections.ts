import { defineCollection, defineSchema } from '@content-collections/core';
import { z } from 'zod';

// Shared CTA schema
const callToActionSchema = z.object({
  id: z.string(),
  label: z.string().min(1),
  href: z.string(),
  style: z.enum(['primary', 'secondary', 'text']),
  trackingKey: z.string().optional(),
});

// Site settings schema
const siteSettingsSchema = z.object({
  id: z.literal('site-settings'),
  companyName: z.string().min(1),
  tagline: z.string().min(1),
  primaryNav: z.array(z.object({
    label: z.string(),
    href: z.string(),
  })),
  footerNav: z.array(z.object({
    group: z.string(),
    links: z.array(z.object({
      label: z.string(),
      href: z.string(),
    })),
  })),
  contact: z.object({
    email: z.string().email(),
    phone: z.string().optional(),
    inquiryEndpoint: z.string(),
    address: z.string().optional(),
  }),
  defaultSeo: z.object({
    titleTemplate: z.string(),
    description: z.string(),
    canonicalBaseUrl: z.string().url(),
    ogFallbackImage: z.string().optional(),
  }),
  theme: z.object({
    primaryBlue: z.string(),
    lightBlue: z.string(),
    white: z.string(),
    neutralSupport: z.array(z.string()),
  }),
});

// Home page schema
const homePageSchema = z.object({
  id: z.literal('home-page'),
  hero: z.object({
    headline: z.string().min(1),
    subheadline: z.string(),
    primaryCta: callToActionSchema,
    secondaryCta: callToActionSchema.optional(),
    heroVisual: z.string().optional(),
  }),
  intro: z.string(),
  featuredPartners: z.array(z.string()),
  featuredCategories: z.array(z.string()),
  featuredSolutions: z.array(z.string()),
  trustSignals: z.array(z.object({
    label: z.string(),
    value: z.string(),
  })),
  seo: z.object({
    title: z.string().optional(),
    description: z.string().optional(),
  }).optional(),
});

// Partner schema
const partnerSchema = z.object({
  id: z.string(),
  slug: z.string(),
  name: z.string().min(1),
  summary: z.string().min(1),
  logo: z.string(),
  status: z.enum(['draft', 'published']),
  body: z.string(),
  certifications: z.array(z.string()).optional(),
  relatedCategoryIds: z.array(z.string()).optional(),
  relatedSolutionIds: z.array(z.string()).optional(),
  relatedOfferingIds: z.array(z.string()).optional(),
  seo: z.object({
    title: z.string().optional(),
    description: z.string().optional(),
  }).optional(),
  redirectFrom: z.array(z.string()).optional(),
});

// Category schema
const categorySchema = z.object({
  id: z.string(),
  slug: z.string(),
  name: z.string().min(1),
  summary: z.string().min(1),
  body: z.string(),
  offeringIds: z.array(z.string()).optional(),
  relatedPartnerIds: z.array(z.string()).optional(),
  relatedSolutionIds: z.array(z.string()).optional(),
  seo: z.object({
    title: z.string().optional(),
    description: z.string().optional(),
  }).optional(),
  status: z.enum(['draft', 'published']),
});

// Offering schema
const offeringSchema = z.object({
  id: z.string(),
  slug: z.string(),
  name: z.string().min(1),
  summary: z.string().min(1),
  categoryIds: z.array(z.string()).min(1),
  partnerIds: z.array(z.string()).optional(),
  assetGallery: z.array(z.string()).optional(),
  status: z.enum(['draft', 'published']),
});

// Solution schema
const solutionSchema = z.object({
  id: z.string(),
  slug: z.string(),
  name: z.string().min(1),
  problemStatement: z.string().min(1),
  targetIndustries: z.array(z.string()).optional(),
  outcomes: z.array(z.string()).min(1),
  body: z.string(),
  relatedPartnerIds: z.array(z.string()).optional(),
  relatedCategoryIds: z.array(z.string()).optional(),
  relatedOfferingIds: z.array(z.string()).optional(),
  primaryCta: callToActionSchema,
  seo: z.object({
    title: z.string().optional(),
    description: z.string().optional(),
  }).optional(),
  status: z.enum(['draft', 'published']),
});

// Redirect schema
const redirectSchema = z.object({
  from: z.string(),
  to: z.string(),
  type: z.enum(['permanent', 'temporary']),
});

// Define collections
export const collections = {
  siteSettings: defineCollection({
    name: 'siteSettings',
    directory: 'site',
    schema: siteSettingsSchema,
  }),
  homePage: defineCollection({
    name: 'homePage',
    directory: 'site',
    schema: homePageSchema,
  }),
  partners: defineCollection({
    name: 'partners',
    directory: 'partners',
    schema: partnerSchema,
  }),
  categories: defineCollection({
    name: 'categories',
    directory: 'categories',
    schema: categorySchema,
  }),
  offerings: defineCollection({
    name: 'offerings',
    directory: 'offerings',
    schema: offeringSchema,
  }),
  solutions: defineCollection({
    name: 'solutions',
    directory: 'solutions',
    schema: solutionSchema,
  }),
  redirects: defineCollection({
    name: 'redirects',
    directory: 'shared',
    schema: redirectSchema,
  }),
};

export const schema = defineSchema(collections);
