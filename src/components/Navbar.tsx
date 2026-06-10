/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { useLumina } from '../context/LuminaContext';
import { BRAND_WORLDS, PRODUCTS } from '../data';
import { ShoppingBag, Heart, Search, Sparkles, Menu, X, Compass, ArrowRight, User } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Product } from '../types';

export default function Navbar() {
  const {
    activeWorld,
    setActiveWorld,
    cart,
    wishlist,
    setCartOpen,
    setChooseWorldOpen,
    setQuickViewProduct,
    searchOpen,
    setSearchOpen,
  } = useLumina();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [hoveredTab, setHoveredTab] = useState<string | null>(null);

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const wishlistCount = wishlist.length;

  // Filter search results
  const searchResults = searchQuery
    ? PRODUCTS.filter(
        (p) =>
          p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()))
      ).slice(0, 4)
    : [];

  const handleSearchSelect = (product: Product) => {
    setQuickViewProduct(product);
    setSearchQuery('');
    setSearchOpen(false);
  };

  return (
    <>
      {/* Top Banner Accent */}
      <div className="bg-charcoal-950 text-[10px] md:text-xs text-center tracking-widest text-[#E6D5B8] py-2 border-b border-[#E6D5B8]/10 font-mono transition-colors duration-500 uppercase select-none">
        🌿 FREE EXPRESS WORLDWIDE SHIPPING ON ALL ORDERS OVER $250 • COMPLIMENTARY TRIAL BEAUTY BOX INCLUDED
      </div>

      {/* Main Premium Navbar */}
      <header className="sticky top-0 z-40 w-full transition-all duration-500">
        <div className="absolute inset-0 glass pointer-events-none" />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          
          {/* Logo Brand Title */}
          <div className="flex items-center space-x-2">
            <button
              id="brand-logo-btn"
              onClick={() => {
                const element = document.getElementById('hero-section');
                if (element) element.scrollIntoView({ behavior: 'smooth' });
              }}
              className="flex items-center space-x-2.5 group focus:outline-none cursor-pointer"
            >
              <div className="relative w-8 h-8 rounded-full gold-gradient flex items-center justify-center shadow-lg shadow-gold/20 group-hover:scale-105 transition-transform duration-300">
                <div className="w-2.5 h-2.5 bg-[#121212] rotate-45 flex items-center justify-center" />
              </div>
              <div className="text-left">
                <span className="font-serif text-lg md:text-xl font-medium tracking-wide text-white group-hover:text-gold-200 transition-colors duration-300 block">
                  LUMINA
                </span>
                <span className="block text-[8px] font-mono tracking-widest text-gold-400 -mt-1 uppercase">
                  Collective
                </span>
              </div>
            </button>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-1">
            {BRAND_WORLDS.map((world) => {
              const isActive = activeWorld === world.id;
              
              // Find matching top featured item for preview image
              const worldPreviewImage = PRODUCTS.find(p => p.world === world.id)?.primaryImage;

              return (
                <div
                  key={world.id}
                  className="relative py-2"
                  onMouseEnter={() => setHoveredTab(world.id)}
                  onMouseLeave={() => setHoveredTab(null)}
                >
                  <button
                    id={`nav-tab-${world.id}`}
                    onClick={() => {
                      setActiveWorld(world.id);
                      const element = document.getElementById(`world-section-${world.id}`);
                      if (element) {
                        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                      }
                    }}
                    className={`px-4 py-2 font-sans text-xs uppercase tracking-widest transition-all duration-300 relative font-medium cursor-pointer ${
                      isActive
                        ? 'text-gold-300'
                        : 'text-stone-300 hover:text-white'
                    }`}
                  >
                    <span>{world.label}</span>
                    {isActive && (
                      <motion.div
                        layoutId="activeWorldIndicator"
                        className="absolute bottom-0 left-4 right-4 h-[2px] bg-gradient-to-r from-gold-500 to-gold-300"
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      />
                    )}
                  </button>

                  {/* Mega-Menu Hover Dropdown Card */}
                  <AnimatePresence>
                    {hoveredTab === world.id && (
                      <motion.div
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.25, ease: 'easeOut' }}
                        className="absolute top-11 left-1/2 -translate-x-1/2 w-80 bg-charcoal-900 border border-white/[0.06] rounded-xl p-4 shadow-2xl backdrop-blur-2xl pointer-events-auto z-50 overflow-hidden"
                      >
                        {/* Dropdown background shine */}
                        <div className="absolute top-0 right-0 w-32 h-32 bg-gold-400/5 rounded-full blur-2xl pointer-events-none" />
                        
                        <div className="flex space-x-3.5 relative z-10">
                          {worldPreviewImage && (
                            <img
                              src={worldPreviewImage}
                              alt={world.label}
                              className="w-20 h-24 object-cover rounded-lg border border-white/[0.08]"
                            />
                          )}
                          <div className="flex-1 flex flex-col justify-between">
                            <div>
                              <span className="text-[9px] font-mono uppercase tracking-widest text-gold-400">
                                {world.tag}
                              </span>
                              <h4 className="font-serif text-sm font-semibold text-white mt-0.5">
                                {world.label} World
                              </h4>
                              <p className="text-[10px] text-stone-400 leading-relaxed mt-1">
                                {world.description.slice(0, 68)}...
                              </p>
                            </div>
                            
                            <button
                              id={`go-${world.id}-btn`}
                              onClick={() => {
                                setActiveWorld(world.id);
                                const element = document.getElementById(`world-section-${world.id}`);
                                if (element) element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                              }}
                              className="text-[10px] uppercase tracking-widest text-gold-300 font-semibold inline-flex items-center group/btn mt-2 cursor-pointer"
                            >
                              Explore World
                              <ArrowRight className="w-3 h-3 ml-1 group-hover/btn:translate-x-1 transition-transform" />
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </nav>

          {/* Right Accessories Actions */}
          <div className="flex items-center space-x-3 sm:space-x-4">
            
            {/* Search Input Trigger */}
            <div className="relative hidden md:block">
              <button
                id="navbar-search-trigger"
                onClick={() => setSearchOpen(!searchOpen)}
                className="p-2 text-stone-300 hover:text-gold-300 transition-colors duration-200 cursor-pointer"
                title="Search Products"
              >
                <Search className="w-[18px] h-[18px]" />
              </button>
            </div>

            {/* Wishlist Icon */}
            <button
              id="navbar-wishlist-btn"
              onClick={() => {
                // Instantly open a search or show feedback
                setActiveWorld('jewelry');
                const element = document.getElementById('bestsellers-section');
                if (element) element.scrollIntoView({ behavior: 'smooth' });
              }}
              className="p-2 text-stone-300 hover:text-gold-300 transition-colors duration-200 relative cursor-pointer"
              title="Your Wishlist"
            >
              <Heart className={`w-[19px] h-[19px] ${wishlistCount > 0 ? 'fill-gold-300 text-gold-300' : ''}`} />
              {wishlistCount > 0 && (
                <span className="absolute top-1.5 right-1.5 w-4 h-4 rounded-full bg-gold-400 text-charcoal-950 font-mono text-[9px] font-bold flex items-center justify-center animate-pulse">
                  {wishlistCount}
                </span>
              )}
            </button>

            {/* Live Cart Button with live indicator */}
            <button
              id="navbar-cart-btn"
              onClick={() => setCartOpen(true)}
              className="p-2 text-stone-300 hover:text-gold-300 transition-colors duration-200 relative flex items-center cursor-pointer"
              title="Shopping Bag"
            >
              <ShoppingBag className="w-[19px] h-[19px] stroke-[1.8]" />
              {cartCount > 0 ? (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute top-1.5 right-1.5 w-4 h-4 rounded-full bg-white text-charcoal-950 font-mono text-[9px] font-bold flex items-center justify-center shadow"
                >
                  {cartCount}
                </motion.span>
              ) : null}
            </button>

            {/* "Switch Experience" Button */}
            <button
              id="experience-switcher-trigger"
              onClick={() => setChooseWorldOpen(true)}
              className="hidden sm:inline-flex items-center space-x-1.5 px-3 py-1.5 border border-gold-400/30 rounded-full text-[10px] font-mono tracking-widest uppercase text-white hover:bg-gold-400 hover:text-charcoal-950 transition-all duration-300 cursor-pointer shadow-lg shadow-gold-500/5 group"
            >
              <Compass className="w-3.5 h-3.5 animate-spin-slow group-hover:rotate-45 transition-transform" />
              <span>Switch World</span>
            </button>

            {/* Mobile Hamburger menu Button */}
            <button
              id="mobile-menu-hamburger"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-stone-300 hover:text-white lg:hidden transition-all duration-200 cursor-pointer"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

          </div>
        </div>

        {/* Global Live Search Overlay (when active) */}
        <AnimatePresence>
          {searchOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="absolute left-0 right-0 top-full bg-charcoal-900 border-b border-white/[0.08] shadow-2xl p-4 md:p-6 z-[60]"
            >
              <div className="max-w-3xl mx-auto relative">
                <div className="flex items-center bg-charcoal-950/70 border border-white/[0.1] rounded-lg px-4 py-2.5 focus-within:border-gold-300 transition-all">
                  <Search className="w-5 h-5 text-stone-400 mr-2.5" />
                  <input
                    id="predictive-search-input"
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search by product name, materials, features (e.g. Diamond, Silk, Matte)..."
                    className="w-full bg-transparent border-0 text-white outline-none focus:ring-0 text-sm placeholder-stone-500"
                    autoFocus
                  />
                  {searchQuery && (
                    <button
                      id="clear-search-btn"
                      onClick={() => setSearchQuery('')}
                      className="text-stone-400 hover:text-white text-xs"
                    >
                      Clear
                    </button>
                  )}
                </div>

                {/* Popular searches when query matches nothing */}
                {!searchQuery && (
                  <div className="mt-4 flex flex-wrap items-center gap-2">
                    <span className="text-[10px] font-mono tracking-wider uppercase text-stone-500 mr-2">
                      Popular:
                    </span>
                    {['Diamond', 'Mulberry Silk', 'Matte Lip', 'Watch', 'Boots'].map((term) => (
                      <button
                        key={term}
                        onClick={() => setSearchQuery(term)}
                        className="px-2.5 py-1 text-xs text-stone-300 hover:text-gold-300 border border-white/[0.04] rounded-full hover:bg-white/[0.02] transition"
                      >
                        {term}
                      </button>
                    ))}
                  </div>
                )}

                {/* Search Results Display */}
                {searchQuery && (
                  <div className="mt-4 bg-charcoal-950/80 rounded-lg p-3 max-h-80 overflow-y-auto border border-white/[0.05]">
                    {searchResults.length > 0 ? (
                      <div className="space-y-2.5">
                        <div className="text-[10px] font-mono uppercase tracking-widest text-gold-400 pb-1 border-b border-white/[0.04]">
                          Matching Products ({searchResults.length})
                        </div>
                        {searchResults.map((product) => (
                          <div
                            key={product.id}
                            onClick={() => handleSearchSelect(product)}
                            className="flex items-center justify-between p-2 hover:bg-white/[0.03] rounded-md cursor-pointer transition group"
                          >
                            <div className="flex items-center space-x-3">
                              <img
                                src={product.primaryImage}
                                alt={product.name}
                                className="w-10 h-12 object-cover rounded border border-white/[0.06] group-hover:scale-105 transition duration-300"
                              />
                              <div className="text-left">
                                <h5 className="text-xs font-semibold text-white group-hover:text-gold-200 transition">
                                  {product.name}
                                </h5>
                                <span className="text-[9px] font-mono uppercase tracking-widest text-gold-400/80">
                                  {product.world} • {product.collections[0]}
                                </span>
                              </div>
                            </div>
                            <span className="text-xs font-mono text-white font-medium">
                              ${product.price.toLocaleString()}
                            </span>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-6 text-stone-400 text-xs">
                        No products found matching &ldquo;{searchQuery}&rdquo;. Try another luxurious term.
                      </div>
                    )}
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Mobile menu navigation drawer */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="absolute left-0 right-0 top-full bg-charcoal-950 border-b border-white/[0.06] shadow-2xl p-4 z-40 lg:hidden overflow-hidden"
            >
              <div className="flex flex-col space-y-3.5 py-2">
                {BRAND_WORLDS.map((world) => {
                  const isActive = activeWorld === world.id;
                  return (
                    <button
                      key={world.id}
                      id={`mobile-nav-${world.id}`}
                      onClick={() => {
                        setActiveWorld(world.id);
                        setMobileMenuOpen(false);
                        const element = document.getElementById(`world-section-${world.id}`);
                        if (element) {
                          element.scrollIntoView({ behavior: 'smooth' });
                        }
                      }}
                      className={`text-left text-sm uppercase tracking-widest py-2 px-3 rounded-lg flex items-center justify-between transition-colors ${
                        isActive
                          ? 'bg-gold-500/10 text-gold-300 border-l-2 border-gold-400'
                          : 'text-stone-300 hover:text-white hover:bg-white/[0.02]'
                      }`}
                    >
                      <span className="font-medium">{world.label}</span>
                      <span className="text-[9px] font-mono text-stone-500">{world.tag}</span>
                    </button>
                  );
                })}
                
                <div className="border-t border-white/[0.05] pt-3.5 mt-2 flex flex-col space-y-3">
                  <button
                    id="mobile-experience-switcher-trigger"
                    onClick={() => {
                      setMobileMenuOpen(false);
                      setChooseWorldOpen(true);
                    }}
                    className="w-full inline-flex items-center justify-center space-x-2 p-2.5 border border-gold-400/40 rounded-lg text-xs font-mono tracking-wider uppercase text-white hover:bg-gold-400 hover:text-charcoal-950 transition-colors"
                  >
                    <Compass className="w-4 h-4 animate-spin-slow" />
                    <span>Switch Luxury World</span>
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
}
