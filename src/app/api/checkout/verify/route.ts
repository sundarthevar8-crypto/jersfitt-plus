import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyPaymentSignature } from '@/lib/razorpay';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { orderId, razorpayPaymentId, razorpaySignature } = body;

    if (!orderId || !razorpayPaymentId) {
      return NextResponse.json(
        { message: 'Payment verification parameters missing' },
        { status: 400 }
      );
    }

    const order = await prisma.order.findUnique({
      where: { id: orderId },
      include: { items: true },
    });

    if (!order) {
      return NextResponse.json({ message: 'Order not found' }, { status: 404 });
    }

    // Verify signature
    const isValid = verifyPaymentSignature(
      order.razorpayOrderId || '',
      razorpayPaymentId,
      razorpaySignature || ''
    );

    if (!isValid) {
      await prisma.order.update({
        where: { id: order.id },
        data: {
          paymentStatus: 'FAILED',
          trackingNotes: 'Payment verification failed at gateway.',
        },
      });
      return NextResponse.json(
        { message: 'Payment verification failed. Invalid signature.' },
        { status: 400 }
      );
    }

    // Update order to PAID and CONFIRMED
    const updatedOrder = await prisma.order.update({
      where: { id: order.id },
      data: {
        paymentStatus: 'PAID',
        orderStatus: 'CONFIRMED',
        razorpayPaymentId,
        trackingNotes: `Payment received via UPI/Gateway (${razorpayPaymentId}). Order confirmed for fulfillment.`,
      },
    });

    // Reduce inventory stock for ordered items
    for (const item of order.items) {
      if (item.productId) {
        const variant = await prisma.productVariant.findFirst({
          where: { productId: item.productId, size: item.size },
        });
        if (variant) {
          await prisma.productVariant.update({
            where: { id: variant.id },
            data: { stock: Math.max(0, variant.stock - item.quantity) },
          });
        }
      }
    }

    return NextResponse.json({
      success: true,
      message: 'Payment verified and order confirmed!',
      order: updatedOrder,
    });
  } catch (error: any) {
    console.error('Payment verify error:', error);
    return NextResponse.json(
      { message: error.message || 'Payment verification failed' },
      { status: 500 }
    );
  }
}
