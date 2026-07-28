'use client';

import React, { useState } from 'react';
import { GuideCard, GuideItem } from '@/components/features/guides/GuideCard';
import { GuideFilterBar } from '@/components/features/guides/GuideFilterBar';
import { InteractiveStepViewer } from '@/components/features/guides/InteractiveStepViewer';
import { Badge } from '@/components/ui/Badge';
import { GlassCard } from '@/components/ui/GlassCard';
import { BookOpen, Sparkles, Wrench, SearchX } from 'lucide-react';

const allGuides: GuideItem[] = [
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
  {
    id: 'guide-dyson-v15-filter',
    title: 'Dyson V15 Detect Vacuum HEPA Filter & Cyclone Seal Replacement',
    brand: 'Dyson',
    category: 'Appliances',
    difficulty: 'Beginner',
    duration: '15 Mins',
    stepsCount: 2,
    description: 'Wash or replace clogged post-motor HEPA filter and clear dust bin rubber gasket seals.',
    toolsRequired: ['T8 Security Torx', 'Microfiber Cloth'],
    partsRequired: [
      { id: 'dyson-v15-hepa-filter', name: 'Dyson V15 Post-Motor HEPA Filter', price: 24.99 },
    ],
    steps: [
      {
        title: 'Twist Counter-Clockwise to Unseat Filter',
        desc: 'Rotate the purple post-motor filter dome counter-clockwise to release it from the motor housing.',
      },
      {
        title: 'Wash Under Cold Tap Water & Dry 24 Hours',
        desc: 'Rinse filter under cold water without soap until water runs clear. Allow 24 hours of drying before reinstalling.',
      },
    ],
  },
  {
    id: 'guide-dji-mavic-3-arm',
    title: 'DJI Mavic 3 Drone Front Left Motor Arm Replacement',
    brand: 'DJI',
    category: 'Drones',
    difficulty: 'Master',
    duration: '50 Mins',
    stepsCount: 3,
    description: 'Replace cracked carbon-composite motor arm flex joint and solder ESC motor power leads.',
    toolsRequired: ['Hex 1.5mm', 'T4 Torx', 'Soldering Station'],
    partsRequired: [
      { id: 'dji-mavic-3-arm', name: 'DJI Mavic 3 Front Left Arm + Brushless Motor Assembly', price: 89.99 },
    ],
    steps: [
      {
        title: 'Remove Top Shell & Gimbal Shield',
        desc: 'Unscrew the Hex 1.5mm casing screws to pop the upper composite canopy.',
      },
      {
        title: 'Unseat Hinge Pin & Desolder ESC Wires',
        desc: 'Drive out the stainless hinge pin and desolder 3 brushless motor phase wires from the main ESC board.',
      },
      {
        title: 'Install Replacement Arm & Run Flight Sensor Calibration',
        desc: 'Seat new arm, solder motor leads with heat shrink, reassemble shell, and run DJI Fly IMU calibration.',
      },
    ],
  },
  {
    id: 'guide-samsung-s24-battery',
    title: 'Samsung Galaxy S24 Ultra Battery & Vapor Chamber Pad Swap',
    brand: 'Samsung',
    category: 'Smartphones',
    difficulty: 'Intermediate',
    duration: '40 Mins',
    stepsCount: 3,
    description: 'Replace degraded 5000mAh battery cell and apply graphite thermal pad over the vapor chamber.',
    toolsRequired: ['Suction Handle', 'Plastic Opener Pick', 'Phillips #00'],
    partsRequired: [
      { id: 'samsung-s24-battery', name: 'Galaxy S24 Ultra 5000mAh OEM Battery Cell', price: 44.99 },
    ],
    steps: [
      {
        title: 'Heat Rear Glass Back Cover to 75°C',
        desc: 'Warm rear glass panel to soften adhesive seal before slicing with plastic pick around camera rings.',
      },
      {
        title: 'Unscrew Wireless Charging Coil & Disconnect Battery',
        desc: 'Remove 12 Phillips screws securing midframe assembly and unplug battery press connector.',
      },
      {
        title: 'Pull Alcohol Adhesive Release Film',
        desc: 'Apply 3 drops of isopropyl alcohol along battery edge to dissolve adhesive and lift out old battery cell.',
      },
    ],
  },
];

