'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  Zap,
  Droplets,
  Truck,
  RotateCcw,
  Star,
  Check,
  ShoppingBag,
  ShieldCheck,
  Layers,
  Sparkles
} from 'lucide-react';
import { Product } from '@/types';
import { formatPrice } from '@/lib/formatters';
import { useCart } from '@/context/CartContext';

interface ColorwayOption {
  id: string;
  name: string;
  label: string;
  bodyColor: string;
  accentColor: string;
  slug: string;
  images: string[];
}

const COLORWAYS: ColorwayOption[] = [
  {
    id: 'black-blue',
    name: 'Stealth Black / Royal Blue',
    label: 'BLACK / BLUE',
    bodyColor: '#121215',
    accentColor: '#2563eb',
    slug: 'jersfitt-plus-black-blue',
    images: [
      '/images/jersey/black-blue-front.jpg',
      '/images/jersey/black-blue-back.png',
      '/images/jersey/black-blue-angle.jpg',
      '/images/jersey/black-blue-sides.jpg',
    ],
  },
  {
    id: 'red-black',
    name: 'Crimson Red / Stealth Black',
    label: 'RED / BLACK',
    bodyColor: '#dc2626',
    accentColor: '#18181b',
    slug: 'jersfitt-plus-red-black',
    images: [
      '/images/jersey/red-black-front.jpg',
      '/images/jersey/red-black-back.png',
      '/images/jersey/red-black-angle.jpg',
      '/images/jersey/red-black-sides.jpg',
    ],
  },
  {
    id: 'blue-red',
    name: 'Royal Blue / Crimson Red',
    label: 'BLUE / RED',
    bodyColor: '#2563eb',
    accentColor: '#dc2626',
    slug: 'jersfitt-plus-blue-red',
    images: [
      '/images/jersey/blue-red-front.jpg',
      '/images/jersey/blue-red-back.png',
      '/images/jersey/blue-red-angle.jpg',
      '/images/jersey/blue-red-sides.jpg',
    ],
  },
  {
    id: 'white-pink',
    name: 'Optic White / Electric Pink',
    label: 'WHITE / PINK',
    bodyColor: '#f4f4f5',
    accentColor: '#ec4899',
    slug: 'jersfitt-plus-white-pink',
    images: [
      '/images/jersey/white-pink-front.jpg',
      '/images/jersey/white-pink-back.png',
      '/images/jersey/white-pink-angle.jpg',
      '/images/jersey/white-pink-sides.jpg',
    ],
  },
];

interface ProductDetailClientProps {
  product: Product;
}

const VIEW_LABELS = ['FRONT VIEW', 'BACK VIEW', 'SIDE VIEW', 'DETAIL VIEW'];

