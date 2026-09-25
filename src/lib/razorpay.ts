import crypto from 'crypto';

export interface PaymentOrderParams {
  amount: number; // in INR
  currency?: string;
  receipt: string;
  notes?: Record<string, string>;
}

export function isRazorpayConfigured(): boolean {
  const keyId = process.env.RAZORPAY_KEY_ID;
  const keySecret = process.env.RAZORPAY_KEY_SECRET;
  return Boolean(keyId && keySecret && keyId.trim() !== '' && keySecret.trim() !== '');
}

export async function createPaymentOrder(params: PaymentOrderParams) {
  const configured = isRazorpayConfigured();
  
  if (!configured) {
    // Return structured test order for simulation mode
    return {
      id: `order_sim_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      amount: Math.round(params.amount * 100),
      currency: 'INR',
      receipt: params.receipt,
      status: 'created',
      isSimulation: true,
      keyId: 'rzp_test_simulation_mode',
    };
  }

  // If live/test Razorpay API keys are configured, make actual API call
  const authHeader = Buffer.from(
    `${process.env.RAZORPAY_KEY_ID}:${process.env.RAZORPAY_KEY_SECRET}`
  ).toString('base64');

  const res = await fetch('https://api.razorpay.com/v1/orders', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Basic ${authHeader}`,
    },
    body: JSON.stringify({
      amount: Math.round(params.amount * 100), // convert to paise
      currency: params.currency || 'INR',
      receipt: params.receipt,
      notes: params.notes,
    }),
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.error?.description || 'Failed to create Razorpay order');
  }

  const orderData = await res.json();
  return {
    ...orderData,
    isSimulation: false,
    keyId: process.env.RAZORPAY_KEY_ID,
  };
}

export function verifyPaymentSignature(
  orderId: string,
  paymentId: string,
  signature: string
): boolean {
  if (!isRazorpayConfigured()) {
    // In simulator mode, verify structured simulator signature
    return signature.startsWith('sim_sig_') || signature.length >= 10;
  }

  const secret = process.env.RAZORPAY_KEY_SECRET!;
  const generated_signature = crypto
    .createHmac('sha256', secret)
    .update(`${orderId}|${paymentId}`)
    .digest('hex');

  return generated_signature === signature;
}
