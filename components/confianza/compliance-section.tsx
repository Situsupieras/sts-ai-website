'use client'

import { useState } from 'react'

interface Certification {
  id: string
  name: string
  type: 'security' | 'privacy' | 'quality' | 'compliance'
  status: 'active' | 'pending' | 'expired'
  validUntil: string
  description: string
  documents: Document[]
}

interface Document {
  id: string
  name: string
  type: 'certificate' | 'report' | 'policy' | 'audit'
  restricted: boolean
  description: string
}

export function ComplianceSection() {
  const [selectedCertification, setSelectedCertification] = useState<string | null>(null)
  const [showRequestForm, setShowRequestForm] = useState(false)
  const [requestedDocuments, setRequestedDocuments] = useState<string[]>([])

  const certifications: Certification[] = [
    {
      id: 'soc2',
      name: 'SOC 2 Type II',
      type: 'security',
      status: 'active',
      validUntil: '2025-12-31',
      description: 'Certificación de controles de seguridad para servicios en la nube',
      documents: [
        {
          id: 'soc2-report',
          name: 'Informe SOC 2 Type II',
          type: 'report',
          restricted: true,
          description: 'Informe completo de auditoría SOC 2 Type II'
        },
        {
          id: 'soc2-cert',
          name: 'Certificado SOC 2',
          type: 'certificate',
          restricted: false,
          description: 'Certificado oficial de cumplimiento SOC 2'
        }
      ]
    },
    {
      id: 'iso27001',
      name: 'ISO 27001',
      type: 'security',
      status: 'active',
      validUntil: '2026-06-30',
      description: 'Sistema de Gestión de Seguridad de la Información',
      documents: [
        {
          id: 'iso27001-cert',
          name: 'Certificado ISO 27001',
          type: 'certificate',
          restricted: false,
          description: 'Certificado oficial ISO 27001'
        },
        {
          id: 'iso27001-audit',
          name: 'Informe de Auditoría ISO 27001',
          type: 'audit',
          restricted: true,
          description: 'Informe detallado de auditoría de cumplimiento'
        }
      ]
    },
    {
      id: 'gdpr',
      name: 'GDPR Compliance',
      type: 'privacy',
      status: 'active',
      validUntil: '2025-12-31',
      description: 'Cumplimiento del Reglamento General de Protección de Datos',
      documents: [
        {
          id: 'gdpr-assessment',
          name: 'Evaluación de Impacto GDPR',
          type: 'report',
          restricted: true,
          description: 'Evaluación completa de impacto en la protección de datos'
        },
        {
          id: 'gdpr-policy',
          name: 'Política de Privacidad GDPR',
          type: 'policy',
          restricted: false,
          description: 'Política de privacidad conforme a GDPR'
        }
      ]
    },
    {
      id: 'pci-dss',
      name: 'PCI DSS Level 1',
      type: 'security',
      status: 'active',
      validUntil: '2025-09-30',
      description: 'Estándar de Seguridad de Datos de la Industria de Tarjetas de Pago',
      documents: [
        {
          id: 'pci-cert',
          name: 'Certificado PCI DSS',
          type: 'certificate',
          restricted: false,
          description: 'Certificado oficial PCI DSS Level 1'
        },
        {
          id: 'pci-report',
          name: 'Informe de Cumplimiento PCI',
          type: 'report',
          restricted: true,
          description: 'Informe detallado de cumplimiento PCI DSS'
        }
      ]
    }
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-green-600 bg-green-100'
      case 'pending': return 'text-yellow-600 bg-yellow-100'
      case 'expired': return 'text-red-600 bg-red-100'
      default: return 'text-gray-600 bg-gray-100'
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'security': return 'bg-red-100 text-red-800'
      case 'privacy': return 'bg-blue-100 text-blue-800'
      case 'quality': return 'bg-green-100 text-green-800'
      case 'compliance': return 'bg-purple-100 text-purple-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const handleDocumentRequest = (documentId: string) => {
    if (!requestedDocuments.includes(documentId)) {
      setRequestedDocuments([...requestedDocuments, documentId])
    }
    setShowRequestForm(true)
  }

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Cumplimiento y Certificaciones
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Mantenemos los más altos estándares de seguridad y cumplimiento. 
              Todas nuestras certificaciones están disponibles para revisión.
            </p>
          </div>

          {/* Certifications Grid */}
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            {certifications.map((cert) => (
              <div key={cert.id} className="bg-white rounded-xl p-8 border border-gray-200 hover:shadow-lg transition-shadow">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{cert.name}</h3>
                    <p className="text-gray-600 mb-4">{cert.description}</p>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(cert.status)}`}>
                      {cert.status === 'active' ? 'Activo' : cert.status === 'pending' ? 'Pendiente' : 'Expirado'}
                    </span>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getTypeColor(cert.type)}`}>
                      {cert.type.toUpperCase()}
                    </span>
                  </div>
                </div>
                
                <div className="mb-6">
                  <div className="text-sm text-gray-500 mb-1">Válido hasta:</div>
                  <div className="text-lg font-semibold text-gray-900">
                    {new Date(cert.validUntil).toLocaleDateString('es-ES')}
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">Documentos Disponibles:</h4>
                  <div className="space-y-3">
                    {cert.documents.map((doc) => (
                      <div key={doc.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div>
                          <div className="font-medium text-gray-900">{doc.name}</div>
                          <div className="text-sm text-gray-600">{doc.description}</div>
                        </div>
                        <button
                          onClick={() => handleDocumentRequest(doc.id)}
                          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                            doc.restricted
                              ? 'bg-purple-600 text-white hover:bg-purple-700'
                              : 'bg-green-600 text-white hover:bg-green-700'
                          }`}
                        >
                          {doc.restricted ? 'Solicitar' : 'Descargar'}
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Request Form Modal */}
          {showRequestForm && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white rounded-xl p-8 max-w-md w-full mx-4">
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  Solicitar Documentos Restringidos
                </h3>
                <p className="text-gray-600 mb-6">
                  Los documentos restringidos requieren verificación de identidad y propósito de uso.
                </p>
                
                <form className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Nombre Completo *
                    </label>
                    <input
                      type="text"
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Corporativo *
                    </label>
                    <input
                      type="email"
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Empresa *
                    </label>
                    <input
                      type="text"
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Propósito de Uso *
                    </label>
                    <select className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent">
                      <option value="">Seleccionar propósito</option>
                      <option value="vendor-assessment">Evaluación de Proveedor</option>
                      <option value="compliance-audit">Auditoría de Cumplimiento</option>
                      <option value="security-review">Revisión de Seguridad</option>
                      <option value="legal-requirement">Requerimiento Legal</option>
                      <option value="other">Otro</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Comentarios Adicionales
                    </label>
                    <textarea
                      rows={3}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      placeholder="Describe el propósito específico de tu solicitud..."
                    ></textarea>
                  </div>
                  
                  <div className="flex gap-4 pt-4">
                    <button
                      type="button"
                      onClick={() => setShowRequestForm(false)}
                      className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      Cancelar
                    </button>
                    <button
                      type="submit"
                      className="flex-1 px-4 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                    >
                      Enviar Solicitud
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {/* Additional Compliance Info */}
          <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">
              Proceso de Verificación
            </h3>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-purple-600 font-bold">1</span>
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">Solicitud</h4>
                <p className="text-gray-600 text-sm">
                  Completa el formulario con tu información y propósito
                </p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-blue-600 font-bold">2</span>
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">Verificación</h4>
                <p className="text-gray-600 text-sm">
                  Nuestro equipo revisa y valida tu solicitud
                </p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-green-600 font-bold">3</span>
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">Entrega</h4>
                <p className="text-gray-600 text-sm">
                  Recibes acceso a los documentos solicitados
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
} 