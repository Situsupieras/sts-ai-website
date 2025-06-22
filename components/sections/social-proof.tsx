'use client';

import { useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Star, Quote, TrendingUp, Users, Award, CheckCircle } from 'lucide-react';

export default function SocialProof() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const clients = [
    { name: 'TechCorp', logo: '/logos/techcorp.svg', industry: 'Tecnología' },
    { name: 'FinServ', logo: '/logos/finserv.svg', industry: 'Finanzas' },
    { name: 'HealthCare', logo: '/logos/healthcare.svg', industry: 'Salud' },
    { name: 'RetailPro', logo: '/logos/retailpro.svg', industry: 'Retail' },
    { name: 'Manufacturing', logo: '/logos/manufacturing.svg', industry: 'Manufactura' },
    { name: 'Logistics', logo: '/logos/logistics.svg', industry: 'Logística' },
  ];

  const testimonials = [
    {
      name: 'María González',
      position: 'CTO',
      company: 'TechCorp',
      industry: 'Tecnología',
      content: 'La implementación de IA nos permitió reducir costos operativos en un 47% y aumentar la productividad del equipo en un 340%. El ROI fue visible desde el primer mes.',
      avatar: '/avatars/maria.jpg',
      metrics: { costReduction: '47%', productivity: '340%', roi: '€2.1M' }
    },
    {
      name: 'Carlos Rodríguez',
      position: 'CFO',
      company: 'FinServ',
      industry: 'Finanzas',
      content: 'Los análisis predictivos de IA nos ayudaron a optimizar nuestras inversiones y reducir riesgos. El resultado: un incremento del 89% en precisión de decisiones.',
      avatar: '/avatars/carlos.jpg',
      metrics: { accuracy: '89%', riskReduction: '65%', savings: '€3.2M' }
    },
    {
      name: 'Ana Martínez',
      position: 'CEO',
      company: 'HealthCare',
      industry: 'Salud',
      content: 'La automatización de procesos con IA transformó completamente nuestra operación. Ahora atendemos un 60% más de pacientes con la misma infraestructura.',
      avatar: '/avatars/ana.jpg',
      metrics: { efficiency: '60%', patientCapacity: '+60%', satisfaction: '95%' }
    },
    {
      name: 'Luis Fernández',
      position: 'Director de Operaciones',
      company: 'RetailPro',
      industry: 'Retail',
      content: 'La personalización con IA aumentó nuestras ventas en un 78% y mejoró la retención de clientes en un 92%. Una inversión que se pagó sola en 3 meses.',
      avatar: '/avatars/luis.jpg',
      metrics: { salesIncrease: '78%', retention: '92%', payback: '3 meses' }
    }
  ];

  const metrics = [
    { value: '500+', label: 'Empresas Transformadas', icon: Users },
    { value: '€47M', label: 'Ahorro Total Generado', icon: TrendingUp },
    { value: '4.9/5', label: 'Satisfacción del Cliente', icon: Star },
    { value: '99.9%', label: 'Uptime Garantizado', icon: Award }
  ];

  useEffect(() => {
    if (isInView) {
      const interval = setInterval(() => {
        setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [isInView, testimonials.length]);

  return (
    <section ref={ref} className="py-20 bg-gradient-to-b from-slate-800 to-slate-900">
      <div className="container mx-auto px-4">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Empresas que Confían en Nosotros
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Más de 500 empresas líderes han transformado sus operaciones con nuestras soluciones de IA
          </p>
        </motion.div>

        {/* Logos de Clientes */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-16"
        >
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center">
            {clients.map((client, index) => (
              <motion.div
                key={client.name}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                className="flex flex-col items-center p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-all duration-300"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-blue-500 rounded-lg flex items-center justify-center mb-3">
                  <span className="text-white font-bold text-lg">{client.name.charAt(0)}</span>
                </div>
                <div className="text-center">
                  <div className="text-white font-semibold">{client.name}</div>
                  <div className="text-gray-400 text-sm">{client.industry}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Métricas Principales */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16"
        >
          {metrics.map((metric, index) => (
            <motion.div
              key={metric.label}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
              className="text-center p-6 rounded-xl bg-gradient-to-br from-purple-500/10 to-blue-500/10 border border-purple-500/20"
            >
              <div className="flex justify-center mb-3">
                <div className="p-2 rounded-lg bg-purple-500/20">
                  <metric.icon className="w-6 h-6 text-purple-400" />
                </div>
              </div>
              <div className="text-3xl font-bold text-white mb-2">{metric.value}</div>
              <div className="text-gray-300 text-sm">{metric.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Testimonios */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1 }}
          className="mb-16"
        >
          <div className="text-center mb-8">
            <h3 className="text-3xl font-bold text-white mb-4">
              Lo Que Dicen Nuestros Clientes
            </h3>
            <p className="text-gray-300">
              Testimonios reales de ejecutivos que han transformado sus empresas
            </p>
          </div>

          <div className="relative max-w-4xl mx-auto">
            <div className="bg-gradient-to-br from-white/5 to-white/10 rounded-2xl p-8 backdrop-blur-sm border border-white/10">
              <div className="flex items-start gap-6">
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-xl">
                      {testimonials[currentTestimonial].name.charAt(0)}
                    </span>
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-4">
                    <Quote className="w-5 h-5 text-purple-400" />
                    <p className="text-white text-lg leading-relaxed">
                      "{testimonials[currentTestimonial].content}"
                    </p>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-white font-semibold">
                        {testimonials[currentTestimonial].name}
                      </div>
                      <div className="text-gray-400 text-sm">
                        {testimonials[currentTestimonial].position} • {testimonials[currentTestimonial].company}
                      </div>
                    </div>
                    
                    <div className="flex gap-4">
                      {Object.entries(testimonials[currentTestimonial].metrics).map(([key, value]) => (
                        <div key={key} className="text-center">
                          <div className="text-purple-400 font-bold">{value}</div>
                          <div className="text-gray-400 text-xs capitalize">
                            {key.replace(/([A-Z])/g, ' $1').trim()}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Indicadores de Testimonios */}
            <div className="flex justify-center gap-2 mt-6">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentTestimonial 
                      ? 'bg-purple-500 w-8' 
                      : 'bg-gray-600 hover:bg-gray-500'
                  }`}
                />
              ))}
            </div>
          </div>
        </motion.div>

        {/* Casos de Éxito por Industria */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {[
            { industry: 'Tecnología', improvement: '340%', metric: 'Productividad' },
            { industry: 'Finanzas', improvement: '89%', metric: 'Precisión' },
            { industry: 'Salud', improvement: '60%', metric: 'Eficiencia' },
            { industry: 'Retail', improvement: '78%', metric: 'Ventas' },
            { industry: 'Manufactura', improvement: '45%', metric: 'Reducción de Costos' },
            { industry: 'Logística', improvement: '52%', metric: 'Optimización' }
          ].map((caseStudy, index) => (
            <motion.div
              key={caseStudy.industry}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 1.4 + index * 0.1 }}
              className="p-6 rounded-xl bg-gradient-to-br from-green-500/5 to-blue-500/5 border border-green-500/10 hover:border-green-500/20 transition-all duration-300"
            >
              <div className="flex items-center gap-3 mb-4">
                <CheckCircle className="w-5 h-5 text-green-400" />
                <h4 className="text-white font-semibold">{caseStudy.industry}</h4>
              </div>
              <div className="text-2xl font-bold text-green-400 mb-2">
                {caseStudy.improvement}
              </div>
              <div className="text-gray-300 text-sm">
                Mejora en {caseStudy.metric}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 2 }}
          className="text-center mt-16"
        >
          <div className="inline-block p-8 rounded-2xl bg-gradient-to-r from-purple-500/10 to-blue-500/10 border border-purple-500/20">
            <h3 className="text-2xl font-bold text-white mb-4">
              Únete a Nuestros Clientes Exitosos
            </h3>
            <p className="text-gray-300 mb-6">
              Descubre cómo podemos transformar tu empresa con IA
            </p>
            <button
              onClick={() => document.getElementById('lead-form')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold rounded-xl hover:from-purple-700 hover:to-blue-700 transition-all duration-300 transform hover:scale-105"
            >
              Solicitar Consulta Gratuita
            </button>
          </div>
        </motion.div>

      </div>
    </section>
  );
} 