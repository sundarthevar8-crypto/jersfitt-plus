'use client';

import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import {
  Truck,
  Search,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { formatPrice, formatDate } from '@/lib/formatters';

export default function TrackOrderPage() {
  const searchParams = useSearchParams();
  const initialOrderNumber = searchParams.get('orderNumber') || '';

  const [query, setQuery] = useState(initialOrderNumber);
  const [loading, setLoading] = useState(false);
  const [order, setOrder] = useState<any>(null);
  const [error, setError] = useState('');

  const fetchOrderTracking = async (searchQuery: string) => {
    if (!searchQuery.trim()) return;
    setLoading(true);
    setError('');
    try {
      const res = await fetch(`/api/orders/track?orderNumber=${encodeURIComponent(searchQuery)}&query=${encodeURIComponent(searchQuery)}`);
      const data = await res.json();
      if (!res.ok) {
        setError(data.message || 'No order found with the provided details.');
        setOrder(null);
      } else {
        setOrder(data.order);
      }
    } catch {
      setError('Failed to connect to tracking service.');
      setOrder(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (initialOrderNumber) {
      fetchOrderTracking(initialOrderNumber);
    }
  }, [initialOrderNumber]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    fetchOrderTracking(query);
  };

  const steps = [
    { key: 'CONFIRMED', label: 'Order Confirmed', desc: 'Order placed & recorded' },
    { key: 'PROCESSING', label: 'Processing', desc: 'Order verified in warehouse' },
    { key: 'PACKED', label: 'Packed', desc: 'Quality checked and packed' },
    { key: 'SHIPPED', label: 'Shipped', desc: 'Dispatched with courier' },
    { key: 'OUT_FOR_DELIVERY', label: 'Out For Delivery', desc: 'Out for final delivery' },
    { key: 'DELIVERED', label: 'Delivered', desc: 'Delivered to customer' },
  ];

  const getStepIndex = (status: string) => {
    const map: Record<string, number> = {
      PLACED: 0,
      CONFIRMED: 0,
      PROCESSING: 1,
      PACKED: 2,
      SHIPPED: 3,
      OUT_FOR_DELIVERY: 4,
      DELIVERED: 5,
    };
    return map[status] ?? 0;
  };

  const currentStepIndex = order ? getStepIndex(order.orderStatus) : 0;

  return (
    <div className="min-h-screen bg-[#0a0a0c] text-white py-14">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-10">
        <div className="text-center max-w-xl mx-auto space-y-2">
          <span className="text-xs font-bold uppercase tracking-widest text-blue-400">
            Shipment Tracking
          </span>
          <h1 className="text-3xl sm:text-4xl font-black uppercase font-display tracking-tight text-white">
            Track Your Order
          </h1>
          <p className="text-xs text-zinc-400">
            Enter your Order ID (e.g. <strong className="text-white">JP-948210</strong>) or registered phone number.
          </p>
        </div>

        {/* Search Bar */}
        <form onSubmit={handleSearch} className="max-w-md mx-auto flex gap-2">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              required
              placeholder="e.g. JP-948210"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-zinc-900 border border-zinc-800 rounded text-xs text-white uppercase focus:outline-none focus:border-blue-500"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="px-5 py-2.5 rounded bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs uppercase tracking-wider transition-colors disabled:opacity-50"
          >
            {loading ? 'Searching...' : 'Track'}
          </button>
        </form>

        {error && (
          <div className="max-w-md mx-auto p-3.5 rounded bg-red-950/40 border border-red-800 text-red-400 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Order Details & Stepper */}
        {order && (
          <div className="space-y-6">
            <div className="sport-card p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="text-xs font-bold uppercase text-zinc-400">Order Reference</span>
                <h2 className="text-xl font-bold uppercase text-white font-mono mt-0.5">
                  {order.orderNumber}
                </h2>
                <p className="text-xs text-zinc-400 mt-1">
                  Placed on {formatDate(order.createdAt)} • Customer: {order.customerName}
                </p>
              </div>

              <div className="text-right">
                <span className="px-3 py-1 rounded text-xs font-bold uppercase bg-blue-950/60 text-blue-400 border border-blue-800/60">
                  {order.orderStatus.replace(/_/g, ' ')}
                </span>
              </div>
            </div>

            {/* Stepper Timeline */}
            <div className="sport-card p-6 sm:p-8 space-y-6">
              <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-400">
                Delivery Progression Timeline
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4">
                {steps.map((step, idx) => {
                  const isCompleted = currentStepIndex >= idx;

                  return (
                    <div key={step.key} className="p-3 bg-zinc-900 rounded border border-zinc-800 space-y-2">
                      <div className="flex items-center gap-2">
                        <div
                          className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                            isCompleted ? 'bg-blue-600 text-white' : 'bg-zinc-800 text-zinc-500'
                          }`}
                        >
                          {isCompleted ? <CheckCircle2 className="w-3.5 h-3.5" /> : idx + 1}
                        </div>
                        <span
                          className={`text-xs font-bold uppercase ${
                            isCompleted ? 'text-white' : 'text-zinc-500'
                          }`}
                        >
                          {step.label}
                        </span>
                      </div>
                      <p className="text-[10px] text-zinc-400">{step.desc}</p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Order Items */}
            <div className="sport-card p-6 space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-400">
                Package Contents ({order.items.length})
              </h3>
              <div className="divide-y divide-zinc-800">
                {order.items.map((item: any) => (
                  <div key={item.id} className="py-2.5 first:pt-0 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-12 rounded bg-zinc-900 overflow-hidden shrink-0">
                        <img src={item.productImage} alt={item.productName} className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <p className="font-semibold text-white uppercase">{item.productName}</p>
                        <p className="text-zinc-400 text-[11px]">Size: {item.size} • Qty: {item.quantity}</p>
                      </div>
                    </div>
                    <span className="font-bold text-white">{formatPrice(item.totalPrice)}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
