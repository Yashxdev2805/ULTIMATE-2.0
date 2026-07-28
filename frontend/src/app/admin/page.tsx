'use client';

import React, { useState } from 'react';
import { AdminAnalytics } from '@/components/features/admin/AdminAnalytics';
import { DispatchKanban } from '@/components/features/admin/DispatchKanban';
import { InventoryManager } from '@/components/features/admin/InventoryManager';
import { TechnicianRoster } from '@/components/features/admin/TechnicianRoster';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import {
  ShieldCheck,
  BarChart3,
  Wrench,
  Package,
  Users,
} from 'lucide-react';

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState<'kanban' | 'inventory' | 'techs' | 'analytics'>('kanban');

  return (
    <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header Banner */}
      <div className="space-y-4 mb-8">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-violet/10 border border-brand-violet/30 text-brand-violet text-xs font-semibold uppercase tracking-wider mb-2">
              <ShieldCheck className="w-3.5 h-3.5" /> Dispatch & Inventory Operations Control
            </div>
            <h1 className="text-3xl sm:text-5xl font-display font-extrabold dark:text-white text-slate-900 tracking-tight">
              Admin & Dispatch <span className="text-gradient-violet">Portal</span>
            </h1>
          </div>
          <Badge variant="oem">Role: Master Dispatcher</Badge>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex items-center gap-2 border-b dark:border-white/10 border-slate-200 pb-3 mb-8 overflow-x-auto">
        <button
          onClick={() => setActiveTab('kanban')}
          className={`px-4 py-2 rounded-xl text-xs font-mono font-bold flex items-center gap-2 transition-all ${
            activeTab === 'kanban'
              ? 'bg-brand-orange text-white shadow-md'
              : 'dark:text-slate-400 text-slate-600 dark:hover:text-white hover:text-slate-900'
          }`}
        >
          <Wrench className="w-4 h-4" /> Dispatch Kanban Board
        </button>

        <button
          onClick={() => setActiveTab('inventory')}
          className={`px-4 py-2 rounded-xl text-xs font-mono font-bold flex items-center gap-2 transition-all ${
            activeTab === 'inventory'
              ? 'bg-brand-cyan text-slate-950 shadow-md'
              : 'dark:text-slate-400 text-slate-600 dark:hover:text-white hover:text-slate-900'
          }`}
        >
          <Package className="w-4 h-4" /> Inventory & Stock
        </button>

        <button
          onClick={() => setActiveTab('techs')}
          className={`px-4 py-2 rounded-xl text-xs font-mono font-bold flex items-center gap-2 transition-all ${
            activeTab === 'techs'
              ? 'bg-purple-600 text-white shadow-md'
              : 'dark:text-slate-400 text-slate-600 dark:hover:text-white hover:text-slate-900'
          }`}
        >
          <Users className="w-4 h-4" /> Field Technicians
        </button>

        <button
          onClick={() => setActiveTab('analytics')}
          className={`px-4 py-2 rounded-xl text-xs font-mono font-bold flex items-center gap-2 transition-all ${
            activeTab === 'analytics'
              ? 'bg-emerald-500 text-slate-950 shadow-md'
              : 'dark:text-slate-400 text-slate-600 dark:hover:text-white hover:text-slate-900'
          }`}
        >
          <BarChart3 className="w-4 h-4" /> Analytics & Revenue
        </button>
      </div>

      {/* Tab Panels */}
      <div className="space-y-8">
        {activeTab === 'kanban' && <DispatchKanban />}
        {activeTab === 'inventory' && <InventoryManager />}
        {activeTab === 'techs' && <TechnicianRoster />}
        {activeTab === 'analytics' && <AdminAnalytics />}
      </div>
    </main>
  );
}
