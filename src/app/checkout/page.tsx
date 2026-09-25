'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  ShieldCheck,
  CreditCard,
  Truck,
  CheckCircle2,
  Lock,
  ArrowRight,
  ShoppingBag,
  AlertCircle
} from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import { formatPrice, INDIAN_STATES, validateIndianMobile, validateIndianPin } from '@/lib/formatters';
import PaymentModal from '@/components/PaymentModal';

export default function CheckoutPage() {
  const router = useRouter();
  const { cart, subtotal, totalAmount, clearCart } = useCart();
  const { user } = useAuth();

  const [customerName, setCustomerName] = useState(user?.name || '');
  const [customerEmail, setCustomerEmail] = useState(user?.email || '');
  const [customerPhone, setCustomerPhone] = useState(user?.phone || '');
  const [shippingAddress, setShippingAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('Karnataka');
  const [postalCode, setPostalCode] = useState('');
  const [orderNotes, setOrderNotes] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'ONLINE_UPI' | 'COD'>('ONLINE_UPI');

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [paymentModalOpen, setPaymentModalOpen] = useState(false);
  const [createdOrderData, setCreatedOrderData] = useState<any>(null);

  if (cart.length === 0) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4 bg-[#0a0a0c] text-white">
        <div className="w-12 h-12 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center mb-4 text-zinc-500">
          <ShoppingBag className="w-6 h-6" />
        </div>
        <h2 className="text-2xl font-black uppercase font-display">Your Bag is Empty</h2>
        <p className="text-xs text-zinc-400 mt-2 max-w-sm">
          Select your JERSFITT Plus jersey size before checking out.
        </p>
        <Link
          href="/shop"
          className="mt-6 px-6 py-3 rounded bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs uppercase tracking-wider transition-colors"
        >
          Browse Store
        </Link>
      </div>
    );
  }

  const finalTotal = totalAmount(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!validateIndianMobile(customerPhone)) {
      setError('Please enter a valid 10-digit Indian mobile number.');
      return;
    }

    if (!validateIndianPin(postalCode)) {
      setError('Please enter a valid 6-digit Indian postal PIN code.');
      return;
    }

    setLoading(true);

    try {
      const orderPayload = {
        customerName,
        customerEmail,
        customerPhone,
        shippingAddress,
        city,
        state,
        postalCode,
        orderNotes,
        paymentMethod,
        items: cart.map((item) => ({
          productId: item.productId,
          size: item.size,
          quantity: item.quantity,
        })),
      };

      const res = await fetch('/api/checkout/order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderPayload),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || 'Failed to place order.');
        setLoading(false);
        return;
      }

      if (paymentMethod === 'COD') {
        clearCart();
        router.push(`/order-confirmed/${data.order.id}`);
      } else {
        setCreatedOrderData({
          orderId: data.order.id,
          orderNumber: data.order.orderNumber,
          amount: data.order.totalAmount,
          customerName: data.order.customerName,
          customerEmail: data.order.customerEmail,
          customerPhone: data.order.customerPhone,
          razorpayOrderId: data.razorpayOrder?.id,
        });
        setPaymentModalOpen(true);
        setLoading(false);
      }
    } catch (err: any) {
      setError(err.message || 'Network error while initiating order');
      setLoading(false);
    }
  };

  const handlePaymentSuccess = async (paymentDetails: {
    razorpayPaymentId: string;
    razorpaySignature: string;
  }) => {
    try {
      setLoading(true);
      const res = await fetch('/api/checkout/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          orderId: createdOrderData.orderId,
          razorpayPaymentId: paymentDetails.razorpayPaymentId,
          razorpaySignature: paymentDetails.razorpaySignature,
        }),
      });

      const data = await res.json();
      if (res.ok) {
        setPaymentModalOpen(false);
        clearCart();
        router.push(`/order-confirmed/${createdOrderData.orderId}`);
      } else {
        setError(data.message || 'Payment signature verification failed.');
        setPaymentModalOpen(false);
        setLoading(false);
      }
    } catch (e: any) {
      setError('Verification connection error.');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0c] text-white py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <span className="text-xs font-bold uppercase tracking-widest text-blue-400">
            Secure Checkout
          </span>
          <h1 className="text-3xl font-black uppercase font-display tracking-tight text-white mt-1">
            Delivery & Payment Details
          </h1>
        </div>

        {error && (
          <div className="mb-6 p-4 rounded bg-red-950/40 border border-red-800 text-red-400 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Form: Details & Payment */}
          <div className="lg:col-span-7 space-y-6">
            {/* Customer Details */}
            <div className="sport-card p-6 space-y-4">
              <h2 className="text-sm font-bold uppercase tracking-wider text-white">
                1. Customer Information
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-zinc-300 mb-1">Full Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Rahul Sharma"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-zinc-900 border border-zinc-800 rounded text-white focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-zinc-300 mb-1">Mobile Number (10 Digits) *</label>
                  <input
                    type="tel"
                    required
                    maxLength={10}
                    placeholder="e.g. 9876543210"
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-zinc-900 border border-zinc-800 rounded text-white focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-300 mb-1">Email Address *</label>
                <input
                  type="email"
                  required
                  placeholder="athlete@domain.com"
                  value={customerEmail}
                  onChange={(e) => setCustomerEmail(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-zinc-900 border border-zinc-800 rounded text-white focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>

            {/* Delivery Address */}
            <div className="sport-card p-6 space-y-4">
              <h2 className="text-sm font-bold uppercase tracking-wider text-white">
                2. Delivery Address (India)
              </h2>

              <div>
                <label className="block text-xs font-semibold text-zinc-300 mb-1">Street Address / House No. *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Flat 301, Greenfield Sports Residency"
                  value={shippingAddress}
                  onChange={(e) => setShippingAddress(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-zinc-900 border border-zinc-800 rounded text-white focus:outline-none focus:border-blue-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-zinc-300 mb-1">City *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Bengaluru"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-zinc-900 border border-zinc-800 rounded text-white focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-zinc-300 mb-1">State *</label>
                  <select
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-zinc-900 border border-zinc-800 rounded text-white focus:outline-none focus:border-blue-500"
                  >
                    {INDIAN_STATES.map((st) => (
                      <option key={st} value={st}>
                        {st}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-zinc-300 mb-1">PIN Code (6 Digits) *</label>
                  <input
                    type="text"
                    required
                    maxLength={6}
                    placeholder="e.g. 560001"
                    value={postalCode}
                    onChange={(e) => setPostalCode(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-zinc-900 border border-zinc-800 rounded text-white focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>
            </div>

            {/* Payment Method */}
            <div className="sport-card p-6 space-y-4">
              <h2 className="text-sm font-bold uppercase tracking-wider text-white">
                3. Payment Method
              </h2>

              <div className="space-y-3">
                <label
                  onClick={() => setPaymentMethod('ONLINE_UPI')}
                  className={`p-4 rounded border flex items-center justify-between cursor-pointer transition-colors ${
                    paymentMethod === 'ONLINE_UPI'
                      ? 'bg-blue-950/40 border-blue-600 text-white'
                      : 'bg-zinc-900 border-zinc-800 text-zinc-400'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="paymentMethod"
                      checked={paymentMethod === 'ONLINE_UPI'}
                      onChange={() => setPaymentMethod('ONLINE_UPI')}
                      className="text-blue-600"
                    />
                    <div>
                      <span className="text-xs font-bold text-white block">UPI / Online Payment</span>
                      <p className="text-[11px] text-zinc-400">Google Pay, PhonePe, Paytm, BHIM, Cards</p>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-emerald-400">Recommended</span>
                </label>

                <label
                  onClick={() => setPaymentMethod('COD')}
                  className={`p-4 rounded border flex items-center justify-between cursor-pointer transition-colors ${
                    paymentMethod === 'COD'
                      ? 'bg-blue-950/40 border-blue-600 text-white'
                      : 'bg-zinc-900 border-zinc-800 text-zinc-400'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="paymentMethod"
                      checked={paymentMethod === 'COD'}
                      onChange={() => setPaymentMethod('COD')}
                      className="text-blue-600"
                    />
                    <div>
                      <span className="text-xs font-bold text-white block">Cash on Delivery (COD)</span>
                      <p className="text-[11px] text-zinc-400">Pay cash or UPI at your doorstep</p>
                    </div>
                  </div>
                </label>
              </div>
            </div>
          </div>

          {/* Right Summary */}
          <div className="lg:col-span-5 space-y-6">
            <div className="sport-card p-6 space-y-4 sticky top-24">
              <h2 className="text-sm font-bold uppercase tracking-wider text-white">Order Summary</h2>

              <div className="divide-y divide-zinc-800 max-h-56 overflow-y-auto space-y-2">
                {cart.map((item) => (
                  <div key={item.id} className="pt-2 first:pt-0 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-12 rounded bg-zinc-900 overflow-hidden shrink-0">
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <p className="font-semibold text-white uppercase">{item.name}</p>
                        <p className="text-zinc-400 text-[11px]">Size: {item.size} • Qty: {item.quantity}</p>
                      </div>
                    </div>
                    <span className="font-bold text-white">{formatPrice(item.price * item.quantity)}</span>
                  </div>
                ))}
              </div>

              <div className="pt-3 border-t border-zinc-800 space-y-1.5 text-xs text-zinc-400">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="text-white font-medium">{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Delivery</span>
                  <span className="text-emerald-400 font-medium">FREE</span>
                </div>
                <div className="flex justify-between text-base font-bold text-white pt-2 border-t border-zinc-800">
                  <span>Total Amount</span>
                  <span className="text-white text-lg font-black">{formatPrice(finalTotal)}</span>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 rounded bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs uppercase tracking-wider transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {loading ? 'Processing...' : 'PLACE ORDER'}
              </button>

              <div className="text-center text-[11px] text-zinc-500">
                🔒 256-bit SSL encrypted • Instant order confirmation
              </div>
            </div>
          </div>
        </form>
      </div>

      {paymentModalOpen && createdOrderData && (
        <PaymentModal
          isOpen={paymentModalOpen}
          onClose={() => setPaymentModalOpen(false)}
          orderData={createdOrderData}
          onSuccess={handlePaymentSuccess}
          onFailure={(err) => setError(err)}
        />
      )}
    </div>
  );
}
