import { Metadata } from 'next';
import HeroSection from '@/components/sections/hero-section';
import ProblemAgitationSolution from '@/components/sections/problem-agitation-solution';
import SocialProof from '@/components/sections/social-proof';
import AIProcessVisualizer from '@/components/sections/ai-process-visualizer';
import IntelligentForm from '@/components/sections/intelligent-form';
import CTASection from '@/components/sections/cta-section';

export const metadata: Metadata = {
  title: 'Si Tu Supieras El Poder de la IA | Transformación Empresarial con IA',
  description: 'Descubre cómo las empresas líderes están ahorrando millones con soluciones de IA personalizadas. ROI comprobado del 340%, implementación en 48 horas.',
  keywords: 'IA, inteligencia artificial, automatización, análisis predictivo, chatbots, transformación digital, ROI, B2B, empresa',
  openGraph: {
    title: 'Si Tu Supieras El Poder de la IA | Transformación Empresarial',
    description: 'Soluciones de IA que generan ROI comprobado del 340% para empresas B2B',
    type: 'website',
    locale: 'es_ES',
    url: 'https://stselpoderdelaia.online',
    siteName: 'Si Tu Supieras El Poder de la IA',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Si Tu Supieras El Poder de la IA'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Si Tu Supieras El Poder de la IA | Transformación Empresarial',
    description: 'Soluciones de IA que generan ROI comprobado del 340% para empresas B2B',
    images: ['/og-image.jpg']
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: 'https://stselpoderdelaia.online',
  },
  authors: [{ name: 'Si Tu Supieras Team' }],
  creator: 'Si Tu Supieras',
  publisher: 'Si Tu Supieras',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
};

export default function HomePage() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section id="home">
        <HeroSection />
      </section>

      {/* Problem → Agitation → Solution */}
      <section id="problem-solution">
        <ProblemAgitationSolution />
      </section>

      {/* Social Proof */}
      <section id="social-proof">
        <SocialProof />
      </section>

      {/* AI Process Visualizer */}
      <section id="ai-process">
        <AIProcessVisualizer />
      </section>

      {/* CTA Section */}
      <section id="cta">
        <CTASection />
      </section>

      {/* Intelligent Form */}
      <section id="contact">
        <IntelligentForm />
      </section>

      {/* Structured Data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "Si Tu Supieras El Poder de la IA",
            "url": "https://stselpoderdelaia.online",
            "logo": "https://stselpoderdelaia.online/logo.png",
            "description": "Transformamos empresas con soluciones de IA personalizadas que generan resultados medibles y ROI comprobado.",
            "address": {
              "@type": "PostalAddress",
              "addressLocality": "Madrid",
              "addressCountry": "ES"
            },
            "contactPoint": {
              "@type": "ContactPoint",
              "telephone": "+34-600-000-000",
              "contactType": "customer service",
              "email": "info@stselpoderdelaia.online"
            },
            "sameAs": [
              "https://linkedin.com/company/situsupieras",
              "https://twitter.com/situsupieras",
              "https://facebook.com/situsupieras"
            ],
            "service": [
              {
                "@type": "Service",
                "name": "Automatización con IA",
                "description": "Automatización inteligente de procesos empresariales"
              },
              {
                "@type": "Service",
                "name": "Análisis Predictivo",
                "description": "Análisis predictivo para optimización de decisiones"
              },
              {
                "@type": "Service",
                "name": "Chatbots Inteligentes",
                "description": "Chatbots avanzados para atención al cliente"
              }
            ],
            "aggregateRating": {
              "@type": "AggregateRating",
              "ratingValue": "4.9",
              "reviewCount": "500"
            }
          })
        }}
      />
    </main>
  );
} 