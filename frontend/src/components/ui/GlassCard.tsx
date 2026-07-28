'use client';

import React from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';
import { cn } from '@/lib/utils';

interface GlassCardProps extends HTMLMotionProps<'div'> {
  children: React.ReactNode;
  variant?: 'default' | 'interactive' | 'glowing' | 'solid';
  glowColor?: 'orange' | 'cyan' | 'violet';
  className?: string;
}

export function GlassCard({
  children,
  variant = 'interactive',
  glowColor = 'orange',
  className,
  ...props
}: GlassCardProps) {
  const glowClasses = {
    orange: 'hover:border-[#FF6A00]/40 hover:shadow-[0_0_30px_-5px_rgba(255,106,0,0.2)]',
    cyan: 'hover:border-[#00F2FE]/40 hover:shadow-[0_0_30px_-5px_rgba(0,242,254,0.2)]',
    violet: 'hover:border-[#7928CA]/40 hover:shadow-[0_0_30px_-5px_rgba(121,40,202,0.2)]',
  };

  const baseStyles =
    'relative rounded-2xl border transition-all duration-300 backdrop-blur-xl overflow-hidden';

  const variantStyles = {
    default: 'bg-[#121826]/60 border-white/[0.08]',
    interactive: `bg-[#121826]/70 border-white/[0.08] ${glowClasses[glowColor]} cursor-pointer`,
    glowing: `bg-[#121826]/80 border-white/10 ${glowClasses[glowColor]}`,
    solid: 'bg-[#121826] border-white/10',
  };

  return (
    <motion.div
      whileHover={variant === 'interactive' ? { y: -4, scale: 1.01 } : undefined}
      whileTap={variant === 'interactive' ? { scale: 0.99 } : undefined}
      transition={{ type: 'spring', stiffness: 350, damping: 25 }}
      className={cn(baseStyles, variantStyles[variant], className)}
      {...props}
    >
      {/* Satin Specular Top Highlight */}
      <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/15 to-transparent pointer-events-none" />
      {children}
    </motion.div>
  );
}
