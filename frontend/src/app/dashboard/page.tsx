'use client';

import React from 'react';
import { GlassCard } from '@/components/ui/GlassCard';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Calendar, Truck, Clock, CheckCircle2, FileText, ArrowRight } from 'lucide-react';

export default function DashboardPage() {
  return (
    <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="space-y-6 mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-orange/10 border border-brand-orange/30 text-brand-orange text-xs font-semibold uppercase tracking-wider">
          <Calendar className="w-3.5 h-3.5" /> Doorstep Repair & Order Dashboard
        </div>
        <h1 className="text-3xl sm:text-5xl font-display font-extrabold text-white tracking-tight">
          Live Service Booking & <span className="text-gradient-orange">Order Tracking</span>
        </h1>
        <p className="text-slate-300 text-base max-w-2xl leading-relaxed">
          Book doorstep pickup slots, track real-time technician status with WebSocket push updates, and download PDF invoices.
        </p>
      </div>

      {/* 5-Stage Live Status Stepper Preview */}
      <GlassCard variant="glowing" glowColor="orange" className="p-8 mb-8">
        <div className="flex justify-between items-center mb-6">
          <div>
            <span className="text-xs font-mono text-slate-400">Order #TK-84920</span>
            <h3 className="text-lg font-display font-bold text-white">iPhone 15 Pro Glass Repair</h3>
          </div>
          <Badge variant="pulse">Technician En Route</Badge>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-5 gap-4 relative">
          <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-center space-y-1">
            <CheckCircle2 className="w-5 h-5 text-emerald-400 mx-auto" />
            <div className="text-xs font-bold text-emerald-300">1. Confirmed</div>
            <div className="text-[10px] text-slate-400">10:00 AM</div>
          </div>

          <div className="p-3 rounded-xl bg-orange-500/10 border border-orange-500/30 text-center space-y-1 ring-2 ring-orange-500/40">
            <Truck className="w-5 h-5 text-orange-400 mx-auto animate-bounce" />
            <div className="text-xs font-bold text-orange-300">2. En Route</div>
            <div className="text-[10px] text-slate-400">ETA 15 Mins</div>
          </div>

          <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-center space-y-1 opacity-50">
            <Clock className="w-5 h-5 text-slate-400 mx-auto" />
            <div className="text-xs font-bold text-slate-300">3. Inspection</div>
            <div className="text-[10px] text-slate-400">Pending</div>
          </div>

          <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-center space-y-1 opacity-50">
            <Clock className="w-5 h-5 text-slate-400 mx-auto" />
            <div className="text-xs font-bold text-slate-300">4. Repair & QA</div>
            <div className="text-[10px] text-slate-400">Pending</div>
          </div>

          <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-center space-y-1 opacity-50">
            <Clock className="w-5 h-5 text-slate-400 mx-auto" />
            <div className="text-xs font-bold text-slate-300">5. Delivered</div>
            <div className="text-[10px] text-slate-400">Pending</div>
          </div>
        </div>

        <div className="mt-6 pt-4 border-t border-white/10 flex justify-between items-center">
          <span className="text-xs text-slate-400">Technician: Alex Rivera (PIN Code 110001)</span>
          <Button variant="glass" size="sm" leftIcon={<FileText className="w-3.5 h-3.5" />}>
            Download Digital Invoice (PDF)
          </Button>
        </div>
      </GlassCard>
    </main>
  );
}
