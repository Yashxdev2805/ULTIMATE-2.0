'use client';

import React from 'react';
import { useBookingStore, BookingStatus } from '@/store/useBookingStore';
import { useAdminStore } from '@/store/useAdminStore';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import {
  UserCheck,
  ChevronRight,
  ChevronLeft,
  Clock,
  MapPin,
  Smartphone,
  Wrench,
  Truck,
  CheckCircle2,
} from 'lucide-react';

const COLUMNS: { key: BookingStatus; label: string; color: string }[] = [
  { key: 'Order Confirmed', label: 'Order Confirmed', color: 'border-amber-500/40 text-amber-500' },
  { key: 'Technician Assigned', label: 'Tech Assigned', color: 'border-blue-500/40 text-blue-400' },
  { key: 'En Route', label: 'En Route', color: 'border-cyan-500/40 text-cyan-400' },
  { key: 'Under Repair', label: 'Under Repair', color: 'border-purple-500/40 text-purple-400' },
  { key: 'Completed', label: 'Completed', color: 'border-emerald-500/40 text-emerald-400' },
];

export function DispatchKanban() {
  const { bookings, updateStatus } = useBookingStore();
  const { technicians } = useAdminStore();

  const handleAdvance = (id: string, currentStatus: BookingStatus) => {
    const currentIndex = COLUMNS.findIndex((c) => c.key === currentStatus);
    if (currentIndex < COLUMNS.length - 1) {
      updateStatus(id, COLUMNS[currentIndex + 1].key);
    }
  };

  const handleRegress = (id: string, currentStatus: BookingStatus) => {
    const currentIndex = COLUMNS.findIndex((c) => c.key === currentStatus);
    if (currentIndex > 0) {
      updateStatus(id, COLUMNS[currentIndex - 1].key);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold dark:text-white text-slate-900 flex items-center gap-2">
          <Wrench className="w-4 h-4 text-brand-orange" /> Real-Time Dispatch & Dispatcher Board
        </h3>
        <span className="text-xs font-mono text-slate-400">Total Active Jobs: {bookings.length}</span>
      </div>

      {/* 5 Column Kanban Grid */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 overflow-x-auto pb-4">
        {COLUMNS.map((col) => {
          const colBookings = bookings.filter((b) => b.status === col.key);

          return (
            <div
              key={col.key}
              className="p-3 rounded-2xl dark:bg-white/5 bg-slate-100 border dark:border-white/10 border-slate-300 min-h-[450px] flex flex-col justify-between"
            >
              {/* Column Header */}
              <div className="pb-3 border-b dark:border-white/10 border-slate-200 flex items-center justify-between">
                <span className={`text-xs font-bold font-mono ${col.color}`}>{col.label}</span>
                <span className="w-5 h-5 rounded-full bg-black/20 dark:bg-white/10 text-center font-mono text-xs font-bold dark:text-white text-slate-900 flex items-center justify-center">
                  {colBookings.length}
                </span>
              </div>

              {/* Booking Cards in Column */}
              <div className="py-3 flex-1 space-y-3 overflow-y-auto max-h-[500px]">
                {colBookings.length === 0 ? (
                  <div className="text-[11px] text-slate-400 text-center py-8 font-mono">
                    No tickets in this stage
                  </div>
                ) : (
                  colBookings.map((b) => (
                    <div
                      key={b.id}
                      className="p-3.5 rounded-xl dark:bg-[#0B0F17] bg-white border dark:border-white/10 border-slate-200 shadow-sm space-y-2.5 text-xs"
                    >
                      <div className="flex justify-between items-start">
                        <span className="font-mono text-[10px] font-bold text-brand-orange px-1.5 py-0.5 rounded bg-brand-orange/10">
                          #{b.id}
                        </span>
                        <span className="text-[10px] text-slate-400 font-mono">{b.appointmentDate}</span>
                      </div>

                      <div>
                        <div className="font-bold dark:text-white text-slate-900">{b.deviceBrand} {b.deviceModel}</div>
                        <div className="text-[11px] dark:text-slate-400 text-slate-500 line-clamp-1">{b.customerName} ({b.city})</div>
                      </div>

                      {/* Tech Assignment selector */}
                      <div className="pt-2 border-t dark:border-white/5 border-slate-100 flex items-center gap-1.5">
                        <UserCheck className="w-3.5 h-3.5 text-brand-cyan shrink-0" />
                        <select
                          value={b.technicianName}
                          onChange={(e) => {
                            // Assign tech
                          }}
                          className="w-full text-[10px] p-1 rounded dark:bg-white/5 bg-slate-100 border dark:border-white/10 border-slate-200 dark:text-white text-slate-900 font-mono focus:outline-none"
                        >
                          {technicians.map((t) => (
                            <option key={t.id} value={t.name} className="dark:bg-[#121826] bg-white">
                              {t.name} ({t.status})
                            </option>
                          ))}
                        </select>
                      </div>

                      {/* Move Controls */}
                      <div className="flex justify-between items-center pt-1">
                        <button
                          onClick={() => handleRegress(b.id, b.status)}
                          disabled={col.key === 'Order Confirmed'}
                          className="p-1 text-slate-400 hover:text-slate-900 dark:hover:text-white disabled:opacity-30"
                          title="Move Back"
                        >
                          <ChevronLeft className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleAdvance(b.id, b.status)}
                          disabled={col.key === 'Completed'}
                          className="p-1 text-brand-orange hover:text-orange-400 disabled:opacity-30"
                          title="Advance Status"
                        >
                          <ChevronRight className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
