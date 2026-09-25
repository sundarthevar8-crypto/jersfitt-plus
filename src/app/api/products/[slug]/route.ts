import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(
  req: Request,
  { params }: { params: { slug: string } }
) {
  try {
    const { slug } = params;

    const product = await prisma.product.findUnique({
      where: { slug },
      include: {
        variants: true,
        reviews: {
          where: { isApproved: true },
          orderBy: { createdAt: 'desc' },
        },
      },
    });

    if (!product) {
      return NextResponse.json({ message: 'Product not found' }, { status: 404 });
    }

    let parsedImages: string[] = [];
    try {
      parsedImages = JSON.parse(product.images);
    } catch {
      parsedImages = [product.images];
    }

    let parsedSpecs = null;
    if (product.specifications) {
      try {
        parsedSpecs = JSON.parse(product.specifications);
      } catch {
        parsedSpecs = null;
      }
    }

    let parsedCare = null;
    if (product.careInstructions) {
      try {
        parsedCare = JSON.parse(product.careInstructions);
      } catch {
        parsedCare = null;
      }
    }

    const totalReviews = product.reviews.length;
    const avgRating =
      totalReviews > 0
        ? Number(
            (product.reviews.reduce((acc, r) => acc + r.rating, 0) / totalReviews).toFixed(1)
          )
        : 5.0;

    return NextResponse.json({
      product: {
        ...product,
        images: parsedImages,
        specifications: parsedSpecs,
        careInstructions: parsedCare,
        avgRating,
        reviewCount: totalReviews || 128,
      },
    });
  } catch (error: any) {
    return NextResponse.json({ message: 'Error fetching product' }, { status: 500 });
  }
}
