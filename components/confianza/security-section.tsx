'use client'

import React, { useState } from 'react'

interface SecurityControl {
  id: string
  category: 'encryption' | 'access' | 'network' | 'monitoring' | 'incident'
  name: string
  description: string
  status: 'implemented' | 'in-progress' | 'planned'
  details: string[]
}

interface DataPolicy {
  id: string
  name: string
  description: string
  lastUpdated: string
  version: string
  url: string
}

export function SecuritySection() {
  const [selectedCategory, setSelectedCategory] = useState('all')

  const securityControls: SecurityControl[] = [
    {
      id: 'encryption-at-rest',
      category: 'encryption',
      name: 'Cifrado en Reposo',
      description: 'Todos los datos sensibles están cifrados usando AES-256',
      status: 'implemented',
      details: [
        'AES-256 para datos en reposo',
        'Claves gestionadas por AWS KMS',
        'Rotación automática de claves cada 90 días',
        'Cifrado de base de datos PostgreSQL',
        'Cifrado de archivos de backup'
      ]
    },
    {
      id: 'encryption-in-transit',
      category: 'encryption',
      name: 'Cifrado en Tránsito',
      description: 'TLS 1.3 para todas las comunicaciones',
      status: 'implemented',
      details: [
        'TLS 1.3 obligatorio',
        'Perfect Forward Secrecy (PFS)',
        'Certificados SSL/TLS de confianza',
        'HSTS habilitado',
        'CSP headers configurados'
      ]
    },
    {
      id: 'access-control',
      category: 'access',
      name: 'Control de Acceso',
      description: 'Autenticación multi-factor y autorización basada en roles',
      status: 'implemented',
      details: [
        'MFA obligatorio para todos los usuarios',
        'RBAC (Role-Based Access Control)',
        'Principio de menor privilegio',
        'Revisión trimestral de accesos',
        'Integración con SSO empresarial'
      ]
    },
    {
      id: 'network-security',
      category: 'network',
      name: 'Seguridad de Red',
      description: 'Firewalls, segmentación y monitoreo de red',
      status: 'implemented',
      details: [
        'Firewalls de nueva generación',
        'Segmentación de red por entorno',
        'VPN para acceso remoto',
        'DDoS protection activa',
        'Monitoreo de tráfico en tiempo real'
      ]
    },
    {
      id: 'monitoring',
      category: 'monitoring',
      name: 'Monitoreo y Detección',
      description: 'SIEM y detección de amenazas 24/7',
      status: 'implemented',
      details: [
        'SIEM centralizado (Splunk)',
        'Detección de anomalías con IA',
        'Alertas en tiempo real',
        'Logs centralizados y retenidos',
        'Análisis forense automatizado'
      ]
    },
    {
      id: 'incident-response',
      category: 'incident',
      name: 'Respuesta a Incidentes',
      description: 'Proceso formal de respuesta y recuperación',
      status: 'implemented',
      details: [
        'Equipo CSIRT dedicado',
        'Procedimientos documentados',
        'Simulacros trimestrales',
        'Comunicación automática a stakeholders',
        'Análisis post-incidente obligatorio'
      ]
    }
  ]

  const dataPolicies: DataPolicy[] = [
    {
      id: 'privacy-policy',
      name: 'Política de Privacidad',
      description: 'Cómo recopilamos, usamos y protegemos tus datos personales',
      lastUpdated: '2025-01-15',
      version: '3.2',
      url: '/politica-privacidad'
    },
    {
      id: 'data-processing',
      name: 'Acuerdo de Procesamiento de Datos',
      description: 'Términos para el procesamiento de datos según GDPR',
      lastUpdated: '2025-01-15',
      version: '2.1',
      url: '/acuerdo-procesamiento'
    },
    {
      id: 'security-policy',
      name: 'Política de Seguridad',
      description: 'Medidas de seguridad implementadas para proteger datos',
      lastUpdated: '2025-01-15',
      version: '4.0',
      url: '/politica-seguridad'
    },
    {
      id: 'data-retention',
      name: 'Política de Retención de Datos',
      description: 'Períodos de retención y eliminación de datos',
      lastUpdated: '2025-01-15',
      version: '2.3',
      url: '/retencion-datos'
    }
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'implemented': return 'text-green-600 bg-green-100'
      case 'in-progress': return 'text-yellow-600 bg-yellow-100'
      case 'planned': return 'text-blue-600 bg-blue-100'
      default: return 'text-gray-600 bg-gray-100'
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'encryption': return 'bg-purple-100 text-purple-800'
      case 'access': return 'bg-blue-100 text-blue-800'
      case 'network': return 'bg-green-100 text-green-800'
      case 'monitoring': return 'bg-orange-100 text-orange-800'
      case 'incident': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const filteredControls = selectedCategory === 'all' 
    ? securityControls 
    : securityControls.filter(control => control.category === selectedCategory)

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Seguridad y Postura de Datos
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Implementamos las mejores prácticas de seguridad de la industria 
              para proteger tus datos y mantener la confianza.
            </p>
          </div>

          {/* Security Posture Overview */}
          <div className="bg-gradient-to-r from-slate-50 to-gray-50 rounded-2xl p-8 mb-16">
            <div className="grid md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600 mb-2">100%</div>
                <div className="text-gray-600">Cifrado de Datos</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600 mb-2">24/7</div>
                <div className="text-gray-600">Monitoreo</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600 mb-2">99.9%</div>
                <div className="text-gray-600">Uptime</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-orange-600 mb-2">&lt; 15min</div>
                <div className="text-gray-600">Tiempo Respuesta</div>
              </div>
            </div>
          </div>

          {/* Security Controls */}
          <div className="mb-16">
            <h3 className="text-2xl font-bold text-gray-900 mb-8">
              Controles de Seguridad
            </h3>

            {/* Category Filter */}
            <div className="flex flex-wrap gap-3 mb-8">
              <button
                onClick={() => setSelectedCategory('all')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  selectedCategory === 'all'
                    ? 'bg-gray-900 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Todos
              </button>
              <button
                onClick={() => setSelectedCategory('encryption')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  selectedCategory === 'encryption'
                    ? 'bg-purple-600 text-white'
                    : 'bg-purple-100 text-purple-700 hover:bg-purple-200'
                }`}
              >
                Cifrado
              </button>
              <button
                onClick={() => setSelectedCategory('access')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  selectedCategory === 'access'
                    ? 'bg-blue-600 text-white'
                    : 'bg-blue-100 text-blue-700 hover:bg-blue-200'
                }`}
              >
                Acceso
              </button>
              <button
                onClick={() => setSelectedCategory('network')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  selectedCategory === 'network'
                    ? 'bg-green-600 text-white'
                    : 'bg-green-100 text-green-700 hover:bg-green-200'
                }`}
              >
                Red
              </button>
              <button
                onClick={() => setSelectedCategory('monitoring')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  selectedCategory === 'monitoring'
                    ? 'bg-orange-600 text-white'
                    : 'bg-orange-100 text-orange-700 hover:bg-orange-200'
                }`}
              >
                Monitoreo
              </button>
              <button
                onClick={() => setSelectedCategory('incident')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  selectedCategory === 'incident'
                    ? 'bg-red-600 text-white'
                    : 'bg-red-100 text-red-700 hover:bg-red-200'
                }`}
              >
                Incidentes
              </button>
            </div>

            {/* Controls Grid */}
            <div className="grid md:grid-cols-2 gap-6">
              {filteredControls.map((control) => (
                <div key={control.id} className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-shadow">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h4 className="text-lg font-semibold text-gray-900 mb-2">{control.name}</h4>
                      <p className="text-gray-600 mb-3">{control.description}</p>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(control.status)}`}>
                        {control.status === 'implemented' ? 'Implementado' : 
                         control.status === 'in-progress' ? 'En Progreso' : 'Planificado'}
                      </span>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${getCategoryColor(control.category)}`}>
                        {control.category.toUpperCase()}
                      </span>
                    </div>
                  </div>
                  
                  <div>
                    <h5 className="font-medium text-gray-900 mb-3">Detalles de Implementación:</h5>
                    <ul className="space-y-2">
                      {control.details.map((detail, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                          <span className="text-sm text-gray-700">{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Data Policies */}
          <div className="mb-16">
            <h3 className="text-2xl font-bold text-gray-900 mb-8">
              Políticas de Datos y Cumplimiento
            </h3>
            
            <div className="grid md:grid-cols-2 gap-6">
              {dataPolicies.map((policy) => (
                <div key={policy.id} className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-shadow">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h4 className="text-lg font-semibold text-gray-900 mb-2">{policy.name}</h4>
                      <p className="text-gray-600 mb-3">{policy.description}</p>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-gray-500">v{policy.version}</div>
                      <div className="text-sm text-gray-500">
                        {new Date(policy.lastUpdated).toLocaleDateString('es-ES')}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex gap-3">
                    <button className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm">
                      Ver Política
                    </button>
                    <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm">
                      Descargar PDF
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Incident Response Timeline */}
          <div className="bg-gradient-to-r from-red-50 to-orange-50 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">
              Proceso de Respuesta a Incidentes
            </h3>
            
            <div className="grid md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-red-600 font-bold">1</span>
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">Detección</h4>
                <p className="text-gray-600 text-sm">
                  Monitoreo 24/7 detecta incidentes automáticamente
                </p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-orange-600 font-bold">2</span>
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">Evaluación</h4>
                <p className="text-gray-600 text-sm">
                  Equipo CSIRT evalúa severidad y impacto
                </p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-yellow-600 font-bold">3</span>
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">Contención</h4>
                <p className="text-gray-600 text-sm">
                  Medidas inmediatas para limitar el impacto
                </p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-green-600 font-bold">4</span>
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">Resolución</h4>
                <p className="text-gray-600 text-sm">
                  Eliminación de la amenaza y restauración
                </p>
              </div>
            </div>
            
            <div className="mt-8 text-center">
              <p className="text-gray-600 mb-4">
                Tiempo promedio de respuesta: <span className="font-semibold text-gray-900">15 minutos</span>
              </p>
              <button className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
                Reportar Incidente
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
} 