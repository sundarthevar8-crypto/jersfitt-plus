import React from 'react';
import Link from 'next/link';
import { ArrowRight, Sparkles, Check, Zap, Flame, ShieldCheck } from 'lucide-react';

export default function HowItWorksPage() {
  const steps = [
    {
      num: '01',
      title: 'Put On Your JERSFITT Plus Jersey',
      desc: 'Wear it just like any high-performance athletic kit. The jersey looks, fits, and feels identical to professional matchwear with aerodynamic cuts and ultra-lightweight fabric.',
      badge: 'Step 1: Fit & Comfort',
    },
    {
      num: '02',
      title: 'Engage In High-Intensity Play',
      desc: 'During intense sprint drills, tackles, and full 90-minute matches, perspiration naturally builds up around your brow, eyes, visor, and forehead.',
      badge: 'Step 2: Match Intensity',
    },
    {
      num: '03',
      title: 'Discreet 1-Second Wipe',
      desc: 'Instead of walking to the sideline or using soggy polyester sleeves, lift the bottom inner hem of your jersey to access the soft, ultra-absorbent microfiber panel. Clean vision in a split second.',
      badge: 'Step 3: Instant Wipe',
    },
    {
      num: '04',
      title: 'Continuous Quick-Dry Evaporation',
      desc: 'The aeromesh body constantly pulls body sweat outwards, dispersing it across high-airflow micro-channels to keep you light and dry until full time.',
      badge: 'Step 4: Hydro-Evaporation',
    },
  ];

  return (
    <div className="min-h-screen bg-[#08080a] text-white py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-xs font-extrabold uppercase tracking-widest text-electric-blue">
            The Athlete Workflow
          </span>
          <h1 className="text-4xl sm:text-5xl font-black uppercase font-display tracking-tight text-white">
            How JERSFITT Plus Works
          </h1>
          <p className="text-sm text-slate-400">
            A frictionless, intuitive design that solves on-pitch sweat without altering your game.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {steps.map((s) => (
            <div
              key={s.num}
              className="p-8 rounded-3xl bg-[#101118] border border-white/10 hover:border-electric-blue/40 transition-all flex flex-col justify-between space-y-6 group"
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-5xl font-black font-display text-electric-blue/30 group-hover:text-electric-blue transition-colors">
                    {s.num}
                  </span>
                  <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-white/5 border border-white/10 text-slate-300">
                    {s.badge}
                  </span>
                </div>
                <h3 className="text-xl font-bold uppercase font-display text-white mt-4">
                  {s.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-400 mt-2 leading-relaxed">
                  {s.desc}
                </p>
              </div>

              <div className="pt-4 border-t border-white/5 flex items-center text-xs text-electric-blue font-semibold">
                <Check className="w-4 h-4 mr-1.5" /> Engineered for zero distraction
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center p-10 rounded-3xl bg-[#12131d] border border-white/10">
          <h3 className="text-xl sm:text-2xl font-black uppercase font-display text-white mb-2">
            Ready to experience effortless sweat management?
          </h3>
          <p className="text-xs text-slate-400 max-w-md mx-auto mb-6">
            Get your JERSFITT Plus jersey today with free Pan-India shipping on orders above ₹1,499.
          </p>
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-electric-blue text-black font-extrabold text-xs uppercase tracking-wider shadow-glow hover:bg-cyan-300 transition-colors"
          >
            Shop Now <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
