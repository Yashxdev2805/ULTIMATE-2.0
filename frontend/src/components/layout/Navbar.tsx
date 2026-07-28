'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '@/providers/ThemeProvider';
import { useCartStore } from '@/store/useCartStore';
import { useUIStore } from '@/store/useUIStore';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import {
  Cpu,
  Sparkles,
  Smartphone,
  BookOpen,
  ShoppingBag,
  Wrench,
  Calendar,
  ShieldCheck,
  ShoppingCart,
  Menu,
  X,
  Sun,
  Moon,
  ChevronDown,
  CheckCircle2,
} from 'lucide-react';

const navLinks = [
  { href: '/', label: 'Home', icon: Cpu },
  { href: '/ai-assistant', label: 'AI Copilot', icon: Sparkles, badge: 'AI' },
  { href: '/guides', label: 'DIY Guides', icon: BookOpen },
  { href: '/parts', label: 'Spare Parts', icon: ShoppingBag },
  { href: '/tools', label: 'Tools', icon: Wrench },
  { href: '/dashboard', label: 'Repair Booking', icon: Calendar },
  { href: '/admin', label: 'Admin Hub', icon: ShieldCheck },
];

const sampleDevices = [
  { brand: 'Apple', model: 'iPhone 15 Pro', variant: 'A3102' },
  { brand: 'Apple', model: 'MacBook Pro M3 16"', variant: 'A2992' },
  { brand: 'Samsung', model: 'Galaxy S24 Ultra', variant: 'SM-S928B' },
  { brand: 'Sony', model: 'PlayStation 5 Slim', variant: 'CFI-2000' },
  { brand: 'Dyson', model: 'V15 Detect Vacuum', variant: 'SV22' },
];

export function Navbar() {
  const pathname = usePathname();
  const { theme, toggleTheme } = useTheme();
  const { getTotalItems, toggleCartDrawer, selectedDevice, setSelectedDevice } = useCartStore();
  const { isMobileNavOpen, toggleMobileNav } = useUIStore();
  const [isDeviceMenuOpen, setIsDeviceMenuOpen] = useState(false);

  const totalItems = getTotalItems();

  return (
    <header className="sticky top-0 z-40 w-full border-b border-white/[0.08] bg-[#0B0F17]/80 backdrop-blur-xl transition-all">
      {/* Top Device Compatibility Header Bar */}
      <div className="bg-[#121826]/90 border-b border-white/[0.05] py-1.5 px-4 text-xs font-mono">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Smartphone className="w-3.5 h-3.5 text-brand-orange" />
            <span className="text-slate-400 hidden sm:inline">Guaranteed Fitment Selector:</span>
            
            {/* Device Dropdown Selector */}
            <div className="relative">
              <button
                onClick={() => setIsDeviceMenuOpen(!isDeviceMenuOpen)}
                className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-lg bg-white/5 border border-white/10 hover:border-brand-orange/40 text-slate-200 hover:text-white transition-all"
              >
                {selectedDevice?.model ? (
                  <>
                    <span className="text-emerald-400 font-semibold">✓ {selectedDevice.model}</span>
                    <span className="text-slate-400 font-normal">({selectedDevice.variant})</span>
                  </>
                ) : (
                  <span className="text-slate-300">Select Your Device Model...</span>
                )}
                <ChevronDown className="w-3 h-3 text-slate-400" />
              </button>

              {/* Dropdown Menu */}
              <AnimatePresence>
                {isDeviceMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 5 }}
                    className="absolute top-full left-0 mt-1.5 w-64 p-2 rounded-xl bg-[#121826] border border-white/15 shadow-2xl z-50 backdrop-blur-2xl"
                  >
                    <div className="text-[11px] font-semibold text-slate-400 px-2 py-1 uppercase tracking-wider">
                      Popular Models
                    </div>
                    {sampleDevices.map((device) => (
                      <button
                        key={device.model}
                        onClick={() => {
                          setSelectedDevice(device);
                          setIsDeviceMenuOpen(false);
                        }}
                        className="w-full text-left px-2.5 py-1.5 rounded-lg hover:bg-brand-orange/10 hover:text-brand-orange text-slate-300 flex items-center justify-between text-xs transition-colors"
                      >
                        <span>{device.model}</span>
                        <span className="text-[10px] font-mono text-slate-500">{device.brand}</span>
                      </button>
                    ))}
                    {selectedDevice && (
                      <button
                        onClick={() => {
                          setSelectedDevice(null);
                          setIsDeviceMenuOpen(false);
                        }}
                        className="w-full text-center mt-1 pt-1.5 border-t border-white/10 text-[11px] text-rose-400 hover:text-rose-300"
                      >
                        Clear Fitment Filter
                      </button>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          <div className="flex items-center gap-4 text-slate-400 text-[11px]">
            <span className="hidden md:flex items-center gap-1 text-emerald-400">
              <CheckCircle2 className="w-3 h-3" /> 100% OEM Compatibility Guarantee
            </span>
            <span className="hidden sm:inline">24/7 AI Diagnostic Support</span>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2.5 group shrink-0">
          <div className="p-2 rounded-xl bg-gradient-to-br from-[#FF6A00] to-[#7928CA] text-white shadow-glow-orange group-hover:scale-105 transition-transform">
            <Cpu className="w-5 h-5" />
          </div>
          <div className="flex flex-col">
            <span className="font-display font-bold text-lg text-white tracking-tight leading-none group-hover:text-brand-orange transition-colors">
              Thinkkaro <span className="text-brand-orange">RepairHub</span>
            </span>
            <span className="text-[10px] font-mono text-slate-400 tracking-wider">ECOSYSTEM</span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            const Icon = link.icon;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`relative px-3.5 py-2 rounded-xl text-xs font-medium transition-all flex items-center gap-1.5 ${
                  isActive
                    ? 'text-white font-semibold bg-white/10 shadow-sm border border-white/15'
                    : 'text-slate-300 hover:text-white hover:bg-white/5'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-brand-orange' : 'text-slate-400'}`} />
                <span>{link.label}</span>
                {link.badge && (
                  <span className="px-1.5 py-0.2 rounded-full bg-brand-violet text-white text-[9px] font-bold">
                    {link.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Action Controls */}
        <div className="flex items-center gap-2.5">
          {/* Theme Switcher Button */}
          <Button
            variant="glass"
            size="sm"
            onClick={toggleTheme}
            className="p-2 rounded-xl"
            title="Toggle Dark/Light Mode"
          >
            {theme === 'dark' ? (
              <Sun className="w-4 h-4 text-amber-400" />
            ) : (
              <Moon className="w-4 h-4 text-indigo-400" />
            )}
          </Button>

          {/* Cart Trigger Button */}
          <Button
            variant="flame"
            size="sm"
            onClick={toggleCartDrawer}
            leftIcon={<ShoppingCart className="w-4 h-4" />}
            className="relative"
          >
            <span className="hidden sm:inline">Cart</span>
            {totalItems > 0 && (
              <span className="ml-1 px-1.5 py-0.5 rounded-full bg-white text-slate-950 text-xs font-bold font-mono">
                {totalItems}
              </span>
            )}
          </Button>

          {/* Mobile Navigation Drawer Trigger */}
          <Button
            variant="glass"
            size="sm"
            onClick={toggleMobileNav}
            className="lg:hidden p-2 rounded-xl"
            title="Toggle Mobile Menu"
          >
            {isMobileNavOpen ? <X className="w-5 h-5 text-white" /> : <Menu className="w-5 h-5 text-white" />}
          </Button>
        </div>
      </div>
    </header>
  );
}
