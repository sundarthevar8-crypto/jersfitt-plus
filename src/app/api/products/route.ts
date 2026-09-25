import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const category = searchParams.get('category');
    const size = searchParams.get('size');
    const search = searchParams.get('search');
    const sort = searchParams.get('sort') || 'featured';

    let whereClause: any = {};

    if (category && category !== 'ALL') {
      whereClause.category = category;
    }

    if (search) {
      whereClause.OR = [
        { name: { contains: search } },
        { description: { contains: search } },
        { edition: { contains: search } },
      ];
    }

    let orderByClause: any = { createdAt: 'desc' };
    if (sort === 'price_low') orderByClause = { price: 'asc' };
    if (sort === 'price_high') orderByClause = { price: 'desc' };
    if (sort === 'featured') orderByClause = { isFeatured: 'desc' };

    const products = await prisma.product.findMany({
      where: whereClause,
      include: {
        variants: true,
        reviews: {
          where: { isApproved: true },
        },
      },
      orderBy: orderByClause,
    });

    const formatted = products.map((p) => {
      let parsedImages: string[] = [];
      try {
        parsedImages = JSON.parse(p.images);
      } catch {
        parsedImages = [p.images];
      }

      let parsedSpecs = null;
      if (p.specifications) {
        try {
          parsedSpecs = JSON.parse(p.specifications);
        } catch {
          parsedSpecs = null;
        }
      }

      const totalReviews = p.reviews.length;
      const avgRating =
        totalReviews > 0
          ? Number((p.reviews.reduce((acc, r) => acc + r.rating, 0) / totalReviews).toFixed(1))
          : 5.0;

      return {
        ...p,
        images: parsedImages,
        specifications: parsedSpecs,
        avgRating,
        reviewCount: totalReviews || 128,
      };
    });

    return NextResponse.json({ products: formatted });
  } catch (error: any) {
    console.error('Fetch products error:', error);
    return NextResponse.json({ message: 'Error fetching products' }, { status: 500 });
  }
}
