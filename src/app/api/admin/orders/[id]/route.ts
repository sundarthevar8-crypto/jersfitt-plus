import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getSession } from '@/lib/auth';

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getSession();
    if (!session || session.role !== 'ADMIN') {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 403 });
    }

    const { id } = params;
    const { orderStatus, paymentStatus, trackingNotes } = await req.json();

    const dataToUpdate: any = {};
    if (orderStatus) dataToUpdate.orderStatus = orderStatus;
    if (paymentStatus) dataToUpdate.paymentStatus = paymentStatus;
    if (trackingNotes !== undefined) dataToUpdate.trackingNotes = trackingNotes;

    const updatedOrder = await prisma.order.update({
      where: { id },
      data: dataToUpdate,
      include: { items: true },
    });

    return NextResponse.json({
      success: true,
      message: 'Order updated successfully',
      order: updatedOrder,
    });
  } catch (error: any) {
    return NextResponse.json({ message: 'Error updating order' }, { status: 500 });
  }
}
