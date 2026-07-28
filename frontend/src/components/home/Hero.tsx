'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import {
  Sparkles,
  Cpu,
  Wrench,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Zap,
  Play,
  Search,
  Clock,
  Award,
} from 'lucide-react';

export function Hero() {
  return (
    <section className="relative pt-12 pb-20 md:pt-20 md:pb-32 overflow-hidden">
      {/* Background Ambient Glow Orbs */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-r from-brand-orange/15 via-brand-cyan/15 to-brand-violet/15 blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-4xl mx-auto space-y-6">
          {/* Top Pill Announcement */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full dark:bg-white/5 bg-slate-200/80 border dark:border-white/15 border-slate-300 backdrop-blur-md shadow-2xl"
          >
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-orange opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-orange"></span>
            </span>
            <span className="text-xs font-semibold dark:text-slate-200 text-slate-800">Thinkkaro RepairHub v2.0 Platform</span>
            <span className="dark:text-slate-500 text-slate-400">•</span>
            <span className="text-xs font-mono text-brand-orange flex items-center gap-1 font-bold">
              <Sparkles className="w-3 h-3" /> Multi-Modal AI Copilot Active
            </span>
          </motion.div>

          {/* Display Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-6xl lg:text-7xl font-display font-extrabold tracking-tight dark:text-white text-slate-900 leading-[1.1]"
          >
            Next-Gen Repair, Diagnostics & <br className="hidden sm:inline" />
            <span className="text-gradient-hero">Spare Parts Ecosystem</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="dark:text-slate-300 text-slate-700 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed font-medium"
          >
            Diagnose hardware failures in seconds with AI, order guaranteed-fitment OEM parts, follow interactive 3D DIY guides, or book doorstep technician pickup with live 5-stage tracking.
          </motion.p>

          {/* Action CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4"
          >
            <Link href="/ai-assistant">
              <Button variant="violet" size="lg" className="w-full sm:w-auto" rightIcon={<Sparkles className="w-4 h-4" />}>
                Start AI Hardware Diagnosis
              </Button>
            </Link>

            <Link href="/guides">
              <Button variant="flame" size="lg" className="w-full sm:w-auto" rightIcon={<ArrowRight className="w-4 h-4" />}>
                Explore DIY Repair Guides
              </Button>
            </Link>

            <Link href="/parts">
              <Button variant="glass" size="lg" className="w-full sm:w-auto border dark:border-white/20 border-slate-300 text-slate-800 dark:text-white" leftIcon={<Search className="w-4 h-4" />}>
                Search Parts Catalog
              </Button>
            </Link>
          </motion.div>

          {/* Live Trust Metrics Strip */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="pt-10 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto"
          >
            <div className="p-3.5 rounded-2xl dark:bg-white/5 bg-white/80 border dark:border-white/10 border-slate-200 backdrop-blur-md text-center shadow-sm">
              <div className="text-xl sm:text-2xl font-bold font-mono text-brand-orange">100%</div>
              <div className="text-[11px] dark:text-slate-400 text-slate-600 font-medium">Fitment Guarantee</div>
            </div>

            <div className="p-3.5 rounded-2xl dark:bg-white/5 bg-white/80 border dark:border-white/10 border-slate-200 backdrop-blur-md text-center shadow-sm">
              <div className="text-xl sm:text-2xl font-bold font-mono text-brand-cyan">50k+</div>
              <div className="text-[11px] dark:text-slate-400 text-slate-600 font-medium">Repairs Completed</div>
            </div>

            <div className="p-3.5 rounded-2xl dark:bg-white/5 bg-white/80 border dark:border-white/10 border-slate-200 backdrop-blur-md text-center shadow-sm">
              <div className="text-xl sm:text-2xl font-bold font-mono text-purple-500 dark:text-purple-400">&lt; 1.5s</div>
              <div className="text-[11px] dark:text-slate-400 text-slate-600 font-medium">Initial Load Time</div>
            </div>

            <div className="p-3.5 rounded-2xl dark:bg-white/5 bg-white/80 border dark:border-white/10 border-slate-200 backdrop-blur-md text-center shadow-sm">
              <div className="text-xl sm:text-2xl font-bold font-mono text-emerald-500 dark:text-emerald-400">4.9 / 5.0</div>
              <div className="text-[11px] dark:text-slate-400 text-slate-600 font-medium">Customer Rating</div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
