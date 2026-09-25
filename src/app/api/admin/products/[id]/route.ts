import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getSession } from '@/lib/auth';

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getSession();
    if (!session || session.role !== 'ADMIN') {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 403 });
    }

    const { id } = params;
    const body = await req.json();

    const { name, tagline, description, price, compareAtPrice, isFeatured, inStock, edition, variants } = body;

    const updated = await prisma.product.update({
      where: { id },
      data: {
        name,
        tagline,
        description,
        price: Number(price),
        compareAtPrice: compareAtPrice ? Number(compareAtPrice) : null,
        isFeatured: Boolean(isFeatured),
        inStock: Boolean(inStock),
        edition,
      },
    });

    if (variants && Array.isArray(variants)) {
      for (const v of variants) {
        if (v.id) {
          await prisma.productVariant.update({
            where: { id: v.id },
            data: { stock: Number(v.stock) },
          });
        }
      }
    }

    return NextResponse.json({ success: true, product: updated });
  } catch (error: any) {
    return NextResponse.json({ message: error.message || 'Error updating product' }, { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getSession();
    if (!session || session.role !== 'ADMIN') {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 403 });
    }

    const { id } = params;
    await prisma.product.delete({ where: { id } });

    return NextResponse.json({ success: true, message: 'Product deleted' });
  } catch (error: any) {
    return NextResponse.json({ message: 'Error deleting product' }, { status: 500 });
  }
}
