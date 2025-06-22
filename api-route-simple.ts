import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    console.log('API called with:', body);

    return NextResponse.json({ 
      success: true, 
      message: 'Form submitted successfully',
      data: body
    });

  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({ 
    success: true, 
    message: 'API is working' 
  });
} 