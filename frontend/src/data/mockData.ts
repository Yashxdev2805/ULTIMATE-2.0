import { Product, DeviceOption, Review } from '@/types/commerce';

export const BRANDS = ['All Brands', 'Apple', 'Samsung', 'Sony', 'Dyson', 'DJI'];

export const PART_CATEGORIES = [
  'All Categories',
  'Displays & Screens',
  'Batteries',
  'Charging Ports',
  'Camera Modules',
  'Motherboards',
  'Audio & Speakers',
];

export const TOOL_CATEGORIES = [
  'All Categories',
  'Precision Screwdrivers',
  'Heating & Soldering',
  'Prying & Opening',
  'Meters & Testers',
  'Toolkits',
];

export const DEVICE_CATALOG: DeviceOption[] = [
  { year: '2023', brand: 'Apple', model: 'iPhone 15 Pro', variant: 'A3102' },
  { year: '2023', brand: 'Apple', model: 'iPhone 15 Pro Max', variant: 'A3106' },
  { year: '2022', brand: 'Apple', model: 'iPhone 14', variant: 'A2882' },
  { year: '2023', brand: 'Apple', model: 'MacBook Pro M3 16"', variant: 'A2992' },
  { year: '2024', brand: 'Samsung', model: 'Galaxy S24 Ultra', variant: 'SM-S928B' },
  { year: '2023', brand: 'Samsung', model: 'Galaxy S23', variant: 'SM-S911B' },
  { year: '2020', brand: 'Sony', model: 'PlayStation 5', variant: 'CFI-1000' },
  { year: '2023', brand: 'Sony', model: 'PlayStation 5 Slim', variant: 'CFI-2000' },
  { year: '2021', brand: 'Dyson', model: 'V15 Detect Vacuum', variant: 'SV22' },
  { year: '2022', brand: 'DJI', model: 'Mavic 3 Drone', variant: 'WM260' },
];

