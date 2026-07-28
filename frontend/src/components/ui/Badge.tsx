'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { CheckCircle2, AlertCircle, ShieldCheck, Zap } from 'lucide-react';

interface BadgeProps {
  variant?: 'fitment' | 'oem' | 'pulse' | 'warning' | 'violet' | 'glass';
  children: React.ReactNode;
  icon?: boolean;
  className?: string;
}

export function Badge({
  variant = 'fitment',
  children,
  icon = true,
  className,
}: BadgeProps) {
  const variantStyles = {
    fitment:
      'bg-emerald-500/10 text-emerald-400 border-emerald-500/30 shadow-[0_0_12px_rgba(16,185,129,0.2)]',
    oem: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30 shadow-[0_0_12px_rgba(6,182,212,0.2)]',
    pulse:
      'bg-orange-500/10 text-orange-400 border-orange-500/30 shadow-[0_0_12px_rgba(249,115,22,0.2)]',
    warning:
      'bg-amber-500/10 text-amber-400 border-amber-500/30 shadow-[0_0_12px_rgba(245,158,11,0.2)]',
    violet:
      'bg-purple-500/10 text-purple-400 border-purple-500/30 shadow-[0_0_12px_rgba(168,85,247,0.2)]',
    glass: 'bg-white/10 text-slate-200 border-white/15 backdrop-blur-md',
  };

  const renderIcon = () => {
    if (!icon) return null;
    switch (variant) {
      case 'fitment':
        return <CheckCircle2 className="w-3.5 h-3.5" />;
      case 'oem':
        return <ShieldCheck className="w-3.5 h-3.5" />;
      case 'pulse':
        return (
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500"></span>
          </span>
        );
      case 'warning':
        return <AlertCircle className="w-3.5 h-3.5" />;
      default:
        return <Zap className="w-3.5 h-3.5" />;
    }
  };

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border backdrop-blur-sm transition-all',
        variantStyles[variant],
        className
      )}
    >
      {renderIcon()}
      <span>{children}</span>
    </span>
  );
}
