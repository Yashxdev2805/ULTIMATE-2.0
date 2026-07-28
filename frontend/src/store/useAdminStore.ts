import { create } from 'zustand';

export interface Technician {
  id: string;
  name: string;
  phone: string;
  email: string;
  status: 'Available' | 'On Site' | 'Off Duty';
  specialty: string;
  rating: number;
  jobsCompleted: number;
  activeJobId?: string;
}

export interface InventoryItem {
  id: string;
  name: string;
  category: string;
  sku: string;
  stockCount: number;
  minStockThreshold: number;
  price: number;
  type: 'part' | 'tool';
}

interface AdminStore {
  technicians: Technician[];
  inventory: InventoryItem[];
  updateStock: (id: string, newCount: number) => void;
  updateTechStatus: (id: string, status: Technician['status']) => void;
}

const INITIAL_TECHNICIANS: Technician[] = [
  {
    id: 'tech-1',
    name: 'Marcus Vance',
    phone: '+1 (555) 987-6543',
    email: 'marcus.v@thinkkaro.com',
    status: 'On Site',
    specialty: 'OLED Displays & Soldering',
    rating: 4.9,
    jobsCompleted: 142,
    activeJobId: 'TK-849201',
  },
  {
    id: 'tech-2',
    name: 'Sarah Chen',
    phone: '+1 (555) 456-7890',
    email: 'sarah.c@thinkkaro.com',
    status: 'Available',
    specialty: 'Logic Board Micro-soldering',
    rating: 5.0,
    jobsCompleted: 98,
  },
  {
    id: 'tech-3',
    name: 'David Miller',
    phone: '+1 (555) 890-1234',
    email: 'david.m@thinkkaro.com',
    status: 'Available',
    specialty: 'Battery & Charging Ports',
    rating: 4.8,
    jobsCompleted: 210,
  },
  {
    id: 'tech-4',
    name: 'Elena Rostova',
    phone: '+1 (555) 234-5678',
    email: 'elena.r@thinkkaro.com',
    status: 'Off Duty',
    specialty: 'Camera & Sensor Array',
    rating: 4.9,
    jobsCompleted: 76,
  },
];

const INITIAL_INVENTORY: InventoryItem[] = [
  {
    id: 'part-1',
    name: 'iPhone 15 Pro Super Retina XDR OLED Display',
    category: 'Displays & Screens',
    sku: 'DISP-IP15P-OLED',
    stockCount: 14,
    minStockThreshold: 5,
    price: 249.99,
    type: 'part',
  },
  {
    id: 'part-2',
    name: 'Galaxy S24 Ultra Dynamic AMOLED 2X Screen Assembly',
    category: 'Displays & Screens',
    sku: 'DISP-S24U-AMOLED',
    stockCount: 3, // Low stock alert
    minStockThreshold: 5,
    price: 279.99,
    type: 'part',
  },
  {
    id: 'part-3',
    name: 'iPhone 15 Pro OEM High-Capacity Battery Pack',
    category: 'Batteries & Charging',
    sku: 'BATT-IP15P-OEM',
    stockCount: 22,
    minStockThreshold: 8,
    price: 129.99,
    type: 'part',
  },
  {
    id: 'tool-1',
    name: 'Thinkkaro Pro Electronics 64-Bit Screwdriver Kit',
    category: 'Screwdriver Sets',
    sku: 'TOOL-DRV-64',
    stockCount: 45,
    minStockThreshold: 10,
    price: 34.99,
    type: 'tool',
  },
  {
    id: 'tool-2',
    name: '800W Digital SMD Hot Air Rework Soldering Station',
    category: 'Soldering & Micro-Tools',
    sku: 'TOOL-SOLD-800W',
    stockCount: 2, // Low stock alert
    minStockThreshold: 5,
    price: 189.99,
    type: 'tool',
  },
];

export const useAdminStore = create<AdminStore>((set) => ({
  technicians: INITIAL_TECHNICIANS,
  inventory: INITIAL_INVENTORY,

  updateStock: (id, newCount) => {
    set((state) => ({
      inventory: state.inventory.map((item) =>
        item.id === id ? { ...item, stockCount: Math.max(0, newCount) } : item
      ),
    }));
  },

  updateTechStatus: (id, status) => {
    set((state) => ({
      technicians: state.technicians.map((t) =>
        t.id === id ? { ...t, status } : t
      ),
    }));
  },
}));
