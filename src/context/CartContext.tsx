import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, CartItem, CustomizationOptions, CompletedOrder, CheckoutDetails } from '../types/coffee';

interface CartContextType {
  cart: CartItem[];
  addToCart: (product: Product, quantity?: number, customization?: CustomizationOptions) => void;
  updateQuantity: (cartItemId: string, newQuantity: number) => void;
  removeFromCart: (cartItemId: string) => void;
  clearCart: () => void;
  totalItems: number;
  subtotal: number;
  discount: number;
  promoCode: string;
  applyPromoCode: (code: string) => { success: boolean; message: string };
  removePromoCode: () => void;
  total: number;
  tax: number;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  isCheckoutOpen: boolean;
  setIsCheckoutOpen: (open: boolean) => void;
  completedOrder: CompletedOrder | null;
  setCompletedOrder: (order: CompletedOrder | null) => void;
  toastMessage: string | null;
  showToast: (message: string) => void;
  submitOrder: (details: CheckoutDetails) => CompletedOrder;
}

const CART_STORAGE_KEY = 'hs_latte_cart_v1';
const PROMO_STORAGE_KEY = 'hs_latte_promo_v1';

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem(CART_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [promoCode, setPromoCode] = useState<string>(() => {
    try {
      return localStorage.getItem(PROMO_STORAGE_KEY) || '';
    } catch {
      return '';
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [completedOrder, setCompletedOrder] = useState<CompletedOrder | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    } catch (e) {
      console.warn('Failed to save cart to localStorage', e);
    }
  }, [cart]);

  useEffect(() => {
    try {
      if (promoCode) {
        localStorage.setItem(PROMO_STORAGE_KEY, promoCode);
      } else {
        localStorage.removeItem(PROMO_STORAGE_KEY);
      }
    } catch (e) {
      console.warn('Failed to save promoCode', e);
    }
  }, [promoCode]);

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(prev => prev === message ? null : prev);
    }, 3200);
  };

  const addToCart = (product: Product, quantity = 1, customization?: CustomizationOptions) => {
    let priceModifier = 0;
    if (customization?.size === 'Large (16oz)') {
      priceModifier += 0.80;
    }
    if (customization?.milk === 'Oat Milk' || customization?.milk === 'Almond Milk') {
      priceModifier += 0.60;
    }

    const unitPrice = Number((product.price + priceModifier).toFixed(2));

    // Generate unique key based on item + options
    const customKey = customization 
      ? `${product.id}-${customization.size || 'reg'}-${customization.milk || 'def'}-${customization.sweetness || 'std'}-${customization.temperature || 'def'}`
      : product.id;

    setCart(prev => {
      const existingIndex = prev.findIndex(item => item.id === customKey);
      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += quantity;
        return updated;
      } else {
        return [
          ...prev,
          {
            id: customKey,
            product,
            quantity,
            customization,
            unitPrice
          }
        ];
      }
    });

    showToast(`Added ${quantity} × ${product.name} to cart`);
  };

  const updateQuantity = (cartItemId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeFromCart(cartItemId);
      return;
    }
    setCart(prev =>
      prev.map(item =>
        item.id === cartItemId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const removeFromCart = (cartItemId: string) => {
    setCart(prev => prev.filter(item => item.id !== cartItemId));
  };

  const clearCart = () => {
    setCart([]);
  };

  const applyPromoCode = (code: string) => {
    const cleanCode = code.trim().toUpperCase();
    if (cleanCode === 'HSLATTE15' || cleanCode === 'COFFEE15') {
      setPromoCode(cleanCode);
      return { success: true, message: '15% courtesy discount applied!' };
    } else if (cleanCode === 'BETTERDAYS') {
      setPromoCode(cleanCode);
      return { success: true, message: '$2.00 barista welcome discount applied!' };
    }
    return { success: false, message: 'Invalid promotional code.' };
  };

  const removePromoCode = () => {
    setPromoCode('');
  };

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = Number(cart.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0).toFixed(2));

  let discount = 0;
  if (promoCode === 'HSLATTE15' || promoCode === 'COFFEE15') {
    discount = Number((subtotal * 0.15).toFixed(2));
  } else if (promoCode === 'BETTERDAYS' && subtotal > 0) {
    discount = Math.min(2.00, subtotal);
  }

  const taxableAmount = Math.max(0, subtotal - discount);
  const tax = Number((taxableAmount * 0.085).toFixed(2));
  const total = Number((taxableAmount + tax).toFixed(2));

  const submitOrder = (details: CheckoutDetails): CompletedOrder => {
    const orderNumber = Math.floor(1000 + Math.random() * 9000);
    const alphabet = 'ABCDEFGHJKLMNPQRSTUVWXYZ';
    const pickupCode = `${alphabet[Math.floor(Math.random() * alphabet.length)]}${alphabet[Math.floor(Math.random() * alphabet.length)]}-${orderNumber}`;

    const newOrder: CompletedOrder = {
      orderId: `HSL-${orderNumber}`,
      items: [...cart],
      subtotal,
      tax,
      deliveryFee: details.orderType === 'delivery' ? 3.50 : 0,
      total: Number((total + (details.orderType === 'delivery' ? 3.50 : 0)).toFixed(2)),
      customer: details,
      createdAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      estimatedMinutes: details.orderType === 'delivery' ? 25 : 10,
      pickupCode
    };

    setCompletedOrder(newOrder);
    setCart([]);
    setIsCheckoutOpen(false);
    return newOrder;
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        totalItems,
        subtotal,
        discount,
        promoCode,
        applyPromoCode,
        removePromoCode,
        total,
        tax,
        isCartOpen,
        setIsCartOpen,
        isCheckoutOpen,
        setIsCheckoutOpen,
        completedOrder,
        setCompletedOrder,
        toastMessage,
        showToast,
        submitOrder
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
