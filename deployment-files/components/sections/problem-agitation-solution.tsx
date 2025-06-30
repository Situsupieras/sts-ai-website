'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { AlertTriangle, TrendingUp, Zap, CheckCircle, ArrowRight } from 'lucide-react';

export default function ProblemAgitationSolution() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <section ref={ref} className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="max-w-6xl mx-auto"
        >
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Procesos ineficientes y costos innecesarios
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Descubre cómo la IA puede eliminar tareas repetitivas, reducir errores y acelerar tu crecimiento.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* PROBLEM */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-yellow-50 rounded-2xl p-8 border border-yellow-200 shadow-lg"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
                  <CheckCircle className="w-6 h-6 text-yellow-600" />
                </div>
                <h3 className="text-2xl font-bold text-yellow-900">🚨 Señales de alerta</h3>
              </div>
              <ul className="list-disc pl-5 text-yellow-900 space-y-2 text-lg">
                <li>¿Tu equipo sigue haciendo tareas repetitivas que podrían automatizarse?</li>
                <li>¿Tomas decisiones importantes sin datos en tiempo real?</li>
                <li>¿Tus procesos operativos generan cuellos de botella o errores?</li>
                <li>¿Tus clientes tienen que esperar demasiado para recibir atención?</li>
              </ul>
            </motion.div>

            {/* AGITATION */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="bg-blue-50 rounded-2xl p-8 border border-blue-200 shadow-lg"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <ArrowRight className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="text-2xl font-bold text-blue-900">El ritmo del mercado no espera</h3>
              </div>
              <p className="text-blue-900 text-lg mb-4">
                Cada mes que pasa podrías estar perdiendo entre <span className="font-bold">€10,000 y €50,000</span> en tiempo, recursos y decisiones ineficientes.
              </p>
              <div className="text-blue-700 text-base">
                La competencia ya está usando IA. ¿Vas a quedarte atrás?
              </div>
            </motion.div>

            {/* SOLUTION */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="bg-green-50 rounded-2xl p-8 border border-green-200 shadow-lg"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <ArrowRight className="w-6 h-6 text-green-600" />
                </div>
                <h3 className="text-2xl font-bold text-green-900">Solución inmediata con IA inteligente</h3>
              </div>
              <ul className="list-disc pl-5 text-green-900 space-y-2 text-lg">
                <li>Automatiza hasta un 70% de tareas repetitivas</li>
                <li>Reduce miles de euros en costos operativos</li>
                <li>Toma decisiones más precisas y rápidas</li>
                <li>Aumenta la satisfacción de clientes y empleados</li>
              </ul>
              <div className="mt-6 text-green-800 font-semibold text-center">
                En solo 6 meses puedes transformar tu empresa.
              </div>
            </motion.div>
          </div>

          {/* Bottom CTA */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="text-center mt-12"
          >
            <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-2xl p-8 border border-purple-200">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                ¿Cuál es tu situación actual?
              </h3>
              <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                ¿Estás perdiendo tiempo, dinero y oportunidades?<br/>
                Evalúa tu situación actual y descubre cómo la IA puede transformar tus operaciones en los próximos 6 meses.
              </p>
              <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-4 rounded">
                <div className="font-semibold text-yellow-800 mb-2">🚨 Señales de alerta:</div>
                <ul className="list-disc pl-5 text-yellow-900 space-y-1">
                  <li>¿Tu equipo sigue haciendo tareas repetitivas que podrían automatizarse?</li>
                  <li>¿Tomas decisiones importantes sin datos en tiempo real?</li>
                  <li>¿Tus procesos operativos generan cuellos de botella o errores?</li>
                  <li>¿Tus clientes tienen que esperar demasiado para recibir atención?</li>
                </ul>
              </div>
              <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-4 rounded">
                <div className="font-semibold text-blue-800 mb-2">🔍 Descubre el costo oculto:</div>
                <p className="text-blue-900">Cada mes que pasa podrías estar perdiendo entre €10,000 y €50,000 en tiempo, recursos y decisiones ineficientes.</p>
              </div>
              <div className="bg-green-50 border-l-4 border-green-400 p-4 mb-4 rounded">
                <div className="font-semibold text-green-800 mb-2">🤖 ¿Y si en solo 6 meses…?</div>
                <ul className="list-disc pl-5 text-green-900 space-y-1">
                  <li>Automatizas hasta un 70% de tareas repetitivas</li>
                  <li>Ahorras miles de euros en costos operativos</li>
                  <li>Tomas decisiones más precisas y rápidas</li>
                  <li>Aumentas la satisfacción de clientes y empleados</li>
                </ul>
              </div>
              <div className="text-center mt-6 mb-6 flex flex-col md:flex-row gap-4 justify-center items-center">
                <a href="#lead-form" className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all duration-200">
                  <CheckCircle className="w-5 h-5 mr-2" />
                  Calcula tu pérdida actual y descubre tu ROI potencial
                </a>
                <a href="/not-found" className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200">
                  <Zap className="w-5 h-5 mr-2" />
                  Ver Demo en Vivo
                </a>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
} 