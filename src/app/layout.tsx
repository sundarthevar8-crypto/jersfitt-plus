import type { Metadata } from 'next';
import './globals.css';
import { CartProvider } from '@/context/CartContext';
import { AuthProvider } from '@/context/AuthContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CartDrawer from '@/components/CartDrawer';

export const metadata: Metadata = {
  title: 'JERSFITT+ — The Jersey with a Built-In Towel',
  description:
    'Performance meets convenience with an integrated sweat-wiping towel and quick-dry sports fabric. Built for gym, running, football and outdoor sports.',
  keywords: [
    'JERSFITT Plus',
    'JERSFITT+',
    'Sports Jersey',
    'Built-in Towel Jersey',
    'Quick Dry Sports Jersey',
    'Athletic Wear',
    'Football Jersey',
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="min-h-screen bg-[#0a0a0c] text-zinc-100 flex flex-col antialiased">
        <AuthProvider>
          <CartProvider>
            <Navbar />
            <main className="flex-1">{children}</main>
            <CartDrawer />
            <Footer />
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
