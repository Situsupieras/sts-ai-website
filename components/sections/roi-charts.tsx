'use client';

import React, { useEffect, useRef } from 'react';
import { motion, useAnimation } from 'framer-motion';

interface ROIChartProps {
  data: {
    roi: number;
    savings: number;
    paybackPeriod: number;
    annualBenefit: number;
    metrics: Record<string, number>;
  };
  industry: string;
}

export default function ROICharts({ data, industry }: ROIChartProps) {
  const controls = useAnimation();
  const chartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          controls.start('visible');
        }
      },
      { threshold: 0.1 }
    );

    if (chartRef.current) {
      observer.observe(chartRef.current);
    }

    return () => observer.disconnect();
  }, [controls]);

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.2
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

  // Calcular colores basados en el ROI
  const getROIColor = (roi: number) => {
    if (roi >= 200) return 'from-green-500 to-emerald-600';
    if (roi >= 150) return 'from-blue-500 to-cyan-600';
    if (roi >= 100) return 'from-yellow-500 to-orange-600';
    return 'from-red-500 to-pink-600';
  };

  // Crear datos para el gráfico de barras
  const barChartData = Object.entries(data.metrics).map(([key, value]) => ({
    label: key,
    value: value,
    percentage: (value / Math.max(...Object.values(data.metrics))) * 100
  }));

  return (
    <motion.div
      ref={chartRef}
      variants={containerVariants}
      initial="hidden"
      animate={controls}
      className="space-y-8"
    >
      {/* Gráfico de ROI Principal */}
      <motion.div variants={itemVariants} className="bg-white rounded-2xl p-6 shadow-lg">
        <h3 className="text-xl font-bold text-gray-900 mb-6 text-center">
          ROI por Industria: {industry}
        </h3>
        
        <div className="relative">
          {/* Círculo de ROI */}
          <div className="flex justify-center mb-6">
            <div className="relative w-48 h-48">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                {/* Círculo de fondo */}
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  stroke="#e5e7eb"
                  strokeWidth="8"
                  fill="none"
                />
                
                {/* Círculo de progreso */}
                <motion.circle
                  cx="50"
                  cy="50"
                  r="40"
                  stroke="url(#roiGradient)"
                  strokeWidth="8"
                  fill="none"
                  strokeLinecap="round"
                  initial={{ strokeDasharray: "0 251.2" }}
                  animate={{ strokeDasharray: `${(data.roi / 400) * 251.2} 251.2` }}
                  transition={{ duration: 2, ease: "easeOut" }}
                />
                
                {/* Gradiente */}
                <defs>
                  <linearGradient id="roiGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" className={`${getROIColor(data.roi)}`} />
                    <stop offset="100%" className={`${getROIColor(data.roi)}`} />
                  </linearGradient>
                </defs>
              </svg>
              
              {/* Valor central */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 1, duration: 0.5 }}
                    className="text-3xl font-bold text-gray-900"
                  >
                    {data.roi.toFixed(1)}%
                  </motion.div>
                  <div className="text-sm text-gray-600">ROI</div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Leyenda */}
          <div className="grid grid-cols-2 gap-4 text-center">
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="text-2xl font-bold text-green-600">
                ${data.annualBenefit.toLocaleString()}
              </div>
              <div className="text-sm text-gray-600">Beneficio Anual</div>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="text-2xl font-bold text-blue-600">
                {data.paybackPeriod.toFixed(1)}
              </div>
              <div className="text-sm text-gray-600">Meses Recuperación</div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Gráfico de Barras de Métricas */}
      <motion.div variants={itemVariants} className="bg-white rounded-2xl p-6 shadow-lg">
        <h3 className="text-xl font-bold text-gray-900 mb-6">
          Desglose de Beneficios
        </h3>
        
        <div className="space-y-4">
          {barChartData.map((item, index) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="space-y-2"
            >
              <div className="flex justify-between text-sm">
                <span className="font-medium text-gray-700">{item.label}</span>
                <span className="font-bold text-gray-900">
                  {typeof item.value === 'number' && item.label.includes('$') 
                    ? `$${item.value.toLocaleString()}`
                    : typeof item.value === 'number' && item.label.includes('Meses')
                    ? `${item.value.toFixed(1)} meses`
                    : item.value.toLocaleString()
                  }
                </span>
              </div>
              
              <div className="w-full bg-gray-200 rounded-full h-3">
                <motion.div
                  className={`h-3 rounded-full bg-gradient-to-r ${getROIColor(data.roi)}`}
                  initial={{ width: 0 }}
                  animate={{ width: `${item.percentage}%` }}
                  transition={{ delay: index * 0.1 + 0.5, duration: 1 }}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Gráfico de Línea de Tiempo */}
      <motion.div variants={itemVariants} className="bg-white rounded-2xl p-6 shadow-lg">
        <h3 className="text-xl font-bold text-gray-900 mb-6">
          Proyección de Beneficios
        </h3>
        
        <div className="space-y-6">
          {[6, 12, 24].map((months, index) => {
            const projectedBenefit = (data.annualBenefit / 12) * months;
            const cumulativeROI = ((projectedBenefit - (data.annualBenefit * 0.3)) / (data.annualBenefit * 0.3)) * 100;
            
            return (
              <motion.div
                key={months}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg"
              >
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold mr-4">
                    {months}
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">
                      {months} {months === 1 ? 'Mes' : 'Meses'}
                    </div>
                    <div className="text-sm text-gray-600">
                      Proyección acumulada
                    </div>
                  </div>
                </div>
                
                <div className="text-right">
                  <div className="text-lg font-bold text-green-600">
                    ${projectedBenefit.toLocaleString()}
                  </div>
                  <div className="text-sm text-gray-600">
                    ROI: {cumulativeROI.toFixed(1)}%
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>

      {/* Comparación con Industria */}
      <motion.div variants={itemVariants} className="bg-white rounded-2xl p-6 shadow-lg">
        <h3 className="text-xl font-bold text-gray-900 mb-6">
          Comparación con Promedio de la Industria
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-700">Tu ROI Calculado</span>
              <span className="font-bold text-green-600">{data.roi.toFixed(1)}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <motion.div
                className="h-3 bg-green-500 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${Math.min((data.roi / 300) * 100, 100)}%` }}
                transition={{ delay: 1, duration: 1 }}
              />
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-700">Promedio Industria</span>
              <span className="font-bold text-blue-600">180%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div className="h-3 bg-blue-500 rounded-full" style={{ width: '60%' }} />
            </div>
          </div>
        </div>
        
        <div className="mt-6 p-4 bg-green-50 rounded-lg">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center mr-3">
              <span className="text-white text-sm font-bold">+</span>
            </div>
            <div>
              <div className="font-semibold text-green-800">
                {data.roi > 180 ? '¡Excelente!' : 'Buen potencial'}
              </div>
              <div className="text-sm text-green-700">
                {data.roi > 180 
                  ? `Tu ROI está ${((data.roi - 180) / 180 * 100).toFixed(1)}% por encima del promedio`
                  : 'Implementación recomendada para mejorar resultados'
                }
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
} 