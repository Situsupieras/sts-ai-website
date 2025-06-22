import { NextRequest, NextResponse } from 'next/server';

// Configuración del webhook - Cambia esta URL por la de tu webhook
const WEBHOOK_URL = process.env.WEBHOOK_URL || 'https://situsupieras.org/n8n/webhook/nuevo-lead-sts-ai';

export async function POST(request: NextRequest) {
  console.log('=== POST REQUEST RECEIVED ===');
  console.log('Request URL:', request.url);
  console.log('Request method:', request.method);
  console.log('Request headers:', Object.fromEntries(request.headers.entries()));
  console.log('WEBHOOK_URL from env:', process.env.WEBHOOK_URL);
  console.log('WEBHOOK_URL final:', WEBHOOK_URL);
  
  try {
    const body = await request.json();
    
    console.log('=== FORM DATA RECEIVED ===');
    console.log('Form submission received:', JSON.stringify(body, null, 2));

    // Determinar el tipo de lead basado en el source
    const isROICalculator = body.source === 'roi-calculator';
    
    // Procesar los datos del formulario en fases
    const processedData = {
      // Información básica
      name: body.name || `${body.firstName || ''} ${body.lastName || ''}`.trim(),
      email: body.email || '',
      phone: body.phone || '',
      company: body.company || '',
      position: body.position || '',
      industry: body.industry || '',
      
      // Información del negocio
      companySize: body.companySize || '',
      annualRevenue: body.annualRevenue || '',
      currentChallenges: body.currentChallenges || [],
      
      // Objetivos y timeline
      primaryGoal: body.primaryGoal || '',
      timeline: body.timeline || '',
      budget: body.budget || '',
      
      // Información adicional
      currentTools: body.currentTools || [],
      teamSize: body.teamSize || '',
      decisionMaker: body.decisionMaker || false,
      
      // Lead scoring
      leadScore: body.leadScore || 0,
      urgency: body.urgency || '',
      authority: body.authority || '',
      need: body.need || '',
      
      // Datos específicos de ROI Calculator
      roiCalculatorData: isROICalculator ? {
        industry: body.industry || '',
        calculatedROI: body.roi || 0,
        formData: body.formData || {},
        reportDownloaded: true,
        calculatorUsed: true
      } : null,
      
      // Metadata
      submittedAt: body.submittedAt || new Date().toISOString(),
      source: body.source || 'landing-page',
      utmSource: body.utmSource || 'direct'
    };

    // Calcular lead score específico para calculadoras de ROI
    if (isROICalculator) {
      let roiScore = 50; // Base score
      
      // Aumentar score basado en el ROI calculado
      if (processedData.roiCalculatorData?.calculatedROI > 200) roiScore += 30;
      else if (processedData.roiCalculatorData?.calculatedROI > 150) roiScore += 20;
      else if (processedData.roiCalculatorData?.calculatedROI > 100) roiScore += 10;
      
      // Aumentar score basado en la industria
      const highValueIndustries = ['manufacturing', 'healthcare', 'logistics'];
      if (highValueIndustries.includes(processedData.roiCalculatorData?.industry)) {
        roiScore += 15;
      }
      
      // Aumentar score si descargó el reporte
      if (processedData.roiCalculatorData?.reportDownloaded) {
        roiScore += 10;
      }
      
      processedData.leadScore = Math.min(roiScore, 100);
      processedData.urgency = 'alta';
      processedData.authority = 'media';
      processedData.need = 'alta';
    }

    console.log('=== PROCESSED DATA ===');
    console.log('Processed data:', JSON.stringify(processedData, null, 2));

    // Enviar datos al webhook externo usando GET con parámetros de consulta
    console.log('=== SENDING TO WEBHOOK ===');
    console.log('Webhook URL:', WEBHOOK_URL);
    
    // Crear parámetros de consulta para el webhook
    const params = new URLSearchParams({
      name: processedData.name,
      email: processedData.email,
      phone: processedData.phone,
      company: processedData.company,
      position: processedData.position,
      industry: processedData.industry,
      companySize: processedData.companySize,
      annualRevenue: processedData.annualRevenue,
      currentChallenges: Array.isArray(processedData.currentChallenges) ? processedData.currentChallenges.join(',') : processedData.currentChallenges,
      primaryGoal: processedData.primaryGoal,
      timeline: processedData.timeline,
      budget: processedData.budget,
      currentTools: Array.isArray(processedData.currentTools) ? processedData.currentTools.join(',') : processedData.currentTools,
      teamSize: processedData.teamSize,
      decisionMaker: processedData.decisionMaker.toString(),
      leadScore: processedData.leadScore.toString(),
      urgency: processedData.urgency,
      authority: processedData.authority,
      need: processedData.need,
      submittedAt: processedData.submittedAt,
      source: processedData.source,
      utmSource: processedData.utmSource,
      webhook_received_at: new Date().toISOString(),
      form_source: isROICalculator ? 'sts-ai-roi-calculator' : 'sts-ai-landing-page'
    });

    // Agregar datos específicos de ROI Calculator si aplica
    if (isROICalculator && processedData.roiCalculatorData) {
      params.append('roi_calculated', processedData.roiCalculatorData.calculatedROI.toString());
      params.append('roi_industry', processedData.roiCalculatorData.industry);
      params.append('report_downloaded', 'true');
      params.append('calculator_used', 'true');
    }

    const webhookUrl = `${WEBHOOK_URL}?${params.toString()}`;
    console.log('Full webhook URL:', webhookUrl);
    
    console.log('=== MAKING WEBHOOK REQUEST ===');
    const webhookResponse = await fetch(webhookUrl, {
      method: 'GET',
    });

    console.log('Webhook response status:', webhookResponse.status);
    console.log('Webhook response headers:', Object.fromEntries(webhookResponse.headers.entries()));
    
    if (!webhookResponse.ok) {
      const errorText = await webhookResponse.text();
      console.error('Webhook error:', errorText);
      throw new Error(`Webhook failed: ${webhookResponse.status}`);
    }

    const webhookData = await webhookResponse.text();
    console.log('Webhook response data:', webhookData);

    // Respuesta exitosa
    const response = {
      success: true,
      message: isROICalculator 
        ? '¡Gracias por usar nuestra calculadora! Tu reporte ha sido enviado y te contactaremos pronto.'
        : '¡Gracias por tu interés! Te contactaremos pronto.',
      data: processedData,
      leadScore: processedData.leadScore,
      priority: processedData.leadScore >= 80 ? 'alta' : 
                processedData.leadScore >= 60 ? 'media' : 'baja',
      webhook_sent: true,
      webhook_status: webhookResponse.status,
      isROICalculator
    };

    console.log('=== SENDING RESPONSE TO CLIENT ===');
    console.log('Response:', JSON.stringify(response, null, 2));

    return NextResponse.json(response);

  } catch (error) {
    console.error('=== API ERROR ===');
    console.error('Error details:', error);
    console.error('Error message:', error instanceof Error ? error.message : 'Unknown error');
    console.error('Error stack:', error instanceof Error ? error.stack : 'No stack trace');
    
    // Respuesta de fallback - aún enviamos respuesta exitosa al usuario
    return NextResponse.json({
      success: true,
      message: '¡Gracias por tu interés! Te contactaremos pronto.',
      data: {
        submittedAt: new Date().toISOString()
      },
      webhook_sent: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}

export async function GET() {
  return NextResponse.json({ 
    success: true, 
    message: 'API de contacto funcionando correctamente',
    webhook_url: WEBHOOK_URL,
    webhook_url_env: process.env.WEBHOOK_URL,
    timestamp: new Date().toISOString()
  });
} 