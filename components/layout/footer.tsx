'use client';

import { motion } from 'framer-motion';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Linkedin, 
  Twitter, 
  Facebook, 
  Instagram,
  Shield,
  Award,
  CheckCircle,
  ArrowRight
} from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: 'Inicio', href: '#home' },
    { name: 'Servicios', href: '#services' },
    { name: 'Casos de Éxito', href: '#success' },
    { name: 'Sobre Nosotros', href: '#about' },
    { name: 'Blog', href: '/blog' },
    { name: 'Contacto', href: '#contact' }
  ];

  const services = [
    { name: 'Automatización con IA', href: '/servicios/automatizacion' },
    { name: 'Análisis Predictivo', href: '/servicios/analisis-predictivo' },
    { name: 'Chatbots Inteligentes', href: '/servicios/chatbots' },
    { name: 'Optimización de Procesos', href: '/servicios/optimizacion' },
    { name: 'Consultoría en IA', href: '/servicios/consultoria' },
    { name: 'Implementación', href: '/servicios/implementacion' }
  ];

  const resources = [
    { name: 'Guía de IA para Empresas', href: '/recursos/guia-ia' },
    { name: 'Calculadora de ROI', href: '/recursos/calculadora-roi' },
    { name: 'Casos de Estudio', href: '/recursos/casos-estudio' },
    { name: 'Webinars Gratuitos', href: '/recursos/webinars' },
    { name: 'E-book: Transformación Digital', href: '/recursos/ebook' },
    { name: 'Newsletter', href: '/newsletter' }
  ];

  const certifications = [
    { name: '🔐 Seguridad basada en ISO 27001', description: 'En proceso de certificación' },
    { name: '📁 Procesos alineados con GDPR', description: 'Cumplimiento europeo' },
    { name: '☁️ Infraestructura sobre Google Cloud', description: 'Seguridad empresarial' },
    { name: '⚙️ Mejores prácticas de desarrollo seguro', description: 'En proceso de certificación ISO y alianzas oficiales' }
  ];

  return (
    <footer className="bg-gradient-to-b from-slate-900 to-black text-white">
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Company Info */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h3 className="text-2xl font-bold mb-4 gradient-text">
                Si Tu Supieras
              </h3>
              <p className="text-gray-300 mb-6 leading-relaxed">
                Transformamos empresas con soluciones de IA personalizadas que generan resultados medibles y ROI comprobado.
              </p>
              
              {/* Contact Info */}
              <div className="space-y-3 mb-6">
                <div className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-purple-400" />
                  <span className="text-gray-300">info@situsupieras.org</span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-purple-400" />
                  <span className="text-gray-300">por el momento sin teléfono</span>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="w-4 h-4 text-purple-400" />
                  <span className="text-gray-300">Madrid, España</span>
                </div>
              </div>

              {/* Social Media */}
              <div className="flex gap-4">
                <a href="https://linkedin.com/company/situsupieras" className="p-2 bg-gray-800 rounded-lg hover:bg-purple-600 transition-colors duration-300">
                  <Linkedin className="w-5 h-5" />
                </a>
                <a href="https://twitter.com/situsupieras" className="p-2 bg-gray-800 rounded-lg hover:bg-purple-600 transition-colors duration-300">
                  <Twitter className="w-5 h-5" />
                </a>
                <a href="https://facebook.com/situsupieras" className="p-2 bg-gray-800 rounded-lg hover:bg-purple-600 transition-colors duration-300">
                  <Facebook className="w-5 h-5" />
                </a>
                <a href="https://instagram.com/situsupieras" className="p-2 bg-gray-800 rounded-lg hover:bg-purple-600 transition-colors duration-300">
                  <Instagram className="w-5 h-5" />
                </a>
              </div>
            </motion.div>
          </div>

          {/* Quick Links */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <h4 className="text-lg font-semibold mb-4">Enlaces Rápidos</h4>
              <ul className="space-y-2">
                {quickLinks.map((link) => (
                  <li key={link.name}>
                    <a 
                      href={link.href}
                      className="text-gray-300 hover:text-purple-400 transition-colors duration-300 flex items-center gap-2 group"
                    >
                      <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>

          {/* Services */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h4 className="text-lg font-semibold mb-4">Servicios</h4>
              <ul className="space-y-2">
                {services.map((service) => (
                  <li key={service.name}>
                    <a 
                      href={service.href}
                      className="text-gray-300 hover:text-purple-400 transition-colors duration-300 flex items-center gap-2 group"
                    >
                      <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                      {service.name}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>

          {/* Resources & Certifications */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <h4 className="text-lg font-semibold mb-4">Recursos</h4>
              <ul className="space-y-2 mb-6">
                {resources.map((resource) => (
                  <li key={resource.name}>
                    <a 
                      href={resource.href}
                      className="text-gray-300 hover:text-purple-400 transition-colors duration-300 flex items-center gap-2 group"
                    >
                      <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                      {resource.name}
                    </a>
                  </li>
                ))}
              </ul>

              <h4 className="text-lg font-semibold mb-4">Certificaciones</h4>
              <div className="space-y-2">
                {certifications.map((cert) => (
                  <div key={cert.name} className="flex items-center gap-2">
                    <Award className="w-4 h-4 text-green-400" />
                    <div>
                      <div className="text-sm font-medium text-white">{cert.name}</div>
                      <div className="text-xs text-gray-400">{cert.description}</div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Trust Indicators Bar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="border-t border-gray-800 py-8"
      >
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="flex flex-col items-center">
              <Shield className="w-8 h-8 text-green-400 mb-2" />
              <div className="text-sm font-medium">Seguridad Garantizada</div>
              <div className="text-xs text-gray-400">ISO 27001</div>
            </div>
            <div className="flex flex-col items-center">
              <CheckCircle className="w-8 h-8 text-blue-400 mb-2" />
              <div className="text-sm font-medium">99.9% Uptime</div>
              <div className="text-xs text-gray-400">SLA Garantizado</div>
            </div>
            <div className="flex flex-col items-center">
              <Award className="w-8 h-8 text-purple-400 mb-2" />
              <div className="text-sm font-medium">500+ Clientes</div>
              <div className="text-xs text-gray-400">Empresas Satisfechas</div>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-8 h-8 bg-gradient-to-r from-green-400 to-blue-400 rounded-full mb-2 flex items-center justify-center">
                <span className="text-white text-xs font-bold">24/7</span>
              </div>
              <div className="text-sm font-medium">Soporte 24/7</div>
              <div className="text-xs text-gray-400">Incluido</div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800 py-6">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-gray-400 text-sm">
              © {currentYear} Si Tu Supieras. Todos los derechos reservados.
            </div>
            
            <div className="flex flex-wrap gap-6 text-sm">
              <a href="/privacidad" className="text-gray-400 hover:text-white transition-colors duration-300">
                Política de Privacidad
              </a>
              <a href="/terminos" className="text-gray-400 hover:text-white transition-colors duration-300">
                Términos de Servicio
              </a>
              <a href="/cookies" className="text-gray-400 hover:text-white transition-colors duration-300">
                Política de Cookies
              </a>
              <a href="/compliance" className="text-gray-400 hover:text-white transition-colors duration-300">
                Compliance
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.5 }}
        className="bg-gradient-to-r from-purple-600/10 to-blue-600/10 border-t border-purple-500/20 py-8"
      >
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-2xl font-bold text-white mb-4">
            ¿Listo para Transformar Tu Empresa?
          </h3>
          <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
            Únete a las 500+ empresas que ya están ahorrando millones con nuestras soluciones de IA
          </p>
          <button
            onClick={() => document.getElementById('lead-form')?.scrollIntoView({ behavior: 'smooth' })}
            className="px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold rounded-xl hover:from-purple-700 hover:to-blue-700 transition-all duration-300 transform hover:scale-105"
          >
            Solicitar Consulta Gratuita
          </button>
        </div>
      </motion.div>
    </footer>
  );
} 