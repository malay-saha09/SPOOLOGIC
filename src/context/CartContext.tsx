'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  CartItem, 
  ScenarioState, 
  StockScenario, 
  CaliforniaScenario, 
  ShippingTimeScenario, 
  BackorderEstimateScenario, 
  VehicleFitScenario, 
  PricingScenario, 
  PolicyScenario, 
  Vehicle 
} from '@/types';
import { productData } from '@/data/productData';
import { vehiclesDatabase, matchingVehicleIds } from '@/data/vehiclesData';

export interface ShippingExampleInfo {
  title: string;
  detail: string;
  countdown: boolean;
  hoursLeft?: number;
  minsLeft?: number;
  icon?: string;
  greeting?: string;
  label?: string;
}

export const shippingExamples: Record<ShippingTimeScenario, ShippingExampleInfo> = {
  before: {
    title: 'Ships today',
    detail: '3 p.m. Pacific cutoff · Mon–Fri',
    countdown: true,
    hoursLeft: 1,
    minsLeft: 42
  },
  after: {
    title: 'Ships tomorrow',
    detail: 'Today’s 3 p.m. Pacific cutoff has passed',
    countdown: false
  },
  friday: {
    title: 'Ships Monday',
    detail: 'Next business day · No weekend dispatch',
    countdown: false
  },
  weekend: {
    title: 'Ships Monday',
    detail: 'Next business day · No weekend dispatch',
    countdown: false
  },
  holiday: {
    title: 'Ships Tuesday',
    detail: 'Holiday closure · Shipping resumes Tuesday',
    countdown: false
  },
  longweekend: {
    title: 'Ships Tuesday',
    detail: 'Monday holiday · Shipping resumes Tuesday',
    countdown: false
  },
  memorial: {
    label: 'Memorial Day · May 25, 2026',
    icon: '🇺🇸',
    greeting: 'Honoring our fallen heroes',
    title: 'Shipping resumes Tuesday, May 26',
    detail: 'Memorial Day · No carrier pickup today',
    countdown: false
  },
  labor: {
    label: 'Labor Day · September 7, 2026',
    icon: '🇺🇸',
    greeting: 'Happy Labor Day!',
    title: 'Shipping resumes Tuesday, September 8',
    detail: 'Labor Day · No carrier pickup today',
    countdown: false
  },
  july: {
    label: '4th of July · July 4, 2026',
    icon: '🇺🇸',
    greeting: 'Happy 4th of July!',
    title: 'Shipping resumes Monday, July 6',
    detail: 'Independence Day · Holiday weekend',
    countdown: false
  },
  christmas: {
    label: 'Christmas · December 25, 2026',
    icon: '🎄',
    greeting: 'Merry Christmas!',
    title: 'Shipping resumes Monday, December 28',
    detail: 'Christmas Day · No carrier pickup today',
    countdown: false
  },
  thanksgiving: {
    label: 'Thanksgiving · November 26, 2026',
    icon: '🦃',
    greeting: 'Happy Thanksgiving!',
    title: 'Shipping resumes Friday, November 27',
    detail: 'Thanksgiving Day · No carrier pickup today',
    countdown: false
  },
  newyear: {
    label: 'New Year’s Day · January 1, 2027',
    icon: '🎉',
    greeting: 'Happy New Year!',
    title: 'Shipping resumes Monday, January 4',
    detail: 'New Year’s Day · No carrier pickup today',
    countdown: false
  }
};

interface CartContextType {
  cart: CartItem[];
  addToCart: (item: Omit<CartItem, 'id'>, requireAck?: boolean) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, delta: number) => void;
  clearCart: () => void;
  cartCount: number;
  cartSubtotal: number;
  isCartDrawerOpen: boolean;
  openCartDrawer: () => void;
  closeCartDrawer: () => void;

  scenarios: ScenarioState;
  updateScenario: <K extends keyof ScenarioState>(key: K, value: ScenarioState[K]) => void;

  selectedVehicle: Vehicle | null;
  setSelectedVehicle: (vehicle: Vehicle | null) => void;
  vehicleMatchState: VehicleFitScenario;

  currentPrice: number;
  originalPrice: number;

  isAckModalOpen: boolean;
  openAckModal: () => void;
  closeAckModal: () => void;
  pendingCartItem: Omit<CartItem, 'id'> | null;
  confirmAddToCart: () => void;

  isVehicleModalOpen: boolean;
  openVehicleModal: () => void;
  closeVehicleModal: () => void;

  isProp65Open: boolean;
  openProp65: () => void;
  closeProp65: () => void;

  toastMessage: string | null;
  showToast: (msg: string) => void;

  discountCode: string;
  discountPercent: number;
  applyDiscountCode: (code: string) => boolean;
  shippingOption: 'free' | 'expedited' | 'overnight';
  setShippingOption: (opt: 'free' | 'expedited' | 'overnight') => void;
  shippingCost: number;
}

