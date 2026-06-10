/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Product } from '../types';
import { useLumina } from '../context/LuminaContext';
import { Star, Heart, Eye, ShoppingBag, Check } from 'lucide-react';
import { motion } from 'motion/react';

export default function ProductCard({ product }: { product: Product; key?: React.Key }) {
  const { addToCart, wishlist, toggleWishlist, setQuickViewProduct } = useLumina();
  const [hovered, setHovered] = useState(false);
  
  // Local option states for card preview (default to first available)
  const [selectedColor, setSelectedColor] = useState(product.colorSwatches?.[0]?.name || '');
  const [selectedSize, setSelectedSize] = useState(product.sizeOptions?.[0] || '');
  const [selectedMetal, setSelectedMetal] = useState(product.metalTypes?.[0] || '');
  const [selectedShade, setSelectedShade] = useState(product.shades?.[0]?.name || '');

  const isFavorited = wishlist.includes(product.id);

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product, 1, {
      selectedColor: selectedColor || undefined,
      selectedSize: selectedSize || undefined,
      selectedMetal: selectedMetal || undefined,
      selectedShade: selectedShade || undefined,
    });
  };

  return (
    <motion.div
      id={`product-card-${product.id}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="group relative flex flex-col bg-charcoal-900 border border-[#E6D5B8]/10 rounded-xl overflow-hidden card-shadow transition-all duration-300 hover:border-[#E6D5B8]/35 hover:shadow-2xl"
    >
      
      {/* Product Image Stage */}
      <div className="relative aspect-[3/4] overflow-hidden bg-charcoal-950">
        
        {/* Wishlist Toggler (Heart) */}
        <button
          id={`wishlist-btn-${product.id}`}
          onClick={(e) => {
            e.stopPropagation();
            toggleWishlist(product.id);
          }}
          className="absolute top-3.5 right-3.5 z-20 p-2.5 bg-charcoal-950/80 hover:bg-charcoal-900 border border-white/[0.05] rounded-full text-stone-300 hover:text-gold-300 transition-all duration-300 cursor-pointer"
          title={isFavorited ? 'Remove from Wishlist' : 'Add to Wishlist'}
        >
          <Heart
            className={`w-[15px] h-[15px] transition-transform group-hover:scale-110 ${
              isFavorited ? 'fill-gold-300 text-gold-300 scale-105' : ''
            }`}
          />
        </button>

        {/* Floating Specialty Badges */}
        <div className="absolute top-3.5 left-3.5 z-20 flex flex-col space-y-1">
          {product.isBestSeller && (
            <span className="px-2 py-0.5 bg-gradient-to-r from-gold-500 to-gold-400 text-charcoal-950 font-mono text-[8px] font-bold tracking-widest uppercase rounded">
              BEST SELLER
            </span>
          )}
          {product.isNewArrival && (
            <span className="px-2 py-0.5 bg-white text-charcoal-950 font-mono text-[8px] font-bold tracking-widest uppercase rounded">
              JUST DROPPED
            </span>
          )}
        </div>

        {/* Primary and Secondary Alternate hover crossfade images */}
        <div className="absolute inset-0 w-full h-full cursor-pointer" onClick={() => setQuickViewProduct(product)}>
          <img
            src={product.primaryImage}
            alt={product.name}
            className={`w-full h-full object-cover transition-all duration-[800ms] ${
              hovered ? 'scale-105 opacity-0' : 'scale-100 opacity-100'
            }`}
          />
          <img
            src={product.hoverImage}
            alt={`${product.name} Detail`}
            className={`absolute inset-0 w-full h-full object-cover transition-all duration-[800ms] ${
              hovered ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
            }`}
          />
        </div>

        {/* Slide-Up Hover action overlays */}
        <div className="absolute inset-x-0 bottom-0 z-20 p-4 bg-gradient-to-t from-charcoal-950 via-charcoal-950/40 to-transparent flex flex-col space-y-2 translate-y-2 group-hover:translate-y-0 transition-all duration-300 opacity-0 group-hover:opacity-100">
          <button
            id={`quick-view-btn-${product.id}`}
            onClick={() => setQuickViewProduct(product)}
            className="w-full inline-flex items-center justify-center space-x-2 py-2 bg-charcoal-900/90 hover:bg-charcoal-800 border border-white/[0.08] text-white rounded text-[10px] font-mono tracking-wider uppercase transition cursor-pointer"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Quick View</span>
          </button>
        </div>
      </div>

      {/* Product Information Body */}
      <div className="p-4 flex-1 flex flex-col justify-between text-left">
        
        <div>
          {/* Top category/collection info */}
          <div className="flex items-center justify-between text-[9px] font-mono tracking-widest text-gold-400 uppercase">
            <span>{product.world}</span>
            <span>{product.tags[0]}</span>
          </div>

          {/* Product Name */}
          <h4
            onClick={() => setQuickViewProduct(product)}
            className="font-serif text-sm font-semibold text-white tracking-wide mt-1 hover:text-gold-200 cursor-pointer line-clamp-2 min-h-[40px] leading-tight transition-colors duration-200"
          >
            {product.name}
          </h4>

          {/* Sizing, shade, or color indicators based on category */}
          <div className="mt-3.5 min-h-[20px]">
            {/* Color swatches */}
            {product.colorSwatches && product.colorSwatches.length > 0 && (
              <div className="flex items-center space-x-1.5" title="Available Colors">
                {product.colorSwatches.map((color) => (
                  <button
                    key={color.name}
                    id={`color-swatch-btn-${product.id}-${color.name.replace(/\s+/g, '-').toLowerCase()}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedColor(color.name);
                    }}
                    className={`w-3.5 h-3.5 rounded-full border transition-all ${
                      selectedColor === color.name
                        ? 'border-gold-300 scale-125 ring-1 ring-gold-400/20'
                        : 'border-transparent scale-100 hover:scale-110'
                    }`}
                    style={{ backgroundColor: color.hex }}
                    title={color.name}
                  />
                ))}
                <span className="text-[9px] font-mono text-stone-500 pl-1">
                  {product.colorSwatches.length} Colors
                </span>
              </div>
            )}

            {/* Makeup swatches */}
            {product.shades && product.shades.length > 0 && (
              <div className="flex items-center space-x-1.5" title="Select shade">
                {product.shades.map((shade) => (
                  <button
                    key={shade.name}
                    id={`shade-swatch-btn-${product.id}-${shade.name.replace(/\s+/g, '-').toLowerCase()}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedShade(shade.name);
                    }}
                    className={`w-3.5 h-3.5 rounded-full border transition-all ${
                      selectedShade === shade.name
                        ? 'border-gold-300 scale-125 ring-1 ring-gold-400/20'
                        : 'border-transparent scale-100 hover:scale-110'
                    }`}
                    style={{ backgroundColor: shade.hex }}
                    title={shade.name}
                  />
                ))}
                <span className="text-[9px] font-mono text-stone-500 pl-1">
                  {product.shades.length} Shades
                </span>
              </div>
            )}

            {/* Metal types */}
            {product.metalTypes && product.metalTypes.length > 0 && (
              <div className="flex flex-wrap gap-1">
                {product.metalTypes.map((metal) => (
                  <button
                    key={metal}
                    id={`metal-opt-btn-${product.id}-${metal.replace(/\s+/g, '-').toLowerCase()}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedMetal(metal);
                    }}
                    className={`px-1.5 py-0.5 rounded text-[8px] font-mono uppercase border transition-all ${
                      selectedMetal === metal
                        ? 'border-gold-400 text-gold-300 bg-gold-400/5'
                        : 'border-white/[0.04] text-stone-400 hover:text-white'
                    }`}
                  >
                    {metal.split(' ').pop()} {/* Show Gold/Platinum */}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Footer price and rating */}
        <div className="mt-5 pt-3.5 border-t border-white/[0.04] flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-stone-500 text-[9px] font-mono uppercase tracking-wider">Price</span>
            <span className="text-white font-mono text-sm font-semibold">
              ${product.price.toLocaleString()}
            </span>
          </div>

          <div className="flex items-center space-x-2">
            <button
              id={`quick-add-btn-${product.id}`}
              onClick={handleQuickAdd}
              className="px-3.5 py-1.5 gold-gradient text-charcoal-950 rounded flex items-center space-x-1.5 text-[10px] uppercase font-mono tracking-wider font-bold shadow-lg shadow-gold/25 hover:scale-[1.03] transition-all cursor-pointer"
              title="Add to Shopping Bag"
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Add</span>
            </button>
          </div>
        </div>

      </div>

    </motion.div>
  );
}
