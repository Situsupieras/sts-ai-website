import type { Metadata } from 'next';
import { Inter, Poppins } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/components/providers/theme-provider';
import { AnalyticsProvider } from '@/components/providers/analytics-provider';
import { Toaster } from 'react-hot-toast';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  variable: '--font-poppins',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'Si Tu Supieras El Poder de la IA | Soluciones B2B de Inteligencia Artificial',
    template: '%s | Si Tu Supieras El Poder de la IA',
  },
  description: 'Transforma tu empresa con soluciones de IA personalizadas. Automatización, análisis predictivo y optimización de procesos para empresas B2B.',
  keywords: [
    'inteligencia artificial',
    'IA empresarial',
    'automatización',
    'análisis predictivo',
    'machine learning',
    'B2B',
    'transformación digital',
    'optimización de procesos',
  ],
  authors: [{ name: 'Si Tu Supieras El Poder de la IA' }],
  creator: 'Si Tu Supieras El Poder de la IA',
  publisher: 'Si Tu Supieras El Poder de la IA',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://stselpoderdelaia.online'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'es_ES',
    url: 'https://stselpoderdelaia.online',
    title: 'Si Tu Supieras El Poder de la IA | Soluciones B2B de Inteligencia Artificial',
    description: 'Transforma tu empresa con soluciones de IA personalizadas. Automatización, análisis predictivo y optimización de procesos para empresas B2B.',
    siteName: 'Si Tu Supieras El Poder de la IA',
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Si Tu Supieras El Poder de la IA',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Si Tu Supieras El Poder de la IA | Soluciones B2B de Inteligencia Artificial',
    description: 'Transforma tu empresa con soluciones de IA personalizadas.',
    images: ['/images/og-image.jpg'],
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
  verification: {
    google: 'your-google-verification-code',
    yandex: 'your-yandex-verification-code',
    yahoo: 'your-yahoo-verification-code',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="theme-color" content="#0ea5e9" />
        <meta name="msapplication-TileColor" content="#0ea5e9" />
      </head>
      <body className={`${inter.variable} ${poppins.variable} font-sans antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <AnalyticsProvider>
            <div className="min-h-screen bg-white dark:bg-dark-900">
              <Header />
              <main className="flex-1">
                {children}
              </main>
              <Footer />
            </div>
            <Toaster
              position="top-right"
              toastOptions={{
                duration: 4000,
                style: {
                  background: '#363636',
                  color: '#fff',
                },
                success: {
                  duration: 3000,
                  iconTheme: {
                    primary: '#10b981',
                    secondary: '#fff',
                  },
                },
              }}
            />
          </AnalyticsProvider>
        </ThemeProvider>
      </body>
    </html>
  );
} 