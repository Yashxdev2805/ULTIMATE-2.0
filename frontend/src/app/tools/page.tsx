'use client';

import React from 'react';
import { GlassCard } from '@/components/ui/GlassCard';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { useCartStore } from '@/store/useCartStore';
import { Wrench, ShoppingCart } from 'lucide-react';

export default function ToolsPage() {
  const { addItem } = useCartStore();

  return (
    <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="space-y-6 mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-cyan/10 border border-brand-cyan/30 text-cyan-400 text-xs font-semibold uppercase tracking-wider">
          <Wrench className="w-3.5 h-3.5" /> Precision Tools Store & Rental
        </div>
        <h1 className="text-3xl sm:text-5xl font-display font-extrabold text-white tracking-tight">
          Precision Electronics <span className="text-gradient-cyan">Repair Toolkits</span>
        </h1>
        <p className="text-slate-300 text-base max-w-2xl leading-relaxed">
          High-torque S2 steel screwdrivers, ESD-safe spudgers, heat guns, and magnetic project mats available for sale or daily rental.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <GlassCard variant="interactive" glowColor="cyan" className="p-6 space-y-4">
          <Badge variant="oem">Pro Toolkit</Badge>
          <h3 className="text-lg font-display font-bold text-white">64-Bit Precision Driver Kit (S2 Steel)</h3>
          <p className="text-xs text-slate-400">Complete magnetic driver set with Pentalobe, Torx Security, Tri-point & Gamebit bits.</p>
          <div className="pt-2 flex justify-between items-center">
            <span className="text-lg font-bold text-brand-cyan font-mono">$34.99</span>
            <Button
              variant="neon"
              size="sm"
              leftIcon={<ShoppingCart className="w-3.5 h-3.5" />}
              onClick={() =>
                addItem({
                  id: 'precision-driver-kit',
                  name: '64-Bit Precision Driver Kit (S2 Steel)',
                  price: 34.99,
                  image: '/demo.jpg',
                  type: 'tool',
                })
              }
            >
              Add to Cart
            </Button>
          </div>
        </GlassCard>

        <GlassCard variant="interactive" glowColor="orange" className="p-6 space-y-4">
          <Badge variant="pulse">Rental Available ($5/day)</Badge>
          <h3 className="text-lg font-display font-bold text-white">Digital Thermal Soldering Workstation</h3>
          <p className="text-xs text-slate-400">Micro-soldering station with hot air rework gun, magnifying lamp, and solder flux.</p>
          <div className="pt-2 flex justify-between items-center">
            <span className="text-lg font-bold text-brand-orange font-mono">$189.99</span>
            <Button
              variant="flame"
              size="sm"
              leftIcon={<ShoppingCart className="w-3.5 h-3.5" />}
              onClick={() =>
                addItem({
                  id: 'soldering-workstation',
                  name: 'Digital Thermal Soldering Workstation',
                  price: 189.99,
                  image: '/demo.jpg',
                  type: 'tool',
                })
              }
            >
              Add to Cart
            </Button>
          </div>
        </GlassCard>
      </div>
    </main>
  );
}
