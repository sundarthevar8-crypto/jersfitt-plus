import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getSession } from '@/lib/auth';

export async function GET() {
  try {
    const products = await prisma.product.findMany({
      include: { variants: true },
      orderBy: { createdAt: 'desc' },
    });
    return NextResponse.json({ products });
  } catch (error: any) {
    return NextResponse.json({ message: 'Error fetching products' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const session = await getSession();
    if (!session || session.role !== 'ADMIN') {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 403 });
    }

    const body = await req.json();
    const {
      name,
      slug,
      tagline,
      description,
      price,
      compareAtPrice,
      isFeatured,
      inStock,
      images,
      category,
      edition,
      variants,
    } = body;

    const newProduct = await prisma.product.create({
      data: {
        name,
        slug: slug || name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
        tagline,
        description,
        price: Number(price),
        compareAtPrice: compareAtPrice ? Number(compareAtPrice) : null,
        isFeatured: Boolean(isFeatured),
        inStock: Boolean(inStock),
        images: typeof images === 'string' ? images : JSON.stringify(images),
        category: category || 'Jerseys',
        edition: edition || 'Special Edition',
        variants: {
          create: variants || [
            { size: 'S', sku: `${slug}-S`, stock: 15 },
            { size: 'M', sku: `${slug}-M`, stock: 25 },
            { size: 'L', sku: `${slug}-L`, stock: 25 },
            { size: 'XL', sku: `${slug}-XL`, stock: 15 },
            { size: 'XXL', sku: `${slug}-XXL`, stock: 5 },
          ],
        },
      },
      include: { variants: true },
    });

    return NextResponse.json({ success: true, product: newProduct });
  } catch (error: any) {
    return NextResponse.json({ message: error.message || 'Error creating product' }, { status: 500 });
  }
}
