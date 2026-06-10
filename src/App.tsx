/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { LuminaProvider, useLumina } from './context/LuminaContext';
import Navbar from './components/Navbar';
import WorldSwitcher from './components/WorldSwitcher';
import ProductCard from './components/ProductCard';
import ProductQuickView from './components/ProductQuickView';
import CartDrawer from './components/CartDrawer';
import CheckoutModal from './components/CheckoutModal';
import StoriesSection from './components/StoriesSection';
import Newsletter from './components/Newsletter';
import WorldRail from './components/WorldRail';
import { PRODUCTS, BRAND_WORLDS } from './data';
import { Product, BrandWorld } from './types';
import { Sparkles, ArrowRight, Star, Heart, ShieldCheck, Mail, Compass, HelpCircle, Instagram, ChevronRight, Eye, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

function LuminaAppContent() {
  const {
    activeWorld,
    setActiveWorld,
    setChooseWorldOpen,
    wishlist,
    toggleWishlist,
    setQuickViewProduct,
  } = useLumina();

  // Active filter state per world category
  const [jewelryFilter, setJewelryFilter] = useState<'all' | 'Platinum' | '18k Yellow Gold' | '18k Rose Gold'>('all');
  const [clothingFilter, setClothingFilter] = useState<'all' | 'Silk' | 'Cashmere' | 'Wool' | 'Linen'>('all');
  const [shoesFilter, setShoesFilter] = useState<'all' | 'Heels' | 'Comfort' | 'Suede'>('all');
  const [accessoriesFilter, setAccessoriesFilter] = useState<'all' | 'Watch' | 'Leather Bag' | 'Sunglasses'>('all');
  const [makeupFilter, setMakeupFilter] = useState<'all' | 'Matte Lip' | 'Palette' | 'Serum Foundation'>('all');

  // Dynamic values based on active world category
  const heroData = {
    jewelry: {
      title: 'Captivated in Everlasting Light',
      subtitle: 'La Joaillerie Héréditaire',
      desc: 'Designed for legacy. Pure recycled platinum, solid 18k yellow gold, and individually registered GIA conflict-free diamonds handcrafted in Milan.',
      image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=1600&q=80',
      cta: 'Explore Diamonds',
      accent: 'border-gold-400 text-gold-300'
    },
    clothing: {
      title: 'The Art of Fluid Tailoring',
      subtitle: 'Le Prêt-à-Porter Minimaliste',
      desc: 'Enveloping organic shapes designed with seamless physical elegance. Spun from double-weight organic Mulberry Silk and pure high-altitude Mongolian cashmere.',
      image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1600&q=80',
      cta: 'Browse Silks',
      accent: 'border-amber-400 text-amber-300'
    },
    shoes: {
      title: 'Stride with Commanding Grace',
      subtitle: 'Les Chaussures d’Elite',
      desc: 'Sculptural proportions meeting luxury kinetic comfort. Hand-finished patent leather stilettos, high-treat rain suede boots, and silk-blend primeknit soles.',
      image: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=1600&q=80',
      cta: 'Shop Evening Heels',
      accent: 'border-yellow-400 text-yellow-300'
    },
    accessories: {
      title: 'The Singular Finishing Accent',
      subtitle: 'Les Accessoires Signatures',
      desc: 'Impeccable personal styling hardware. Mechanical Swiss watches, double-quilted Napa leather bags with organic brass clasps, and tortoiseshell acetate frames.',
      image: 'https://images.unsplash.com/photo-1524498250077-390f9e378fc0?auto=format&fit=crop&w=1600&q=80',
      cta: 'Discover Hardwares',
      accent: 'border-gold-400 text-gold-200'
    },
    makeup: {
      title: 'Luminous Sun-Drenched Radiance',
      subtitle: 'La Beauté Naturelle',
      desc: 'Dewy, active serum cosmetics engineered to highlight your natural bone geometry, packed with squalane and damascus rose oils.',
      image: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=1600&q=80',
      cta: 'Discover Glow Kit',
      accent: 'border-rose-400 text-rose-300'
    }
  };

  const currentHero = heroData[activeWorld];

  // Best sellers list (across all categories)
  const bestSellers = PRODUCTS.filter((p) => p.isBestSeller);
  
  // Custom filter helper function per world grid
  const filteredProducts = (worldId: BrandWorld) => {
    const list = PRODUCTS.filter((p) => p.world === worldId);
    
    if (worldId === 'jewelry' && jewelryFilter !== 'all') {
      return list.filter((p) => p.metalTypes?.includes(jewelryFilter));
    }
    if (worldId === 'clothing' && clothingFilter !== 'all') {
      return list.filter((p) => p.tags.includes(clothingFilter));
    }
    if (worldId === 'shoes' && shoesFilter !== 'all') {
      return list.filter((p) => p.tags.includes(shoesFilter));
    }
    if (worldId === 'accessories' && accessoriesFilter !== 'all') {
      return list.filter((p) => p.tags.includes(accessoriesFilter));
    }
    if (worldId === 'makeup' && makeupFilter !== 'all') {
      return list.filter((p) => p.tags.includes(makeupFilter));
    }
    
    return list;
  };

  const handleCtaClick = () => {
    const section = document.getElementById(`world-section-${activeWorld}`);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="min-h-screen bg-charcoal-950 text-white selection:bg-gold-400 selection:text-charcoal-950 transition-colors duration-700 font-sans relative">
      
      {/* Dynamic Immersive Background Glow corresponding to activeWorld */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        {/* Top left and bottom right subtle ambient organic gradients change color based on world */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`ambient-${activeWorld}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.15 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className={`absolute top-0 left-[-20%] w-[60%] h-[50%] rounded-full blur-[200px] ${
              activeWorld === 'jewelry' ? 'bg-emerald-500' :
              activeWorld === 'clothing' ? 'bg-orange-300' :
              activeWorld === 'shoes' ? 'bg-red-900' :
              activeWorld === 'accessories' ? 'bg-blue-600' : 'bg-rose-400'
            }`}
          />
        </AnimatePresence>
      </div>

      {/* Floating Navigation Header */}
      <Navbar />

      {/* --- SECTION 1: DYNAMIC HERO BANNER --- */}
      <section id="hero-section" className="relative min-h-[85vh] flex items-center justify-center py-20 overflow-hidden">
        {/* Main Background Image fade */}
        <div className="absolute inset-0">
          <AnimatePresence mode="wait">
            <motion.img
              key={`hero-img-${activeWorld}`}
              src={currentHero.image}
              alt="Editorial background"
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 0.35, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.85, ease: 'easeOut' }}
              className="w-full h-full object-cover select-none"
            />
          </AnimatePresence>
          <div className="absolute inset-0 bg-gradient-to-b from-charcoal-950 via-charcoal-950/70 to-charcoal-950" />
        </div>

        {/* Pulsing Concentric Golden Rings from Artistic Flair */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden z-[5] opacity-25">
          <div className="w-[450px] h-[450px] sm:w-[600px] sm:h-[600px] border border-[#D4AF37]/20 rounded-full animate-pulse flex items-center justify-center">
            <div className="w-[300px] h-[300px] sm:w-[400px] sm:h-[400px] border border-[#D4AF37]/15 rounded-full flex items-center justify-center">
              <div className="w-[150px] h-[150px] sm:w-[200px] sm:h-[200px] border border-[#D4AF37]/10 rounded-full" />
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center select-none">
          <AnimatePresence mode="wait">
            <motion.div
              key={`hero-text-${activeWorld}`}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.6 }}
              className="space-y-6 max-w-4xl mx-auto"
            >
              <div className="inline-flex items-center space-x-2 px-3 py-1 bg-white/[0.02] border border-[#E6D5B8]/20 rounded-full text-[10px] font-mono tracking-widest text-gold-300 uppercase">
                <Sparkles className="w-3.5 h-3.5 text-[#D4AF37] animate-pulse" />
                <span>{currentHero.subtitle}</span>
              </div>

              <h1 className="font-serif text-4xl sm:text-6xl lg:text-[76px] font-medium leading-none tracking-tight text-white mb-2 max-w-3xl mx-auto">
                {currentHero.title}
              </h1>

              <p className="text-stone-300 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed font-light">
                {currentHero.desc}
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-6">
                <button
                  id="hero-cta-discover-btn"
                  onClick={handleCtaClick}
                  className="px-8 py-4 gold-gradient text-charcoal-950 rounded-full text-xs font-mono font-bold tracking-widest uppercase shadow-2xl shadow-gold/25 hover:scale-105 transition-all cursor-pointer"
                >
                  {currentHero.cta}
                </button>
                
                <button
                  id="hero-cta-picker-btn"
                  onClick={() => setChooseWorldOpen(true)}
                  className="px-7 py-3.5 border border-white/[0.12] hover:border-gold-300 rounded-full text-xs font-mono uppercase tracking-widest text-white hover:bg-white/[0.02] transition-colors cursor-pointer inline-flex items-center space-x-2"
                >
                  <Compass className="w-4 h-4 text-gold-400 animate-spin-slow" />
                  <span>Choose Your World</span>
                </button>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Floating Verified Trust Badges Footer */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-full max-w-4xl px-4 flex flex-wrap justify-center gap-x-8 gap-y-3 text-[10px] sm:text-xs font-mono tracking-widest text-stone-400 uppercase select-none">
          <span className="flex items-center">🛡️ SECURE COURIER DISPATCH</span>
          <span className="flex items-center text-gold-300">✦ 4.98 RATINGS FROM 32K INVESTORS</span>
          <span className="flex items-center">🥇 LIFETIME GIA RECOVERY PROMISE</span>
        </div>
      </section>

      {/* --- SECTION 2: BEST SELLERS HORIZONTAL SCROLL CAROUSEL --- */}
      <section id="bestsellers-section" className="bg-charcoal-900 border-t border-b border-white/[0.04] py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 select-none">
          
          <div className="flex items-end justify-between border-b border-white/[0.05] pb-6 mb-10">
            <div className="text-left">
              <span className="text-[10px] font-mono uppercase tracking-widest text-gold-400">
                Highly Coveted Curated Essentials
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-semibold tracking-tight text-white mt-1">
                Lumina Best Sellers
              </h2>
            </div>
            <p className="hidden md:block text-[10px] font-mono text-stone-500 tracking-widest uppercase">
              REPLENISHING WEEKLY • PRIVATE AIR FREIGHT HANDLED
            </p>
          </div>

          {/* Swipeable Carousel Tray */}
          <div className="flex space-x-6 overflow-x-auto pb-6 no-scrollbar snap-x cursor-grab active:cursor-grabbing">
            {bestSellers.map((product) => (
              <div key={product.id} className="w-[280px] sm:w-[320px] flex-shrink-0 snap-start">
                <ProductCard product={product} />
              </div>
            ))}
          </div>

          <div className="text-center mt-4">
            <span className="text-[10px] font-mono text-stone-500 tracking-widest uppercase animate-pulse">
              ← SWIPE HORIZONTALLY TO DISCOVER MORE KEYSTONES →
            </span>
          </div>

        </div>
      </section>

      {/* --- SECTION 3: IMMERSIVE CASCADE BRAND WORLDS (Long scroll) --- */}
      <div className="space-y-0">
        
        {/* 1. JEWELRY WORLD */}
        <section
          id="world-section-jewelry"
          className="py-16 sm:py-28 bg-charcoal-950 border-b border-white/[0.04] relative overflow-hidden"
        >
          {/* Subtle decoration snapshot */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/5 rounded-full blur-[120px] pointer-events-none" />
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            
            {/* World Header Elements Block */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/[0.05] pb-8 mb-12 text-left">
              <div className="space-y-2 max-w-2xl">
                <span className="text-xs font-mono uppercase tracking-widest text-gold-400 block font-semibold">
                  World 01 // La Joaillerie Extrême
                </span>
                <h2 className="font-serif text-4xl sm:text-5xl font-semibold tracking-tight text-white">
                  The Jewelry World
                </h2>
                <p className="text-xs sm:text-sm text-stone-400 leading-relaxed font-light">
                  A collection of flawless masterworks. From continuous line GIA-certified diamond tennis strands to emerald halos cut on cushion settings in high-polish Italian gold.
                </p>
              </div>

              {/* Jewelry Filters */}
              <div className="flex-shrink-0">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-[9px] font-mono tracking-widest uppercase text-stone-500 mr-2">Filter Precious metal:</span>
                  {[
                    { id: 'all', label: 'All Jewelry' },
                    { id: 'Platinum', label: 'Platinum' },
                    { id: '18k Yellow Gold', label: '18k Gold' },
                    { id: '18k Rose Gold', label: 'Rose Gold' }
                  ].map((filter) => (
                    <button
                      key={filter.id}
                      id={`jew-filter-btn-${filter.id}`}
                      onClick={() => setJewelryFilter(filter.id as any)}
                      className={`px-3.5 py-1.5 rounded-full text-[10px] font-mono uppercase tracking-wider border transition-all cursor-pointer ${
                        jewelryFilter === filter.id
                          ? 'bg-gold-400 text-charcoal-950 border-gold-300 font-bold'
                          : 'border-white/[0.08] hover:border-gold-400/30 text-stone-300'
                      }`}
                    >
                      {filter.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Products grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
              {filteredProducts('jewelry').map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

          </div>
        </section>

        {/* 2. CLOTHING WORLD */}
        <section
          id="world-section-clothing"
          className="py-16 sm:py-28 bg-charcoal-900 border-b border-white/[0.04] relative overflow-hidden"
        >
          <div className="absolute -bottom-10 -left-10 w-96 h-96 bg-orange-500/5 rounded-full blur-[100px] pointer-events-none" />
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            
            {/* World Header Elements Block */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/[0.05] pb-8 mb-12 text-left">
              <div className="space-y-2 max-w-2xl">
                <span className="text-xs font-mono uppercase tracking-widest text-gold-400 block font-semibold">
                  World 02 // Le Prêt-à-Porter
                </span>
                <h2 className="font-serif text-4xl sm:text-5xl font-semibold tracking-tight text-white">
                  The Clothing World
                </h2>
                <p className="text-xs sm:text-sm text-stone-400 leading-relaxed font-light">
                  Minimalist garment shapes that flow beautifully on the bias. Individually designed from Mulberry organic silk folds, Italian virgin wool, and pure high-altitude cashmere layers.
                </p>
              </div>

              {/* Clothing Filters */}
              <div className="flex-shrink-0">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-[9px] font-mono tracking-widest uppercase text-stone-500 mr-2">Sort Fabric:</span>
                  {[
                    { id: 'all', label: 'All Garments' },
                    { id: 'Silk', label: 'Mulberry Silk' },
                    { id: 'Cashmere', label: 'Cashmere' },
                    { id: 'Wool', label: 'Virgin Wool' },
                    { id: 'Linen', label: 'Linen Flax' }
                  ].map((filter) => (
                    <button
                      key={filter.id}
                      id={`clo-filter-btn-${filter.id}`}
                      onClick={() => setClothingFilter(filter.id as any)}
                      className={`px-3.5 py-1.5 rounded-full text-[10px] font-mono uppercase tracking-wider border transition-all cursor-pointer ${
                        clothingFilter === filter.id
                          ? 'bg-gold-400 text-charcoal-950 border-gold-300 font-bold'
                          : 'border-white/[0.08] hover:border-gold-400/30 text-stone-300'
                      }`}
                    >
                      {filter.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Products grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
              {filteredProducts('clothing').map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

          </div>
        </section>

        {/* 3. SHOES WORLD */}
        <section
          id="world-section-shoes"
          className="py-16 sm:py-28 bg-charcoal-950 border-b border-white/[0.04] relative overflow-hidden"
        >
          <div className="absolute top-1/2 left-0 w-80 h-80 bg-red-500/5 rounded-full blur-[100px] pointer-events-none" />
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            
            {/* World Header Elements Block */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/[0.05] pb-8 mb-12 text-left">
              <div className="space-y-2 max-w-2xl">
                <span className="text-xs font-mono uppercase tracking-widest text-gold-400 block font-semibold">
                  World 03 // Les Chaussures Élites
                </span>
                <h2 className="font-serif text-4xl sm:text-5xl font-semibold tracking-tight text-white">
                  The Shoes World
                </h2>
                <p className="text-xs sm:text-sm text-stone-400 leading-relaxed font-light">
                  Dynamic strides designed with structural elegance. Custom patent leather stilettos crafted hand-stitched in Tuscany and performance primeknit models with carbon composite soles.
                </p>
              </div>

              {/* Shoes Filters */}
              <div className="flex-shrink-0">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-[9px] font-mono tracking-widest uppercase text-stone-500 mr-2">Filter Silhouette:</span>
                  {[
                    { id: 'all', label: 'All Shoes' },
                    { id: 'Heels', label: 'Stilettos' },
                    { id: 'Suede', label: 'Suede Boots' },
                    { id: 'Comfort', label: 'Sneakers' }
                  ].map((filter) => (
                    <button
                      key={filter.id}
                      id={`sho-filter-btn-${filter.id}`}
                      onClick={() => setShoesFilter(filter.id as any)}
                      className={`px-3.5 py-1.5 rounded-full text-[10px] font-mono uppercase tracking-wider border transition-all cursor-pointer ${
                        shoesFilter === filter.id
                          ? 'bg-gold-400 text-charcoal-950 border-gold-300 font-bold'
                          : 'border-white/[0.08] hover:border-gold-400/30 text-stone-300'
                      }`}
                    >
                      {filter.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Products grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
              {filteredProducts('shoes').map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

          </div>
        </section>

        {/* 4. ACCESSORIES WORLD */}
        <section
          id="world-section-accessories"
          className="py-16 sm:py-28 bg-charcoal-900 border-b border-white/[0.04] relative overflow-hidden"
        >
          <div className="absolute top-10 right-10 w-80 h-80 bg-blue-500/5 rounded-full blur-[100px] pointer-events-none" />
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            
            {/* World Header Elements Block */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/[0.05] pb-8 mb-12 text-left">
              <div className="space-y-2 max-w-2xl">
                <span className="text-xs font-mono uppercase tracking-widest text-gold-400 block font-semibold">
                  World 04 // Les Signatures Minimalistes
                </span>
                <h2 className="font-serif text-4xl sm:text-5xl font-semibold tracking-tight text-white">
                  The Accessories World
                </h2>
                <p className="text-xs sm:text-sm text-stone-400 leading-relaxed font-light">
                  Perfect structural finishes for every outfit space. Quilted buttery napa lambskin crossbody sequences and precision automatic Swiss machinery watches with scratchproof sapphire lenses.
                </p>
              </div>

              {/* Accessories Filters */}
              <div className="flex-shrink-0">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-[9px] font-mono tracking-widest uppercase text-stone-500 mr-2">Filter Item:</span>
                  {[
                    { id: 'all', label: 'All Items' },
                    { id: 'Watch', label: 'Swiss Watches' },
                    { id: 'Leather Bag', label: 'Napa Bags' },
                    { id: 'Sunglasses', label: 'Sunglasses' }
                  ].map((filter) => (
                    <button
                      key={filter.id}
                      id={`acc-filter-btn-${filter.id}`}
                      onClick={() => setAccessoriesFilter(filter.id as any)}
                      className={`px-3.5 py-1.5 rounded-full text-[10px] font-mono uppercase tracking-wider border transition-all cursor-pointer ${
                        accessoriesFilter === filter.id
                          ? 'bg-gold-400 text-charcoal-950 border-gold-300 font-bold'
                          : 'border-white/[0.08] hover:border-gold-400/30 text-stone-300'
                      }`}
                    >
                      {filter.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Products grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
              {filteredProducts('accessories').map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

          </div>
        </section>

        {/* 5. MAKEUP & BEAUTY WORLD */}
        <section
          id="world-section-makeup"
          className="py-16 sm:py-28 bg-charcoal-950 relative overflow-hidden"
        >
          <div className="absolute -bottom-10 right-0 w-96 h-96 bg-rose-450/5 rounded-full blur-[140px] pointer-events-none" />
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            
            {/* World Header Elements Block */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/[0.05] pb-8 mb-12 text-left">
              <div className="space-y-2 max-w-2xl">
                <span className="text-xs font-mono uppercase tracking-widest text-gold-400 block font-semibold">
                  World 05 // La Beauté Lumineuse
                </span>
                <h2 className="font-serif text-4xl sm:text-5xl font-semibold tracking-tight text-white">
                  The Makeup & Beauty World
                </h2>
                <p className="text-xs sm:text-sm text-stone-400 leading-relaxed font-light">
                  Aura highlights that glow naturally under solar rays. Breathe easy hydrating foundations packed with probiotic lactic ferments, hyaluronic acids, and heavy crimson matte sets.
                </p>
              </div>

              {/* Makeup Filters */}
              <div className="flex-shrink-0">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-[9px] font-mono tracking-widest uppercase text-stone-500 mr-2">Core Formula:</span>
                  {[
                    { id: 'all', label: 'All beauty' },
                    { id: 'Matte Lip', label: 'Matte Lips' },
                    { id: 'Palette', label: 'Prismatic Palettes' },
                    { id: 'Serum Foundation', label: 'Serum Bases' }
                  ].map((filter) => (
                    <button
                      key={filter.id}
                      id={`mak-filter-btn-${filter.id}`}
                      onClick={() => setMakeupFilter(filter.id as any)}
                      className={`px-3.5 py-1.5 rounded-full text-[10px] font-mono uppercase tracking-wider border transition-all cursor-pointer ${
                        makeupFilter === filter.id
                          ? 'bg-gold-400 text-charcoal-950 border-gold-300 font-bold'
                          : 'border-white/[0.08] hover:border-gold-400/30 text-stone-300'
                      }`}
                    >
                      {filter.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Products grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
              {filteredProducts('makeup').map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

          </div>
        </section>

      </div>

      {/* --- SECTION 4: CURATED EDITORIAL LOOKBOOK STORIES --- */}
      <StoriesSection />

      {/* --- SECTION 5: \#LUMINGLOW COMMUNITY UGC BENTO GRID --- */}
      <section id="ugc-section" className="bg-charcoal-900 border-t border-b border-white/[0.04] py-16 sm:py-24 text-left select-none relative">
        <div className="absolute top-1/2 left-0 w-80 h-80 bg-white/[0.01] rounded-full blur-[90px]" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-white/[0.05] pb-6 mb-12">
            <div>
              <span className="text-[10px] font-mono uppercase tracking-widest text-gold-400">Shared by the Collective</span>
              <h2 className="font-serif text-3xl sm:text-4xl font-semibold tracking-tight text-white mt-1">#LuminaGlow Community</h2>
            </div>
            
            <p className="text-xs text-stone-400 max-w-xs mt-2 md:mt-0 leading-relaxed font-light">
              Tag your styling on Instagram or TikTok with **#LuminaGlow** to be featured in our seasonal look collection database.
            </p>
          </div>

          {/* Bento UGC Grid */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            
            {/* UGC 1 (Double size grid) */}
            <div className="col-span-2 row-span-2 relative group overflow-hidden rounded-xl bg-charcoal-950 border border-white/[0.05] aspect-[4/5] md:aspect-auto">
              <img
                src="https://images.unsplash.com/photo-1548624149-f9b1859aa7d0?auto=format&fit=crop&w=800&q=80"
                alt="Community Spotlight"
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
              <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-charcoal-950 via-charcoal-950/40 to-transparent">
                <span className="text-[9px] font-mono text-gold-300">@rebecca.style.atelier</span>
                <p className="font-serif text-sm font-semibold text-white mt-0.5">&ldquo;Layering the Eternal Glow strands over tailored linen details.&rdquo;</p>
              </div>
            </div>

            {/* UGC 2 */}
            <div className="relative group overflow-hidden rounded-xl bg-charcoal-950 border border-white/[0.05] aspect-[3/4]">
              <img
                src="https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&w=500&q=80"
                alt="Community highlight"
                className="w-full h-full object-cover transition duration-500 ease-out group-hover:scale-105"
              />
              <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-charcoal-950/90 to-transparent">
                <span className="text-[8px] font-mono text-gold-400">@valeri.cosmetics</span>
              </div>
            </div>

            {/* UGC 3 */}
            <div className="relative group overflow-hidden rounded-xl bg-charcoal-950 border border-white/[0.05] aspect-[3/4]">
              <img
                src="https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=500&q=80"
                alt="Community Shoes highlight"
                className="w-full h-full object-cover transition duration-500 ease-out group-hover:scale-105"
              />
              <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-charcoal-950/90 to-transparent">
                <span className="text-[8px] font-mono text-gold-400">@marcus.strides</span>
              </div>
            </div>

            {/* UGC 4 */}
            <div className="relative group overflow-hidden rounded-xl bg-charcoal-950 border border-white/[0.05] aspect-[3/4]">
              <img
                src="https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=500&q=80"
                alt="Community bags highlight"
                className="w-full h-full object-cover transition duration-500 ease-out group-hover:scale-105"
              />
              <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-charcoal-950/90 to-transparent">
                <span className="text-[8px] font-mono text-gold-400">@auroraselection</span>
              </div>
            </div>

            {/* UGC 5 (Row 2, Column 3) */}
            <div className="relative group overflow-hidden rounded-xl bg-charcoal-950 border border-white/[0.05] aspect-[3/4]">
              <img
                src="https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&w=500&q=80"
                alt="Community rings highlight"
                className="w-full h-full object-cover transition duration-500 ease-out group-hover:scale-105"
              />
              <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-charcoal-950/90 to-transparent">
                <span className="text-[8px] font-mono text-gold-400">@sophia_london</span>
              </div>
            </div>

            {/* UGC 6 (Row 2, Column 4) */}
            <div className="relative group overflow-hidden rounded-xl bg-charcoal-950 border border-white/[0.05] aspect-[3/4]">
              <img
                src="https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=500&q=80"
                alt="Community highlights"
                className="w-full h-full object-cover transition duration-500 ease-out group-hover:scale-105"
              />
              <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-charcoal-950/90 to-transparent">
                <span className="text-[8px] font-mono text-gold-400">@glowbotanical</span>
              </div>
            </div>

            {/* UGC 7 (Row 2, Column 5) */}
            <div className="relative group overflow-hidden rounded-xl bg-charcoal-950 border border-white/[0.05] aspect-[3/4]">
              <img
                src="https://images.unsplash.com/photo-1520639888713-7851133b1ed0?auto=format&fit=crop&w=500&q=80"
                alt="Community Boots highlight"
                className="w-full h-full object-cover transition duration-500 ease-out group-hover:scale-105"
              />
              <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-charcoal-950/90 to-transparent">
                <span className="text-[8px] font-mono text-gold-400">@charles.finearts</span>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* --- SECTION 6: EDITORIAL NEWSLETTER SIGNUP --- */}
      <Newsletter />

      {/* Ambient Mobile Device Frame Preview Overlay badge in bottom-right corner */}
      <div className="fixed bottom-6 right-6 z-40 select-none">
        <div className="bg-charcoal-900 border border-gold-400/20 text-[9px] font-mono uppercase tracking-widest text-gold-300 px-3.5 py-2.5 rounded-full shadow-2xl flex items-center space-x-2">
          <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-ping" />
          <span>Adaptive Mobile Engine Running</span>
        </div>
      </div>

      {/* --- SECTION 7: DETAILED COMPREHENSIVE LUXURY FOOTER --- */}
      <footer className="bg-charcoal-950 pt-20 pb-10 text-left border-t border-white/[0.04]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-2 md:grid-cols-6 gap-8 pb-16 border-b border-white/[0.05]">
            
            {/* Lumina Corporate overview (Span 2) */}
            <div className="col-span-2 space-y-4">
              <div className="flex items-center space-x-2">
                <div className="relative w-6 h-6 rounded-full bg-gradient-to-tr from-gold-600 to-gold-300" />
                <span className="font-serif text-base font-semibold tracking-wider text-white">LUMINA COLLECTIVE</span>
              </div>
              <p className="text-stone-400 text-xs leading-relaxed max-w-sm">
                Lumina Collective consolidates five elite brand experiences into a singular digital space. 
                We operate on an offline-first inventory scheme backstopped by carbon-neutral transatlantic freight.
              </p>
              
              <div className="flex items-center space-x-3.5 pt-2">
                <a href="#ugc-section" className="p-2 bg-white/[0.02] border border-white/[0.04] rounded-full text-stone-400 hover:text-white hover:bg-white/[0.06] transition" title="Lumina on Instagram">
                  <Instagram className="w-4 h-4" />
                </a>
                <a href="#newsletter-section" className="p-2 bg-white/[0.02] border border-white/[0.04] rounded-full text-stone-400 hover:text-white hover:bg-white/[0.06] transition" title="Lumina via Mail">
                  <Mail className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Quick Navigation column */}
            <div className="col-span-1 space-y-3">
              <h5 className="font-mono text-[10px] uppercase tracking-widest text-gold-400">Atelier Worlds</h5>
              <div className="flex flex-col space-y-2 text-xs text-stone-400">
                {BRAND_WORLDS.map((w) => (
                  <button
                    key={w.id}
                    onClick={() => {
                      setActiveWorld(w.id);
                      document.getElementById(`world-section-${w.id}`)?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="text-left hover:text-white transition cursor-pointer"
                  >
                    {w.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Inquiries / Sourcing column */}
            <div className="col-span-1 space-y-3">
              <h5 className="font-mono text-[10px] uppercase tracking-widest text-gold-400">The Journal</h5>
              <div className="flex flex-col space-y-2 text-xs text-stone-400">
                <a href="#editorial-section" className="hover:text-white transition">Our Philosophies</a>
                <span className="text-stone-600">Sourcing Standard</span>
                <span className="text-stone-600">Sustainable Linen</span>
                <span className="text-stone-600">GIA Constellations</span>
              </div>
            </div>

            {/* Assistance column */}
            <div className="col-span-1 space-y-3">
              <h5 className="font-mono text-[10px] uppercase tracking-widest text-gold-400">Assistance</h5>
              <div className="flex flex-col space-y-2 text-xs text-stone-400">
                <span className="text-stone-600 select-all font-mono">24/7 Concierge Hotline</span>
                <span className="text-stone-600">Return Policy (30 Days)</span>
                <span className="text-stone-600">Worldwide Courier tracking</span>
                <a href="#bestsellers-section" className="hover:text-white transition">Gift Invoicing</a>
              </div>
            </div>

            {/* Locations / Headquarters column */}
            <div className="col-span-1 space-y-3">
              <h5 className="font-mono text-[10px] uppercase tracking-widest text-gold-400">Ateliers</h5>
              <div className="flex flex-col space-y-2 text-xs text-stone-500 font-mono">
                <span>MILANO (VIA MONTENAPOLEONE)</span>
                <span>TOKYO (SHIBUYA DISTRICT)</span>
                <span>NEW YORK (5TH AVENUE)</span>
              </div>
            </div>

          </div>

          {/* Bottom Copyright and Payment Method Badges */}
          <div className="mt-10 flex flex-col md:flex-row items-center justify-between gap-6 text-[11px] font-mono tracking-wider text-stone-500">
            <div className="space-y-1 text-center md:text-left">
              <div>© 2026 LUMINA COLLECTIVE CORP. ALL INDIVIDUAL COPYRIGHTS PRESERVED WITH RIGOROUS DISCIPLINE.</div>
              <div className="text-[10px] text-stone-600">AUTHENTIC RECYCLED METALS CERTIFICATION #LM-8420-Platinum.</div>
            </div>
            
            {/* Payment Method icons formatted in gold outlined luxury badges */}
            <div className="flex items-center space-x-2">
              {['VISA', 'MC', 'AMEX', 'APPLE PAY', 'SHOP PAY'].map((method) => (
                <span
                  key={method}
                  className="px-2 py-1 bg-white/[0.01] border border-white/[0.04] rounded text-[8px] font-semibold text-stone-400 select-none uppercase"
                >
                  {method}
                </span>
              ))}
            </div>
          </div>

        </div>
      </footer>

      {/* --- DRAWERS AND DIALOG OVERLAYS PANEL GROUP --- */}
      <WorldRail />
      <WorldSwitcher />
      <CartDrawer />
      <ProductQuickView />
      <CheckoutModal />

    </div>
  );
}

export default function App() {
  return (
    <LuminaProvider>
      <LuminaAppContent />
    </LuminaProvider>
  );
}
