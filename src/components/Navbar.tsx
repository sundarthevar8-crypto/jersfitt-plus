'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ShoppingBag, User, Menu, X, ShieldCheck, ChevronDown, Truck, LogOut } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import Logo from '@/components/Logo';

export default function Navbar() {
  const pathname = usePathname();
  const { totalItemsCount, setIsCartOpen } = useCart();
  const { user, logout } = useAuth();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [accountDropdown, setAccountDropdown] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Shop', href: '/shop' },
    { name: 'Features', href: '/#features' },
    { name: 'How It Works', href: '/#how-it-works' },
    { name: 'Reviews', href: '/reviews' },
    { name: 'About', href: '/about' },
    { name: 'Track Order', href: '/track' },
  ];

  return (
    <header
      className={`sticky top-0 z-40 transition-colors duration-200 border-b ${
        isScrolled
          ? 'bg-[#0a0a0c]/95 backdrop-blur-md border-zinc-800'
          : 'bg-[#0a0a0c] border-zinc-900'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Left: Official JERSFITT+ Logo */}
        <Logo size="md" />

        {/* Center: Navigation Links */}
        <nav className="hidden lg:flex items-center space-x-7">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.name}
                href={link.href}
                className={`text-xs uppercase tracking-wider font-semibold transition-colors ${
                  isActive
                    ? 'text-white'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                {link.name}
              </Link>
            );
          })}
        </nav>

        {/* Right Actions: Account + Cart */}
        <div className="flex items-center space-x-3">
          {/* Admin Fast Access Badge */}
          {user?.role === 'ADMIN' && (
            <Link
              href="/admin"
              className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold text-amber-300 bg-amber-950/40 border border-amber-800/60 rounded"
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              Admin
            </Link>
          )}

          {/* Account Profile / Sign In */}
          {user ? (
            <div className="relative">
              <button
                onClick={() => setAccountDropdown(!accountDropdown)}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-zinc-300 hover:text-white bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 rounded transition-colors"
              >
                <User className="w-3.5 h-3.5 text-blue-400" />
                <span className="max-w-[80px] truncate">{user.name.split(' ')[0]}</span>
                <ChevronDown className="w-3 h-3 opacity-60" />
              </button>

              {accountDropdown && (
                <div
                  className="absolute right-0 mt-2 w-48 bg-[#121216] border border-zinc-800 rounded-lg shadow-xl py-1 z-50 text-xs"
                  onClick={() => setAccountDropdown(false)}
                >
                  <div className="px-3 py-2 border-b border-zinc-800">
                    <p className="font-semibold text-white truncate">{user.name}</p>
                    <p className="text-zinc-400 text-[11px] truncate">{user.email}</p>
                  </div>
                  {user.role === 'ADMIN' && (
                    <Link href="/admin" className="flex items-center gap-2 px-3 py-2 text-amber-400 hover:bg-zinc-800">
                      <ShieldCheck className="w-3.5 h-3.5" /> Admin Dashboard
                    </Link>
                  )}
                  <Link href="/account" className="flex items-center gap-2 px-3 py-2 text-zinc-300 hover:bg-zinc-800">
                    <User className="w-3.5 h-3.5 text-blue-400" /> My Account
                  </Link>
                  <Link href="/track" className="flex items-center gap-2 px-3 py-2 text-zinc-300 hover:bg-zinc-800">
                    <Truck className="w-3.5 h-3.5 text-zinc-400" /> Track Orders
                  </Link>
                  <button
                    onClick={logout}
                    className="w-full text-left flex items-center gap-2 px-3 py-2 text-red-400 hover:bg-red-950/30 border-t border-zinc-800"
                  >
                    <LogOut className="w-3.5 h-3.5" /> Sign Out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link
              href="/login"
              className="text-xs uppercase tracking-wider font-semibold text-zinc-300 hover:text-white px-3 py-1.5 rounded hover:bg-zinc-900 transition-colors"
            >
              Sign In
            </Link>
          )}

          {/* Shopping Bag Button */}
          <button
            onClick={() => setIsCartOpen(true)}
            className="flex items-center gap-2 px-3.5 py-1.5 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 rounded text-xs font-semibold uppercase tracking-wider text-white transition-colors"
            aria-label="Shopping Bag"
          >
            <ShoppingBag className="w-4 h-4 text-blue-400" />
            <span className="hidden sm:inline">Bag</span>
            <span className="bg-blue-600 text-white text-[11px] font-bold px-1.5 py-0.2 rounded-full min-w-[18px] text-center">
              {totalItemsCount}
            </span>
          </button>

          {/* Mobile Menu Trigger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-zinc-400 hover:text-white bg-zinc-900 rounded border border-zinc-800"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#0e0e12] border-b border-zinc-800 px-4 py-4 space-y-2">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded text-xs uppercase tracking-wider font-semibold text-zinc-300 hover:text-white hover:bg-zinc-800"
            >
              {link.name}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}
