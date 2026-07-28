'use client';

import React from 'react';
import { GlassCard } from '@/components/ui/GlassCard';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { BookOpen, Wrench, ArrowRight, ShieldCheck } from 'lucide-react';

export default function DIYGuidesPage() {
  return (
    <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="space-y-6 mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-cyan/10 border border-brand-cyan/30 text-cyan-400 text-xs font-semibold uppercase tracking-wider">
          <BookOpen className="w-3.5 h-3.5" /> DIY Repair Education
        </div>
        <h1 className="text-3xl sm:text-5xl font-display font-extrabold text-white tracking-tight">
          Step-by-Step <span className="text-gradient-cyan">DIY Repair Guides</span>
        </h1>
        <p className="text-slate-300 text-base max-w-2xl leading-relaxed">
          Interactive step viewer, torque specifications, tool checklists, and 1-click bundle purchasing for hardware self-repairs.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <GlassCard variant="interactive" glowColor="cyan" className="p-6 space-y-4">
          <div className="flex justify-between items-center">
            <Badge variant="fitment">Intermediate</Badge>
            <span className="text-xs font-mono text-slate-400">45 Mins</span>
          </div>
          <h3 className="text-lg font-display font-bold text-white">iPhone 15 Pro Screen & Digitizer Replacement</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Replace a cracked OLED screen using precision Pentalobe P2 and Tri-Point Y000 screwdrivers.
          </p>
          <div className="pt-2 flex justify-between items-center">
            <span className="text-xs font-mono text-emerald-400">✓ Part Bundle Included</span>
            <Button variant="neon" size="sm" rightIcon={<ArrowRight className="w-3.5 h-3.5" />}>View Guide</Button>
          </div>
        </GlassCard>

        <GlassCard variant="interactive" glowColor="orange" className="p-6 space-y-4">
          <div className="flex justify-between items-center">
            <Badge variant="warning">Master Tier</Badge>
            <span className="text-xs font-mono text-slate-400">60 Mins</span>
          </div>
          <h3 className="text-lg font-display font-bold text-white">MacBook Pro M3 Battery Cell Replacement</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Safely remove adhesive strips and install an OEM 99.5Wh battery cell with thermal paste.
          </p>
          <div className="pt-2 flex justify-between items-center">
            <span className="text-xs font-mono text-emerald-400">✓ Part Bundle Included</span>
            <Button variant="flame" size="sm" rightIcon={<ArrowRight className="w-3.5 h-3.5" />}>View Guide</Button>
          </div>
        </GlassCard>

        <GlassCard variant="interactive" glowColor="violet" className="p-6 space-y-4">
          <div className="flex justify-between items-center">
            <Badge variant="oem">Beginner</Badge>
            <span className="text-xs font-mono text-slate-400">20 Mins</span>
          </div>
          <h3 className="text-lg font-display font-bold text-white">PS5 Controller Analog Joystick Drift Fix</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Clean potentiometer sensors or swap Hall Effect magnetic joysticks for zero stick drift.
          </p>
          <div className="pt-2 flex justify-between items-center">
            <span className="text-xs font-mono text-emerald-400">✓ Part Bundle Included</span>
            <Button variant="violet" size="sm" rightIcon={<ArrowRight className="w-3.5 h-3.5" />}>View Guide</Button>
          </div>
        </GlassCard>
      </div>
    </main>
  );
}
