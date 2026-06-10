/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { useLumina } from '../context/LuminaContext';
import { BRAND_WORLDS } from '../data';
import { motion } from 'motion/react';

export default function WorldRail() {
  const { activeWorld, setActiveWorld } = useLumina();

  const handleScrollToWorld = (worldId: string) => {
    setActiveWorld(worldId as any);
    const element = document.getElementById(`world-section-${worldId}`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="hidden xl:flex fixed left-0 top-24 bottom-12 w-16 border-r border-[#E6D5B8]/10 flex-col items-center justify-between py-12 bg-[#0a0a0a] z-30 select-none world-transition">
      
      {/* Top section: Vertical category tracker */}
      <div className="vertical-text text-[9px] tracking-[0.3em] uppercase opacity-30 font-semibold text-[#E6D5B8]">
        The Worlds
      </div>

      {/* Mid section: World navigation dots */}
      <div className="flex flex-col gap-5">
        {BRAND_WORLDS.map((world) => {
          const isActive = activeWorld === world.id;
          return (
            <button
              key={world.id}
              onClick={() => handleScrollToWorld(world.id)}
              className="relative p-1 focus:outline-none transition group cursor-pointer"
              title={`Explore ${world.label} World`}
            >
              {isActive ? (
                <motion.div
                  layoutId="activeRailDot"
                  className="w-1.5 h-1.5 gold-gradient rounded-full ring-4 ring-gold/20"
                  transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                />
              ) : (
                <div className="w-1.5 h-1.5 bg-white/25 rounded-full hover:bg-gold/60 transition duration-300" />
              )}
            </button>
          );
        })}
      </div>

      {/* Bottom section: Highlighting current world vertically */}
      <div className="vertical-text text-[11px] tracking-[0.25em] uppercase text-gold font-serif font-semibold h-24 text-center">
        {activeWorld}
      </div>

    </div>
  );
}
