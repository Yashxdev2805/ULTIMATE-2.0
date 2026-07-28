'use client';

import React from 'react';
import { DiagnosticChat } from '@/components/features/ai/DiagnosticChat';
import { Badge } from '@/components/ui/Badge';
import { Sparkles, Cpu, ShieldCheck, Zap } from 'lucide-react';

export default function AIAssistantPage() {
  return (
    <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Page Header */}
      <div className="space-y-4 mb-10 text-center max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-brand-violet/10 border border-brand-violet/30 text-purple-500 dark:text-purple-400 text-xs font-semibold uppercase tracking-wider">
          <Sparkles className="w-4 h-4" /> AI-Powered Hardware Diagnostics
        </div>
        <h1 className="text-3xl sm:text-5xl font-display font-extrabold dark:text-white text-slate-900 tracking-tight">
          Instant Hardware <span className="text-gradient-violet">Fault Detection</span>
        </h1>
        <p className="dark:text-slate-300 text-slate-700 text-base leading-relaxed font-medium">
          Upload a photo of your damaged screen, battery, or circuit board, or select from common symptoms. Our multi-modal AI calculates root-cause confidence and suggests exact repair parts & tools.
        </p>
      </div>

      {/* Main Diagnostic Chat / Result Area */}
      <div className="max-w-4xl mx-auto">
        <DiagnosticChat />
      </div>
    </main>
  );
}
