'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { AlertTriangle, Clock, Rocket, ArrowRight, Calculator } from 'lucide-react';

export default function ProblemAgitationSolution() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <section ref={ref} className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="max-w-6xl mx-auto"
        >
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Lo que está frenando tu empresa
            </h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto">
              Descubre los obstáculos invisibles que están limitando tu crecimiento y cómo la IA puede eliminarlos en solo 6 meses.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8 mb-16">
            {/* PROBLEM */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-red-50 rounded-2xl p-8 border border-red-200 shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                  <AlertTriangle className="w-6 h-6 text-red-600" />
                </div>
                <h3 className="text-2xl font-bold text-red-900">🚨 Lo que está frenando tu empresa</h3>
              </div>
              <ul className="space-y-3 text-red-900 text-lg">
                <li className="flex items-start">
                  <span className="text-red-600 mr-2">•</span>
                  Procesos manuales que consumen tiempo y recursos
                </li>
                <li className="flex items-start">
                  <span className="text-red-600 mr-2">•</span>
                  Errores humanos que impactan en tus costos y tu reputación
                </li>
                <li className="flex items-start">
                  <span className="text-red-600 mr-2">•</span>
                  Decisiones estratégicas tomadas sin datos en tiempo real
                </li>
                <li className="flex items-start">
                  <span className="text-red-600 mr-2">•</span>
                  Una competencia más ágil que te deja atrás
                </li>
              </ul>
              <div className="mt-6 p-4 bg-red-100 rounded-lg">
                <p className="text-red-800 font-bold text-center">
                  ¿Resultado? Entre €500 000 y €2 000 000 perdidos cada año
                </p>
              </div>
            </motion.div>

            {/* AGITATION */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="bg-orange-50 rounded-2xl p-8 border border-orange-200 shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                  <Clock className="w-6 h-6 text-orange-600" />
                </div>
                <h3 className="text-2xl font-bold text-orange-900">⏰ El precio de esperar</h3>
              </div>
              <ul className="space-y-3 text-orange-900 text-lg">
                <li className="flex items-start">
                  <span className="text-orange-600 mr-2">•</span>
                  Cada día de espera es una ventaja para tu competencia
                </li>
                <li className="flex items-start">
                  <span className="text-orange-600 mr-2">•</span>
                  Tus costos operativos siguen creciendo
                </li>
                <li className="flex items-start">
                  <span className="text-orange-600 mr-2">•</span>
                  Tus clientes ya exigen velocidad, personalización y precisión
                </li>
                <li className="flex items-start">
                  <span className="text-orange-600 mr-2">•</span>
                  El mercado no premia a los lentos
                </li>
              </ul>
              <div className="mt-6 p-4 bg-orange-100 rounded-lg">
                <p className="text-orange-800 font-bold text-center">
                  Cada mes sin actuar puede costarte entre €50 000 y €200 000
                </p>
              </div>
            </motion.div>

            {/* SOLUTION */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="bg-green-50 rounded-2xl p-8 border border-green-200 shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <Rocket className="w-6 h-6 text-green-600" />
                </div>
                <h3 className="text-2xl font-bold text-green-900">🚀 Lo que puedes lograr en 6 meses con IA</h3>
              </div>
              <ul className="space-y-3 text-green-900 text-lg">
                <li className="flex items-start">
                  <span className="text-green-600 mr-2">✅</span>
                  Automatización inteligente que elimina tareas repetitivas
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-2">📊</span>
                  Análisis predictivo que anticipa lo que tu negocio necesita
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-2">🤖</span>
                  Asistentes virtuales que atienden clientes 24/7
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-2">⚙️</span>
                  Implementación ágil en solo 48 horas
                </li>
              </ul>
              <div className="mt-6 p-4 bg-green-100 rounded-lg">
                <p className="text-green-800 font-bold text-center">
                  💰 Resultado comprobado: ROI de hasta 340 % en solo 6 meses
                </p>
              </div>
            </motion.div>
          </div>

          {/* Bottom CTA */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="text-center"
          >
            <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl p-8 text-white shadow-2xl">
              <h3 className="text-3xl font-bold mb-4">
                ¿Cuánto dinero estás perdiendo cada mes?
              </h3>
              <p className="text-xl mb-8 max-w-3xl mx-auto">
                Descubre el costo real de la inacción y cómo la IA puede transformar 
                tu empresa en los próximos 6 meses con un ROI comprobado del 340%.
              </p>
              <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
                <a 
                  href="#calculadoras" 
                  className="inline-flex items-center px-8 py-4 bg-white text-purple-600 font-bold rounded-lg hover:bg-gray-100 transition-all duration-200 shadow-lg"
                >
                  <Calculator className="w-5 h-5 mr-2" />
                  Calcular mi ROI potencial
                </a>
                <a 
                  href="#contact" 
                  className="inline-flex items-center px-8 py-4 border-2 border-white text-white font-bold rounded-lg hover:bg-white hover:text-purple-600 transition-all duration-200"
                >
                  <ArrowRight className="w-5 h-5 mr-2" />
                  Hablar con un experto
                </a>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
} 