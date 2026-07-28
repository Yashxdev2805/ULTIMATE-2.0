'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GuideItem } from './GuideCard';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { useCartStore } from '@/store/useCartStore';
import {
  X,
  ChevronLeft,
  ChevronRight,
  Wrench,
  AlertTriangle,
  CheckCircle2,
  ShoppingCart,
  Clock,
  Zap,
  RotateCcw,
} from 'lucide-react';

interface InteractiveStepViewerProps {
  guide: GuideItem | null;
  onClose: () => void;
}

export function InteractiveStepViewer({ guide, onClose }: InteractiveStepViewerProps) {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const { addItem } = useCartStore();

  if (!guide) return null;

  const currentStep = guide.steps[currentStepIndex];
  const progressPercent = ((currentStepIndex + 1) / guide.steps.length) * 100;
  const bundleTotalPrice = guide.partsRequired.reduce((acc, p) => acc + p.price, 0);

  const toggleStepCompleted = (index: number) => {
    if (completedSteps.includes(index)) {
      setCompletedSteps(completedSteps.filter((i) => i !== index));
    } else {
      setCompletedSteps([...completedSteps, index]);
    }
  };

  const handleAddBundleToCart = () => {
    guide.partsRequired.forEach((part) => {
      addItem({
        id: part.id,
        name: part.name,
        price: part.price * 0.9,
        image: '/demo.jpg',
        type: 'part',
        compatibility: guide.brand,
      });
    });
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop Overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/80 backdrop-blur-xl z-0"
        />

        {/* Interactive Step Viewer Modal Panel */}
        <motion.div
          initial={{ scale: 0.95, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.95, opacity: 0, y: 20 }}
          transition={{ type: 'spring', stiffness: 350, damping: 25 }}
          className="relative z-10 w-full max-w-4xl dark:bg-[#0B0F17] bg-white border dark:border-white/15 border-slate-300 rounded-3xl p-6 sm:p-8 shadow-2xl overflow-hidden flex flex-col justify-between max-h-[90vh]"
        >
          {/* Header */}
          <div className="flex items-start justify-between pb-4 border-b dark:border-white/10 border-slate-200 gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Badge variant="oem">{guide.brand}</Badge>
                <Badge variant="fitment">{guide.difficulty}</Badge>
                <span className="text-xs font-mono dark:text-slate-400 text-slate-600 flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-brand-orange" /> {guide.duration}
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-display font-bold dark:text-white text-slate-900 leading-tight">
                {guide.title}
              </h2>
            </div>

            <Button variant="glass" size="sm" onClick={onClose} className="p-2 min-h-[44px] min-w-[44px] dark:text-slate-300 text-slate-800 border dark:border-white/15 border-slate-300">
              <X className="w-5 h-5" />
            </Button>
          </div>

          {/* Stepper Progress Bar Header */}
          <div className="py-4 space-y-2">
            <div className="flex justify-between items-center text-xs font-mono">
              <span className="text-brand-orange font-bold">
                Step {currentStepIndex + 1} of {guide.steps.length}: {currentStep.title}
              </span>
              <span className="dark:text-slate-400 text-slate-600 font-medium">
                {Math.round(progressPercent)}% Complete ({completedSteps.length}/{guide.steps.length} Checked)
              </span>
            </div>
            <div className="w-full dark:bg-white/10 bg-slate-200 h-2 rounded-full overflow-hidden">
              <div
                className="bg-gradient-to-r from-brand-orange via-brand-cyan to-emerald-400 h-full transition-all duration-300"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          {/* Step Main Content Viewport */}
          <div className="py-6 flex-1 overflow-y-auto space-y-6">
            {/* Step Warning Banner if present */}
            {currentStep.warning && (
              <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-start gap-3 text-amber-600 dark:text-amber-300 text-xs font-medium">
                <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                <div>
                  <strong className="font-semibold text-amber-700 dark:text-amber-200">Safety Precaution Notice:</strong>
                  <p className="mt-0.5 leading-relaxed">{currentStep.warning}</p>
                </div>
              </div>
            )}

            {/* Torque Spec Badge if present */}
            {currentStep.torque && (
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-600 dark:text-cyan-300 text-xs font-mono font-medium">
                <Wrench className="w-3.5 h-3.5 text-cyan-500" />
                Torque Spec: <strong className="dark:text-white text-slate-900">{currentStep.torque}</strong>
              </div>
            )}

            {/* Step Illustration & Instructions */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Diagram Placeholder Container */}
              <div className="rounded-2xl dark:bg-white/5 bg-slate-100 border dark:border-white/10 border-slate-300 p-8 flex flex-col items-center justify-center text-center space-y-3 min-h-[220px] relative overflow-hidden">
                <div className="w-14 h-14 rounded-2xl bg-brand-orange/10 border border-brand-orange/30 text-brand-orange flex items-center justify-center">
                  <Wrench className="w-7 h-7" />
                </div>
                <div className="text-xs font-mono dark:text-slate-300 text-slate-800 font-bold">
                  Step {currentStepIndex + 1} High-Res Diagram Mockup
                </div>
                <p className="text-[11px] dark:text-slate-500 text-slate-600 max-w-xs">
                  Interactive exploded component layer highlight & torque spec placement indicator.
                </p>
              </div>

              {/* Step Description Text */}
              <div className="space-y-4 flex flex-col justify-between">
                <div className="space-y-3">
                  <h3 className="text-lg font-display font-bold dark:text-white text-slate-900">{currentStep.title}</h3>
                  <p className="text-sm dark:text-slate-300 text-slate-700 leading-relaxed font-normal">{currentStep.desc}</p>
                </div>

                {/* Mark Step Checkbox */}
                <button
                  onClick={() => toggleStepCompleted(currentStepIndex)}
                  className={`p-3 rounded-xl border flex items-center gap-3 text-xs font-semibold transition-all ${
                    completedSteps.includes(currentStepIndex)
                      ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-600 dark:text-emerald-300'
                      : 'dark:bg-white/5 bg-slate-100 dark:border-white/10 border-slate-300 text-slate-700 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  <CheckCircle2 className={`w-5 h-5 ${completedSteps.includes(currentStepIndex) ? 'text-emerald-500' : 'text-slate-400'}`} />
                  <span>{completedSteps.includes(currentStepIndex) ? 'Step Verified & Completed' : 'Mark Step as Completed'}</span>
                </button>
              </div>
            </div>

            {/* Complete Repair Bundle Callout Box */}
            <div className="p-4 rounded-2xl bg-gradient-to-r from-[#FF6A00]/15 to-[#7928CA]/15 border border-[#FF6A00]/30 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <h4 className="text-sm font-bold dark:text-white text-slate-900 flex items-center gap-2">
                  <ShoppingCart className="w-4 h-4 text-brand-orange" /> Complete Repair Bundle (10% OFF)
                </h4>
                <p className="text-xs dark:text-slate-300 text-slate-700 font-medium">
                  Includes all OEM parts ({guide.partsRequired.length}) and precision screwdrivers.
                </p>
              </div>

              <Button
                variant="flame"
                size="sm"
                onClick={handleAddBundleToCart}
                leftIcon={<ShoppingCart className="w-4 h-4" />}
              >
                Buy Bundle for ${(bundleTotalPrice * 0.9).toFixed(2)}
              </Button>
            </div>
          </div>

          {/* Stepper Navigation Footer */}
          <div className="pt-4 border-t dark:border-white/10 border-slate-200 flex items-center justify-between">
            <Button
              variant="outline"
              size="sm"
              disabled={currentStepIndex === 0}
              onClick={() => setCurrentStepIndex((prev) => Math.max(0, prev - 1))}
              className="dark:text-slate-200 text-slate-800 border dark:border-white/20 border-slate-300"
              leftIcon={<ChevronLeft className="w-4 h-4" />}
            >
              Previous Step
            </Button>

            {/* Jump Stepper Dots */}
            <div className="hidden sm:flex items-center gap-1.5">
              {guide.steps.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentStepIndex(idx)}
                  className={`w-2.5 h-2.5 rounded-full transition-all ${
                    idx === currentStepIndex
                      ? 'bg-brand-orange w-6'
                      : completedSteps.includes(idx)
                      ? 'bg-emerald-500'
                      : 'dark:bg-white/20 bg-slate-300'
                  }`}
                  title={`Jump to Step ${idx + 1}`}
                />
              ))}
            </div>

            {currentStepIndex < guide.steps.length - 1 ? (
              <Button
                variant="flame"
                size="sm"
                onClick={() => setCurrentStepIndex((prev) => Math.min(guide.steps.length - 1, prev + 1))}
                rightIcon={<ChevronRight className="w-4 h-4" />}
              >
                Next Step
              </Button>
            ) : (
              <Button variant="neon" size="sm" onClick={onClose} rightIcon={<CheckCircle2 className="w-4 h-4" />}>
                Finish Repair
              </Button>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
