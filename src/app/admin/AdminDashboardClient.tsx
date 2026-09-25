'use client';

import React, { useState, useEffect } from 'react';
import {
  ShieldCheck,
  TrendingUp,
  Package,
  ShoppingBag,
  Users,
  AlertTriangle,
  Truck,
  CheckCircle2,
  Clock,
  Search,
  Edit,
  Save,
  Trash2,
  Plus,
  RefreshCw,
  ExternalLink,
  ChevronRight,
  Filter
} from 'lucide-react';
import { formatPrice, formatDate } from '@/lib/formatters';
import Link from 'next/link';

interface AdminDashboardClientProps {
  currentUser: {
    id: string;
    name: string;
    email: string;
    role: string;
  };
}

export default function AdminDashboardClient({ currentUser }: AdminDashboardClientProps) {
  const [activeTab, setActiveTab] = useState<'metrics' | 'orders' | 'products' | 'reviews'>('metrics');
  const [loading, setLoading] = useState(true);

  // Metrics Data
  const [metrics, setMetrics] = useState<any>(null);
  const [recentOrders, setRecentOrders] = useState<any[]>([]);
  const [lowStockVariants, setLowStockVariants] = useState<any[]>([]);

  // Orders Management Data
  const [ordersList, setOrdersList] = useState<any[]>([]);
  const [orderFilter, setOrderFilter] = useState('ALL');
  const [updatingOrderId, setUpdatingOrderId] = useState<string | null>(null);

  // Products Management Data
  const [productsList, setProductsList] = useState<any[]>([]);
  const [editingProduct, setEditingProduct] = useState<any | null>(null);
  const [savingProduct, setSavingProduct] = useState(false);

  // Reviews Moderation Data
  const [reviewsList, setReviewsList] = useState<any[]>([]);

  const fetchMetrics = async () => {
    try {
      const res = await fetch('/api/admin/metrics');
      if (res.ok) {
        const data = await res.json();
        setMetrics(data.metrics);
        setRecentOrders(data.recentOrders);
        setLowStockVariants(data.lowStockVariants);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const fetchOrders = async () => {
    try {
      const res = await fetch(`/api/admin/orders?status=${orderFilter}`);
      if (res.ok) {
        const data = await res.json();
        setOrdersList(data.orders);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const fetchProducts = async () => {
    try {
      const res = await fetch('/api/admin/products');
      if (res.ok) {
        const data = await res.json();
        setProductsList(data.products);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const fetchReviews = async () => {
    try {
      const res = await fetch('/api/reviews');
      if (res.ok) {
        const data = await res.json();
        setReviewsList(data.reviews);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const loadAll = async () => {
    setLoading(true);
    await Promise.all([fetchMetrics(), fetchOrders(), fetchProducts(), fetchReviews()]);
    setLoading(false);
  };

  useEffect(() => {
    loadAll();
  }, [orderFilter]);

  const handleUpdateOrderStatus = async (
    orderId: string,
    newStatus: string,
    newPaymentStatus?: string,
    trackingNote?: string
  ) => {
    setUpdatingOrderId(orderId);
    try {
      const res = await fetch(`/api/admin/orders/${orderId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          orderStatus: newStatus,
          ...(newPaymentStatus ? { paymentStatus: newPaymentStatus } : {}),
          ...(trackingNote ? { trackingNotes: trackingNote } : {}),
        }),
      });

      if (res.ok) {
        await fetchOrders();
        await fetchMetrics();
      }
    } catch (e) {
      alert('Error updating order status');
    } finally {
      setUpdatingOrderId(null);
    }
  };

  const handleSaveProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProduct) return;
    setSavingProduct(true);
    try {
      const res = await fetch(`/api/admin/products/${editingProduct.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editingProduct),
      });
      if (res.ok) {
        await fetchProducts();
        setEditingProduct(null);
        alert('Product updated successfully!');
      }
    } catch (e) {
      alert('Failed to save product');
    } finally {
      setSavingProduct(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#08080a] text-white py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Admin Header */}
        <div className="p-6 rounded-3xl bg-[#101118] border border-white/10 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-2xl">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/15 border border-amber-500/40 text-amber-400 flex items-center justify-center shadow-lg shadow-amber-500/10">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-black uppercase font-display text-white">
                  JERSFITT Plus Backoffice
                </h1>
                <span className="px-2.5 py-0.5 rounded text-[10px] font-extrabold uppercase bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  Live Admin
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Logged in as <strong className="text-white">{currentUser.name}</strong> ({currentUser.email})
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={loadAll}
              className="px-3.5 py-2 text-xs font-bold uppercase rounded-xl bg-white/10 hover:bg-white/15 text-white border border-white/15 flex items-center gap-1.5 transition-all"
            >
              <RefreshCw className="w-3.5 h-3.5" /> Refresh Data
            </button>
            <Link
              href="/"
              className="px-3.5 py-2 text-xs font-bold uppercase rounded-xl bg-electric-blue text-black font-extrabold shadow-glow hover:bg-cyan-300 transition-all flex items-center gap-1.5"
            >
              <ExternalLink className="w-3.5 h-3.5" /> View Store
            </Link>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-white/10 space-x-6 text-xs sm:text-sm font-bold uppercase tracking-wider overflow-x-auto pb-1">
          {[
            { key: 'metrics', label: 'Dashboard Overview', icon: TrendingUp },
            { key: 'orders', label: `Orders Pipeline (${ordersList.length})`, icon: ShoppingBag },
            { key: 'products', label: `Products & Inventory (${productsList.length})`, icon: Package },
            { key: 'reviews', label: `Reviews Moderation (${reviewsList.length})`, icon: CheckCircle2 },
          ].map((t) => {
            const Icon = t.icon;
            return (
              <button
                key={t.key}
                onClick={() => setActiveTab(t.key as any)}
                className={`pb-3 flex items-center gap-2 transition-all relative shrink-0 ${
                  activeTab === t.key ? 'text-electric-blue' : 'text-slate-400 hover:text-white'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{t.label}</span>
                {activeTab === t.key && (
                  <span className="absolute bottom-0 left-0 w-full h-[2px] bg-electric-blue shadow-glow" />
                )}
              </button>
            );
          })}
        </div>

        {/* TAB 1: OVERVIEW METRICS */}
        {activeTab === 'metrics' && metrics && (
          <div className="space-y-8 animate-in fade-in duration-200">
            {/* KPI Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
              <div className="p-6 rounded-2xl bg-[#101118] border border-white/10 space-y-2">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                  Total Paid Revenue
                </span>
                <div className="text-2xl sm:text-3xl font-black text-electric-blue font-display">
                  {formatPrice(metrics.totalRevenue)}
                </div>
                <p className="text-[10px] text-emerald-400">From confirmed online & paid orders</p>
              </div>

              <div className="p-6 rounded-2xl bg-[#101118] border border-white/10 space-y-2">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                  Total Orders
                </span>
                <div className="text-2xl sm:text-3xl font-black text-white font-display">
                  {metrics.totalOrdersCount}
                </div>
                <p className="text-[10px] text-slate-400">{metrics.deliveredOrdersCount} delivered</p>
              </div>

              <div className="p-6 rounded-2xl bg-[#101118] border border-white/10 space-y-2">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                  Pending Fulfillment
                </span>
                <div className="text-2xl sm:text-3xl font-black text-amber-400 font-display">
                  {metrics.pendingOrdersCount}
                </div>
                <p className="text-[10px] text-amber-300">Awaiting pack / courier dispatch</p>
              </div>

              <div className="p-6 rounded-2xl bg-[#101118] border border-white/10 space-y-2">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                  Low Stock Alert
                </span>
                <div className="text-2xl sm:text-3xl font-black text-rose-400 font-display">
                  {metrics.lowStockCount} Sizes
                </div>
                <p className="text-[10px] text-rose-300">Sizes with ≤ 10 inventory units</p>
              </div>
            </div>

            {/* Recent Orders & Low Stock Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Recent Orders */}
              <div className="lg:col-span-8 p-6 rounded-3xl bg-[#101118] border border-white/10 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold uppercase tracking-wider text-white">
                    Recent Customer Orders
                  </h3>
                  <button
                    onClick={() => setActiveTab('orders')}
                    className="text-xs text-electric-blue hover:underline font-semibold"
                  >
                    View All Orders →
                  </button>
                </div>

                <div className="divide-y divide-white/5">
                  {recentOrders.map((ord) => (
                    <div key={ord.id} className="py-3 flex items-center justify-between text-xs">
                      <div>
                        <div className="flex items-center gap-2">
                          <strong className="text-white font-mono">{ord.orderNumber}</strong>
                          <span className="text-slate-400">• {ord.customerName}</span>
                        </div>
                        <p className="text-[11px] text-slate-500">{formatDate(ord.createdAt)}</p>
                      </div>

                      <div className="flex items-center gap-3">
                        <span className="font-bold text-white">{formatPrice(ord.totalAmount)}</span>
                        <span className="px-2 py-0.5 rounded text-[10px] font-extrabold uppercase bg-white/5 text-electric-blue border border-white/10">
                          {ord.orderStatus}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Low Stock Alerts */}
              <div className="lg:col-span-4 p-6 rounded-3xl bg-[#101118] border border-white/10 space-y-4">
                <h3 className="text-sm font-bold uppercase tracking-wider text-white flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-rose-400" />
                  Low Inventory Sizes
                </h3>

                {lowStockVariants.length === 0 ? (
                  <p className="text-xs text-emerald-400">All sizes healthy in stock (&gt;10 units).</p>
                ) : (
                  <div className="divide-y divide-white/5 space-y-2">
                    {lowStockVariants.map((v) => (
                      <div key={v.id} className="pt-2 first:pt-0 flex items-center justify-between text-xs">
                        <div>
                          <p className="font-bold text-white">{v.product?.name || 'Jersey'}</p>
                          <span className="text-slate-400 text-[11px]">Size: {v.size} ({v.sku})</span>
                        </div>
                        <span className="px-2.5 py-0.5 rounded text-xs font-black bg-rose-500/20 text-rose-300 border border-rose-500/30">
                          {v.stock} left
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: ORDERS PIPELINE */}
        {activeTab === 'orders' && (
          <div className="space-y-6 animate-in fade-in duration-200">
            {/* Filter Bar */}
            <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl bg-[#101118] border border-white/10">
              <div className="flex items-center gap-2">
                <Filter className="w-4 h-4 text-electric-blue" />
                <span className="text-xs font-bold uppercase text-slate-400">Filter Status:</span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {['ALL', 'PLACED', 'CONFIRMED', 'PACKED', 'SHIPPED', 'OUT_FOR_DELIVERY', 'DELIVERED'].map((st) => (
                  <button
                    key={st}
                    onClick={() => setOrderFilter(st)}
                    className={`px-3 py-1 text-xs font-bold uppercase rounded-lg transition-all ${
                      orderFilter === st
                        ? 'bg-electric-blue text-black shadow-glow'
                        : 'bg-white/5 text-slate-300 hover:bg-white/10'
                    }`}
                  >
                    {st.replace(/_/g, ' ')}
                  </button>
                ))}
              </div>
            </div>

            {/* Orders Table */}
            <div className="rounded-3xl bg-[#101118] border border-white/10 overflow-hidden shadow-2xl">
              <div className="divide-y divide-white/5">
                {ordersList.map((order) => (
                  <div key={order.id} className="p-6 space-y-4 hover:bg-white/[0.01] transition-colors">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pb-3 border-b border-white/5">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-mono font-bold text-white text-base">
                            {order.orderNumber}
                          </span>
                          <span className="px-2 py-0.5 rounded text-[10px] font-extrabold uppercase bg-white/10 text-white">
                            {order.paymentMethod === 'COD' ? 'Cash on Delivery' : 'Online / UPI'}
                          </span>
                          <span
                            className={`px-2 py-0.5 rounded text-[10px] font-extrabold uppercase ${
                              order.paymentStatus === 'PAID'
                                ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                                : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                            }`}
                          >
                            Payment: {order.paymentStatus}
                          </span>
                        </div>
                        <p className="text-xs text-slate-400 mt-0.5">
                          Customer: <strong className="text-slate-200">{order.customerName}</strong> ({order.customerPhone}) • {order.city}, {order.state}
                        </p>
                      </div>

                      <div className="text-right">
                        <span className="text-xs text-slate-400 block">{formatDate(order.createdAt)}</span>
                        <span className="text-base font-black text-electric-blue">
                          {formatPrice(order.totalAmount)}
                        </span>
                      </div>
                    </div>

                    {/* Items */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                      {order.items.map((it: any) => (
                        <div key={it.id} className="flex items-center gap-2 p-2 rounded-xl bg-white/5 text-xs">
                          <div className="w-8 h-10 rounded bg-white/5 overflow-hidden shrink-0">
                            <img src={it.productImage} alt={it.productName} className="w-full h-full object-cover" />
                          </div>
                          <div>
                            <p className="text-white font-semibold line-clamp-1">{it.productName}</p>
                            <span className="text-[11px] text-slate-400">Size: {it.size} • Qty: {it.quantity}</span>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Status Pipeline Step Actions */}
                    <div className="pt-2 flex flex-wrap items-center justify-between gap-3 text-xs">
                      <div className="flex items-center gap-2">
                        <span className="text-slate-400 font-semibold">Advance Status:</span>
                        {['PLACED', 'CONFIRMED', 'PACKED', 'SHIPPED', 'OUT_FOR_DELIVERY', 'DELIVERED'].map((target) => (
                          <button
                            key={target}
                            disabled={updatingOrderId === order.id || order.orderStatus === target}
                            onClick={() =>
                              handleUpdateOrderStatus(
                                order.id,
                                target,
                                target === 'DELIVERED' && order.paymentMethod === 'COD' ? 'PAID' : undefined,
                                `Status updated to ${target} by admin fulfillment dispatch.`
                              )
                            }
                            className={`px-2.5 py-1 rounded-md text-[11px] font-bold uppercase transition-all ${
                              order.orderStatus === target
                                ? 'bg-electric-blue text-black shadow-glow cursor-default'
                                : 'bg-white/5 hover:bg-white/10 text-slate-300 border border-white/10'
                            }`}
                          >
                            {target.replace(/_/g, ' ')}
                          </button>
                        ))}
                      </div>

                      <Link
                        href={`/track?orderNumber=${order.orderNumber}`}
                        target="_blank"
                        className="text-xs text-electric-blue hover:underline flex items-center gap-1 font-semibold"
                      >
                        Public Timeline <ExternalLink className="w-3 h-3" />
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: PRODUCTS & INVENTORY */}
        {activeTab === 'products' && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {productsList.map((p) => {
                let images: string[] = [];
                try {
                  images = JSON.parse(p.images);
                } catch {
                  images = [p.images];
                }

                return (
                  <div
                    key={p.id}
                    className="p-6 rounded-3xl bg-[#101118] border border-white/10 space-y-4 flex flex-col justify-between"
                  >
                    <div className="space-y-3">
                      <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-white/5 border border-white/10">
                        <img src={images[0]} alt={p.name} className="w-full h-full object-cover" />
                      </div>

                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-electric-blue uppercase">{p.edition}</span>
                        <span className="text-base font-black text-white">{formatPrice(p.price)}</span>
                      </div>

                      <h3 className="font-bold text-white text-base line-clamp-1 uppercase font-display">
                        {p.name}
                      </h3>

                      <p className="text-xs text-slate-400 line-clamp-2">{p.description}</p>

                      {/* Stock breakdown per size */}
                      <div className="pt-2 border-t border-white/5 space-y-1">
                        <span className="text-[11px] font-bold text-slate-400 uppercase">
                          Inventory by Size:
                        </span>
                        <div className="grid grid-cols-5 gap-1.5 text-center">
                          {p.variants?.map((v: any) => (
                            <div
                              key={v.id}
                              className={`p-1.5 rounded-lg border text-xs ${
                                v.stock <= 10
                                  ? 'bg-rose-500/10 border-rose-500/30 text-rose-300'
                                  : 'bg-white/5 border-white/10 text-slate-300'
                              }`}
                            >
                              <span className="block font-bold text-[10px]">{v.size}</span>
                              <strong className="block text-white text-xs">{v.stock}</strong>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() => setEditingProduct(p)}
                      className="w-full py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 transition-colors"
                    >
                      <Edit className="w-3.5 h-3.5" /> Edit Price & Inventory
                    </button>
                  </div>
                );
              })}
            </div>

            {/* Product Edit Modal */}
            {editingProduct && (
              <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
                <form
                  onSubmit={handleSaveProduct}
                  className="w-full max-w-lg bg-[#11121a] border border-white/15 rounded-3xl p-6 shadow-2xl space-y-4 text-xs"
                >
                  <div className="flex items-center justify-between border-b border-white/10 pb-3">
                    <h3 className="text-base font-bold uppercase text-white font-display">
                      Edit Product: {editingProduct.name}
                    </h3>
                    <button
                      type="button"
                      onClick={() => setEditingProduct(null)}
                      className="text-slate-400 hover:text-white"
                    >
                      ✕
                    </button>
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-300 mb-1">Product Title</label>
                    <input
                      type="text"
                      value={editingProduct.name}
                      onChange={(e) => setEditingProduct({ ...editingProduct, name: e.target.value })}
                      className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-electric-blue"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block font-semibold text-slate-300 mb-1">Price (₹)</label>
                      <input
                        type="number"
                        value={editingProduct.price}
                        onChange={(e) => setEditingProduct({ ...editingProduct, price: Number(e.target.value) })}
                        className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-electric-blue"
                      />
                    </div>
                    <div>
                      <label className="block font-semibold text-slate-300 mb-1">Compare Price (₹)</label>
                      <input
                        type="number"
                        value={editingProduct.compareAtPrice || ''}
                        onChange={(e) =>
                          setEditingProduct({ ...editingProduct, compareAtPrice: Number(e.target.value) })
                        }
                        className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-electric-blue"
                      />
                    </div>
                  </div>

                  {/* Edit Stock for each size */}
                  <div>
                    <label className="block font-semibold text-slate-300 mb-1">
                      Inventory Stock per Size:
                    </label>
                    <div className="grid grid-cols-5 gap-2">
                      {editingProduct.variants?.map((v: any, idx: number) => (
                        <div key={v.id || idx}>
                          <span className="block text-center font-bold text-slate-400 text-[10px] mb-0.5">
                            {v.size}
                          </span>
                          <input
                            type="number"
                            value={v.stock}
                            onChange={(e) => {
                              const updatedVars = [...editingProduct.variants];
                              updatedVars[idx].stock = Number(e.target.value);
                              setEditingProduct({ ...editingProduct, variants: updatedVars });
                            }}
                            className="w-full px-2 py-1.5 bg-white/5 border border-white/10 rounded text-center text-white font-bold"
                          />
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-3 border-t border-white/10 flex gap-2">
                    <button
                      type="submit"
                      disabled={savingProduct}
                      className="flex-1 py-3 bg-electric-blue text-black font-extrabold text-xs uppercase tracking-wider rounded-xl shadow-glow hover:bg-cyan-300"
                    >
                      {savingProduct ? 'Saving...' : 'Save Product Updates'}
                    </button>
                    <button
                      type="button"
                      onClick={() => setEditingProduct(null)}
                      className="px-4 py-3 bg-white/10 rounded-xl font-bold uppercase"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
        )}

        {/* TAB 4: REVIEWS MODERATION */}
        {activeTab === 'reviews' && (
          <div className="space-y-4 animate-in fade-in duration-200">
            <div className="rounded-3xl bg-[#101118] border border-white/10 overflow-hidden divide-y divide-white/5">
              {reviewsList.map((r) => (
                <div key={r.id} className="p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-amber-400">{'★'.repeat(r.rating)}</span>
                      <h4 className="font-bold text-white text-sm uppercase">&ldquo;{r.title}&rdquo;</h4>
                    </div>
                    <p className="text-xs text-slate-300">&ldquo;{r.comment}&rdquo;</p>
                    <p className="text-[11px] text-slate-500">
                      Author: {r.authorName} ({r.authorEmail}) • {formatDate(r.createdAt)}
                    </p>
                  </div>

                  <span className="px-3 py-1 rounded-full text-xs font-bold uppercase bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                    Approved
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
