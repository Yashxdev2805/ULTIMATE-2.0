'use client';

import React from 'react';
import { Booking, BookingStatus, useBookingStore } from '@/store/useBookingStore';
import { GlassCard } from '@/components/ui/GlassCard';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import {
  CheckCircle2,
  User,
  Clock,
  Phone,
  MapPin,
  FileText,
  Wrench,
  Truck,
  Check,
  ChevronRight,
} from 'lucide-react';

interface LiveTrackerProps {
  booking: Booking;
  onOpenInvoice: () => void;
}

const STAGES: { key: BookingStatus; title: string; desc: string; icon: any }[] = [
  {
    key: 'Order Confirmed',
    title: '1. Order Confirmed',
    desc: 'Booking logged and parts allocated from inventory.',
    icon: CheckCircle2,
  },
  {
    key: 'Technician Assigned',
    title: '2. Tech Assigned',
    desc: 'Certified technician dispatched for your location.',
    icon: User,
  },
  {
    key: 'En Route',
    title: '3. En Route',
    desc: 'Technician on the way. Live GPS active.',
    icon: Truck,
  },
  {
    key: 'Under Repair',
    title: '4. Under Repair',
    desc: 'On-site 21-point repair & diagnostic in progress.',
    icon: Wrench,
  },
  {
    key: 'Completed',
    title: '5. Completed',
    desc: 'Device tested, verified and handed over.',
    icon: Check,
  },
];

export function LiveTracker({ booking, onOpenInvoice }: LiveTrackerProps) {
  const { updateStatus } = useBookingStore();

  const getCurrentIndex = (status: BookingStatus) => {
    return STAGES.findIndex((s) => s.key === status);
  };

  const currentIndex = getCurrentIndex(booking.status);

  const handleNextStep = () => {
    if (currentIndex < STAGES.length - 1) {
      updateStatus(booking.id, STAGES[currentIndex + 1].key);
    }
  };

  return (
    <GlassCard variant="glowing" glowColor="orange" className="p-6 sm:p-8 space-y-6">
      {/* Top Header info */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b dark:border-white/10 border-slate-200">
        <div>
          <div className="flex items-center gap-2 mb-1 flex-wrap">
            <span className="text-xs font-mono text-brand-orange font-bold">
              ORDER #{booking.id}
            </span>
            <Badge variant="pulse">{booking.status}</Badge>
            <span className="text-xs font-mono dark:text-slate-400 text-slate-500">
              Slot: {booking.appointmentDate} ({booking.appointmentTime})
            </span>
          </div>
          <h2 className="text-xl font-display font-bold dark:text-white text-slate-900">
            {booking.deviceBrand} {booking.deviceModel}
          </h2>
          <p className="text-xs dark:text-slate-400 text-slate-600 mt-0.5">{booking.issueDescription}</p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="glass"
            size="sm"
            onClick={onOpenInvoice}
            className="dark:text-slate-200 text-slate-800 border dark:border-white/15 border-slate-300"
            leftIcon={<FileText className="w-4 h-4 text-brand-cyan" />}
          >
            View Invoice (PDF)
          </Button>
        </div>
      </div>

      {/* 5-Stage Stepper Progress */}
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
          {STAGES.map((stage, idx) => {
            const isDone = idx < currentIndex;
            const isCurrent = idx === currentIndex;
            const Icon = stage.icon;

            return (
              <div
                key={stage.key}
                className={`p-4 rounded-2xl border transition-all flex flex-col justify-between ${
                  isCurrent
                    ? 'bg-gradient-to-b from-brand-orange/15 to-transparent border-brand-orange/40 shadow-lg'
                    : isDone
                    ? 'bg-emerald-500/10 border-emerald-500/30'
                    : 'dark:bg-white/5 bg-slate-100 dark:border-white/5 border-slate-200 opacity-60'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold font-mono ${
                      isDone
                        ? 'bg-emerald-500 text-slate-950'
                        : isCurrent
                        ? 'bg-brand-orange text-white animate-pulse'
                        : 'dark:bg-white/10 bg-slate-300 dark:text-slate-400 text-slate-600'
                    }`}
                  >
                    {isDone ? '✓' : idx + 1}
                  </div>
                  <Icon
                    className={`w-5 h-5 ${
                      isDone
                        ? 'text-emerald-500'
                        : isCurrent
                        ? 'text-brand-orange'
                        : 'text-slate-400'
                    }`}
                  />
                </div>
                <div>
                  <h4 className="text-xs font-bold dark:text-white text-slate-900 mb-0.5">
                    {stage.title}
                  </h4>
                  <p className="text-[10px] dark:text-slate-400 text-slate-500 leading-tight">
                    {stage.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Technician & Location Bar */}
      <div className="p-4 rounded-2xl dark:bg-white/5 bg-slate-50 border dark:border-white/10 border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-brand-orange/20 text-brand-orange flex items-center justify-center font-bold font-mono text-sm">
            {booking.technicianName.charAt(0)}
          </div>
          <div>
            <div className="font-bold dark:text-white text-slate-900">{booking.technicianName}</div>
            <div className="dark:text-slate-400 text-slate-500 flex items-center gap-2 mt-0.5">
              <span className="flex items-center gap-1"><Phone className="w-3 h-3" /> {booking.technicianPhone}</span>
              <span>•</span>
              <span className="flex items-center gap-1"><MapPin className="w-3 h-3" /> {booking.city} ({booking.pincode})</span>
            </div>
          </div>
        </div>

        {/* Demo Controls: Advance Progress */}
        {currentIndex < STAGES.length - 1 && (
          <Button
            variant="ghost"
            size="sm"
            onClick={handleNextStep}
            className="text-xs text-brand-orange font-mono"
            rightIcon={<ChevronRight className="w-4 h-4" />}
          >
            Advance Status (Demo)
          </Button>
        )}
      </div>
    </GlassCard>
  );
}
