/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { useLumina } from '../context/LuminaContext';
import { X, Check, Lock, ShieldCheck, Ticket, CreditCard, ArrowRight, ArrowLeft, Landmark } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function CheckoutModal() {
  const {
    checkoutOpen,
    setCheckoutOpen,
    cart,
    clearCart,
  } = useLumina();

  const [step, setStep] = useState(1); // 1: Shipping, 2: Payment, 3: Completed Invoice Success
  
  // Shipping details state
  const [shippingForm, setShippingForm] = useState({
    email: '',
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    country: 'United States',
    zipCode: '',
    phone: '',
  });

  // Credit card state
  const [cardForm, setCardForm] = useState({
    cardholderName: '',
    cardNumber: '',
    expiryDate: '',
    cvc: '',
  });

  const [loadingPayment, setLoadingPayment] = useState(false);

  // Computed Values
  const subtotal = cart.reduce((sum, rx) => sum + rx.product.price * rx.quantity, 0);
  const discountPercent = subtotal >= 500 ? 10 : 0; // Automatic 10% discount on order over 500
  const discountValue = (subtotal * discountPercent) / 100;
  const deliveryCost = subtotal >= 500 ? 0 : 35;
  const taxCost = (subtotal - discountValue) * 0.08;
  const grandTotal = subtotal - discountValue + deliveryCost + taxCost;

  const handleShippingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (shippingForm.email && shippingForm.address && shippingForm.firstName) {
      setStep(2);
    }
  };

  const handlePaymentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (cardForm.cardNumber && cardForm.cardholderName) {
      setLoadingPayment(true);
      // Simulate high-end financial authorization latency
      setTimeout(() => {
        setLoadingPayment(false);
        setStep(3);
      }, 2000);
    }
  };

  const handleReturnToLumina = () => {
    clearCart();
    setStep(1);
    setCheckoutOpen(false);
  };

  // Format card number grouping input
  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawVal = e.target.value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const formatted = rawVal.match(/.{1,4}/g)?.join(' ') || rawVal;
    if (formatted.length <= 19) {
      setCardForm({ ...cardForm, cardNumber: formatted });
    }
  };

  return (
    <AnimatePresence>
      {checkoutOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          
          {/* Background layer click lock */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-charcoal-950/95 backdrop-blur-md"
          />

          {/* Checkout layout frame */}
          <div className="flex items-center justify-center min-h-screen p-4 sm:p-6 lg:p-10 relative z-30">
            <motion.div
              initial={{ opacity: 0, scale: 0.98, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.98, y: 15 }}
              className="w-full max-w-5xl bg-charcoal-900 border border-white/[0.08] rounded-2xl overflow-hidden shadow-2xl"
            >
              
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 relative">
                
                {/* --- LEFT HAND: STEP ACTION COLUMN (Span 7) --- */}
                <div className="lg:col-span-7 p-6 sm:p-10 border-r border-white/[0.05] text-left">
                  
                  {/* Step Indicators Header */}
                  {step < 3 && (
                    <div className="flex items-center space-x-4 mb-8">
                      <div className="flex items-center space-x-2">
                        <span className={`w-6 h-6 rounded-full flex items-center justify-center font-mono text-xs ${step === 1 ? 'bg-gold-500 text-charcoal-950 font-bold' : 'bg-gold-400/20 text-gold-200'}`}>
                          1
                        </span>
                        <span className={`text-[11px] font-mono uppercase tracking-widest ${step === 1 ? 'text-white' : 'text-stone-400'}`}>Delivery</span>
                      </div>
                      
                      <div className="w-10 h-[1px] bg-white/[0.06]" />

                      <div className="flex items-center space-x-2">
                        <span className={`w-6 h-6 rounded-full flex items-center justify-center font-mono text-xs ${step === 2 ? 'bg-gold-500 text-charcoal-950 font-bold' : 'bg-gold-400/20 text-gold-200'}`}>
                          2
                        </span>
                        <span className={`text-[11px] font-mono uppercase tracking-widest ${step === 2 ? 'text-white' : 'text-stone-400'}`}>Billing</span>
                      </div>
                    </div>
                  )}

                  <AnimatePresence mode="wait">
                    
                    {/* --- STEP 1: SHIPPING FORM --- */}
                    {step === 1 && (
                      <motion.div
                        key="shipping-panel"
                        initial={{ opacity: 0, x: -15 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 15 }}
                        transition={{ duration: 0.25 }}
                        className="space-y-6"
                      >
                        <div className="flex items-center justify-between pb-3.5 border-b border-white/[0.04]">
                          <h3 className="font-serif text-xl font-bold tracking-wide text-white">Contact & Delivery Spec</h3>
                          <button
                            id="close-checkout-header-btn"
                            onClick={() => setCheckoutOpen(false)}
                            className="p-1 px-2.5 bg-white/[0.02] border border-white/[0.05] rounded-md text-xs font-mono tracking-wider text-stone-400 hover:text-white transition"
                          >
                            Cancel
                          </button>
                        </div>

                        <form onSubmit={handleShippingSubmit} className="space-y-4">
                          <div className="space-y-1">
                            <label className="text-[10px] font-mono uppercase tracking-wider text-stone-400">Email Address</label>
                            <input
                              type="email"
                              required
                              value={shippingForm.email}
                              onChange={(e) => setShippingForm({ ...shippingForm, email: e.target.value })}
                              placeholder="luxurious.shopper@lumina.com"
                              className="w-full bg-charcoal-950/80 border border-white/[0.08] rounded-lg px-3.5 py-3 text-sm text-white focus:border-gold-300 outline-none"
                            />
                          </div>

                          <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-1">
                              <label className="text-[10px] font-mono uppercase tracking-wider text-stone-400">First Name</label>
                              <input
                                type="text"
                                required
                                value={shippingForm.firstName}
                                onChange={(e) => setShippingForm({ ...shippingForm, firstName: e.target.value })}
                                placeholder="Regina"
                                className="w-full bg-charcoal-950/80 border border-white/[0.08] rounded-lg px-3.5 py-3 text-sm text-white focus:border-gold-300 outline-none"
                              />
                            </div>
                            <div className="space-y-1">
                              <label className="text-[10px] font-mono uppercase tracking-wider text-stone-400">Last Name</label>
                              <input
                                type="text"
                                required
                                value={shippingForm.lastName}
                                onChange={(e) => setShippingForm({ ...shippingForm, lastName: e.target.value })}
                                placeholder="Glow"
                                className="w-full bg-charcoal-950/80 border border-white/[0.08] rounded-lg px-3.5 py-3 text-sm text-white focus:border-gold-300 outline-none"
                              />
                            </div>
                          </div>

                          <div className="space-y-1">
                            <label className="text-[10px] font-mono uppercase tracking-wider text-stone-400">Shipping Address Details</label>
                            <input
                              type="text"
                              required
                              value={shippingForm.address}
                              onChange={(e) => setShippingForm({ ...shippingForm, address: e.target.value })}
                              placeholder="742 Evergreen Terrace Suite B"
                              className="w-full bg-charcoal-950/80 border border-white/[0.08] rounded-lg px-3.5 py-3 text-sm text-white focus:border-gold-300 outline-none"
                            />
                          </div>

                          <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-1">
                              <label className="text-[10px] font-mono uppercase tracking-wider text-stone-400">City</label>
                              <input
                                type="text"
                                required
                                value={shippingForm.city}
                                onChange={(e) => setShippingForm({ ...shippingForm, city: e.target.value })}
                                placeholder="Beverly Hills"
                                className="w-full bg-charcoal-950/80 border border-white/[0.08] rounded-lg px-3.5 py-3 text-sm text-white focus:border-gold-300 outline-none"
                              />
                            </div>
                            <div className="space-y-1">
                              <label className="text-[10px] font-mono uppercase tracking-wider text-stone-400">Zip / Postal Code</label>
                              <input
                                type="text"
                                required
                                value={shippingForm.zipCode}
                                onChange={(e) => setShippingForm({ ...shippingForm, zipCode: e.target.value })}
                                placeholder="90210"
                                className="w-full bg-charcoal-950/80 border border-white/[0.08] rounded-lg px-3.5 py-3 text-sm text-white focus:border-gold-300 outline-none"
                              />
                            </div>
                          </div>

                          <div className="space-y-1">
                            <label className="text-[10px] font-mono uppercase tracking-wider text-stone-400">Phone</label>
                            <input
                              type="tel"
                              required
                              value={shippingForm.phone}
                              onChange={(e) => setShippingForm({ ...shippingForm, phone: e.target.value })}
                              placeholder="+1 (310) 555-0199"
                              className="w-full bg-charcoal-950/80 border border-white/[0.08] rounded-lg px-3.5 py-3 text-sm text-white focus:border-gold-300 outline-none"
                            />
                          </div>

                          <button
                            id="shipping-next-btn"
                            type="submit"
                            className="w-full py-4 bg-gradient-to-r from-gold-500 to-gold-400 text-charcoal-950 font-mono text-xs font-bold tracking-widest uppercase rounded-lg flex items-center justify-center space-x-2 mt-6 cursor-pointer"
                          >
                            <span>Next: Enter Secured Billing</span>
                            <ArrowRight className="w-4 h-4" />
                          </button>
                        </form>
                      </motion.div>
                    )}

                    {/* --- STEP 2: BILLING FORM --- */}
                    {step === 2 && (
                      <motion.div
                        key="billing-panel"
                        initial={{ opacity: 0, x: -15 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 15 }}
                        transition={{ duration: 0.25 }}
                        className="space-y-6"
                      >
                        <div className="flex items-center justify-between pb-3.5 border-b border-white/[0.04]">
                          <button
                            id="billing-back-btn"
                            onClick={() => setStep(1)}
                            className="inline-flex items-center text-xs font-mono text-stone-400 hover:text-white"
                          >
                            <ArrowLeft className="w-3.5 h-3.5 mr-1" />
                            Back to shipping
                          </button>
                          <span className="text-xs font-mono text-gold-300 flex items-center">
                            <Lock className="w-3 h-3 mr-1" />
                            Secure Card SSL Encryption
                          </span>
                        </div>

                        {/* High-Fidelity Interactive Visual Credit Card Preview Card */}
                        <div className="relative w-full aspect-[1.58/1] bg-gradient-to-tr from-gold-800 via-charcoal-800 to-charcoal-950 border border-gold-400/20 rounded-2xl p-6 flex flex-col justify-between overflow-hidden shadow-xl shadow-gold-900/10">
                          <div className="absolute top-0 right-0 w-36 h-36 bg-gold-400/5 rounded-full blur-2xl" />
                          
                          <div className="flex items-center justify-between relative z-10">
                            <Landmark className="w-8 h-8 text-gold-200 stroke-[1.2]" />
                            <span className="font-mono text-[9px] tracking-widest text-gold-300 uppercase">
                              LUMINA PREMIUM CARD
                            </span>
                          </div>

                          <div className="mt-8 relative z-10">
                            <div className="text-white font-mono text-xl sm:text-2xl tracking-widest">
                              {cardForm.cardNumber || '•••• •••• •••• ••••'}
                            </div>
                          </div>

                          <div className="flex justify-between items-end mt-4 relative z-10 font-mono text-[10px]">
                            <div>
                              <span className="block text-[8px] text-stone-400 uppercase tracking-widest mb-0.5">Cardholder</span>
                              <span className="text-white uppercase font-bold tracking-wider">
                                {cardForm.cardholderName || 'REGINA GLOW'}
                              </span>
                            </div>
                            <div className="text-right">
                              <span className="block text-[8px] text-stone-400 uppercase tracking-widest mb-0.5">Expires</span>
                              <span className="text-white font-bold">{cardForm.expiryDate || 'MM/YY'}</span>
                            </div>
                          </div>
                        </div>

                        {/* Credit Card Details Form */}
                        <form onSubmit={handlePaymentSubmit} className="space-y-4 pt-2">
                          <div className="space-y-1">
                            <label className="text-[10px] font-mono uppercase tracking-wider text-stone-400">Cardholder Name</label>
                            <input
                              type="text"
                              required
                              value={cardForm.cardholderName}
                              onChange={(e) => setCardForm({ ...cardForm, cardholderName: e.target.value.toUpperCase() })}
                              placeholder="REGINA GLOW"
                              className="w-full bg-charcoal-950/80 border border-white/[0.08] rounded-lg px-3.5 py-3 text-sm text-white focus:border-gold-300 outline-none"
                            />
                          </div>

                          <div className="space-y-1">
                            <label className="text-[10px] font-mono uppercase tracking-wider text-stone-400">Card Number</label>
                            <div className="relative flex items-center">
                              <input
                                type="text"
                                required
                                value={cardForm.cardNumber}
                                onChange={handleCardNumberChange}
                                placeholder="4111 2222 3333 4444"
                                className="w-full bg-charcoal-950/80 border border-white/[0.08] rounded-lg pl-3.5 pr-10 py-3 text-sm text-white focus:border-gold-300 outline-none font-mono"
                              />
                              <CreditCard className="w-4 h-4 text-stone-500 absolute right-3" />
                            </div>
                          </div>

                          <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-1">
                              <label className="text-[10px] font-mono uppercase tracking-wider text-stone-400">Expiry Date</label>
                              <input
                                type="text"
                                required
                                value={cardForm.expiryDate}
                                onChange={(e) => setCardForm({ ...cardForm, expiryDate: e.target.value })}
                                placeholder="MM/YY"
                                className="w-full bg-charcoal-950/80 border border-white/[0.08] rounded-lg px-3.5 py-3 text-sm text-white focus:border-gold-300 outline-none font-mono"
                              />
                            </div>
                            <div className="space-y-1">
                              <label className="text-[10px] font-mono uppercase tracking-wider text-stone-400">CVV / Security CVC</label>
                              <input
                                type="password"
                                required
                                value={cardForm.cvc}
                                onChange={(e) => setCardForm({ ...cardForm, cvc: e.target.value.slice(0, 4) })}
                                placeholder="•••"
                                className="w-full bg-charcoal-950/80 border border-white/[0.08] rounded-lg px-3.5 py-3 text-sm text-white focus:border-gold-300 outline-none font-mono"
                              />
                            </div>
                          </div>

                          <button
                            id="payment-submit-btn"
                            type="submit"
                            disabled={loadingPayment}
                            className="w-full py-4 bg-gradient-to-r from-gold-500 to-gold-400 text-charcoal-950 font-mono text-xs font-bold tracking-widest uppercase rounded-lg flex items-center justify-center space-x-2 mt-6 cursor-pointer disabled:opacity-50"
                          >
                            {loadingPayment ? (
                              <div className="w-5 h-5 border-2 border-charcoal-950 border-t-transparent rounded-full animate-spin" />
                            ) : (
                              <>
                                <Lock className="w-4 h-4" />
                                <span>Pay Securely: ${grandTotal.toLocaleString()}</span>
                              </>
                            )}
                          </button>
                        </form>
                      </motion.div>
                    )}

                    {/* --- STEP 3: SUCCESSFUL RECEIPT INVOICE TICKET --- */}
                    {step === 3 && (
                      <motion.div
                        key="success-panel"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.4 }}
                        className="text-center py-6 space-y-6"
                      >
                        <div className="w-16 h-16 bg-gold-400/10 border border-gold-400/20 text-gold-300 rounded-full flex items-center justify-center mx-auto shadow-lg shadow-gold-500/10">
                          <Check className="w-8 h-8 stroke-[2.5] animate-scale" />
                        </div>

                        <div>
                          <h3 className="font-serif text-2xl font-bold tracking-tight text-white">Your Order is Confirmed</h3>
                          <p className="text-xs text-stone-400 mt-1 uppercase tracking-widest font-mono">
                            Thank you for shopping with Lumina Collective
                          </p>
                        </div>

                        {/* Confirmed Invoice Ticket block */}
                        <div className="bg-charcoal-950 border border-white/[0.05] rounded-xl p-5 text-left font-mono text-xs space-y-3 relative overflow-hidden">
                          {/* Inner barcode decor */}
                          <div className="absolute top-4 right-4 text-stone-600 tracking-[0.3em] text-[10px]">
                            ||||| |||| || |||
                          </div>

                          <div className="text-[10px] text-gold-300 tracking-wider">ORDER RECEIPT</div>
                          
                          <div className="grid grid-cols-2 gap-2 text-stone-400 border-b border-white/[0.04] pb-3 text-[11px]">
                            <div>
                              <span>Receipt ID:</span>
                              <span className="block text-white font-medium mt-0.5">LM-8429-4820</span>
                            </div>
                            <div>
                              <span>Order Time:</span>
                              <span className="block text-white font-medium mt-0.5">June 10, 2026</span>
                            </div>
                            <div className="mt-1.5">
                              <span>Shipped To:</span>
                              <span className="block text-white font-medium mt-0.5">
                                {shippingForm.firstName} {shippingForm.lastName}
                              </span>
                            </div>
                            <div className="mt-1.5">
                              <span>Est. Delivery Date:</span>
                              <span className="block text-gold-200 font-semibold mt-0.5">
                                June 13, 2026 (Express)
                              </span>
                            </div>
                          </div>

                          <div className="space-y-1.5 pt-1 text-[11px] text-stone-400">
                            {cart.map((cx) => (
                              <div key={cx.id} className="flex justify-between">
                                <span className="truncate max-w-[200px]">{cx.product.name} x{cx.quantity}</span>
                                <span className="text-white">${(cx.product.price * cx.quantity).toLocaleString()}</span>
                              </div>
                            ))}
                            <div className="flex justify-between text-white font-bold border-t border-white/[0.04] pt-2.5 mt-2">
                              <span>Total Charged</span>
                              <span>${grandTotal.toLocaleString()}</span>
                            </div>
                          </div>
                        </div>

                        <p className="text-xs text-stone-400 leading-relaxed max-w-md mx-auto">
                          A securing invoice has been dispatched to <strong className="text-white">{shippingForm.email}</strong>. 
                          Live tracking details will activate as the shipment passes quality checking at our distribution center.
                        </p>

                        <button
                          id="success-home-btn"
                          onClick={handleReturnToLumina}
                          className="w-full py-3.5 bg-gradient-to-r from-gold-500 to-gold-400 text-charcoal-950 font-mono text-xs font-bold tracking-widest uppercase rounded-lg cursor-pointer"
                        >
                          Return to Lumina Home
                        </button>
                      </motion.div>
                    )}

                  </AnimatePresence>
                </div>

                {/* --- RIGHT HAND: SUMMARIZATION COLUMN (Span 5) --- */}
                <div className="lg:col-span-5 bg-charcoal-950 p-6 sm:p-8 flex flex-col justify-between text-left border-t lg:border-t-0 border-white/[0.05]">
                  <div>
                    <h4 className="font-serif text-base font-semibold text-white mb-4 tracking-wide">Order Summary</h4>
                    
                    {/* Render minimal cart preview */}
                    <div className="space-y-3 max-h-64 overflow-y-auto pr-1 no-scrollbar border-b border-white/[0.04] pb-4">
                      {cart.map((cx) => (
                        <div key={cx.id} className="flex items-center space-x-3 text-xs">
                          <img
                            src={cx.product.primaryImage}
                            alt={cx.product.name}
                            className="w-10 h-12 object-cover rounded border border-white/[0.06]"
                          />
                          <div className="flex-1 min-w-0">
                            <span className="text-[8px] font-mono text-gold-400 uppercase tracking-widest block">{cx.product.world}</span>
                            <h5 className="text-white font-sans font-medium hover:text-gold-200 truncate leading-snug">{cx.product.name}</h5>
                            <span className="block text-[9px] text-stone-500 font-mono">
                              Qty {cx.quantity} {cx.selectedSize ? `• Size ${cx.selectedSize}` : ''}
                            </span>
                          </div>
                          <span className="font-mono text-white text-[11px]">${(cx.product.price * cx.quantity).toLocaleString()}</span>
                        </div>
                      ))}
                    </div>

                    {/* Detailed price breakdown list */}
                    <div className="space-y-2 mt-5 text-[11px] font-mono text-stone-400">
                      <div className="flex justify-between">
                        <span>Bag Subtotal</span>
                        <span className="text-white">${subtotal.toLocaleString()}</span>
                      </div>
                      {discountPercent > 0 && (
                        <div className="flex justify-between text-gold-200">
                          <span>Luxury Bundle Saver ({discountPercent}%)</span>
                          <span>-${discountValue.toLocaleString()}</span>
                        </div>
                      )}
                      <div className="flex justify-between">
                        <span>Sales Tax (8%)</span>
                        <span className="text-white">${taxCost.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Courier Shipping</span>
                        <span className="text-white">
                          {deliveryCost === 0 ? <strong className="text-gold-300">FREE EXPRESS</strong> : `$${deliveryCost.toFixed(0)}`}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Absolute total block */}
                  <div className="border-t border-white/[0.04] pt-4 mt-8">
                    <div className="flex justify-between text-sm uppercase tracking-wide font-bold">
                      <span className="text-stone-300">TOTAL CHARGED</span>
                      <span className="text-white font-mono text-lg">${grandTotal.toLocaleString()}</span>
                    </div>
                    
                    <div className="flex items-center space-x-2 bg-white/[0.02] border border-white/[0.04] rounded p-2.5 mt-4 text-[10px] text-stone-500 leading-snug">
                      <ShieldCheck className="w-5 h-5 text-gold-400 flex-shrink-0" />
                      <p>
                        Secure transaction processed using 256-bit AES-GCM vault security. Lumina preserves zero payment details on our local server.
                      </p>
                    </div>
                  </div>

                </div>

              </div>

            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
}
