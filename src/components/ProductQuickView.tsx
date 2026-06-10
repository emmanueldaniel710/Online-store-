/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { useLumina } from '../context/LuminaContext';
import { X, Star, ShoppingBag, Check, Compass, Sparkles, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function ProductQuickView() {
  const { quickViewProduct, setQuickViewProduct, addToCart, wishlist, toggleWishlist } = useLumina();
  
  const [selectedColor, setSelectedColor] = useState('');
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedMetal, setSelectedMetal] = useState('');
  const [selectedShade, setSelectedShade] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [sizeGuideOpen, setSizeGuideOpen] = useState(false);

  // Sync state with matching product specifications on trigger
  useEffect(() => {
    if (quickViewProduct) {
      setSelectedColor(quickViewProduct.colorSwatches?.[0]?.name || '');
      setSelectedSize(quickViewProduct.sizeOptions?.[0] || '');
      setSelectedMetal(quickViewProduct.metalTypes?.[0] || '');
      setSelectedShade(quickViewProduct.shades?.[0]?.name || '');
      setQuantity(1);
      setSizeGuideOpen(false);
    }
  }, [quickViewProduct]);

  if (!quickViewProduct) return null;

  const product = quickViewProduct;
  const isFavorited = wishlist.includes(product.id);

  const handleAggregateAdd = () => {
    addToCart(product, quantity, {
      selectedColor: selectedColor || undefined,
      selectedSize: selectedSize || undefined,
      selectedMetal: selectedMetal || undefined,
      selectedShade: selectedShade || undefined,
    });
    setQuickViewProduct(null);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        
        {/* Click layer backdrop cover */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setQuickViewProduct(null)}
          className="absolute inset-0 bg-charcoal-950/85 backdrop-blur-sm cursor-pointer"
        />

        {/* Floating details wrapper card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: -15 }}
          className="relative w-full max-w-4xl bg-gradient-to-b from-charcoal-900 to-charcoal-950 border border-white/[0.08] rounded-2xl p-5 sm:p-8 shadow-2xl overflow-y-auto max-h-[92vh]"
        >
          {/* Close button indicator */}
          <button
            id="close-quickview-btn"
            onClick={() => setQuickViewProduct(null)}
            className="absolute top-4 right-4 z-30 p-2.5 bg-white/[0.02] hover:bg-white/[0.1] text-stone-400 hover:text-white rounded-full border border-white/[0.05] transition cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-10 text-left mt-2">
            
            {/* Visual Column / Gallery stage */}
            <div className="space-y-4">
              <div className="relative aspect-[4/5] overflow-hidden rounded-xl bg-charcoal-950 border border-white/[0.06]">
                <img
                  src={product.primaryImage}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
                
                {/* Visual try-on decoration highlight if makeup */}
                {product.world === 'makeup' && (
                  <div className="absolute bottom-3 left-3 bg-rose-500/15 border border-rose-500/25 text-rose-300 px-2.5 py-1 rounded-full text-[9px] font-mono uppercase tracking-wider flex items-center mb-1">
                    <Sparkles className="w-3 h-3 mr-1.5 text-rose-300 animate-pulse" />
                    Interactive Shade Match Support Active
                  </div>
                )}
                {product.world === 'jewelry' && (
                  <div className="absolute bottom-3 left-3 bg-gold-400/15 border border-gold-400/20 text-gold-300 px-2.5 py-1 rounded-full text-[9px] font-mono uppercase tracking-wider flex items-center mb-1">
                    <Check className="w-3 h-3 mr-1.5 text-gold-400" />
                    Conflict-Free GIA Verified Diamond
                  </div>
                )}
              </div>

              {/* Thumbnail snapshots loop */}
              <div className="grid grid-cols-2 gap-3">
                <img
                  src={product.primaryImage}
                  alt="Front Angle view"
                  className="aspect-[4/3] object-cover rounded-lg border border-gold-400/20 cursor-pointer hover:border-gold-400 transition"
                />
                <img
                  src={product.hoverImage}
                  alt="Alternate Details close-up"
                  className="aspect-[4/3] object-cover rounded-lg border border-white/[0.05] cursor-pointer hover:border-gold-300/30 transition"
                />
              </div>
            </div>

            {/* Spec Options Column */}
            <div className="flex flex-col justify-between">
              <div>
                
                {/* Tag banner */}
                <div className="flex items-center space-x-2">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-gold-400 bg-gold-500/5 px-2.5 py-1 rounded border border-gold-500/10">
                    {product.world} world
                  </span>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-stone-500">
                    ID: {product.id}
                  </span>
                </div>

                {/* Name & price block */}
                <h2 className="font-serif text-2xl font-bold tracking-tight text-white mt-3 leading-tight">
                  {product.name}
                </h2>

                <div className="flex items-center space-x-4 mt-3">
                  <span className="text-xl font-mono font-semibold text-white">
                    ${product.price.toLocaleString()}
                  </span>
                  
                  {/* Reviews rating check */}
                  <div className="flex items-center space-x-1.5">
                    <div className="flex items-center text-gold-400">
                      <Star className="w-3.5 h-3.5 fill-current" />
                      <span className="text-xs font-semibold text-white ml-1">{product.rating}</span>
                    </div>
                    <span className="text-stone-500 text-xs font-mono">({product.reviewsCount} reviews)</span>
                  </div>
                </div>

                {/* Narrative description */}
                <p className="text-xs sm:text-sm text-stone-300 mt-4 leading-relaxed">
                  {product.description}
                </p>

                {/* SPEC SELECTORS CONTAINER */}
                <div className="mt-6 space-y-4 border-t border-b border-white/[0.05] py-5">
                  
                  {/* Option Metal selection (Jewelry focus) */}
                  {product.metalTypes && (
                    <div>
                      <span className="block text-[10px] font-mono uppercase tracking-wider text-stone-400 mb-2">
                        Select Metal Finish: <strong className="text-white">{selectedMetal}</strong>
                      </span>
                      <div className="flex flex-wrap gap-2">
                        {product.metalTypes.map((metal) => (
                          <button
                            key={metal}
                            id={`quickview-metal-${metal.replace(/\s+/g, '-').toLowerCase()}`}
                            onClick={() => setSelectedMetal(metal)}
                            className={`px-3 py-1.5 rounded text-xs font-mono uppercase border transition-all cursor-pointer ${
                              selectedMetal === metal
                                ? 'border-gold-400 text-gold-300 bg-gold-400/5'
                                : 'border-white/[0.05] bg-white/[0.01] text-stone-400 hover:text-white'
                            }`}
                          >
                            {metal}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Option color swatches selection (Clothing/Shoes focus) */}
                  {product.colorSwatches && (
                    <div>
                      <span className="block text-[10px] font-mono uppercase tracking-wider text-stone-400 mb-2">
                        Available Shades: <strong className="text-white">{selectedColor}</strong>
                      </span>
                      <div className="flex items-center space-x-3">
                        {product.colorSwatches.map((color) => (
                          <button
                            key={color.name}
                            id={`quickview-color-${color.name.replace(/\s+/g, '-').toLowerCase()}`}
                            onClick={() => setSelectedColor(color.name)}
                            className={`w-6 h-6 rounded-full border transition-transform ${
                              selectedColor === color.name
                                ? 'border-gold-300 scale-125 ring-2 ring-gold-400/20'
                                : 'border-white/[0.1] hover:scale-110'
                            }`}
                            style={{ backgroundColor: color.hex }}
                            title={color.name}
                          />
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Material specifics swatches (Makeup highlights) */}
                  {product.shades && (
                    <div>
                      <span className="block text-[10px] font-mono uppercase tracking-wider text-stone-400 mb-2">
                        Lip Shade Colors: <strong className="text-white">{selectedShade}</strong>
                      </span>
                      <div className="flex items-center space-x-3">
                        {product.shades.map((shade) => (
                          <button
                            key={shade.name}
                            id={`quickview-shade-${shade.name.replace(/\s+/g, '-').toLowerCase()}`}
                            onClick={() => setSelectedShade(shade.name)}
                            className={`w-6 h-6 rounded-full border transition-transform ${
                              selectedShade === shade.name
                                ? 'border-gold-300 scale-125 ring-2 ring-gold-400/20'
                                : 'border-white/[0.1] hover:scale-110'
                            }`}
                            style={{ backgroundColor: shade.hex }}
                            title={shade.name}
                          />
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Option sizes selection with guide toggle */}
                  {product.sizeOptions && (
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[10px] font-mono uppercase tracking-wider text-stone-400">
                          Select Size (IT/FR): <strong className="text-white">{selectedSize}</strong>
                        </span>
                        
                        <button
                          id="quickview-sizeguide-trigger"
                          onClick={() => setSizeGuideOpen(!sizeGuideOpen)}
                          className="text-[9px] font-mono uppercase tracking-wider text-gold-300 hover:text-white transition cursor-pointer"
                        >
                          Size Guide [?]
                        </button>
                      </div>

                      {sizeGuideOpen && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          className="mb-3.5 bg-charcoal-950 p-2.5 rounded border border-white/[0.04] text-[10px] text-stone-400 space-y-1"
                        >
                          <div className="font-bold text-white uppercase tracking-wider">Lumina Standard Fit Matrix:</div>
                          <div>S: Fits Bust 33&rdquo; - 34&rdquo; • Waist 25&rdquo;-26&rdquo; • Hips 36&rdquo;-37&rdquo;</div>
                          <div>M: Fits Bust 35&rdquo; - 36&rdquo; • Waist 27&rdquo;-28&rdquo; • Hips 38&rdquo;-39&rdquo;</div>
                          <div>L: Fits Bust 37&rdquo; - 39&rdquo; • Waist 29&rdquo;-31&rdquo; • Hips 40&rdquo;-42&rdquo;</div>
                          <div className="text-gold-200">Recommendation: Fits true to Italian tailoring measures</div>
                        </motion.div>
                      )}

                      <div className="flex flex-wrap gap-2">
                        {product.sizeOptions.map((size) => (
                          <button
                            key={size}
                            id={`quickview-size-${size}`}
                            onClick={() => setSelectedSize(size)}
                            className={`w-10 h-10 rounded-lg flex items-center justify-center font-mono text-xs border transition-all cursor-pointer ${
                              selectedSize === size
                                ? 'border-gold-400 text-gold-300 bg-gold-400/5 font-semibold'
                                : 'border-white/[0.05] bg-white/[0.01] text-stone-400 hover:text-white'
                            }`}
                          >
                            {size}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Specialty Material/Ingredients ingredients block */}
                  {product.ingredientHighlights && (
                    <div>
                      <span className="block text-[10px] font-mono uppercase tracking-wider text-stone-400 mb-1.5">
                        Luminous Clean Active Ingredients:
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {product.ingredientHighlights.map((ing) => (
                          <span
                            key={ing}
                            className="px-2 py-0.5 bg-rose-500/5 border border-rose-400/10 rounded-full font-mono text-[9px] text-rose-300 text-stone-300"
                          >
                            ✦ {ing}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Featured point lists */}
                  {product.detailsList && (
                    <ul className="text-[11px] text-stone-400 space-y-1 pl-4 list-disc">
                      {product.detailsList.map((dt, idx) => (
                        <li key={idx}>{dt}</li>
                      ))}
                    </ul>
                  )}

                </div>
              </div>

              {/* Action counter adding to bag block */}
              <div className="mt-6 flex items-center justify-between gap-4">
                
                {/* Custom quality items quantity counter */}
                <div className="flex flex-col">
                  <span className="text-[9px] font-mono uppercase tracking-wider text-stone-500 mb-1">Quantity</span>
                  <div className="flex items-center bg-charcoal-950 border border-white/[0.08] rounded-lg">
                    <button
                      id="dec-qty-btn"
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="px-3.5 py-2.5 text-stone-400 hover:text-white font-mono text-sm border-r border-white/[0.05] cursor-pointer"
                    >
                      -
                    </button>
                    <span className="w-10 text-center font-mono text-xs text-white">
                      {quantity}
                    </span>
                    <button
                      id="inc-qty-btn"
                      onClick={() => setQuantity(quantity + 1)}
                      className="px-3.5 py-2.5 text-stone-400 hover:text-white font-mono text-sm border-l border-white/[0.05] cursor-pointer"
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="flex-1 flex flex-col pt-4">
                  <span className="text-[9px] font-mono uppercase tracking-wider text-stone-500 text-right mb-1">
                    Total: <strong className="text-white">${(product.price * quantity).toLocaleString()}</strong>
                  </span>
                  <button
                    id="add-bag-submit-btn"
                    onClick={handleAggregateAdd}
                    className="w-full py-3.5 bg-gradient-to-r from-gold-500 to-gold-300 hover:from-gold-400 hover:to-gold-200 text-charcoal-950 font-mono text-xs font-bold tracking-widest uppercase rounded-lg flex items-center justify-center space-x-2.5 shadow-xl shadow-gold-500/10 cursor-pointer"
                  >
                    <ShoppingBag className="w-4 h-4 stroke-[2]" />
                    <span>Add To Shopping Bag</span>
                  </button>
                </div>

              </div>

            </div>

          </div>

        </motion.div>
      </div>
    </AnimatePresence>
  );
}
