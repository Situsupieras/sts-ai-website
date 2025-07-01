'use client';

import { useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Brain, Database, Zap, Target, Play, Pause } from 'lucide-react';

export default function AIProcessVisualizer() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [roiData, setRoiData] = useState({
    employees: 50,
    revenue: 1000000,
    industry: 'technology'
  });

  const processSteps = [
    {
      icon: Database,
      title: 'Recopilación de Datos',
      description: 'Integración inteligente de datos de múltiples fuentes',
      duration: '24-48 horas',
      output: 'Dataset unificado y limpio'
    },
    {
      icon: Brain,
      title: 'Análisis Predictivo',
      description: 'Machine Learning aplicado a patrones empresariales',
      duration: '1-2 semanas',
      output: 'Modelos predictivos validados'
    },
    {
      icon: Zap,
      title: 'Automatización',
      description: 'Implementación de procesos automatizados',
      duration: '2-3 semanas',
      output: 'Flujos de trabajo optimizados'
    },
    {
      icon: Target,
      title: 'Optimización Continua',
      description: 'Mejora constante basada en resultados',
      duration: 'Ongoing',
      output: 'ROI incremental'
    }
  ];

  const useCases = [
    {
      industry: 'Tecnología',
      cases: [
        { name: 'Análisis de Sentimientos', impact: '+45%' },
        { name: 'Predicción de Fallos', impact: '+78%' },
        { name: 'Optimización de Código', impact: '+62%' }
      ]
    },
    {
      industry: 'Finanzas',
      cases: [
        { name: 'Detección de Fraude', impact: '+89%' },
        { name: 'Análisis de Riesgo', impact: '+67%' },
        { name: 'Trading Automatizado', impact: '+34%' }
      ]
    },
    {
      industry: 'Salud',
      cases: [
        { name: 'Diagnóstico Predictivo', impact: '+92%' },
        { name: 'Gestión de Inventario', impact: '+56%' },
        { name: 'Optimización de Citas', impact: '+73%' }
      ]
    },
    {
      industry: 'Retail',
      cases: [
        { name: 'Personalización', impact: '+78%' },
        { name: 'Predicción de Demanda', impact: '+65%' },
        { name: 'Optimización de Precios', impact: '+41%' }
      ]
    }
  ];

  const calculateROI = () => {
    const baseROI = 340; // ROI base del 340%
    const employeeMultiplier = roiData.employees / 50;
    const revenueMultiplier = roiData.revenue / 1000000;
    const industryMultipliers = {
      technology: 1.2,
      finance: 1.1,
      healthcare: 1.3,
      retail: 1.0
    };

    const calculatedROI = baseROI * employeeMultiplier * revenueMultiplier * industryMultipliers[roiData.industry as keyof typeof industryMultipliers];
    const annualSavings = (roiData.revenue * calculatedROI) / 100;
    const paybackPeriod = 12 / (calculatedROI / 100);

    return {
      roi: Math.round(calculatedROI),
      savings: Math.round(annualSavings),
      payback: Math.round(paybackPeriod * 10) / 10
    };
  };

  useEffect(() => {
    if (isInView && isPlaying) {
      const interval = setInterval(() => {
        setCurrentStep((prev) => (prev + 1) % processSteps.length);
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [isInView, isPlaying, processSteps.length]);

  const roi = calculateROI();

  return (
    <section ref={ref} className="py-20 bg-gradient-to-b from-slate-900 to-slate-800">
      <div className="container mx-auto px-4">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Nuestro Proceso de Implementación de IA
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Un proceso transparente y medible desde la implementación hasta el ROI del 340%
          </p>
        </motion.div>

        {/* Journey Map */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-16"
        >
          <div className="relative">
            {/* Timeline */}
            <div className="absolute top-1/2 left-0 right-0 h-1 bg-gray-700 transform -translate-y-1/2" />
            <div className="absolute top-1/2 left-0 h-1 bg-gradient-to-r from-purple-500 to-blue-500 transform -translate-y-1/2 transition-all duration-1000" 
                 style={{ width: `${((currentStep + 1) / processSteps.length) * 100}%` }} />

            {/* Steps */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
              {processSteps.map((step, index) => (
                <motion.div
                  key={step.title}
                  initial={{ opacity: 0, y: 30 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.4 + index * 0.2 }}
                  className="relative"
                >
                  {/* Step Circle */}
                  <div className={`w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center transition-all duration-500 ${
                    index <= currentStep 
                      ? 'bg-gradient-to-br from-purple-500 to-blue-500 shadow-lg shadow-purple-500/50' 
                      : 'bg-gray-700'
                  }`}>
                    <step.icon className={`w-8 h-8 ${index <= currentStep ? 'text-white' : 'text-gray-400'}`} />
                  </div>

                  {/* Step Content */}
                  <div className={`text-center p-6 rounded-xl transition-all duration-500 ${
                    index === currentStep 
                      ? 'bg-gradient-to-br from-purple-500/10 to-blue-500/10 border border-purple-500/20' 
                      : 'bg-gray-800/50'
                  }`}>
                    <h3 className={`text-lg font-semibold mb-2 ${index === currentStep ? 'text-white' : 'text-gray-300'}`}>
                      {step.title}
                    </h3>
                    <p className="text-gray-400 text-sm mb-3">{step.description}</p>
                    <div className="text-xs text-gray-500">
                      <div>Duración: {step.duration}</div>
                      <div>Output: {step.output}</div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Play/Pause Controls */}
            <div className="flex justify-center mt-8">
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl hover:from-purple-700 hover:to-blue-700 transition-all duration-300"
              >
                {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
                {isPlaying ? 'Pausar' : 'Reproducir'} Journey
              </button>
            </div>
          </div>
        </motion.div>

        {/* Casos de Uso por Industria */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mb-16"
        >
          <h3 className="text-3xl font-bold text-white text-center mb-12">
            Casos de Uso por Industria
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {useCases.map((industry, index) => (
              <motion.div
                key={industry.industry}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
                className="p-6 rounded-xl bg-gradient-to-br from-green-500/5 to-blue-500/5 border border-green-500/10"
              >
                <h4 className="text-white font-semibold mb-4 text-center">{industry.industry}</h4>
                <div className="space-y-3">
                  {industry.cases.map((useCase) => (
                    <div key={useCase.name} className="flex justify-between items-center">
                      <span className="text-gray-300 text-sm">{useCase.name}</span>
                      <span className="text-green-400 font-semibold">{useCase.impact}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Calculadora de ROI */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1 }}
          className="max-w-4xl mx-auto"
        >
          <div className="bg-gradient-to-br from-purple-500/10 to-blue-500/10 rounded-2xl p-8 border border-purple-500/20">
            <div className="text-center mb-8">
              <h3 className="text-3xl font-bold text-white mb-4">
                Calculadora de ROI Personalizada
              </h3>
              <p className="text-gray-300">
                Descubre cuánto puedes ahorrar con IA en tu empresa
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Inputs */}
              <div className="space-y-6">
                <div>
                  <label className="block text-white font-medium mb-2">Número de Empleados</label>
                  <input
                    type="range"
                    min="10"
                    max="500"
                    value={roiData.employees}
                    onChange={(e) => setRoiData({ ...roiData, employees: parseInt(e.target.value) })}
                    className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
                  />
                  <div className="text-center text-purple-400 font-semibold mt-2">{roiData.employees} empleados</div>
                </div>

                <div>
                  <label className="block text-white font-medium mb-2">Ingresos Anuales (€)</label>
                  <input
                    type="range"
                    min="100000"
                    max="10000000"
                    step="100000"
                    value={roiData.revenue}
                    onChange={(e) => setRoiData({ ...roiData, revenue: parseInt(e.target.value) })}
                    className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
                  />
                  <div className="text-center text-purple-400 font-semibold mt-2">€{roiData.revenue.toLocaleString()}</div>
                </div>

                <div>
                  <label className="block text-white font-medium mb-2">Industria</label>
                  <select
                    value={roiData.industry}
                    onChange={(e) => setRoiData({ ...roiData, industry: e.target.value })}
                    className="w-full p-3 bg-gray-800 border border-gray-600 rounded-lg text-white"
                  >
                    <option value="technology">Tecnología</option>
                    <option value="finance">Finanzas</option>
                    <option value="healthcare">Salud</option>
                    <option value="retail">Retail</option>
                  </select>
                </div>
              </div>

              {/* Results */}
              <div className="space-y-6">
                <div className="text-center">
                  <div className="text-6xl font-bold text-purple-400 mb-2">{roi.roi}%</div>
                  <div className="text-gray-300">ROI Esperado</div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 bg-gray-800/50 rounded-lg">
                    <div className="text-2xl font-bold text-green-400 mb-1">€{roi.savings.toLocaleString()}</div>
                    <div className="text-gray-400 text-sm">Ahorro Anual</div>
                  </div>
                  <div className="text-center p-4 bg-gray-800/50 rounded-lg">
                    <div className="text-2xl font-bold text-blue-400 mb-1">{roi.payback}</div>
                    <div className="text-gray-400 text-sm">Meses Recuperación</div>
                  </div>
                </div>

                <button
                  onClick={() => document.getElementById('lead-form')?.scrollIntoView({ behavior: 'smooth' })}
                  className="w-full px-6 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold rounded-xl hover:from-purple-700 hover:to-blue-700 transition-all duration-300 transform hover:scale-105"
                >
                  Solicitar Análisis Detallado
                </button>
              </div>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
} 