'use client';

import React, { useState } from 'react';
import { useBookingStore, Booking } from '@/store/useBookingStore';
import { LiveTracker } from '@/components/features/booking/LiveTracker';
import { BookingWizard } from '@/components/features/booking/BookingWizard';
import { InvoiceModal } from '@/components/features/booking/InvoiceModal';
import { GlassCard } from '@/components/ui/GlassCard';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import {
  Calendar,
  Plus,
  FileText,
  Clock,
  CheckCircle2,
  Phone,
  MapPin,
  Smartphone,
  Wrench,
  Search,
} from 'lucide-react';

export default function DashboardPage() {
  const { bookings, activeBookingId, setActiveBooking } = useBookingStore();
  const [isWizardOpen, setIsWizardOpen] = useState(false);
  const [selectedInvoiceBooking, setSelectedInvoiceBooking] = useState<Booking | null>(null);

  const activeBooking = bookings.find((b) => b.id === activeBookingId) || bookings[0];

  return (
    <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-orange/10 border border-brand-orange/30 text-brand-orange text-xs font-semibold uppercase tracking-wider">
            <Calendar className="w-3.5 h-3.5" /> Doorstep Repair & Order Dashboard
          </div>
          <h1 className="text-3xl sm:text-5xl font-display font-extrabold dark:text-white text-slate-900 tracking-tight">
            Service Booking & <span className="text-gradient-orange">Live Tracker</span>
          </h1>
          <p className="dark:text-slate-300 text-slate-700 text-sm max-w-2xl leading-relaxed font-medium">
            Track certified technician arrival in real-time, view 5-stage repair progress, or request a new.doorstep service appointment.
          </p>
        </div>

        <div>
          <Button
            variant="flame"
            size="lg"
            onClick={() => setIsWizardOpen(true)}
            leftIcon={<Plus className="w-4 h-4" />}
          >
            Book New Repair
          </Button>
        </div>
      </div>

      {/* Main Content Layout */}
      <div className="space-y-8">
        {/* Active Booking Live Tracker Section */}
        {activeBooking ? (
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-display font-bold dark:text-white text-slate-900 flex items-center gap-2">
                <Clock className="w-5 h-5 text-brand-orange" /> Active Repair Tracker
              </h2>
              <Badge variant="fitment">Live Update Active</Badge>
            </div>
            <LiveTracker
              booking={activeBooking}
              onOpenInvoice={() => setSelectedInvoiceBooking(activeBooking)}
            />
          </div>
        ) : (
          <GlassCard variant="default" className="p-12 text-center space-y-4">
            <h3 className="text-lg font-bold dark:text-white text-slate-900">No Active Bookings</h3>
            <p className="text-xs dark:text-slate-400 text-slate-600 max-w-sm mx-auto">
              You don't have any active doorstep.repair appointments right now.
            </p>
            <Button variant="flame" size="sm" onClick={() => setIsWizardOpen(true)}>
              Book Doorstep Technician
            </Button>
          </GlassCard>
        )}

        {/* All Bookings / History List */}
        {bookings.length > 0 && (
          <div className="space-y-4 pt-4">
            <h2 className="text-lg font-display font-bold dark:text-white text-slate-900 flex items-center gap-2">
              <Wrench className="w-5 h-5 text-brand-cyan" /> Repair Order History ({bookings.length})
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {bookings.map((b) => (
                <div
                  key={b.id}
                  onClick={() => setActiveBooking(b.id)}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                    activeBooking?.id === b.id
                      ? 'border-brand-orange dark:bg-white/10 bg-slate-100 shadow-md'
                      : 'dark:bg-white/5 bg-slate-50 border-slate-200 dark:border-white/10 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-sm dark:text-white text-slate-900">{b.deviceBrand} {b.deviceModel}</span>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-brand-orange/10 text-brand-orange font-bold">
                          {b.id}
                        </span>
                      </div>
                      <p className="text-xs dark:text-slate-400 text-slate-600 line-clamp-1 mt-1">{b.issueDescription}</p>
                    </div>

                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedInvoiceBooking(b);
                      }}
                      className="p-1.5 dark:text-slate-400 text-slate-600"
                      title="View Invoice"
                    >
                      <FileText className="w-4 h-4 text-brand-cyan" />
                    </Button>
                  </div>

                  <div className="pt-3 mt-3 border-t dark:border-white/10 border-slate-200 flex items-center justify-between text-xs font-mono">
                    <span className="dark:text-slate-400 text-slate-600">{b.appointmentDate}</span>
                    <span className="font-bold text-emerald-500">{b.status}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* New Booking Wizard Modal */}
      <BookingWizard
        isOpen={isWizardOpen}
        onClose={() => setIsWizardOpen(false)}
      />

      {/* Invoice Generator Modal */}
      <InvoiceModal
        booking={selectedInvoiceBooking}
        onClose={() => setSelectedInvoiceBooking(null)}
      />
    </main>
  );
}
