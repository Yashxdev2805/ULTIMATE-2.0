'use client';

import React from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Loader2 } from 'lucide-react';

interface ButtonProps extends HTMLMotionProps<'button'> {
  variant?: 'flame' | 'neon' | 'violet' | 'glass' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  children: React.ReactNode;
}

export function Button({
  variant = 'flame',
  size = 'md',
  isLoading = false,
  leftIcon,
  rightIcon,
  children,
  className,
  disabled,
  ...props
}: ButtonProps) {
  const sizeStyles = {
    sm: 'px-3 py-1.5 text-xs rounded-lg gap-1.5',
    md: 'px-5 py-2.5 text-sm rounded-xl gap-2 font-medium',
    lg: 'px-7 py-3.5 text-base rounded-2xl gap-2.5 font-semibold',
  };

  const variantStyles = {
    flame:
      'bg-gradient-to-r from-[#FF6A00] to-[#FF8700] text-white shadow-[0_0_20px_rgba(255,106,0,0.35)] hover:shadow-[0_0_30px_rgba(255,106,0,0.5)] border border-white/20',
    neon:
      'bg-gradient-to-r from-[#00F2FE] to-[#4FACFE] text-slate-950 shadow-[0_0_20px_rgba(0,242,254,0.35)] hover:shadow-[0_0_30px_rgba(0,242,254,0.5)] font-semibold border border-white/20',
    violet:
      'bg-gradient-to-r from-[#7928CA] to-[#FF0080] text-white shadow-[0_0_20px_rgba(121,40,202,0.35)] hover:shadow-[0_0_30px_rgba(121,40,202,0.5)] border border-white/20',
    glass:
      'bg-white/10 backdrop-blur-md text-white border border-white/15 hover:bg-white/20 hover:border-white/30',
    outline:
      'bg-transparent text-white border border-white/20 hover:border-[#FF6A00] hover:text-[#FF6A00] hover:bg-[#FF6A00]/10',
    ghost: 'bg-transparent text-slate-300 hover:text-white hover:bg-white/10',
  };

  return (
    <motion.button
      whileHover={{ scale: disabled || isLoading ? 1 : 1.02 }}
      whileTap={{ scale: disabled || isLoading ? 1 : 0.98 }}
      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
      disabled={disabled || isLoading}
      className={cn(
        'inline-flex items-center justify-center transition-all duration-200 disabled:opacity-50 disabled:pointer-events-none cursor-pointer',
        sizeStyles[size],
        variantStyles[variant],
        className
      )}
      {...props}
    >
      {isLoading ? (
        <Loader2 className="w-4 h-4 animate-spin text-current" />
      ) : (
        <>
          {leftIcon && <span className="inline-flex shrink-0">{leftIcon}</span>}
          <span>{children}</span>
          {rightIcon && <span className="inline-flex shrink-0">{rightIcon}</span>}
        </>
      )}
    </motion.button>
  );
}
