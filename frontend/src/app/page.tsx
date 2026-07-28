'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Hero } from '@/components/home/Hero';
import { FeatureGrid } from '@/components/home/FeatureGrid';
import { GuideCard, GuideItem } from '@/components/features/guides/GuideCard';
import { InteractiveStepViewer } from '@/components/features/guides/InteractiveStepViewer';
import { GlassCard } from '@/components/ui/GlassCard';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { BookOpen, Sparkles, ArrowRight, CheckCircle2, ShieldCheck, Zap } from 'lucide-react';

const featuredGuides: GuideItem[] = [
  {
    id: 'guide-iphone-15-pro-screen',
    title: 'iPhone 15 Pro OLED Super Retina Display & Glass Replacement',
    brand: 'Apple',
    category: 'Smartphones',
    difficulty: 'Intermediate',
    duration: '45 Mins',
    stepsCount: 5,
    description: 'Replace a shattered OLED screen panel while retaining True Tone and Face ID ambient light sensor functionality.',
    toolsRequired: ['Pentalobe P2', 'Tri-Point Y000', 'Suction Handle', 'ESD Spudger', 'Precision Heat Gun'],
    partsRequired: [
      { id: 'iphone-15-pro-display', name: 'iPhone 15 Pro Super Retina XDR Display', price: 249.99 },
      { id: 'display-seal-adhesive', name: 'Waterproof Frame Seal Adhesive Strip', price: 9.99 },
    ],
    steps: [
      {
        title: 'Unscrew Bottom Pentalobe Fasteners',
        desc: 'Power off your iPhone 15 Pro. Remove the two 3.8mm Pentalobe P2 screws located on either side of the USB-C charging port.',
        torque: '0.2 Nm',
        warning: 'Ensure device is fully powered off before inserting metallic screwdrivers to avoid shorting battery terminals.',
      },
      {
        title: 'Apply Soft Heat & Apply Suction Cup',
        desc: 'Apply a heat gun set to 80°C along the display edges for 90 seconds to soften the waterproof seal adhesive.',
      },
      {
        title: 'Slice Display Frame Adhesive with Opener Pick',
        desc: 'Attach the suction handle to the lower third of the glass panel. Insert an opening pick no deeper than 3mm to slice the adhesive perimeter.',
        torque: 'Do not insert pick > 3mm near ambient light sensor flex cable.',
      },
      {
        title: 'Disconnect Battery & Screen Flex Cables',
        desc: 'Unscrew the 4 Tri-Point Y000 screws securing the logic board shield. Disconnect the battery press connector first, followed by the screen flex cables.',
      },
      {
        title: 'Transfer Sensor Assembly & Apply New Waterproof Seal',
        desc: 'Carefully transfer the top earpiece/ambient sensor assembly to the replacement screen. Clean frame edges with isopropyl alcohol and install new adhesive.',
      },
    ],
  },
  {
    id: 'guide-macbook-pro-m3-battery',
    title: 'MacBook Pro M3 16" OEM High-Capacity Battery Cell Swap',
    brand: 'Apple',
    category: 'Laptops',
    difficulty: 'Master',
    duration: '60 Mins',
    stepsCount: 4,
    description: 'Safely remove factory adhesive stretch release tabs and install a fresh zero-cycle 99.5Wh lithium-ion battery.',
    toolsRequired: ['Torx T5 & T8', 'Adhesive Dissolver', 'Plastic Spudger', 'Safety Glasses'],
    partsRequired: [
      { id: 'macbook-pro-16-battery', name: 'MacBook Pro 16" OEM High-Density Battery', price: 129.99 },
    ],
    steps: [
      {
        title: 'Remove Lower Aluminum Case Fasteners',
        desc: 'Unscrew the 6 Torx T5 screws securing the bottom case. Use a suction cup to pop the internal retention clips.',
      },
      {
        title: 'Disconnect Battery Power Data Connector',
        desc: 'Peel back the electrical tape covering the battery BMU connector and slide out the flex cable from its ZIF socket.',
        warning: 'Failure to disconnect battery before unseating logic board connectors can blow backlight fuses.',
      },
      {
        title: 'Release Adhesive Stretch Tabs',
        desc: 'Slowly pull the 6 battery adhesive release tabs parallel to the chassis. Apply 2 drops of isopropyl alcohol if tab snaps.',
      },
      {
        title: 'Seat New Battery & Run Calibration Cycle',
        desc: 'Position new battery cell array, reconnect BMU flex cable, reassemble case, and perform full 100% to 0% power calibration.',
      },
    ],
  },
  {
    id: 'guide-ps5-stick-drift-repair',
    title: 'PS5 DualSense Controller Hall Effect Magnet Joystick Swap',
    brand: 'Sony',
    category: 'Consoles',
    difficulty: 'Intermediate',
    duration: '35 Mins',
    stepsCount: 3,
    description: 'Upgrade stock potentiometer joysticks to contactless Hall Effect magnetic sensor sticks for permanent zero drift.',
    toolsRequired: ['Phillips #00', 'Plastic Pry Bar', 'Soldering Iron / Desoldering Pump'],
    partsRequired: [
      { id: 'hall-effect-joysticks', name: 'DualSense Hall Effect Magnetic Joysticks (Pair)', price: 14.99 },
    ],
    steps: [
      {
        title: 'Remove Decorative Trim & Shell Screws',
        desc: 'Pop off the black front accent trim using a pry bar to expose the lower Phillips screws.',
      },
      {
        title: 'Desolder Original Potentiometer Modules',
        desc: 'Apply fresh solder to all 14 joint pins on each analog stick module, then use desoldering braid or vacuum pump to clear joints.',
      },
      {
        title: 'Solder Hall Effect Sensors & Calibrate Center Deadzone',
        desc: 'Insert Hall Effect modules, solder joint pins, and use web-based gamepad tester to calibrate magnet zero position.',
      },
    ],
  },
];

