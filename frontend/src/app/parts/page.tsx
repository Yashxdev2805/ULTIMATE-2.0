'use client';

import React, { useState } from 'react';
import { MOCK_PARTS, BRANDS, PART_CATEGORIES } from '@/data/mockData';
import { ProductCard } from '@/components/features/commerce/ProductCard';
import { ProductModal } from '@/components/features/commerce/ProductModal';
import { CheckoutModal } from '@/components/features/checkout/CheckoutModal';
import { Product } from '@/types/commerce';
import { useCartStore } from '@/store/useCartStore';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { GlassCard } from '@/components/ui/GlassCard';
import {
  ShoppingBag,
  Search,
  Filter,
  RotateCcw,
  Smartphone,
  CheckCircle2,
  AlertCircle,
} from 'lucide-react';

export default function PartsPage() {
  const { selectedDevice, setSelectedDevice } = useCartStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBrand, setSelectedBrand] = useState('All Brands');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [selectedCondition, setSelectedCondition] = useState('All');
  const [activeModalProduct, setActiveModalProduct] = useState<Product | null>(null);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedBrand('All Brands');
    setSelectedCategory('All Categories');
    setSelectedCondition('All');
  };

  const filteredParts = MOCK_PARTS.filter((part) => {
    const matchesSearch =
      searchQuery === '' ||
      part.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      part.description.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesBrand = selectedBrand === 'All Brands' || part.brand === selectedBrand;
    const matchesCategory = selectedCategory === 'All Categories' || part.category === selectedCategory;
    const matchesCondition = selectedCondition === 'All' || part.condition === selectedCondition;

    // Filter for selected device if user for: "Only Compatible"
    const matchesDevice =
      !selectedDevice?.model ||
      part.compatibleDevices.some((d) => d.toLowerCase().includes(selectedDevice.model!.toLowerCase()));

    return matchesSearch && matchesBrand && matchesCategory && matchesCondition;
  });

  return (
    <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header Banner */}
      <div className="space-y-4 mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-orange/10 border border-brand-orange/30 text-brand-orange text-xs font-semibold uppercase tracking-wider">
          <ShoppingBag className="w-3.5 h-3.5" /> Guaranteed Fitment Store
        </div>
        <h1 className="text-3xl sm:text-5xl font-display font-extrabold dark:text-white text-slate-900 tracking-tight">
          OEM & Refurbished <span className="text-gradient-orange">Spare Parts</span>
        </h1>
        <p className="dark:text-slate-300 text-slate-700 text-base max-w-2xl leading-relaxed font-medium">
          Explore100% verified displays, batteries, charging boards, and camera modules carefully tested to fit your exact device model.
        </p>

        {/* Selected Device Active Banner */}
        {selectedDevice?.model ? (
          <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <Smartphone className="w-5 h-5 text-emerald-500 shrink-0" />
              <div className="text-xs">
                <span className="dark:text-slate-300 text-slate-700">Filtering for: </span>
                <strong className="dark:text-white text-slate-900 font-mono text-sm">{selectedDevice.model}</strong>{' '}
                <span className="text-slate-400">({selectedDevice.variant})</span>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSelectedDevice(null)}
              className="text-xs text-rose-400 hover:text-rose-300"
            >
              Clear Filter
            </Button>
          </div>
        ) : (
          <div className="p-3.5 rounded-2xl dark:bg-white/5 bg-slate-100 border dark:border-white/10 border-slate-300 flex items-center gap-3 text-xs dark:text-slate-300 text-slate-700">
            <AlertCircle className="w-4 h-4 text-brand-orange shrink-0" />
            <span>Select a device using the top navbar to automatically filter 100% compatible parts.</span>
          </div>
        )}
      </div>

      {/* Filter Bar */}
      <div className="p-4 sm:p-6 rounded-2xl dark:bg-white/5 bg-white/90 border dark:border-white/10 border-slate-200 shadow-md backdrop-blur-md space-y-4 mb-8">
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search parts by name, model, screen type, or spec..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 rounded-xl dark:bg-black/40 bg-slate-100 border dark:border-white/15 border-slate-300 text-sm dark:text-white text-slate-900 dark:placeholder:text-slate-500 placeholder:text-slate-400 focus:outline-none focus:border-brand-orange transition-colors font-sans"
          />
        </div>

        <div className="flex flex-wrap items-center justify-between gap-4 pt-2 border-t dark:border-white/10 border-slate-200">
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-1.5 text-xs dark:text-slate-400 text-slate-600 font-mono font-medium">
              <Filter className="w-3.5 h-3.5 text-brand-orange" /> Filters:
            </div>

            {/* Brand Filter */}
            <select
              value={selectedBrand}
              onChange={(e) => setSelectedBrand(e.target.value)}
              className="px-3 py-1.5 rounded-xl dark:bg-white/5 bg-slate-100 border dark:border-white/15 border-slate-300 text-xs dark:text-white text-slate-900 focus:outline-none focus:border-brand-orange font-mono font-medium"
            >
              {BRANDS.map((b) => (
                <option key={b} value={b} className="dark:bg-[#121826] bg-white dark:text-white text-slate-900">
                  {b}
                </option>
              ))}
            </select>

            {/* Category Filter */}
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-3 py-1.5 rounded-xl dark:bg-white/5 bg-slate-100 border dark:border-white/15 border-slate-300 text-xs dark:text-white text-slate-900 focus:outline-none focus:border-brand-orange font-mono font-medium"
            >
              {PART_CATEGORIES.map((c) => (
                <option key={c} value={c} className="dark:bg-[#121826] bg-white dark:text-white text-slate-900">
                  {c}
                </option>
              ))}
            </select>

            {/* Condition Filter */}
            <select
              value={selectedCondition}
              onChange={(e) => setSelectedCondition(e.target.value)}
              className="px-3 py-1.5 rounded-xl dark:bg-white/5 bg-slate-100 border dark:border-white/15 border-slate-300 text-xs dark:text-white text-slate-900 focus:outline-none focus:border-brand-orange font-mono font-medium"
            >
              <option value="All" className="dark:bg-[#121826] bg-white dark:text-white text-slate-900">All Conditions</option>
              <option value="OEM" className="dark:bg-[#121826] bg-white dark:text-white text-slate-900">OEM Original</option>
              <option value="Refurbished" className="dark:bg-[#121826] bg-white dark:text-white text-slate-900">Refurbished Grade A</option>
            </select>
          </div>

          {(selectedBrand !== 'All Brands' || selectedCategory !== 'All Categories' || selectedCondition !== 'All' || searchQuery !== '') && (
            <Button variant="ghost" size="sm" onClick={resetFilters} className="dark:text-slate-300 text-slate-700" leftIcon={<RotateCcw className="w-3.5 h-3.5" />}>
              Reset Filters
            </Button>
          )}
        </div>
      </div>

      {/* Grid of Parts */}
      {filteredParts.length === 0 ? (
        <GlassCard variant="default" className="p-12 text-center space-y-4 max-w-md mx-auto my-12">
          <h3 className="text-lg font-bold dark:text-white text-slate-900">No Parts Found</h3>
          <p className="text-xs dark:text-slate-400 text-slate-600">
            No spare100%010parts match your current search and filter.
          </p>
          <Button variant="flame" size="sm" onClick={resetFilters}>
            Clear All Filters
          </Button>
        </GlassCard>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredParts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onOpenModal={(p) => setActiveModalProduct(p)}
            />
          ))}
        </div>
      )}

      {/* Interactive 3D Product Modal */}
      <ProductModal
        product={activeModalProduct}
        onClose={() => setActiveModalProduct(null)}
        onOpenCheckout={() => {
          setActiveModalProduct(null);
          setIsCheckoutOpen(true);
        }}
      />

      {/* Checkout Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
      />
    </main>
  );
}
