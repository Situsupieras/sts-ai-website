'use client'

import { useState, useEffect } from 'react'

interface TrustMetric {
  id: string
  name: string
  value: string
  unit: string
  description: string
  trend: 'up' | 'down' | 'stable'
  change: string
}

interface SecurityBadge {
  id: string
  name: string
  issuer: string
  image: string
  validUntil: string
  description: string
}

export function TrustIndicators() {
  const [metrics, setMetrics] = useState<TrustMetric[]>([
    {
      id: 'uptime',
      name: 'Uptime',
      value: '99.99',
      unit: '%',
      description: 'Tiempo de actividad del último mes',
      trend: 'up',
      change: '+0.01%'
    },
    {
      id: 'response-time',
      name: 'Tiempo de Respuesta',
      value: '45',
      unit: 'ms',
      description: 'Latencia promedio de la API',
      trend: 'down',
      change: '-5ms'
    },
    {
      id: 'security-score',
      name: 'Puntuación de Seguridad',
      value: '98',
      unit: '/100',
      description: 'Evaluación independiente de seguridad',
      trend: 'up',
      change: '+2'
    },
    {
      id: 'compliance',
      name: 'Cumplimiento',
      value: '100',
      unit: '%',
      description: 'Certificaciones activas',
      trend: 'stable',
      change: '0%'
    }
  ])

  const [badges, setBadges] = useState<SecurityBadge[]>([
    {
      id: 'soc2',
      name: 'SOC 2 Type II',
      issuer: 'AICPA',
      image: '/badges/soc2.png',
      validUntil: '2025-12-31',
      description: 'Certificación de controles de seguridad'
    },
    {
      id: 'iso27001',
      name: 'ISO 27001',
      issuer: 'ISO',
      image: '/badges/iso27001.png',
      validUntil: '2026-06-30',
      description: 'Gestión de seguridad de la información'
    },
    {
      id: 'gdpr',
      name: 'GDPR Compliance',
      issuer: 'EU',
      image: '/badges/gdpr.png',
      validUntil: '2025-12-31',
      description: 'Cumplimiento de protección de datos'
    },
    {
      id: 'pci-dss',
      name: 'PCI DSS Level 1',
      issuer: 'PCI Security Standards Council',
      image: '/badges/pci-dss.png',
      validUntil: '2025-09-30',
      description: 'Estándar de seguridad de pagos'
    }
  ])

  const getTrendColor = (trend: string) => {
    switch (trend) {
      case 'up': return 'text-green-600'
      case 'down': return 'text-red-600'
      case 'stable': return 'text-gray-600'
      default: return 'text-gray-600'
    }
  }

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return '↗'
      case 'down': return '↘'
      case 'stable': return '→'
      default: return '→'
    }
  }

  return (
    <section className="py-16 bg-white border-b border-gray-200">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Trust Metrics */}
          <div className="grid md:grid-cols-4 gap-6 mb-12">
            {metrics.map((metric) => (
              <div key={metric.id} className="text-center p-6 bg-gradient-to-br from-gray-50 to-white rounded-xl border border-gray-200">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <div className="text-3xl font-bold text-gray-900">
                    {metric.value}{metric.unit}
                  </div>
                  <div className={`text-sm font-medium ${getTrendColor(metric.trend)}`}>
                    {getTrendIcon(metric.trend)} {metric.change}
                  </div>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{metric.name}</h3>
                <p className="text-sm text-gray-600">{metric.description}</p>
              </div>
            ))}
          </div>

          {/* Security Badges */}
          <div className="bg-gradient-to-r from-slate-50 to-gray-50 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-gray-900 text-center mb-8">
              Certificaciones y Badges de Seguridad
            </h3>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {badges.map((badge) => (
                <div key={badge.id} className="bg-white rounded-xl p-6 text-center border border-gray-200 hover:shadow-lg transition-shadow">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-white font-bold text-lg">
                      {badge.name.split(' ')[0].charAt(0)}
                    </span>
                  </div>
                  
                  <h4 className="font-semibold text-gray-900 mb-2">{badge.name}</h4>
                  <p className="text-sm text-gray-600 mb-3">{badge.description}</p>
                  
                  <div className="text-xs text-gray-500 mb-3">
                    <div>Emitido por: {badge.issuer}</div>
                    <div>Válido hasta: {new Date(badge.validUntil).toLocaleDateString('es-ES')}</div>
                  </div>
                  
                  <button className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm">
                    Ver Certificado
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Trust Signals */}
          <div className="mt-12 grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2">Verificación Independiente</h4>
              <p className="text-gray-600 text-sm">
                Todas nuestras certificaciones son auditadas por firmas independientes de renombre mundial
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                </svg>
              </div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2">Transparencia Total</h4>
              <p className="text-gray-600 text-sm">
                Acceso completo a nuestros informes de seguridad y políticas de cumplimiento
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
                </svg>
              </div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2">Seguridad Proactiva</h4>
              <p className="text-gray-600 text-sm">
                Monitoreo 24/7 y actualizaciones continuas para mantener la máxima seguridad
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
} 