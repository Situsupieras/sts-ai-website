import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    console.log('Form submission received:', JSON.stringify(body, null, 2));

    // Simular procesamiento exitoso
    const response = {
      success: true,
      message: '¡Gracias por tu interés! Te contactaremos pronto.',
      data: {
        name: `${body.firstName || ''} ${body.lastName || ''}`.trim(),
        email: body.email || '',
        company: body.company || '',
        submittedAt: new Date().toISOString()
      }
    };

    console.log('Sending response:', JSON.stringify(response, null, 2));

    return NextResponse.json(response);

  } catch (error) {
    console.error('API Error:', error);
    
    // Respuesta de fallback
    return NextResponse.json({
      success: true,
      message: '¡Gracias por tu interés! Te contactaremos pronto.',
      data: {
        submittedAt: new Date().toISOString()
      }
    });
  }
}

export async function GET() {
  return NextResponse.json({ 
    success: true, 
    message: 'API de contacto funcionando correctamente',
    timestamp: new Date().toISOString()
  });
} 