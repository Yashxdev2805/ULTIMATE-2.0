'use client';

import React from 'react';
import { GlassCard } from '@/components/ui/GlassCard';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Product } from '@/types/commerce';
import { useCartStore } from '@/store/useCartStore';
import { ShoppingCart, Eye, CheckCircle2, AlertTriangle, Star, Calendar } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  onOpenModal: (product: Product) => void;
}

export function ProductCard({ product, onOpenModal }: ProductCardProps) {
  const { addItem, selectedDevice } = useCartStore();

  // Check if product is.compatible with currently selected device
  const isCompatible =
    !selectedDevice?.model ||
    product.compatibleDevices.some((d) => d.toLowerCase().includes(selectedDevice.model!.toLowerCase()));

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: '/demo.jpg',
      type: product.type,
      compatibility: product.compatibleDevices.join(', '),
    });
  };

  return (
    <GlassCard
      variant="interactive"
      glowColor={product.type === 'tool' ? 'cyan' : 'orange'}
      className="p-6 flex flex-col justify-between space-y-4"
      onClick={() => onOpenModal(product)}
    >
      <div className="space-y-3">
        {/* Top Badges */}
        <div className="flex items-center justify-between gap-2">
          {product.condition === 'OEM' ? (
            <Badge variant="oem">100% OEM Original</Badge>
          ) : product.condition === 'Refurbished' ? (
            <Badge variant="violet">Refurbished Grade A</Badge>
          ) : (
            <Badge variant="fitment">Aftermarket</Badge>
          )}

          {/* Fitment Indicator Badge */}
          {selectedDevice?.model && (
            <span
              className={`text-[10px] px-2 py-0.5 rounded-full font-mono font-bold flex items-center gap-1 ${
                isCompatible
                  ? 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/30'
                  : 'bg-amber-500/10 text-amber-500 border border-amber-500/30'
              }`}
            >
              {isCompatible ? <CheckCircle2 className="w-3 h-3" /> : <AlertTriangle className="w-3 h-3" />}
              {isCompatible ? 'Fits your device' : 'Check fitment'}
            </span>
          )}
        </div>

        {/* Product Title & Brand */}
        <div>
          <div className="text-[11px] font-mono text-slate-400 font-semibold uppercase tracking-wider">
            {product.brand} • {product.category}
          </div>
          <h3 className="text-base font-display font-bold dark:text-white text-slate-900 line-clamp-2 hover:text-brand-orange transition-colors">
            {product.name}
          </h3>
        </div>

        {/* Rating and Reviews */}
        <div className="flex items-center gap-2 text-xs">
          <div className="flex items-center text-amber-400">
            <Star className="w-3.5 h-3.5 fill-current" />
            <span className="ml-1 font-bold font-mono">{product.rating}</span>
          </div>
          <span className="dark:text-slate-400 text-slate-500">({product.reviewsCount} reviews)</span>
        </div>

        {/* Short Description */}
        <p className="text-xs dark:text-slate-400 text-slate-600 line-clamp-2 leading-relaxed font-normal">
          {product.description}
        </p>

        {/* Key Specs Preview */}
        <div className="flex flex-wrap gap-1 pt-1">
          {Object.entries(product.specs).slice(0, 2).map(([k, v]) => (
            <span
              key={k}
              className="px-2 py-0.5 rounded dark:bg-white/5 bg-slate-200/80 border dark:border-white/10 border-slate-300 text-[10px] dark:text-slate-300 text-slate-800 font-mono"
            >
              {k}: <strong>{v}</strong>
            </span>
          ))}
        </div>
      </div>

      {/* Pricing and Action Footer */}
      <div className="pt-4 border-t dark:border-white/10 border-slate-200 flex items-center justify-between gap-2">
        <div>
          <div className="flex items-baseline gap-1.5">
            <span className="text-base font-bold font-mono text-brand-orange">${product.price.toFixed(2)}</span>
            {product.originalPrice && (
              <span className="text-xs text-slate-400 line-through font-mono">
                ${product.originalPrice.toFixed(2)}
              </span>
            )}
          </div>

          {product.dailyRentalPrice && (
            <div className="text-[10px] text-brand-cyan font-mono flex items-center gap-1 font-semibold">
              <Calendar className="w-2.5 h-2.5" /> Rent ${product.dailyRentalPrice}/day
            </div>
          )}
        </div>

        <div className="flex items-center gap-1.5">
          <Button
            variant="glass"
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
              onOpenModal(product);
            }}
            className="p-2 border dark:border-white/15 border-slate-300 dark:text-slate-200 text-slate-800"
            title="View 3D Model & Details"
          >
            <Eye className="w-4 h-4" />
          </Button>

          <Button
            variant={product.type === 'tool' ? 'neon' : 'flame'}
            size="sm"
            onClick={handleAddToCart}
            leftIcon={<ShoppingCart className="w-3.5 h-3.5" />}
          >
            Add
          </Button>
        </div>
      </div>
    </GlassCard>
  );
}