const defaultScenarios: ScenarioState = {
  stock: 'limited',
  california: 'allowed',
  shippingTime: 'before',
  backorderEstimate: 'dates',
  backorderCustomText: 'Estimated to ship in 2–3 weeks.',
  vehicleFit: 'match',
  pricing: 'sale',
  policy: 'actual'
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartDrawerOpen, setIsCartDrawerOpen] = useState(false);
  const [scenarios, setScenarios] = useState<ScenarioState>(defaultScenarios);
  const [selectedVehicle, setSelectedVehicleState] = useState<Vehicle | null>(vehiclesDatabase[0]);
  const [isAckModalOpen, setIsAckModalOpen] = useState(false);
  const [pendingCartItem, setPendingCartItem] = useState<Omit<CartItem, 'id'> | null>(null);
  const [isVehicleModalOpen, setIsVehicleModalOpen] = useState(false);
  const [isProp65Open, setIsProp65Open] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [discountCode, setDiscountCode] = useState('');
  const [discountPercent, setDiscountPercent] = useState(0);
  const [shippingOption, setShippingOption] = useState<'free' | 'expedited' | 'overnight'>('free');

  // Load cart from localStorage if present
  useEffect(() => {
    try {
      const saved = localStorage.getItem('spoologic_cart');
      if (saved) {
        setCart(JSON.parse(saved));
      }
    } catch {}
  }, []);

  // Save cart to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('spoologic_cart', JSON.stringify(cart));
    } catch {}
  }, [cart]);

  const updateScenario = <K extends keyof ScenarioState>(key: K, value: ScenarioState[K]) => {
    setScenarios(prev => ({ ...prev, [key]: value }));
  };

  const setSelectedVehicle = (vehicle: Vehicle | null) => {
    setSelectedVehicleState(vehicle);
    if (!vehicle) {
      updateScenario('vehicleFit', 'none');
    } else if (matchingVehicleIds.includes(vehicle.id)) {
      updateScenario('vehicleFit', 'match');
    } else {
      updateScenario('vehicleFit', 'mismatch');
    }
  };

  // Sync vehicleFit scenario if toolbar updates it
  const vehicleMatchState = scenarios.vehicleFit;

  // Compute active prices based on scenario
  const currentPrice = 
    scenarios.pricing === 'dealer' ? productData.prices.dealer :
    scenarios.pricing === 'sale' ? productData.prices.sale :
    productData.prices.regular;

  const originalPrice = productData.prices.regular;

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  const addToCart = (item: Omit<CartItem, 'id'>, requireAck = false) => {
    // Check if acknowledgment is required (e.g. backorder or specific return/warranty policy)
    const needsAck = requireAck || scenarios.stock === 'backorder' || scenarios.policy !== 'actual';
    if (needsAck) {
      setPendingCartItem(item);
      setIsAckModalOpen(true);
      return;
    }

    executeAddToCart(item);
  };

  const executeAddToCart = (item: Omit<CartItem, 'id'>) => {
    setCart(prev => {
      const existing = prev.find(i => i.sku === item.sku);
      if (existing) {
        return prev.map(i => i.sku === item.sku ? { ...i, quantity: i.quantity + item.quantity } : i);
      }
      return [...prev, { ...item, id: `${item.sku}-${Date.now()}` }];
    });
    showToast(`Added ${item.title} to your cart.`);
    setIsCartDrawerOpen(true);
  };

  const confirmAddToCart = () => {
    if (pendingCartItem) {
      executeAddToCart(pendingCartItem);
      setPendingCartItem(null);
      setIsAckModalOpen(false);
    }
  };

  const removeFromCart = (id: string) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const updateQuantity = (id: string, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    }));
  };

  const clearCart = () => setCart([]);

  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const cartSubtotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  const applyDiscountCode = (code: string): boolean => {
    const trimmed = code.trim().toUpperCase();
    if (trimmed === 'SPOOL10' || trimmed === 'TURBO10') {
      setDiscountCode(trimmed);
      setDiscountPercent(0.10);
      showToast('Promo code applied: 10% discount!');
      return true;
    } else if (trimmed === 'FREESHIP') {
      setDiscountCode(trimmed);
      setDiscountPercent(0.05);
      showToast('Promo code applied: 5% bonus discount!');
      return true;
    } else {
      showToast('Invalid promo code. Try "SPOOL10"');
      return false;
    }
  };

  const shippingCost = 
    shippingOption === 'overnight' ? 79.95 :
    shippingOption === 'expedited' ? 34.95 : 0;

  return (
    <CartContext.Provider value={{
      cart,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      cartCount,
      cartSubtotal,
      isCartDrawerOpen,
      openCartDrawer: () => setIsCartDrawerOpen(true),
      closeCartDrawer: () => setIsCartDrawerOpen(false),

      scenarios,
      updateScenario,

      selectedVehicle,
      setSelectedVehicle,
      vehicleMatchState,

      currentPrice,
      originalPrice,

      isAckModalOpen,
      openAckModal: () => setIsAckModalOpen(true),
      closeAckModal: () => setIsAckModalOpen(false),
      pendingCartItem,
      confirmAddToCart,

      isVehicleModalOpen,
      openVehicleModal: () => setIsVehicleModalOpen(true),
      closeVehicleModal: () => setIsVehicleModalOpen(false),

      isProp65Open,
      openProp65: () => setIsProp65Open(true),
      closeProp65: () => setIsProp65Open(false),

      toastMessage,
      showToast,

      discountCode,
      discountPercent,
      applyDiscountCode,
      shippingOption,
      setShippingOption,
      shippingCost
    }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
