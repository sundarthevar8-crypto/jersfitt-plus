import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getSession } from '@/lib/auth';

export async function GET() {
  try {
    const session = await getSession();
    if (!session || session.role !== 'ADMIN') {
      return NextResponse.json({ message: 'Unauthorized. Admin access required.' }, { status: 403 });
    }

    const totalOrdersCount = await prisma.order.count();
    const paidOrders = await prisma.order.findMany({
      where: { paymentStatus: 'PAID' },
      select: { totalAmount: true },
    });
    const totalRevenue = paidOrders.reduce((sum, o) => sum + o.totalAmount, 0);

    const pendingOrdersCount = await prisma.order.count({
      where: { orderStatus: { in: ['PLACED', 'CONFIRMED', 'PACKED'] } },
    });

    const deliveredOrdersCount = await prisma.order.count({
      where: { orderStatus: 'DELIVERED' },
    });

    const totalCustomersCount = await prisma.user.count({
      where: { role: 'CUSTOMER' },
    });

    const lowStockVariants = await prisma.productVariant.findMany({
      where: { stock: { lte: 10 } },
      include: { product: true },
    });

    const recentOrders = await prisma.order.findMany({
      take: 8,
      orderBy: { createdAt: 'desc' },
      include: { items: true },
    });

    const pendingReviewsCount = await prisma.review.count({
      where: { isApproved: false },
    });

    return NextResponse.json({
      metrics: {
        totalRevenue,
        totalOrdersCount,
        pendingOrdersCount,
        deliveredOrdersCount,
        totalCustomersCount,
        lowStockCount: lowStockVariants.length,
        pendingReviewsCount,
      },
      lowStockVariants,
      recentOrders,
    });
  } catch (error: any) {
    return NextResponse.json({ message: 'Error retrieving admin metrics' }, { status: 500 });
  }
}
