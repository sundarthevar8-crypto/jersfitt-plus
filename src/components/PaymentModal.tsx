'use client';

import React, { useState } from 'react';
import {
  ShieldCheck,
  QrCode,
  Smartphone,
  CreditCard,
  Building2,
  X,
  Lock
} from 'lucide-react';
import { formatPrice } from '@/lib/formatters';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  orderData: {
    orderId: string;
    orderNumber: string;
    amount: number;
    customerName: string;
    customerEmail: string;
    customerPhone: string;
    razorpayOrderId?: string;
  };
  onSuccess: (paymentDetails: { razorpayPaymentId: string; razorpaySignature: string }) => void;
  onFailure: (error: string) => void;
}

export default function PaymentModal({
  isOpen,
  onClose,
  orderData,
  onSuccess,
}: PaymentModalProps) {
  const [tab, setTab] = useState<'UPI_QR' | 'UPI_ID' | 'CARD' | 'NETBANKING'>('UPI_QR');
  const [upiId, setUpiId] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvv, setCardCvv] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  if (!isOpen) return null;

  const handleSimulatePaymentSuccess = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      const fakePaymentId = `pay_sim_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
      const fakeSignature = `sim_sig_${Date.now()}_valid_signature`;
      onSuccess({
        razorpayPaymentId: fakePaymentId,
        razorpaySignature: fakeSignature,
      });
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs">
      <div className="relative w-full max-w-md bg-[#121216] border border-zinc-800 rounded-2xl shadow-2xl overflow-hidden text-white">
        {/* Header */}
        <div className="px-6 py-4 bg-[#16161c] border-b border-zinc-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-blue-400" />
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-white">
                UPI / Secure Checkout
              </span>
              <p className="text-[11px] text-zinc-400">Order Ref: {orderData.orderNumber}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-zinc-400 hover:text-white rounded hover:bg-zinc-800 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Amount Banner */}
        <div className="px-6 py-3 bg-[#0d0d11] border-b border-zinc-800 flex items-center justify-between">
          <span className="text-xs text-zinc-400">Total Payable:</span>
          <span className="text-base font-black text-white font-display">
            {formatPrice(orderData.amount)}
          </span>
        </div>

        {/* Payment Methods Nav */}
        <div className="p-6 space-y-5">
          <div className="grid grid-cols-4 gap-2">
            <button
              onClick={() => setTab('UPI_QR')}
              className={`p-2 rounded text-center flex flex-col items-center gap-1 transition-colors ${
                tab === 'UPI_QR'
                  ? 'bg-blue-600 text-white'
                  : 'bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-zinc-200'
              }`}
            >
              <QrCode className="w-4 h-4" />
              <span className="text-[10px] font-bold">UPI QR</span>
            </button>

            <button
              onClick={() => setTab('UPI_ID')}
              className={`p-2 rounded text-center flex flex-col items-center gap-1 transition-colors ${
                tab === 'UPI_ID'
                  ? 'bg-blue-600 text-white'
                  : 'bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-zinc-200'
              }`}
            >
              <Smartphone className="w-4 h-4" />
              <span className="text-[10px] font-bold">UPI ID</span>
            </button>

            <button
              onClick={() => setTab('CARD')}
              className={`p-2 rounded text-center flex flex-col items-center gap-1 transition-colors ${
                tab === 'CARD'
                  ? 'bg-blue-600 text-white'
                  : 'bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-zinc-200'
              }`}
            >
              <CreditCard className="w-4 h-4" />
              <span className="text-[10px] font-bold">Card</span>
            </button>

            <button
              onClick={() => setTab('NETBANKING')}
              className={`p-2 rounded text-center flex flex-col items-center gap-1 transition-colors ${
                tab === 'NETBANKING'
                  ? 'bg-blue-600 text-white'
                  : 'bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-zinc-200'
              }`}
            >
              <Building2 className="w-4 h-4" />
              <span className="text-[10px] font-bold">NetBank</span>
            </button>
          </div>

          {/* Tab Content */}
          {tab === 'UPI_QR' && (
            <div className="flex flex-col items-center text-center space-y-3 py-2">
              <div className="p-3 bg-white rounded-xl">
                <img
                  src={`https://api.qrserver.com/v1/create-qr-code/?size=140x140&data=upi://pay?pa=jersfitt@upi&pn=JERSFITT+Plus&am=${orderData.amount}&cu=INR`}
                  alt="UPI QR Code"
                  className="w-32 h-32"
                />
              </div>
              <p className="text-xs text-zinc-300">Scan with GPay, PhonePe, Paytm or BHIM</p>
            </div>
          )}

          {tab === 'UPI_ID' && (
            <div className="space-y-3 py-1">
              <div>
                <label className="block text-xs text-zinc-300 mb-1">Enter UPI VPA ID</label>
                <input
                  type="text"
                  placeholder="athlete@okhdfcbank"
                  value={upiId}
                  onChange={(e) => setUpiId(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-zinc-900 border border-zinc-800 rounded text-white focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>
          )}

          {tab === 'CARD' && (
            <div className="space-y-3 py-1">
              <div>
                <label className="block text-xs text-zinc-300 mb-1">Card Number</label>
                <input
                  type="text"
                  placeholder="4532 •••• •••• 8821"
                  value={cardNumber}
                  onChange={(e) => setCardNumber(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-zinc-900 border border-zinc-800 rounded text-white focus:outline-none focus:border-blue-500"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs text-zinc-300 mb-1">Expiry</label>
                  <input
                    type="text"
                    placeholder="MM / YY"
                    value={cardExpiry}
                    onChange={(e) => setCardExpiry(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-zinc-900 border border-zinc-800 rounded text-white focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-xs text-zinc-300 mb-1">CVV</label>
                  <input
                    type="password"
                    maxLength={3}
                    placeholder="•••"
                    value={cardCvv}
                    onChange={(e) => setCardCvv(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-zinc-900 border border-zinc-800 rounded text-white focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>
            </div>
          )}

          {tab === 'NETBANKING' && (
            <div className="grid grid-cols-2 gap-2 text-xs py-1">
              {['HDFC Bank', 'ICICI Bank', 'State Bank of India', 'Axis Bank'].map((bank) => (
                <button
                  key={bank}
                  type="button"
                  className="p-2.5 text-left rounded bg-zinc-900 border border-zinc-800 hover:border-blue-500 text-zinc-300 text-[11px]"
                >
                  {bank}
                </button>
              ))}
            </div>
          )}

          {/* Action */}
          <div className="space-y-2 pt-2">
            <button
              onClick={handleSimulatePaymentSuccess}
              disabled={isProcessing}
              className="w-full py-3 px-4 rounded bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs uppercase tracking-wider transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {isProcessing ? (
                'Authorizing Payment...'
              ) : (
                <>
                  <Lock className="w-3.5 h-3.5" /> Pay {formatPrice(orderData.amount)}
                </>
              )}
            </button>
            <p className="text-[10px] text-zinc-500 text-center">
              256-bit SSL encrypted • Zero card credentials stored
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
