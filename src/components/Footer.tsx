import React from 'react';
import Link from 'next/link';
import Logo from '@/components/Logo';

export default function Footer() {
  return (
    <footer className="bg-[#08080a] border-t border-zinc-800 text-zinc-400 text-xs py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-8 border-b border-zinc-850">
          <div>
            <Logo size="md" />
            <p className="text-xs text-zinc-400 mt-2 max-w-md">
              A sports jersey with an integrated microfiber sweat-absorbing towel panel and quick-dry sports fabric designed for active sports.
            </p>
          </div>

          <div className="flex flex-wrap gap-6 text-xs font-semibold uppercase tracking-wider text-zinc-300">
            <Link href="/shop" className="hover:text-white transition-colors">Shop</Link>
            <Link href="/#features" className="hover:text-white transition-colors">Features</Link>
            <Link href="/#how-it-works" className="hover:text-white transition-colors">How It Works</Link>
            <Link href="/reviews" className="hover:text-white transition-colors">Reviews</Link>
            <Link href="/about" className="hover:text-white transition-colors">About</Link>
            <Link href="/track" className="hover:text-white transition-colors">Track Order</Link>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-zinc-500 text-[11px]">
          <p>© 2026 JERSFITT Plus. All rights reserved.</p>
          <div className="flex items-center space-x-6">
            <Link href="/contact" className="hover:text-zinc-300 transition-colors">Contact</Link>
            <Link href="/faq" className="hover:text-zinc-300 transition-colors">Privacy Policy</Link>
            <Link href="/faq" className="hover:text-zinc-300 transition-colors">Returns</Link>
            <Link href="/faq" className="hover:text-zinc-300 transition-colors">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
