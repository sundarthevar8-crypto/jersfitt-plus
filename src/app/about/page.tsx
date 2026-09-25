import React from 'react';
import Link from 'next/link';
import { ArrowRight, ShieldCheck, Zap, Droplets, HeartHandshake } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0c] text-white py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-16">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-blue-400">
            About Our Brand
          </span>
          <h1 className="text-4xl font-black uppercase font-display tracking-tight text-white">
            About JERSFITT Plus
          </h1>
          <p className="text-sm text-zinc-300 leading-relaxed">
            JERSFITT Plus combines sportswear and convenience through a jersey with an integrated sweat-absorbing towel and quick-dry sports fabric.
          </p>
        </div>

        {/* 4 Core Pillars */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="sport-card p-6 space-y-2">
            <span className="text-xs font-bold uppercase text-blue-400">Pillar 01</span>
            <h3 className="text-base font-bold uppercase text-white font-display">Comfort</h3>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Designed with soft polyester fabric and ergonomic cuts that allow full freedom of motion during gym workouts, running and outdoor sports.
            </p>
          </div>

          <div className="sport-card p-6 space-y-2">
            <span className="text-xs font-bold uppercase text-blue-400">Pillar 02</span>
            <h3 className="text-base font-bold uppercase text-white font-display">Performance</h3>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Quick-dry sports fabric actively manages body sweat, keeping you cool, light and focused without heavy, wet cling.
            </p>
          </div>

          <div className="sport-card p-6 space-y-2">
            <span className="text-xs font-bold uppercase text-blue-400">Pillar 03</span>
            <h3 className="text-base font-bold uppercase text-white font-display">Convenience</h3>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Discreet microfiber towel panel eliminates the need to carry separate gym rags or stop play to find a towel.
            </p>
          </div>

          <div className="sport-card p-6 space-y-2">
            <span className="text-xs font-bold uppercase text-blue-400">Pillar 04</span>
            <h3 className="text-base font-bold uppercase text-white font-display">Innovation</h3>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Practical dual-function apparel that addresses everyday athlete frustrations through smart material integration.
            </p>
          </div>
        </div>

        {/* Pricing Transparency & Mission */}
        <div className="sport-card p-8 text-center space-y-4">
          <h3 className="text-xl font-bold uppercase text-white font-display">
            Direct & Transparent Sportswear
          </h3>
          <p className="text-xs text-zinc-400 max-w-lg mx-auto leading-relaxed">
            By operating direct-to-consumer, we offer our high-performance jersey with integrated towel at an accessible ₹800 price point across India.
          </p>
          <div className="pt-2">
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 px-6 py-3 rounded bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs uppercase tracking-wider transition-colors"
            >
              Order JERSFITT Plus — ₹800 <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
