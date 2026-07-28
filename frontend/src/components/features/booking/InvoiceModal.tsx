'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Booking } from '@/store/useBookingStore';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { X, Printer, ExternalLink, Cpu, ShieldCheck } from 'lucide-react';

interface InvoiceModalProps {
  booking: Booking | null;
  onClose: () => void;
}

export function InvoiceModal({ booking, onClose }: InvoiceModalProps) {
  if (!booking) return null;

  const total = booking.partsCost + booking.laborCost + booking.tax;

  const handlePrint = () => {
    window.print();
  };

  const handleOpenNewTab = () => {
    const printWindow = window.open('', '_blank', 'width=900,height=800');
    if (!printWindow) return;

    const htmlContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>Invoice #${booking.id} - Thinkkaro RepairHub</title>
          <style>
            body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; padding: 40px; color: #1e293b; line-height: 1.5; }
            .header { display: flex; justify-content: space-between; border-bottom: 2px solid #e2e8f0; padding-bottom: 20px; margin-bottom: 20px; }
            .brand { font-size: 24px; font-weight: bold; color: #0f172a; }
            .brand span { color: #ff6a00; }
            .info-grid { display: flex; justify-content: space-between; font-size: 13px; margin-bottom: 30px; }
            table { width: 100%; border-collapse: collapse; margin-bottom: 30px; font-size: 13px; }
            th { text-align: left; background: #f8fafc; border-bottom: 2px solid #e2e8f0; padding: 10px; }
            td { border-bottom: 1px solid #f1f5f9; padding: 12px 10px; }
            .totals { font-family: monospace; text-align: right; width: 300px; margin-left: auto; font-size: 14px; }
            .totals-row { display: flex; justify-content: space-between; padding: 4px 0; }
            .totals-total { font-size: 18px; font-weight: bold; border-top: 2px solid #e2e8f0; padding-top: 8px; color: #ff6a00; }
            .footer { margin-top: 40px; border-top: 1px solid #e2e8f0; padding-top: 20px; font-size: 12px; color: #64748b; display: flex; justify-content: space-between; }
          </style>
        </head>
        <body>
          <div className="header">
            <div>
              <div className="brand">Thinkkaro <span>RepairHub</span></div>
              <div>Certified Electronics Repair & Genuine Parts</div>
              <div>GSTIN: 07AAAAA0000A1Z5 | Support: care@thinkkaro.com</div>
            </div>
            <div style="text-align: right;">
              <h2>INVOICE</h2>
              <div><b>ID:</b> #${booking.id}</div>
              <div><b>Date:</b> ${new Date(booking.createdAt).toLocaleDateString()}</div>
            </div>
          </div>

          <div className="info-grid">
            <div>
              <strong>BILLED TO:</strong><br/>
              ${booking.customerName}<br/>
              ${booking.address}<br/>
              ${booking.city} - ${booking.pincode}<br/>
              ${booking.customerEmail} | ${booking.customerPhone}
            </div>
            <div style="text-align: right;">
              <strong>SERVICE DETAILS:</strong><br/>
              ${booking.deviceBrand} ${booking.deviceModel}<br/>
              Issue: ${booking.issueDescription}<br/>
              Technician: ${booking.technicianName}<br/>
              Payment: Paid via ${booking.paymentMethod}
            </div>
          </div>

          <table>
            <thead>
              <tr>
                <th>Item Description</th>
                <th style="text-align:center;">Type</th>
                <th style="text-align:right;">Amount</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>${booking.deviceModel} Genuine Replacement Module<br/><small style="color:#64748b;">100% OEM Grade Certified Component</small></td>
                <td style="text-align:center;">Part</td>
                <td style="text-align:right;">$${booking.partsCost.toFixed(2)}</td>
              </tr>
              <tr>
                <td>Doorstep Technician On-Site Labor & Testing<br/><small style="color:#64748b;">Includes 21-point post-repair diagnostic check</small></td>
                <td style="text-align:center;">Service</td>
                <td style="text-align:right;">$${booking.laborCost.toFixed(2)}</td>
              </tr>
            </tbody>
          </table>

          <div className="totals">
            <div className="totals-row"><span>Subtotal:</span> <span>$${(booking.partsCost + booking.laborCost).toFixed(2)}</span></div>
            <div className="totals-row"><span>Tax (8%):</span> <span>$${booking.tax.toFixed(2)}</span></div>
            <div className="totals-row totals-total"><span>Total Paid:</span> <span>$${total.toFixed(2)}</span></div>
          </div>

          <div className="footer">
            <div>✓ Covered by Thinkkaro 180-Day Guarantee</div>
            <div>Thank you for choosing Thinkkaro RepairHub</div>
          </div>
          <script>
            window.onload = function() { window.print(); }
          </script>
        </body>
      </html>
    `;

    printWindow.document.write(htmlContent);
    printWindow.document.close();
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

        {/* Invoice Modal Box with fixed max height and internal scroll */}
        <motion.div
          initial={{ scale: 0.95, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.95, opacity: 0, y: 20 }}
          transition={{ type: 'spring', stiffness: 350, damping: 25 }}
          className="relative z-10 w-full max-w-3xl max-h-[90vh] flex flex-col bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 border border-slate-300 dark:border-white/15 rounded-3xl shadow-2xl overflow-hidden"
        >
          {/* Header Bar */}
          <div className="flex items-center justify-between p-6 border-b border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-slate-900/50 shrink-0">
            <h2 className="text-xl font-display font-bold flex items-center gap-2">
              <Cpu className="w-5 h-5 text-brand-orange" /> Tax Invoice & Receipt
            </h2>
            <div className="flex items-center gap-2">
              <Button
                variant="glass"
                size="sm"
                onClick={handleOpenNewTab}
                leftIcon={<ExternalLink className="w-4 h-4 text-brand-cyan" />}
                className="hidden sm:inline-flex border dark:border-white/15 border-slate-300 dark:text-white text-slate-800"
              >
                Open in New Window
              </Button>

              <Button
                variant="flame"
                size="sm"
                onClick={handlePrint}
                leftIcon={<Printer className="w-4 h-4" />}
              >
                Print / Save PDF
              </Button>

              <Button
                variant="ghost"
                size="sm"
                onClick={onClose}
                className="p-2 dark:text-slate-400 text-slate-600 hover:text-slate-950 dark:hover:text-white"
              >
                <X className="w-5 h-5" />
              </Button>
            </div>
          </div>

          {/* Printable & Scrollable Invoice Body */}
          <div className="p-6 sm:p-8 overflow-y-auto space-y-6 flex-1">
            {/* Header: Company & Invoice Info */}
            <div className="flex flex-col sm:flex-row justify-between items-start border-b pb-6 border-slate-200 dark:border-white/10 gap-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-display font-bold text-xl text-slate-900 dark:text-white">
                    Thinkkaro <span className="text-brand-orange">RepairHub</span>
                  </span>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Certified Electronics Repair & Genuine Parts
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  GSTIN: 07AAAAA0000A1Z5 | Support: care@thinkkaro.com
                </p>
              </div>

              <div className="sm:text-right space-y-1">
                <Badge variant="fitment" className="mb-1">INVOICE</Badge>
                <div className="text-xs font-mono font-bold">#{booking.id}</div>
                <div className="text-xs text-slate-500 dark:text-slate-400">
                  Date: {new Date(booking.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
                </div>
              </div>
            </div>

            {/* Customer & Appointment Details Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs border-b pb-6 border-slate-200 dark:border-white/10">
              <div className="space-y-1">
                <span className="font-semibold text-slate-400 uppercase tracking-wider block mb-1">Billed To</span>
                <div className="font-bold text-slate-900 dark:text-white">{booking.customerName}</div>
                <div>{booking.address}</div>
                <div>{booking.city} - {booking.pincode}</div>
                <div className="text-slate-500">{booking.customerEmail}</div>
                <div className="text-slate-500">{booking.customerPhone}</div>
              </div>

              <div className="sm:text-right space-y-1">
                <span className="font-semibold text-slate-400 uppercase tracking-wider block mb-1">Service Details</span>
                <div className="font-bold text-slate-900 dark:text-white">{booking.deviceBrand} {booking.deviceModel}</div>
                <div>Issue: {booking.issueDescription}</div>
                <div className="text-slate-500">Assigned Tech: {booking.technicianName}</div>
                <div className="text-emerald-500 font-semibold">Status: Paid via {booking.paymentMethod}</div>
              </div>
            </div>

            {/* Itemized Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left">
                <thead className="bg-slate-100 dark:bg-white/5 border-b border-slate-200 dark:border-white/10">
                  <tr>
                    <th className="py-2.5 px-3 font-semibold text-slate-700 dark:text-slate-300">Description</th>
                    <th className="py-2.5 px-3 font-semibold text-slate-700 dark:text-slate-300 text-center">Type</th>
                    <th className="py-2.5 px-3 font-semibold text-slate-700 dark:text-slate-300 text-right">Amount</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 dark:divide-white/5">
                  <tr>
                    <td className="py-3 px-3">
                      <span className="font-semibold text-slate-900 dark:text-white">{booking.deviceModel} Genuine Replacement Module</span>
                      <p className="text-[10px] text-slate-500">100% OEM Grade Certified Component</p>
                    </td>
                    <td className="py-3 px-3 text-center">
                      <span className="px-2 py-0.5 rounded bg-blue-500/10 text-blue-600 dark:text-blue-400 text-[10px] font-mono">Part</span>
                    </td>
                    <td className="py-3 px-3 text-right font-mono">${booking.partsCost.toFixed(2)}</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-3">
                      <span className="font-semibold text-slate-900 dark:text-white">Doorstep Technician On-Site Labor & Testing</span>
                      <p className="text-[10px] text-slate-500">Includes 21-point post-repair diagnostic check</p>
                    </td>
                    <td className="py-3 px-3 text-center">
                      <span className="px-2 py-0.5 rounded bg-purple-500/10 text-purple-600 dark:text-purple-400 text-[10px] font-mono">Service</span>
                    </td>
                    <td className="py-3 px-3 text-right font-mono">${booking.laborCost.toFixed(2)}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Calculations Breakdown */}
            <div className="flex justify-end pt-2">
              <div className="w-64 space-y-1.5 text-xs font-mono">
                <div className="flex justify-between text-slate-600 dark:text-slate-400">
                  <span>Subtotal:</span>
                  <span>${(booking.partsCost + booking.laborCost).toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-slate-600 dark:text-slate-400">
                  <span>Estimated Tax (8%):</span>
                  <span>${booking.tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm font-bold text-slate-900 dark:text-white pt-2 border-t border-slate-200 dark:border-white/10">
                  <span>Total Paid:</span>
                  <span className="text-brand-orange">${total.toFixed(2)}</span>
                </div>
              </div>
            </div>

            {/* Footer Terms & Guarantee */}
            <div className="pt-6 border-t border-slate-200 dark:border-white/10 text-[10px] text-slate-500 dark:text-slate-400 flex flex-col sm:flex-row items-center justify-between gap-2">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-500" />
                <span>Covered by Thinkkaro 180-Day Guarantee</span>
              </div>
              <div>Thank you for choosing Thinkkaro RepairHub!</div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
