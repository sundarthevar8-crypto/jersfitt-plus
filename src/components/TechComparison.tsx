'use client';

import React from 'react';
import { Check, X, Droplets, Zap, Shield, Sparkles } from 'lucide-react';

export default function TechComparison() {
  const comparisonData = [
    {
      feature: 'Built-In Sweat Towel',
      normal: 'No (requires wiping face with wet jersey sleeves or carrying loose towels)',
      jersfitt: 'Yes — discreet anti-microbial microfiber panel inside the hem',
      hasIcon: true,
    },
    {
      feature: 'Quick-Dry Sports Fabric',
      normal: 'Standard polyester (often gets heavy, clingy and waterlogged with sweat)',
      jersfitt: 'High-breathability moisture-wicking aerated poly-mesh',
      hasIcon: true,
    },
    {
      feature: 'In-Game Convenience',
      normal: 'Interferes with play; players forced to walk to sideline for towels',
      jersfitt: 'Instant 1-second sweat wipe on the run without breaking stride',
      hasIcon: true,
    },
    {
      feature: 'Odor & Bacterial Resistance',
      normal: 'Towel/damp fabric traps odor quickly over 90 minutes',
      jersfitt: 'Anti-microbial treated microfiber stays fresh match after match',
      hasIcon: false,
    },
    {
      feature: 'Match Weight & Aerodynamics',
      normal: 'Jersey becomes up to 30% heavier as moisture builds up',
      jersfitt: 'Ultra-lightweight (165g) with rapid moisture vaporization channels',
      hasIcon: false,
    },
  ];

  return (
    <section className="py-20 bg-[#08080c] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-electric-blue/10 border border-electric-blue/30 text-electric-blue text-xs font-bold uppercase tracking-widest mb-3">
            <Zap className="w-3.5 h-3.5" /> Direct Side-by-Side Comparison
          </div>
          <h2 className="text-3xl sm:text-4xl font-black uppercase font-display tracking-tight text-white">
            Ordinary Jerseys vs. <span className="text-electric-blue">JERSFITT PLUS</span>
          </h2>
          <p className="mt-3 text-slate-400 text-sm sm:text-base">
            Engineered specifically to solve the biggest frustration in football: blinding sweat and heavy, soaked fabrics during crucial match moments.
          </p>
        </div>

        {/* Comparison Table Grid */}
        <div className="rounded-2xl border border-white/10 overflow-hidden bg-[#0d0e14] shadow-2xl">
          <div className="grid grid-cols-1 md:grid-cols-12 border-b border-white/10 bg-[#12131c] text-xs font-bold uppercase tracking-wider">
            <div className="p-4 md:col-span-4 text-slate-400">Key Performance Metric</div>
            <div className="p-4 md:col-span-4 text-rose-400 border-t md:border-t-0 md:border-l border-white/10 flex items-center gap-1.5">
              <X className="w-4 h-4 text-rose-400" /> Standard Match Jersey
            </div>
            <div className="p-4 md:col-span-4 text-electric-blue bg-electric-blue/10 border-t md:border-t-0 md:border-l border-electric-blue/30 flex items-center gap-1.5">
              <Check className="w-4 h-4 text-electric-blue" /> JERSFITT Plus Jersey
            </div>
          </div>

          <div className="divide-y divide-white/5">
            {comparisonData.map((row, index) => (
              <div
                key={index}
                className="grid grid-cols-1 md:grid-cols-12 text-sm hover:bg-white/[0.02] transition-colors"
              >
                <div className="p-4 md:col-span-4 font-semibold text-white flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-electric-blue shrink-0" />
                  {row.feature}
                </div>
                <div className="p-4 md:col-span-4 text-slate-400 border-t md:border-t-0 md:border-l border-white/5 text-xs sm:text-sm flex items-start gap-2 bg-black/20">
                  <X className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                  <span>{row.normal}</span>
                </div>
                <div className="p-4 md:col-span-4 text-white border-t md:border-t-0 md:border-l border-white/5 text-xs sm:text-sm flex items-start gap-2 bg-electric-blue/[0.03]">
                  <Check className="w-4 h-4 text-electric-blue shrink-0 mt-0.5" />
                  <span className="font-medium text-slate-200">{row.jersfitt}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
