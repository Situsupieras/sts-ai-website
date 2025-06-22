import React from 'react';
import { Metadata } from 'next';
import ROICalculator from '@/components/sections/roi-calculator';
import CalculatorStats from '@/components/sections/calculator-stats';

export const metadata: Metadata = {
  title: 'Calculadoras de ROI de IA | Si Tus Supieras El Poder de la IA',
  description: 'Calcula el retorno de inversión de implementar soluciones de IA en tu industria. Herramientas especializadas para manufactura, retail, logística, salud y educación.',
  keywords: 'calculadora ROI IA, retorno inversión inteligencia artificial, ROI manufactura, ROI retail, ROI logística, ROI salud, ROI educación',
  openGraph: {
    title: 'Calculadoras de ROI de IA | Si Tus Supieras El Poder de la IA',
    description: 'Descubre cuánto puedes ahorrar implementando IA en tu negocio. Calculadoras especializadas por industria.',
    type: 'website',
    url: 'https://situsupieras.com/calculadoras',
    images: [
      {
        url: '/og-calculadoras.jpg',
        width: 1200,
        height: 630,
        alt: 'Calculadoras de ROI de IA'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Calculadoras de ROI de IA | Si Tus Supieras El Poder de la IA',
    description: 'Descubre cuánto puedes ahorrar implementando IA en tu negocio.',
    images: ['/og-calculadoras.jpg']
  }
};

export default function CalculadorasPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Hero Section */}
      <section className="pt-20 pb-12 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Calculadoras de ROI de IA
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 mb-8">
              Descubre el potencial retorno de inversión de implementar soluciones de inteligencia artificial 
              en tu industria con nuestras calculadoras especializadas.
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <span className="bg-white/20 px-4 py-2 rounded-full">Manufactura</span>
              <span className="bg-white/20 px-4 py-2 rounded-full">Retail</span>
              <span className="bg-white/20 px-4 py-2 rounded-full">Logística</span>
              <span className="bg-white/20 px-4 py-2 rounded-full">Salud</span>
              <span className="bg-white/20 px-4 py-2 rounded-full">Educación</span>
            </div>
          </div>
        </div>
      </section>

      {/* Breadcrumb */}
      <section className="py-4 bg-white border-b">
        <div className="container mx-auto px-4">
          <nav className="text-sm text-gray-600">
            <ol className="flex items-center space-x-2">
              <li>
                <a href="/" className="hover:text-blue-600 transition-colors">
                  Inicio
                </a>
              </li>
              <li>
                <span className="text-gray-400">/</span>
              </li>
              <li>
                <span className="text-gray-900 font-medium">Calculadoras de ROI</span>
              </li>
            </ol>
          </nav>
        </div>
      </section>

      {/* Calculadora Principal */}
      <ROICalculator />

      {/* Estadísticas de Calculadoras */}
      <CalculatorStats />

      {/* Información Adicional */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                  ¿Por qué usar nuestras calculadoras de ROI?
                </h2>
                <div className="space-y-6">
                  <div className="flex items-start">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-4 mt-1">
                      <span className="text-blue-600 font-bold text-sm">1</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">
                        Algoritmos Especializados
                      </h3>
                      <p className="text-gray-600">
                        Cada calculadora utiliza fórmulas específicas desarrolladas por expertos en IA 
                        y análisis financiero para tu industria.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-4 mt-1">
                      <span className="text-blue-600 font-bold text-sm">2</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">
                        Datos en Tiempo Real
                      </h3>
                      <p className="text-gray-600">
                        Nuestros cálculos se basan en datos actuales del mercado y tendencias 
                        de implementación de IA en cada sector.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-4 mt-1">
                      <span className="text-blue-600 font-bold text-sm">3</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">
                        Reportes Personalizados
                      </h3>
                      <p className="text-gray-600">
                        Recibe un análisis detallado con recomendaciones específicas para tu caso 
                        y métricas de seguimiento.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-2xl p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">
                  Métricas que Calculamos
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-white rounded-lg">
                    <span className="font-medium text-gray-700">ROI Esperado</span>
                    <span className="text-green-600 font-bold">150-300%</span>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-white rounded-lg">
                    <span className="font-medium text-gray-700">Período de Recuperación</span>
                    <span className="text-blue-600 font-bold">6-18 meses</span>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-white rounded-lg">
                    <span className="font-medium text-gray-700">Ahorro Anual</span>
                    <span className="text-purple-600 font-bold">$50K - $500K</span>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-white rounded-lg">
                    <span className="font-medium text-gray-700">Eficiencia Operativa</span>
                    <span className="text-orange-600 font-bold">+25-40%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
              Preguntas Frecuentes
            </h2>
            
            <div className="space-y-6">
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  ¿Qué tan precisos son los cálculos de ROI?
                </h3>
                <p className="text-gray-600">
                  Nuestras calculadoras utilizan algoritmos basados en datos reales de implementaciones 
                  de IA en diferentes industrias. Los resultados son estimaciones conservadoras que 
                  consideran factores como costos de implementación, tiempo de adopción y beneficios 
                  graduales.
                </p>
              </div>
              
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  ¿Puedo usar las calculadoras para múltiples industrias?
                </h3>
                <p className="text-gray-600">
                  Sí, puedes calcular el ROI para diferentes industrias. Cada calculadora está 
                  optimizada para los parámetros específicos de su sector, proporcionando resultados 
                  más precisos y relevantes.
                </p>
              </div>
              
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  ¿Qué incluye el reporte descargable?
                </h3>
                <p className="text-gray-600">
                  El reporte incluye un análisis detallado de tu ROI, desglose de beneficios por 
                  categoría, recomendaciones de implementación, cronograma sugerido y métricas de 
                  seguimiento para medir el progreso.
                </p>
              </div>
              
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  ¿Los datos que ingreso se mantienen privados?
                </h3>
                <p className="text-gray-600">
                  Absolutamente. Solo utilizamos tu correo electrónico para enviarte el reporte 
                  y contactarte sobre servicios relacionados. No compartimos tus datos con terceros 
                  ni los utilizamos para otros fines.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center text-white">
            <h2 className="text-3xl font-bold mb-6">
              ¿Listo para Transformar tu Negocio?
            </h2>
            <p className="text-xl text-blue-100 mb-8">
              Nuestro equipo de expertos está listo para ayudarte a implementar las soluciones de IA 
              que maximicen tu ROI y transformen tu operación.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/contacto"
                className="inline-flex items-center justify-center px-8 py-4 bg-white text-blue-600 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
              >
                Hablar con un Experto
              </a>
              <a
                href="/confianza"
                className="inline-flex items-center justify-center px-8 py-4 border-2 border-white text-white rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors"
              >
                Conocer Nuestro Centro de Confianza
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
} 