import type { Metadata } from 'next';
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

export const metadata: Metadata = {
  title: 'Thinkkaro (RepairHub) | World-Class Repair & Diagnostic Ecosystem',
  description:
    'Ultra-modern consumer electronics diagnostic assistant, guaranteed-fitment parts e-commerce marketplace, DIY repair guides, and doorstep technician booking.',
  keywords: ['repair', 'electronics diagnostic', 'spare parts', 'phone repair', 'laptop repair', 'DIY repair guides'],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`dark ${outfit.variable} ${inter.variable} ${jetbrainsMono.variable}`}>
      <body className="bg-obsidian text-slate-100 min-h-screen selection:bg-brand-orange selection:text-white font-sans antialiased relative flex flex-col">
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
