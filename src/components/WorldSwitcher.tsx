/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { useLumina } from '../context/LuminaContext';
import { BRAND_WORLDS, PRODUCTS } from '../data';
import { motion, AnimatePresence } from 'motion/react';
import { X, Sparkles, Check, ArrowRight, Compass } from 'lucide-react';

export default function WorldSwitcher() {
  const {
    activeWorld,
    setActiveWorld,
    chooseWorldOpen,
    setChooseWorldOpen,
  } = useLumina();

  const handleWorldSelect = (worldId: typeof activeWorld) => {
    setActiveWorld(worldId);
    setChooseWorldOpen(false);
    
    // Smooth scroll directly to target section
    const element = document.getElementById(`world-section-${worldId}`);
    if (element) {
      setTimeout(() => {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    }
  };

  return (
    <AnimatePresence>
      {chooseWorldOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          
          {/* Backdrop blur click layer */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setChooseWorldOpen(false)}
            className="absolute inset-x-0 inset-y-0 bg-charcoal-950/90 backdrop-blur-md cursor-pointer"
          />

          {/* Interactive Modal Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ type: 'spring', damping: 25, stiffness: 180 }}
            className="relative w-full max-w-4xl bg-gradient-to-b from-charcoal-900 to-charcoal-950 border border-white/[0.08] rounded-2xl p-6 sm:p-10 shadow-2xl overflow-hidden text-left"
          >
            {/* Elegant Background Gold Swirl */}
            <div className="absolute top-0 right-0 w-80 h-80 bg-gold-400/5 rounded-full blur-[100px] pointer-events-none" />
            <div className="absolute -bottom-10 -left-10 w-80 h-80 bg-charcoal-800/20 rounded-full blur-[80px] pointer-events-none" />

            {/* Header Dialog elements */}
            <div className="flex items-center justify-between pb-6 border-b border-white/[0.06] relative z-10">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-gold-500/10 rounded-full border border-gold-400/20 text-gold-300">
                  <Compass className="w-5 h-5 animate-spin-slow" />
                </div>
                <div>
                  <h3 className="font-serif text-xl sm:text-2xl font-semibold tracking-wide text-white">
                    Choose Your World
                  </h3>
                  <p className="text-[10px] sm:text-xs text-stone-400 uppercase tracking-widest mt-0.5">
                    Transition your style space instantly
                  </p>
                </div>
              </div>

              <button
                id="close-world-switcher-btn"
                onClick={() => setChooseWorldOpen(false)}
                className="p-2 bg-white/[0.02] border border-white/[0.05] rounded-full hover:bg-white/[0.1] hover:text-white text-stone-400 transition cursor-pointer"
                title="Close selector"
              >
                <X className="w-4.5 h-4.5" />
              </button>
            </div>

            {/* Description Body */}
            <p className="text-xs sm:text-sm text-stone-400 leading-relaxed max-w-2xl mt-4 relative z-10">
              Lumina Collective brings together five elite designer worlds within one responsive page. 
              Selecting a world instantly optimizes matching interactive collections, color palettes, and editorial content below.
            </p>

            {/* Brand Worlds Selector List */}
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mt-8 relative z-10">
              {BRAND_WORLDS.map((world, index) => {
                const isSelected = activeWorld === world.id;
                
                // Fetch first matching item as an artistic background preview
                const matchingItem = PRODUCTS.find((p) => p.world === world.id);
                const bgImage = matchingItem?.primaryImage;

                return (
                  <motion.button
                    id={`world-selector-card-${world.id}`}
                    key={world.id}
                    onClick={() => handleWorldSelect(world.id)}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    whileHover={{ y: -6, scale: 1.02 }}
                    className={`group relative h-64 md:h-72 rounded-xl text-left overflow-hidden border transition-all duration-300 flex flex-col justify-end p-4 cursor-pointer ${
                      isSelected
                        ? 'border-gold-400 shadow-[0_0_20px_rgba(186,158,78,0.15)] ring-1 ring-gold-400/30'
                        : 'border-white/[0.05] hover:border-gold-500/30 shadow'
                    }`}
                  >
                    {/* Background Visual Image Preview with dark gradient overlay */}
                    {bgImage && (
                      <div className="absolute inset-0">
                        <img
                          src={bgImage}
                          alt={world.label}
                          className="w-full h-full object-cover transition duration-700 ease-out group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950 via-charcoal-950/60 to-transparent transition-opacity duration-300 opacity-90 group-hover:opacity-100" />
                      </div>
                    )}

                    {/* Checkmark tag if actively selected */}
                    {isSelected && (
                      <div className="absolute top-3 left-3 bg-gradient-to-tr from-gold-500 to-gold-300 text-charcoal-950 p-1 rounded-full flex items-center justify-center border border-gold-300 shadow-md">
                        <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                      </div>
                    )}

                    <div className="relative z-10">
                      <span className="text-[10px] font-mono tracking-widest text-gold-400 uppercase">
                        {world.tag}
                      </span>
                      <h4 className="font-serif text-lg font-bold text-white leading-tight mt-0.5">
                        {world.label}
                      </h4>
                      
                      <div className="h-0 group-hover:h-12 overflow-hidden transition-all duration-300 ease-in-out">
                        <p className="text-[10px] text-stone-300 leading-snug mt-1.5 line-clamp-2">
                          {world.description}
                        </p>
                      </div>

                      <div className="inline-flex items-center space-x-1.5 text-[10px] uppercase tracking-widest text-gold-300 font-bold mt-3.5 border-t border-white/[0.08] pt-2 w-full justify-between">
                        <span>Enter World</span>
                        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </motion.button>
                );
              })}
            </div>

            {/* Bottom Brand Slogan Accents */}
            <div className="mt-8 flex items-center justify-between text-[11px] font-mono tracking-widest text-stone-500 border-t border-white/[0.05] pt-5 relative z-10 select-none">
              <span className="flex items-center">
                <Sparkles className="w-3.5 h-3.5 text-gold-400 mr-2" />
                ARTISANAL LUXURY MEETS DIGITAL PERFECTION
              </span>
              <span>PARIS / LONDON / NEW YORK</span>
            </div>

          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
