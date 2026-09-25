import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(req: Request) {
  try {
    const { code, subtotal } = await req.json();

    if (!code) {
      return NextResponse.json({ message: 'Coupon code required' }, { status: 400 });
    }

    const coupon = await prisma.coupon.findUnique({
      where: { code: code.trim().toUpperCase() },
    });

    if (!coupon || !coupon.isActive) {
      return NextResponse.json({ message: 'Invalid or expired coupon code' }, { status: 400 });
    }

    if (subtotal < coupon.minOrderAmount) {
      return NextResponse.json(
        { message: `Minimum cart value for this coupon is ₹${coupon.minOrderAmount}` },
        { status: 400 }
      );
    }

    let discount = 0;
    if (coupon.discountType === 'PERCENTAGE') {
      const rawDiscount = (subtotal * coupon.discountValue) / 100;
      discount = coupon.maxDiscount ? Math.min(rawDiscount, coupon.maxDiscount) : rawDiscount;
    } else {
      discount = coupon.discountValue;
    }

    return NextResponse.json({
      success: true,
      coupon: {
        code: coupon.code,
        discountType: coupon.discountType,
        discountValue: coupon.discountValue,
        calculatedDiscount: discount,
      },
    });
  } catch (error: any) {
    return NextResponse.json({ message: 'Error checking coupon' }, { status: 500 });
  }
}
