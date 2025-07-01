import React from 'react';
import { Cookie, Shield, Settings, Eye, Database, AlertTriangle } from 'lucide-react';

export default function PoliticaCookies() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="flex justify-center mb-6">
              <div className="p-4 bg-blue-100 rounded-full">
                <Cookie className="w-8 h-8 text-blue-600" />
              </div>
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Política de Cookies
            </h1>
            <p className="text-xl text-gray-600">
              Información sobre el uso de cookies en nuestro sitio web
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-4">
              <div className="flex items-center text-sm text-gray-500">
                <Shield className="w-4 h-4 mr-2" />
                Cumplimiento GDPR
              </div>
              <div className="flex items-center text-sm text-gray-500">
                <Eye className="w-4 h-4 mr-2" />
                Transparencia Total
              </div>
              <div className="flex items-center text-sm text-gray-500">
                <Settings className="w-4 h-4 mr-2" />
                Control del Usuario
              </div>
            </div>
          </div>

          {/* Contenido */}
          <div className="bg-white rounded-2xl shadow-lg p-8 space-y-8">
            
            {/* ¿Qué son las cookies? */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                <Cookie className="w-6 h-6 mr-3 text-blue-600" />
                1. ¿Qué son las cookies?
              </h2>
              <div className="prose prose-gray max-w-none">
                <p className="text-gray-700 mb-4">
                  Las cookies son pequeños archivos de texto que se almacenan en tu dispositivo 
                  cuando visitas nuestro sitio web. Nos ayudan a:
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-600 ml-4">
                  <li>Recordar tus preferencias y configuraciones</li>
                  <li>Analizar cómo utilizas nuestro sitio web</li>
                  <li>Mejorar tu experiencia de navegación</li>
                  <li>Proporcionar funcionalidades personalizadas</li>
                </ul>
              </div>
            </section>

            {/* Tipos de cookies */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                <Database className="w-6 h-6 mr-3 text-blue-600" />
                2. Tipos de cookies que utilizamos
              </h2>
              <div className="prose prose-gray max-w-none">
                
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Cookies Técnicas (Necesarias)</h3>
                  <p className="text-gray-700 mb-2">
                    Son esenciales para el funcionamiento del sitio web:
                  </p>
                  <ul className="list-disc list-inside space-y-1 text-gray-600 ml-4">
                    <li>Autenticación y sesión de usuario</li>
                    <li>Preferencias de idioma y región</li>
                    <li>Seguridad y protección contra ataques</li>
                    <li>Funcionalidades básicas del sitio</li>
                  </ul>
                  <p className="text-sm text-gray-500 mt-2">
                    <strong>Duración:</strong> Sesión o hasta 1 año
                  </p>
                </div>

                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Cookies Analíticas</h3>
                  <p className="text-gray-700 mb-2">
                    Nos ayudan a entender cómo utilizas nuestro sitio:
                  </p>
                  <ul className="list-disc list-inside space-y-1 text-gray-600 ml-4">
                    <li>Páginas más visitadas</li>
                    <li>Tiempo de permanencia</li>
                    <li>Origen del tráfico</li>
                    <li>Comportamiento del usuario</li>
                  </ul>
                  <p className="text-sm text-gray-500 mt-2">
                    <strong>Duración:</strong> Hasta 2 años
                  </p>
                </div>

                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Cookies de Marketing</h3>
                  <p className="text-gray-700 mb-2">
                    Utilizadas para mostrar contenido relevante:
                  </p>
                  <ul className="list-disc list-inside space-y-1 text-gray-600 ml-4">
                    <li>Publicidad personalizada</li>
                    <li>Redes sociales</li>
                    <li>Análisis de conversión</li>
                    <li>Retargeting</li>
                  </ul>
                  <p className="text-sm text-gray-500 mt-2">
                    <strong>Duración:</strong> Hasta 1 año
                  </p>
                </div>
              </div>
            </section>

            {/* Cookies específicas */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                3. Cookies específicas que utilizamos
              </h2>
              <div className="prose prose-gray max-w-none">
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse border border-gray-200">
                    <thead>
                      <tr className="bg-gray-50">
                        <th className="border border-gray-200 px-4 py-2 text-left">Cookie</th>
                        <th className="border border-gray-200 px-4 py-2 text-left">Propósito</th>
                        <th className="border border-gray-200 px-4 py-2 text-left">Duración</th>
                        <th className="border border-gray-200 px-4 py-2 text-left">Tipo</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="border border-gray-200 px-4 py-2 font-mono text-sm">session_id</td>
                        <td className="border border-gray-200 px-4 py-2">Mantener sesión activa</td>
                        <td className="border border-gray-200 px-4 py-2">Sesión</td>
                        <td className="border border-gray-200 px-4 py-2">Técnica</td>
                      </tr>
                      <tr>
                        <td className="border border-gray-200 px-4 py-2 font-mono text-sm">language</td>
                        <td className="border border-gray-200 px-4 py-2">Preferencia de idioma</td>
                        <td className="border border-gray-200 px-4 py-2">1 año</td>
                        <td className="border border-gray-200 px-4 py-2">Técnica</td>
                      </tr>
                      <tr>
                        <td className="border border-gray-200 px-4 py-2 font-mono text-sm">_ga</td>
                        <td className="border border-gray-200 px-4 py-2">Análisis de Google Analytics</td>
                        <td className="border border-gray-200 px-4 py-2">2 años</td>
                        <td className="border border-gray-200 px-4 py-2">Analítica</td>
                      </tr>
                      <tr>
                        <td className="border border-gray-200 px-4 py-2 font-mono text-sm">_fbp</td>
                        <td className="border border-gray-200 px-4 py-2">Publicidad de Facebook</td>
                        <td className="border border-gray-200 px-4 py-2">3 meses</td>
                        <td className="border border-gray-200 px-4 py-2">Marketing</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </section>

            {/* Consentimiento */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                <Shield className="w-6 h-6 mr-3 text-blue-600" />
                4. Consentimiento y Control
              </h2>
              <div className="prose prose-gray max-w-none">
                <p className="text-gray-700 mb-4">
                  De acuerdo con el GDPR, tienes control total sobre las cookies:
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-600 ml-4">
                  <li><strong>Consentimiento explícito:</strong> Solo utilizamos cookies no técnicas con tu consentimiento</li>
                  <li><strong>Retirada del consentimiento:</strong> Puedes revocar tu consentimiento en cualquier momento</li>
                  <li><strong>Configuración del navegador:</strong> Puedes bloquear o eliminar cookies desde tu navegador</li>
                  <li><strong>Panel de control:</strong> Accede a tu panel de preferencias de cookies</li>
                </ul>
              </div>
            </section>

            {/* Cómo gestionar cookies */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                <Settings className="w-6 h-6 mr-3 text-blue-600" />
                5. Cómo gestionar las cookies
              </h2>
              <div className="prose prose-gray max-w-none">
                <p className="text-gray-700 mb-4">
                  Puedes gestionar las cookies de las siguientes maneras:
                </p>
                
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Desde nuestro sitio web</h3>
                  <ul className="list-disc list-inside space-y-2 text-gray-600 ml-4">
                    <li>Banner de cookies al acceder al sitio</li>
                    <li>Panel de configuración de cookies</li>
                    <li>Enlaces en el footer del sitio</li>
                  </ul>
                </div>

                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Desde tu navegador</h3>
                  <ul className="list-disc list-inside space-y-2 text-gray-600 ml-4">
                    <li><strong>Chrome:</strong> Configuración → Privacidad y seguridad → Cookies</li>
                    <li><strong>Firefox:</strong> Opciones → Privacidad y seguridad → Cookies</li>
                    <li><strong>Safari:</strong> Preferencias → Privacidad → Cookies</li>
                    <li><strong>Edge:</strong> Configuración → Cookies y permisos del sitio</li>
                  </ul>
                </div>

                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <div className="flex items-start">
                    <AlertTriangle className="w-5 h-5 text-yellow-600 mr-3 mt-0.5" />
                    <div>
                      <p className="text-yellow-800 font-medium mb-2">Importante</p>
                      <p className="text-yellow-700 text-sm">
                        Deshabilitar ciertas cookies puede afectar la funcionalidad del sitio web. 
                        Las cookies técnicas son necesarias para el funcionamiento básico.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Terceros */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                6. Cookies de terceros
              </h2>
              <div className="prose prose-gray max-w-none">
                <p className="text-gray-700 mb-4">
                  Utilizamos servicios de terceros que pueden instalar cookies:
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-600 ml-4">
                  <li><strong>Google Analytics:</strong> Análisis de tráfico web</li>
                  <li><strong>Facebook Pixel:</strong> Publicidad y análisis de conversión</li>
                  <li><strong>Google Ads:</strong> Publicidad y remarketing</li>
                  <li><strong>LinkedIn Insight:</strong> Análisis de audiencia profesional</li>
                </ul>
                <p className="text-gray-600 mt-4">
                  Estos servicios tienen sus propias políticas de privacidad y cookies. 
                  Te recomendamos revisarlas.
                </p>
              </div>
            </section>

            {/* Actualizaciones */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                7. Actualizaciones de esta política
              </h2>
              <div className="prose prose-gray max-w-none">
                <p className="text-gray-700 mb-4">
                  Esta política puede ser actualizada para reflejar:
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-600 ml-4">
                  <li>Nuevas funcionalidades del sitio web</li>
                  <li>Cambios en la legislación de protección de datos</li>
                  <li>Nuevos servicios de terceros</li>
                  <li>Mejoras en las prácticas de privacidad</li>
                </ul>
                <p className="text-gray-600 mt-4">
                  <strong>Última actualización:</strong> Julio 2024
                </p>
              </div>
            </section>

            {/* Contacto */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                8. Contacto
              </h2>
              <div className="prose prose-gray max-w-none">
                <p className="text-gray-700 mb-4">
                  Para consultas sobre nuestra política de cookies:
                </p>
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-gray-700">
                    <strong>Email:</strong> privacy@sts-ai.com<br />
                    <strong>Asunto:</strong> Consulta Política de Cookies
                  </p>
                </div>
              </div>
            </section>
          </div>

          {/* Footer */}
          <div className="text-center mt-12">
            <a
              href="/"
              className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Volver al Inicio
            </a>
          </div>
        </div>
      </div>
    </div>
  );
} 