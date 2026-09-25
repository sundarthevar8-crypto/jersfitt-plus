import React from 'react';
import Link from 'next/link';
import { Zap, Droplets, ShieldCheck, ArrowRight, Layers, Sparkles, CheckCircle2 } from 'lucide-react';
import TechComparison from '@/components/TechComparison';

export default function TechnologyPage() {
  return (
    <div className="min-h-screen bg-[#08080a] text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="text-xs font-extrabold uppercase tracking-widest text-electric-blue">
            The Science of Sweat Management
          </span>
          <h1 className="text-4xl sm:text-6xl font-black uppercase font-display tracking-tight text-white leading-none">
            JERSFITT Plus Technology
          </h1>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            Engineered specifically for football players and athletes who require unhindered vision, dry skin, and lightning-fast moisture evaporation in peak heat.
          </p>
        </div>

        {/* Deep Dive Feature 1: Built-In Towel */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-electric-blue/10 border border-electric-blue/30 text-electric-blue text-xs font-bold uppercase tracking-widest">
              <Zap className="w-3.5 h-3.5" /> Innovation 01
            </div>
            <h2 className="text-3xl sm:text-4xl font-black uppercase font-display tracking-tight text-white">
              Built-In Microfiber Hem Towel
            </h2>
            <p className="text-sm text-slate-300 leading-relaxed">
              Discreetly integrated along the inner lower hemline and wrist cuffs. Traditional jerseys use regular polyester which merely smears sweat and stings the eyes. Our proprietary microfiber wipe absorbs moisture immediately on contact.
            </p>
            <div className="space-y-3 pt-2">
              <div className="flex items-start gap-3 p-3.5 rounded-xl bg-[#11121a] border border-white/5">
                <CheckCircle2 className="w-4 h-4 text-electric-blue shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-white uppercase">Discreet & Weightless</h4>
                  <p className="text-[11px] text-slate-400">Maintains the identical sleek silhouette and drape of an elite match jersey.</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3.5 rounded-xl bg-[#11121a] border border-white/5">
                <CheckCircle2 className="w-4 h-4 text-electric-blue shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-white uppercase">Anti-Bacterial & Odor-Free</h4>
                  <p className="text-[11px] text-slate-400">Treated with antimicrobial finish to resist game-day odor buildup.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="relative aspect-[4/3] rounded-3xl overflow-hidden border border-white/10 shadow-2xl bg-[#13141f]">
              <img
                src="https://images.unsplash.com/photo-1543351611-58f69d7c1781?q=80&w=1200&auto=format&fit=crop"
                alt="Microfiber Hem Detail"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-6">
                <span className="text-xs font-bold uppercase text-electric-blue tracking-wider">
                  Micro-Terry Inner Surface Weave
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Deep Dive Feature 2: Quick-Dry Fabric */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-6 order-2 lg:order-1">
            <div className="relative aspect-[4/3] rounded-3xl overflow-hidden border border-white/10 shadow-2xl bg-[#13141f]">
              <img
                src="https://images.unsplash.com/photo-1518609878373-06d740f60d8b?q=80&w=1200&auto=format&fit=crop"
                alt="Quick Dry Sports Fabric"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-6">
                <span className="text-xs font-bold uppercase text-cyan-300 tracking-wider">
                  Capillary Moisture Dispersion Mesh
                </span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 space-y-6 order-1 lg:order-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-bold uppercase tracking-widest">
              <Droplets className="w-3.5 h-3.5" /> Innovation 02
            </div>
            <h2 className="text-3xl sm:text-4xl font-black uppercase font-display tracking-tight text-white">
              Quick-Dry Capillary Aeromesh
            </h2>
            <p className="text-sm text-slate-300 leading-relaxed">
              Constructed from dual-density hydro-filament yarns. The inner layer wicks sweat away from the athlete&apos;s skin in seconds, transferring it to the outer layer where expansive airflow accelerates evaporation.
            </p>
            <div className="space-y-3 pt-2">
              <div className="flex items-start gap-3 p-3.5 rounded-xl bg-[#11121a] border border-white/5">
                <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-white uppercase">Rapid Vaporization</h4>
                  <p className="text-[11px] text-slate-400">Dries 3x faster than conventional sports polyester blends.</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3.5 rounded-xl bg-[#11121a] border border-white/5">
                <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-white uppercase">Zero Cling & Zero Drag</h4>
                  <p className="text-[11px] text-slate-400">Eliminates the heavy, wet-blanket sensation during extra time.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Side-by-side comparison */}
        <TechComparison />

        {/* Bottom CTA */}
        <div className="text-center p-12 rounded-3xl bg-gradient-to-r from-[#12131d] to-[#0e1017] border border-white/10 space-y-4">
          <h3 className="text-2xl sm:text-3xl font-black uppercase font-display text-white">
            Experience The Difference on Matchday
          </h3>
          <p className="text-xs sm:text-sm text-slate-400 max-w-lg mx-auto">
            Order your JERSFITT Plus jersey today and enjoy fast Pan-India shipping with Cash on Delivery options.
          </p>
          <div className="pt-2">
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-electric-blue text-black font-extrabold text-xs uppercase tracking-wider shadow-glow hover:bg-cyan-300 transition-colors"
            >
              Shop JERSFITT Plus <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
