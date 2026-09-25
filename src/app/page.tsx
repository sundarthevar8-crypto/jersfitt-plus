import React from 'react';
import Link from 'next/link';
import {
  Zap,
  Droplets,
  Layers,
  Activity,
  CheckCircle2,
  XCircle,
  TrendingUp,
  Users,
  ShieldCheck,
  Truck,
  ArrowRight,
  Sparkles,
  Scissors,
  Check,
  RotateCcw,
  BarChart3,
  Star
} from 'lucide-react';
import { prisma } from '@/lib/prisma';
import ProductCard from '@/components/ProductCard';

export const dynamic = 'force-dynamic';

async function getHomePageData() {
  const products = await prisma.product.findMany({
    include: {
      variants: true,
      reviews: { where: { isApproved: true } },
    },
    take: 1,
  });

  const reviews = await prisma.review.findMany({
    where: { isApproved: true },
    take: 3,
  });

  const formattedProducts = products.map((p) => {
    let images: string[] = [];
    try {
      images = JSON.parse(p.images);
    } catch {
      images = [p.images];
    }
    return { ...p, images };
  });

  return { product: formattedProducts[0] || null, reviews };
}

import HomepageHeroSection from '@/components/HomepageHeroSection';
import HomepageShowcase from '@/components/HomepageShowcase';

