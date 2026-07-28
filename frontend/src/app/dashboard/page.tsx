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
        <h1 className="text-3xl sm:text-5xl font-display font-extrabold dark:text-white text-slate-900 tracking-tight">
          Live Service Booking & <span className="text-gradient-orange">Order Tracking</span>
        </h1>
        <p className="dark:text-slate-300 text-slate-700 text-base max-w-2xl leading-relaxed font-medium">
          Book doorstep pickup slots, track real-time technician status with WebSocket push updates, and download PDF invoices.
        </p>
      </div>

      {/* 5-Stage Live Status Stepper Preview */}
      <GlassCard variant="glowing" glowColor="orange" className="p-8 mb-8">
        <div className="flex justify-between items-center mb-6">
          <div>
            <span className="text-xs font-mono dark:text-slate-400 text-slate-600 font-medium">Order #TK-84920</span>
            <h3 className="text-lg font-display font-bold dark:text-white text-slate-900">iPhone 15 Pro Glass Repair</h3>
          </div>
          <Badge variant="pulse">Technician En Route</Badge>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-5 gap-4 relative">
          <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-center space-y-1">
            <CheckCircle2 className="w-5 h-5 text-emerald-500 dark:text-emerald-400 mx-auto" />
            <div className="text-xs font-bold text-emerald-600 dark:text-emerald-300">1. Confirmed</div>
            <div className="text-[10px] dark:text-slate-400 text-slate-600">10:00 AM</div>
          </div>

          <div className="p-3 rounded-xl bg-orange-500/10 border border-orange-500/30 text-center space-y-1 ring-2 ring-orange-500/40">
            <Truck className="w-5 h-5 text-orange-500 dark:text-orange-400 mx-auto animate-bounce" />
            <div className="text-xs font-bold text-orange-600 dark:text-orange-300">2. En Route</div>
            <div className="text-[10px] dark:text-slate-400 text-slate-600">ETA 15 Mins</div>
          </div>

          <div className="p-3 rounded-xl dark:bg-white/5 bg-slate-100 border dark:border-white/10 border-slate-300 text-center space-y-1 opacity-60">
            <Clock className="w-5 h-5 text-slate-400 mx-auto" />
            <div className="text-xs font-bold dark:text-slate-300 text-slate-700">3. Inspection</div>
            <div className="text-[10px] text-slate-500">Pending</div>
          </div>

          <div className="p-3 rounded-xl dark:bg-white/5 bg-slate-100 border dark:border-white/10 border-slate-300 text-center space-y-1 opacity-60">
            <Clock className="w-5 h-5 text-slate-400 mx-auto" />
            <div className="text-xs font-bold dark:text-slate-300 text-slate-700">4. Repair & QA</div>
            <div className="text-[10px] text-slate-500">Pending</div>
          </div>

          <div className="p-3 rounded-xl dark:bg-white/5 bg-slate-100 border dark:border-white/10 border-slate-300 text-center space-y-1 opacity-60">
            <Clock className="w-5 h-5 text-slate-400 mx-auto" />
            <div className="text-xs font-bold dark:text-slate-300 text-slate-700">5. Delivered</div>
            <div className="text-[10px] text-slate-500">Pending</div>
          </div>
        </div>

        <div className="mt-6 pt-4 border-t dark:border-white/10 border-slate-200 flex justify-between items-center">
          <span className="text-xs dark:text-slate-400 text-slate-600 font-medium">Technician: Alex Rivera (PIN Code 110001)</span>
          <Button variant="glass" size="sm" className="dark:text-slate-200 text-slate-800 border dark:border-white/15 border-slate-300" leftIcon={<FileText className="w-3.5 h-3.5" />}>
            Download Digital Invoice (PDF)
          </Button>
        </div>
      </GlassCard>
    </main>
  );
}