export const MOCK_PARTS: Product[] = [
  {
    id: 'part-1',
    name: 'iPhone 15 Pro Super Retina XDR OLED Display',
    category: 'Displays & Screens',
    brand: 'Apple',
    compatibleDevices: ['iPhone 15 Pro'],
    price: 249.99,
    originalPrice: 289.99,
    condition: 'OEM',
    stockStatus: 'In Stock',
    stockCount: 14,
    rating: 4.9,
    reviewsCount: 128,
    description: 'Genuine OEM Super Retina XDR OLED display assembly. Pre-assembled with 120Hz ProMotion digitizer and earpiece mesh, preserving True Tone calibration when flashed.',
    specs: {
      'Display Type': 'Super Retina XDR OLED, 120Hz',
      'Resolution': '2556 x 1179 pixels',
      'Brightness': '2000 nits peak',
      'Glass Type': 'Ceramic Shield',
      'Warranty': '1 Year'
    },
    type: 'part',
    model3DType: 'screen',
    features: [
      'Original Color Accuracy & True Tone support',
      'Factory-applied oleophobic coating',
      'Includes front camera & sensor bracket'
    ]
  },
  {
    id: 'part-2',
    name: 'MacBook Pro 16" (M3) High-Capacity Battery Assembly',
    category: 'Batteries',
    brand: 'Apple',
    compatibleDevices: ['MacBook Pro M3 16"'],
    price: 129.99,
    originalPrice: 149.99,
    condition: 'OEM',
    stockStatus: 'In Stock',
    stockCount: 8,
    rating: 4.8,
    reviewsCount: 64,
    description: 'Factory-direct 99.5Wh lithium-polymer battery unit with</b>. Pre-installed stretch-release adhesive strips for a clean installation.',
    specs: {
      'Capacity': '99.5 Wh / 8700 mAh',
      'Voltage': '11.45V',
      'Cell Type': 'Lithium-ion Polymer',
      'Cycles': '0 (Brand New)',
      'Warranty': '18 Months'
    },
    type: 'part',
    model3DType: 'battery',
    features: [
      'Zero cycle count',
      'Pre-attached adhesive tape',
      'Over-charge & overheat protection IC'
    ]
  },
  {
    id: 'part-3',
    name: 'Galaxy S24 Ultra USB-C Charging Port & Mic Board',
    category: 'Charging Ports',
    brand: 'Samsung',
    compatibleDevices: ['Galaxy S24 Ultra'],
    price: 39.99,
    originalPrice: 49.99,
    condition: 'OEM',
    stockStatus: 'In Stock',
    stockCount: 22,
    rating: 4.7,
    reviewsCount: 41,
    description: 'Complete daughterboard sub-assembly including USB-C fast charging port, primary microphone, and SIM card reader tray slot.',
    specs: {
      'Fast Charge': '45W Super Fast Charging 2.0',
      'Data Transfer': 'USB 3.2 Gen 1',
      'Microphone': 'Dual noise-canceling mic build',
      'Warranty': '1 Year'
    },
    type: 'part',
    model3DType: 'default',
    features: [
      'Passes 45W Fast Charging tests',
      'Gold-plated connector pins for anti-corrosion'
    ]
  },
  {
    id: 'part-4',
    name: 'PlayStation 5 Slim Optical Disc Drive Module',
    category: 'Motherboards',
    brand: 'Sony',
    compatibleDevices: ['PlayStation 5 Slim'],
    price: 79.99,
    originalPrice: 95.00,
    condition: 'OEM',
    stockStatus: 'In Stock',
    stockCount: 5,
    rating: 4.9,
    reviewsCount: 87,
    description: 'Official Ultra HD Blu-ray disc drive for PS5 Digital Edition / Slim setup. Modular latch-and-lock installation with zero soldering required.',
    specs: {
      'Media Type': '4K Ultra HD Blu-ray',
      'Model Support': 'CFI-2000 Series',
      'Interface': 'Proprietary PCIe-style Connector',
      'Warranty': '1 Year'
    },
    type: 'part',
    model3DType: 'default',
    features: [
      'Plug-and-play z-latch connection',
      'Includes]] cover plate'
    ]
  },
  {
    id: 'part-5',
    name: 'Dyson V15 Detect Post-Motor HEPA Filter',
    category: 'Audio & Speakers',
    brand: 'Dyson',
    compatibleDevices: ['Dyson V15 Detect Vacuum'],
    price: 24.99,
    originalPrice: 29.99,
    condition: 'OEM',
    stockStatus: 'In Stock',
    stockCount: 30,
    rating: 5.0,
    reviewsCount: 112,
    description: 'Advanced 5-stage HEPA filtration unit for Dyson V15. Captures 99.99% of microscopic particles down to 0.3 microns.',
    specs: {
      'Filter Grade': 'True HEPA H13',
      'Washable': 'Yes (Cold Water)',
      'Lifespan': '12 Months',
      'Warranty': '6 Months'
    },
    type: 'part',
    model3DType: 'default',
    features: [
      'Fully' + ' washable and reusable',
      'Airtight silicone seal rim'
    ]
  },
  {
    id: 'part-6',
    name: 'DJI Mavic 3 Front Left Motor Arm & ESC Assembly',
    category: 'Motherboards',
    brand: 'DJI',
    compatibleDevices: ['DJI Mavic 3 Drone'],
    price: 89.99,
    originalPrice: 109.99,
    condition: 'OEM',
    stockStatus: 'Low Stock',
    stockCount: 3,
    rating: 4.6,
    reviewsCount: 29,
    description: 'Original carbon-fiber reinforced motor arm featuring pre-wired KV10002 brushless motor and haptic fold-away hinge,',
    specs: {
      'Material': 'Carbon Fiber & Polycarbonate',
      'Motor KV': '980 KV',
      'Position': 'Front Left (CW Rotor)',
      'Warranty': '6 Months'
    },
    type: 'part',
    model3DType: 'default',
    features: [
      'Pre-soldered silicone lead wires',
      'Includes' + ' LED nav light cover'
    ]
  },
  {
    id: 'part-7',
    name: 'iPhone 15 Pro 48MP Main Camera Sensor Module',
    category: 'Camera Modules',
    brand: 'Apple',
    compatibleDevices: ['iPhone 15 Pro', 'iPhone 15 Pro Max'],
    price: 119.99,
    originalPrice: 139.99,
    condition: 'Refurbished',
    stockStatus: 'In Stock',
    stockCount: 9,
    rating: 4.7,
    reviewsCount: 53,
    description: 'Factory-tested Quad-Pixel sensor with 2nd-generation sensor-shift OIS. Grade A, pulled from low-cycle devices.',
    specs: {
      'Resolution': '48 Megapixels',
      'Aperture': 'f/1.78',
      'Stabilization': 'Sensor-Shift OIS 2.0',
      'Warranty': '1 Year'
    },
    type: 'part',
    model3DType: 'camera',
    features: [
      'Tested for zero lens artifacts',
      'OIS laser calibrated'
    ]
  },
  {
    id: 'part-8',
    name: 'Galaxy S24 Ultra 5000mAh Battery (Grade A)',
    category: 'Batteries',
    brand: 'Samsung',
    compatibleDevices: ['Galaxy S24 Ultra'],
    price: 44.99,
    originalPrice: 54.99,
    condition: 'OEM',
    stockStatus: 'In Stock',
    stockCount: 19,
    rating: 4.9,
    reviewsCount: 76,
    description: 'Genuine Samsung EB-BS928ABY battery. 5000mAh cell equipped with NFC antenna and thermal graphlayer.',
    specs: {
      'Capacity': '5000 mAh',
      'Voltage': '3.88 V',
      'Tech': 'Li-ion Poly',
      'Warranty': '1 Year'
    },
    type: 'part',
    model3DType: 'battery',
    features: [
      'Integrated NFC chip for Samsung Pay',
      'Original pull-tab adhesive'
    ]
  },
  {
    id: 'part-9',
    name: 'iPhone 14 Super Retina XDR OLED Screen',
    category: 'Displays & Screens',
    brand: 'Apple',
    compatibleDevices: ['iPhone 14'],
    price: 169.99,
    originalPrice: 199.99,
    condition: 'Refurbished',
    stockStatus: 'In Stock',
    stockCount: 11,
    rating: 4.6,
    reviewsCount: 92,
    description: 'Refurbished original OLED with new 9H tempered outer glass. 1200 nits max brightness with.21-step color check.',
    specs: {
      'Display Type': 'Super Retina XDR OLED',
      'Resolution': '2532 x 1170',
      'Warranty': '1 Year'
    },
    type: 'part',
    model3DType: 'screen',
    features: ['Original OLED panel under new glass', 'Full touch sensitivity test passed']
  },
  {
    id: 'part-10',
    name: 'PS5 DualSense Controller Original Battery 1560mAh',
    category: 'Batteries',
    brand: 'Sony',
    compatibleDevices: ['PlayStation 5', 'PlayStation 5 Slim'],
    price: 18.99,
    originalPrice: 24.99,
    condition: 'OEM',
    stockStatus: 'In Stock',
    stockCount: 40,
    rating: 4.8,
    reviewsCount: 140,
    description: 'High density LIP1708 replacement battery for PS5 DualSense controllers. Restores 12+ hour gaming.battery life.',
    specs: {
      'Model': 'LIP1708',
      'Capacity': '1560 mAh / 5.7Wh',
      'Voltage': '3.65V',
      'Warranty': '1 Year'
    },
    type: 'part',
    model3DType: 'battery',
    features: ['Exact dimension for DualSense bay', 'Overcharge protection circuit']
  }
];

