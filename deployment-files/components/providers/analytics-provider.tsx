'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

interface AnalyticsProviderProps {
  children: React.ReactNode;
}

export function AnalyticsProvider({ children }: AnalyticsProviderProps) {
  const pathname = usePathname();

  useEffect(() => {
    // Google Analytics 4
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('config', process.env.NEXT_PUBLIC_GA_ID!, {
        page_path: pathname,
      });
    }

    // Facebook Pixel
    if (typeof window !== 'undefined' && window.fbq) {
      window.fbq('track', 'PageView');
    }

    // LinkedIn Insight
    if (typeof window !== 'undefined' && window.lintrk) {
      window.lintrk('track', { conversion_id: process.env.NEXT_PUBLIC_LINKEDIN_ID });
    }
  }, [pathname]);

  return <>{children}</>;
}

// Declare global types for analytics
declare global {
  interface Window {
    gtag: (...args: any[]) => void;
    fbq: (...args: any[]) => void;
    lintrk: (...args: any[]) => void;
  }
} 