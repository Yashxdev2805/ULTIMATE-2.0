import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type BookingStatus =
  | 'Order Confirmed'
  | 'Technician Assigned'
  | 'En Route'
  | 'Under Repair'
  | 'Completed';

export interface Booking {
  id: string;
  createdAt: string;
  deviceModel: string;
  deviceBrand: string;
  issueDescription: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  address: string;
  city: string;
  pincode: string;
  appointmentDate: string;
  appointmentTime: string;
  technicianName: string;
  technicianPhone: string;
  status: BookingStatus;
  estimatedCost: number;
  partsCost: number;
  laborCost: number;
  tax: number;
  isPaid: boolean;
  paymentMethod: string;
}

interface BookingStore {
  bookings: Booking[];
  activeBookingId: string | null;
  addBooking: (booking: Omit<Booking, 'id' | 'createdAt' | 'status'>) => string;
  updateStatus: (id: string, status: BookingStatus) => void;
  setActiveBooking: (id: string | null) => void;
  cancelBooking: (id: string) => void;
}

const INITIAL_MOCK_BOOKING: Booking = {
  id: 'TK-849201',
  createdAt: '2026-07-28T10:00:00.000Z',
  deviceModel: 'iPhone 15 Pro',
  deviceBrand: 'Apple',
  issueDescription: 'Shattered front glass and unresponsive touch digitizer on upper left corner',
  customerName: 'Alex Rivera',
  customerEmail: 'alex.rivera@example.com',
  customerPhone: '+1 (555) 234-5678',
  address: '742 Evergreen Terrace',
  city: 'Springfield',
  pincode: '97477',
  appointmentDate: '2026-07-29',
  appointmentTime: '10:00 AM - 12:00 PM',
  technicianName: 'Marcus Vance (Senior Tech)',
  technicianPhone: '+1 (555) 987-6543',
  status: 'Technician Assigned',
  estimatedCost: 289.99,
  partsCost: 249.99,
  laborCost: 40.00,
  tax: 23.20,
  isPaid: true,
  paymentMethod: 'Credit Card (Stripe)',
};

export const useBookingStore = create<BookingStore>()(
  persist(
    (set, get) => ({
      bookings: [INITIAL_MOCK_BOOKING],
      activeBookingId: 'TK-849201',

      addBooking: (newBookingData) => {
        const newId = 'TK-' + Math.floor(100000 + Math.random() * 900000);
        const newBooking: Booking = {
          ...newBookingData,
          id: newId,
          createdAt: new Date().toISOString(),
          status: 'Order Confirmed',
        };
        set((state) => ({
          bookings: [newBooking, ...state.bookings],
          activeBookingId: newId,
        }));
        return newId;
      },

      updateStatus: (id, status) => {
        set((state) => ({
          bookings: state.bookings.map((b) =>
            b.id === id ? { ...b, status } : b
          ),
        }));
      },

      setActiveBooking: (id) => set({ activeBookingId: id }),

      cancelBooking: (id) => {
        set((state) => ({
          bookings: state.bookings.filter((b) => b.id !== id),
          activeBookingId: state.activeBookingId === id ? null : state.activeBookingId,
        }));
      },
    }),
    {
      name: 'thinkkaro-booking-storage',
    }
  )
);
