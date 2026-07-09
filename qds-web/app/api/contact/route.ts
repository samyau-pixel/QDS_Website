import { NextRequest, NextResponse } from 'next/server';
import { validateContactForm, sanitizeInput } from '@/lib/validation/contact-form';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate form data
    const validation = validateContactForm(body);
    
    if (!validation.valid) {
      return NextResponse.json(
        { 
          success: false, 
          errors: validation.errors 
        },
        { status: 400 }
      );
    }

    // Sanitize inputs
    const sanitizedData = {
      name: sanitizeInput(body.name),
      email: sanitizeInput(body.email),
      company: sanitizeInput(body.company),
      message: sanitizeInput(body.message),
      phone: body.phone ? sanitizeInput(body.phone) : undefined,
      inquiryType: body.inquiryType,
    };

    // TODO: Integrate with CRM or email service
    // For now, log the submission
    console.log('Contact form submission:', sanitizedData);

    return NextResponse.json({ 
      success: true, 
      message: 'Thank you for your inquiry. We will contact you soon.' 
    });
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { 
        success: false, 
        message: 'An error occurred. Please try again later.' 
      },
      { status: 500 }
    );
  }
}
