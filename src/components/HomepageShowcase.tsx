'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, ShoppingBag, Check } from 'lucide-react';
import { useCart } from '@/context/CartContext';

interface ColorwayCard {
  id: string;
  name: string;
  label: string;
  slug: string;
  frontImage: string;
  angleImage: string;
  sidesImage: string;
  tagline: string;
}

const COLORWAYS: ColorwayCard[] = [
  {
    id: 'black-blue',
    name: 'JERSFITT Plus — Black / Blue',
    label: 'BLACK / BLUE',
    slug: 'jersfitt-plus-black-blue',
    frontImage: '/images/jersey/black-blue-front.jpg',
    angleImage: '/images/jersey/black-blue-angle.jpg',
    sidesImage: '/images/jersey/black-blue-sides.jpg',
    tagline: 'Master reference prototype with royal blue side accents & integrated towel.',
  },
  {
    id: 'red-black',
    name: 'JERSFITT Plus — Red / Black',
    label: 'RED / BLACK',
    slug: 'jersfitt-plus-red-black',
    frontImage: '/images/jersey/red-black-front.jpg',
    angleImage: '/images/jersey/red-black-angle.jpg',
    sidesImage: '/images/jersey/red-black-sides.jpg',
    tagline: 'Crimson red body with black ergonomic accents and integrated towel.',
  },
  {
    id: 'blue-red',
    name: 'JERSFITT Plus — Blue / Red',
    label: 'BLUE / RED',
    slug: 'jersfitt-plus-blue-red',
    frontImage: '/images/jersey/blue-red-front.jpg',
    angleImage: '/images/jersey/blue-red-angle.jpg',
    sidesImage: '/images/jersey/blue-red-sides.jpg',
    tagline: 'Royal blue body with crimson accents and integrated microfiber towel.',
  },
  {
    id: 'white-pink',
    name: 'JERSFITT Plus — White / Pink',
    label: 'WHITE / PINK',
    slug: 'jersfitt-plus-white-pink',
    frontImage: '/images/jersey/white-pink-front.jpg',
    angleImage: '/images/jersey/white-pink-angle.jpg',
    sidesImage: '/images/jersey/white-pink-sides.jpg',
    tagline: 'Optic white athletic body with electric pink trims and towel panel.',
  },
];

export default function HomepageShowcase() {
  const [selectedSizes, setSelectedSizes] = useState<Record<string, string>>({
    'black-blue': 'M',
    'red-black': 'M',
    'blue-red': 'M',
    'white-pink': 'M',
  });
  const [addedState, setAddedState] = useState<Record<string, boolean>>({});
  const { addToCart } = useCart();

  const handleSizeChange = (colorId: string, size: string) => {
    setSelectedSizes((prev) => ({ ...prev, [colorId]: size }));
  };

  const handleQuickAdd = (colorway: ColorwayCard) => {
    const sz = selectedSizes[colorway.id] || 'M';
    addToCart({
      id: `${colorway.slug}-${sz}`,
      productId: colorway.slug,
      name: colorway.name,
      edition: 'Official Launch Edition',
      slug: colorway.slug,
      image: colorway.frontImage,
      color: colorway.label,
      size: sz,
      price: 800,
      quantity: 1,
      maxStock: 50,
    });

    setAddedState((prev) => ({ ...prev, [colorway.id]: true }));
    setTimeout(() => {
      setAddedState((prev) => ({ ...prev, [colorway.id]: false }));
    }, 1800);
  };

  return (
    <section className="py-20 bg-[#0a0a0c] border-b border-zinc-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-blue-400">
              Official 4-Colorway Collection
            </span>
            <h2 className="text-3xl sm:text-4xl font-black uppercase font-display tracking-tight text-white mt-1">
              JERSFITT Plus Performance Jerseys
            </h2>
            <p className="text-xs text-zinc-400 mt-1 max-w-xl">
              Identical master construction across all 4 colorways. Built-in light grey microfiber towel, athletic cut, and quick-dry polyester fabric.
            </p>
          </div>
          <div className="text-left md:text-right">
            <span className="text-xs text-zinc-400 block">Flat Retail Price</span>
            <span className="text-3xl font-black text-white font-display">₹800</span>
          </div>
        </div>

        {/* 4 Colorway Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {COLORWAYS.map((c) => {
            const currentSize = selectedSizes[c.id] || 'M';
            const isItemAdded = addedState[c.id] || false;

            return (
              <div key={c.id} className="sport-card overflow-hidden flex flex-col justify-between group">
                <div>
                  {/* Image container */}
                  <div className="relative aspect-[4/3] bg-zinc-900 overflow-hidden">
                    <Link href={`/product/${c.slug}`}>
                      <img
                        src={c.frontImage}
                        alt={c.name}
                        className="w-full h-full object-contain object-center group-hover:scale-102 transition-transform duration-300 p-2"
                      />
                    </Link>
                    <div className="absolute top-2.5 left-2.5">
                      <span className="px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-black/80 text-white rounded">
                        {c.label}
                      </span>
                    </div>
                    <div className="absolute top-2.5 right-2.5">
                      <span className="px-2 py-0.5 text-[10px] font-black uppercase bg-blue-600 text-white rounded">
                        ₹800
                      </span>
                    </div>
                  </div>

                  {/* Body Info */}
                  <div className="p-4 space-y-2">
                    <div className="flex items-center justify-between text-[11px] text-zinc-400">
                      <span>Official Edition</span>
                      <span className="text-blue-400 font-semibold">Microfiber Towel</span>
                    </div>

                    <Link href={`/product/${c.slug}`}>
                      <h3 className="font-display font-bold text-sm text-white group-hover:text-blue-400 transition-colors uppercase leading-snug">
                        {c.name}
                      </h3>
                    </Link>

                    <p className="text-[11px] text-zinc-400 leading-relaxed line-clamp-2">
                      {c.tagline}
                    </p>
                  </div>
                </div>

                {/* Bottom Actions & Size Selector */}
                <div className="p-4 pt-0 space-y-3">
                  <div className="pt-3 border-t border-zinc-800 space-y-1.5">
                    <div className="flex items-center justify-between text-[10px] text-zinc-400">
                      <span>Size: <strong>{currentSize}</strong></span>
                    </div>

                    <div className="grid grid-cols-5 gap-1">
                      {['S', 'M', 'L', 'XL', 'XXL'].map((sz) => (
                        <button
                          key={sz}
                          type="button"
                          onClick={() => handleSizeChange(c.id, sz)}
                          className={`py-1 text-[10px] font-bold rounded transition-colors ${
                            currentSize === sz
                              ? 'bg-blue-600 text-white'
                              : 'bg-zinc-850 hover:bg-zinc-800 text-zinc-300'
                          }`}
                        >
                          {sz}
                        </button>
                      ))}
                    </div>
                  </div>

                  <button
                    onClick={() => handleQuickAdd(c)}
                    className={`w-full py-2.5 px-3 rounded font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 transition-colors ${
                      isItemAdded
                        ? 'bg-emerald-600 text-white'
                        : 'bg-zinc-800 hover:bg-blue-600 text-white'
                    }`}
                  >
                    {isItemAdded ? (
                      <>
                        <Check className="w-3.5 h-3.5" /> Added ({currentSize})
                      </>
                    ) : (
                      <>
                        <ShoppingBag className="w-3.5 h-3.5" /> Add to Bag ({currentSize}) — ₹800
                      </>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
