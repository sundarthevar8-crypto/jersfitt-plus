import React from 'react';
import { prisma } from '@/lib/prisma';
import { Star, CheckCircle2, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { formatDate } from '@/lib/formatters';

export const dynamic = 'force-dynamic';

export default async function ReviewsPage() {
  const reviews = await prisma.review.findMany({
    where: { isApproved: true },
    include: {
      product: {
        select: { name: true, slug: true, edition: true },
      },
    },
    orderBy: { createdAt: 'desc' },
  });

  return (
    <div className="min-h-screen bg-[#0a0a0c] text-white py-14">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-10">
        <div className="text-center max-w-xl mx-auto space-y-2">
          <span className="text-xs font-bold uppercase tracking-widest text-blue-400">
            Customer Feedback
          </span>
          <h1 className="text-3xl sm:text-4xl font-black uppercase font-display tracking-tight text-white">
            Customer Reviews
          </h1>
          <p className="text-xs text-zinc-400">
            Reviews from athletes using the JERSFITT Plus performance jersey. (Sample reviews for demonstration).
          </p>
        </div>

        <div className="space-y-4">
          {reviews.map((r) => (
            <div key={r.id} className="sport-card p-6 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1 text-amber-400">
                  {[...Array(r.rating)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                  ))}
                </div>
                <span className="text-xs text-zinc-500">{formatDate(r.createdAt)}</span>
              </div>

              <div>
                <h3 className="text-base font-bold text-white uppercase font-display">&ldquo;{r.title}&rdquo;</h3>
                <p className="text-xs text-zinc-300 mt-1 leading-relaxed">&ldquo;{r.comment}&rdquo;</p>
              </div>

              <div className="pt-3 border-t border-zinc-800 flex items-center justify-between text-xs text-zinc-400">
                <span className="font-semibold text-zinc-200">{r.authorName}</span>
                <span className="text-[11px] text-zinc-500">Verified Sample Review</span>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center pt-4">
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 px-6 py-3 rounded bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs uppercase tracking-wider transition-colors"
          >
            Order JERSFITT Plus — ₹800 <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
