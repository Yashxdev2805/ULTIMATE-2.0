'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCartStore } from '@/store/useCartStore';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import {
  ShoppingCart,
  X,
  Plus,
  Minus,
  Trash2,
  ArrowRight,
  ShieldCheck,
  Smartphone,
  Truck,
} from 'lucide-react';

export function CartDrawer() {
  const {
    items,
    isCartDrawerOpen,
    setCartDrawerOpen,
    updateQuantity,
    removeItem,
    getTotalPrice,
    getTotalItems,
    selectedDevice,
  } = useCartStore();

  const totalPrice = getTotalPrice();
  const totalItems = getTotalItems();
  const freeShippingThreshold = 100;
  const shippingProgress = Math.min((totalPrice / freeShippingThreshold) * 100, 100);

  return (
    <AnimatePresence>
      {isCartDrawerOpen && (
        <>
          {/* Backdrop Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setCartDrawerOpen(false)}
            className="fixed inset-0 bg-black/70 backdrop-blur-md z-50"
          />

          {/* Sliding Cart Drawer Panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 350, damping: 30 }}
            className="fixed top-0 right-0 bottom-0 w-full sm:w-[440px] bg-[#0B0F17] border-l border-white/10 z-50 p-6 flex flex-col justify-between overflow-y-auto"
          >
            {/* Header */}
            <div>
              <div className="flex items-center justify-between pb-5 border-b border-white/10 mb-5">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-xl bg-brand-orange/20 text-brand-orange">
                    <ShoppingCart className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="font-display font-bold text-white text-base flex items-center gap-2">
                      Express Cart <Badge variant="pulse">{totalItems} Items</Badge>
                    </h2>
                    <p className="text-[11px] text-slate-400 font-mono">100% Fitment Guaranteed Checkout</p>
                  </div>
                </div>

                <Button variant="glass" size="sm" onClick={() => setCartDrawerOpen(false)} className="p-2 min-h-[44px] min-w-[44px]">
                  <X className="w-5 h-5 text-slate-300" />
                </Button>
              </div>

              {/* Free Shipping Progress Indicator */}
              <div className="p-3 mb-5 rounded-xl bg-white/5 border border-white/10 space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-300 flex items-center gap-1.5 font-medium">
                    <Truck className="w-4 h-4 text-brand-cyan" />
                    {totalPrice >= freeShippingThreshold ? (
                      <span className="text-emerald-400 font-semibold">✓ Free Express Shipping Unlocked!</span>
                    ) : (
                      <span>
                        Add <strong className="text-white">${(freeShippingThreshold - totalPrice).toFixed(2)}</strong> for Free Express Shipping
                      </span>
                    )}
                  </span>
                </div>
                <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-brand-orange to-brand-cyan h-full transition-all duration-300"
                    style={{ width: `${shippingProgress}%` }}
                  />
                </div>
              </div>

              {/* Selected Device Fitment Indicator */}
              {selectedDevice?.model && (
                <div className="p-3 mb-5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center gap-2 text-xs text-emerald-300">
                  <Smartphone className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>
                    Fitment Verified for <strong className="text-white">{selectedDevice.model}</strong>
                  </span>
                </div>
              )}

              {/* Cart Items List */}
              {items.length === 0 ? (
                <div className="text-center py-12 space-y-4">
                  <div className="w-16 h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mx-auto text-slate-500">
                    <ShoppingCart className="w-8 h-8" />
                  </div>
                  <h3 className="text-base font-semibold text-white">Your cart is empty</h3>
                  <p className="text-xs text-slate-400 max-w-xs mx-auto">
                    Browse OEM spare parts, precision tools, or diagnostic repair bundles to get started.
                  </p>
                  <Button variant="flame" size="sm" onClick={() => setCartDrawerOpen(false)}>
                    Browse Spare Parts Catalog
                  </Button>
                </div>
              ) : (
                <div className="space-y-3">
                  {items.map((item) => (
                    <div
                      key={item.id}
                      className="p-3.5 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-between gap-3 group hover:border-white/20 transition-all"
                    >
                      <div className="flex-1 space-y-1">
                        <div className="flex items-center gap-2">
                          <h4 className="text-xs font-semibold text-white line-clamp-1">{item.name}</h4>
                          <span className="text-[10px] uppercase font-mono px-1.5 py-0.2 rounded bg-white/10 text-slate-300">
                            {item.type}
                          </span>
                        </div>
                        {item.compatibility && (
                          <p className="text-[10px] text-emerald-400 font-mono">✓ {item.compatibility}</p>
                        )}
                        <div className="text-xs font-bold text-brand-orange">${item.price.toFixed(2)}</div>
                      </div>

                      {/* Quantity Controls */}
                      <div className="flex items-center gap-1.5 bg-white/5 border border-white/10 p-1 rounded-xl">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="p-1 text-slate-400 hover:text-white transition-colors"
                          title="Decrease quantity"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="text-xs font-mono font-bold text-white px-2">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="p-1 text-slate-400 hover:text-white transition-colors"
                          title="Increase quantity"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      {/* Remove Item */}
                      <button
                        onClick={() => removeItem(item.id)}
                        className="p-1.5 text-slate-500 hover:text-rose-400 transition-colors"
                        title="Remove item"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer Summary & Checkout */}
            {items.length > 0 && (
              <div className="pt-5 border-t border-white/10 space-y-4">
                <div className="space-y-1.5 text-xs font-mono">
                  <div className="flex justify-between text-slate-400">
                    <span>Subtotal</span>
                    <span className="text-white">${totalPrice.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-slate-400">
                    <span>Estimated Express Shipping</span>
                    <span className="text-emerald-400">
                      {totalPrice >= freeShippingThreshold ? 'FREE' : '$9.99'}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm font-bold text-white pt-2 border-t border-white/10">
                    <span>Total Amount</span>
                    <span className="text-brand-orange">
                      ${(totalPrice + (totalPrice >= freeShippingThreshold ? 0 : 9.99)).toFixed(2)}
                    </span>
                  </div>
                </div>

                <Button variant="flame" size="lg" className="w-full" rightIcon={<ArrowRight className="w-4 h-4" />}>
                  Proceed to Express Checkout
                </Button>

                <p className="text-[10px] text-center text-slate-500 flex items-center justify-center gap-1 font-mono">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  Encrypted Razorpay / Stripe Payment Processing
                </p>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