export default function Home() {
  const [activeStepGuide, setActiveStepGuide] = useState<GuideItem | null>(null);

  return (
    <main className="flex-1 pb-16">
      {/* Hero Section */}
      <Hero />

      {/* 4 Core Pillars Feature Grid */}
      <FeatureGrid />

      {/* Featured DIY Guides Showcase */}
      <section className="py-16 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 mb-10">
            <div>
              <Badge variant="fitment" className="mb-2">Verified Step-by-Step Fixes</Badge>
              <h2 className="text-3xl font-display font-extrabold dark:text-white text-slate-900 tracking-tight">
                Featured <span className="text-gradient-cyan">DIY Repair Guides</span>
              </h2>
              <p className="dark:text-slate-400 text-slate-600 text-sm mt-1 font-medium">
                Complete self-repair instructions with torque specs and 1-click part bundles.
              </p>
            </div>

            <Link href="/guides">
              <Button variant="outline" size="sm" className="dark:text-slate-200 text-slate-800 border dark:border-white/20 border-slate-300" rightIcon={<ArrowRight className="w-4 h-4" />}>
                View All Guides
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredGuides.map((guide) => (
              <GuideCard
                key={guide.id}
                guide={guide}
                onOpenStepViewer={(g) => setActiveStepGuide(g)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* AI Diagnostic CTA Banner */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <GlassCard variant="glowing" glowColor="violet" className="p-8 sm:p-12 text-center space-y-6">
            <div className="w-14 h-14 rounded-2xl bg-purple-500/10 border border-purple-500/30 text-purple-500 dark:text-purple-400 flex items-center justify-center mx-auto">
              <Sparkles className="w-7 h-7" />
            </div>

            <div className="max-w-2xl mx-auto space-y-3">
              <h2 className="text-2xl sm:text-4xl font-display font-extrabold dark:text-white text-slate-900 tracking-tight">
                Unsure What’s Wrong With <span className="text-gradient-violet">Your Device?</span>
              </h2>
              <p className="dark:text-slate-300 text-slate-700 text-sm leading-relaxed font-medium">
                Upload a photo of the cracked glass or damaged board. Our AI copilot identifies the failure, calculates root cause confidence, and recommends exact replacement parts.
              </p>
            </div>

            <div className="pt-2 flex justify-center">
              <Link href="/ai-assistant">
                <Button variant="violet" size="lg" rightIcon={<ArrowRight className="w-4 h-4" />}>
                  Launch AI Diagnostic Copilot
                </Button>
              </Link>
            </div>
          </GlassCard>
        </div>
      </section>

      {/* Interactive Step Viewer Drawer Modal */}
      <InteractiveStepViewer
        guide={activeStepGuide}
        onClose={() => setActiveStepGuide(null)}
      />
    </main>
  );
}
