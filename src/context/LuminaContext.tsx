/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, CartItem, BrandWorld } from '../types';
import { PRODUCTS } from '../data';

interface LuminaContextType {
  activeWorld: BrandWorld;
  setActiveWorld: (world: BrandWorld) => void;
  cart: CartItem[];
  addToCart: (product: Product, quantity: number, options?: Partial<Omit<CartItem, 'id' | 'product' | 'quantity'>>) => void;
  removeFromCart: (cartItemId: string) => void;
  updateQuantity: (cartItemId: string, q: number) => void;
  clearCart: () => void;
  wishlist: string[];
  toggleWishlist: (productId: string) => void;
  cartOpen: boolean;
  setCartOpen: (open: boolean) => void;
  chooseWorldOpen: boolean;
  setChooseWorldOpen: (open: boolean) => void;
  quickViewProduct: Product | null;
  setQuickViewProduct: (product: Product | null) => void;
  checkoutOpen: boolean;
  setCheckoutOpen: (open: boolean) => void;
  searchOpen: boolean;
  setSearchOpen: (open: boolean) => void;
}

const LuminaContext = createContext<LuminaContextType | undefined>(undefined);

export function LuminaProvider({ children }: { children: React.ReactNode }) {
  const [activeWorld, setActiveWorldInternal] = useState<BrandWorld>('jewelry');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);
  
  // Dialog states
  const [cartOpen, setCartOpen] = useState(false);
  const [chooseWorldOpen, setChooseWorldOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  // Load cart and wishlist from localStorage on mount
  useEffect(() => {
    const cachedCart = localStorage.getItem('lumina_cart');
    const cachedWishlist = localStorage.getItem('lumina_wishlist');
    const cachedWorld = localStorage.getItem('lumina_world');
    
    if (cachedCart) {
      try { setCart(JSON.parse(cachedCart)); } catch (e) { console.error(e); }
    }
    if (cachedWishlist) {
      try { setWishlist(JSON.parse(cachedWishlist)); } catch (e) { console.error(e); }
    }
    if (cachedWorld) {
      setActiveWorldInternal(cachedWorld as BrandWorld);
    }
  }, []);

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem('lumina_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('lumina_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  const setActiveWorld = (world: BrandWorld) => {
    setActiveWorldInternal(world);
    localStorage.setItem('lumina_world', world);
  };

  const addToCart = (
    product: Product,
    quantity: number,
    options?: Partial<Omit<CartItem, 'id' | 'product' | 'quantity'>>
  ) => {
    setCart((prevCart) => {
      // Formulate unique cart item key representing product + particular variables chosen
      const optionKey = [
        options?.selectedColor || '',
        options?.selectedSize || '',
        options?.selectedMetal || '',
        options?.selectedShade || ''
      ].join('_');
      
      const cartItemId = `${product.id}_${optionKey}`;
      const existingIndex = prevCart.findIndex((item) => item.id === cartItemId);

      if (existingIndex > -1) {
        const updated = [...prevCart];
        updated[existingIndex].quantity += quantity;
        return updated;
      }

      return [
        ...prevCart,
        {
          id: cartItemId,
          product,
          quantity,
          selectedColor: options?.selectedColor,
          selectedSize: options?.selectedSize,
          selectedMetal: options?.selectedMetal,
          selectedShade: options?.selectedShade,
        },
      ];
    });

    // Auto-open cart to show added feedback
    setCartOpen(true);
  };

  const removeFromCart = (cartItemId: string) => {
    setCart((prev) => prev.filter((item) => item.id !== cartItemId));
  };

  const updateQuantity = (cartItemId: string, q: number) => {
    if (q <= 0) {
      removeFromCart(cartItemId);
      return;
    }
    setCart((prev) =>
      prev.map((item) => (item.id === cartItemId ? { ...item, quantity: q } : item))
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const toggleWishlist = (productId: string) => {
    setWishlist((prev) =>
      prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId]
    );
  };

  return (
    <LuminaContext.Provider
      value={{
        activeWorld,
        setActiveWorld,
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        wishlist,
        toggleWishlist,
        cartOpen,
        setCartOpen,
        chooseWorldOpen,
        setChooseWorldOpen,
        quickViewProduct,
        setQuickViewProduct,
        checkoutOpen,
        setCheckoutOpen,
        searchOpen,
        setSearchOpen,
      }}
    >
      {children}
    </LuminaContext.Provider>
  );
}

export function useLumina() {
  const context = useContext(LuminaContext);
  if (context === undefined) {
    throw new Error('useLumina must be used within a LuminaProvider');
  }
  return context;
}
