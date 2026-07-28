'use client';

import React, { useState } from 'react';
import { MOCK_TOOLS, TOOL_CATEGORIES } from '@/data/mockData';
import { ProductCard } from '@/components/features/commerce/ProductCard';
import { ProductModal } from '@/components/features/commerce/ProductModal';
import { CheckoutModal } from '@/components/features/checkout/CheckoutModal';
import { Product } from '@/types/commerce';
import { Button } from '@/components/ui/Button';
import { GlassCard } from '@/components/ui/GlassCard';
import { Wrench, Search, Filter, RotateCcw } from 'lucide-react';

export default function ToolsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [filterType, setFilterType] = useState<'all' | 'rent'>('all');
  const [activeModalProduct, setActiveModalProduct] = useState<Product | null>(null);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('All Categories');
    setFilterType('all');
  };

  const filteredTools = MOCK_TOOLS.filter((tool) => {
    const matchesSearch =
      searchQuery === '' ||
      tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tool.description.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory = selectedCategory === 'All Categories' || tool.category === selectedCategory;
    const matchesRental = filterType === 'all' || (filterType === 'rent' && tool.purchaseOption === 'both');

    return matchesSearch && matchesCategory && matchesRental;
  });

  return (
    <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header Banner */}
      <div className="space-y-4 mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-cyan/10 border border-brand-cyan/30 text-cyan-500 dark:text-cyan-400 text-xs font-semibold uppercase tracking-wider">
          <Wrench className="w-3.5 h-3.5" /> Precision Tools Store & Rental
        </div>
        <h1 className="text-3xl sm:text-5xl font-display font-extrabold dark:text-white text-slate-900 tracking-tight">
          Professional Electronics <span className="text-gradient-cyan">Toolkits</span>
        </h1>
        <p className="dark:text-slate-300 text-slate-700 text-base max-w-2xl leading-relaxed font-medium">
          Buy or rent professional S2 steel driver sets, digital soldering stations, ESD-safe mats, and multimeters with full 1-year guarantee.
        </p>
      </div>

      {/* Filter Bar */}
      <div className="p-4 sm:p-6 rounded-2xl dark:bg-white/5 bg-white/90 border dark:border-white/10 border-slate-200 shadow-md backdrop-blur-md space-y-4 mb-8">
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search tools by type, brand, or feature (e.g. S2 steel, hot air, multimeter)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 rounded-xl dark:bg-black/40 bg-slate-100 border dark:border-white/15 border-slate-300 text-sm dark:text-white text-slate-900 dark:placeholder:text-slate-500 placeholder:text-slate-400 focus:outline-none focus:border-brand-cyan transition-colors font-sans"
          />
        </div>

        <div className="flex flex-wrap items-center justify-between gap-4 pt-2 border-t dark:border-white/10 border-slate-200">
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-1.5 text-xs dark:text-slate-400 text-slate-600 font-mono font-medium">
              <Filter className="w-3.5 h-3.5 text-brand-cyan" /> Category:
            </div>

            {/* Category Filter */}
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-3 py-1.5 rounded-xl dark:bg-white/5 bg-slate-100 border dark:border-white/15 border-slate-300 text-xs dark:text-white text-slate-900 focus:outline-none focus:border-brand-cyan font-mono font-medium"
            >
              {TOOL_CATEGORIES.map((c) => (
                <option key={c} value={c} className="dark:bg-[#121826] bg-white dark:text-white text-slate-900">
                  {c}
                </option>
              ))}
            </select>

            {/* Rental Filter Toggle */}
            <div className="flex items-center bg-slate-100 dark:bg-white/5 rounded-xl p-1 border dark:border-white/10 border-slate-300">
              <button
                onClick={() => setFilterType('all')}
                className={`px-3 py-1 text-xs rounded-lg font-medium transition-all ${
                  filterType === 'all'
                    ? 'bg-brand-cyan text-slate-950 font-bold'
                    : 'dark:text-slate-300 text-slate-700'
                }`}
              >
                All Tools
              </button>
              <button
                onClick={() => setFilterType('rent')}
                className={`px-3 py-1 text-xs rounded-lg font-medium transition-all ${
                  filterType === 'rent'
                    ? 'bg-brand-cyan text-slate-950 font-bold'
                    : 'dark:text-slate-300 text-slate-700'
                }`}
              >
                Rental Eligible Only
              </button>
            </div>
          </div>

          {(selectedCategory !== 'All Categories' || filterType !== 'all' || searchQuery !== '') && (
            <Button variant="ghost" size="sm" onClick={resetFilters} className="dark:text-slate-300 text-slate-700" leftIcon={<RotateCcw className="w-3.5 h-3.5" />}>
              Reset Filters
            </Button>
          )}
        </div>
      </div>

      {/* Grid of Tools */}
      {filteredTools.length === 0 ? (
        <GlassCard variant="default" className="p-12 text-center space-y-4 max-w-md mx-auto my-12">
          <h3 className="text-lg font-bold dark:text-white text-slate-900">No Tools Found</h3>
          <p className="text-xs dark:text-slate-400 text-slate-600">
            No tools match your current filter selection.
          </p>
          <Button variant="neon" size="sm" onClick={resetFilters}>
            Reset Filters
          </Button>
        </GlassCard>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTools.map((product) => (
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
