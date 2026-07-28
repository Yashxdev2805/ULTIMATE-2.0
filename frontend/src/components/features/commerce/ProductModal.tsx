'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Product } from '@/types/commerce';
import { MOCK_REVIEWS } from '@/data/mockData';
import { Interactive3DViewer } from './Interactive3DViewer';
import { useCartStore } from '@/store/useCartStore';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import {
  X,
  ShoppingCart,
  CheckCircle2,
  AlertTriangle,
  Star,
  ShieldCheck,
  Truck,
  Plus,
  Minus,
  Calendar,
  Layers,
} from 'lucide-react';

interface ProductModalProps {
  product: Product | null;
  onClose: () => void;
  onOpenCheckout?: () => void;
}

export function ProductModal({ product, onClose, onOpenCheckout }: ProductModalProps) {
  const { addItem, selectedDevice } = useCartStore();
  const [quantity, setQuantity] = useState<number>(1);
  const [activeOption, setActiveOption] = useState<'buy' | 'rent'>('buy');

  if (!product) return null;

  const isCompatible =
    !selectedDevice?.model ||
    product.compatibleDevices.some((d) => d.toLowerCase().includes(selectedDevice.model!.toLowerCase()));

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addItem({
        id: product.id,
        name: product.name,
        price: activeOption === 'rent' ? (product.dailyRentalPrice || 5) * 3 : product.price,
        image: '/demo.jpg',
        type: product.type,
        compatibility: product.compatibleDevices.join(', '),
      });
    }
    onClose();
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
          className="fixed inset-0 bg-black/80 backdrop-blur-md z-0"
        />

        {/* Modal Window */}
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
              <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                <Badge variant="oem">{product.brand}</Badge>
                <Badge variant={product.condition === 'OEM' ? 'fitment' : 'violet'}>
                  {product.condition}
                </Badge>
                <Badge variant={product.stockStatus === 'In Stock' ? 'fitment' : 'warning'}>
                  {product.stockStatus} ({product.stockCount} left)
                </Badge>
              </div>
              <h2 className="text-xl sm:text-2xl font-display font-bold dark:text-white text-slate-900 leading-tight">
                {product.name}
              </h2>
            </div>

            <Button
              variant="glass"
              size="sm"
              onClick={onClose}
              className="p-2 min-h-[44px] min-w-[44px] dark:text-slate-300 text-slate-800 border dark:border-white/15 border-slate-300"
            >
              <X className="w-5 h-5" />
            </Button>
          </div>

          {/* Modal Body */}
          <div className="py-6 flex-1 overflow-y-auto space-y-6">
            {/* 360 Interactive CAD / 3D Viewer */}
            <Interactive3DViewer product={product} />

            {/* Fitment Status Notification */}
            {selectedDevice?.model && (
              <div
                className={`p-3.5 rounded-2xl border flex items-center gap-3 text-xs font-semibold ${
                  isCompatible
                    ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-600 dark:text-emerald-300'
                    : 'bg-amber-500/10 border-amber-500/30 text-amber-600 dark:text-amber-300'
                }`}
              >
                {isCompatible ? (
                  <>
                    <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
                    <div>
                      <span>Guaranteed Fitment: </span>
                      <strong className="dark:text-white text-slate-900">
                        This part is 100%,100% compatible with your {selectedDevice.model} ({selectedDevice.variant}).
                      </strong>
                    </div>
                  </>
                ) : (
                  <>
                    <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0" />
                    <div>
                      <span>Fitment Warning: </span>
                      <span className="dark:text-slate-300 text-slate-700">
                        This part list for {product.compatibleDevices.join(', ')}. Your active filter is set to {selectedDevice.model}.
                      </span>
                    </div>
                  </>
                )}
              </div>
            )}

            {/* Description */}
            <div className="space-y-2">
              <h3 className="text-sm font-semibold dark:text-white text-slate-900">Product Overview</h3>
              <p className="text-xs dark:text-slate-300 text-slate-700 leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Features Bullet List */}
            {product.features && (
              <div className="space-y-2">
                <h3 className="text-sm font-semibold dark:text-white text-slate-900">Key Features</h3>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs dark:text-slate-300 text-slate-700">
                  {product.features.map((feat, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-brand-orange shrink-0" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Customer Reviews Section */}
            <div className="pt-4 border-t dark:border-white/10 border-slate-200 space-y-3">
              <h3 className="text-sm font-semibold dark:text-white text-slate-900 flex items-center justify-between">
                <span>Verified Customer Reviews ({product.reviewsCount})</span>
                <span className="flex items-center text-amber-400 font-mono text-xs">
                  <Star className="w-3.5 h-3.5 fill-current mr-1" /> {product.rating} / 5.0
                </span>
              </h3>
              <div className="space-y-2">
                {MOCK_REVIEWS.slice(0, 2).map((rev) => (
                  <div
                    key={rev.id}
                    className="p-3 rounded-xl dark:bg-white/5 bg-slate-50 border dark:border-white/5 border-slate-200 space-y-1"
                  >
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-semibold dark:text-white text-slate-900">{rev.userName}</span>
                      <span className="text-[10px] text-slate-400 font-mono">{rev.date}</span>
                    </div>
                    <div className="flex items-center text-amber-400 text-xs">
                      {'★'.repeat(rev.rating)}
                    </div>
                    <p className="text-xs dark:text-slate-300 text-slate-600">{rev.comment}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Footer Actions & Price */}
          <div className="pt-4 border-t dark:border-white/10 border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4 w-full sm:w-auto justify-between">
              <div>
                <div className="text-xs text-slate-400 font-mono">Price</div>
                <div className="text-2xl font-bold font-mono text-brand-orange">
                  ${(product.price * quantity).toFixed(2)}
                </div>
              </div>

              {/* Quantity Picker */}
              <div className="flex items-center gap-2 dark:bg-white/5 bg-slate-100 border dark:border-white/10 border-slate-300 p-1.5 rounded-xl">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="p-1.5 dark:text-slate-400 text-slate-600 hover:text-slate-900 dark:hover:text-white"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="text-sm font-bold font-mono dark:text-white text-slate-900 px-2">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity((q) => q + 1)}
                  className="p-1.5 dark:text-slate-400 text-slate-600 hover:text-slate-900 dark:hover:text-white"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              <Button
                variant="flame"
                size="lg"
                onClick={handleAddToCart}
                className="flex-1 sm:flex-initial"
                leftIcon={<ShoppingCart className="w-4 h-4" />}
              >
                Add {quantity} to Cart
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
