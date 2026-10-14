export type ProductCategory = 'All' | 'Hot Coffee' | 'Iced Coffee' | 'Specials' | 'Bakery';

export interface Product {
  id: string;
  name: string;
  category: ProductCategory;
  price: number;
  description: string;
  image: string;
  fallbackGradient?: string;
  tastingNotes?: string[];
  isBestSeller?: boolean;
  isSpecialty?: boolean;
  roastLevel?: 'Light' | 'Medium' | 'Dark' | 'Signature Blend';
  caffeine?: 'Regular' | 'Decaf Available';
  volume?: string;
}

export interface CustomizationOptions {
  milk?: 'Whole Milk' | 'Oat Milk' | 'Almond Milk' | 'Skim Milk' | 'None';
  sweetness?: 'Standard' | 'Half Sweet' | 'Extra Sweet' | 'Unsweetened';
  temperature?: 'Hot' | 'Iced';
  size?: 'Regular (12oz)' | 'Large (16oz)';
  specialInstructions?: string;
}

export interface CartItem {
  id: string;
  product: Product;
  quantity: number;
  customization?: CustomizationOptions;
  unitPrice: number;
}

export type OrderType = 'dine-in' | 'takeaway' | 'delivery';

export interface CheckoutDetails {
  fullName: string;
  email: string;
  phone: string;
  orderType: OrderType;
  tableOrAddress: string;
  specialNotes?: string;
}

export interface CompletedOrder {
  orderId: string;
  items: CartItem[];
  subtotal: number;
  tax: number;
  deliveryFee: number;
  total: number;
  customer: CheckoutDetails;
  createdAt: string;
  estimatedMinutes: number;
  pickupCode: string;
}
