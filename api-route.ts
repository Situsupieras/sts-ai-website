import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    console.log('Form submission received:', {
      name: body.firstName + ' ' + body.lastName,
      email: body.email,
      company: body.company,
      leadScore: body.leadScore,
      submittedAt: body.submittedAt
    });

    return NextResponse.json({ 
      success: true, 
      message: 'Form submitted successfully',
      leadScore: body.leadScore 
    });

  } catch (error) {
    console.error('Error processing form submission:', error);
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    );
  }
} 