export default async function HomePage() {
  const { product, reviews } = await getHomePageData();

  return (
    <div className="flex flex-col min-h-screen bg-[#0a0a0c] text-zinc-100">
      {/* 1. HERO SECTION WITH DYNAMIC COLORWAY SWITCHER */}
      <HomepageHeroSection />

      {/* 2. PRODUCT SHOWCASE (ALL 4 COLORWAYS & MULTI-ANGLES) */}
      <HomepageShowcase />

      {/* 3. CORE FEATURES */}
      <section id="features" className="py-20 bg-[#0d0d11] border-b border-zinc-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-bold uppercase tracking-widest text-blue-400">
              Product Features
            </span>
            <h2 className="text-3xl font-black uppercase font-display tracking-tight text-white">
              Engineered For Sportswear Convenience
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Feature 01 */}
            <div className="sport-card p-6 space-y-4">
              <span className="text-xs font-bold uppercase tracking-wider text-zinc-400">Feature 01</span>
              <div className="w-10 h-10 rounded bg-blue-950/60 border border-blue-800/60 flex items-center justify-center text-blue-400">
                <Zap className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold uppercase text-white font-display">Built-In Towel</h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Integrated microfiber sweat-absorbing panel for convenient sweat management during physical activity.
              </p>
            </div>

            {/* Feature 02 */}
            <div className="sport-card p-6 space-y-4">
              <span className="text-xs font-bold uppercase tracking-wider text-zinc-400">Feature 02</span>
              <div className="w-10 h-10 rounded bg-blue-950/60 border border-blue-800/60 flex items-center justify-center text-blue-400">
                <Droplets className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold uppercase text-white font-display">Quick-Dry Sports Fabric</h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Sports fabric designed to help manage sweat during physical activity, keeping you light and dry.
              </p>
            </div>

            {/* Feature 03 */}
            <div className="sport-card p-6 space-y-4">
              <span className="text-xs font-bold uppercase tracking-wider text-zinc-400">Feature 03</span>
              <div className="w-10 h-10 rounded bg-blue-950/60 border border-blue-800/60 flex items-center justify-center text-blue-400">
                <Layers className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold uppercase text-white font-display">Jersey + Towel In One</h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Combines two useful functions into one sportswear product without needing extra accessories.
              </p>
            </div>

            {/* Feature 04 */}
            <div className="sport-card p-6 space-y-4">
              <span className="text-xs font-bold uppercase tracking-wider text-zinc-400">Feature 04</span>
              <div className="w-10 h-10 rounded bg-blue-950/60 border border-blue-800/60 flex items-center justify-center text-blue-400">
                <Activity className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold uppercase text-white font-display">Designed For Active Sports</h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Suitable for gym, running, football and outdoor sports requiring continuous focus and sweat management.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. HOW IT WORKS */}
      <section id="how-it-works" className="py-20 bg-[#0a0a0c] border-b border-zinc-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-bold uppercase tracking-widest text-blue-400">
              Simple 4-Step Experience
            </span>
            <h2 className="text-3xl font-black uppercase font-display tracking-tight text-white">
              How JERSFITT Plus Works
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="sport-card p-6 space-y-3">
              <span className="text-2xl font-black font-display text-blue-500">01</span>
              <h3 className="text-base font-bold uppercase text-white font-display">PLAY</h3>
              <p className="text-xs text-zinc-400 leading-relaxed">Start your activity with the comfortable athletic jersey.</p>
            </div>

            <div className="sport-card p-6 space-y-3">
              <span className="text-2xl font-black font-display text-blue-500">02</span>
              <h3 className="text-base font-bold uppercase text-white font-display">SWEAT</h3>
              <p className="text-xs text-zinc-400 leading-relaxed">Sweat naturally builds up on forehead and face during intense activity.</p>
            </div>

            <div className="sport-card p-6 space-y-3">
              <span className="text-2xl font-black font-display text-blue-500">03</span>
              <h3 className="text-base font-bold uppercase text-white font-display">WIPE</h3>
              <p className="text-xs text-zinc-400 leading-relaxed">Use the integrated microfiber panel for a soft, instantaneous wipe.</p>
            </div>

            <div className="sport-card p-6 space-y-3">
              <span className="text-2xl font-black font-display text-blue-500">04</span>
              <h3 className="text-base font-bold uppercase text-white font-display">CONTINUE</h3>
              <p className="text-xs text-zinc-400 leading-relaxed">Continue your activity without carrying or fetching a separate towel.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. MATERIALS SECTION */}
      <section id="materials" className="py-20 bg-[#0d0d11] border-b border-zinc-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-bold uppercase tracking-widest text-blue-400">
              Material Composition
            </span>
            <h2 className="text-3xl font-black uppercase font-display tracking-tight text-white">
              Polyester Body + Microfiber Panel
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Material 1: Polyester */}
            <div className="sport-card p-8 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-zinc-400">Jersey Body</span>
                <span className="px-2.5 py-0.5 rounded bg-zinc-800 text-xs font-bold text-zinc-200">Main Structure</span>
              </div>
              <h3 className="text-2xl font-black uppercase text-white font-display">POLYESTER</h3>
              <p className="text-xs text-zinc-300 leading-relaxed">
                Polyester fabric is used for the main body of the jersey. It provides lightweight durability, high breathability, and rapid moisture-wicking properties during movement.
              </p>
              <ul className="space-y-1.5 text-xs text-zinc-400 pt-2 border-t border-zinc-800">
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-blue-400" /> Lightweight sports grade
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-blue-400" /> Quick-dry performance
                </li>
              </ul>
            </div>

            {/* Material 2: Microfiber */}
            <div className="sport-card p-8 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-zinc-400">Sweat-Absorbing Panel</span>
                <span className="px-2.5 py-0.5 rounded bg-blue-950/60 text-xs font-bold text-blue-400 border border-blue-800/60">
                  Integrated Function
                </span>
              </div>
              <h3 className="text-2xl font-black uppercase text-white font-display">MICROFIBER</h3>
              <p className="text-xs text-zinc-300 leading-relaxed">
                Microfiber is used for the integrated sweat-absorbing panel. Its fine fiber structure absorbs moisture rapidly without scratching skin or adding excessive bulk.
              </p>
              <ul className="space-y-1.5 text-xs text-zinc-400 pt-2 border-t border-zinc-800">
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-blue-400" /> High moisture absorption
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-blue-400" /> Soft feel on face and brow
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 6. PROS & CONS */}
      <section className="py-20 bg-[#0a0a0c] border-b border-zinc-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-bold uppercase tracking-widest text-blue-400">
              Balanced Evaluation
            </span>
            <h2 className="text-3xl font-black uppercase font-display tracking-tight text-white">
              Pros & Cons Analysis
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* PROS Card */}
            <div className="sport-card p-8 border-l-4 border-l-emerald-500 space-y-4">
              <div className="flex items-center gap-2 text-emerald-400">
                <CheckCircle2 className="w-5 h-5" />
                <h3 className="text-xl font-black uppercase text-white font-display">PROS</h3>
              </div>
              <ul className="space-y-3 text-xs text-zinc-300">
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1.5 shrink-0" />
                  <span>Built-in towel for convenient sweat management</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1.5 shrink-0" />
                  <span>Quick-dry and comfortable sports fabric</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1.5 shrink-0" />
                  <span>Combines jersey and towel in one product</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1.5 shrink-0" />
                  <span>No need to carry a separate towel</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1.5 shrink-0" />
                  <span>Unique and innovative sportswear concept</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1.5 shrink-0" />
                  <span>Suitable for gym, running and outdoor sports</span>
                </li>
              </ul>
            </div>

            {/* CONS Card */}
            <div className="sport-card p-8 border-l-4 border-l-zinc-500 space-y-4">
              <div className="flex items-center gap-2 text-zinc-400">
                <XCircle className="w-5 h-5" />
                <h3 className="text-xl font-black uppercase text-white font-display">CONS</h3>
              </div>
              <ul className="space-y-3 text-xs text-zinc-400">
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-zinc-500 mt-1.5 shrink-0" />
                  <span>Higher production cost due to towel integration</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-zinc-500 mt-1.5 shrink-0" />
                  <span>More complex manufacturing and stitching</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-zinc-500 mt-1.5 shrink-0" />
                  <span>Slightly heavier than a regular jersey</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-zinc-500 mt-1.5 shrink-0" />
                  <span>Requires proper washing and drying care</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-zinc-500 mt-1.5 shrink-0" />
                  <span>New concept may require customer awareness</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 7. PRICING & COST BREAKDOWN */}
      <section id="pricing" className="py-20 bg-[#0d0d11] border-b border-zinc-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-bold uppercase tracking-widest text-blue-400">
              Unit Economics
            </span>
            <h2 className="text-3xl font-black uppercase font-display tracking-tight text-white">
              Transparent Pricing & Cost Breakdown
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Material Cost Per Unit */}
            <div className="lg:col-span-6 sport-card p-6 sm:p-8 space-y-4">
              <h3 className="text-sm font-bold uppercase tracking-wider text-zinc-300">
                Material Cost Per Unit
              </h3>
              <div className="divide-y divide-zinc-800 text-xs">
                <div className="py-2.5 flex justify-between">
                  <span className="text-zinc-400">Sports Fabric</span>
                  <strong className="text-white">₹180</strong>
                </div>
                <div className="py-2.5 flex justify-between">
                  <span className="text-zinc-400">Built-in Towel Material</span>
                  <strong className="text-white">₹60</strong>
                </div>
                <div className="py-2.5 flex justify-between">
                  <span className="text-zinc-400">Stitching & Labour</span>
                  <strong className="text-white">₹70</strong>
                </div>
                <div className="py-2.5 flex justify-between">
                  <span className="text-zinc-400">Printing / Branding</span>
                  <strong className="text-white">₹30</strong>
                </div>
                <div className="py-2.5 flex justify-between">
                  <span className="text-zinc-400">Packaging</span>
                  <strong className="text-white">₹20</strong>
                </div>
                <div className="py-3 flex justify-between text-sm font-bold text-white pt-3 border-t border-zinc-700">
                  <span>PRODUCTION COST</span>
                  <span className="text-blue-400 font-display text-lg">₹360 / UNIT</span>
                </div>
              </div>
            </div>

            {/* Commercial Margin Summary */}
            <div className="lg:col-span-6 grid grid-cols-2 gap-4">
              <div className="sport-card p-6 space-y-1">
                <span className="text-[11px] font-bold uppercase text-zinc-400">Selling Price</span>
                <div className="text-3xl font-black text-white font-display">₹800</div>
                <p className="text-[10px] text-zinc-400">Customer retail price</p>
              </div>

              <div className="sport-card p-6 space-y-1">
                <span className="text-[11px] font-bold uppercase text-zinc-400">Gross Profit</span>
                <div className="text-3xl font-black text-emerald-400 font-display">₹440</div>
                <p className="text-[10px] text-zinc-400">Per unit sold</p>
              </div>

              <div className="sport-card p-6 space-y-1">
                <span className="text-[11px] font-bold uppercase text-zinc-400">Gross Margin</span>
                <div className="text-3xl font-black text-blue-400 font-display">55%</div>
                <p className="text-[10px] text-zinc-400">Gross profit margin</p>
              </div>

              <div className="sport-card p-6 space-y-1">
                <span className="text-[11px] font-bold uppercase text-zinc-400">Markup on Cost</span>
                <div className="text-3xl font-black text-blue-400 font-display">122.2%</div>
                <p className="text-[10px] text-zinc-400">Standard apparel markup</p>
              </div>

              <div className="col-span-2 sport-card p-6 flex items-center justify-between bg-zinc-900/60 border border-zinc-700">
                <div>
                  <span className="text-xs font-bold uppercase text-zinc-400 block">
                    Estimated Gross Profit Per 100 Units
                  </span>
                  <span className="text-2xl font-black text-white font-display">₹44,000</span>
                </div>
                <Link
                  href="/shop"
                  className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs uppercase tracking-wider rounded transition-colors"
                >
                  Order Jersey — ₹800
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 8. PRODUCTION PROCESS */}
      <section className="py-20 bg-[#0a0a0c] border-b border-zinc-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-bold uppercase tracking-widest text-blue-400">
              Manufacturing Steps
            </span>
            <h2 className="text-3xl font-black uppercase font-display tracking-tight text-white">
              Production Process
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="sport-card p-6 space-y-2">
              <span className="text-xs font-bold uppercase text-blue-400">01 — Step 1</span>
              <h3 className="text-base font-bold uppercase text-white font-display">Material Selection</h3>
              <p className="text-xs text-zinc-400">Polyester body material + microfiber towel selection.</p>
            </div>

            <div className="sport-card p-6 space-y-2">
              <span className="text-xs font-bold uppercase text-blue-400">02 — Step 2</span>
              <h3 className="text-base font-bold uppercase text-white font-display">Fabric Cutting</h3>
              <p className="text-xs text-zinc-400">Precision cut to jersey size and ergonomic pattern design.</p>
            </div>

            <div className="sport-card p-6 space-y-2">
              <span className="text-xs font-bold uppercase text-blue-400">03 — Step 3</span>
              <h3 className="text-base font-bold uppercase text-white font-display">Towel Integration</h3>
              <p className="text-xs text-zinc-400">Positioning and alignment of microfiber sweat panels.</p>
            </div>

            <div className="sport-card p-6 space-y-2">
              <span className="text-xs font-bold uppercase text-blue-400">04 — Step 4</span>
              <h3 className="text-base font-bold uppercase text-white font-display">Stitching & Assembly</h3>
              <p className="text-xs text-zinc-400">Joining all sections with reinforced, durable seams.</p>
            </div>

            <div className="sport-card p-6 space-y-2">
              <span className="text-xs font-bold uppercase text-blue-400">05 — Step 5</span>
              <h3 className="text-base font-bold uppercase text-white font-display">Quality Check</h3>
              <p className="text-xs text-zinc-400">Inspecting size dimensions, stitching integrity and fabric quality.</p>
            </div>

            <div className="sport-card p-6 space-y-2">
              <span className="text-xs font-bold uppercase text-blue-400">06 — Step 6</span>
              <h3 className="text-base font-bold uppercase text-white font-display">Packaging & Distribution</h3>
              <p className="text-xs text-zinc-400">Folding, eco-labeling and preparing for dispatch and delivery.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 9. TARGET AUDIENCE & MARKET RESEARCH */}
      <section className="py-20 bg-[#0d0d11] border-b border-zinc-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Target Audience Card */}
            <div className="lg:col-span-6 sport-card p-8 space-y-6">
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-blue-400">Audience Profile</span>
                <h3 className="text-2xl font-black uppercase text-white font-display mt-1">Target Audience</h3>
              </div>

              <div className="grid grid-cols-2 gap-4 text-xs">
                <div className="p-3 bg-zinc-900 rounded border border-zinc-800">
                  <span className="text-zinc-400 block text-[11px] uppercase">Age</span>
                  <strong className="text-white text-sm">18–35 Years</strong>
                </div>
                <div className="p-3 bg-zinc-900 rounded border border-zinc-800">
                  <span className="text-zinc-400 block text-[11px] uppercase">Gender</span>
                  <strong className="text-white text-sm">Male & Female</strong>
                </div>
                <div className="p-3 bg-zinc-900 rounded border border-zinc-800">
                  <span className="text-zinc-400 block text-[11px] uppercase">Location</span>
                  <strong className="text-white text-sm">Urban Areas</strong>
                </div>
                <div className="p-3 bg-zinc-900 rounded border border-zinc-800">
                  <span className="text-zinc-400 block text-[11px] uppercase">Lifestyle</span>
                  <strong className="text-white text-sm">Active Lifestyle</strong>
                </div>
              </div>

              <div className="p-3 bg-zinc-900 rounded border border-zinc-800 text-xs">
                <span className="text-zinc-400 block text-[11px] uppercase">Primary Focus</span>
                <strong className="text-white text-sm">Product Performance & Sweat Convenience</strong>
              </div>
            </div>

            {/* Market Research Stat */}
            <div className="lg:col-span-6 sport-card p-8 space-y-4 bg-blue-950/20 border-blue-900/60">
              <span className="text-xs font-bold uppercase tracking-widest text-blue-400">Market Research</span>
              <div className="text-6xl sm:text-7xl font-black font-display text-white">60%</div>
              <h3 className="text-lg font-bold uppercase text-blue-300 font-display">
                PARTICIPANTS PREFER A BUILT-IN TOWEL
              </h3>
              <p className="text-xs text-zinc-300 leading-relaxed">
                &ldquo;Our analysis highlights the convenience of having a built-in towel instead of carrying a separate one.&rdquo;
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 10. DISTRIBUTION STRATEGY */}
      <section className="py-20 bg-[#0a0a0c] border-b border-zinc-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-bold uppercase tracking-widest text-blue-400">
              Channel Strategy
            </span>
            <h2 className="text-3xl font-black uppercase font-display tracking-tight text-white">
              Distribution Channels
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="sport-card p-8 space-y-4 border-l-4 border-l-blue-600">
              <h3 className="text-xl font-bold uppercase text-white font-display">DIRECT-TO-CONSUMER (D2C)</h3>
              <ul className="space-y-2 text-xs text-zinc-300">
                <li className="flex items-center gap-2">✓ Own online platform</li>
                <li className="flex items-center gap-2">✓ Control over branding & pricing</li>
                <li className="flex items-center gap-2">✓ Direct customer feedback</li>
                <li className="flex items-center gap-2">✓ Higher direct gross margins (55%)</li>
                <li className="flex items-center gap-2">✓ Personalized customer experience</li>
              </ul>
            </div>

            <div className="sport-card p-8 space-y-4 border-l-4 border-l-zinc-600">
              <h3 className="text-xl font-bold uppercase text-white font-display">SECONDARY DISTRIBUTION</h3>
              <ul className="space-y-2 text-xs text-zinc-400">
                <li className="flex items-center gap-2">• Retail sports store partnerships</li>
                <li className="flex items-center gap-2">• Wholesale club & academy supply</li>
                <li className="flex items-center gap-2">• Wider geographic customer reach</li>
                <li className="flex items-center gap-2">• Lower wholesale margins</li>
                <li className="flex items-center gap-2">• Scaled volume distribution</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 11. REVIEWS SECTION */}
      <section className="py-20 bg-[#0d0d11] border-b border-zinc-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-blue-400">
                Customer Feedback
              </span>
              <h2 className="text-3xl font-black uppercase font-display tracking-tight text-white mt-1">
                Athlete Reviews
              </h2>
            </div>
            <Link
              href="/reviews"
              className="text-xs font-bold uppercase text-blue-400 hover:text-white flex items-center gap-1"
            >
              View All Reviews <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {reviews.map((r) => (
              <div key={r.id} className="sport-card p-6 space-y-3 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-1 text-amber-400 mb-2">
                    {[...Array(r.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400" />
                    ))}
                  </div>
                  <h4 className="text-sm font-bold text-white uppercase">&ldquo;{r.title}&rdquo;</h4>
                  <p className="text-xs text-zinc-300 mt-2 leading-relaxed">&ldquo;{r.comment}&rdquo;</p>
                </div>
                <div className="pt-3 border-t border-zinc-800 text-xs text-zinc-400 flex justify-between">
                  <span className="font-semibold text-zinc-200">{r.authorName}</span>
                  <span>Sample Review</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 12. FINAL CTA */}
      <section className="py-20 bg-[#0a0a0c]">
        <div className="max-w-4xl mx-auto px-4 text-center space-y-6">
          <h2 className="text-4xl sm:text-5xl font-black uppercase font-display tracking-tight text-white">
            READY TO UPGRADE YOUR SPORTSWEAR?
          </h2>
          <p className="text-sm text-zinc-300 max-w-xl mx-auto leading-relaxed">
            The JERSFITT Plus performance jersey with integrated sweat towel is available for ₹800 with fast nationwide delivery.
          </p>
          <div className="pt-2">
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm uppercase tracking-wider rounded transition-colors"
            >
              ORDER NOW — ₹800 <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
