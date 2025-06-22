'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Calculator, 
  TrendingUp, 
  Download, 
  Mail, 
  CheckCircle, 
  AlertCircle,
  Building,
  Factory,
  ShoppingCart,
  Truck,
  Heart,
  GraduationCap,
  DollarSign,
  Clock,
  Users,
  BarChart3
} from 'lucide-react';

// Tipos de datos
interface IndustryData {
  id: string;
  name: string;
  icon: React.ReactNode;
  description: string;
  fields: FieldConfig[];
  calculations: CalculationConfig;
}

interface FieldConfig {
  id: string;
  label: string;
  type: 'number' | 'select' | 'text';
  placeholder: string;
  required: boolean;
  validation?: (value: any) => string | null;
  options?: { value: string; label: string }[];
  unit?: string;
}

interface CalculationConfig {
  formula: (data: any) => number;
  metrics: string[];
  timeframes: string[];
}

interface CalculationResult {
  roi: number;
  savings: number;
  paybackPeriod: number;
  annualBenefit: number;
  metrics: Record<string, number>;
  recommendations: string[];
}

// Configuración de industrias
const industries: IndustryData[] = [
  {
    id: 'manufacturing',
    name: 'Manufactura',
    icon: <Factory className="w-6 h-6" />,
    description: 'Optimiza procesos de producción y reduce costos operativos',
    fields: [
      {
        id: 'monthlyProduction',
        label: 'Producción Mensual (unidades)',
        type: 'number',
        placeholder: '1000',
        required: true,
        unit: 'unidades'
      },
      {
        id: 'downtimeHours',
        label: 'Horas de Inactividad Mensual',
        type: 'number',
        placeholder: '40',
        required: true,
        unit: 'horas'
      },
      {
        id: 'laborCost',
        label: 'Costo de Mano de Obra por Hora',
        type: 'number',
        placeholder: '25',
        required: true,
        unit: 'USD'
      },
      {
        id: 'qualityIssues',
        label: 'Porcentaje de Defectos',
        type: 'number',
        placeholder: '5',
        required: true,
        unit: '%'
      },
      {
        id: 'currentAutomation',
        label: 'Nivel de Automatización Actual',
        type: 'select',
        placeholder: 'Selecciona nivel',
        required: true,
        options: [
          { value: 'low', label: 'Bajo (0-25%)' },
          { value: 'medium', label: 'Medio (26-50%)' },
          { value: 'high', label: 'Alto (51-75%)' },
          { value: 'very-high', label: 'Muy Alto (76-100%)' }
        ]
      }
    ],
    calculations: {
      formula: (data) => {
        const downtimeCost = data.downtimeHours * data.laborCost * 12;
        const qualityCost = (data.qualityIssues / 100) * data.monthlyProduction * 50 * 12;
        const automationSavings = downtimeCost * 0.7 + qualityCost * 0.6;
        const implementationCost = automationSavings * 0.3;
        return ((automationSavings - implementationCost) / implementationCost) * 100;
      },
      metrics: ['Ahorro en Tiempo de Inactividad', 'Reducción de Defectos', 'Optimización de Procesos'],
      timeframes: ['6 meses', '1 año', '2 años']
    }
  },
  {
    id: 'retail',
    name: 'Comercio Minorista',
    icon: <ShoppingCart className="w-6 h-6" />,
    description: 'Mejora la experiencia del cliente y optimiza inventarios',
    fields: [
      {
        id: 'monthlySales',
        label: 'Ventas Mensuales',
        type: 'number',
        placeholder: '50000',
        required: true,
        unit: 'USD'
      },
      {
        id: 'customerSatisfaction',
        label: 'Satisfacción del Cliente Actual',
        type: 'number',
        placeholder: '75',
        required: true,
        unit: '%'
      },
      {
        id: 'inventoryTurnover',
        label: 'Rotación de Inventario',
        type: 'number',
        placeholder: '4',
        required: true,
        unit: 'veces/año'
      },
      {
        id: 'staffEfficiency',
        label: 'Eficiencia del Personal',
        type: 'select',
        placeholder: 'Selecciona nivel',
        required: true,
        options: [
          { value: 'low', label: 'Baja (0-25%)' },
          { value: 'medium', label: 'Media (26-50%)' },
          { value: 'high', label: 'Alta (51-75%)' },
          { value: 'very-high', label: 'Muy Alta (76-100%)' }
        ]
      }
    ],
    calculations: {
      formula: (data) => {
        const satisfactionIncrease = (90 - data.customerSatisfaction) * 0.02;
        const salesIncrease = data.monthlySales * satisfactionIncrease * 12;
        const inventoryOptimization = data.monthlySales * 0.1;
        const implementationCost = (salesIncrease + inventoryOptimization) * 0.25;
        return ((salesIncrease + inventoryOptimization - implementationCost) / implementationCost) * 100;
      },
      metrics: ['Incremento en Ventas', 'Optimización de Inventario', 'Satisfacción del Cliente'],
      timeframes: ['3 meses', '6 meses', '1 año']
    }
  },
  {
    id: 'logistics',
    name: 'Logística y Transporte',
    icon: <Truck className="w-6 h-6" />,
    description: 'Optimiza rutas y reduce costos de transporte',
    fields: [
      {
        id: 'monthlyDeliveries',
        label: 'Entregas Mensuales',
        type: 'number',
        placeholder: '500',
        required: true,
        unit: 'entregas'
      },
      {
        id: 'averageDistance',
        label: 'Distancia Promedio por Entrega',
        type: 'number',
        placeholder: '50',
        required: true,
        unit: 'km'
      },
      {
        id: 'fuelCost',
        label: 'Costo de Combustible por Litro',
        type: 'number',
        placeholder: '1.2',
        required: true,
        unit: 'USD'
      },
      {
        id: 'deliveryTime',
        label: 'Tiempo Promedio de Entrega',
        type: 'number',
        placeholder: '2',
        required: true,
        unit: 'horas'
      }
    ],
    calculations: {
      formula: (data) => {
        const routeOptimization = data.averageDistance * 0.15;
        const fuelSavings = routeOptimization * data.monthlyDeliveries * data.fuelCost * 12;
        const timeSavings = data.deliveryTime * 0.2 * data.monthlyDeliveries * 25 * 12;
        const implementationCost = (fuelSavings + timeSavings) * 0.2;
        return ((fuelSavings + timeSavings - implementationCost) / implementationCost) * 100;
      },
      metrics: ['Ahorro en Combustible', 'Optimización de Rutas', 'Reducción de Tiempos'],
      timeframes: ['3 meses', '6 meses', '1 año']
    }
  },
  {
    id: 'healthcare',
    name: 'Salud',
    icon: <Heart className="w-6 h-6" />,
    description: 'Mejora la atención al paciente y optimiza recursos médicos',
    fields: [
      {
        id: 'monthlyPatients',
        label: 'Pacientes Mensuales',
        type: 'number',
        placeholder: '200',
        required: true,
        unit: 'pacientes'
      },
      {
        id: 'waitTime',
        label: 'Tiempo de Espera Promedio',
        type: 'number',
        placeholder: '45',
        required: true,
        unit: 'minutos'
      },
      {
        id: 'staffCount',
        label: 'Personal Médico',
        type: 'number',
        placeholder: '10',
        required: true,
        unit: 'personas'
      },
      {
        id: 'diagnosticAccuracy',
        label: 'Precisión Diagnóstica Actual',
        type: 'number',
        placeholder: '85',
        required: true,
        unit: '%'
      }
    ],
    calculations: {
      formula: (data) => {
        const efficiencyGain = data.waitTime * 0.3;
        const patientThroughput = data.monthlyPatients * (efficiencyGain / 60) * 50 * 12;
        const accuracyImprovement = (95 - data.diagnosticAccuracy) * data.monthlyPatients * 100 * 12;
        const implementationCost = (patientThroughput + accuracyImprovement) * 0.3;
        return ((patientThroughput + accuracyImprovement - implementationCost) / implementationCost) * 100;
      },
      metrics: ['Eficiencia Operativa', 'Precisión Diagnóstica', 'Satisfacción del Paciente'],
      timeframes: ['6 meses', '1 año', '2 años']
    }
  },
  {
    id: 'education',
    name: 'Educación',
    icon: <GraduationCap className="w-6 h-6" />,
    description: 'Personaliza el aprendizaje y mejora los resultados académicos',
    fields: [
      {
        id: 'studentCount',
        label: 'Número de Estudiantes',
        type: 'number',
        placeholder: '500',
        required: true,
        unit: 'estudiantes'
      },
      {
        id: 'passRate',
        label: 'Tasa de Aprobación Actual',
        type: 'number',
        placeholder: '75',
        required: true,
        unit: '%'
      },
      {
        id: 'teacherWorkload',
        label: 'Carga de Trabajo del Profesor',
        type: 'select',
        placeholder: 'Selecciona nivel',
        required: true,
        options: [
          { value: 'low', label: 'Baja (0-25%)' },
          { value: 'medium', label: 'Media (26-50%)' },
          { value: 'high', label: 'Alta (51-75%)' },
          { value: 'very-high', label: 'Muy Alta (76-100%)' }
        ]
      },
      {
        id: 'tuitionFee',
        label: 'Matrícula Promedio',
        type: 'number',
        placeholder: '5000',
        required: true,
        unit: 'USD/año'
      }
    ],
    calculations: {
      formula: (data) => {
        const retentionImprovement = (90 - data.passRate) * 0.01;
        const revenueIncrease = data.studentCount * retentionImprovement * data.tuitionFee;
        const efficiencyGain = data.studentCount * 200 * 12;
        const implementationCost = (revenueIncrease + efficiencyGain) * 0.25;
        return ((revenueIncrease + efficiencyGain - implementationCost) / implementationCost) * 100;
      },
      metrics: ['Retención de Estudiantes', 'Eficiencia Docente', 'Resultados Académicos'],
      timeframes: ['6 meses', '1 año', '2 años']
    }
  }
];

