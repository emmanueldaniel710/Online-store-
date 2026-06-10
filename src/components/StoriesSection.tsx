/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { useLumina } from '../context/LuminaContext';
import { EDITORIAL_STORIES } from '../data';
import { Sparkles, MapPin, Compass, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';

export default function StoriesSection() {
  const { setActiveWorld } = useLumina();

  const handleEnterStoryWorld = (worldId: typeof EDITORIAL_STORIES[0]['world']) => {
    setActiveWorld(worldId);
    const element = document.getElementById(`world-section-${worldId}`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section className="bg-charcoal-950 py-16 sm:py-24 text-left select-none relative overflow-hidden">
      
      {/* Visual background details */}
      <div className="absolute top-0 right-10 w-96 h-96 bg-charcoal-800/20 rounded-full blur-[100px] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header Title Block */}
        <div className="border-b border-white/[0.05] pb-6 mb-12 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="inline-flex items-center space-x-1.5 px-3 py-1 bg-white/[0.02] border border-white/[0.04] rounded-full text-[9px] font-mono tracking-widest text-gold-300 uppercase mb-3">
              <Sparkles className="w-3 h-3 text-gold-400" />
              <span>Sourcing & Concept Journal</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-white tracking-tight">
              The Atelier Stories
            </h2>
            <p className="text-xs text-stone-400 max-w-xl mt-2 leading-relaxed">
              Explore the raw landscapes, certified clean carbon-neutral workshops, and premium artistic minds shaping Lumina.
            </p>
          </div>
          
          <span className="text-[10px] font-mono text-stone-500 tracking-widest uppercase">
            ESTABLISHED WORKSHOPS • MILAN / TOKYO / MALLORCA
          </span>
        </div>

        {/* Stories list */}
        <div className="space-y-16 sm:space-y-24">
          {EDITORIAL_STORIES.map((story, idx) => {
            const isEven = idx % 2 === 0;

            return (
              <div
                key={story.id}
                className={`flex flex-col lg:flex-row items-stretch gap-8 sm:gap-12 ${
                  isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'
                }`}
              >
                
                {/* Visual Image Side */}
                <div className="lg:w-1/2 relative group overflow-hidden rounded-2xl bg-charcoal-900 border border-white/[0.06] aspect-[4/3] sm:aspect-[16/10] lg:aspect-[4/3]">
                  <img
                    src={story.image}
                    alt={story.title}
                    className="w-full h-full object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950 via-transparent to-transparent opacity-60" />
                  
                  {/* Location badge */}
                  <div className="absolute top-4 left-4 bg-charcoal-950/80 border border-white/[0.06] px-3 py-1.5 rounded-full backdrop-blur text-[10px] font-mono text-stone-300 tracking-wider flex items-center">
                    <MapPin className="w-3.5 h-3.5 text-gold-300 mr-1.5" />
                    {story.location}
                  </div>
                </div>

                {/* Text Sourcing Side */}
                <div className="lg:w-1/2 flex flex-col justify-between py-2">
                  <div className="space-y-4">
                    
                    <span className="text-[10px] font-mono uppercase tracking-widest text-gold-400">
                      Inside {story.world} World
                    </span>
                    
                    <h3 className="font-serif text-2xl sm:text-3xl font-semibold text-white tracking-tight leading-tight">
                      {story.title}
                    </h3>
                    
                    <p className="text-xs sm:text-sm font-serif italic text-stone-300 leading-relaxed border-l-2 border-gold-400/40 pl-4 py-1">
                      {story.quote}
                    </p>

                    <p className="text-xs text-stone-400 font-mono tracking-wide uppercase pt-2">
                      {story.credits}
                    </p>
                  </div>

                  <div className="mt-8 pt-6 border-t border-white/[0.04]">
                    <button
                      id={`story-world-btn-${story.id}`}
                      onClick={() => handleEnterStoryWorld(story.world)}
                      className="inline-flex items-center space-x-2 px-5 py-3 border border-gold-400/30 rounded-full text-xs font-mono uppercase tracking-widest text-gold-300 hover:bg-gold-400 hover:text-charcoal-950 transition-all duration-300 cursor-pointer"
                    >
                      <Compass className="w-3.5 h-3.5 animate-spin-slow" />
                      <span>Discover {story.world} Collection</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>

                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
