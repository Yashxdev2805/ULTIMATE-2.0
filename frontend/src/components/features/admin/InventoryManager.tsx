'use client';

import React from 'react';
import { useAdminStore } from '@/store/useAdminStore';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Package, AlertTriangle, Plus, Minus, CheckCircle2 } from 'lucide-react';

export function InventoryManager() {
  const { inventory, updateStock } = useAdminStore();

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold dark:text-white text-slate-900 flex items-center gap-2">
          <Package className="w-4 h-4 text-brand-cyan" /> Real-Time Inventory & Stock Threshold Manager
        </h3>
        <span className="text-xs font-mono text-slate-400">Total SKUs: {inventory.length}</span>
      </div>

      <div className="p-4 rounded-2xl dark:bg-white/5 bg-white border dark:border-white/10 border-slate-200 shadow-sm overflow-x-auto">
        <table className="w-full text-xs text-left">
          <thead className="bg-slate-100 dark:bg-white/5 border-b border-slate-200 dark:border-white/10 font-mono text-[11px] text-slate-500 dark:text-slate-400">
            <tr>
              <th className="py-3 px-3">SKU & Item Name</th>
              <th className="py-3 px-3">Category</th>
              <th className="py-3 px-3">Unit Price</th>
              <th className="py-3 px-3 text-center">Status</th>
              <th className="py-3 px-3 text-right">In Stock</th>
              <th className="py-3 px-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 dark:divide-white/5 font-sans">
            {inventory.map((item) => {
              const isLowStock = item.stockCount <= item.minStockThreshold;

              return (
                <tr key={item.id} className="hover:bg-slate-50 dark:hover:bg-white/5 transition-colors">
                  <td className="py-3 px-3">
                    <div className="font-bold dark:text-white text-slate-900">{item.name}</div>
                    <div className="text-[10px] font-mono text-slate-400">{item.sku}</div>
                  </td>
                  <td className="py-3 px-3">
                    <span className="px-2 py-0.5 rounded dark:bg-white/5 bg-slate-100 border dark:border-white/10 border-slate-200 text-[10px] font-mono text-slate-600 dark:text-slate-300">
                      {item.category}
                    </span>
                  </td>
                  <td className="py-3 px-3 font-mono font-bold text-brand-orange">
                    ${item.price.toFixed(2)}
                  </td>
                  <td className="py-3 px-3 text-center">
                    {isLowStock ? (
                      <span className="px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-500 border border-amber-500/30 text-[10px] font-mono font-bold inline-flex items-center gap-1">
                        <AlertTriangle className="w-3 h-3" /> Low Stock
                      </span>
                    ) : (
                      <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-500 border border-emerald-500/30 text-[10px] font-mono font-bold inline-flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" /> Healthy
                      </span>
                    )}
                  </td>
                  <td className="py-3 px-3 text-right font-mono font-bold text-sm dark:text-white text-slate-900">
                    {item.stockCount}
                  </td>
                  <td className="py-3 px-3 text-right">
                    <div className="inline-flex items-center gap-1 border dark:border-white/15 border-slate-300 rounded-lg p-0.5 dark:bg-white/5 bg-slate-100">
                      <button
                        onClick={() => updateStock(item.id, item.stockCount - 1)}
                        className="p-1 text-slate-400 hover:text-slate-900 dark:hover:text-white"
                        title="Reduce Stock"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="px-2 font-mono text-xs dark:text-white text-slate-900">{item.stockCount}</span>
                      <button
                        onClick={() => updateStock(item.id, item.stockCount + 1)}
                        className="p-1 text-slate-400 hover:text-slate-900 dark:hover:text-white"
                        title="Add Stock"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
