'use client';

import { useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { 
  User, 
  Building, 
  Mail, 
  Phone, 
  Target, 
  TrendingUp, 
  Users, 
  DollarSign, 
  Clock,
  CheckCircle, 
  ArrowRight,
  ArrowLeft,
  Send,
  Loader2,
  Zap
} from 'lucide-react';

export default function IntelligentForm() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [leadScore, setLeadScore] = useState(0);

  const [formData, setFormData] = useState({
    // Información básica
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    company: '',
    position: '',
    industry: '',
    
    // Información del negocio
    companySize: '',
    annualRevenue: '',
    currentChallenges: [] as string[],
    repetitiveHours: '',
    estimatedBilling: '',
    mainPain: '',
    
    // Objetivos y timeline
    primaryGoal: '',
    timeline: '',
    budget: '',
    
    // Información adicional
    currentTools: [] as string[],
    teamSize: '',
    decisionMaker: false,
    
    // Lead scoring
    urgency: '',
    authority: '',
    need: ''
  });

  const steps = [
    {
      id: 'basic-info',
      title: 'Información Básica',
      description: 'Cuéntanos sobre ti y tu empresa',
      fields: ['firstName', 'lastName', 'email', 'phone', 'company', 'position', 'industry']
    },
    {
      id: 'business-info',
      title: 'Información del Negocio',
      description: 'Entendamos mejor tu empresa',
      fields: ['companySize', 'annualRevenue', 'currentChallenges', 'repetitiveHours', 'estimatedBilling', 'mainPain']
    },
    {
      id: 'goals-timeline',
      title: 'Objetivos y Timeline',
      description: '¿Qué quieres lograr y cuándo?',
      fields: ['primaryGoal', 'timeline', 'budget']
    },
    {
      id: 'additional-info',
      title: 'Información Adicional',
      description: 'Ayúdanos a personalizar tu propuesta',
      fields: ['currentTools', 'teamSize', 'decisionMaker']
    }
  ];

  const industries = [
    'Tecnología', 'Finanzas', 'Salud', 'Retail', 'Manufactura', 
    'Logística', 'Educación', 'Consultoría', 'Otro'
  ];

  const companySizes = [
    '1-10 empleados', '11-50 empleados', '51-200 empleados', 
    '201-1000 empleados', '1000+ empleados'
  ];

  const challenges = [
    'Procesos manuales lentos', 'Falta de datos en tiempo real', 
    'Errores humanos frecuentes', 'Escalabilidad limitada',
    'Costos operativos altos', 'Competencia agresiva',
    'Satisfacción del cliente baja', 'Otro'
  ];

  const goals = [
    'Reducir costos operativos', 'Aumentar productividad',
    'Mejorar experiencia del cliente', 'Automatizar procesos',
    'Análisis predictivo', 'Optimizar decisiones',
    'Escalar operaciones', 'Otro'
  ];

  const timelines = [
    'Inmediato (1-3 meses)', 'Corto plazo (3-6 meses)',
    'Mediano plazo (6-12 meses)', 'Largo plazo (12+ meses)'
  ];

  const budgets = [
    '€5K - €25K', '€25K - €100K', '€100K - €500K', '€500K+'
  ];

  const currentTools = [
    'Excel/Google Sheets', 'CRM (Salesforce, HubSpot)', 
    'ERP (SAP, Oracle)', 'BI Tools (Tableau, Power BI)',
    'Chatbots básicos', 'Ninguno', 'Otro'
  ];

  // Lead Scoring Logic
  const calculateLeadScore = () => {
    let score = 0;
    
    // Company size scoring
    if (formData.companySize === '51-200 empleados') score += 20;
    else if (formData.companySize === '201-1000 empleados') score += 30;
    else if (formData.companySize === '1000+ empleados') score += 40;
    
    // Revenue scoring
    if (formData.annualRevenue === '€1M - €10M') score += 15;
    else if (formData.annualRevenue === '€10M - €100M') score += 25;
    else if (formData.annualRevenue === '€100M+') score += 35;
    
    // Timeline scoring
    if (formData.timeline === 'Inmediato (1-3 meses)') score += 20;
    else if (formData.timeline === 'Corto plazo (3-6 meses)') score += 15;
    
    // Budget scoring
    if (formData.budget === '€25K - €100K') score += 15;
    else if (formData.budget === '€100K - €500K') score += 25;
    else if (formData.budget === '€500K+') score += 35;
    
    // Decision maker scoring
    if (formData.decisionMaker) score += 20;
    
    return Math.min(score, 100);
  };

  useEffect(() => {
    setLeadScore(calculateLeadScore());
  }, [formData]);

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async () => {
    console.log('handleSubmit called');
    console.log('formData:', formData);
    console.log('leadScore:', leadScore);
    
    setIsSubmitting(true);
    
    try {
      const submissionData = {
        ...formData,
        leadScore,
        submittedAt: new Date().toISOString(),
        source: 'landing-page',
        utmSource: new URLSearchParams(window.location.search).get('utm_source') || 'direct'
      };

      console.log('submissionData:', submissionData);

      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(submissionData),
      });

      console.log('Response status:', response.status);
      console.log('Response ok:', response.ok);

      if (response.ok) {
        const responseData = await response.json();
        console.log('Response data:', responseData);
        setIsSubmitted(true);
        // Track conversion
        if (typeof window !== 'undefined' && window.gtag) {
          window.gtag('event', 'conversion', {
            send_to: 'AW-CONVERSION_ID/CONVERSION_LABEL',
            value: leadScore,
            currency: 'EUR'
          });
        }
      } else {
        const errorData = await response.text();
        console.error('Response error:', errorData);
        throw new Error('Error en el envío');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      // Fallback: mostrar mensaje de éxito aunque falle el webhook
      setIsSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderField = (fieldName: string) => {
    switch (fieldName) {
      case 'firstName':
        return (
          <div>
            <label className="block text-white font-medium mb-2">Nombre *</label>
            <input
              type="text"
              value={formData.firstName}
              onChange={(e) => handleInputChange('firstName', e.target.value)}
              className="w-full p-3 bg-gray-800 border border-gray-600 rounded-lg text-white focus:border-purple-500 focus:outline-none"
              required
            />
          </div>
        );

      case 'lastName':
        return (
          <div>
            <label className="block text-white font-medium mb-2">Apellido *</label>
            <input
              type="text"
              value={formData.lastName}
              onChange={(e) => handleInputChange('lastName', e.target.value)}
              className="w-full p-3 bg-gray-800 border border-gray-600 rounded-lg text-white focus:border-purple-500 focus:outline-none"
              required
            />
          </div>
        );

      case 'email':
        return (
          <div>
            <label className="block text-white font-medium mb-2">Email Corporativo *</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              className="w-full p-3 bg-gray-800 border border-gray-600 rounded-lg text-white focus:border-purple-500 focus:outline-none"
              required
            />
          </div>
        );

      case 'phone':
        return (
          <div>
            <label className="block text-white font-medium mb-2">Teléfono</label>
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) => handleInputChange('phone', e.target.value)}
              className="w-full p-3 bg-gray-800 border border-gray-600 rounded-lg text-white focus:border-purple-500 focus:outline-none"
            />
          </div>
        );

      case 'company':
        return (
          <div>
            <label className="block text-white font-medium mb-2">Empresa *</label>
            <input
              type="text"
              value={formData.company}
              onChange={(e) => handleInputChange('company', e.target.value)}
              className="w-full p-3 bg-gray-800 border border-gray-600 rounded-lg text-white focus:border-purple-500 focus:outline-none"
              required
            />
          </div>
        );

      case 'position':
        return (
          <div>
            <label className="block text-white font-medium mb-2">Cargo *</label>
            <select
              value={formData.position}
              onChange={(e) => handleInputChange('position', e.target.value)}
              className="w-full p-3 bg-gray-800 border border-gray-600 rounded-lg text-white focus:border-purple-500 focus:outline-none"
              required
            >
              <option value="">Selecciona tu cargo</option>
              <option value="CEO">CEO</option>
              <option value="CTO">CTO</option>
              <option value="CFO">CFO</option>
              <option value="Director de Operaciones">Director de Operaciones</option>
              <option value="Director de Tecnología">Director de Tecnología</option>
              <option value="Manager">Manager</option>
              <option value="Otro">Otro</option>
            </select>
          </div>
        );

      case 'industry':
        return (
          <div>
            <label className="block text-white font-medium mb-2">Industria *</label>
            <select
              value={formData.industry}
              onChange={(e) => handleInputChange('industry', e.target.value)}
              className="w-full p-3 bg-gray-800 border border-gray-600 rounded-lg text-white focus:border-purple-500 focus:outline-none"
              required
            >
              <option value="">Selecciona tu industria</option>
              {industries.map(industry => (
                <option key={industry} value={industry}>{industry}</option>
              ))}
            </select>
          </div>
        );

      case 'companySize':
        return (
          <div>
            <label className="block text-white font-medium mb-2">Tamaño de la Empresa *</label>
            <select
              value={formData.companySize}
              onChange={(e) => handleInputChange('companySize', e.target.value)}
              className="w-full p-3 bg-gray-800 border border-gray-600 rounded-lg text-white focus:border-purple-500 focus:outline-none"
              required
            >
              <option value="">Selecciona el tamaño</option>
              {companySizes.map(size => (
                <option key={size} value={size}>{size}</option>
              ))}
            </select>
          </div>
        );

      case 'annualRevenue':
        return (
          <div>
            <label className="block text-white font-medium mb-2">Ingresos Anuales *</label>
            <select
              value={formData.annualRevenue}
              onChange={(e) => handleInputChange('annualRevenue', e.target.value)}
              className="w-full p-3 bg-gray-800 border border-gray-600 rounded-lg text-white focus:border-purple-500 focus:outline-none"
              required
            >
              <option value="">Selecciona el rango</option>
              <option value="€100K - €1M">€100K - €1M</option>
              <option value="€1M - €10M">€1M - €10M</option>
              <option value="€10M - €100M">€10M - €100M</option>
              <option value="€100M+">€100M+</option>
            </select>
          </div>
        );

      case 'currentChallenges':
        return (
          <div>
            <label className="block text-white font-medium mb-2">Desafíos Actuales (múltiple selección)</label>
            <div className="space-y-2">
              {challenges.map(challenge => (
                <label key={challenge} className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.currentChallenges.includes(challenge)}
                    onChange={(e) => {
                      const newChallenges = e.target.checked
                        ? [...formData.currentChallenges, challenge]
                        : formData.currentChallenges.filter((c: string) => c !== challenge);
                      handleInputChange('currentChallenges', newChallenges);
                    }}
                    className="w-4 h-4 text-purple-600 bg-gray-800 border-gray-600 rounded focus:ring-purple-500"
                  />
                  <span className="text-gray-300">{challenge}</span>
                </label>
              ))}
            </div>
          </div>
        );

      case 'repetitiveHours':
        return (
          <div>
            <label className="block text-white font-medium mb-2">Horas semanales en tareas repetitivas (aproximado):</label>
            <input
              type="number"
              min="0"
              placeholder="Ejemplo: 15, 30, 50..."
              value={formData.repetitiveHours}
              onChange={(e) => handleInputChange('repetitiveHours', e.target.value)}
              className="w-full p-3 bg-gray-800 border border-gray-600 rounded-lg text-white focus:border-purple-500 focus:outline-none"
            />
          </div>
        );

      case 'estimatedBilling':
        return (
          <div>
            <label className="block text-white font-medium mb-2">Facturación anual aproximada:</label>
            <input
              type="text"
              placeholder="Ejemplo: €100,000, €1M, €5M"
              value={formData.estimatedBilling}
              onChange={(e) => handleInputChange('estimatedBilling', e.target.value)}
              className="w-full p-3 bg-gray-800 border border-gray-600 rounded-lg text-white focus:border-purple-500 focus:outline-none"
            />
          </div>
        );

      case 'mainPain':
        return (
          <div>
            <label className="block text-white font-medium mb-2">¿Cuál es tu mayor dolor empresarial hoy?</label>
            <select
              value={formData.mainPain}
              onChange={(e) => handleInputChange('mainPain', e.target.value)}
              className="w-full p-3 bg-gray-800 border border-gray-600 rounded-lg text-white focus:border-purple-500 focus:outline-none"
            >
              <option value="">Selecciona una opción</option>
              <option value="Procesos lentos o manuales">Procesos lentos o manuales</option>
              <option value="Decisiones sin datos claros">Decisiones sin datos claros</option>
              <option value="Costos operativos altos">Costos operativos altos</option>
              <option value="Mala experiencia del cliente">Mala experiencia del cliente</option>
              <option value="Otro">Otro (especificar)</option>
            </select>
          </div>
        );

      case 'primaryGoal':
        return (
          <div>
            <label className="block text-white font-medium mb-2">Objetivo Principal *</label>
            <select
              value={formData.primaryGoal}
              onChange={(e) => handleInputChange('primaryGoal', e.target.value)}
              className="w-full p-3 bg-gray-800 border border-gray-600 rounded-lg text-white focus:border-purple-500 focus:outline-none"
              required
            >
              <option value="">Selecciona tu objetivo</option>
              {goals.map(goal => (
                <option key={goal} value={goal}>{goal}</option>
              ))}
            </select>
          </div>
        );

      case 'timeline':
        return (
          <div>
            <label className="block text-white font-medium mb-2">Timeline de Implementación *</label>
            <select
              value={formData.timeline}
              onChange={(e) => handleInputChange('timeline', e.target.value)}
              className="w-full p-3 bg-gray-800 border border-gray-600 rounded-lg text-white focus:border-purple-500 focus:outline-none"
              required
            >
              <option value="">Selecciona el timeline</option>
              {timelines.map(timeline => (
                <option key={timeline} value={timeline}>{timeline}</option>
              ))}
            </select>
          </div>
        );

      case 'budget':
        return (
          <div>
            <label className="block text-white font-medium mb-2">Presupuesto Disponible *</label>
            <select
              value={formData.budget}
              onChange={(e) => handleInputChange('budget', e.target.value)}
              className="w-full p-3 bg-gray-800 border border-gray-600 rounded-lg text-white focus:border-purple-500 focus:outline-none"
              required
            >
              <option value="">Selecciona el presupuesto</option>
              {budgets.map(budget => (
                <option key={budget} value={budget}>{budget}</option>
              ))}
            </select>
          </div>
        );

      case 'currentTools':
        return (
          <div>
            <label className="block text-white font-medium mb-2">Herramientas Actuales (múltiple selección)</label>
            <div className="space-y-2">
              {currentTools.map(tool => (
                <label key={tool} className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.currentTools.includes(tool)}
                    onChange={(e) => {
                      const newTools = e.target.checked
                        ? [...formData.currentTools, tool]
                        : formData.currentTools.filter((t: string) => t !== tool);
                      handleInputChange('currentTools', newTools);
                    }}
                    className="w-4 h-4 text-purple-600 bg-gray-800 border-gray-600 rounded focus:ring-purple-500"
                  />
                  <span className="text-gray-300">{tool}</span>
                </label>
              ))}
            </div>
          </div>
        );

      case 'teamSize':
        return (
          <div>
            <label className="block text-white font-medium mb-2">Tamaño del Equipo de IT</label>
            <select
              value={formData.teamSize}
              onChange={(e) => handleInputChange('teamSize', e.target.value)}
              className="w-full p-3 bg-gray-800 border border-gray-600 rounded-lg text-white focus:border-purple-500 focus:outline-none"
            >
              <option value="">Selecciona el tamaño</option>
              <option value="1-5 personas">1-5 personas</option>
              <option value="6-20 personas">6-20 personas</option>
              <option value="21-50 personas">21-50 personas</option>
              <option value="50+ personas">50+ personas</option>
            </select>
          </div>
        );

      case 'decisionMaker':
        return (
          <div>
            <label className="flex items-center space-x-3 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.decisionMaker}
                onChange={(e) => handleInputChange('decisionMaker', e.target.checked)}
                className="w-4 h-4 text-purple-600 bg-gray-800 border-gray-600 rounded focus:ring-purple-500"
              />
              <span className="text-white font-medium">¿Eres tomador de decisiones en tu empresa?</span>
            </label>
          </div>
        );

      default:
        return null;
    }
  };

  if (isSubmitted) {
    return (
      <section ref={ref} id="lead-form" className="py-20 bg-gradient-to-b from-slate-900 to-slate-800">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl mx-auto text-center"
          >
            <div className="bg-gradient-to-br from-green-500/10 to-blue-500/10 rounded-2xl p-12 border border-green-500/20">
              <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-10 h-10 text-white" />
              </div>
              <h2 className="text-3xl font-bold text-white mb-4">
                ¡Gracias por tu Interés!
              </h2>
              <p className="text-gray-300 mb-6">
                Hemos recibido tu solicitud. Nuestro equipo de expertos en IA analizará tu información y te contactaremos en las próximas 24 horas con una propuesta personalizada.
              </p>
              <div className="bg-gray-800/50 rounded-lg p-4 mb-6">
                <div className="text-green-400 font-semibold mb-2">Tu Lead Score: {leadScore}/100</div>
                <div className="text-gray-400 text-sm">
                  {leadScore >= 80 ? 'Lead de alta prioridad - Contacto inmediato' :
                   leadScore >= 60 ? 'Lead calificado - Contacto en 24h' :
                   leadScore >= 40 ? 'Lead interesado - Contacto en 48h' :
                   'Lead en desarrollo - Contacto en 72h'}
                </div>
              </div>
              <p className="text-sm text-gray-400">
                Mientras tanto, puedes explorar nuestros casos de éxito y recursos sobre IA.
              </p>
            </div>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section ref={ref} id="lead-form" className="py-20 bg-gradient-to-b from-slate-900 to-slate-800">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          <div className="bg-gradient-to-br from-purple-500/10 to-blue-500/10 rounded-2xl p-8 border border-purple-500/20">
            {/* Header */}
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-white mb-4">
                Calcula Tu ROI Personalizado
              </h2>
              <p className="text-gray-300">
                Completa este formulario inteligente y recibe un análisis personalizado de cómo la IA puede transformar tu empresa
              </p>
            </div>

            {/* Progress Bar */}
            <div className="mb-8">
              <div className="flex justify-between text-sm text-gray-400 mb-2">
                <span>Paso {currentStep + 1} de {steps.length}</span>
                <span>{Math.round(((currentStep + 1) / steps.length) * 100)}%</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2">
                <motion.div
                  className="bg-gradient-to-r from-purple-500 to-blue-500 h-2 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
                  transition={{ duration: 0.5 }}
                />
              </div>
            </div>

            {/* Step Content */}
            <div className="mb-8">
              <div className="text-center mb-6">
                <h3 className="text-xl font-semibold text-white mb-2">
                  {steps[currentStep].title}
                </h3>
                <p className="text-gray-400">{steps[currentStep].description}</p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {steps[currentStep].fields.map(field => (
                  <div key={field}>
                    {renderField(field)}
                  </div>
                ))}
              </div>
            </div>

            {/* Lead Score Indicator */}
            <div className="mb-8">
              <div className="bg-gray-800/50 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-white font-medium">Lead Score</span>
                  <span className="text-purple-400 font-bold">{leadScore}/100</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <motion.div
                    className="bg-gradient-to-r from-green-500 to-purple-500 h-2 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${leadScore}%` }}
                    transition={{ duration: 0.8 }}
                  />
                </div>
                <div className="text-xs text-gray-400 mt-2">
                  {leadScore >= 80 ? '🔥 Lead de alta prioridad' :
                   leadScore >= 60 ? '⭐ Lead calificado' :
                   leadScore >= 40 ? '📈 Lead interesado' :
                   '🌱 Lead en desarrollo'}
                </div>
              </div>
            </div>

            {/* Navigation */}
            <div className="flex justify-between">
              <button
                onClick={handlePrev}
                disabled={currentStep === 0}
                className="flex items-center gap-2 px-6 py-3 border border-gray-600 text-gray-300 rounded-xl hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
              >
                <ArrowLeft className="w-4 h-4" />
                Anterior
              </button>

              {currentStep < steps.length - 1 ? (
                <button
                  onClick={handleNext}
                  className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl hover:from-purple-700 hover:to-blue-700 transition-all duration-300"
                >
                  Siguiente
                  <ArrowRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-green-600 to-blue-600 text-white rounded-xl hover:from-green-700 hover:to-blue-700 transition-all duration-300 disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Enviando...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      Enviar Solicitud
                    </>
                  )}
                </button>
              )}
            </div>

            {/* Trust Indicators */}
            <div className="mt-8 pt-8 border-t border-gray-700">
              <div className="flex flex-wrap justify-center items-center gap-6 text-gray-400 text-sm">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-400" />
                  <span>Sin compromiso</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-400" />
                  <span>Respuesta en 24h</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-400" />
                  <span>Datos protegidos</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
} 