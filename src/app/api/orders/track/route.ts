import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const orderNumber = searchParams.get('orderNumber')?.trim().toUpperCase();
    const phoneOrEmail = searchParams.get('query')?.trim().toLowerCase();

    if (!orderNumber && !phoneOrEmail) {
      return NextResponse.json(
        { message: 'Please provide an Order ID, Email or Mobile Number' },
        { status: 400 }
      );
    }

    let order = null;

    if (orderNumber) {
      order = await prisma.order.findUnique({
        where: { orderNumber },
        include: { items: true },
      });
    }

    if (!order && phoneOrEmail) {
      order = await prisma.order.findFirst({
        where: {
          OR: [
            { customerEmail: phoneOrEmail },
            { customerPhone: phoneOrEmail },
            { orderNumber: phoneOrEmail.toUpperCase() },
          ],
        },
        include: { items: true },
        orderBy: { createdAt: 'desc' },
      });
    }

    if (!order) {
      return NextResponse.json(
        { message: 'No matching order found. Please check your Order ID.' },
        { status: 404 }
      );
    }

    return NextResponse.json({ order });
  } catch (error: any) {
    return NextResponse.json(
      { message: 'Error retrieving order tracking' },
      { status: 500 }
    );
  }
}
