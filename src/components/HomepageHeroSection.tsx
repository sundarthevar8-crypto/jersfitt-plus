'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Check, Zap, Droplets, Layers } from 'lucide-react';
import { useCart } from '@/context/CartContext';

interface Colorway {
  id: string;
  name: string;
  label: string;
  bodyColor: string;
  accentColor: string;
  slug: string;
  frontImage: string;
  backImage: string;
  angleImage: string;
  sidesImage: string;
  description: string;
}

const COLORWAYS: Colorway[] = [
  {
    id: 'black-blue',
    name: 'Stealth Black / Royal Blue',
    label: 'BLACK / BLUE',
    bodyColor: '#121215',
    accentColor: '#2563eb',
    slug: 'jersfitt-plus-black-blue',
    frontImage: '/images/jersey/black-blue-front.jpg',
    backImage: '/images/jersey/black-blue-back.png',
    angleImage: '/images/jersey/black-blue-angle.jpg',
    sidesImage: '/images/jersey/black-blue-sides.jpg',
    description: 'Official master reference prototype with royal blue side accents & integrated microfiber hem towel.',
  },
  {
    id: 'red-black',
    name: 'Crimson Red / Stealth Black',
    label: 'RED / BLACK',
    bodyColor: '#dc2626',
    accentColor: '#18181b',
    slug: 'jersfitt-plus-red-black',
    frontImage: '/images/jersey/red-black-front.jpg',
    backImage: '/images/jersey/red-black-back.png',
    angleImage: '/images/jersey/red-black-angle.jpg',
    sidesImage: '/images/jersey/red-black-sides.jpg',
    description: 'High-intensity crimson red body with black ergonomic accents and integrated sweat towel.',
  },
  {
    id: 'blue-red',
    name: 'Royal Blue / Crimson Red',
    label: 'BLUE / RED',
    bodyColor: '#2563eb',
    accentColor: '#dc2626',
    slug: 'jersfitt-plus-blue-red',
    frontImage: '/images/jersey/blue-red-front.jpg',
    backImage: '/images/jersey/blue-red-back.png',
    angleImage: '/images/jersey/blue-red-angle.jpg',
    sidesImage: '/images/jersey/blue-red-sides.jpg',
    description: 'Electric royal blue body with red athletic accents and integrated microfiber wipe panel.',
  },
  {
    id: 'white-pink',
    name: 'Optic White / Electric Pink',
    label: 'WHITE / PINK',
    bodyColor: '#f4f4f5',
    accentColor: '#ec4899',
    slug: 'jersfitt-plus-white-pink',
    frontImage: '/images/jersey/white-pink-front.jpg',
    backImage: '/images/jersey/white-pink-back.png',
    angleImage: '/images/jersey/white-pink-angle.jpg',
    sidesImage: '/images/jersey/white-pink-sides.jpg',
    description: 'Clean optic white sports jersey with electric pink accents and integrated sweat towel panel.',
  },
];

const VIEW_TITLES = ['FRONT VIEW', 'BACK VIEW', 'SIDE VIEW', 'DETAIL VIEW'];

