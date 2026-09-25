'use client';

import React from 'react';
import Link from 'next/link';
import { ShoppingBag, Trash2, Plus, Minus, ArrowRight } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { formatPrice } from '@/lib/formatters';

export default function CartPage() {
  const {
    cart,
    removeFromCart,
    updateQuantity,
    subtotal,
    totalAmount,
  } = useCart();

  if (cart.length === 0) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4 bg-[#0a0a0c] text-white">
        <div className="w-12 h-12 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center mb-4 text-zinc-500">
          <ShoppingBag className="w-6 h-6" />
        </div>
        <h2 className="text-2xl font-black uppercase font-display">Your Bag is Empty</h2>
        <p className="text-xs text-zinc-400 mt-2 max-w-sm">
          Discover the JERSFITT Plus performance jersey with integrated sweat towel.
        </p>
        <Link
          href="/shop"
          className="mt-6 px-6 py-3 rounded bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs uppercase tracking-wider transition-colors"
        >
          Explore Collection
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a0c] text-white py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-blue-400">
            Shopping Bag
          </span>
          <h1 className="text-3xl font-black uppercase font-display tracking-tight text-white mt-1">
            Review Your Items ({cart.length})
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Cart Table */}
          <div className="lg:col-span-8 sport-card overflow-hidden divide-y divide-zinc-850">
            {cart.map((item) => (
              <div key={`${item.id}-${item.size}`} className="p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-20 rounded bg-zinc-900 border border-zinc-800 overflow-hidden shrink-0">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <Link
                      href={`/product/${item.slug}`}
                      className="font-bold text-white text-sm hover:text-blue-400 uppercase font-display"
                    >
                      {item.name}
                    </Link>
                    <div className="mt-1 flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded text-xs font-bold bg-zinc-800 text-zinc-300">
                        Size: {item.size}
                      </span>
                      <span className="text-xs font-bold text-zinc-300">
                        ₹800
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto">
                  {/* Stepper */}
                  <div className="flex items-center border border-zinc-800 rounded bg-zinc-900 overflow-hidden">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="px-2.5 py-1 text-zinc-400 hover:text-white"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="px-3 py-1 text-xs font-bold text-white min-w-[24px] text-center">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="px-2.5 py-1 text-zinc-400 hover:text-white"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>

                  <span className="text-sm font-bold text-white">
                    {formatPrice(item.price * item.quantity)}
                  </span>

                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="p-1 text-zinc-500 hover:text-red-400"
                    title="Remove item"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Totals Summary */}
          <div className="lg:col-span-4 sport-card p-6 space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-white">Order Summary</h3>

            <div className="space-y-2 text-xs text-zinc-400">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="text-white font-medium">{formatPrice(subtotal)}</span>
              </div>
              <div className="flex justify-between">
                <span>Delivery</span>
                <span className="text-emerald-400 font-medium">FREE</span>
              </div>
              <div className="flex justify-between text-base font-bold text-white pt-2 border-t border-zinc-800">
                <span>Total</span>
                <span className="text-white text-lg font-black">{formatPrice(totalAmount(false))}</span>
              </div>
            </div>

            <Link
              href="/checkout"
              className="w-full py-3.5 rounded bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-colors"
            >
              Checkout <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
