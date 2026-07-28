export type ProductCondition = 'OEM' | 'Refurbished' | 'Aftermarket';

export type ProductType = 'part' | 'tool';

export type StockStatus = 'In Stock' | 'Low Stock' | 'Out of Stock';

export type PurchaseOption = 'buy' | 'rent' | 'both';

export interface Product {
  id: string;
  name: string;
  category: string;
  brand: string;
  compatibleDevices: string[];
  price: number;
  originalPrice?: number;
  condition: ProductCondition;
  stockStatus: StockStatus;
  stockCount: number;
  rating: number;
  reviewsCount: number;
  description: string;
  specs: Record<string, string>;
  type: ProductType;
  purchaseOption?: PurchaseOption;
  dailyRentalPrice?: number;
  images?: string[];
  model3DType?: 'screen' | 'battery' | 'camera' | 'driver' | 'station' | 'default';
  includedItems?: string[];
  features?: string[];
}

export interface DeviceOption {
  year: string;
  brand: string;
  model: string;
  variant: string;
}

export interface Review {
  id: string;
  userName: string;
  userAvatar?: string;
  rating: number;
  date: string;
  title: string;
  comment: string;
  verifiedPurchase: boolean;
}
