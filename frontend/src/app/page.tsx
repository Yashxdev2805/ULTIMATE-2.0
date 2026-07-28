'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '@/providers/ThemeProvider';
import { useCartStore } from '@/store/useCartStore';
import { GlassCard } from '@/components/ui/GlassCard';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import {
  Wrench,
  Cpu,
  Layers,
  Sparkles,
  Sun,
  Moon,
  ShoppingCart,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Zap,
  Activity,
} from 'lucide-react';

export default function Home() {
  const { theme, toggleTheme } = useTheme();
  const { items, addItem, getTotalItems, getTotalPrice } = useCartStore();

  const handleTestAddToCart = () => {
    addItem({
      id: 'demo-part-15-pro-display',
      name: 'iPhone 15 Pro OLED Super Retina Display',
      price: 249.99,
      image: '/demo-screen.jpg',
      compatibility: 'iPhone 15 Pro (A3102)',
      type: 'part',
    });
  };

  return (
    <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Top Banner Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-12 pb-6 border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-2xl bg-gradient-to-br from-[#FF6A00] to-[#7928CA] text-white shadow-glow-orange">
            <Cpu className="w-7 h-7" />
          </div>
          <div>
            <h1 className="text-2xl font-display font-bold text-white tracking-tight flex items-center gap-2">
              Thinkkaro <span className="text-[#FF6A00]">RepairHub</span>
            </h1>
            <p className="text-xs text-slate-400 font-mono">
              v2.0 World-Class Platform Scaffold • Next.js 14 App Router
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Badge variant="fitment">Phase 1 Foundation Operational</Badge>
          <Button
            variant="glass"
            size="sm"
            onClick={toggleTheme}
            leftIcon={theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-indigo-400" />}
          >
            {theme === 'dark' ? 'Light Mode' : 'Obsidian Mode'}
          </Button>
        </div>
      </div>

      {/* Hero Announcement Card */}
      <GlassCard variant="glowing" glowColor="orange" className="p-8 sm:p-10 mb-12">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FF6A00]/10 border border-[#FF6A00]/30 text-[#FF6A00] text-xs font-semibold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" /> Architecture Ready
            </div>
            <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-white tracking-tight">
              Phase 1 Architecture & Design System <span className="text-gradient-orange">Successfully Built</span>
            </h2>
            <p className="text-slate-300 text-base leading-relaxed">
              Next.js 14 App Router scaffolded with Midnight Obsidian tokens, Zustand global store, TanStack Query v5, Framer Motion spring physics, and anti-flash theme support.
            </p>
          </div>

          <div className="flex flex-col gap-3 shrink-0">
            <Button variant="flame" size="lg" rightIcon={<ArrowRight className="w-4 h-4" />}>
              Explore Component Lab
            </Button>
          </div>
        </div>
      </GlassCard>

      {/* Interactive Showcase Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
        {/* Design System Tokens Swatch */}
        <GlassCard variant="interactive" glowColor="cyan" className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Layers className="w-5 h-5 text-brand-cyan" />
              <h3 className="text-lg font-display font-bold text-white">Design Tokens</h3>
            </div>
            <Badge variant="oem">Midnight Obsidian</Badge>
          </div>
          <p className="text-xs text-slate-400 mb-6">
            Curated color tokens, backdrop blurs (`blur-24`), glowing borders, and typography hierarchy.
          </p>

          <div className="space-y-3 font-mono text-xs">
            <div className="p-3 rounded-xl bg-[#0B0F17] border border-white/10 flex justify-between items-center text-slate-300">
              <span>Background Surface</span>
              <span className="font-semibold text-brand-orange">#0B0F17</span>
            </div>
            <div className="p-3 rounded-xl bg-[#121826] border border-white/10 flex justify-between items-center text-slate-300">
              <span>Elevated Glass Card</span>
              <span className="font-semibold text-brand-cyan">rgba(18, 24, 38, 0.7)</span>
            </div>
            <div className="p-3 rounded-xl bg-gradient-to-r from-[#FF6A00] to-[#7928CA] p-3 text-white flex justify-between items-center font-sans font-semibold">
              <span>Flame to Violet Accent</span>
              <span>Gradient Token</span>
            </div>
          </div>
        </GlassCard>

        {/* Zustand State & Store Test */}
        <GlassCard variant="interactive" glowColor="orange" className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <ShoppingCart className="w-5 h-5 text-brand-orange" />
              <h3 className="text-lg font-display font-bold text-white">Zustand Store</h3>
            </div>
            <Badge variant="pulse">{getTotalItems()} Items in Cart</Badge>
          </div>
          <p className="text-xs text-slate-400 mb-6">
            Test real-time store hydration, cart quantity triggers, and fitment compatibility badges.
          </p>

          <div className="space-y-4">
            <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-2">
              <div className="flex justify-between text-xs font-mono text-slate-300">
                <span>Total Items:</span>
                <span className="text-white font-bold">{getTotalItems()}</span>
              </div>
              <div className="flex justify-between text-xs font-mono text-slate-300">
                <span>Cart Subtotal:</span>
                <span className="text-brand-orange font-bold">${getTotalPrice().toFixed(2)}</span>
              </div>
            </div>

            <Button
              variant="flame"
              size="md"
              className="w-full"
              onClick={handleTestAddToCart}
              leftIcon={<ShoppingCart className="w-4 h-4" />}
            >
              Test Add Item to Cart
            </Button>
          </div>
        </GlassCard>

        {/* Atomic Primitives Showcase */}
        <GlassCard variant="interactive" glowColor="violet" className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Wrench className="w-5 h-5 text-brand-violet" />
              <h3 className="text-lg font-display font-bold text-white">Atomic Components</h3>
            </div>
            <Badge variant="violet">UI Kit v1.0</Badge>
          </div>
          <p className="text-xs text-slate-400 mb-6">
            Reusable Button, GlassCard, Badge, and GlowCanvas primitives ready for feature building.
          </p>

          <div className="space-y-3">
            <div className="flex flex-wrap gap-2">
              <Badge variant="fitment">✓ Guaranteed Fit</Badge>
              <Badge variant="oem">100% OEM Part</Badge>
              <Badge variant="pulse">Live Technician</Badge>
              <Badge variant="warning">Low Stock Alert</Badge>
            </div>
            <div className="flex gap-2">
              <Button variant="neon" size="sm" leftIcon={<Zap className="w-3.5 h-3.5" />}>
                Neon CTA
              </Button>
              <Button variant="violet" size="sm" leftIcon={<ShieldCheck className="w-3.5 h-3.5" />}>
                AI Diagnostics
              </Button>
            </div>
          </div>
        </GlassCard>
      </div>

      {/* Phase Roadmap Matrix Checklist */}
      <GlassCard variant="default" className="p-8">
        <h3 className="text-xl font-display font-bold text-white mb-6 flex items-center gap-2">
          <Activity className="w-5 h-5 text-brand-orange" />
          Phased Master Roadmap Status
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
            <div>
              <h4 className="text-sm font-semibold text-emerald-300">Phase 1 — Foundation</h4>
              <p className="text-xs text-emerald-400/80">App Router, Tokens, Zustand & Query Provider wired.</p>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-white/5 border border-white/10 flex items-start gap-3">
            <div className="w-5 h-5 rounded-full border-2 border-brand-orange/60 flex items-center justify-center shrink-0 text-[10px] text-brand-orange font-bold mt-0.5">2</div>
            <div>
              <h4 className="text-sm font-semibold text-white">Phase 2 — Navigation</h4>
              <p className="text-xs text-slate-400">Responsive shell, drawer nav & route stubs.</p>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-white/5 border border-white/10 flex items-start gap-3">
            <div className="w-5 h-5 rounded-full border-2 border-slate-600 flex items-center justify-center shrink-0 text-[10px] text-slate-400 font-bold mt-0.5">3</div>
            <div>
              <h4 className="text-sm font-semibold text-white">Phase 3 — Homepage UX</h4>
              <p className="text-xs text-slate-400">Hero ambient glow, DIY guides & step viewer.</p>
            </div>
          </div>
        </div>
      </GlassCard>
    </main>
  );
}
