import { Metadata } from 'next'
import { StatusPage } from '@/components/confianza/status-page'
import { ComplianceSection } from '@/components/confianza/compliance-section'
import { SecuritySection } from '@/components/confianza/security-section'
import TrustIndicators from '@/components/confianza/trust-indicators'

export const metadata: Metadata = {
  title: 'Centro de Confianza | Si Tu Supieras El Poder de la IA',
  description: 'Transparencia total en seguridad, cumplimiento y operaciones. Certificaciones SOC 2, ISO 27001, GDPR y más.',
  keywords: 'seguridad, cumplimiento, SOC 2, ISO 27001, GDPR, confianza, transparencia, certificaciones',
}

export default function ConfianzaPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="mb-8">
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
                Centro de <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">Confianza</span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
                Transparencia total en seguridad, cumplimiento y operaciones. 
                Construimos confianza a través de la apertura y la excelencia técnica.
              </p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12 max-w-4xl mx-auto">
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-green-400 mb-2">99.99%</div>
                <div className="text-gray-400 text-sm">Uptime Garantizado</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-blue-400 mb-2">24/7</div>
                <div className="text-gray-400 text-sm">Monitoreo</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-purple-400 mb-2">SOC 2</div>
                <div className="text-gray-400 text-sm">Certificado</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-pink-400 mb-2">ISO 27001</div>
                <div className="text-gray-400 text-sm">Acreditado</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Indicators */}
      <TrustIndicators />

      {/* Status Page */}
      <StatusPage />

      {/* Compliance Section */}
      <ComplianceSection />

      {/* Security Section */}
      <SecuritySection />

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-purple-50 to-blue-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              ¿Necesitas Información Específica?
            </h2>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Nuestro equipo de cumplimiento está disponible para responder cualquier pregunta 
              sobre seguridad, certificaciones o políticas.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold rounded-xl hover:from-purple-700 hover:to-blue-700 transition-all duration-300 transform hover:scale-105">
                Solicitar Documentación
              </button>
              <button className="px-8 py-4 border-2 border-purple-600 text-purple-600 font-semibold rounded-xl hover:bg-purple-600 hover:text-white transition-all duration-300">
                Contactar Equipo Legal
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
} 