export default function DIYGuidesPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBrand, setSelectedBrand] = useState('All Brands');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [selectedDifficulty, setSelectedDifficulty] = useState('All Difficulties');
  const [activeStepGuide, setActiveStepGuide] = useState<GuideItem | null>(null);

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedBrand('All Brands');
    setSelectedCategory('All Categories');
    setSelectedDifficulty('All Difficulties');
  };

  const filteredGuides = allGuides.filter((guide) => {
    const matchesSearch =
      searchQuery === '' ||
      guide.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      guide.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      guide.brand.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesBrand = selectedBrand === 'All Brands' || guide.brand === selectedBrand;
    const matchesCategory = selectedCategory === 'All Categories' || guide.category === selectedCategory;
    const matchesDifficulty = selectedDifficulty === 'All Difficulties' || guide.difficulty === selectedDifficulty;

    return matchesSearch && matchesBrand && matchesCategory && matchesDifficulty;
  });

  return (
    <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header Info */}
      <div className="space-y-4 mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-cyan/10 border border-brand-cyan/30 text-cyan-500 dark:text-cyan-400 text-xs font-semibold uppercase tracking-wider">
          <BookOpen className="w-3.5 h-3.5" /> Interactive Fix Catalog
        </div>
        <h1 className="text-3xl sm:text-5xl font-display font-extrabold dark:text-white text-slate-900 tracking-tight">
          Step-by-Step <span className="text-gradient-cyan">DIY Repair Guides</span>
        </h1>
        <p className="dark:text-slate-300 text-slate-700 text-base max-w-2xl leading-relaxed font-medium">
          Filter verified self-repair guides across smartphones, laptops, consoles, appliances, and drones. Each guide includes torque specs, tool checklists, and 1-click bundle checkout.
        </p>
      </div>

      {/* Multi-Faceted Live Search & Filter Bar */}
      <GuideFilterBar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedBrand={selectedBrand}
        setSelectedBrand={setSelectedBrand}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        selectedDifficulty={selectedDifficulty}
        setSelectedDifficulty={setSelectedDifficulty}
        onReset={resetFilters}
      />

      {/* Results Count Banner */}
      <div className="flex items-center justify-between mb-6 text-xs font-mono dark:text-slate-400 text-slate-600 font-medium">
        <span>Showing {filteredGuides.length} of {allGuides.length} Verified DIY Guides</span>
        {(selectedBrand !== 'All Brands' || selectedCategory !== 'All Categories' || selectedDifficulty !== 'All Difficulties') && (
          <span className="text-brand-orange font-bold">Filters Applied</span>
        )}
      </div>

      {/* Guides Grid */}
      {filteredGuides.length === 0 ? (
        <GlassCard variant="default" className="p-12 text-center space-y-4 max-w-md mx-auto my-12">
          <div className="w-14 h-14 rounded-full dark:bg-white/5 bg-slate-100 border dark:border-white/10 border-slate-300 flex items-center justify-center mx-auto text-slate-400">
            <SearchX className="w-7 h-7" />
          </div>
          <h3 className="text-lg font-bold dark:text-white text-slate-900">No Matching Guides Found</h3>
          <p className="text-xs dark:text-slate-400 text-slate-600">
            Try resetting your brand, category, or search filters to find available DIY repair guides.
          </p>
          <button
            onClick={resetFilters}
            className="px-4 py-2 rounded-xl bg-brand-orange text-white text-xs font-semibold hover:bg-brand-orange/80 transition-colors"
          >
            Reset All Filters
          </button>
        </GlassCard>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredGuides.map((guide) => (
            <GuideCard
              key={guide.id}
              guide={guide}
              onOpenStepViewer={(g) => setActiveStepGuide(g)}
            />
          ))}
        </div>
      )}

      {/* Interactive Step Viewer Drawer Modal */}
      <InteractiveStepViewer
        guide={activeStepGuide}
        onClose={() => setActiveStepGuide(null)}
      />
    </main>
  );
}