export default function HomepageHeroSection() {
  const [selectedColorIndex, setSelectedColorIndex] = useState(0);
  const [activeViewIndex, setActiveViewIndex] = useState(0);
  const { addToCart } = useCart();
  const [isAdded, setIsAdded] = useState(false);

  const activeColor = COLORWAYS[selectedColorIndex];
  const activeImages = [
    activeColor.frontImage,
    activeColor.backImage,
    activeColor.angleImage,
    activeColor.sidesImage,
  ];
  const currentImage = activeImages[activeViewIndex] || activeColor.frontImage;

  const handleQuickAdd = () => {
    addToCart({
      id: `${activeColor.slug}-M`,
      productId: activeColor.slug,
      name: `JERSFITT Plus — ${activeColor.label}`,
      edition: 'Official Launch Edition',
      slug: activeColor.slug,
      image: activeColor.frontImage,
      color: activeColor.label,
      size: 'M',
      price: 800,
      quantity: 1,
      maxStock: 50,
    });
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  return (
    <section className="relative border-b border-zinc-800 bg-[#0d0d11]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        {/* Left Hero Content */}
        <div className="lg:col-span-6 space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-zinc-800/80 border border-zinc-700 text-zinc-300 text-xs font-semibold tracking-wider uppercase">
            <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
            Official Sportswear Launch • 4 Colorways
          </div>

          <div className="space-y-2">
            <h2 className="text-blue-500 font-display font-black text-2xl tracking-tight uppercase">
              JERSFITT PLUS
            </h2>
            <h1 className="text-4xl sm:text-6xl font-black font-display uppercase tracking-tight text-white leading-none">
              THE JERSEY <br />
              WITH A BUILT-IN TOWEL.
            </h1>
          </div>

          <p className="text-base text-zinc-300 leading-relaxed max-w-xl">
            Performance meets convenience with an integrated sweat-wiping towel and quick-dry sports fabric. Built for footballers and athletes who demand uninterrupted focus.
          </p>

          {/* Colorway Switcher Bar */}
          <div className="space-y-2 pt-2">
            <span className="text-xs font-bold uppercase tracking-wider text-zinc-400 block">
              Choose Colorway: <strong className="text-white">{activeColor.label}</strong>
            </span>
            <div className="flex flex-wrap gap-2.5">
              {COLORWAYS.map((c, idx) => (
                <button
                  key={c.id}
                  onClick={() => {
                    setSelectedColorIndex(idx);
                    setActiveViewIndex(0);
                  }}
                  className={`px-3.5 py-2 rounded text-xs font-bold uppercase flex items-center gap-2 border transition-all ${
                    selectedColorIndex === idx
                      ? 'bg-zinc-800 border-blue-500 text-white ring-1 ring-blue-500 shadow-md'
                      : 'bg-zinc-900/80 border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-700'
                  }`}
                >
                  <span
                    className="w-3.5 h-3.5 rounded-full border border-white/20 shrink-0"
                    style={{
                      backgroundColor: c.bodyColor,
                      boxShadow: `inset 0 0 0 2px ${c.accentColor}`,
                    }}
                  />
                  <span>{c.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* CTAs */}
          <div className="pt-3 flex flex-col sm:flex-row items-center gap-3">
            <Link
              href={`/product/${activeColor.slug}`}
              className="w-full sm:w-auto px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm uppercase tracking-wider rounded transition-colors flex items-center justify-center gap-2"
            >
              SHOP {activeColor.label} — ₹800 <ArrowRight className="w-4 h-4" />
            </Link>
            <button
              onClick={handleQuickAdd}
              className={`w-full sm:w-auto px-6 py-4 rounded font-bold text-sm uppercase tracking-wider transition-colors border flex items-center justify-center gap-2 ${
                isAdded
                  ? 'bg-emerald-600 text-white border-emerald-500'
                  : 'bg-zinc-900 hover:bg-zinc-800 text-zinc-200 border-zinc-700'
              }`}
            >
              {isAdded ? (
                <>
                  <Check className="w-4 h-4" /> Added to Bag!
                </>
              ) : (
                <>Quick Add (Size M)</>
              )}
            </button>
          </div>

          {/* Micro value badges */}
          <div className="pt-6 border-t border-zinc-800/80 grid grid-cols-3 gap-4 text-xs text-zinc-400">
            <div>
              <strong className="block text-white text-sm font-bold">100% Microfiber</strong>
              <span>Integrated Hem Towel</span>
            </div>
            <div>
              <strong className="block text-white text-sm font-bold">Quick-Dry</strong>
              <span>Performance Polyester</span>
            </div>
            <div>
              <strong className="block text-white text-sm font-bold">₹800 Flat</strong>
              <span>Transparent Pricing</span>
            </div>
          </div>
        </div>

        {/* Right Hero Product Image & Angle Switcher */}
        <div className="lg:col-span-6 space-y-3">
          <div className="relative rounded-2xl overflow-hidden bg-[#141418] border border-zinc-800 group shadow-2xl">
            <div className="aspect-[4/3] relative overflow-hidden bg-black flex items-center justify-center p-3">
              <img
                key={currentImage}
                src={currentImage}
                alt={`JERSFITT Plus — ${activeColor.label} ${VIEW_TITLES[activeViewIndex]}`}
                className="w-full h-full object-contain object-center transition-all duration-300"
              />
              <div className="absolute top-4 left-4">
                <span className="px-3 py-1 text-xs font-bold uppercase tracking-wider bg-black/80 backdrop-blur-xs text-white border border-zinc-700 rounded">
                  {VIEW_TITLES[activeViewIndex] || activeColor.label}
                </span>
              </div>
              <div className="absolute top-4 right-4">
                <span className="px-3 py-1 text-xs font-black uppercase tracking-wider bg-blue-600 text-white rounded">
                  ₹800
                </span>
              </div>
            </div>

            <div className="p-4 bg-[#111115] border-t border-zinc-800 flex items-center justify-between">
              <div>
                <span className="text-xs font-bold uppercase text-white tracking-wider block">
                  JERSFITT Plus — {activeColor.name}
                </span>
                <span className="text-xs text-zinc-400">Integrated Microfiber Towel Panel</span>
              </div>
              <Link
                href={`/product/${activeColor.slug}`}
                className="text-xs font-bold text-blue-400 hover:text-white uppercase tracking-wider flex items-center gap-1"
              >
                Full Specs <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Angle Thumbnails */}
          <div className="grid grid-cols-4 gap-2">
            {[
              { label: 'Front View', img: activeColor.frontImage },
              { label: 'Back View', img: activeColor.backImage },
              { label: 'Side Angle', img: activeColor.angleImage },
              { label: 'Detail View', img: activeColor.sidesImage },
            ].map((view, vIdx) => (
              <button
                key={vIdx}
                onClick={() => setActiveViewIndex(vIdx)}
                className={`p-1.5 rounded-lg bg-zinc-900 border transition-all flex flex-col items-center text-center ${
                  activeViewIndex === vIdx
                    ? 'border-blue-500 ring-1 ring-blue-500'
                    : 'border-zinc-800 hover:border-zinc-700 opacity-80 hover:opacity-100'
                }`}
              >
                <div className="w-full aspect-[4/3] rounded overflow-hidden bg-black mb-1 flex items-center justify-center p-0.5">
                  <img src={view.img} alt={view.label} className="w-full h-full object-contain" />
                </div>
                <span className="text-[10px] font-bold uppercase text-white block truncate w-full">
                  {view.label}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
