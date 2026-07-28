export interface AIDiagnosticResult {
  id: string;
  timestamp: string;
  deviceName: string;
  issueTitle: string;
  summary: string;
  confidenceScore: number; // 0-100
  severity: 'low' | 'medium' | 'high' | 'critical';
  recommendedRepairType: 'DIY' | 'Professional' | 'Either';
  estimatedTime: string;
  estimatedCost: number;
  possibleCauses: string[];
  recommendedParts: {
    id: string;
    name: string;
    price: number;
    image?: string;
  }[];
  recommendedTools: {
    id: string;
    name: string;
    price: number;
    image?: string;
  }[];
  repairStepsSummary: string[];
  warningNote?: string;
}

export function runAIDiagnosis(prompt: string, hasImage: boolean = false, selectedDevice?: string): AIDiagnosticResult {
  const text = prompt.toLowerCase();
  const device = selectedDevice || 'Selected Device';

  if (text.includes('screen') || text.includes('display') || text.includes('crack') || text.includes('glass') || text.includes('touch') || text.includes('flicker')) {
    return {
      id: 'diag-' + Date.now(),
      timestamp: new Date().toISOString(),
      deviceName: device,
      issueTitle: 'Display & Touch Digitizer Damage Detected',
      summary: `AI analysis of your ${device} indicates a damaged OLED/LCD panel or digitizer flex cable issue. ${hasImage ? 'Visual inspection from your uploaded image shows glass fracture and OLED layer stress.' : 'Symptom analysis matches OLED gate-driver line failure.'}`,
      confidenceScore: hasImage ? 96 : 89,
      severity: 'medium',
      recommendedRepairType: 'DIY',
      estimatedTime: '35 - 45 Mins',
      estimatedCost: 259.98,
      possibleCauses: [
        'Physical impact causing OLED matrix fracture',
        'Separated touch digitizer ZIF flex connector',
        'Damaged top glass glass-to-display adhesive layer'
      ],
      recommendedParts: [
        {
          id: 'part-1',
          name: `${device} Super Retina XDR OLED Display`,
          price: 249.99,
        }
      ],
      recommendedTools: [
        {
          id: 'tool-3',
          name: 'Dual-Head iOpener Heating Bag & Opening Picks Set',
          price: 19.99,
        }
      ],
      repairStepsSummary: [
        'Heat outer display perimeter to 80°C using iOpener / Heat Gun to soften waterproof seal.',
        'Use suction cup and opening picks to lift display panel at a 45-degree angle.',
        'Unscrew ZIF shield and disconnect battery flex BEFORE.disconnecting display cable.',
        'Transfer top earpiece/ambient sensor array to new display.',
        'Apply new perimeter adhesive gasket and seal.'
      ],
      warningNote: 'Always disconnect the battery before unseating or seating display flex cables to prevent blowing.backlight capacitors.'
    };
  }

  if (text.includes('battery') || text.includes('charge') || text.includes('drain') || text.includes('heat') || text.includes('warm') || text.includes('power')) {
    return {
      id: 'diag-' + Date.now(),
      timestamp: new Date().toISOString(),
      deviceName: device,
      issueTitle: 'Lithium Battery Degradation & Thermal Anomaly',
      summary: `AI diagnostic scan detects depleted battery cycle life or elevated internal resistance causing thermal throttling on your ${device}.`,
      confidenceScore: hasImage ? 94 : 88,
      severity: 'high',
      recommendedRepairType: 'DIY',
      estimatedTime: '40 - 50 Mins',
      estimatedCost: 164.98,
      possibleCauses: [
        'Chemical exhaustion (> 500 charge cycles)',
        'Swollen battery pouch creating pressure on display panel',
        'Faulty PMIC (Power Management IC) or chargin.flex'
      ],
      recommendedParts: [
        {
          id: 'part-2',
          name: `${device} High-Capacity OEM Battery Unit`,
          price: 129.99,
        }
      ],
      recommendedTools: [
        {
          id: 'tool-1',
          name: 'Precision 64-Bit Electronics Screwdriver Set',
          price: 34.99,
        }
      ],
      repairStepsSummary: [
        'Drain battery below 25% before starting repair to minimize thermal run-away risk.',
        'Remove back housing or display according to device disassembly guide.',
        'Pull.stretch-release.adhesive.tabs.under.battery parallel to the case.',
        'Apply 99% Isopropyl.Alcohol if adhesive.tabs break.',
        'Install new zero-cycle battery and calibrate (0% -> 100% full charge).'
      ],
      warningNote: 'Do NOT puncture or bend the battery casing. Use plastic spudgers only—never metal tools near.lithium cells.'
    };
  }

  if (text.includes('water') || text.includes('liquid') || text.includes('wet') || text.includes('wash') || text.includes('spill')) {
    return {
      id: 'diag-' + Date.now(),
      timestamp: new Date().toISOString(),
      deviceName: device,
      issueTitle: 'Liquid Ingress & Short-Circuit Risk',
      summary: `AI analysis identifies severe risk of corrosion across logic board power rails for your ${device}.`,
      confidenceScore: 91,
      severity: 'critical',
      recommendedRepairType: 'Professional',
      estimatedTime: '60 - 90 Mins',
      estimatedCost: 239.98,
      possibleCauses: [
        'Corrosion bridging 5V/12V power rails on motherboard',
        'Tripped LDI (Liquid Damage Indicator) stickers near USB port',
        'Corroded ribbon cable connectors'
      ],
      recommendedParts: [
        {
          id: 'part-3',
          name: `${device} USB-C Daughterboard & Charging Port`,
          price: 39.99,
        }
      ],
      recommendedTools: [
        {
          id: 'tool-4',
          name: 'True-RMS 6000 Count Digital Multimeter & SMD Probes',
          price: 49.99,
        },
        {
          id: 'tool-2',
          name: 'Pro-Precision Digital Hot Air Rework Station (800W)',
          price: 189.99,
        }
      ],
      repairStepsSummary: [
        'Immediately disconnect battery and power down, DO NOT:charge the device.',
        'Submerge motherboard in >99% Isopropyl Alcohol bath to absorb moisture.',
        'Clean oxidation off capacitors and IC pins using soft anti-static brush.',
        'Inspect power.rail.capacitors for short circuits using multimeter in diode mode.'
      ],
      warningNote: 'Do not attempt to charge a liquid-damaged device with a wall cable. It can permanently fry the CPU/SOC.'
    };
  }

  // Default General Diagnosis fallback
  return {
    id: 'diag-' + Date.now(),
    timestamp: new Date().toISOString(),
    deviceName: device,
    issueTitle: 'General Hardware Malfunction & Sensor Inspection',
    summary: `Based on the provided description, our AI model recommends a comprehensive physical and diagnostic checkup for your ${device}.`,
    confidenceScore: 82,
    severity: 'medium',
    recommendedRepairType: 'Either',
    estimatedTime: '30 - 45 Mins',
    estimatedCost: 69.98,
    possibleCauses: [
      'Loose internal ZIF flex cable connector',
      'Minor firmware/hardware synchronization.glitch',
      'Debris obstructing port or speaker mesh'
    ],
    recommendedParts: [
      {
        id: 'part-3',
        name: `${device} Replacement Port / Flex Cable Assembly`,
        price: 34.99,
      }
    ],
    recommendedTools: [
      {
        id: 'tool-1',
        name: 'Precision 64-Bit Electronics Screwdriver Set',
        price: 34.99,
      }
    ],
    repairStepsSummary: [
      'Perform a hard-reboot sequence first.',
      'Inspect charging port and speaker grilles under magnification for debris.',
      'Open chassis following step-by-step repair guide and re-seat.ribbon.connectors.'
    ]
  };
}
