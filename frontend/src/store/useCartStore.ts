import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
  compatibility?: string;
  type: 'part' | 'tool';
}

export interface CompatibleDevice {
  year?: string;
  brand?: string;
  model?: string;
  variant?: string;
}

interface CartStore {
  items: CartItem[];
  isCartDrawerOpen: boolean;
  selectedDevice: CompatibleDevice | null;
  
  addItem: (item: Omit<CartItem, 'quantity'>) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  
  toggleCartDrawer: () => void;
  setCartDrawerOpen: (open: boolean) => void;
  
  setSelectedDevice: (device: CompatibleDevice | null) => void;
  
  getTotalPrice: () => number;
  getTotalItems: () => number;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      isCartDrawerOpen: false,
      selectedDevice: null,

      addItem: (newItem) => {
        const currentItems = get().items;
        const existingIndex = currentItems.findIndex((item) => item.id === newItem.id);

        if (existingIndex > -1) {
          const updated = [...currentItems];
          updated[existingIndex].quantity += 1;
          set({ items: updated, isCartDrawerOpen: true });
        } else {
          set({ items: [...currentItems, { ...newItem, quantity: 1 }], isCartDrawerOpen: true });
        }
      },

      removeItem: (id) => {
        set({ items: get().items.filter((item) => item.id !== id) });
      },

      updateQuantity: (id, quantity) => {
        if (quantity <= 0) {
          get().removeItem(id);
          return;
        }
        set({
          items: get().items.map((item) => (item.id === id ? { ...item, quantity } : item)),
        });
      },

      clearCart: () => set({ items: [] }),

      toggleCartDrawer: () => set((state) => ({ isCartDrawerOpen: !state.isCartDrawerOpen })),
      setCartDrawerOpen: (open) => set({ isCartDrawerOpen: open }),

      setSelectedDevice: (device) => set({ selectedDevice: device }),

      getTotalPrice: () => {
        return get().items.reduce((total, item) => total + item.price * item.quantity, 0);
      },

      getTotalItems: () => {
        return get().items.reduce((total, count) => total + count.quantity, 0);
      },
    }),
    {
      name: 'thinkkaro-cart-storage',
      partialize: (state) => ({ items: state.items, selectedDevice: state.selectedDevice }),
    }
  )
);
