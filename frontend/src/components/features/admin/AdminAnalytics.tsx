'use client';

import React from 'react';
import { GlassCard } from '@/components/ui/GlassCard';
import { Badge } from '@/components/ui/Badge';
import {
  DollarSign,
  Wrench,
  Star,
  CheckCircle2,
  TrendingUp,
  Users,
  PackageCheck,
  AlertTriangle,
} from 'lucide-react';

export function AdminAnalytics() {
  return (
    <div className="space-y-6">
      {/* 4 Metric Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Revenue */}
        <GlassCard variant="glowing" glowColor="orange" className="p-5 flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-[11px] font-mono dark:text-slate-400 text-slate-500 uppercase font-semibold">
              Monthly Revenue
            </span>
            <div className="text-2xl font-bold font-mono text-brand-orange">
              $48,920.00
            </div>
            <div className="text-[10px] text-emerald-500 font-mono flex items-center gap-1">
              <TrendingUp className="w-3 h-3" /> +18.4% vs last month
            </div>
          </div>
          <div className="p-3 rounded-2xl bg-brand-orange/10 text-brand-orange border border-brand-orange/20">
            <DollarSign className="w-6 h-6" />
          </div>
        </GlassCard>

        {/* Active Repair Tickets */}
        <GlassCard variant="glowing" glowColor="cyan" className="p-5 flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-[11px] font-mono dark:text-slate-400 text-slate-500 uppercase font-semibold">
              Active Doorstep Jobs
            </span>
            <div className="text-2xl font-bold font-mono text-brand-cyan">
              18 Active
            </div>
            <div className="text-[10px] dark:text-slate-400 text-slate-600 font-mono">
              4 Techs currently on site
            </div>
          </div>
          <div className="p-3 rounded-2xl bg-brand-cyan/10 text-brand-cyan border border-brand-cyan/20">
            <Wrench className="w-6 h-6" />
          </div>
        </GlassCard>

        {/* Technician Rating */}
        <GlassCard variant="glowing" glowColor="violet" className="p-5 flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-[11px] font-mono dark:text-slate-400 text-slate-500 uppercase font-semibold">
              Avg. Tech Satisfaction
            </span>
            <div className="text-2xl font-bold font-mono text-amber-400">
              4.92 / 5.0
            </div>
            <div className="text-[10px] dark:text-slate-400 text-slate-600 font-mono">
              Based on 1,420 customer ratings
            </div>
          </div>
          <div className="p-3 rounded-2xl bg-amber-400/10 text-amber-400 border border-amber-400/20">
            <Star className="w-6 h-6 fill-current" />
          </div>
        </GlassCard>

        {/* Repair Success Rate */}
        <GlassCard variant="default" className="p-5 flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-[11px] font-mono dark:text-slate-400 text-slate-500 uppercase font-semibold">
              First-Visit Fix Rate
            </span>
            <div className="text-2xl font-bold font-mono text-emerald-500">
              98.4%
            </div>
            <div className="text-[10px] text-emerald-500 font-mono">
              Zero warranty claim returns
            </div>
          </div>
          <div className="p-3 rounded-2xl bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
            <CheckCircle2 className="w-6 h-6" />
          </div>
        </GlassCard>
      </div>

      {/* Visual Revenue Breakdown & Operational Health Bar */}
      <div className="p-6 rounded-2xl dark:bg-white/5 bg-white border dark:border-white/10 border-slate-200 shadow-sm space-y-4">
        <h3 className="text-sm font-semibold dark:text-white text-slate-900 flex items-center justify-between">
          <span>Revenue Streams & Service Volume Breakdown</span>
          <span className="text-xs font-mono text-slate-400">Real-Time Sync</span>
        </h3>

        <div className="space-y-3 text-xs">
          <div>
            <div className="flex justify-between mb-1">
              <span className="dark:text-slate-300 text-slate-700">OEM & Refurbished Spare Parts Commerce (62%)</span>
              <span className="font-mono font-bold text-brand-orange">$30,330.40</span>
            </div>
            <div className="w-full bg-slate-200 dark:bg-white/10 h-2.5 rounded-full overflow-hidden">
              <div className="bg-brand-orange h-full rounded-full" style={{ width: '62%' }}></div>
            </div>
          </div>

          <div>
            <div className="flex justify-between mb-1">
              <span className="dark:text-slate-300 text-slate-700">On-Site Doorstep Technician Labor (26%)</span>
              <span className="font-mono font-bold text-brand-cyan">$12,719.20</span>
            </div>
            <div className="w-full bg-slate-200 dark:bg-white/10 h-2.5 rounded-full overflow-hidden">
              <div className="bg-brand-cyan h-full rounded-full" style={{ width: '26%' }}></div>
            </div>
          </div>

          <div>
            <div className="flex justify-between mb-1">
              <span className="dark:text-slate-300 text-slate-700">Precision Toolkit Sales & Equipment Rentals (12%)</span>
              <span className="font-mono font-bold text-purple-400">$5,870.40</span>
            </div>
            <div className="w-full bg-slate-200 dark:bg-white/10 h-2.5 rounded-full overflow-hidden">
              <div className="bg-purple-500 h-full rounded-full" style={{ width: '12%' }}></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
