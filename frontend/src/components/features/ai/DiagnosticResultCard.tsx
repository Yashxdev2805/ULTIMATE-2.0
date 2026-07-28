'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { AIDiagnosticResult } from '@/lib/ai-engine';
import { useCartStore } from '@/store/useCartStore';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { GlassCard } from '@/components/ui/GlassCard';
import {
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  ShoppingCart,
  Calendar,
  Wrench,
  Cpu,
  Clock,
  DollarSign,
  ShieldAlert,
} from 'lucide-react';

interface DiagnosticResultCardProps {
  result: AIDiagnosticResult;
  onReset?: () => void;
}

export function DiagnosticResultCard({ result, onReset }: DiagnosticResultCardProps) {
  const { addItem } = useCartStore();
  const router = useRouter();

  const handleAddAllToCart = () => {
    // Add recommended parts
    result.recommendedParts.forEach((part) => {
      addItem({
        id: part.id,
        name: part.name,
        price: part.price,
        image: part.image || '/demo.jpg',
        type: 'part',
        compatibility: result.deviceName,
      });
    });

    // Add recommended tools
    result.recommendedTools.forEach((tool) => {
      addItem({
        id: tool.id,
        name: tool.name,
        price: tool.price,
        image: tool.image || '/demo.jpg',
        type: 'tool',
        compatibility: result.deviceName,
      });
    });
  };

  const handleBookRepair = () => {
    router.push('/dashboard');
  };

  const getSeverityBadge = () => {
    switch (result.severity) {
      case 'critical':
        return <Badge variant="warning">Critical Risk</Badge>;
      case 'high':
        return <Badge variant="warning">High Priority</Badge>;
      case 'medium':
        return <Badge variant="oem">Moderate Issue</Badge>;
      default:
        return <Badge variant="fitment">Minor Repair</Badge>;
    }
  };

  return (
    <GlassCard variant="glowing" glowColor="violet" className="p-6 sm:p-8 space-y-6">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b dark:border-white/10 border-slate-200">
        <div className="space-y-1">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs font-mono font-bold text-brand-violet flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5" /> AI DIAGNOSTIC REPORT
            </span>
            {getSeverityBadge()}
            <span className="text-xs font-mono dark:text-slate-400 text-slate-600 font-medium">
              Target: {result.deviceName}
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-display font-bold dark:text-white text-slate-900">
            {result.issueTitle}
          </h2>
        </div>

        {/* AI Confidence Score Meter */}
        <div className="flex items-center gap-3 p-3 rounded-2xl dark:bg-white/5 bg-slate-100 border dark:border-white/10 border-slate-300">
          <div className="text-right">
            <div className="text-[10px] uppercase font-mono dark:text-slate-400 text-slate-500 font-semibold">
              AI Confidence
            </div>
            <div className="text-xl font-bold font-mono text-emerald-500 dark:text-emerald-400">
              {result.confidenceScore}%
            </div>
          </div>
          <div className="w-10 h-10 rounded-full bg-emerald-500/20 text-emerald-500 flex items-center justify-center font-bold font-mono text-xs">
            ✓
          </div>
        </div>
      </div>

      {/* Summary Paragraph */}
      <div className="text-sm dark:text-slate-300 text-slate-700 leading-relaxed font-medium">
        {result.summary}
      </div>

      {/* Warning Alert if present */}
      {result.warningNote && (
        <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-start gap-3 text-amber-700 dark:text-amber-300 text-xs font-medium">
          <ShieldAlert className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
          <div>
            <strong className="font-semibold text-amber-800 dark:text-amber-200">Critical Warning:</strong>
            <p className="mt-0.5 leading-relaxed">{result.warningNote}</p>
          </div>
        </div>
      )}

      {/* Grid: Possible Causes & Repair Steps */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Possible Root Causes */}
        <div className="p-4 rounded-2xl dark:bg-white/5 bg-slate-50 border dark:border-white/10 border-slate-200 space-y-2">
          <h3 className="text-xs font-mono font-bold dark:text-white text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
            <Cpu className="w-4 h-4 text-brand-orange" /> Probable Root Causes
          </h3>
          <ul className="space-y-1.5 text-xs dark:text-slate-300 text-slate-700">
            {result.possibleCauses.map((cause, idx) => (
              <li key={idx} className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-orange shrink-0"></span>
                <span>{cause}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Recommended Repair Overview */}
        <div className="p-4 rounded-2xl dark:bg-white/5 bg-slate-50 border dark:border-white/10 border-slate-200 space-y-2">
          <h3 className="text-xs font-mono font-bold dark:text-white text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
            <Wrench className="w-4 h-4 text-brand-cyan" /> Repair Feasibility
          </h3>
          <div className="grid grid-cols-3 gap-2 text-center text-xs">
            <div className="p-2 rounded-xl dark:bg-black/30 bg-white border dark:border-white/5 border-slate-200">
              <span className="text-[10px] text-slate-400 block">Type</span>
              <strong className="dark:text-white text-slate-900">{result.recommendedRepairType}</strong>
            </div>
            <div className="p-2 rounded-xl dark:bg-black/30 bg-white border dark:border-white/5 border-slate-200">
              <span className="text-[10px] text-slate-400 block">Est. Time</span>
              <strong className="dark:text-white text-slate-900">{result.estimatedTime}</strong>
            </div>
            <div className="p-2 rounded-xl dark:bg-black/30 bg-white border dark:border-white/5 border-slate-200">
              <span className="text-[10px] text-slate-400 block">Parts Est.</span>
              <strong className="text-emerald-500 font-mono">${result.estimatedCost.toFixed(2)}</strong>
            </div>
          </div>
        </div>
      </div>

      {/* Step by Step Action Plan */}
      <div className="space-y-3">
        <h3 className="text-sm font-semibold dark:text-white text-slate-900">
          Recommended Action Plan
        </h3>
        <div className="space-y-2">
          {result.repairStepsSummary.map((step, idx) => (
            <div key={idx} className="flex items-start gap-2.5 text-xs dark:text-slate-300 text-slate-700">
              <span className="flex-shrink-0 w-5 h-5 rounded-full bg-brand-violet/20 text-brand-violet text-center font-mono font-bold text-[11px] flex items-center justify-center">
                {idx + 1}
              </span>
              <span className="pt-0.5 leading-relaxed">{step}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Recommended Parts & Tools List */}
      <div className="pt-4 border-t dark:border-white/10 border-slate-200 space-y-3">
        <h3 className="text-sm font-semibold dark:text-white text-slate-900 flex items-center justify-between">
          <span>Required Parts & Tools</span>
          <span className="text-xs text-slate-400 font-mono">100% Fitment Verified</span>
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {result.recommendedParts.map((part) => (
            <div key={part.id} className="p-3 rounded-xl dark:bg-white/5 bg-slate-100 border dark:border-white/10 border-slate-200 flex justify-between items-center text-xs">
              <div className="font-semibold dark:text-white text-slate-900 truncate pr-2">{part.name}</div>
              <div className="text-brand-orange font-bold font-mono">${part.price.toFixed(2)}</div>
            </div>
          ))}
          {result.recommendedTools.map((tool) => (
            <div key={tool.id} className="p-3 rounded-xl dark:bg-white/5 bg-slate-100 border dark:border-white/10 border-slate-200 flex justify-between items-center text-xs">
              <div className="font-semibold dark:text-white text-slate-900 truncate pr-2">{tool.name}</div>
              <div className="text-brand-cyan font-bold font-mono">${tool.price.toFixed(2)}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-3">
        <Button
          variant="flame"
          size="lg"
          onClick={handleAddAllToCart}
          className="w-full sm:w-auto"
          leftIcon={<ShoppingCart className="w-4 h-4" />}
        >
          Add All Needed Parts & Tools to Cart
        </Button>

        <Button
          variant="violet"
          size="lg"
          onClick={handleBookRepair}
          className="w-full sm:w-auto"
          leftIcon={<Calendar className="w-4 h-4" />}
        >
          Book Doorstep Technician Repair
        </Button>

        {onReset && (
          <Button variant="ghost" size="md" onClick={onReset} className="w-full sm:w-auto dark:text-slate-300 text-slate-700">
            Run Another Diagnosis
          </Button>
        )}
      </div>
    </GlassCard>
  );
}
