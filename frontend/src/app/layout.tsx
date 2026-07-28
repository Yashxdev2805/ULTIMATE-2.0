import type { Metadata, Viewport } from 'next';
import { Outfit, Inter, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import { AppProviders } from '@/providers/AppProviders';
import { GlowCanvas } from '@/components/ui/GlowCanvas';
import { Navbar } from '@/components/layout/Navbar';
import { MobileNavDrawer } from '@/components/layout/MobileNavDrawer';
import { CartDrawer } from '@/components/layout/CartDrawer';
import { Footer } from '@/components/layout/Footer';

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-outfit',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains',
  display: 'swap',
});

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#0B0F17',
};

export const metadata: Metadata = {
  metadataBase: new URL('https://thinkkaro-repairhub.com'),
  title: 'Thinkkaro (RepairHub) | World-Class Repair & Diagnostic Ecosystem',
  description:
    'Ultra-modern consumer electronics diagnostic assistant, guaranteed-fitment parts e-commerce marketplace, DIY repair guides, and doorstep technician booking.',
  keywords: ['repair', 'electronics diagnostic', 'spare parts', 'phone repair', 'laptop repair', 'DIY repair guides', 'doorstep technician'],
  openGraph: {
    title: 'Thinkkaro (RepairHub) | Certified Electronics Repair Platform',
    description: 'Instant AI fault detection, OEM spare parts, precision tool rentals, and certified doorstep repair.',
    url: 'https://thinkkaro-repairhub.com',
    siteName: 'Thinkkaro RepairHub',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Thinkkaro RepairHub Platform',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Thinkkaro RepairHub',
    description: 'AI-powered hardware fault detection & doorstep technician dispatch.',
  },
};

const jsonLdSchema = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: 'Thinkkaro RepairHub',
  description: 'Certified Electronics Diagnostic, DIY Repair Guides & Doorstep Service',
  url: 'https://thinkkaro-repairhub.com',
  telephone: '+1-800-THINKKARO',
  priceRange: '$$',
  address: {
    '@type': 'PostalAddress',
    addressCountry: 'US',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`dark ${outfit.variable} ${inter.variable} ${jetbrainsMono.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdSchema) }}
        />
      </head>
      <body className="min-h-screen selection:bg-brand-orange selection:text-white font-sans antialiased relative flex flex-col transition-colors duration-300">
        <AppProviders>
          <GlowCanvas />
          <Navbar />
          <MobileNavDrawer />
          <CartDrawer />
          <div className="relative z-10 flex-1 flex flex-col">
            {children}
          </div>
          <Footer />
        </AppProviders>
      </body>
    </html>
  );
}
