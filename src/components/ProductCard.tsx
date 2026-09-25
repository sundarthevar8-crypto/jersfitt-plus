'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ShoppingBag, Check } from 'lucide-react';
import { Product } from '@/types';
import { formatPrice } from '@/lib/formatters';
import { useCart } from '@/context/CartContext';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();
  const [selectedSize, setSelectedSize] = useState<string>('M');
  const [isAdded, setIsAdded] = useState(false);

  const images = Array.isArray(product.images)
    ? product.images
    : typeof product.images === 'string'
    ? JSON.parse(product.images)
    : [];

  const mainImage = images[0] || 'https://images.unsplash.com/photo-1577223625816-7546f13df25d?q=80&w=800&auto=format&fit=crop';

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    const variant = product.variants?.find((v) => v.size === selectedSize);

    addToCart({
      id: `${product.id}-${product.primaryColor || 'DEFAULT'}-${selectedSize}`,
      productId: product.id,
      variantId: variant?.id,
      name: product.name,
      edition: product.edition,
      slug: product.slug,
      image: mainImage,
      color: product.primaryColor || 'BLACK / BLUE',
      size: selectedSize,
      price: product.price,
      quantity: 1,
      maxStock: variant?.stock || 50,
    });

    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 1500);
  };

  return (
    <div className="sport-card overflow-hidden flex flex-col justify-between group">
      {/* Product Image */}
      <div className="relative aspect-[4/3] bg-zinc-900 overflow-hidden">
        <Link href={`/product/${product.slug}`} className="block w-full h-full">
          <img
            src={mainImage}
            alt={product.name}
            className="w-full h-full object-contain object-center group-hover:scale-102 transition-transform duration-300 p-2"
          />
        </Link>
        <div className="absolute top-3 left-3">
          <span className="px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-black/80 text-white rounded">
            Integrated Towel
          </span>
        </div>
      </div>

      {/* Info & Buy Area */}
      <div className="p-5 space-y-4 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between text-xs text-zinc-400">
            <span>{product.edition || 'Official Edition'}</span>
            <span className="text-white font-bold font-display text-base">₹800</span>
          </div>

          <Link href={`/product/${product.slug}`} className="block mt-1">
            <h3 className="font-display font-bold text-lg text-white group-hover:text-blue-400 transition-colors uppercase">
              {product.name}
            </h3>
          </Link>
          <p className="text-xs text-zinc-400 mt-1 line-clamp-2">
            {product.description}
          </p>
        </div>

        {/* Size Selection & Action */}
        <div className="pt-3 border-t border-zinc-800 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs text-zinc-400 font-medium">Select Size:</span>
            <div className="flex items-center gap-1.5">
              {['S', 'M', 'L', 'XL', 'XXL'].map((sz) => (
                <button
                  key={sz}
                  type="button"
                  onClick={() => setSelectedSize(sz)}
                  className={`w-7 h-7 text-xs font-bold rounded flex items-center justify-center transition-colors ${
                    selectedSize === sz
                      ? 'bg-blue-600 text-white'
                      : 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700'
                  }`}
                >
                  {sz}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={handleQuickAdd}
            className={`w-full py-2.5 px-3 rounded font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-colors ${
              isAdded
                ? 'bg-emerald-600 text-white'
                : 'bg-zinc-800 hover:bg-blue-600 text-white'
            }`}
          >
            {isAdded ? (
              <>
                <Check className="w-4 h-4" /> Added to Bag!
              </>
            ) : (
              <>
                <ShoppingBag className="w-4 h-4" /> Add to Bag ({selectedSize}) — ₹800
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
