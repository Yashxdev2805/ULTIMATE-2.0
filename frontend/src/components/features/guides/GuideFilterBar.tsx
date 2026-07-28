'use client';

import React from 'react';
import { Search, Filter, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/Button';

interface GuideFilterBarProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedBrand: string;
  setSelectedBrand: (brand: string) => void;
  selectedCategory: string;
  setSelectedCategory: (cat: string) => void;
  selectedDifficulty: string;
  setSelectedDifficulty: (diff: string) => void;
  onReset: () => void;
}

const brands = ['All Brands', 'Apple', 'Samsung', 'Sony', 'Dyson', 'DJI'];
const categories = ['All Categories', 'Smartphones', 'Laptops', 'Consoles', 'Appliances', 'Drones'];
const difficulties = ['All Difficulties', 'Beginner', 'Intermediate', 'Master'];

export function GuideFilterBar({
  searchQuery,
  setSearchQuery,
  selectedBrand,
  setSelectedBrand,
  selectedCategory,
  setSelectedCategory,
  selectedDifficulty,
  setSelectedDifficulty,
  onReset,
}: GuideFilterBarProps) {
  return (
    <div className="p-4 sm:p-6 rounded-2xl dark:bg-white/5 bg-white/90 border dark:border-white/10 border-slate-200 shadow-md backdrop-blur-md space-y-4 mb-8">
      {/* Search Input Bar */}
      <div className="relative">
        <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          placeholder="Search DIY guides by device, problem (e.g. cracked screen, battery drift, overheating)..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-10 pr-4 py-3 rounded-xl dark:bg-black/40 bg-slate-100 border dark:border-white/15 border-slate-300 text-sm dark:text-white text-slate-900 dark:placeholder:text-slate-500 placeholder:text-slate-400 focus:outline-none focus:border-brand-orange transition-colors font-sans"
        />
      </div>

      {/* Multi-Faceted Pill Filters */}
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
            {brands.map((b) => (
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
            {categories.map((c) => (
              <option key={c} value={c} className="dark:bg-[#121826] bg-white dark:text-white text-slate-900">
                {c}
              </option>
            ))}
          </select>

          {/* Difficulty Filter */}
          <select
            value={selectedDifficulty}
            onChange={(e) => setSelectedDifficulty(e.target.value)}
            className="px-3 py-1.5 rounded-xl dark:bg-white/5 bg-slate-100 border dark:border-white/15 border-slate-300 text-xs dark:text-white text-slate-900 focus:outline-none focus:border-brand-orange font-mono font-medium"
          >
            {difficulties.map((d) => (
              <option key={d} value={d} className="dark:bg-[#121826] bg-white dark:text-white text-slate-900">
                {d}
              </option>
            ))}
          </select>
        </div>

        {/* Reset Filters */}
        {(selectedBrand !== 'All Brands' ||
          selectedCategory !== 'All Categories' ||
          selectedDifficulty !== 'All Difficulties' ||
          searchQuery !== '') && (
          <Button variant="ghost" size="sm" onClick={onReset} className="dark:text-slate-300 text-slate-700" leftIcon={<RotateCcw className="w-3.5 h-3.5" />}>
            Reset Filters
          </Button>
        )}
      </div>
    </div>
  );
}
