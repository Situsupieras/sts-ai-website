'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { 
  Clock, 
  TrendingUp, 
  Users, 
  CheckCircle, 
  ArrowRight,
  Star,
  Zap
} from 'lucide-react';

export default function CTASection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const benefits = [
    {
      icon: TrendingUp,
      title: 'ROI Comprobado',
      description: '340% de retorno promedio en 6 meses'
    },
    {
      icon: Clock,
      title: 'Implementación Rápida',
      description: 'Resultados visibles en 48 horas'
    },
    {
      icon: Users,
      title: 'Soporte Dedicado',
      description: 'Equipo experto disponible 24/7'
    },
    {
      icon: Star,
      title: 'Satisfacción Garantizada',
      description: '4.9/5 estrellas de nuestros clientes'
    }
  ];

  const urgencyElements = [
    'Solo 3 slots disponibles este mes',
    'Oferta especial por tiempo limitado',
    'Implementación gratuita para los primeros 10 clientes',
    'Garantía de resultados o devolvemos tu dinero'
  ];

  return (
    <section ref={ref} className="py-20 bg-gradient-to-br from-purple-900 via-slate-900 to-blue-900 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-72 h-72 bg-purple-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-purple-500/10 to-blue-500/10 rounded-full blur-2xl animate-pulse delay-500" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-6xl mx-auto">
          
          {/* Main CTA */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-500/20 border border-red-500/30 text-red-300 text-sm font-medium mb-6">
              <Zap className="w-4 h-4" />
              <span>Oferta Especial por Tiempo Limitado</span>
            </div>

            <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
              ¿Listo para Transformar Tu Empresa con IA?
            </h2>
            
            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-4xl mx-auto leading-relaxed">
              Únete a las 500+ empresas que ya están ahorrando millones. 
              <span className="text-purple-400 font-semibold"> Implementación gratuita</span> para los primeros 10 clientes de este mes.
            </p>

            {/* Urgency Indicators */}
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              {urgencyElements.map((element, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
                  className="flex items-center gap-2 px-4 py-2 bg-red-500/10 border border-red-500/20 rounded-full"
                >
                  <div className="w-2 h-2 bg-red-400 rounded-full animate-pulse" />
                  <span className="text-red-300 text-sm font-medium">{element}</span>
                </motion.div>
              ))}
            </div>

            {/* Primary CTA Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="mb-12"
            >
              <button
                onClick={() => document.getElementById('lead-form')?.scrollIntoView({ behavior: 'smooth' })}
                className="group relative px-12 py-6 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-bold text-xl rounded-2xl hover:from-purple-700 hover:to-blue-700 transition-all duration-300 transform hover:scale-105 shadow-2xl shadow-purple-500/25"
              >
                <span className="flex items-center gap-3">
                  Calcular Mi ROI Personalizado
                  <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
                </span>
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl" />
              </button>
            </motion.div>
          </motion.div>

          {/* Benefits Grid */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
          >
            {benefits.map((benefit, index) => (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 1 + index * 0.1 }}
                className="text-center p-6 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all duration-300"
              >
                <div className="flex justify-center mb-4">
                  <div className="p-3 rounded-lg bg-gradient-to-br from-purple-500/20 to-blue-500/20">
                    <benefit.icon className="w-8 h-8 text-purple-400" />
                  </div>
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">{benefit.title}</h3>
                <p className="text-gray-300 text-sm">{benefit.description}</p>
              </motion.div>
            ))}
          </motion.div>

          {/* Social Proof */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 1.4 }}
            className="text-center mb-12"
          >
            <div className="inline-block p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10">
              <div className="flex items-center justify-center gap-2 mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-white font-semibold mb-2">
                "Transformó completamente nuestra operación"
              </p>
              <p className="text-gray-300 text-sm">
                María González, CTO en TechCorp • ROI del 340% en 6 meses
              </p>
            </div>
          </motion.div>

          {/* Secondary CTA */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 1.6 }}
            className="text-center"
          >
            <div className="bg-gradient-to-r from-green-500/10 to-blue-500/10 rounded-2xl p-8 border border-green-500/20">
              <h3 className="text-2xl font-bold text-white mb-4">
                ¿Aún Tienes Dudas?
              </h3>
              <p className="text-gray-300 mb-6">
                Agenda una consulta gratuita de 30 minutos y descubre cómo podemos transformar tu empresa
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={() => document.getElementById('lead-form')?.scrollIntoView({ behavior: 'smooth' })}
                  className="px-8 py-4 bg-gradient-to-r from-green-600 to-blue-600 text-white font-semibold rounded-xl hover:from-green-700 hover:to-blue-700 transition-all duration-300 transform hover:scale-105"
                >
                  Consulta Gratuita
                </button>
                <button className="px-8 py-4 border-2 border-white/20 text-white font-semibold rounded-xl hover:bg-white/10 transition-all duration-300">
                  Ver Demo en Vivo
                </button>
              </div>
            </div>
          </motion.div>

          {/* Trust Indicators */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 1, delay: 1.8 }}
            className="mt-16 pt-8 border-t border-white/10"
          >
            <div className="flex flex-wrap justify-center items-center gap-8 text-gray-400 text-sm">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-400" />
                <span>Sin compromiso</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-400" />
                <span>Garantía de resultados</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-400" />
                <span>Implementación en 48h</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-400" />
                <span>Soporte 24/7 incluido</span>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
} 