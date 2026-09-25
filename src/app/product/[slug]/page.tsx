import React from 'react';
import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';
import ProductDetailClient from './ProductDetailClient';

export const dynamic = 'force-dynamic';

export default async function ProductDetailPage({
  params,
}: {
  params: { slug: string };
}) {
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
    notFound();
  }

  let images: string[] = [];
  try {
    images = JSON.parse(product.images);
  } catch {
    images = [product.images];
  }

  let specs: any = null;
  if (product.specifications) {
    try {
      specs = JSON.parse(product.specifications);
    } catch {
      specs = null;
    }
  }

  let care: any = null;
  if (product.careInstructions) {
    try {
      care = JSON.parse(product.careInstructions);
    } catch {
      care = null;
    }
  }

  const formattedProduct = {
    ...product,
    images,
    specifications: specs,
    careInstructions: care,
  };

  return <ProductDetailClient product={formattedProduct as any} />;
}
