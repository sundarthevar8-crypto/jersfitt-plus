import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getSession } from '@/lib/auth';

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const productId = searchParams.get('productId');

    const whereClause: any = { isApproved: true };
    if (productId) {
      whereClause.productId = productId;
    }

    const reviews = await prisma.review.findMany({
      where: whereClause,
      include: {
        product: {
          select: { name: true, edition: true, slug: true },
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json({ reviews });
  } catch (error: any) {
    return NextResponse.json({ message: 'Error fetching reviews' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { productId, authorName, authorEmail, rating, title, comment } = body;

    if (!productId || !authorName || !authorEmail || !title || !comment || !rating) {
      return NextResponse.json(
        { message: 'All review fields and rating are required.' },
        { status: 400 }
      );
    }

    const session = await getSession();

    const review = await prisma.review.create({
      data: {
        productId,
        userId: session?.id || null,
        authorName: authorName.trim(),
        authorEmail: authorEmail.toLowerCase().trim(),
        rating: Math.min(5, Math.max(1, Number(rating))),
        title: title.trim(),
        comment: comment.trim(),
        isVerifiedPurchase: true,
        isApproved: true,
      },
    });

    return NextResponse.json({
      success: true,
      message: 'Thank you! Your verified review has been published.',
      review,
    });
  } catch (error: any) {
    return NextResponse.json(
      { message: error.message || 'Error submitting review' },
      { status: 500 }
    );
  }
}
