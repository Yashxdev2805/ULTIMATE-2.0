'use client';

import React from 'react';
import { GlassCard } from '@/components/ui/GlassCard';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Sparkles, Camera, Cpu, ArrowRight, ShieldCheck } from 'lucide-react';

export default function AIAssistantPage() {
  return (
    <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="space-y-6 mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-violet/10 border border-brand-violet/30 text-purple-500 dark:text-purple-400 text-xs font-semibold uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5" /> AI Diagnostic Copilot
        </div>
        <h1 className="text-3xl sm:text-5xl font-display font-extrabold dark:text-white text-slate-900 tracking-tight">
          Multi-Modal Hardware <span className="text-gradient-violet">Diagnostic Assistant</span>
        </h1>
        <p className="dark:text-slate-300 text-slate-700 text-base max-w-2xl leading-relaxed font-medium">
          Upload damage photos or describe symptoms to calculate predictive failure scores, identify root causes, and view instant repair actions.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <GlassCard variant="interactive" glowColor="violet" className="lg:col-span-2 p-8 space-y-6">
          <div className="flex items-center justify-between border-b dark:border-white/10 border-slate-200 pb-4">
            <h3 className="text-lg font-display font-bold dark:text-white text-slate-900 flex items-center gap-2">
              <Camera className="w-5 h-5 text-purple-500 dark:text-purple-400" /> Photo Damage Recognition
            </h3>
            <Badge variant="violet">Vision AI Ready</Badge>
          </div>

          <div className="border-2 border-dashed dark:border-white/15 border-slate-300 rounded-2xl p-8 text-center space-y-3 hover:border-purple-500/40 transition-colors dark:bg-white/5 bg-slate-50 cursor-pointer">
            <div className="w-12 h-12 rounded-full bg-purple-500/10 text-purple-500 dark:text-purple-400 flex items-center justify-center mx-auto">
              <Camera className="w-6 h-6" />
            </div>
            <h4 className="text-sm font-semibold dark:text-white text-slate-900">Drag & drop broken device photo</h4>
            <p className="text-xs dark:text-slate-400 text-slate-600">Supports cracked screens, corroded motherboards, burnt chips (PNG, JPG, HEIC)</p>
            <Button variant="violet" size="sm">Select Photo File</Button>
          </div>
        </GlassCard>

        <GlassCard variant="default" className="p-6 space-y-4">
          <h3 className="text-base font-display font-bold dark:text-white text-slate-900 flex items-center gap-2">
            <Cpu className="w-4 h-4 text-brand-orange" /> Diagnostic Pipeline Status
          </h3>
          <p className="text-xs dark:text-slate-400 text-slate-600 font-medium">
            Phase 5 will connect this interface directly to Claude / OpenAI / Gemini vision APIs.
          </p>
          <div className="p-3 rounded-xl dark:bg-white/5 bg-slate-100 border dark:border-white/10 border-slate-200 text-xs font-mono dark:text-slate-300 text-slate-800 space-y-1 font-medium">
            <div>Predictive Failure Engine: Ready</div>
            <div>Model Catalog Match: Active</div>
          </div>
        </GlassCard>
      </div>
    </main>
  );
}
