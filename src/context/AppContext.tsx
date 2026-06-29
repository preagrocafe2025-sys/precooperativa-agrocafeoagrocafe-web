/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, CartItem, GrindType, SubscriptionConfig } from '../types';

interface AppContextType {
  cart: CartItem[];
  addToCart: (product: Product, quantity: number, grind: GrindType) => void;
  removeFromCart: (cartItemId: string) => void;
  updateQuantity: (cartItemId: string, quantity: number) => void;
  clearCart: () => void;
  isCartOpen: boolean;
  setCartOpen: (open: boolean) => void;
  checkoutTarget: 'cart' | SubscriptionConfig | Product | null;
  setCheckoutTarget: (target: 'cart' | SubscriptionConfig | Product | null) => void;
  triggerCheckout: (target: 'cart' | SubscriptionConfig | Product) => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  styleTheme: 'classic' | 'woolamai';
  setStyleTheme: (theme: 'classic' | 'woolamai') => void;
}

const getInitialTab = (): string => {
  if (typeof window === 'undefined') return 'inicio';
  
  let path = '';
  try {
    path = decodeURIComponent(window.location.pathname).toLowerCase();
  } catch (e) {
    path = window.location.pathname.toLowerCase();
  }
  
  const hash = window.location.hash.toLowerCase();
  const searchParams = new URLSearchParams(window.location.search);
  const queryTab = searchParams.get('tab')?.toLowerCase();

  // Check pathnames
  if (
    path === '/transparencia rte' || 
    path === '/transparencia-rte' || 
    path === '/transparencia_rte' || 
    path === '/transparencia' ||
    path.includes('transparencia') ||
    path.includes('rte')
  ) {
    return 'transparencia';
  }
  if (path === '/tienda' || path === '/catalogo') return 'tienda';
  if (path === '/nosotros' || path === '/mision' || path === '/vision') return 'nosotros';
  if (path === '/suscripcion' || path === '/suministro') return 'suscripcion';
  if (path === '/inicio' || path === '/') return 'inicio';

  // Check hash
  if (hash.includes('transparencia') || hash.includes('rte')) return 'transparencia';
  if (hash.includes('tienda') || hash.includes('catalogo')) return 'tienda';
  if (hash.includes('nosotros')) return 'nosotros';
  if (hash.includes('suscripcion')) return 'suscripcion';

  // Check query params
  if (queryTab === 'transparencia' || queryTab === 'rte') return 'transparencia';
  if (queryTab === 'tienda') return 'tienda';
  if (queryTab === 'nosotros') return 'nosotros';
  if (queryTab === 'suscripcion') return 'suscripcion';

  return 'inicio';
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setCartOpen] = useState(false);
  const [checkoutTarget, setCheckoutTarget] = useState<'cart' | SubscriptionConfig | Product | null>(null);
  const [activeTab, setActiveTabState] = useState<string>(getInitialTab);
  const [styleTheme, setStyleThemeState] = useState<'classic' | 'woolamai'>('classic');

  const setActiveTab = (tab: string) => {
    setActiveTabState(tab);
    if (typeof window !== 'undefined') {
      let newPath = '/';
      if (tab === 'transparencia') {
        newPath = '/Transparencia RTE';
      } else if (tab !== 'inicio') {
        newPath = `/${tab}`;
      }
      window.history.pushState(null, '', newPath);
    }
  };

  // Sync tab with back/forward navigation
  useEffect(() => {
    const handlePopState = () => {
      setActiveTabState(getInitialTab());
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const setStyleTheme = (theme: 'classic' | 'woolamai') => {
    setStyleThemeState('classic');
  };

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('cafe_origen_cart');
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart));
      } catch (e) {
        console.error('Error parsing cart from localStorage', e);
      }
    }
  }, []);

  // Save cart to localStorage on changes
  const saveCart = (newCart: CartItem[]) => {
    setCart(newCart);
    localStorage.setItem('cafe_origen_cart', JSON.stringify(newCart));
  };

  const addToCart = (product: Product, quantity: number, grind: GrindType) => {
    const cartItemId = `${product.id}-${grind}`;
    const existingIndex = cart.findIndex(item => item.id === cartItemId);

    if (existingIndex > -1) {
      const updatedCart = [...cart];
      updatedCart[existingIndex].quantity += quantity;
      saveCart(updatedCart);
    } else {
      const newItem: CartItem = {
        id: cartItemId,
        product,
        quantity,
        grind
      };
      saveCart([...cart, newItem]);
    }
    // Open the cart automatically to show feedback
    setCartOpen(true);
  };

  const removeFromCart = (cartItemId: string) => {
    const updatedCart = cart.filter(item => item.id !== cartItemId);
    saveCart(updatedCart);
  };

  const updateQuantity = (cartItemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(cartItemId);
      return;
    }
    const updatedCart = cart.map(item => 
      item.id === cartItemId ? { ...item, quantity } : item
    );
    saveCart(updatedCart);
  };

  const clearCart = () => {
    saveCart([]);
  };

  const triggerCheckout = (target: 'cart' | SubscriptionConfig | Product) => {
    setCheckoutTarget(target);
    setCartOpen(false);
  };

  return (
    <AppContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        isCartOpen,
        setCartOpen,
        checkoutTarget,
        setCheckoutTarget,
        triggerCheckout,
        activeTab,
        setActiveTab,
        styleTheme,
        setStyleTheme
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
