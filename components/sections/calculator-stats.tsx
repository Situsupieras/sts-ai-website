'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Calculator, 
  TrendingUp, 
  Users, 
  Download,
  Star,
  Clock
} from 'lucide-react';

interface StatsData {
  totalCalculations: number;
  averageROI: number;
  totalUsers: number;
  reportsDownloaded: number;
  averageRating: number;
  timeSaved: number;
}

export default function CalculatorStats() {
  const [stats, setStats] = useState<StatsData>({
    totalCalculations: 0,
    averageROI: 0,
    totalUsers: 0,
    reportsDownloaded: 0,
    averageRating: 0,
    timeSaved: 0
  });

  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          // Simular datos reales
          const mockStats: StatsData = {
            totalCalculations: 1247,
            averageROI: 187.3,
            totalUsers: 892,
            reportsDownloaded: 756,
            averageRating: 4.8,
            timeSaved: 2340
          };
          
          // Animar los números
          const animateNumbers = () => {
            setStats(mockStats);
          };
          
          setTimeout(animateNumbers, 500);
        }
      },
      { threshold: 0.1 }
    );

    const element = document.getElementById('calculator-stats');
    if (element) {
      observer.observe(element);
    }

    return () => observer.disconnect();
  }, []);

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5 }
    }
  };

  const statsItems = [
    {
      icon: <Calculator className="w-6 h-6" />,
      label: 'Cálculos Realizados',
      value: stats.totalCalculations.toLocaleString(),
      color: 'from-blue-500 to-cyan-600',
      description: 'ROIs calculados exitosamente'
    },
    {
      icon: <TrendingUp className="w-6 h-6" />,
      label: 'ROI Promedio',
      value: `${stats.averageROI.toFixed(1)}%`,
      color: 'from-green-500 to-emerald-600',
      description: 'Retorno promedio de inversión'
    },
    {
      icon: <Users className="w-6 h-6" />,
      label: 'Usuarios Activos',
      value: stats.totalUsers.toLocaleString(),
      color: 'from-purple-500 to-pink-600',
      description: 'Empresas que confían en nosotros'
    },
    {
      icon: <Download className="w-6 h-6" />,
      label: 'Reportes Descargados',
      value: stats.reportsDownloaded.toLocaleString(),
      color: 'from-orange-500 to-red-600',
      description: 'Análisis detallados generados'
    },
    {
      icon: <Star className="w-6 h-6" />,
      label: 'Calificación Promedio',
      value: `${stats.averageRating}/5.0`,
      color: 'from-yellow-500 to-orange-600',
      description: 'Satisfacción de nuestros usuarios'
    },
    {
      icon: <Clock className="w-6 h-6" />,
      label: 'Horas Ahorradas',
      value: `${stats.timeSaved.toLocaleString()}`,
      color: 'from-indigo-500 to-purple-600',
      description: 'Tiempo optimizado en análisis'
    }
  ];

  return (
    <section id="calculator-stats" className="py-16 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="container mx-auto px-4">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
          className="max-w-6xl mx-auto"
        >
          {/* Header */}
          <div className="text-center mb-12">
            <motion.h2 
              variants={itemVariants}
              className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
            >
              Impacto de Nuestras Calculadoras
            </motion.h2>
            <motion.p 
              variants={itemVariants}
              className="text-xl text-gray-600 max-w-3xl mx-auto"
            >
              Miles de empresas ya han descubierto el potencial de la IA con nuestras 
              herramientas especializadas. Estos son los números que hablan por sí solos.
            </motion.p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {statsItems.map((item, index) => (
              <motion.div
                key={item.label}
                variants={itemVariants}
                className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
              >
                <div className="flex items-center mb-4">
                  <div className={`p-3 rounded-xl bg-gradient-to-r ${item.color} mr-4`}>
                    <div className="text-white">
                      {item.icon}
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      {item.label}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {item.description}
                    </p>
                  </div>
                </div>
                
                <motion.div
                  initial={{ scale: 0 }}
                  animate={isVisible ? { scale: 1 } : { scale: 0 }}
                  transition={{ delay: index * 0.1 + 0.5, duration: 0.5 }}
                  className="text-3xl font-bold text-gray-900"
                >
                  {item.value}
                </motion.div>
              </motion.div>
            ))}
          </div>

          {/* Testimonials Section */}
          <motion.div
            variants={itemVariants}
            className="mt-16 bg-white rounded-2xl p-8 shadow-lg"
          >
            <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">
              Lo que dicen nuestros usuarios
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="flex justify-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-600 mb-4">
                  "La calculadora de ROI nos ayudó a justificar la inversión en IA. 
                  El resultado fue exactamente lo que esperábamos."
                </p>
                <div className="font-semibold text-gray-900">María González</div>
                <div className="text-sm text-gray-500">Directora de Operaciones, TechCorp</div>
              </div>
              
              <div className="text-center">
                <div className="flex justify-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-600 mb-4">
                  "Excelente herramienta para evaluar el impacto de la IA en nuestro 
                  sector manufacturero. Muy precisa y fácil de usar."
                </p>
                <div className="font-semibold text-gray-900">Carlos Rodríguez</div>
                <div className="text-sm text-gray-500">CEO, ManufacturaPro</div>
              </div>
              
              <div className="text-center">
                <div className="flex justify-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-600 mb-4">
                  "El reporte personalizado nos dio insights valiosos para nuestra 
                  estrategia de transformación digital."
                </p>
                <div className="font-semibold text-gray-900">Ana Martínez</div>
                <div className="text-sm text-gray-500">CTO, RetailInnovation</div>
              </div>
            </div>
          </motion.div>

          {/* CTA Section */}
          <motion.div
            variants={itemVariants}
            className="mt-12 text-center"
          >
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white">
              <h3 className="text-2xl font-bold mb-4">
                ¿Listo para descubrir tu ROI potencial?
              </h3>
              <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
                Únete a miles de empresas que ya están transformando sus operaciones 
                con soluciones de IA personalizadas.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="/calculadoras"
                  className="inline-flex items-center justify-center px-8 py-4 bg-white text-blue-600 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
                >
                  <Calculator className="w-5 h-5 mr-2" />
                  Probar Calculadora
                </a>
                <a
                  href="/contacto"
                  className="inline-flex items-center justify-center px-8 py-4 border-2 border-white text-white rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors"
                >
                  Hablar con Experto
                </a>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
} 