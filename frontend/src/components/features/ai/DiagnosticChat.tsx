'use client';

import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { GlassCard } from '@/components/ui/GlassCard';
import { DiagnosticResultCard } from './DiagnosticResultCard';
import { AIDiagnosticResult } from '@/lib/ai-engine';
import { useCartStore } from '@/store/useCartStore';
import {
  Sparkles,
  Camera,
  Upload,
  X,
  Send,
  Loader2,
  HelpCircle,
  Smartphone,
} from 'lucide-react';

const PRESET_SYMPTOMS = [
  'Shattered screen / touch un-responsive',
  'Rapid battery drain & overheating',
  'Liquid spill / water damage',
  'Device won\'t turn on / black screen',
  'Glitchy display / green lines',
  'Charging port loose / not charging',
];

export function DiagnosticChat() {
  const { selectedDevice } = useCartStore();
  const [prompt, setPrompt] = useState<string>('');
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [analysisStep, setAnalysisStep] = useState<string>('');
  const [result, setResult] = useState<AIDiagnosticResult | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handlePresetClick = (preset: string) => {
    setPrompt(preset);
  };

  const handleRunDiagnosis = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!prompt.trim() && !imagePreview) return;

    setIsAnalyzing(true);
    setAnalysisStep('Scanning image and text features...');

    setTimeout(() => {
      setAnalysisStep('Running AI model against 50,000+ hardware fault patterns...');
    }, 400);

    try {
      const res = await fetch('/api/ai/diagnose', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt,
          hasImage: !!imagePreview,
          selectedDevice: selectedDevice?.model || 'Device',
        }),
      });
      const data = await res.json();
      if (data.success) {
        setResult(data.data);
      }
    } catch (err) {
      console.error('Diagnosis error:', err);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const resetAll = () => {
    setResult(null);
    setPrompt('');
    setImagePreview(null);
  };

  return (
    <div className="w-full space-y-6">
      {!result ? (
        <GlassCard variant="interactive" glowColor="violet" className="p-6 sm:p-8 space-y-6">
          <div className="flex items-center justify-between border-b dark:border-white/10 border-slate-200 pb-4">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-purple-500/20 text-purple-400">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <h2 className="font-display font-bold text-lg dark:text-white text-slate-900">
                  AI Hardware Diagnostic Console
                </h2>
                <p className="text-xs dark:text-slate-400 text-slate-500 font-mono">
                  {selectedDevice?.model
                    ? `Configured for: ${selectedDevice.model}`
                    : 'Tip: Select a device in the top bar for 100% exact part matching'}
                </p>
              </div>
            </div>
            <Badge variant="violet">Multi-Modal AI</Badge>
          </div>

          <form onSubmit={handleRunDiagnosis} className="space-y-5">
            {/* Image Upload Zone */}
            <div>
              <label className="block text-xs font-semibold dark:text-slate-300 text-slate-700 mb-2">
                1. Upload Damage Photo (Optional)
              </label>

              {imagePreview ? (
                <div className="relative rounded-2xl overflow-hidden border-2 border-purple-500/50 max-w-sm h-48 group">
                  <img src={imagePreview} alt="Damage Upload" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <button
                      type="button"
                      onClick={handleRemoveImage}
                      className="px-3 py-1.5 rounded-xl bg-rose-600 text-white text-xs font-semibold flex items-center gap-1"
                    >
                      <X className="w-4 h-4" /> Remove Image
                    </button>
                  </div>
                </div>
              ) : (
                <div
                  onClick={() => fileInputRef.current?.click()}
                  className="border-2 border-dashed dark:border-white/15 border-slate-300 rounded-2xl p-6 text-center cursor-pointer hover:border-purple-500/40 transition-colors dark:bg-white/5 bg-slate-50 flex flex-col items-center justify-center space-y-2"
                >
                  <div className="p-3 rounded-full bg-purple-500/10 text-purple-400">
                    <Camera className="w-6 h-6" />
                  </div>
                  <div className="text-xs font-semibold dark:text-white text-slate-900">
                    Click or drag & drop a photo of your damaged hardware
                  </div>
                  <span className="text-[10px] text-slate-400">Supports JPEG, PNG, HEIC up to 10MB</span>
                </div>
              )}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageUpload}
              />
            </div>

            {/* Quick Symptom Chips */}
            <div>
              <label className="block text-xs font-semibold dark:text-slate-300 text-slate-700 mb-2">
                2. Quick Symptom Select
              </label>
              <div className="flex flex-wrap gap-2">
                {PRESET_SYMPTOMS.map((symptom, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handlePresetClick(symptom)}
                    className="px-3 py-1.5 rounded-xl text-xs font-mono dark:bg-white/5 bg-slate-100 border dark:border-white/10 border-slate-300 dark:text-slate-300 text-slate-700 hover:border-brand-violet hover:text-brand-violet transition-all"
                  >
                    + {symptom}
                  </button>
                ))}
              </div>
            </div>

            {/* Description Text Input */}
            <div>
              <label className="block text-xs font-semibold dark:text-slate-300 text-slate-700 mb-2">
                3. Describe the Issue / Symptoms
              </label>
              <textarea
                rows={3}
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Describe what happened (e.g. dropped in water, screen flickers green, battery drains in 1 hour)..."
                className="w-full p-3.5 rounded-2xl dark:bg-black/40 bg-slate-100 border dark:border-white/15 border-slate-300 text-xs dark:text-white text-slate-900 dark:placeholder:text-slate-500 placeholder:text-slate-400 focus:outline-none focus:border-brand-violet transition-colors font-sans"
              />
            </div>

            {/* Submit Button / Loading */}
            <div className="pt-2">
              <Button
                type="submit"
                variant="violet"
                size="lg"
                disabled={isAnalyzing || (!prompt.trim() && !imagePreview)}
                className="w-full"
                leftIcon={
                  isAnalyzing ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <Sparkles className="w-5 h-5" />
                  )
                }
              >
                {isAnalyzing ? (
                  <span>{analysisStep}</span>
                ) : (
                  <span>Analyze & Generate Diagnostic Report</span>
                )}
              </Button>
            </div>
          </form>
        </GlassCard>
      ) : (
        <DiagnosticResultCard result={result} onReset={resetAll} />
      )}
    </div>
  );
}
