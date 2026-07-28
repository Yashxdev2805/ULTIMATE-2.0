'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useBookingStore } from '@/store/useBookingStore';
import { useCartStore } from '@/store/useCartStore';
import { DEVICE_CATALOG } from '@/data/mockData';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import {
  X,
  Calendar,
  MapPin,
  Smartphone,
  CheckCircle2,
  AlertTriangle,
  Clock,
  ArrowRight,
  User,
  Phone,
  Mail,
  ShieldCheck,
} from 'lucide-react';

interface BookingWizardProps {
  isOpen: boolean;
  onClose: () => void;
}

const TIME_SLOTS = [
  '09:00 AM - 11:00 AM',
  '11:00 AM - 01:00 PM',
  '02:00 PM - 04:00 PM',
  '04:00 PM - 06:00 PM',
  '06:00 PM - 08:00 PM',
];

export function BookingWizard({ isOpen, onClose }: BookingWizardProps) {
  const { addBooking } = useBookingStore();
  const { selectedDevice } = useCartStore();

  const [step, setStep] = useState<number>(1);
  const [pincodeStatus, setPincodeStatus] = useState<'idle' | 'valid' | 'invalid'>('idle');

  const [formData, setFormData] = useState({
    deviceBrand: selectedDevice?.brand || 'Apple',
    deviceModel: selectedDevice?.model || 'iPhone 15 Pro',
    issueDescription: 'Cracked screen / OLED touch digitizer issue',
    customerName: 'Alex Rivera',
    customerEmail: 'alex.rivera@example.com',
    customerPhone: '+1 (555) 234-5678',
    address: '742 Evergreen Terrace',
    city: 'Springfield',
    pincode: '97477',
    appointmentDate: new Date(Date.now() + 86400000).toISOString().split('T')[0],
    appointmentTime: '11:00 AM - 01:00 PM',
    paymentMethod: 'Credit Card (Stripe)',
  });

  if (!isOpen) return null;

  const verifyPincode = () => {
    if (formData.pincode.length >= 5) {
      setPincodeStatus('valid');
    } else {
      setPincodeStatus('invalid');
    }
  };

  const handleNext = () => {
    if (step === 2 && pincodeStatus !== 'valid') {
      verifyPincode();
    }
    if (step < 3) {
      setStep((s) => s + 1);
    } else if (step === 3) {
      // Create.booking
      addBooking({
        deviceBrand: formData.deviceBrand,
        deviceModel: formData.deviceModel,
        issueDescription: formData.issueDescription,
        customerName: formData.customerName,
        customerEmail: formData.customerEmail,
        customerPhone: formData.customerPhone,
        address: formData.address,
        city: formData.city,
        pincode: formData.pincode,
        appointmentDate: formData.appointmentDate,
        appointmentTime: formData.appointmentTime,
        technicianName: 'David Miller (Certified Tech)',
        technicianPhone: '+1 (555) 890-1234',
        estimatedCost: 199.99,
        partsCost: 159.99,
        laborCost: 40.0,
        tax: 16.0,
        isPaid: true,
        paymentMethod: formData.paymentMethod,
      });
      setStep(4);
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/80 backdrop-blur-md z-0"
        />

        {/* Wizard Dialog */}
        <motion.div
          initial={{ scale: 0.95, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.95, opacity: 0, y: 20 }}
          transition={{ type: 'spring', stiffness: 350, damping: 25 }}
          className="relative z-10 w-full max-w-2xl dark:bg-[#0B0F17] bg-white border dark:border-white/15 border-slate-300 rounded-3xl p-6 sm:p-8 shadow-2xl overflow-hidden flex flex-col justify-between max-h-[90vh]"
        >
          {/* Header */}
          <div className="flex items-center justify-between pb-4 border-b dark:border-white/10 border-slate-200">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-gradient-to-br from-[#FF6A00] to-[#7928CA] text-white">
                <Calendar className="w-5 h-5" />
              </div>
              <div>
                <h2 className="font-display font-bold text-lg dark:text-white text-slate-900">
                  {step === 4 ? 'Booking Confirmed!' : 'Book Doorstep Repair'}
                </h2>
                <p className="text-xs dark:text-slate-400 text-slate-500 font-mono">
                  {step < 4 ? `Step ${step} of 3` : 'Service Ticket Active'}
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

          {/* Body Content */}
          <div className="py-6 flex-1 overflow-y-auto">
            {step === 1 && (
              <div className="space-y-4">
                <h3 className="text-sm font-semibold dark:text-white text-slate-900 flex items-center gap-2">
                  <Smartphone className="w-4 h-4 text-brand-orange" /> Select Device & Issue
                </h3>

                <div>
                  <label className="block text-xs text-slate-400 mb-1">Select Device Model</label>
                  <select
                    value={formData.deviceModel}
                    onChange={(e) => {
                      const selected = DEVICE_CATALOG.find((d) => d.model === e.target.value);
                      setFormData({
                        ...formData,
                        deviceModel: e.target.value,
                        deviceBrand: selected ? selected.brand : 'Apple',
                      });
                    }}
                    className="w-full px-3.5 py-2.5 rounded-xl dark:bg-black/40 bg-slate-100 border dark:border-white/15 border-slate-300 text-xs dark:text-white text-slate-900 focus:outline-none focus:border-brand-orange font-mono"
                  >
                    {DEVICE_CATALOG.map((d) => (
                      <option key={d.model} value={d.model} className="dark:bg-[#121826] bg-white">
                        {d.brand} - {d.model} ({d.variant})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs text-slate-400 mb-1">Describe Issue / Symptoms</label>
                  <textarea
                    rows={3}
                    value={formData.issueDescription}
                    onChange={(e) => setFormData({ ...formData, issueDescription: e.target.value })}
                    className="w-full p-3.5 rounded-2xl dark:bg-black/40 bg-slate-100 border dark:border-white/15 border-slate-300 text-xs dark:text-white text-slate-900 focus:outline-none focus:border-brand-orange"
                  />
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-4">
                <h3 className="text-sm font-semibold dark:text-white text-slate-900 flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-brand-cyan" /> Service Location & Pin Code Check
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs text-slate-400 mb-1">Full Name</label>
                    <input
                      type="text"
                      value={formData.customerName}
                      onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl dark:bg-black/40 bg-slate-100 border dark:border-white/15 border-slate-300 text-xs dark:text-white text-slate-900 focus:outline-none focus:border-brand-cyan"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-slate-400 mb-1">Phone Number</label>
                    <input
                      type="text"
                      value={formData.customerPhone}
                      onChange={(e) => setFormData({ ...formData, customerPhone: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl dark:bg-black/40 bg-slate-100 border dark:border-white/15 border-slate-300 text-xs dark:text-white text-slate-900 focus:outline-none focus:border-brand-cyan"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs text-slate-400 mb-1">Address</label>
                  <input
                    type="text"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl dark:bg-black/40 bg-slate-100 border dark:border-white/15 border-slate-300 text-xs dark:text-white text-slate-900 focus:outline-none focus:border-brand-cyan"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs text-slate-400 mb-1">City</label>
                    <input
                      type="text"
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl dark:bg-black/40 bg-slate-100 border dark:border-white/15 border-slate-300 text-xs dark:text-white text-slate-900 focus:outline-none focus:border-brand-cyan"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-slate-400 mb-1">Pin / Zip Code</label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={formData.pincode}
                        onChange={(e) => {
                          setFormData({ ...formData, pincode: e.target.value });
                          if (e.target.value.length >= 5) setPincodeStatus('valid');
                        }}
                        className="w-full px-3.5 py-2.5 rounded-xl dark:bg-black/40 bg-slate-100 border dark:border-white/15 border-slate-300 text-xs dark:text-white text-slate-900 focus:outline-none focus:border-brand-cyan"
                      />
                    </div>
                  </div>
                </div>

                {pincodeStatus === 'valid' && (
                  <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-xs text-emerald-500 font-medium flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4" /> Doorstep Service Available at {formData.pincode}!
                  </div>
                )}
              </div>
            )}

            {step === 3 && (
              <div className="space-y-4">
                <h3 className="text-sm font-semibold dark:text-white text-slate-900 flex items-center gap-2">
                  <Clock className="w-4 h-4 text-purple-400" /> Select Appointment Date & Time
                </h3>

                <div>
                  <label className="block text-xs text-slate-400 mb-1">Appointment Date</label>
                  <input
                    type="date"
                    value={formData.appointmentDate}
                    onChange={(e) => setFormData({ ...formData, appointmentDate: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl dark:bg-black/40 bg-slate-100 border dark:border-white/15 border-slate-300 text-xs dark:text-white text-slate-900 focus:outline-none focus:border-brand-violet font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs text-slate-400 mb-2">Preferred Time Slot</label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {TIME_SLOTS.map((slot) => (
                      <button
                        key={slot}
                        type="button"
                        onClick={() => setFormData({ ...formData, appointmentTime: slot })}
                        className={`p-3 rounded-xl border text-xs font-mono font-semibold transition-all ${
                          formData.appointmentTime === slot
                            ? 'bg-brand-violet/20 border-brand-violet text-brand-violet'
                            : 'dark:bg-white/5 bg-slate-100 dark:border-white/10 border-slate-300 dark:text-slate-300 text-slate-700'
                        }`}
                      >
                        {slot}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {step === 4 && (
              <div className="text-center py-6 space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-500 border border-emerald-500/40 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold dark:text-white text-slate-900">
                  Technician Dispatched!
                </h3>
                <p className="text-xs dark:text-slate-300 text-slate-600 max-w-sm mx-auto">
                  Your doorstep repair010appointment for <strong className="dark:text-white text-slate-900">{formData.deviceModel}</strong> is confirmed for <span className="underline">{formData.appointmentDate} ({formData.appointmentTime})</span>.
                </p>

                <Button variant="flame" size="md" onClick={onClose}>
                  View Live Tracking Dashboard
                </Button>
              </div>
            )}
          </div>

          {/* Footer Controls */}
          {step < 4 && (
            <div className="pt-4 border-t dark:border-white/10 border-slate-200 flex justify-between items-center">
              {step > 1 ? (
                <Button variant="outline" size="sm" onClick={() => setStep((s) => s - 1)}>
                  Back
                </Button>
              ) : (
                <div />
              )}

              <Button
                variant="flame"
                size="md"
                onClick={handleNext}
                rightIcon={<ArrowRight className="w-4 h-4" />}
              >
                {step === 3 ? 'Confirm & Book Repair' : 'Next Step'}
              </Button>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
