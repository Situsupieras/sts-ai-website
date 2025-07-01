import React from 'react';
import { Shield, Lock, Eye, Database, Users, FileText } from 'lucide-react';

export default function PoliticaPrivacidad() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="flex justify-center mb-6">
              <div className="p-4 bg-blue-100 rounded-full">
                <Shield className="w-8 h-8 text-blue-600" />
              </div>
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Política de Privacidad
            </h1>
            <p className="text-xl text-gray-600">
              Protegemos tus datos con los más altos estándares de seguridad
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-4">
              <div className="flex items-center text-sm text-gray-500">
                <Lock className="w-4 h-4 mr-2" />
                Cumplimiento GDPR
              </div>
              <div className="flex items-center text-sm text-gray-500">
                <Shield className="w-4 h-4 mr-2" />
                ISO 27001
              </div>
              <div className="flex items-center text-sm text-gray-500">
                <Database className="w-4 h-4 mr-2" />
                Google Cloud
              </div>
            </div>
          </div>

          {/* Contenido */}
          <div className="bg-white rounded-2xl shadow-lg p-8 space-y-8">
            
            {/* Información del Responsable */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                <Users className="w-6 h-6 mr-3 text-blue-600" />
                1. Responsable del Tratamiento
              </h2>
              <div className="prose prose-gray max-w-none">
                <p className="text-gray-700 mb-4">
                  <strong>STS AI Solutions</strong><br />
                  Dirección: [Dirección de la empresa]<br />
                  Email: privacy@sts-ai.com<br />
                  Teléfono: [Número de contacto]
                </p>
                <p className="text-gray-600">
                  Somos responsables del tratamiento de tus datos personales y nos comprometemos 
                  a proteger tu privacidad de acuerdo con el Reglamento General de Protección 
                  de Datos (GDPR) y las mejores prácticas de seguridad ISO 27001.
                </p>
              </div>
            </section>

            {/* Finalidad del Tratamiento */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                <Eye className="w-6 h-6 mr-3 text-blue-600" />
                2. Finalidad del Tratamiento
              </h2>
              <div className="prose prose-gray max-w-none">
                <p className="text-gray-700 mb-4">
                  Tratamos tus datos personales para las siguientes finalidades:
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-600 ml-4">
                  <li>Gestionar tu solicitud de información sobre nuestros servicios de IA</li>
                  <li>Proporcionarte análisis personalizados de ROI y recomendaciones</li>
                  <li>Enviarte comunicaciones comerciales sobre nuestros servicios (con tu consentimiento)</li>
                  <li>Mejorar nuestros servicios y experiencia de usuario</li>
                  <li>Cumplir con obligaciones legales y regulatorias</li>
                </ul>
              </div>
            </section>

            {/* Base Legal */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                <FileText className="w-6 h-6 mr-3 text-blue-600" />
                3. Base Legal
              </h2>
              <div className="prose prose-gray max-w-none">
                <p className="text-gray-700 mb-4">
                  El tratamiento de tus datos se basa en:
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-600 ml-4">
                  <li><strong>Consentimiento:</strong> Para el envío de comunicaciones comerciales</li>
                  <li><strong>Interés legítimo:</strong> Para gestionar tu solicitud y mejorar nuestros servicios</li>
                  <li><strong>Cumplimiento legal:</strong> Para cumplir con obligaciones fiscales y regulatorias</li>
                </ul>
              </div>
            </section>

            {/* Datos que Recopilamos */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                <Database className="w-6 h-6 mr-3 text-blue-600" />
                4. Datos que Recopilamos
              </h2>
              <div className="prose prose-gray max-w-none">
                <p className="text-gray-700 mb-4">
                  Recopilamos únicamente los datos necesarios para proporcionarte nuestros servicios:
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-600 ml-4">
                  <li><strong>Datos de identificación:</strong> Nombre, email, teléfono (opcional)</li>
                  <li><strong>Datos profesionales:</strong> Empresa, cargo, industria</li>
                  <li><strong>Datos del negocio:</strong> Tamaño de empresa, facturación anual</li>
                  <li><strong>Datos de uso:</strong> Interacciones con nuestra calculadora y sitio web</li>
                </ul>
              </div>
            </section>

            {/* Seguridad */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                <Shield className="w-6 h-6 mr-3 text-blue-600" />
                5. Medidas de Seguridad
              </h2>
              <div className="prose prose-gray max-w-none">
                <p className="text-gray-700 mb-4">
                  Implementamos medidas de seguridad técnicas y organizativas de alto nivel:
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-600 ml-4">
                  <li>Encriptación de datos en tránsito y en reposo</li>
                  <li>Infraestructura segura en Google Cloud Platform</li>
                  <li>Acceso restringido y autenticación multifactor</li>
                  <li>Auditorías regulares de seguridad</li>
                  <li>Cumplimiento con estándares ISO 27001</li>
                </ul>
              </div>
            </section>

            {/* Derechos */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                <Lock className="w-6 h-6 mr-3 text-blue-600" />
                6. Tus Derechos
              </h2>
              <div className="prose prose-gray max-w-none">
                <p className="text-gray-700 mb-4">
                  Tienes derecho a:
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-600 ml-4">
                  <li><strong>Acceso:</strong> Conocer qué datos tenemos sobre ti</li>
                  <li><strong>Rectificación:</strong> Corregir datos inexactos</li>
                  <li><strong>Supresión:</strong> Solicitar la eliminación de tus datos</li>
                  <li><strong>Portabilidad:</strong> Recibir tus datos en formato estructurado</li>
                  <li><strong>Limitación:</strong> Restringir el tratamiento de tus datos</li>
                  <li><strong>Oposición:</strong> Oponerte al tratamiento de tus datos</li>
                </ul>
                <p className="text-gray-600 mt-4">
                  Para ejercer estos derechos, contacta con nosotros en privacy@sts-ai.com
                </p>
              </div>
            </section>

            {/* Conservación */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                7. Conservación de Datos
              </h2>
              <div className="prose prose-gray max-w-none">
                <p className="text-gray-700 mb-4">
                  Conservamos tus datos únicamente durante el tiempo necesario:
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-600 ml-4">
                  <li><strong>Datos de contacto:</strong> Hasta que revoques tu consentimiento o 3 años sin actividad</li>
                  <li><strong>Datos de uso:</strong> 2 años para análisis y mejora de servicios</li>
                  <li><strong>Datos fiscales:</strong> Según obligaciones legales (mínimo 5 años)</li>
                </ul>
              </div>
            </section>

            {/* Transferencias */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                8. Transferencias Internacionales
              </h2>
              <div className="prose prose-gray max-w-none">
                <p className="text-gray-700 mb-4">
                  Tus datos pueden ser procesados en países fuera del EEE:
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-600 ml-4">
                  <li>Google Cloud Platform (Estados Unidos) - Con garantías adecuadas</li>
                  <li>Herramientas de análisis (Estados Unidos) - Con cláusulas contractuales estándar</li>
                </ul>
                <p className="text-gray-600 mt-4">
                  Todas las transferencias cuentan con las garantías adecuadas según el GDPR.
                </p>
              </div>
            </section>

            {/* Contacto */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                9. Contacto
              </h2>
              <div className="prose prose-gray max-w-none">
                <p className="text-gray-700 mb-4">
                  Para cualquier consulta sobre esta política de privacidad:
                </p>
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-gray-700">
                    <strong>Email:</strong> privacy@sts-ai.com<br />
                    <strong>Asunto:</strong> Consulta Política de Privacidad
                  </p>
                </div>
              </div>
            </section>

            {/* Actualizaciones */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                10. Actualizaciones
              </h2>
              <div className="prose prose-gray max-w-none">
                <p className="text-gray-700">
                  Esta política puede ser actualizada. Te notificaremos cualquier cambio 
                  significativo a través de nuestro sitio web o por email.
                </p>
                <p className="text-gray-600 mt-4">
                  <strong>Última actualización:</strong> Julio 2024
                </p>
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