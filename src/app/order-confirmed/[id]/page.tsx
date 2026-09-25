import React from 'react';
import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';
import { CheckCircle2, Truck, ArrowRight } from 'lucide-react';
import { formatPrice, formatDate } from '@/lib/formatters';

export const dynamic = 'force-dynamic';

export default async function OrderConfirmedPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;

  const order = await prisma.order.findFirst({
    where: {
      OR: [{ id }, { orderNumber: id }],
    },
    include: { items: true },
  });

  if (!order) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-[#0a0a0c] text-white py-16">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 space-y-8">
        {/* Success Header */}
        <div className="text-center space-y-3">
          <div className="w-12 h-12 rounded-full bg-emerald-950/60 border border-emerald-800 text-emerald-400 flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-6 h-6" />
          </div>

          <span className="text-xs font-bold uppercase tracking-widest text-emerald-400 block">
            Order Placed Successfully
          </span>

          <h1 className="text-2xl sm:text-3xl font-black uppercase font-display tracking-tight text-white">
            Thank You, {order.customerName.split(' ')[0]}!
          </h1>

          <p className="text-xs text-zinc-400">
            We have recorded your order and sent details to <strong className="text-white">{order.customerEmail}</strong>.
          </p>

          <div className="inline-block px-3 py-1.5 rounded bg-zinc-900 border border-zinc-800 text-xs text-zinc-300 font-mono font-bold">
            Order Reference: {order.orderNumber}
          </div>
        </div>

        {/* Receipt */}
        <div className="sport-card p-6 sm:p-8 space-y-6">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pb-4 border-b border-zinc-800 text-xs">
            <div>
              <span className="text-zinc-500 block">Date</span>
              <span className="text-white font-semibold">{formatDate(order.createdAt)}</span>
            </div>
            <div>
              <span className="text-zinc-500 block">Method</span>
              <span className="text-white font-semibold">
                {order.paymentMethod === 'COD' ? 'Cash on Delivery' : 'Online UPI'}
              </span>
            </div>
            <div>
              <span className="text-zinc-500 block">Status</span>
              <span className="text-white font-semibold uppercase">{order.paymentStatus}</span>
            </div>
            <div>
              <span className="text-zinc-500 block">Fulfillment</span>
              <span className="text-blue-400 font-semibold uppercase">{order.orderStatus}</span>
            </div>
          </div>

          {/* Ordered items */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-400">
              Items Ordered
            </h3>
            <div className="divide-y divide-zinc-800">
              {order.items.map((item) => (
                <div key={item.id} className="py-2.5 first:pt-0 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-12 rounded bg-zinc-900 overflow-hidden shrink-0">
                      <img src={item.productImage} alt={item.productName} className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-white uppercase">{item.productName}</h4>
                      <p className="text-zinc-400 text-[11px]">Size: {item.size} • Qty: {item.quantity}</p>
                    </div>
                  </div>
                  <span className="font-bold text-white">{formatPrice(item.totalPrice)}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Pricing */}
          <div className="pt-3 border-t border-zinc-800 space-y-1 text-xs text-zinc-400">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span className="text-white">{formatPrice(order.subtotal)}</span>
            </div>
            <div className="flex justify-between">
              <span>Delivery</span>
              <span className="text-emerald-400 font-medium">FREE</span>
            </div>
            <div className="flex justify-between text-sm font-bold text-white pt-2 border-t border-zinc-800">
              <span>Total Paid / Payable</span>
              <span className="text-white font-black text-base">{formatPrice(order.totalAmount)}</span>
            </div>
          </div>

          {/* Shipping destination */}
          <div className="pt-3 border-t border-zinc-800 text-xs text-zinc-400">
            <h4 className="font-bold uppercase tracking-wider text-zinc-300 mb-1">Delivery Destination</h4>
            <p className="text-white">{order.customerName} ({order.customerPhone})</p>
            <p>{order.shippingAddress}, {order.city}, {order.state} - {order.postalCode}</p>
          </div>

          {/* Actions */}
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-3">
            <Link
              href={`/track?orderNumber=${order.orderNumber}`}
              className="w-full sm:w-auto px-5 py-2.5 rounded bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-colors"
            >
              <Truck className="w-4 h-4" /> Track Status
            </Link>

            <Link
              href="/shop"
              className="w-full sm:w-auto px-5 py-2.5 rounded bg-zinc-800 hover:bg-zinc-700 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-colors"
            >
              Continue Shopping <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
