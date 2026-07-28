'use client';

import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { RotateCw, ZoomIn, ZoomOut, Eye, Layers } from 'lucide-react';
import { Product } from '@/types/commerce';

interface Interactive3DViewerProps {
  product: Product;
}

export function Interactive3DViewer({ product }: Interactive3DViewerProps) {
  const [rotation, setRotation] = useState<number>(0);
  const [isExploded, setIsExploded] = useState<boolean>(false);
  const [zoom, setZoom] = useState<number>(1);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<'3d' | 'specs'>('3d');
  const startXRef = useRef<number>(0);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    startXRef.current = e.clientX;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    const deltaX = e.clientX - startXRef.current;
    setRotation((prev) => (prev + deltaX * 0.5) % 360);
    startXRef.current = e.clientX;
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const resetView = () => {
    setRotation(0);
    setZoom(1);
    setIsExploded(false);
  };

  // Determine color and 3D.graphics.rendering theme according to item type & model3DType
  const getThemeColor = () => {
    if (product.type === 'tool') return '#00F2FE'; // Cyan
    if (product.condition === 'OEM') return '#FF6A00'; // Orange
    return '#7928CA'; // Violet
  };

  const themeColor = getThemeColor();

  return (
    <div className="w-full flex flex-col items-center">
      {/* Top Controls Bar */}
      <div className="w-full flex items-center justify-between pb-3 mb-3 border-b dark:border-white/10 border-slate-200">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveTab('3d')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all ${
              activeTab === '3d'
                ? 'bg-brand-orange text-white shadow-md'
                : 'dark:bg-white/5 bg-slate-100 dark:text-slate-300 text-slate-700 hover:bg-slate-200'
            }`}
          >
            <Eye className="w-3.5 h-3.5" /> 360° Interactive Model
          </button>
          <button
            onClick={() => setActiveTab('specs')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all ${
              activeTab === 'specs'
                ? 'bg-brand-orange text-white shadow-md'
                : 'dark:bg-white/5 bg-slate-100 dark:text-slate-300 text-slate-700 hover:bg-slate-200'
            }`}
          >
            <Layers className="w-3.5 h-3.5" /> Tech Specs
          </button>
        </div>

        {activeTab === '3d' && (
          <div className="flex items-center gap-1">
            <button
              onClick={() => setIsExploded(!isExploded)}
              className={`px-2.5 py-1.5 rounded-lg text-[11px] font-mono font-semibold transition-all ${
                isExploded
                  ? 'bg-cyan-500 text-slate-950 font-bold'
                  : 'dark:bg-white/10 bg-slate-200 dark:text-slate-300 text-slate-700'
              }`}
              title="Explode View"
            >
              {isExploded ? 'Collapsed' : 'Explode View'}
            </button>
            <button
              onClick={() => setZoom((z) => Math.min(z + 0.25, 1.75))}
              className="p-1.5 rounded-lg dark:bg-white/10 bg-slate-200 dark:text-slate-300 text-slate-700 hover:bg-slate-300"
              title="Zoom In"
            >
              <ZoomIn className="w-4 h-4" />
            </button>
            <button
              onClick={() => setZoom((z) => Math.max(z - 0.25, 0.75))}
              className="p-1.5 rounded-lg dark:bg-white/10 bg-slate-200 dark:text-slate-300 text-slate-700 hover:bg-slate-300"
              title="Zoom Out"
            >
              <ZoomOut className="w-4 h-4" />
            </button>
            <button
              onClick={resetView}
              className="p-1.5 rounded-lg dark:bg-white/10 bg-slate-200 dark:text-slate-300 text-slate-700 hover:bg-slate-300"
              title="Reset View"
            >
              <RotateCw className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>

      {activeTab === '3d' ? (
        <div
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          className="relative w-full h-72 sm:h-80 select-none cursor-grab active:cursor-grabbing rounded-2xl dark:bg-slate-950/60 bg-slate-100 border dark:border-white/10 border-slate-300 flex items-center justify-center overflow-hidden"
        >
          {/* Background Grid Pattern */}
          <div
            className="absolute inset-0 opacity-10 dark:opacity-20"
            style={{
              backgroundImage: 'radial-gradient(#888 1px, transparent 1px)',
              backgroundSize: '16px 16px',
            }}
          />

          {/* Interactive SVG 3D Representation */}
          <motion.div
            style={{
              transform: `scale(${zoom}) rotate(${rotation}deg)`,
              transition: isDragging ? 'none' : 'transform 0.2s ease-out',
            }}
            className="relative flex items-center justify-center"
          >
            {/* Dynamic Rendering for Screen / Battery / Driver / Component */}
            {product.model3DType === 'screen' ? (
              <div className="relative w-40 h-64 border-2 border-slate-400 rounded-3xl bg-slate-900 shadow-2xl flex flex-col items-center justify-between p-2">
                {/* Notch */}
                <div className="w-16 h-3 bg-slate-800 rounded-full mt-1"></div>

                {/* Exploded Glass Layer */}
                <div
                  className={`absolute inset-2 border-2 border-cyan-400/80 rounded-2xl bg-cyan-500/20 transition-all duration-500 ${
                    isExploded ? '-translate-y-8 scale-105 shadow-cyan-500/50 shadow-xl' : 'translate-y-0'
                  }`}
                >
                  <div className="text-[9px] font-mono text-cyan-300 text-center mt-2 font-bold">
                    OLED Panel
                  </div>
                </div>

                {/* Exploded Digitizer Layer */}
                <div
                  className={`absolute inset-4 border border-emerald-400/80 rounded-xl bg-emerald-500/20 transition-all duration-500 ${
                    isExploded ? 'translate-y-8 scale-95 shadow-emerald-500/50' : 'translate-y-0'
                  }`}
                >
                  <div className="text-[9px] font-mono text-emerald-300 text-center mt-2 font-bold">
                    Digitizer + IC
                  </div>
                </div>

                <div className="text-[10px] text-slate-400 font-mono mb-2">3D OLED Module</div>
              </div>
            ) : product.model3DType === 'battery' ? (
              <div className="relative w-48 h-40 border-2 border-emerald-500 rounded-xl bg-slate-900 shadow-2xl flex flex-col items-center justify-center p-4">
                <div className="w-12 h-4 bg-emerald-500 rounded-t mb-2"></div>
                <div className="w-36 h-24 bg-gradient-to-r from-emerald-950 to-slate-900 border border-emerald-500/50 rounded flex flex-col items-center justify-center">
                  <span className="text-xs font-mono font-bold text-emerald-400">LI-ION CELL</span>
                  <span className="text-[10px] text-slate-400 font-mono mt-1">
                    {product.specs['Capacity'] || 'High Capacity'}
                  </span>
                </div>
                {/* Exploded Ribbon Cable */}
                <div
                  className={`absolute -right-6 top-1/2 -translate-y-1/2 w-8 h-12 border-2 border-amber-400 rounded transition-all duration-500 ${
                    isExploded ? 'translate-x-6' : 'translate-x-0'
                  }`}
                >
                  <span className="text-[8px] text-amber-400 font-mono block rotate-90">BMS</span>
                </div>
              </div>
            ) : product.model3DType === 'driver' ? (
              <div className="relative w-12 h-64 flex flex-col items-center justify-center">
                {/* Bit */}
                <div
                  className={`w-3 h-16 bg-slate-300 rounded-t border border-slate-500 transition-all duration-500 ${
                    isExploded ? '-translate-y-6' : ''
                  }`}
                >
                  <span className="text-[8px] text-slate-900 font-bold block text-center pt-2">S2</span>
                </div>
                {/* Handle */}
                <div className="w-8 h-44 bg-gradient-to-r from-cyan-600 via-sky-500 to-blue-700 rounded-lg border border-cyan-300 flex flex-col items-center justify-between py-2 shadow-lg">
                  <div className="w-full h-1 bg-slate-900/40"></div>
                  <div className="w-full h-1 bg-slate-900/40"></div>
                  <span className="text-[9px] text-white font-mono rotate-90 font-bold">AL-HANDLE</span>
                  <div className="w-full h-1 bg-slate-900/40"></div>
                </div>
              </div>
            ) : (
              /* Generic Component View */
              <div className="relative w-48 h-48 border-2 border-orange-500/80 rounded-2xl bg-slate-900 p-4 flex flex-col items-center justify-center shadow-2xl">
                <div
                  className={`w-32 h-32 border-2 border-dashed border-brand-orange rounded-xl bg-orange-500/10 flex flex-col items-center justify-center transition-all duration-500 ${
                    isExploded ? 'scale-110' : 'scale-100'
                  }`}
                >
                  <span className="text-xs font-mono text-brand-orange font-bold text-center px-2">
                    {product.name}
                  </span>
                  <span className="text-[10px] text-slate-400 font-mono mt-2">
                    {product.condition} Grade
                  </span>
                </div>
              </div>
            )}
          </motion.div>

          {/* Drag instruction overlay badge */}
          <div className="absolute bottom-3 left-3 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-sm text-[10px] text-slate-300 font-mono border border-white/10 pointer-events-none">
            Drag mouse to rotate 360°
          </div>

          {/* Compatibility Badge Overlay */}
          <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-400 font-mono text-[10px] border border-emerald-500/30">
            ✓ 100% CAD Verified
          </div>
        </div>
      ) : (
        /* Tech Specs Tab */
        <div className="w-full p-4 rounded-2xl dark:bg-white/5 bg-slate-50 border dark:border-white/10 border-slate-200 space-y-3">
          <h4 className="text-xs font-mono font-bold dark:text-white text-slate-900 uppercase tracking-wider">
            Technical Specifications & Compatibility
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
            {Object.entries(product.specs).map(([key, val]) => (
              <div key={key} className="p-2.5 rounded-xl dark:bg-black/30 bg-white border dark:border-white/5 border-slate-200 flex justify-between">
                <span className="dark:text-slate-400 text-slate-500 font-medium">{key}:</span>
                <span className="dark:text-slate-200 text-slate-900 font-bold font-mono">{val}</span>
              </div>
            ))}
          </div>

          {product.includedItems && (
            <div className="pt-3 border-t dark:border-white/10 border-slate-200">
              <span className="text-xs font-semibold dark:text-white text-slate-900 block mb-1">
                Included in Box:
              </span>
              <ul className="grid grid-cols-2 gap-1 text-xs text-slate-600 dark:text-slate-400">
                {product.includedItems.map((item, i) => (
                  <li key={i} className="flex items-center gap-1.5">
                    <span className="text-brand-orange">•</span> {item}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
