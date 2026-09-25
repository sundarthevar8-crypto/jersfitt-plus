import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getSession } from '@/lib/auth';
import { generateOrderNumber, validateIndianMobile, validateIndianPin } from '@/lib/formatters';
import { createPaymentOrder } from '@/lib/razorpay';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      customerName,
      customerEmail,
      customerPhone,
      shippingAddress,
      city,
      state,
      postalCode,
      orderNotes,
      paymentMethod, // 'COD' or 'ONLINE_UPI'
      items, // array of { productId, size, quantity }
      couponCode,
    } = body;

    // 1. Validate customer information
    if (!customerName || !customerEmail || !customerPhone || !shippingAddress || !city || !state || !postalCode) {
      return NextResponse.json(
        { message: 'All delivery address fields are required.' },
        { status: 400 }
      );
    }

    if (!validateIndianMobile(customerPhone)) {
      return NextResponse.json(
        { message: 'Please enter a valid 10-digit Indian mobile number.' },
        { status: 400 }
      );
    }

    if (!validateIndianPin(postalCode)) {
      return NextResponse.json(
        { message: 'Please enter a valid 6-digit Indian postal PIN code.' },
        { status: 400 }
      );
    }

    if (!items || !Array.isArray(items) || items.length === 0) {
      return NextResponse.json(
        { message: 'Your shopping bag is empty.' },
        { status: 400 }
      );
    }

    // 2. Fetch verified products from DB & recalculate subtotal server-side
    let calculatedSubtotal = 0;
    const orderItemsData: any[] = [];

    for (const item of items) {
      const product = await prisma.product.findFirst({
        where: {
          OR: [{ id: item.productId }, { slug: item.productId }],
        },
        include: { variants: true },
      });

      if (!product) {
        return NextResponse.json(
          { message: `Product item not found in catalog: ${item.productId}` },
          { status: 400 }
        );
      }

      const variant = product.variants.find((v) => v.size === item.size) || product.variants[0];
      if (variant && variant.stock < item.quantity) {
        return NextResponse.json(
          {
            message: `Only ${variant.stock} units available for ${product.name} (Size: ${item.size})`,
          },
          { status: 400 }
        );
      }

      let parsedImages: string[] = [];
      try {
        parsedImages = JSON.parse(product.images);
      } catch {
        parsedImages = [product.images];
      }

      const unitPrice = product.price;
      const lineTotal = unitPrice * item.quantity;
      calculatedSubtotal += lineTotal;

      orderItemsData.push({
        productId: product.id,
        productName: product.name,
        productImage: parsedImages[0] || '',
        size: item.size,
        quantity: item.quantity,
        unitPrice,
        totalPrice: lineTotal,
      });
    }

    // 3. Evaluate Discount Coupons Server-side
    let discountAmount = 0;
    if (couponCode) {
      const coupon = await prisma.coupon.findUnique({
        where: { code: couponCode.trim().toUpperCase() },
      });

      if (coupon && coupon.isActive && calculatedSubtotal >= coupon.minOrderAmount) {
        if (coupon.discountType === 'PERCENTAGE') {
          const rawDiscount = (calculatedSubtotal * coupon.discountValue) / 100;
          discountAmount = coupon.maxDiscount
            ? Math.min(rawDiscount, coupon.maxDiscount)
            : rawDiscount;
        } else {
          discountAmount = coupon.discountValue;
        }
      }
    }

    // 4. Evaluate Shipping and COD Fees (Free delivery for ₹800)
    const freeShippingThreshold = 799;
    const shippingFee = calculatedSubtotal >= freeShippingThreshold ? 0 : 0;
    const codCharge = 0;
    const totalAmount = Math.max(0, calculatedSubtotal - discountAmount) + shippingFee + codCharge;

    // 5. Check Logged-in User Session
    const session = await getSession();
    const userId = session?.id || null;

    const orderNumber = generateOrderNumber();

    // 6. Handle Payment Gateway / Razorpay Setup if Online
    let razorpayOrder = null;
    if (paymentMethod === 'ONLINE_UPI' || paymentMethod === 'RAZORPAY') {
      razorpayOrder = await createPaymentOrder({
        amount: totalAmount,
        receipt: orderNumber,
        notes: {
          customerName,
          customerEmail,
          orderNumber,
        },
      });
    }

    // 7. Save Order to Database
    const newOrder = await prisma.order.create({
      data: {
        orderNumber,
        userId,
        customerName: customerName.trim(),
        customerEmail: customerEmail.toLowerCase().trim(),
        customerPhone: customerPhone.trim(),
        shippingAddress: shippingAddress.trim(),
        city: city.trim(),
        state: state.trim(),
        postalCode: postalCode.trim(),
        orderNotes: orderNotes ? orderNotes.trim() : null,
        subtotal: calculatedSubtotal,
        shippingFee,
        codCharge,
        discount: discountAmount,
        totalAmount,
        paymentMethod: paymentMethod === 'COD' ? 'COD' : 'ONLINE_UPI',
        paymentStatus: 'PENDING',
        razorpayOrderId: razorpayOrder?.id || null,
        orderStatus: 'PLACED',
        trackingNotes:
          paymentMethod === 'COD'
            ? 'Order confirmed. Awaiting warehouse packaging.'
            : 'Awaiting payment confirmation.',
        items: {
          create: orderItemsData,
        },
      },
      include: {
        items: true,
      },
    });

    // 8. If COD, reserve/reduce variant stock immediately
    if (paymentMethod === 'COD') {
      for (const item of items) {
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
      order: newOrder,
      razorpayOrder,
    });
  } catch (error: any) {
    console.error('Checkout error:', error);
    return NextResponse.json(
      { message: error.message || 'Failed to place order.' },
      { status: 500 }
    );
  }
}
