'use client';

import { motion } from 'framer-motion';
import { ArrowLeft, Sparkles, Rocket, Zap } from 'lucide-react';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-slate-900 to-blue-900 flex items-center justify-center px-4">
      <div className="max-w-2xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Emojis animados */}
          <div className="flex justify-center gap-4 mb-8">
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <span className="text-6xl">🚀</span>
            </motion.div>
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <span className="text-6xl">✨</span>
            </motion.div>
            <motion.div
              animate={{ rotate: [0, -10, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
            >
              <span className="text-6xl">⚡</span>
            </motion.div>
          </div>

          {/* Mensaje principal */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-8"
          >
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              ¡Algo increíble se está preparando aquí!
            </h1>
            <p className="text-xl md:text-2xl text-purple-200 mb-4">
              ¡Espéralo muy pronto! 🎉
            </p>
            <p className="text-lg text-gray-300 max-w-lg mx-auto">
              Estamos trabajando en algo extraordinario que revolucionará la forma en que las empresas utilizan la IA.
            </p>
          </motion.div>

          {/* Indicadores de progreso */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
          >
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              <div className="w-12 h-12 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Sparkles className="w-6 h-6 text-purple-400" />
              </div>
              <h3 className="text-white font-semibold mb-2">Innovación</h3>
              <p className="text-gray-300 text-sm">Tecnología de vanguardia</p>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              <div className="w-12 h-12 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Rocket className="w-6 h-6 text-blue-400" />
              </div>
              <h3 className="text-white font-semibold mb-2">Velocidad</h3>
              <p className="text-gray-300 text-sm">Implementación ultrarrápida</p>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              <div className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="w-6 h-6 text-green-400" />
              </div>
              <h3 className="text-white font-semibold mb-2">Resultados</h3>
              <p className="text-gray-300 text-sm">ROI comprobado</p>
            </div>
          </motion.div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="space-y-4"
          >
            <Link
              href="/"
              className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold rounded-xl hover:from-purple-700 hover:to-blue-700 transition-all duration-300 transform hover:scale-105"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Volver al Inicio
            </Link>
            
            <div className="text-gray-400 text-sm">
              <p>¿Quieres ser el primero en saber cuando esté listo?</p>
              <Link href="/#contact" className="text-purple-400 hover:text-purple-300 underline">
                Únete a nuestra lista de espera
              </Link>
            </div>
          </motion.div>

          {/* Contador de progreso */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1 }}
            className="mt-12 p-6 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10"
          >
            <div className="flex items-center justify-center gap-4 text-gray-300">
              <span className="text-2xl">🔄</span>
              <span className="text-sm">Desarrollo en progreso...</span>
              <span className="text-2xl">🔄</span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
} 