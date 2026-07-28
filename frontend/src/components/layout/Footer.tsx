'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import {
  Cpu,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  Truck,
  Wrench,
  Mail,
  ArrowRight,
} from 'lucide-react';

export function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <footer className="border-t dark:border-white/10 border-slate-200 dark:bg-[#0B0F17] bg-slate-100 dark:text-slate-300 text-slate-700 pt-16 pb-12 relative overflow-hidden transition-colors duration-300">
      {/* Background Accent Glow */}
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-brand-orange/5 blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Trust Badges Strip */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pb-12 mb-12 border-b dark:border-white/10 border-slate-200">
          <div className="flex items-center gap-3.5 p-4 rounded-2xl dark:bg-white/5 bg-white border dark:border-white/5 border-slate-200 shadow-sm backdrop-blur-md">
            <div className="p-3 rounded-xl bg-emerald-500/10 text-emerald-500 dark:text-emerald-400">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-semibold dark:text-white text-slate-900">100% Fitment Guarantee</h4>
              <p className="text-xs dark:text-slate-400 text-slate-600">Verified compatibility per device model</p>
            </div>
          </div>

          <div className="flex items-center gap-3.5 p-4 rounded-2xl dark:bg-white/5 bg-white border dark:border-white/5 border-slate-200 shadow-sm backdrop-blur-md">
            <div className="p-3 rounded-xl bg-cyan-500/10 text-cyan-600 dark:text-cyan-400">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-semibold dark:text-white text-slate-900">OEM Certified Parts</h4>
              <p className="text-xs dark:text-slate-400 text-slate-600">Original & premium refurbished quality</p>
            </div>
          </div>

          <div className="flex items-center gap-3.5 p-4 rounded-2xl dark:bg-white/5 bg-white border dark:border-white/5 border-slate-200 shadow-sm backdrop-blur-md">
            <div className="p-3 rounded-xl bg-purple-500/10 text-purple-500 dark:text-purple-400">
              <Sparkles className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-semibold dark:text-white text-slate-900">24/7 AI Diagnostics</h4>
              <p className="text-xs dark:text-slate-400 text-slate-600">Instant hardware failure scores</p>
            </div>
          </div>

          <div className="flex items-center gap-3.5 p-4 rounded-2xl dark:bg-white/5 bg-white border dark:border-white/5 border-slate-200 shadow-sm backdrop-blur-md">
            <div className="p-3 rounded-xl bg-orange-500/10 text-orange-500 dark:text-orange-400">
              <Truck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-semibold dark:text-white text-slate-900">Doorstep Technician Pickup</h4>
              <p className="text-xs dark:text-slate-400 text-slate-600">5-stage live status tracking</p>
            </div>
          </div>
        </div>

        {/* Main Sitemap Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-gradient-to-br from-[#FF6A00] to-[#7928CA] text-white">
                <Cpu className="w-5 h-5" />
              </div>
              <span className="font-display font-bold text-xl dark:text-white text-slate-900 tracking-tight">
                Thinkkaro <span className="text-brand-orange">RepairHub</span>
              </span>
            </Link>
            <p className="text-xs dark:text-slate-400 text-slate-600 leading-relaxed max-w-sm">
              Next-generation repair, diagnostic, and spare parts ecosystem. Combining multi-modal AI fault recognition, guaranteed-fitment e-commerce, and doorstep technician dispatch.
            </p>

            {/* Newsletter Subscription */}
            <form onSubmit={handleSubscribe} className="pt-2">
              <h5 className="text-xs font-semibold dark:text-white text-slate-900 mb-2">Subscribe for Hardware Fix Alerts</h5>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="px-3.5 py-2 rounded-xl dark:bg-white/5 bg-white border dark:border-white/10 border-slate-300 text-xs dark:text-white text-slate-900 dark:placeholder:text-slate-500 placeholder:text-slate-400 focus:outline-none focus:border-brand-orange flex-1 font-mono"
                  required
                />
                <Button variant="flame" size="sm" type="submit" rightIcon={<ArrowRight className="w-3.5 h-3.5" />}>
                  Join
                </Button>
              </div>
              {subscribed && (
                <p className="text-[11px] text-emerald-500 dark:text-emerald-400 font-mono mt-1">✓ Thank you for subscribing!</p>
              )}
            </form>
          </div>

          {/* Column 1: Platform Modules */}
          <div className="space-y-3">
            <h5 className="text-xs font-bold dark:text-white text-slate-900 uppercase tracking-wider font-mono">Platform Modules</h5>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/ai-assistant" className="hover:text-brand-orange transition-colors">AI Diagnostic Copilot</Link>
              </li>
              <li>
                <Link href="/guides" className="hover:text-brand-orange transition-colors">DIY Repair Guides</Link>
              </li>
              <li>
                <Link href="/parts" className="hover:text-brand-orange transition-colors">Guaranteed Spare Parts</Link>
              </li>
              <li>
                <Link href="/tools" className="hover:text-brand-orange transition-colors">Precision Tool Store</Link>
              </li>
              <li>
                <Link href="/dashboard" className="hover:text-brand-orange transition-colors">Technician Service Booking</Link>
              </li>
            </ul>
          </div>

          {/* Column 2: Devices & Brands */}
          <div className="space-y-3">
            <h5 className="text-xs font-bold dark:text-white text-slate-900 uppercase tracking-wider font-mono">Supported Devices</h5>
            <ul className="space-y-2 text-xs">
              <li><span className="dark:text-slate-400 text-slate-600">Apple iPhone & Mac</span></li>
              <li><span className="dark:text-slate-400 text-slate-600">Samsung Galaxy Series</span></li>
              <li><span className="dark:text-slate-400 text-slate-600">PlayStation & Xbox Consoles</span></li>
              <li><span className="dark:text-slate-400 text-slate-600">Dyson & Home Appliances</span></li>
              <li><span className="dark:text-slate-400 text-slate-600">DJI & Consumer Drones</span></li>
            </ul>
          </div>

          {/* Column 3: Enterprise & Admin */}
          <div className="space-y-3">
            <h5 className="text-xs font-bold dark:text-white text-slate-900 uppercase tracking-wider font-mono">Operations</h5>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/admin" className="hover:text-brand-orange transition-colors">Admin Control Center</Link>
              </li>
              <li><span className="dark:text-slate-400 text-slate-600">Repair Dispatch Kanban</span></li>
              <li><span className="dark:text-slate-400 text-slate-600">Barcode Inventory Scanning</span></li>
              <li><span className="dark:text-slate-400 text-slate-600">RBAC Security Controls</span></li>
              <li><span className="dark:text-slate-400 text-slate-600">GST Invoice Suite</span></li>
            </ul>
          </div>
        </div>

        {/* Sub-footer Copyright */}
        <div className="pt-8 border-t dark:border-white/10 border-slate-300 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono dark:text-slate-500 text-slate-600">
          <div>
            © {new Date().getFullYear()} Thinkkaro (RepairHub). All rights reserved.
          </div>
          <div className="flex items-center gap-4">
            <a href="#" className="hover:text-slate-900 dark:hover:text-slate-300 transition-colors">Privacy Policy</a>
            <span>•</span>
            <a href="#" className="hover:text-slate-900 dark:hover:text-slate-300 transition-colors">Terms of Service</a>
            <span>•</span>
            <a href="#" className="hover:text-slate-900 dark:hover:text-slate-300 transition-colors">WCAG AA Accessibility</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
