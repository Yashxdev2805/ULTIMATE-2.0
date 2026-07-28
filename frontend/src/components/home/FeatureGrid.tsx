'use client';

import React from 'react';
import Link from 'next/link';
import { GlassCard } from '@/components/ui/GlassCard';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import {
  Sparkles,
  ShoppingBag,
  BookOpen,
  Calendar,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Zap,
} from 'lucide-react';

const pillars = [
  {
    id: 'ai-diagnostics',
    title: 'AI Diagnostic Assistant',
    desc: 'Upload damage photos or input symptoms. Our LLM copilot calculates predictive failure scores and pinpoints root causes in seconds.',
    icon: Sparkles,
    badge: 'Multi-Modal AI',
    badgeVariant: 'violet' as const,
    color: 'violet' as const,
    href: '/ai-assistant',
    cta: 'Start AI Diagnostics',
    highlights: ['Photo Damage Recognition', 'Predictive Failure Score', 'Automated Part Matching'],
  },
  {
    id: 'fitment-store',
    title: 'Guaranteed Fitment Store',
    desc: 'Select your Year → Brand → Model → Variant to filter thousands of OEM & refurbished screens, batteries, and charging ports with 100% fitment guarantee.',
    icon: ShoppingBag,
    badge: '100% Compatible',
    badgeVariant: 'fitment' as const,
    color: 'orange' as const,
    href: '/parts',
    cta: 'Browse Compatible Parts',
    highlights: ['Device Compatibility Bar', 'OEM & Refurbished Options', 'Express Sliding Cart Drawer'],
  },
  {
    id: 'diy-guides',
    title: 'Interactive DIY Guides',
    desc: 'Follow step-by-step interactive repair guides with torque specs, safety alerts, diagram mockups, and 1-click complete part/tool bundle checkout.',
    icon: BookOpen,
    badge: '1-Click Bundles',
    badgeVariant: 'oem' as const,
    color: 'cyan' as const,
    href: '/guides',
    cta: 'Explore Repair Guides',
    highlights: ['Interactive Step Stepper', 'Precision Tool Checklists', '10% Bundle Discount'],
  },
  {
    id: 'doorstep-booking',
    title: 'Doorstep Pickup & Booking',
    desc: 'Book verified technician doorstep pickup with pin-code availability matrix, digital invoices, and 5-stage live status tracking.',
    icon: Calendar,
    badge: 'Live Status Stepper',
    badgeVariant: 'pulse' as const,
    color: 'orange' as const,
    href: '/dashboard',
    cta: 'Book Doorstep Repair',
    highlights: ['Geographic Geocoder', 'WhatsApp / SMS Updates', 'Instant PDF Invoices'],
  },
];

export function FeatureGrid() {
  return (
    <section className="py-16 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <Badge variant="oem">Full-Stack Platform Pillars</Badge>
          <h2 className="text-3xl sm:text-4xl font-display font-extrabold dark:text-white text-slate-900 tracking-tight">
            Built for Precision <span className="text-gradient-orange">Hardware Repair</span>
          </h2>
          <p className="dark:text-slate-400 text-slate-600 text-sm">
            Four integrated modules designed to take you from initial device breakdown to verified, working hardware.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {pillars.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <GlassCard
                key={pillar.id}
                variant="interactive"
                glowColor={pillar.color}
                className="p-8 flex flex-col justify-between space-y-6"
              >
                <div className="space-y-4">
                  <div className="flex justify-between items-start">
                    <div className={`p-3 rounded-2xl ${
                      pillar.color === 'violet'
                        ? 'bg-purple-500/10 text-purple-500 dark:text-purple-400'
                        : pillar.color === 'cyan'
                        ? 'bg-cyan-500/10 text-cyan-600 dark:text-cyan-400'
                        : 'bg-orange-500/10 text-orange-500 dark:text-orange-400'
                    }`}>
                      <Icon className="w-7 h-7" />
                    </div>
                    <Badge variant={pillar.badgeVariant}>{pillar.badge}</Badge>
                  </div>

                  <h3 className="text-xl font-display font-bold dark:text-white text-slate-900">{pillar.title}</h3>
                  <p className="dark:text-slate-300 text-slate-700 text-sm leading-relaxed">{pillar.desc}</p>

                  {/* Highlights List */}
                  <ul className="space-y-2 pt-2">
                    {pillar.highlights.map((item, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-xs dark:text-slate-300 text-slate-700 font-mono font-medium">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 dark:text-emerald-400 shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-4 border-t dark:border-white/10 border-slate-200">
                  <Link href={pillar.href}>
                    <Button
                      variant={pillar.color === 'violet' ? 'violet' : pillar.color === 'cyan' ? 'neon' : 'flame'}
                      size="md"
                      className="w-full"
                      rightIcon={<ArrowRight className="w-4 h-4" />}
                    >
                      {pillar.cta}
                    </Button>
                  </Link>
                </div>
              </GlassCard>
            );
          })}
        </div>
      </div>
    </section>
  );
}