export default function ProductDetailClient({ product }: ProductDetailClientProps) {
  const router = useRouter();
  const { addToCart } = useCart();

  // Find initial colorway from slug or product primaryColor
  const initialColorway =
    COLORWAYS.find((c) => c.slug === product.slug || product.primaryColor?.includes(c.label)) ||
    COLORWAYS[0];

  const [selectedColorway, setSelectedColorway] = useState<ColorwayOption>(initialColorway);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState<string>('M');
  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);

  // Review Form
  const [authorName, setAuthorName] = useState('');
  const [authorEmail, setAuthorEmail] = useState('');
  const [rating, setRating] = useState(5);
  const [reviewTitle, setReviewTitle] = useState('');
  const [comment, setComment] = useState('');
  const [submittingReview, setSubmittingReview] = useState(false);
  const [reviewSuccess, setReviewSuccess] = useState('');

  const currentGalleryImages = selectedColorway.images;
  const activeImage = currentGalleryImages[activeImageIndex] || currentGalleryImages[0];

  const handleColorChange = (cw: ColorwayOption) => {
    setSelectedColorway(cw);
    setActiveImageIndex(0);
  };

  const handleAddToCart = () => {
    addToCart({
      id: `${product.id}-${selectedColorway.label}-${selectedSize}`,
      productId: product.id,
      variantId: `${product.id}-${selectedSize}`,
      name: `JERSFITT Plus — ${selectedColorway.label}`,
      edition: 'Official Launch Edition',
      slug: selectedColorway.slug,
      image: selectedColorway.images[0],
      color: selectedColorway.label,
      size: selectedSize,
      price: 800,
      quantity,
      maxStock: 50,
    });
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  const handleBuyNow = () => {
    handleAddToCart();
    router.push('/checkout');
  };

  const handleReviewSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmittingReview(true);
    try {
      const res = await fetch('/api/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          productId: product.id,
          authorName,
          authorEmail,
          rating,
          title: reviewTitle,
          comment,
        }),
      });
      if (res.ok) {
        setReviewSuccess('Thank you for sharing your review.');
        setAuthorName('');
        setAuthorEmail('');
        setReviewTitle('');
        setComment('');
      }
    } catch {
      alert('Failed to submit review');
    } finally {
      setSubmittingReview(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0c] text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Main Stage */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* Gallery */}
          <div className="lg:col-span-7 space-y-4">
            <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-zinc-950 border border-zinc-800 relative flex items-center justify-center p-3">
              <img
                src={activeImage}
                alt={`${product.name} - ${VIEW_LABELS[activeImageIndex] || selectedColorway.label}`}
                className="w-full h-full object-contain object-center transition-all duration-300"
              />
              <div className="absolute top-4 left-4">
                <span className="px-3 py-1 text-xs font-bold uppercase tracking-wider bg-black/80 backdrop-blur-xs text-white border border-zinc-700 rounded">
                  {VIEW_LABELS[activeImageIndex] || selectedColorway.label}
                </span>
              </div>
              <div className="absolute top-4 right-4">
                <span className="px-3 py-1 text-xs font-black uppercase tracking-wider bg-blue-600 text-white rounded">
                  ₹800
                </span>
              </div>
            </div>

            {/* Thumbnail selector: FRONT VIEW, BACK VIEW, SIDE VIEW, DETAIL VIEW */}
            <div className="grid grid-cols-4 gap-3">
              {currentGalleryImages.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIndex(idx)}
                  className={`aspect-[4/3] rounded-lg overflow-hidden border-2 transition-all relative p-1 bg-zinc-950 flex flex-col items-center justify-between ${
                    activeImageIndex === idx
                      ? 'border-blue-500 ring-2 ring-blue-500'
                      : 'border-zinc-800 hover:border-zinc-600 opacity-75 hover:opacity-100'
                  }`}
                >
                  <img
                    src={img}
                    alt={VIEW_LABELS[idx] || `View ${idx + 1}`}
                    className="w-full h-full object-contain"
                  />
                  <span className="absolute bottom-1 inset-x-1 px-1 py-0.5 rounded bg-black/85 text-[9px] font-bold uppercase text-white text-center truncate">
                    {VIEW_LABELS[idx] || `View 0${idx + 1}`}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Buy Controls */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded bg-blue-950/60 border border-blue-800/60 text-blue-400 text-[11px] font-bold uppercase tracking-wider">
                <Zap className="w-3 h-3" /> Integrated Towel Sportswear
              </div>
              <h1 className="text-2xl sm:text-3xl font-black uppercase font-display tracking-tight text-white mt-2">
                JERSFITT Plus — {selectedColorway.label}
              </h1>

              <div className="mt-3 flex items-baseline gap-3">
                <span className="text-3xl font-black text-white font-display">₹800</span>
                <span className="text-xs text-zinc-400">Inclusive of all taxes • Free Pan-India Delivery</span>
              </div>
            </div>

            <p className="text-xs text-zinc-300 leading-relaxed">
              Engineered with 100% quick-dry athletic polyester and a concealed microfiber sweat-absorbing panel along the inner hem. No extra towels, no distractions during play.
            </p>

            {/* Colorway Switcher */}
            <div className="space-y-2.5 pt-2 border-t border-zinc-800">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-zinc-300">
                  Select Colorway: <strong className="text-white">{selectedColorway.label}</strong>
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2">
                {COLORWAYS.map((cw) => (
                  <button
                    key={cw.id}
                    type="button"
                    onClick={() => handleColorChange(cw)}
                    className={`p-2 rounded text-xs font-bold uppercase flex items-center gap-2 border transition-all ${
                      selectedColorway.id === cw.id
                        ? 'bg-zinc-800 border-blue-500 text-white ring-1 ring-blue-500'
                        : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-700'
                    }`}
                  >
                    <span
                      className="w-3.5 h-3.5 rounded-full border border-white/20 shrink-0"
                      style={{
                        backgroundColor: cw.bodyColor,
                        boxShadow: `inset 0 0 0 2px ${cw.accentColor}`,
                      }}
                    />
                    <span className="truncate">{cw.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Size Selector */}
            <div className="space-y-2 pt-2 border-t border-zinc-800">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-zinc-300">
                  Select Size: <strong className="text-white">{selectedSize}</strong>
                </span>
                <span className="text-[11px] text-zinc-400">True to athletic fit</span>
              </div>

              <div className="grid grid-cols-5 gap-2">
                {['S', 'M', 'L', 'XL', 'XXL'].map((sz) => (
                  <button
                    key={sz}
                    type="button"
                    onClick={() => setSelectedSize(sz)}
                    className={`py-2.5 rounded text-xs font-bold uppercase transition-colors ${
                      selectedSize === sz
                        ? 'bg-blue-600 text-white shadow-md'
                        : 'bg-zinc-850 hover:bg-zinc-800 text-zinc-300 border border-zinc-750'
                    }`}
                  >
                    {sz}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div className="flex items-center gap-4 pt-2">
              <span className="text-xs font-bold uppercase tracking-wider text-zinc-300">Quantity:</span>
              <div className="flex items-center border border-zinc-800 rounded bg-zinc-900 overflow-hidden">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-3 py-1.5 text-zinc-400 hover:text-white"
                >
                  -
                </button>
                <span className="px-3 py-1.5 text-xs font-bold text-white min-w-[28px] text-center">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-3 py-1.5 text-zinc-400 hover:text-white"
                >
                  +
                </button>
              </div>
            </div>

            {/* Buttons */}
            <div className="space-y-3 pt-4 border-t border-zinc-800">
              <button
                onClick={handleAddToCart}
                className={`w-full py-3.5 px-6 rounded font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-colors ${
                  isAdded
                    ? 'bg-emerald-600 text-white'
                    : 'bg-blue-600 hover:bg-blue-700 text-white'
                }`}
              >
                {isAdded ? (
                  <>
                    <Check className="w-4 h-4" /> Added to Bag!
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-4 h-4" /> Add to Bag ({selectedColorway.label} - {selectedSize}) — ₹800
                  </>
                )}
              </button>

              <button
                onClick={handleBuyNow}
                className="w-full py-3.5 px-6 rounded bg-zinc-800 hover:bg-zinc-700 text-white font-bold text-xs uppercase tracking-wider transition-colors"
              >
                Buy Now — Instant Checkout
              </button>
            </div>

            {/* Value Highlights */}
            <div className="pt-4 grid grid-cols-2 gap-3 text-xs text-zinc-400 border-t border-zinc-800">
              <div className="flex items-center gap-2">
                <Truck className="w-4 h-4 text-blue-400 shrink-0" />
                <span>Free Pan-India Delivery</span>
              </div>
              <div className="flex items-center gap-2">
                <RotateCcw className="w-4 h-4 text-blue-400 shrink-0" />
                <span>7-Day Size Exchange</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-blue-400 shrink-0" />
                <span>UPI & Cash on Delivery</span>
              </div>
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-blue-400 shrink-0" />
                <span>Integrated Microfiber Towel</span>
              </div>
            </div>
          </div>
        </div>

        {/* Technical Specs & Materials Grid */}
        <div className="pt-12 border-t border-zinc-800 space-y-6">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-blue-400">Engineering Specs</span>
            <h2 className="text-2xl font-bold uppercase font-display text-white mt-1">
              Product Specifications & Materials
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="sport-card p-6 space-y-2">
              <span className="text-xs font-bold uppercase text-blue-400">Jersey Body</span>
              <h3 className="text-base font-bold text-white uppercase font-display">100% Performance Polyester</h3>
              <p className="text-xs text-zinc-400">Lightweight sports grade, breathable, and rapid moisture dispersal.</p>
            </div>

            <div className="sport-card p-6 space-y-2">
              <span className="text-xs font-bold uppercase text-blue-400">Sweat Panel</span>
              <h3 className="text-base font-bold text-white uppercase font-display">Microfiber Absorbent Panel</h3>
              <p className="text-xs text-zinc-400">Integrated along the inner hem for fast, non-abrasive sweat wiping.</p>
            </div>

            <div className="sport-card p-6 space-y-2">
              <span className="text-xs font-bold uppercase text-blue-400">Stitching</span>
              <h3 className="text-base font-bold text-white uppercase font-display">Flatlock Athletic Seams</h3>
              <p className="text-xs text-zinc-400">Reinforced flexible stitching engineered for high-intensity movement.</p>
            </div>
          </div>
        </div>

        {/* Customer Reviews */}
        <div className="pt-12 border-t border-zinc-800 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-blue-400">Customer Feedback</span>
              <h2 className="text-2xl font-bold uppercase font-display text-white mt-1">
                Verified Reviews
              </h2>
            </div>
            <div className="flex items-center gap-1 text-amber-400 text-sm font-bold">
              <Star className="w-4 h-4 fill-amber-400" /> 4.9 / 5.0 Rating
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="sport-card p-6 space-y-2">
              <div className="flex items-center gap-1 text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                ))}
              </div>
              <h4 className="text-sm font-bold text-white uppercase">&ldquo;Super convenient for 90-minute matches&rdquo;</h4>
              <p className="text-xs text-zinc-400">
                &ldquo;Having the microfiber towel built inside the jersey hem makes a huge difference on the pitch. No more wiping sweat with damp sleeves.&rdquo;
              </p>
              <span className="text-[11px] text-zinc-500 block pt-2">Rohan Sharma • Verified Purchase</span>
            </div>

            <div className="sport-card p-6 space-y-2">
              <div className="flex items-center gap-1 text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                ))}
              </div>
              <h4 className="text-sm font-bold text-white uppercase">&ldquo;Great fabric quality and transparent ₹800 pricing&rdquo;</h4>
              <p className="text-xs text-zinc-400">
                &ldquo;Very comfortable polyester fabric, dries quickly after sprints, and the towel integration is stitched neatly without adding bulk.&rdquo;
              </p>
              <span className="text-[11px] text-zinc-500 block pt-2">Vikram Menon • Verified Purchase</span>
            </div>

            <div className="sport-card p-6 space-y-2">
              <div className="flex items-center gap-1 text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                ))}
              </div>
              <h4 className="text-sm font-bold text-white uppercase">&ldquo;Practical sportswear innovation&rdquo;</h4>
              <p className="text-xs text-zinc-400">
                &ldquo;Solid athletic fit and genuinely useful. Solves the hassle of carrying an extra rag during training sessions.&rdquo;
              </p>
              <span className="text-[11px] text-zinc-500 block pt-2">Arjun Nair • Verified Purchase</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
