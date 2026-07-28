'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { useUIStore } from '@/store/useUIStore';
import { useCartStore } from '@/store/useCartStore';
import { Button } from '@/components/ui/Button';
import {
  Cpu,
  Sparkles,
  BookOpen,
  ShoppingBag,
  Wrench,
  Calendar,
  ShieldCheck,
  X,
  Smartphone,
  ChevronRight,
} from 'lucide-react';

const mobileNavLinks = [
  { href: '/', label: 'Home', icon: Cpu, desc: 'Overview & Ecosystem' },
  { href: '/ai-assistant', label: 'AI Copilot', icon: Sparkles, badge: 'AI', desc: 'Instant Diagnostic Assistant' },
  { href: '/guides', label: 'DIY Repair Guides', icon: BookOpen, desc: 'Step-by-Step Fixes & Tools' },
  { href: '/parts', label: 'Spare Parts Store', icon: ShoppingBag, desc: 'Guaranteed Fitment Catalog' },
  { href: '/tools', label: 'Tools Sale & Rental', icon: Wrench, desc: 'Precision Screwdrivers & Kits' },
  { href: '/dashboard', label: 'Technician Booking', icon: Calendar, desc: 'Doorstep Pickup & Live Stepper' },
  { href: '/admin', label: 'Admin Control Hub', icon: ShieldCheck, desc: 'Inventory, BI & Dispatch Kanban' },
];

export function MobileNavDrawer() {
  const pathname = usePathname();
  const { isMobileNavOpen, closeMobileNav } = useUIStore();
  const { selectedDevice } = useCartStore();

  // Close drawer on route change or Escape key
  useEffect(() => {
    closeMobileNav();
  }, [pathname, closeMobileNav]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeMobileNav();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [closeMobileNav]);

  return (
    <AnimatePresence>
      {isMobileNavOpen && (
        <>
          {/* Backdrop Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeMobileNav}
            className="fixed inset-0 bg-black/70 backdrop-blur-md z-50 lg:hidden"
          />

          {/* Drawer Content */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 350, damping: 30 }}
            className="fixed top-0 right-0 bottom-0 w-[85%] sm:w-[380px] bg-[#0B0F17] border-l border-white/10 z-50 p-6 flex flex-col justify-between overflow-y-auto lg:hidden"
          >
            {/* Header */}
            <div>
              <div className="flex items-center justify-between pb-6 border-b border-white/10 mb-6">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-xl bg-gradient-to-br from-[#FF6A00] to-[#7928CA] text-white">
                    <Cpu className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="font-display font-bold text-white text-base">Thinkkaro RepairHub</h2>
                    <p className="text-[11px] text-slate-400 font-mono">Mobile Navigation</p>
                  </div>
                </div>

                <Button variant="glass" size="sm" onClick={closeMobileNav} className="p-2 min-h-[48px] min-w-[48px]">
                  <X className="w-5 h-5 text-slate-300" />
                </Button>
              </div>

              {/* Active Selected Device Banner */}
              {selectedDevice?.model && (
                <div className="p-3 mb-6 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-between text-xs text-emerald-300">
                  <div className="flex items-center gap-2">
                    <Smartphone className="w-4 h-4 text-emerald-400 shrink-0" />
                    <div>
                      <span className="font-bold">✓ {selectedDevice.model}</span>
                      <p className="text-[10px] text-emerald-400/80">{selectedDevice.brand} • {selectedDevice.variant}</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Navigation Links with Touch Targets >= 48px */}
              <nav className="space-y-2">
                {mobileNavLinks.map((link) => {
                  const isActive = pathname === link.href;
                  const Icon = link.icon;
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      className={`min-h-[52px] px-4 py-3 rounded-xl flex items-center justify-between transition-all group ${
                        isActive
                          ? 'bg-gradient-to-r from-brand-orange/20 to-brand-violet/20 border border-brand-orange/40 text-white font-semibold'
                          : 'bg-white/5 border border-white/5 text-slate-300 hover:text-white hover:bg-white/10'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <Icon className={`w-5 h-5 ${isActive ? 'text-brand-orange' : 'text-slate-400'}`} />
                        <div>
                          <div className="flex items-center gap-2 text-sm font-medium">
                            <span>{link.label}</span>
                            {link.badge && (
                              <span className="px-1.5 py-0.2 rounded-full bg-brand-violet text-white text-[9px] font-bold">
                                {link.badge}
                              </span>
                            )}
                          </div>
                          <p className="text-[11px] text-slate-400 group-hover:text-slate-300">{link.desc}</p>
                        </div>
                      </div>
                      <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-white" />
                    </Link>
                  );
                })}
              </nav>
            </div>

            {/* Footer Notice */}
            <div className="pt-6 border-t border-white/10 text-xs text-slate-400 text-center font-mono">
              Thinkkaro RepairHub Platform v2.0
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
