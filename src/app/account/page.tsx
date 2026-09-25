import React from 'react';
import { prisma } from '@/lib/prisma';
import { getSession } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { User, ShoppingBag, MapPin, Truck, ShieldCheck } from 'lucide-react';
import Link from 'next/link';
import { formatPrice, formatDate } from '@/lib/formatters';

export const dynamic = 'force-dynamic';

export default async function AccountPage() {
  const session = await getSession();

  if (!session) {
    redirect('/login');
  }

  const userWithData = await prisma.user.findUnique({
    where: { id: session.id },
    include: {
      addresses: true,
      orders: {
        include: { items: true },
        orderBy: { createdAt: 'desc' },
      },
    },
  });

  if (!userWithData) {
    redirect('/login');
  }

  return (
    <div className="min-h-screen bg-[#0a0a0c] text-white py-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 space-y-8">
        <div className="sport-card p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold uppercase font-display text-white">
                {userWithData.name}
              </h1>
              {userWithData.role === 'ADMIN' && (
                <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-amber-950/60 text-amber-400 border border-amber-800">
                  Admin
                </span>
              )}
            </div>
            <p className="text-xs text-zinc-400 mt-1">{userWithData.email} • {userWithData.phone || 'No phone set'}</p>
          </div>

          <div className="flex items-center gap-3">
            {userWithData.role === 'ADMIN' && (
              <Link
                href="/admin"
                className="px-4 py-2 text-xs font-bold uppercase rounded bg-amber-950/60 border border-amber-800 text-amber-300 hover:bg-amber-900/60 transition-colors flex items-center gap-1.5"
              >
                <ShieldCheck className="w-3.5 h-3.5" /> Admin Portal
              </Link>
            )}
            <Link
              href="/track"
              className="px-4 py-2 text-xs font-bold uppercase rounded bg-zinc-800 hover:bg-zinc-700 text-white transition-colors flex items-center gap-1.5"
            >
              <Truck className="w-3.5 h-3.5" /> Track Orders
            </Link>
          </div>
        </div>

        {/* Orders */}
        <div className="space-y-4">
          <h2 className="text-lg font-bold uppercase font-display text-white flex items-center gap-2">
            <ShoppingBag className="w-4 h-4 text-blue-400" />
            Previous Orders ({userWithData.orders.length})
          </h2>

          {userWithData.orders.length === 0 ? (
            <div className="sport-card p-8 text-center space-y-3">
              <p className="text-xs text-zinc-400">You haven&apos;t placed any orders yet.</p>
              <Link
                href="/shop"
                className="inline-block px-5 py-2.5 rounded bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs uppercase tracking-wider transition-colors"
              >
                Order Jersey — ₹800
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {userWithData.orders.map((ord) => (
                <div key={ord.id} className="sport-card p-6 space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-zinc-800 gap-2 text-xs">
                    <div>
                      <span className="text-zinc-500 font-mono">Ref: {ord.orderNumber}</span>
                      <p className="text-[11px] text-zinc-400">{formatDate(ord.createdAt)}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="px-2.5 py-0.5 rounded text-xs font-bold uppercase bg-zinc-800 text-zinc-300">
                        {ord.orderStatus.replace(/_/g, ' ')}
                      </span>
                      <Link
                        href={`/track?orderNumber=${ord.orderNumber}`}
                        className="text-xs text-blue-400 hover:underline font-semibold"
                      >
                        Track →
                      </Link>
                    </div>
                  </div>

                  <div className="divide-y divide-zinc-850">
                    {ord.items.map((item) => (
                      <div key={item.id} className="py-2.5 first:pt-0 flex items-center justify-between text-xs">
                        <div>
                          <p className="font-semibold text-white uppercase">{item.productName}</p>
                          <p className="text-[11px] text-zinc-400">Size: {item.size} • Qty: {item.quantity}</p>
                        </div>
                        <span className="font-bold text-white">{formatPrice(item.totalPrice)}</span>
                      </div>
                    ))}
                  </div>

                  <div className="pt-2 border-t border-zinc-800 flex items-center justify-between text-xs">
                    <span className="text-zinc-400">
                      Payment: {ord.paymentMethod === 'COD' ? 'Cash on Delivery' : 'Online UPI'}
                    </span>
                    <span className="text-base font-bold text-white">{formatPrice(ord.totalAmount)}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
