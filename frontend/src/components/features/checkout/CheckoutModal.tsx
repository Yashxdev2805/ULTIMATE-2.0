'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCartStore } from '@/store/useCartStore';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import {
  X,
  CreditCard,
  ShieldCheck,
  CheckCircle2,
  MapPin,
  User,
  Mail,
  Phone,
  Truck,
  ArrowRight,
  PackageCheck,
} from 'lucide-react';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CheckoutModal({ isOpen, onClose }: CheckoutModalProps) {
  const { items, getTotalPrice, clearCart, selectedDevice } = useCartStore();
  const [step, setStep] = useState<'address' | 'payment' | 'success'>('address');
  const [orderId, setOrderId] = useState<string>('');

  const [formData, setFormData] = useState({
    fullName: 'Alex Johnson',
    email: 'alex.johnson@example.com',
    phone: '+1 (555) 234-5678',
    address: '742 Evergreen Terrace',
    city: 'Springfield',
    zip: '97477',
    paymentMethod: 'card',
  });

  if (!isOpen) return null;

  const subtotal = getTotalPrice();
  const shipping = subtotal > 100 ? 0 : 9.99;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  const handleNextStep = (e: React.FormEvent) => {
    e.preventDefault();
    if (step === 'address') {
      setStep('payment');
    } else if (step === 'payment') {
      const generatedId = 'TK-' + Math.floor(100000 + Math.random() * 900000);
      setOrderId(generatedId);
      setStep('success');
      clearCart();
    }
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
          className="relative z-10 w-full max-w-3xl dark:bg-[#0B0F17] bg-white border dark:border-white/15 border-slate-300 rounded-3xl p-6 sm:p-8 shadow-2xl overflow-hidden flex flex-col justify-between max-h-[90vh]"
        >
          {/* Modal Header */}
          <div className="flex items-center justify-between pb-4 border-b dark:border-white/10 border-slate-200">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-gradient-to-br from-[#FF6A00] to-[#7928CA] text-white">
                <CreditCard className="w-5 h-5" />
              </div>
              <div>
                <h2 className="font-display font-bold text-lg dark:text-white text-slate-900">
                  {step === 'success' ? 'Order Confirmed!' : 'Express Checkout'}
                </h2>
                <p className="text-xs dark:text-slate-400 text-slate-500 font-mono">
                  {step === 'address' && 'Step 1 of 2: Shipping & Contact Information'}
                  {step === 'payment' && 'Step 2 of 2: Payment & Order Review'}
                  {step === 'success' && `Order ID: ${orderId}`}
                </p>
              </div>
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
          <div className="py-6 flex-1 overflow-y-auto">
            {step === 'address' && (
              <form id="address-form" onSubmit={handleNextStep} className="space-y-4">
                <h3 className="text-sm font-semibold dark:text-white text-slate-900">Contact Details</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs text-slate-400 mb-1">Full Name</label>
                    <input
                      type="text"
                      required
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl dark:bg-black/40 bg-slate-100 border dark:border-white/15 border-slate-300 text-xs dark:text-white text-slate-900 focus:outline-none focus:border-brand-orange"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-slate-400 mb-1">Email Address</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl dark:bg-black/40 bg-slate-100 border dark:border-white/15 border-slate-300 text-xs dark:text-white text-slate-900 focus:outline-none focus:border-brand-orange"
                    />
                  </div>
                </div>

                <div className="pt-2">
                  <label className="block text-xs text-slate-400 mb-1">Phone Number (For SMS Tracking)</label>
                  <input
                    type="text"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl dark:bg-black/40 bg-slate-100 border dark:border-white/15 border-slate-300 text-xs dark:text-white text-slate-900 focus:outline-none focus:border-brand-orange"
                  />
                </div>

                <h3 className="text-sm font-semibold dark:text-white text-slate-900 pt-3">Shipping Address</h3>
                <div>
                  <label className="block text-xs text-slate-400 mb-1">Street Address</label>
                  <input
                    type="text"
                    required
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl dark:bg-black/40 bg-slate-100 border dark:border-white/15 border-slate-300 text-xs dark:text-white text-slate-900 focus:outline-none focus:border-brand-orange"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs text-slate-400 mb-1">City / Region</label>
                    <input
                      type="text"
                      required
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl dark:bg-black/40 bg-slate-100 border dark:border-white/15 border-slate-300 text-xs dark:text-white text-slate-900 focus:outline-none focus:border-brand-orange"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-slate-400 mb-1">Postal Code</label>
                    <input
                      type="text"
                      required
                      value={formData.zip}
                      onChange={(e) => setFormData({ ...formData, zip: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl dark:bg-black/40 bg-slate-100 border dark:border-white/15 border-slate-300 text-xs dark:text-white text-slate-900 focus:outline-none focus:border-brand-orange"
                    />
                  </div>
                </div>
              </form>
            )}

            {step === 'payment' && (
              <form id="payment-form" onSubmit={handleNextStep} className="space-y-4">
                <h3 className="text-sm font-semibold dark:text-white text-slate-900">Select Payment Method</h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div
                    onClick={() => setFormData({ ...formData, paymentMethod: 'card' })}
                    className={`p-4 rounded-2xl border cursor-pointer flex flex-col items-center justify-center text-center space-y-2 transition-all ${
                      formData.paymentMethod === 'card'
                        ? 'border-brand-orange bg-brand-orange/10 dark:text-white text-slate-900'
                        : 'border-slate-300 dark:border-white/10 dark:text-slate-400 text-slate-600'
                    }`}
                  >
                    <CreditCard className="w-6 h-6 text-brand-orange" />
                    <span className="text-xs font-bold">Credit / Debit Card</span>
                  </div>

                  <div
                    onClick={() => setFormData({ ...formData, paymentMethod: 'upi' })}
                    className={`p-4 rounded-2xl border cursor-pointer flex flex-col items-center justify-center text-center space-y-2 transition-all ${
                      formData.paymentMethod === 'upi'
                        ? 'border-brand-cyan bg-brand-cyan/10 dark:text-white text-slate-900'
                        : 'border-slate-300 dark:border-white/10 dark:text-slate-400 text-slate-600'
                    }`}
                  >
                    <ShieldCheck className="w-6 h-6 text-brand-cyan" />
                    <span className="text-xs font-bold">UPI / GPay / ApplePay</span>
                  </div>

                  <div
                    onClick={() => setFormData({ ...formData, paymentMethod: 'cod' })}
                    className={`p-4 rounded-2xl border cursor-pointer flex flex-col items-center justify-center text-center space-y-2 transition-all ${
                      formData.paymentMethod === 'cod'
                        ? 'border-purple-500 bg-purple-500/10 dark:text-white text-slate-900'
                        : 'border-slate-300 dark:border-white/10 dark:text-slate-400 text-slate-600'
                    }`}
                  >
                    <Truck className="w-6 h-6 text-purple-400" />
                    <span className="text-xs font-bold">Cash on Delivery</span>
                  </div>
                </div>

                {/* Order Summary Box */}
                <div className="p-4 rounded-2xl dark:bg-white/5 bg-slate-50 border dark:border-white/10 border-slate-200 space-y-2 text-xs font-mono">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Items Total:</span>
                    <span className="dark:text-white text-slate-900">${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Estimated Tax (8%):</span>
                    <span className="dark:text-white text-slate-900">${tax.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Shipping:</span>
                    <span className="text-emerald-500 font-bold">{shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}</span>
                  </div>
                  <div className="flex justify-between pt-2 border-t dark:border-white/10 border-slate-200 text-sm font-bold">
                    <span className="dark:text-white text-slate-900">Total Payable:</span>
                    <span className="text-brand-orange">${total.toFixed(2)}</span>
                  </div>
                </div>
              </form>
            )}

            {step === 'success' && (
              <div className="text-center py-8 space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-500 border border-emerald-500/40 flex items-center justify-center mx-auto">
                  <PackageCheck className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-display font-bold dark:text-white text-slate-900">
                  Thank You for Your Order!
                </h3>
                <p className="text-xs dark:text-slate-300 text-slate-700 max-w-sm mx-auto">
                  Your order <strong className="text-brand-orange font-mono">{orderId}</strong> has been successfully placed. We’ve sent a confirmation email to <span className="underline">{formData.email}</span>.
                </p>

                <div className="p-4 rounded-2xl dark:bg-white/5 bg-slate-50 border dark:border-white/10 border-slate-200 max-w-md mx-auto text-left text-xs font-mono space-y-1">
                  <div><strong>Deliver To:</strong> {formData.fullName}</div>
                  <div><strong>Address:</strong> {formData.address}, {formData.city} ({formData.zip})</div>
                  <div><strong>Payment:</strong> {formData.paymentMethod.toUpperCase()} (Completed)</div>
                </div>

                <Button variant="flame" size="md" onClick={onClose}>
                  Done & Return to Store
                </Button>
              </div>
            )}
          </div>

          {/* Footer Controls */}
          {step !== 'success' && (
            <div className="pt-4 border-t dark:border-white/10 border-slate-200 flex justify-between items-center">
              {step === 'payment' ? (
                <Button variant="outline" size="sm" onClick={() => setStep('address')}>
                  Back to Address
                </Button>
              ) : (
                <span className="text-xs font-mono text-slate-400">Total: ${total.toFixed(2)}</span>
              )}

              <Button
                variant="flame"
                size="md"
                type="submit"
                form={step === 'address' ? 'address-form' : 'payment-form'}
                rightIcon={<ArrowRight className="w-4 h-4" />}
              >
                {step === 'address' ? 'Continue to Payment' : `Pay $${total.toFixed(2)}`}
              </Button>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
