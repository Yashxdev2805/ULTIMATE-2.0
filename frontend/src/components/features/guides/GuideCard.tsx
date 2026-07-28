'use client';

import React from 'react';
import { GlassCard } from '@/components/ui/GlassCard';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Clock, Wrench, ArrowRight, ShoppingCart, CheckCircle2, AlertTriangle } from 'lucide-react';
import { useCartStore } from '@/store/useCartStore';

export interface GuideItem {
  id: string;
  title: string;
  brand: string;
  category: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Master';
  duration: string;
  stepsCount: number;
  description: string;
  toolsRequired: string[];
  partsRequired: { id: string; name: string; price: number }[];
  steps: { title: string; desc: string; torque?: string; warning?: string }[];
}

interface GuideCardProps {
  guide: GuideItem;
  onOpenStepViewer: (guide: GuideItem) => void;
}

export function GuideCard({ guide, onOpenStepViewer }: GuideCardProps) {
  const { addItem } = useCartStore();

  const bundleTotalPrice = guide.partsRequired.reduce((acc, p) => acc + p.price, 0);

  const handleAddBundleToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    guide.partsRequired.forEach((part) => {
      addItem({
        id: part.id,
        name: part.name,
        price: part.price * 0.9, // 10% bundle discount
        image: '/demo.jpg',
        type: 'part',
        compatibility: guide.brand,
      });
    });
  };

  const getDifficultyBadge = () => {
    switch (guide.difficulty) {
      case 'Beginner':
        return <Badge variant="fitment">Beginner Friendly</Badge>;
      case 'Intermediate':
        return <Badge variant="oem">Intermediate</Badge>;
      case 'Master':
        return <Badge variant="warning">Master Tier</Badge>;
    }
  };

  return (
    <GlassCard
      variant="interactive"
      glowColor={guide.difficulty === 'Master' ? 'orange' : guide.difficulty === 'Intermediate' ? 'cyan' : 'violet'}
      className="p-6 flex flex-col justify-between space-y-4"
      onClick={() => onOpenStepViewer(guide)}
    >
      <div className="space-y-3">
        {/* Badges Bar */}
        <div className="flex items-center justify-between gap-2">
          {getDifficultyBadge()}
          <span className="text-xs font-mono dark:text-slate-400 text-slate-600 flex items-center gap-1 font-medium">
            <Clock className="w-3.5 h-3.5 text-brand-orange" /> {guide.duration}
          </span>
        </div>

        {/* Title & Desc */}
        <h3 className="text-lg font-display font-bold dark:text-white text-slate-900 line-clamp-2 hover:text-brand-orange transition-colors">
          {guide.title}
        </h3>
        <p className="text-xs dark:text-slate-400 text-slate-600 line-clamp-2 leading-relaxed font-normal">{guide.description}</p>

        {/* Tools Checklist Summary */}
        <div className="pt-2">
          <div className="text-[11px] font-mono dark:text-slate-400 text-slate-600 mb-1.5 flex items-center gap-1 font-medium">
            <Wrench className="w-3 h-3 text-brand-cyan" /> Required Tools ({guide.toolsRequired.length}):
          </div>
          <div className="flex flex-wrap gap-1">
            {guide.toolsRequired.map((tool, idx) => (
              <span key={idx} className="px-2 py-0.5 rounded dark:bg-white/5 bg-slate-200/80 border dark:border-white/10 border-slate-300 text-[10px] dark:text-slate-300 text-slate-800 font-mono font-medium">
                {tool}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Action Footer */}
      <div className="pt-4 border-t dark:border-white/10 border-slate-200 flex items-center justify-between gap-2">
        <div className="flex flex-col">
          <span className="text-[10px] font-mono dark:text-slate-400 text-slate-500">Bundle Price (10% OFF)</span>
          <span className="text-sm font-bold font-mono text-emerald-500 dark:text-emerald-400">
            ${(bundleTotalPrice * 0.9).toFixed(2)}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="glass"
            size="sm"
            onClick={handleAddBundleToCart}
            title="1-Click Add Parts & Tools Bundle to Cart"
            className="border dark:border-white/15 border-slate-300 dark:text-white text-slate-800"
            leftIcon={<ShoppingCart className="w-3.5 h-3.5 text-emerald-500 dark:text-emerald-400" />}
          >
            Add Bundle
          </Button>

          <Button variant="flame" size="sm" rightIcon={<ArrowRight className="w-3.5 h-3.5" />}>
            Start Fix
          </Button>
        </div>
      </div>
    </GlassCard>
  );
}
