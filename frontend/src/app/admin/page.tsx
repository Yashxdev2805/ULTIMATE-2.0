'use client';

import React from 'react';
import { GlassCard } from '@/components/ui/GlassCard';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { ShieldCheck, BarChart3, Layers, QrCode, Users, Lock } from 'lucide-react';

export default function AdminPage() {
  return (
    <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="space-y-6 mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-violet/10 border border-brand-violet/30 text-purple-400 text-xs font-semibold uppercase tracking-wider">
          <ShieldCheck className="w-3.5 h-3.5" /> Enterprise Operations
        </div>
        <h1 className="text-3xl sm:text-5xl font-display font-extrabold text-white tracking-tight">
          Admin Control Center & <span className="text-gradient-violet">Dispatch Hub</span>
        </h1>
        <p className="text-slate-300 text-base max-w-2xl leading-relaxed">
          Business intelligence dashboards, drag-and-drop repair dispatch Kanban, barcode inventory scanning, and 4-tier Role-Based Access Control (RBAC).
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        <GlassCard variant="interactive" glowColor="violet" className="p-6 space-y-2">
          <div className="flex justify-between items-center text-xs text-slate-400">
            <span>Gross Revenue (GMV)</span>
            <BarChart3 className="w-4 h-4 text-purple-400" />
          </div>
          <div className="text-2xl font-bold text-white font-mono">$48,290.00</div>
          <div className="text-[11px] text-emerald-400 font-mono">↑ 18.4% vs last month</div>
        </GlassCard>

        <GlassCard variant="interactive" glowColor="orange" className="p-6 space-y-2">
          <div className="flex justify-between items-center text-xs text-slate-400">
            <span>Active Kanban Tickets</span>
            <Layers className="w-4 h-4 text-brand-orange" />
          </div>
          <div className="text-2xl font-bold text-white font-mono">24 Tickets</div>
          <div className="text-[11px] text-orange-400 font-mono">6 Dispatch Ready</div>
        </GlassCard>

        <GlassCard variant="interactive" glowColor="cyan" className="p-6 space-y-2">
          <div className="flex justify-between items-center text-xs text-slate-400">
            <span>Low Stock Alerts</span>
            <QrCode className="w-4 h-4 text-brand-cyan" />
          </div>
          <div className="text-2xl font-bold text-white font-mono">3 SKUs</div>
          <div className="text-[11px] text-brand-cyan font-mono">Auto-PO Drafted</div>
        </GlassCard>

        <GlassCard variant="interactive" glowColor="violet" className="p-6 space-y-2">
          <div className="flex justify-between items-center text-xs text-slate-400">
            <span>Active Admin Role</span>
            <Lock className="w-4 h-4 text-purple-400" />
          </div>
          <div className="text-xl font-bold text-white font-mono">Super Admin</div>
          <div className="text-[11px] text-slate-400 font-mono">Audit Trail Active</div>
        </GlassCard>
      </div>

      <GlassCard variant="default" className="p-8 text-center space-y-4">
        <h3 className="text-lg font-display font-bold text-white">Phase 7 Enterprise Modular Rebuild Preview</h3>
        <p className="text-xs text-slate-400 max-w-lg mx-auto">
          Phase 7 will replace the old monolithic admin panel with Recharts analytics widgets, Trello-style Kanban dispatch board, and role-based route permissions.
        </p>
      </GlassCard>
    </main>
  );
}
