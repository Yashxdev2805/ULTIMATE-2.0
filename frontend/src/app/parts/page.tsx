'use client';

import React from 'react';
import { GlassCard } from '@/components/ui/GlassCard';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { useCartStore } from '@/store/useCartStore';
import { ShoppingBag, CheckCircle2, ShoppingCart, Smartphone } from 'lucide-react';

export default function PartsPage() {
  const { addItem, selectedDevice } = useCartStore();

  return (
    <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="space-y-6 mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-orange/10 border border-brand-orange/30 text-brand-orange text-xs font-semibold uppercase tracking-wider">
          <ShoppingBag className="w-3.5 h-3.5" /> Guaranteed Fitment Store
        </div>
        <h1 className="text-3xl sm:text-5xl font-display font-extrabold text-white tracking-tight">
          OEM & Refurbished <span className="text-gradient-orange">Spare Parts</span>
        </h1>
        <p className="text-slate-300 text-base max-w-2xl leading-relaxed">
          Filter thousands of verified screens, batteries, charging ports, and motherboards guaranteed to fit your exact model.
        </p>

        {selectedDevice?.model && (
          <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center gap-3 text-sm text-emerald-300 max-w-lg">
            <Smartphone className="w-5 h-5 text-emerald-400 shrink-0" />
            <div>
              Active Filter: <strong className="text-white">{selectedDevice.model}</strong> ({selectedDevice.variant})
              <p className="text-xs text-emerald-400/80">Displaying 100% verified compatible replacement parts.</p>
            </div>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <GlassCard variant="interactive" glowColor="orange" className="p-6 space-y-4">
          <Badge variant="fitment">✓ Guaranteed Fit</Badge>
          <h3 className="text-lg font-display font-bold text-white">iPhone 15 Pro Super Retina XDR Display</h3>
          <p className="text-xs text-slate-400">Original OEM OLED panel with pre-installed adhesive and camera bracket.</p>
          <div className="pt-2 flex justify-between items-center">
            <span className="text-lg font-bold text-brand-orange font-mono">$249.99</span>
            <Button
              variant="flame"
              size="sm"
              leftIcon={<ShoppingCart className="w-3.5 h-3.5" />}
              onClick={() =>
                addItem({
                  id: 'iphone-15-pro-display',
                  name: 'iPhone 15 Pro Super Retina XDR Display',
                  price: 249.99,
                  image: '/demo.jpg',
                  compatibility: 'iPhone 15 Pro (A3102)',
                  type: 'part',
                })
              }
            >
              Add to Cart
            </Button>
          </div>
        </GlassCard>

        <GlassCard variant="interactive" glowColor="cyan" className="p-6 space-y-4">
          <Badge variant="oem">100% OEM Original</Badge>
          <h3 className="text-lg font-display font-bold text-white">MacBook Pro 16" OEM High-Density Battery</h3>
          <p className="text-xs text-slate-400">Fresh zero-cycle 99.5Wh lithium-ion battery with removal pull tabs.</p>
          <div className="pt-2 flex justify-between items-center">
            <span className="text-lg font-bold text-brand-cyan font-mono">$129.99</span>
            <Button
              variant="neon"
              size="sm"
              leftIcon={<ShoppingCart className="w-3.5 h-3.5" />}
              onClick={() =>
                addItem({
                  id: 'macbook-pro-16-battery',
                  name: 'MacBook Pro 16" OEM High-Density Battery',
                  price: 129.99,
                  image: '/demo.jpg',
                  compatibility: 'MacBook Pro 16" (A2992)',
                  type: 'part',
                })
              }
            >
              Add to Cart
            </Button>
          </div>
        </GlassCard>

        <GlassCard variant="interactive" glowColor="violet" className="p-6 space-y-4">
          <Badge variant="violet">Refurbished Grade A</Badge>
          <h3 className="text-lg font-display font-bold text-white">Galaxy S24 Ultra USB-C Charging Port Board</h3>
          <p className="text-xs text-slate-400">Flex cable assembly with microphone and SIM card reader tray.</p>
          <div className="pt-2 flex justify-between items-center">
            <span className="text-lg font-bold text-purple-400 font-mono">$39.99</span>
            <Button
              variant="violet"
              size="sm"
              leftIcon={<ShoppingCart className="w-3.5 h-3.5" />}
              onClick={() =>
                addItem({
                  id: 'galaxy-s24-charging-port',
                  name: 'Galaxy S24 Ultra USB-C Charging Port Board',
                  price: 39.99,
                  image: '/demo.jpg',
                  compatibility: 'Galaxy S24 Ultra (SM-S928B)',
                  type: 'part',
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
