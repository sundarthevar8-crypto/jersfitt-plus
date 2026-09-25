import React from 'react';
import { prisma } from '@/lib/prisma';
import ProductCard from '@/components/ProductCard';

export const dynamic = 'force-dynamic';

export default async function ShopPage() {
  const products = await prisma.product.findMany({
    where: {
      slug: {
        in: [
          'jersfitt-plus-black-blue',
          'jersfitt-plus-red-black',
          'jersfitt-plus-blue-red',
          'jersfitt-plus-white-pink',
        ],
      },
    },
    include: {
      variants: true,
      reviews: { where: { isApproved: true } },
    },
    orderBy: { createdAt: 'asc' },
  });

  const formattedProducts = products.map((p) => {
    let images: string[] = [];
    try {
      images = JSON.parse(p.images);
    } catch {
      images = [p.images];
    }
    return { ...p, images };
  });

  return (
    <div className="min-h-screen bg-[#0a0a0c] text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-blue-400">
              Online Store
            </span>
            <h1 className="text-3xl sm:text-4xl font-black uppercase font-display tracking-tight text-white mt-1">
              JERSFITT Plus Collection
            </h1>
            <p className="text-xs text-zinc-400 mt-1 max-w-xl">
              Official performance jerseys with integrated microfiber sweat-wiping towel and quick-dry sports fabric.
            </p>
          </div>
          <div className="text-left md:text-right">
            <span className="text-xs text-zinc-400 block">Flat Transparent Price</span>
            <span className="text-3xl font-black text-white font-display">₹800</span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {formattedProducts.map((p) => (
            <ProductCard key={p.id} product={p as any} />
          ))}
        </div>
      </div>
    </div>
  );
}
