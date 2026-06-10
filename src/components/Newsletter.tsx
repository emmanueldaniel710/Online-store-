/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Mail, ArrowRight, Check, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    
    // Simple email regex validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setErrorMsg('Please enter a valid luxury email address.');
      return;
    }

    setSubscribed(true);
    setEmail('');
  };

  return (
    <section className="bg-charcoal-900 border-t border-b border-white/[0.04] py-16 sm:py-24 relative overflow-hidden text-left select-none">
      {/* Background ambient highlights */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gold-400/5 rounded-full blur-[150px] pointer-events-none" />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10 text-center">
        
        <div className="inline-flex items-center space-x-1.5 px-3 py-1 bg-gold-500/5 border border-gold-400/10 rounded-full text-[9px] font-mono tracking-widest text-gold-300 uppercase mb-4">
          <Sparkles className="w-3 h-3 text-gold-400 animate-pulse" />
          <span>Lumina Inner Circle</span>
        </div>

        <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-white tracking-tight leading-tight">
          Join the Lumina Collective
        </h2>
        
        <p className="text-[11px] sm:text-xs text-stone-400 uppercase tracking-widest font-mono mt-2">
          Priority Launch Alerts • Seasonal Lookbooks • Private Showings
        </p>

        <p className="text-stone-300 text-xs sm:text-sm mt-4 max-w-xl mx-auto leading-relaxed">
          Subscribers gain initial preview access to our seasonal runways, artisanal workshop videos, and a complimentary 10% welcome invitation vector code.
        </p>

        <div className="mt-10 max-w-md mx-auto">
          <AnimatePresence mode="wait">
            {!subscribed ? (
              <motion.form
                key="subscribe-form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onSubmit={handleSubscribe}
                className="space-y-4"
              >
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center bg-charcoal-950/80 border border-white/[0.08] focus-within:border-gold-300 rounded-lg overflow-hidden p-1.5 transition duration-300">
                  <div className="flex items-center flex-1 px-3 py-2 sm:py-0">
                    <Mail className="w-4 h-4 text-stone-500 mr-2.5 flex-shrink-0" />
                    <input
                      id="newsletter-email-input"
                      type="text"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email for private invites..."
                      className="w-full bg-transparent border-0 text-white outline-none focus:ring-0 text-xs sm:text-sm placeholder-stone-600"
                    />
                  </div>
                  
                  <button
                    id="newsletter-submit-btn"
                    type="submit"
                    className="py-3 px-6 bg-gradient-to-r from-gold-500 to-gold-400 hover:from-gold-400 hover:to-gold-200 text-charcoal-950 rounded-md text-xs font-mono font-bold tracking-widest uppercase flex items-center justify-center space-x-1.5 shadow transition-all cursor-pointer"
                  >
                    <span>Subscribe</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
                {errorMsg && (
                  <p className="text-[10px] sm:text-xs font-mono text-red-400 text-center">{errorMsg}</p>
                )}
              </motion.form>
            ) : (
              <motion.div
                key="subscription-success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-6 bg-gold-400/5 border border-gold-400/20 rounded-xl space-y-2.5"
              >
                <div className="w-10 h-10 bg-gold-400/10 border border-gold-400/20 rounded-full flex items-center justify-center mx-auto text-gold-300">
                  <Check className="w-5 h-5" />
                </div>
                <h4 className="font-serif text-lg font-bold text-white">Subscription Affirmed</h4>
                <p className="text-xs text-stone-400 leading-relaxed">
                  Welcome to the Collective. We have dispatched your unique 10% welcome invitation code to your inbox. Look forward to our upcoming Seasonal Digital Runways.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}
