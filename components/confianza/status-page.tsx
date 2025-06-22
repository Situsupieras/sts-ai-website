'use client'

import { useState, useEffect } from 'react'

interface StatusData {
  status: string
  timestamp: string
  metrics: {
    uptime: number
    latency: number
    memoryUsage: number
    securityScore: number
    compliance: number
  }
  certifications: Array<{
    id: string
    name: string
    status: 'implemented' | 'in-progress' | 'planned'
    description: string
    issuer: string
    validUntil: string
    progress: number
    lastUpdated: string
  }>
  lastCheck: string
}

interface MonitoringData {
  status: string
  timestamp: string
  healthChecks: {
    website: boolean
    database: boolean
    api: boolean
    ssl: boolean
  }
  performance: {
    cpuUsage: number
    memoryUsage: number
    diskUsage: number
    networkLatency: number
    timestamp: string
  }
  incidents: Array<{
    id: string
    type: string
    description: string
    severity: string
    status: string
    timestamp: string
    resolutionTime: string
  }>
  uptime: {
    last24h: number
    last7d: number
    last30d: number
  }
}

export function StatusPage() {
  const [statusData, setStatusData] = useState<StatusData | null>(null)
  const [monitoringData, setMonitoringData] = useState<MonitoringData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        
        // Fetch status data
        const statusResponse = await fetch('/api/status')
        const statusResult = await statusResponse.json()
        
        // Fetch monitoring data
        const monitoringResponse = await fetch('/api/monitoring')
        const monitoringResult = await monitoringResponse.json()
        
        setStatusData(statusResult)
        setMonitoringData(monitoringResult)
        setError(null)
      } catch (err) {
        console.error('Error fetching status data:', err)
        setError('Error cargando datos de estado')
      } finally {
        setLoading(false)
      }
    }

    fetchData()
    
    // Refresh data every 5 minutes
    const interval = setInterval(fetchData, 5 * 60 * 1000)
    
    return () => clearInterval(interval)
  }, [])

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'operational': return 'text-green-600 bg-green-100'
      case 'degraded': return 'text-yellow-600 bg-yellow-100'
      case 'down': return 'text-red-600 bg-red-100'
      default: return 'text-gray-600 bg-gray-100'
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'operational': return 'Operativo'
      case 'degraded': return 'Degradado'
      case 'down': return 'Caído'
      default: return 'Desconocido'
    }
  }

  const getCertificationStatusColor = (status: string) => {
    switch (status) {
      case 'implemented': return 'text-green-600 bg-green-100'
      case 'in-progress': return 'text-yellow-600 bg-yellow-100'
      case 'planned': return 'text-blue-600 bg-blue-100'
      default: return 'text-gray-600 bg-gray-100'
    }
  }

  const getCertificationStatusText = (status: string) => {
    switch (status) {
      case 'implemented': return 'Implementado'
      case 'in-progress': return 'En Proceso'
      case 'planned': return 'Planificado'
      default: return 'Desconocido'
    }
  }

  if (loading) {
    return (
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto"></div>
              <p className="mt-4 text-gray-600">Cargando datos de estado...</p>
            </div>
          </div>
        </div>
      </section>
    )
  }

  if (error) {
    return (
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center">
              <div className="text-red-600 text-lg mb-4">⚠️ {error}</div>
              <button 
                onClick={() => window.location.reload()}
                className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
              >
                Reintentar
              </button>
            </div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Estado del Sistema
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Monitoreo en tiempo real de la infraestructura y servicios de Si Tu Supieras El Poder de la IA
            </p>
            <div className="mt-4 text-sm text-gray-500">
              Última actualización: {statusData?.lastCheck ? new Date(statusData.lastCheck).toLocaleString('es-ES') : 'N/A'}
            </div>
          </div>

          {/* Overall Status */}
          <div className="bg-white rounded-2xl p-8 mb-12 shadow-lg">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-gray-900">Estado General</h3>
              <span className={`px-4 py-2 rounded-full text-sm font-medium ${getStatusColor(monitoringData?.status || 'unknown')}`}>
                {getStatusText(monitoringData?.status || 'unknown')}
              </span>
            </div>
            
            <div className="grid md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600 mb-2">
                  {statusData?.metrics.uptime.toFixed(2)}%
                </div>
                <div className="text-gray-600">Uptime</div>
                <div className="text-xs text-gray-500">Último mes</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600 mb-2">
                  {statusData?.metrics.latency || 0}ms
                </div>
                <div className="text-gray-600">Tiempo de Respuesta</div>
                <div className="text-xs text-gray-500">Latencia promedio</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600 mb-2">
                  {statusData?.metrics.securityScore || 0}/100
                </div>
                <div className="text-gray-600">Puntuación de Seguridad</div>
                <div className="text-xs text-gray-500">Evaluación independiente</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-orange-600 mb-2">
                  {statusData?.metrics.compliance || 0}%
                </div>
                <div className="text-gray-600">Cumplimiento</div>
                <div className="text-xs text-gray-500">Certificaciones activas</div>
              </div>
            </div>
          </div>

          {/* Health Checks */}
          <div className="bg-white rounded-2xl p-8 mb-12 shadow-lg">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Verificaciones de Salud</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              {monitoringData?.healthChecks && Object.entries(monitoringData.healthChecks).map(([service, status]) => (
                <div key={service} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <div className="font-medium text-gray-900 capitalize">{service}</div>
                    <div className="text-sm text-gray-500">
                      {service === 'website' && 'Sitio Web'}
                      {service === 'database' && 'Base de Datos'}
                      {service === 'api' && 'API'}
                      {service === 'ssl' && 'Certificado SSL'}
                    </div>
                  </div>
                  <div className={`w-3 h-3 rounded-full ${status ? 'bg-green-500' : 'bg-red-500'}`}></div>
                </div>
              ))}
            </div>
          </div>

          {/* Performance Metrics */}
          <div className="bg-white rounded-2xl p-8 mb-12 shadow-lg">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Métricas de Rendimiento</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600 mb-2">
                  {monitoringData?.performance.cpuUsage.toFixed(1)}%
                </div>
                <div className="text-gray-600">CPU</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600 mb-2">
                  {monitoringData?.performance.memoryUsage}%
                </div>
                <div className="text-gray-600">Memoria</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600 mb-2">
                  {monitoringData?.performance.diskUsage.toFixed(1)}%
                </div>
                <div className="text-gray-600">Disco</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-600 mb-2">
                  {monitoringData?.performance.networkLatency.toFixed(0)}ms
                </div>
                <div className="text-gray-600">Red</div>
              </div>
            </div>
          </div>

          {/* Certifications */}
          <div className="bg-white rounded-2xl p-8 mb-12 shadow-lg">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Certificaciones y Badges de Seguridad</h3>
            <div className="grid md:grid-cols-2 gap-6">
              {statusData?.certifications.map((cert) => (
                <div key={cert.id} className="border border-gray-200 rounded-xl p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h4 className="text-lg font-semibold text-gray-900 mb-2">{cert.name}</h4>
                      <p className="text-gray-600 mb-3">{cert.description}</p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getCertificationStatusColor(cert.status)}`}>
                      {getCertificationStatusText(cert.status)}
                    </span>
                  </div>
                  
                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Emitido por:</span>
                      <span className="text-gray-900">{cert.issuer}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Válido hasta:</span>
                      <span className="text-gray-900">{new Date(cert.validUntil).toLocaleDateString('es-ES')}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Progreso:</span>
                      <span className="text-gray-900">{cert.progress}%</span>
                    </div>
                  </div>
                  
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${cert.progress}%` }}
                    ></div>
                  </div>
                  
                  <button className="mt-4 w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm">
                    Ver Certificado
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Incidents */}
          {monitoringData?.incidents && monitoringData.incidents.length > 0 && (
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Incidentes Recientes</h3>
              <div className="space-y-4">
                {monitoringData.incidents.map((incident) => (
                  <div key={incident.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="font-semibold text-gray-900">{incident.description}</h4>
                        <p className="text-sm text-gray-600 mt-1">
                          {new Date(incident.timestamp).toLocaleString('es-ES')}
                        </p>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                        incident.severity === 'low' ? 'text-yellow-600 bg-yellow-100' :
                        incident.severity === 'medium' ? 'text-orange-600 bg-orange-100' :
                        'text-red-600 bg-red-100'
                      }`}>
                        {incident.severity === 'low' ? 'Bajo' :
                         incident.severity === 'medium' ? 'Medio' : 'Alto'}
                      </span>
                    </div>
                    <div className="mt-2 text-sm text-gray-500">
                      Estado: {incident.status === 'resolved' ? 'Resuelto' : 'En Investigación'} 
                      {incident.resolutionTime && ` • Tiempo de resolución: ${incident.resolutionTime}`}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Manual Refresh Button */}
          <div className="text-center mt-8">
            <button 
              onClick={() => window.location.reload()}
              className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
            >
              Actualizar Datos
            </button>
          </div>
        </div>
      </div>
    </section>
  )
} 