export default function ROICalculator() {
  const [selectedIndustry, setSelectedIndustry] = useState<string>('');
  const [formData, setFormData] = useState<Record<string, any>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isCalculating, setIsCalculating] = useState(false);
  const [results, setResults] = useState<CalculationResult | null>(null);
  const [showEmailCapture, setShowEmailCapture] = useState(false);
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);

  const selectedIndustryData = industries.find(ind => ind.id === selectedIndustry);

  // Validación en tiempo real
  const validateField = (fieldId: string, value: any): string | null => {
    const field = selectedIndustryData?.fields.find(f => f.id === fieldId);
    if (!field) return null;

    if (field.required && (!value || value === '')) {
      return 'Este campo es requerido';
    }

    if (field.type === 'number' && value) {
      const numValue = parseFloat(value);
      if (isNaN(numValue) || numValue < 0) {
        return 'Ingresa un número válido mayor a 0';
      }
    }

    if (field.validation) {
      return field.validation(value);
    }

    return null;
  };

  const handleInputChange = (fieldId: string, value: any) => {
    setFormData(prev => ({ ...prev, [fieldId]: value }));
    
    const error = validateField(fieldId, value);
    setErrors(prev => ({
      ...prev,
      [fieldId]: error || ''
    }));
  };

  const isFormValid = () => {
    if (!selectedIndustryData) return false;
    
    return selectedIndustryData.fields.every(field => {
      const value = formData[field.id];
      return !field.required || (value && value !== '');
    });
  };

  const calculateROI = async () => {
    if (!selectedIndustryData || !isFormValid()) return;

    setIsCalculating(true);
    
    // Simular cálculo
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const roi = selectedIndustryData.calculations.formula(formData);
    const savings = roi * 1000; // Simulación
    const paybackPeriod = 12 / (roi / 100);
    const annualBenefit = savings * 12;
    
    const result: CalculationResult = {
      roi,
      savings,
      paybackPeriod,
      annualBenefit,
      metrics: {
        'Ahorro Anual': annualBenefit,
        'Período de Recuperación': paybackPeriod,
        'Beneficio Neto': annualBenefit - (savings * 0.3)
      },
      recommendations: [
        'Implementar en fases para minimizar riesgos',
        'Capacitar al personal en nuevas tecnologías',
        'Establecer métricas de seguimiento continuo'
      ]
    };
    
    setResults(result);
    setIsCalculating(false);
  };

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !results) return;

    setIsSubmitting(true);
    
    try {
      // Enviar datos al CRM
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          name: 'Usuario Calculadora ROI',
          message: `ROI Calculado: ${results.roi.toFixed(1)}% - Industria: ${selectedIndustryData?.name}`,
          source: 'roi-calculator',
          industry: selectedIndustry,
          roi: results.roi,
          formData
        })
      });

      if (response.ok) {
        // Generar reporte descargable
        const reportData = {
          industry: selectedIndustryData?.name,
          email,
          results,
          formData,
          timestamp: new Date().toISOString()
        };
        
        const reportBlob = new Blob([JSON.stringify(reportData, null, 2)], {
          type: 'application/json'
        });
        
        const url = URL.createObjectURL(reportBlob);
        setDownloadUrl(url);
        
        setShowEmailCapture(false);
      }
    } catch (error) {
      console.error('Error al enviar datos:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const downloadReport = () => {
    if (downloadUrl) {
      const a = document.createElement('a');
      a.href = downloadUrl;
      a.download = `roi-report-${selectedIndustry}-${Date.now()}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }
  };

  return (
    <section className="py-20 bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-full mb-6">
              <Calculator className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Calculadora de ROI de IA
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Descubre el potencial retorno de inversión de implementar soluciones de IA en tu industria. 
              Nuestras calculadoras especializadas te ayudarán a tomar decisiones informadas.
            </p>
          </motion.div>

          {/* Selector de Industria */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-12"
          >
            <h3 className="text-2xl font-semibold text-gray-900 mb-6 text-center">
              Selecciona tu Industria
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {industries.map((industry) => (
                <motion.button
                  key={industry.id}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    setSelectedIndustry(industry.id);
                    setFormData({});
                    setErrors({});
                    setResults(null);
                  }}
                  className={`p-6 rounded-xl border-2 transition-all duration-300 ${
                    selectedIndustry === industry.id
                      ? 'border-blue-500 bg-blue-50 shadow-lg'
                      : 'border-gray-200 bg-white hover:border-blue-300 hover:shadow-md'
                  }`}
                >
                  <div className="flex items-center mb-4">
                    <div className={`p-3 rounded-lg mr-4 ${
                      selectedIndustry === industry.id ? 'bg-blue-500' : 'bg-gray-100'
                    }`}>
                      <div className={selectedIndustry === industry.id ? 'text-white' : 'text-gray-600'}>
                        {industry.icon}
                      </div>
                    </div>
                    <h4 className="text-lg font-semibold text-gray-900">
                      {industry.name}
                    </h4>
                  </div>
                  <p className="text-gray-600 text-sm">
                    {industry.description}
                  </p>
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* Formulario de Cálculo */}
          {selectedIndustryData && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-2xl shadow-xl p-8 mb-8"
            >
              <div className="flex items-center mb-6">
                <div className="p-3 bg-blue-500 rounded-lg mr-4">
                  <div className="text-white">
                    {selectedIndustryData.icon}
                  </div>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">
                    {selectedIndustryData.name}
                  </h3>
                  <p className="text-gray-600">
                    {selectedIndustryData.description}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                {selectedIndustryData.fields.map((field) => (
                  <div key={field.id} className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                      {field.label}
                      {field.required && <span className="text-red-500 ml-1">*</span>}
                    </label>
                    
                    {field.type === 'select' ? (
                      <select
                        value={formData[field.id] || ''}
                        onChange={(e) => handleInputChange(field.id, e.target.value)}
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                          errors[field.id] ? 'border-red-500' : 'border-gray-300'
                        }`}
                      >
                        <option value="">{field.placeholder}</option>
                        {field.options?.map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                    ) : (
                      <div className="relative">
                        <input
                          type={field.type}
                          value={formData[field.id] || ''}
                          onChange={(e) => handleInputChange(field.id, e.target.value)}
                          placeholder={field.placeholder}
                          className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                            errors[field.id] ? 'border-red-500' : 'border-gray-300'
                          }`}
                        />
                        {field.unit && (
                          <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-sm">
                            {field.unit}
                          </div>
                        )}
                      </div>
                    )}
                    
                    {errors[field.id] && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex items-center text-red-500 text-sm"
                      >
                        <AlertCircle className="w-4 h-4 mr-1" />
                        {errors[field.id]}
                      </motion.div>
                    )}
                  </div>
                ))}
              </div>

              <div className="text-center">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={calculateROI}
                  disabled={!isFormValid() || isCalculating}
                  className={`inline-flex items-center px-8 py-4 rounded-lg font-semibold text-white transition-all duration-300 ${
                    isFormValid() && !isCalculating
                      ? 'bg-blue-600 hover:bg-blue-700 shadow-lg hover:shadow-xl'
                      : 'bg-gray-400 cursor-not-allowed'
                  }`}
                >
                  {isCalculating ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                      Calculando ROI...
                    </>
                  ) : (
                    <>
                      <TrendingUp className="w-5 h-5 mr-2" />
                      Calcular ROI
                    </>
                  )}
                </motion.button>
              </div>
            </motion.div>
          )}

          {/* Resultados */}
          <AnimatePresence>
            {results && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="bg-white rounded-2xl shadow-xl p-8 mb-8"
              >
                <div className="text-center mb-8">
                  <h3 className="text-3xl font-bold text-gray-900 mb-4">
                    ¡Resultados de tu ROI!
                  </h3>
                  <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-4">
                    <TrendingUp className="w-10 h-10 text-green-600" />
                  </div>
                </div>

                {/* Métricas Principales */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.1 }}
                    className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-6 text-white text-center"
                  >
                    <div className="text-3xl font-bold mb-2">
                      {results.roi.toFixed(1)}%
                    </div>
                    <div className="text-blue-100">ROI Esperado</div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2 }}
                    className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl p-6 text-white text-center"
                  >
                    <div className="text-3xl font-bold mb-2">
                      ${results.annualBenefit.toLocaleString()}
                    </div>
                    <div className="text-green-100">Beneficio Anual</div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.3 }}
                    className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl p-6 text-white text-center"
                  >
                    <div className="text-3xl font-bold mb-2">
                      {results.paybackPeriod.toFixed(1)}
                    </div>
                    <div className="text-purple-100">Meses de Recuperación</div>
                  </motion.div>
                </div>

                {/* Gráfico de Métricas */}
                <div className="mb-8">
                  <h4 className="text-xl font-semibold text-gray-900 mb-4">
                    Desglose de Beneficios
                  </h4>
                  <div className="space-y-4">
                    {Object.entries(results.metrics).map(([key, value], index) => (
                      <motion.div
                        key={key}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 * index }}
                        className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                      >
                        <span className="font-medium text-gray-700">{key}</span>
                        <span className="font-bold text-gray-900">
                          {typeof value === 'number' && key.includes('$') 
                            ? `$${value.toLocaleString()}`
                            : typeof value === 'number' && key.includes('Meses')
                            ? `${value.toFixed(1)} meses`
                            : value.toLocaleString()
                          }
                        </span>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Recomendaciones */}
                <div className="mb-8">
                  <h4 className="text-xl font-semibold text-gray-900 mb-4">
                    Recomendaciones de Implementación
                  </h4>
                  <div className="space-y-3">
                    {results.recommendations.map((rec, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 * index }}
                        className="flex items-start"
                      >
                        <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700">{rec}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Captura de Email */}
                {!showEmailCapture && !downloadUrl && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center"
                  >
                    <button
                      onClick={() => setShowEmailCapture(true)}
                      className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                    >
                      <Mail className="w-5 h-5 mr-2" />
                      Obtener Reporte Detallado
                    </button>
                  </motion.div>
                )}

                {/* Formulario de Email */}
                <AnimatePresence>
                  {showEmailCapture && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      className="bg-gray-50 rounded-xl p-6"
                    >
                      <h4 className="text-xl font-semibold text-gray-900 mb-4 text-center">
                        Descarga tu Reporte Personalizado
                      </h4>
                      <form onSubmit={handleEmailSubmit} className="max-w-md mx-auto">
                        <div className="mb-4">
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Correo Electrónico
                          </label>
                          <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="tu@email.com"
                          />
                        </div>
                        <button
                          type="submit"
                          disabled={isSubmitting || !email}
                          className={`w-full px-6 py-3 rounded-lg font-semibold text-white transition-colors ${
                            email && !isSubmitting
                              ? 'bg-blue-600 hover:bg-blue-700'
                              : 'bg-gray-400 cursor-not-allowed'
                          }`}
                        >
                          {isSubmitting ? 'Enviando...' : 'Descargar Reporte'}
                        </button>
                      </form>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Descarga */}
                {downloadUrl && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center"
                  >
                    <div className="bg-green-50 border border-green-200 rounded-xl p-6 mb-4">
                      <div className="flex items-center justify-center mb-2">
                        <CheckCircle className="w-6 h-6 text-green-500 mr-2" />
                        <span className="text-green-800 font-semibold">
                          ¡Reporte Listo!
                        </span>
                      </div>
                      <p className="text-green-700">
                        Tu reporte personalizado ha sido generado. También hemos enviado una copia a tu correo.
                      </p>
                    </div>
                    <button
                      onClick={downloadReport}
                      className="inline-flex items-center px-6 py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition-colors"
                    >
                      <Download className="w-5 h-5 mr-2" />
                      Descargar Reporte
                    </button>
                  </motion.div>
                )}
              </motion.div>
            )}
          </AnimatePresence>

          {/* CTA Final */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-center"
          >
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white">
              <h3 className="text-2xl font-bold mb-4">
                ¿Listo para Transformar tu Negocio con IA?
              </h3>
              <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
                Nuestro equipo de expertos está listo para ayudarte a implementar las soluciones de IA 
                que maximicen tu ROI y transformen tu operación.
              </p>
              <button className="inline-flex items-center px-8 py-4 bg-white text-blue-600 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                <Users className="w-5 h-5 mr-2" />
                Hablar con un Experto
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
} 