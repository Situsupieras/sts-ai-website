import React from 'react';
import { FileText, Shield, Users, AlertTriangle, CheckCircle, Clock } from 'lucide-react';

export default function TerminosServicio() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="flex justify-center mb-6">
              <div className="p-4 bg-blue-100 rounded-full">
                <FileText className="w-8 h-8 text-blue-600" />
              </div>
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Términos de Servicio
            </h1>
            <p className="text-xl text-gray-600">
              Condiciones que rigen el uso de nuestros servicios de IA empresarial
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-4">
              <div className="flex items-center text-sm text-gray-500">
                <CheckCircle className="w-4 h-4 mr-2" />
                Cumplimiento Legal
              </div>
              <div className="flex items-center text-sm text-gray-500">
                <Shield className="w-4 h-4 mr-2" />
                Protección de Datos
              </div>
              <div className="flex items-center text-sm text-gray-500">
                <Users className="w-4 h-4 mr-2" />
                Servicios Empresariales
              </div>
            </div>
          </div>

          {/* Contenido */}
          <div className="bg-white rounded-2xl shadow-lg p-8 space-y-8">
            
            {/* Información de la Empresa */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                <Users className="w-6 h-6 mr-3 text-blue-600" />
                1. Información de la Empresa
              </h2>
              <div className="prose prose-gray max-w-none">
                <p className="text-gray-700 mb-4">
                  <strong>STS AI Solutions</strong><br />
                  Dirección: [Dirección de la empresa]<br />
                  Email: legal@sts-ai.com<br />
                  Teléfono: [Número de contacto]<br />
                  NIF/CIF: [Número fiscal]
                </p>
                <p className="text-gray-600">
                  Empresa especializada en soluciones de inteligencia artificial 
                  para empresas, automatización de procesos y análisis de datos.
                </p>
              </div>
            </section>

            {/* Definiciones */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                <FileText className="w-6 h-6 mr-3 text-blue-600" />
                2. Definiciones
              </h2>
              <div className="prose prose-gray max-w-none">
                <ul className="list-disc list-inside space-y-2 text-gray-600 ml-4">
                  <li><strong>Servicios:</strong> Soluciones de IA, automatización y análisis de datos</li>
                  <li><strong>Cliente:</strong> Persona o empresa que utiliza nuestros servicios</li>
                  <li><strong>Plataforma:</strong> Nuestro sitio web y herramientas digitales</li>
                  <li><strong>Contenido:</strong> Información, datos y materiales proporcionados</li>
                </ul>
              </div>
            </section>

            {/* Servicios */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                <CheckCircle className="w-6 h-6 mr-3 text-blue-600" />
                3. Descripción de Servicios
              </h2>
              <div className="prose prose-gray max-w-none">
                <p className="text-gray-700 mb-4">
                  Ofrecemos los siguientes servicios:
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-600 ml-4">
                  <li>Consultoría en implementación de IA empresarial</li>
                  <li>Desarrollo de soluciones de automatización personalizadas</li>
                  <li>Análisis de datos y generación de insights</li>
                  <li>Calculadoras de ROI y herramientas de evaluación</li>
                  <li>Soporte técnico y mantenimiento de sistemas</li>
                </ul>
              </div>
            </section>

            {/* Condiciones de Uso */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                <AlertTriangle className="w-6 h-6 mr-3 text-blue-600" />
                4. Condiciones de Uso
              </h2>
              <div className="prose prose-gray max-w-none">
                <p className="text-gray-700 mb-4">
                  Al utilizar nuestros servicios, aceptas:
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-600 ml-4">
                  <li>Proporcionar información veraz y actualizada</li>
                  <li>No utilizar los servicios para fines ilegales o fraudulentos</li>
                  <li>Respetar los derechos de propiedad intelectual</li>
                  <li>No intentar acceder a sistemas o datos sin autorización</li>
                  <li>Cumplir con todas las leyes y regulaciones aplicables</li>
                </ul>
              </div>
            </section>

            {/* Propiedad Intelectual */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                5. Propiedad Intelectual
              </h2>
              <div className="prose prose-gray max-w-none">
                <p className="text-gray-700 mb-4">
                  Todos los derechos de propiedad intelectual relacionados con nuestros servicios:
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-600 ml-4">
                  <li>Pertenecen a STS AI Solutions o nuestros licenciantes</li>
                  <li>No se transfieren al cliente salvo acuerdo expreso</li>
                  <li>El cliente conserva los derechos sobre sus propios datos</li>
                  <li>Se prohíbe la reproducción o distribución no autorizada</li>
                </ul>
              </div>
            </section>

            {/* Privacidad y Datos */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                <Shield className="w-6 h-6 mr-3 text-blue-600" />
                6. Privacidad y Protección de Datos
              </h2>
              <div className="prose prose-gray max-w-none">
                <p className="text-gray-700 mb-4">
                  El tratamiento de datos personales se rige por:
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-600 ml-4">
                  <li>Nuestra Política de Privacidad (disponible en /privacidad)</li>
                  <li>Reglamento General de Protección de Datos (GDPR)</li>
                  <li>Ley Orgánica de Protección de Datos (LOPDGDD)</li>
                  <li>Estándares de seguridad ISO 27001</li>
                </ul>
                <p className="text-gray-600 mt-4">
                  El cliente es responsable de obtener los consentimientos necesarios 
                  para el tratamiento de datos de terceros.
                </p>
              </div>
            </section>

            {/* Limitación de Responsabilidad */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                7. Limitación de Responsabilidad
              </h2>
              <div className="prose prose-gray max-w-none">
                <p className="text-gray-700 mb-4">
                  Nuestra responsabilidad está limitada a:
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-600 ml-4">
                  <li>Daños directos causados por negligencia grave</li>
                  <li>Máximo el importe pagado por los servicios en los últimos 12 meses</li>
                  <li>No cubrimos daños indirectos, consecuenciales o lucro cesante</li>
                  <li>Excluimos responsabilidad por uso incorrecto de los servicios</li>
                </ul>
              </div>
            </section>

            {/* Garantías */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                8. Garantías
              </h2>
              <div className="prose prose-gray max-w-none">
                <p className="text-gray-700 mb-4">
                  Garantizamos:
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-600 ml-4">
                  <li>Que nuestros servicios cumplen con las especificaciones acordadas</li>
                  <li>Que tenemos los derechos necesarios para prestar los servicios</li>
                  <li>Que cumplimos con las leyes y regulaciones aplicables</li>
                  <li>Que implementamos medidas de seguridad adecuadas</li>
                </ul>
                <p className="text-gray-600 mt-4">
                  No garantizamos resultados específicos de negocio o ROI.
                </p>
              </div>
            </section>

            {/* Duración y Terminación */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                <Clock className="w-6 h-6 mr-3 text-blue-600" />
                9. Duración y Terminación
              </h2>
              <div className="prose prose-gray max-w-none">
                <p className="text-gray-700 mb-4">
                  Los servicios se prestan:
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-600 ml-4">
                  <li>Por el período acordado en el contrato específico</li>
                  <li>Pueden ser terminados por cualquiera de las partes con 30 días de preaviso</li>
                  <li>Se rescinden automáticamente por incumplimiento grave</li>
                  <li>La terminación no afecta las obligaciones ya devengadas</li>
                </ul>
              </div>
            </section>

            {/* Ley Aplicable */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                10. Ley Aplicable y Jurisdicción
              </h2>
              <div className="prose prose-gray max-w-none">
                <p className="text-gray-700 mb-4">
                  Estos términos se rigen por:
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-600 ml-4">
                  <li>Ley española para la interpretación y cumplimiento</li>
                  <li>Jurisdicción de los tribunales españoles</li>
                  <li>Respeto a las leyes de protección al consumidor</li>
                  <li>Posibilidad de recurrir a autoridades de consumo</li>
                </ul>
              </div>
            </section>

            {/* Modificaciones */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                11. Modificaciones
              </h2>
              <div className="prose prose-gray max-w-none">
                <p className="text-gray-700">
                  Nos reservamos el derecho de modificar estos términos. Los cambios 
                  serán notificados con 30 días de antelación. El uso continuado 
                  constituye aceptación de las modificaciones.
                </p>
                <p className="text-gray-600 mt-4">
                  <strong>Última actualización:</strong> Julio 2024
                </p>
              </div>
            </section>

            {/* Contacto */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                12. Contacto
              </h2>
              <div className="prose prose-gray max-w-none">
                <p className="text-gray-700 mb-4">
                  Para consultas sobre estos términos:
                </p>
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-gray-700">
                    <strong>Email:</strong> legal@sts-ai.com<br />
                    <strong>Asunto:</strong> Consulta Términos de Servicio
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