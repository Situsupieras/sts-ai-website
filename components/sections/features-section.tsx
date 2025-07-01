'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { 
  Brain, 
  Zap, 
  TrendingUp, 
  Shield, 
  Clock, 
  Users,
  BarChart3,
  MessageSquare,
  Cpu,
  Target
} from 'lucide-react';

const FeaturesSection = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const features = [
    {
      icon: Brain,
      title: 'Machine Learning Avanzado',
      description: 'Algoritmos de IA que aprenden de tus datos y optimizan automáticamente tus procesos.',
      color: 'from-purple-500 to-purple-600',
    },
    {
      icon: Zap,
      title: 'Automatización Inteligente',
      description: 'Elimina hasta el 70% de tareas repetitivas con automatización precisa y confiable.',
      color: 'from-yellow-500 to-yellow-600',
    },
    {
      icon: TrendingUp,
      title: 'Análisis Predictivo',
      description: 'Anticipa tendencias y comportamientos para decisiones estratégicas basadas en datos.',
      color: 'from-green-500 to-green-600',
    },
    {
      icon: Shield,
      title: 'Seguridad de Datos',
      description: 'Protección avanzada de datos con encriptación y cumplimiento de normativas.',
      color: 'from-blue-500 to-blue-600',
    },
    {
      icon: Clock,
      title: 'Implementación Rápida',
      description: 'Despliegue en solo 48 horas con resultados medibles desde el primer día.',
      color: 'from-red-500 to-red-600',
    },
    {
      icon: Users,
      title: 'Soporte Dedicado',
      description: 'Equipo de expertos disponible para garantizar el éxito de tu implementación.',
      color: 'from-indigo-500 to-indigo-600',
    },
    {
      icon: BarChart3,
      title: 'Dashboard en Tiempo Real',
      description: 'Monitorea el rendimiento y métricas clave con visualizaciones interactivas.',
      color: 'from-pink-500 to-pink-600',
    },
    {
      icon: MessageSquare,
      title: 'Chatbots Inteligentes',
      description: 'Asistentes virtuales que mejoran la experiencia del cliente y reducen costos.',
      color: 'from-teal-500 to-teal-600',
    },
    {
      icon: Cpu,
      title: 'Integración API',
      description: 'Conecta fácilmente con tus sistemas existentes sin interrumpir operaciones.',
      color: 'from-orange-500 to-orange-600',
    },
    {
      icon: Target,
      title: 'Personalización Total',
      description: 'Soluciones adaptadas específicamente a tu industria y objetivos de negocio.',
      color: 'from-cyan-500 to-cyan-600',
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
      },
    },
  };

  return (
    <section className="py-20 bg-gray-50 dark:bg-dark-800">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="text-center mb-16"
        >
          <motion.h2
            variants={itemVariants}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6"
          >
            Tecnología{' '}
            <span className="gradient-text">de Vanguardia</span>
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto"
          >
            Nuestras soluciones de IA combinan las últimas tecnologías con implementación empresarial probada
          </motion.p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-8"
        >
          {features.map((feature) => (
            <motion.div
              key={feature.title}
              variants={itemVariants}
              className="group"
            >
              <div className="bg-white dark:bg-dark-700 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 h-full border border-gray-100 dark:border-dark-600 hover:border-primary-200 dark:hover:border-primary-700">
                <div className={`w-16 h-16 mx-auto mb-4 bg-gradient-to-r ${feature.color} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3 text-center">
                  {feature.title}
                </h3>
                
                <p className="text-gray-600 dark:text-gray-400 text-sm text-center leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Additional Info */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8 }}
          className="mt-16 text-center"
        >
          <div className="bg-gradient-to-r from-primary-500 to-secondary-500 rounded-2xl p-8 text-white max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold mb-4">
              ¿Listo para transformar tu empresa?
            </h3>
            <p className="text-white/90 mb-6 max-w-2xl mx-auto">
              Nuestras soluciones están diseñadas para cualquier sector. Si tienes necesidades específicas, 
              nuestro equipo desarrolla una solución personalizada con ROI garantizado.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="btn-lg bg-white text-primary-600 hover:bg-gray-100 font-semibold rounded-lg px-8 py-3 transition-colors duration-200">
                Solicitar Personalización
              </button>
              <button className="btn-lg border-2 border-white text-white hover:bg-white hover:text-primary-600 font-semibold rounded-lg px-8 py-3 transition-colors duration-200">
                Ver Documentación Técnica
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturesSection; 