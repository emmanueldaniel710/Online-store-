/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { useLumina } from '../context/LuminaContext';
import { X, ShoppingBag, Plus, Minus, Trash2, ArrowRight, ShieldCheck, Ticket } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function CartDrawer() {
  const {
    cart,
    cartOpen,
    setCartOpen,
    updateQuantity,
    removeFromCart,
    setCheckoutOpen,
  } = useLumina();

  const [promoCode, setPromoCode] = useState('');
  const [discountPercent, setDiscountPercent] = useState(0);
  const [promoError, setPromoError] = useState('');
  const [appliedCodeLabel, setAppliedCodeLabel] = useState('');

  const handleApplyPromo = () => {
    setPromoError('');
    if (promoCode.toUpperCase() === 'LUMINA20') {
      setDiscountPercent(20);
      setAppliedCodeLabel('LUMINA20 (20% OFF)');
      setPromoCode('');
    } else if (promoCode) {
      setPromoError('Invalid promo code. Try "LUMINA20".');
    }
  };

  const handleRemovePromo = () => {
    setDiscountPercent(0);
    setAppliedCodeLabel('');
  };

  const handleProceedToCheckout = () => {
    setCartOpen(false);
    setCheckoutOpen(true);
  };

  // Calculations
  const subtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const discountVal = (subtotal * discountPercent) / 100;
  const deliveryGoal = 500;
  const isFreeDeliveryAvailable = subtotal >= deliveryGoal;
  const remainingForDelivery = deliveryGoal - subtotal;
  const deliveryPercent = Math.min((subtotal / deliveryGoal) * 100, 100);
  
  const estimatedTax = (subtotal - discountVal) * 0.08; // 8% tax
  const deliveryCost = isFreeDeliveryAvailable ? 0 : 35;
  const finalTotal = subtotal - discountVal + estimatedTax + deliveryCost;

  return (
    <AnimatePresence>
      {cartOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          
          {/* Backdrop Click handle blur cover */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setCartOpen(false)}
            className="absolute inset-0 bg-charcoal-950/80 backdrop-blur-sm cursor-pointer"
          />

          {/* Drawer Panel Sliding-In */}
          <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 220 }}
              className="w-screen max-w-md bg-charcoal-900 border-l border-white/[0.06] text-white flex flex-col justify-between shadow-2xl relative"
            >
              {/* Top ambient glitter */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-gold-600 to-gold-300" />

              {/* Header block details */}
              <div className="px-5 py-6 border-b border-white/[0.05] flex items-center justify-between">
                <div className="flex items-center space-x-2.5">
                  <div className="relative p-1.5 bg-gold-400/5 rounded border border-gold-400/10 text-gold-300">
                    <ShoppingBag className="w-4 h-4" />
                  </div>
                  <h3 className="font-serif text-lg font-bold tracking-wide">
                    Your Shopping Bag ({cart.reduce((sum, item) => sum + item.quantity, 0)})
                  </h3>
                </div>

                <button
                  id="close-cart-drawer-btn"
                  onClick={() => setCartOpen(false)}
                  className="p-2 hover:bg-white/[0.05] rounded-full text-stone-400 hover:text-white transition cursor-pointer"
                  title="Close Cart"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Progress Free Delivery Tracker */}
              {cart.length > 0 && (
                <div className="px-5 py-4 bg-charcoal-950/40 border-b border-white/[0.03] space-y-2 select-none">
                  {isFreeDeliveryAvailable ? (
                    <p className="text-[10px] font-mono tracking-widest text-gold-300 uppercase flex items-center">
                      ✦ Congratulations! You qualified for Free Express Delivery.
                    </p>
                  ) : (
                    <p className="text-[10px] font-mono tracking-wider text-stone-400">
                      Add <strong className="text-white">${remainingForDelivery.toFixed(0)}</strong> more for <strong className="text-gold-300">Free Express Shipping</strong>.
                    </p>
                  )}
                  {/* Progressive Bar slider */}
                  <div className="w-full h-1 bg-white/[0.05] rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-gold-600 to-gold-400 transition-all duration-500"
                      style={{ width: `${deliveryPercent}%` }}
                    />
                  </div>
                </div>
              )}

              {/* Cart Items List Container */}
              <div className="flex-1 overflow-y-auto py-4 px-5 space-y-4 no-scrollbar">
                {cart.length > 0 ? (
                  cart.map((item) => (
                    <div
                      key={item.id}
                      className="flex space-x-4 p-3.5 bg-white/[0.01] border border-white/[0.03] hover:border-white/[0.08] rounded-xl transition duration-200 relative group"
                    >
                      {/* Trash action button */}
                      <button
                        id={`remove-cart-item-${item.id}`}
                        onClick={() => removeFromCart(item.id)}
                        className="absolute top-3.5 right-3.5 p-1.5 text-stone-500 hover:text-red-400 bg-white/[0.01] hover:bg-neutral-900 border border-white/[0.03] hover:border-red-400/20 rounded transition cursor-pointer"
                        title="Remove product"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>

                      {/* Product Visual */}
                      <img
                        src={item.product.primaryImage}
                        alt={item.product.name}
                        className="w-16 h-20 object-cover rounded-lg border border-white/[0.05] bg-charcoal-950 flex-shrink-0"
                      />

                      {/* Configurations description */}
                      <div className="flex-1 flex flex-col justify-between text-left">
                        <div>
                          <span className="text-[9px] font-mono uppercase tracking-widest text-gold-400">
                            {item.product.world}
                          </span>
                          <h4 className="font-serif text-sm font-semibold text-white tracking-wide leading-tight max-w-[85%]">
                            {item.product.name}
                          </h4>
                          
                          {/* Selected characteristics list */}
                          <div className="flex flex-wrap gap-x-2.5 mt-1.5 text-[10px] text-stone-400 font-mono">
                            {item.selectedMetal && (
                              <span>Metal: <strong className="text-white">{item.selectedMetal}</strong></span>
                            )}
                            {item.selectedColor && (
                              <span>Color: <strong className="text-white">{item.selectedColor}</strong></span>
                            )}
                            {item.selectedShade && (
                              <span>Shade: <strong className="text-white">{item.selectedShade}</strong></span>
                            )}
                            {item.selectedSize && (
                              <span>Size: <strong className="text-white">{item.selectedSize}</strong></span>
                            )}
                          </div>
                        </div>

                        {/* Interactive Incremental Counter and live Price */}
                        <div className="flex items-center justify-between mt-3">
                          <div className="flex items-center bg-charcoal-950 rounded border border-white/[0.05] scale-90 -ml-1">
                            <button
                              id={`dec-cart-qty-${item.id}`}
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="px-2 py-1 text-stone-400 hover:text-white font-mono text-xs cursor-pointer"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="w-6 text-center text-xs font-mono font-medium text-white">
                              {item.quantity}
                            </span>
                            <button
                              id={`inc-cart-qty-${item.id}`}
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="px-2 py-1 text-stone-400 hover:text-white font-mono text-xs cursor-pointer"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>

                          <span className="font-mono text-xs text-white font-semibold">
                            ${(item.product.price * item.quantity).toLocaleString()}
                          </span>
                        </div>
                      </div>

                    </div>
                  ))
                ) : (
                  <div className="flex flex-col items-center justify-center py-20 text-center text-stone-500 select-none">
                    <div className="relative mb-4 w-12 h-12 rounded-full bg-white/[0.02] border border-white/[0.04] flex items-center justify-center">
                      <ShoppingBag className="w-6 h-6 text-stone-400" />
                    </div>
                    <p className="font-serif text-base text-stone-300 font-semibold">Your bag is currently empty.</p>
                    <p className="text-xs text-stone-500 mt-1 max-w-[240px]">
                      Discover luxury treasures and add them to your collection.
                    </p>
                    <button
                      id="close-cart-drawer-discover-btn"
                      onClick={() => setCartOpen(false)}
                      className="mt-6 px-4 py-2 border border-gold-400/40 rounded-full text-[10px] font-mono text-gold-300 uppercase tracking-widest hover:bg-gold-400 hover:text-charcoal-950 transition-all duration-300 cursor-pointer"
                    >
                      Discover Collections
                    </button>
                  </div>
                )}
              </div>

              {/* Bottom Totals & Promo Calculations Block */}
              {cart.length > 0 && (
                <div className="bg-charcoal-950 p-5 border-t border-white/[0.05] space-y-4">
                  
                  {/* Coupon activation box */}
                  <div className="space-y-1 text-left">
                    <span className="text-[9px] font-mono uppercase tracking-wider text-stone-400">Apply Promo Voucher Code:</span>
                    <div className="flex space-x-1">
                      <div className="flex-1 flex items-center bg-charcoal-900 border border-white/[0.06] rounded-md px-2.5 py-1 focus-within:border-gold-300/50">
                        <Ticket className="w-3.5 h-3.5 text-stone-500 mr-2" />
                        <input
                          id="cart-promo-code-input"
                          type="text"
                          value={promoCode}
                          onChange={(e) => setPromoCode(e.target.value)}
                          placeholder="Try code: LUMINA20"
                          className="w-full bg-transparent border-0 outline-none text-xs text-white uppercase placeholder-stone-500"
                        />
                      </div>
                      <button
                        id="apply-promo-btn"
                        onClick={handleApplyPromo}
                        className="px-4 py-1.5 bg-white/[0.04] text-xs font-mono uppercase rounded border border-white/[0.08] hover:bg-white/[0.1] hover:text-white text-stone-200 transition font-medium cursor-pointer"
                      >
                        Apply
                      </button>
                    </div>
                    {promoError && (
                      <p className="text-[10px] font-mono text-red-400 mt-1">{promoError}</p>
                    )}
                    {appliedCodeLabel && (
                      <div className="flex items-center justify-between bg-gold-400/5 border border-gold-400/20 rounded px-2.5 py-1 mt-1 font-mono text-[10px] text-gold-200">
                        <span>Applied: {appliedCodeLabel}</span>
                        <button
                          id="remove-promo-btn"
                          onClick={handleRemovePromo}
                          className="text-stone-400 hover:text-white"
                        >
                          [Remove]
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Pricing summaries list */}
                  <div className="space-y-2 border-t border-white/[0.04] pt-3.5 text-xs text-stone-400 select-none font-mono">
                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <span className="text-white font-medium">${subtotal.toLocaleString()}</span>
                    </div>
                    {discountVal > 0 && (
                      <div className="flex justify-between text-gold-200 font-medium">
                        <span>Campaign Discount (20%)</span>
                        <span>-${discountVal.toLocaleString()}</span>
                      </div>
                    )}
                    <div className="flex justify-between">
                      <span>Estimated Tax (8%)</span>
                      <span className="text-white font-medium">${estimatedTax.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Express Shipping</span>
                      <span className="text-white font-medium">
                        {isFreeDeliveryAvailable ? <span className="text-gold-200">DELIVERED COMPLIMENTARY</span> : `$${deliveryCost.toFixed(0)}`}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm text-white border-t border-white/[0.04] pt-3.5 font-sans font-bold">
                      <span className="text-stone-300">Order Totals</span>
                      <span className="text-white font-mono text-base">${finalTotal.toLocaleString()}</span>
                    </div>
                  </div>

                  {/* Actions checklist */}
                  <div className="space-y-2.5 mt-2">
                    <button
                      id="proceed-checkout-btn"
                      onClick={handleProceedToCheckout}
                      className="w-full py-4 bg-gradient-to-r from-gold-500 to-gold-400 hover:from-gold-400 hover:to-gold-200 text-charcoal-950 font-mono text-xs font-bold tracking-widest uppercase rounded-lg flex items-center justify-center space-x-2.5 shadow-xl shadow-gold-500/10 cursor-pointer"
                    >
                      <span>Proceed To Secure Checkout</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                    
                    <div className="flex items-center justify-center space-x-1.5 text-[10px] font-mono tracking-wider text-stone-500 uppercase">
                      <ShieldCheck className="w-3.5 h-3.5 text-gold-400" />
                      <span>SSL Encrypted Secure checkout interface</span>
                    </div>
                  </div>

                </div>
              )}

            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
}