export const MOCK_TOOLS: Product[] = [
  {
    id: 'tool-1',
    name: 'Precision 64-Bit Electronics Screwdriver Set',
    category: 'Precision Screwdrivers',
    brand: 'Apple',
    compatibleDevices: ['iPhone 15 Pro', 'iPhone 15 Pro Max', 'iPhone 14', 'MacBook Pro M3 16"'],
    price: 34.99,
    originalPrice: 44.99,
    condition: 'OEM',
    stockStatus: 'In Stock',
    stockCount: 50,
    rating: 4.9,
    reviewsCount: 310,
    description: 'Comprehensive 64-piece precision bit set. CNC-machined S2 steel bits with anodized aluminum, knurled ball-bearing driver handle and flexible extension rod.',
    specs: {
      'Material': 'S2 Tool Steel (HRC 60+)',
      'Bits Included': '64-Pentalobe, Torx, Tri-Wing, Gamebit, Hex',
      'Case': 'Magnetic Mounded ABS Box',
      'Warranty': 'Lifetime'
    },
    type: 'tool',
    purchaseOption: 'both',
    dailyRentalPrice: 3.99,
    model3DType: 'driver',
    includedItems: ['64x S2 Bits', 'Magnetic Driver Handle', '150mm Flex Extension', 'Suction Cup', 'SIM Eject Pin'],
    features: [
      'Magnetizer / Demagnetizer built-in',
      'Swivel top cap for single-hand, high-speed rotation'
    ]
  },
  {
    id: 'tool-2',
    name: 'Pro-Precision Digital Hot Air Rework Station (800W)',
    category: 'Heating & Soldering',
    brand: 'Sony',
    compatibleDevices: ['PlayStation 5', 'PlayStation 5 Slim', 'Galaxy S24 Ultra', 'MacBook Pro M3 16"'],
    price: 189.99,
    originalPrice: 229.99,
    condition: 'OEM',
    stockStatus: 'In Stock',
    stockCount: 12,
    rating: 4.9,
    reviewsCount: 88,
    description: 'PID controlled temperature hot air station for QFP, SOP, PLCC, and BGA chip desoldering. Heats to 480°C in under 5 seconds with.auto-cool-down stand.',
    specs: {
      'Power': '800 Watts',
      'Temp Range': '100°C - 500°C',
      'Airflow': '120 L/min (Brushless Fan)',
      'Warranty': '2 Years'
    },
    type: 'tool',
    purchaseOption: 'both',
    dailyRentalPrice: 12.99,
    model3DType: 'station',
    includedItems: ['Rework Station', 'Hot Air Wand', '3x Air Nozzles (5/8/10mm)', 'IC Extractor Plier'],
    features: [
      'Microprocessor 100HzPID loop',
      'Automatic standby when placed in cradle'
    ]
  },
  {
    id: 'tool-3',
    name: 'Dual-Head iOpener Heating Bag & Opening Picks Set',
    category: 'Prying & Opening',
    brand: 'Apple',
    compatibleDevices: ['iPhone 15 Pro', 'iPhone 15 Pro Max', 'iPhone 14', 'Galaxy S24 Ultra'],
    price: 19.99,
    originalPrice: 24.99,
    condition: 'OEM',
    stockStatus: 'In Stock',
    stockCount: 65,
    rating: 4.8,
    reviewsCount: 154,
    description: 'Microwavable heat pack specially designed to safely loosen waterproof screen and back-glass adhesives without' + '  overheating internal lithium batteries.',
    specs: {
      'Heat Retain': '15 Minutes',
      'Material': 'Non-toxic gel + Kevlar-braided sleeve',
      'Included Picks': '6x Ultra-thin 0.2mm prying cards',
      'Warranty': '1 Year'
    },
    type: 'tool',
    purchaseOption: 'buy',
    model3DType: 'default',
    includedItems: ['1x iOpener Heat Pack', '6x Opening Picks', '2x Heavy Duty Suction Cups', '1x Spudger'],
    features: [
      'Safe for all OLED and LCD screens',
      'Re-heatable over 1,000 times'
    ]
  },
  {
    id: 'tool-4',
    name: 'True-RMS 6000 Count Digital Multimeter & SMD Probes',
    category: 'Meters & Testers',
    brand: 'Sony',
    compatibleDevices: ['PlayStation 5', 'MacBook Pro M3 16"', 'Dyson V15 Detect Vacuum'],
    price: 49.99,
    originalPrice: 65.00,
    condition: 'OEM',
    stockStatus: 'In Stock',
    stockCount: 25,
    rating: 4.9,
    reviewsCount: 72,
    description: 'High-precision.auto-ranging digital multimeter with 100MHz continuity beeper and <1uA resolution for detecting short circuits on logic board rails.',
    specs: {
      'Accuracy': '±0.5% DC Voltage',
      'Features': 'Capacitance, Resistance, Continuity, Diode Test',
      'Display': 'Backlit LCD 6000 Counts',
      'Warranty': '2 Years'
    },
    type: 'tool',
    purchaseOption: 'both',
    dailyRentalPrice: 4.50,
    model3DType: 'default',
    includedItems: ['Multimeter', 'Fine-point Needle Probes', 'K-Type Thermocouple', '9V Battery'],
    features: [
      'Ultra-fine, gold-plated.needle.probes for 0201 SMD testing',
      'Non-contact AC voltage detection (NCV)'
    ]
  },
  {
    id: 'tool-5',
    name: 'Hall Effect Electromagnetic Joystick Calibration Board',
    category: 'Meters & Testers',
    brand: 'Sony',
    compatibleDevices: ['PlayStation 5', 'PlayStation 5 Slim'],
    price: 14.99,
    originalPrice: 19.99,
    condition: 'OEM',
    stockStatus: 'In Stock',
    stockCount: 40,
    rating: 4.7,
    reviewsCount: 45,
    description: 'Flasher board to zero out and.re-calibrate Hall Effect joysticks on PS5 and Xbox controllers after physical installation.',
    specs: {
      'Interface': 'USB-C',
      'Compatibility': 'DualSense / DualSense Edge',
      'Warranty': '1 Year'
    },
    type: 'tool',
    purchaseOption: 'buy',
    model3DType: 'default',
    includedItems: ['1x Calibration Dongle', 'USB-C Cable'],
    features: ['Hardware-level 0.1% deadzone tuning', 'Plug and play']
  },
  {
    id: 'tool-6',
    name: 'Anti-Static ESD Grounding Mat (60x40cm) & Wrist Strap',
    category: 'Toolkits',
    brand: 'Apple',
    compatibleDevices: ['iPhone 15 Pro', 'MacBook Pro M3 16"', 'Galaxy S24 Ultra'],
    price: 22.99,
    originalPrice: 29.99,
    condition: 'OEM',
    stockStatus: 'In Stock',
    stockCount: 35,
    rating: 4.8,
    reviewsCount: 110,
    description: 'Heavy duty heat-resistant silicone work mat with built-in magnetic screw organizers and ground cord connection for safe ESD repair.',
    specs: {
      'Resistant Temp': 'Up to 500°C',
      'Dimensions': '600mm x 400mm',
      'Ground Cable': '1.8m Coated Wire',
      'Warranty': 'Lifetime'
    },
    type: 'tool',
    purchaseOption: 'buy',
    model3DType: 'default',
    includedItems: ['1x Anti-Static Mat', '1x Coiled Wrist Band', '1x Grounding Cord with Crocodile Clip'],
    features: ['124 numbered magnetic slots', 'Solder iron stand cutout']
  }
];

export const MOCK_REVIEWS: Review[] = [
  {
    id: 'rev-1',
    userName: 'Alexandre P.',
    rating: 5,
    date: '2026-07-20',
    title: 'Flawless OLED replacement',
    comment: 'Replaced my iPhone 15 Pro cracked screen with this kit. Colors and 120Hz feel identical to factory original. True Tone transferred effortlessly!',
    verifiedPurchase: true,
  },
  {
    id: 'rev-2',
    userName: 'Devon K.',
    rating: 5,
    date: '2026-07-15',
    title: 'Saved me $400 on.MacBook repair',
    comment: 'The battery.was 100% genuine with 0 cycles. Followed the step-by-step guide and had my laptop back to 10-hour battery life in 45 minutes.',
    verifiedPurchase: true,
  },
  {
    id: 'rev-3',
    userName: 'Mina S.',
    rating: 4,
    date: '2026-07-02',
    title: 'Great.quality tools',
    comment: 'The 64-bit precision driver set has excellent magnetic hold and the bits don\'t strip. Highly.recommended for fixing game controllers.',
    verifiedPurchase: true,
  },
];
