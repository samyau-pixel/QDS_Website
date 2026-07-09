import { z } from 'zod';

// Contact form validation schema
export const contactFormSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  company: z.string().min(2, 'Company name is required'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
  phone: z.string().optional(),
  inquiryType: z.enum(['general', 'sales', 'support', 'partnership']).optional(),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;

// Validate contact form data
export function validateContactForm(data: unknown): {
  valid: boolean;
  errors?: Record<string, string[]>;
} {
  const result = contactFormSchema.safeParse(data);
  
  if (!result.success) {
    return {
      valid: false,
      errors: result.error.flatten().fieldErrors,
    };
  }
  
  return { valid: true };
}

// Sanitize input to prevent XSS
export function sanitizeInput(input: string): string {
  return input
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
