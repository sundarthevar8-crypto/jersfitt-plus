'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Lock, ArrowRight, AlertCircle } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import Logo from '@/components/Logo';

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const res = await login(email, password);
    setLoading(false);

    if (res.success) {
      router.push('/account');
    } else {
      setError(res.message);
    }
  };

  const handleFillDemoAdmin = () => {
    setEmail('admin@jersfitt.com');
    setPassword('admin123');
  };

  const handleFillDemoCustomer = () => {
    setEmail('alex.pereira@football.com');
    setPassword('customer123');
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 bg-[#0a0a0c] text-white py-12">
      <div className="w-full max-w-md p-8 rounded-2xl bg-[#121216] border border-zinc-800 space-y-6">
        <div className="text-center space-y-2">
          <Logo size="md" />
          <h1 className="text-xl font-bold uppercase font-display tracking-tight text-white mt-2">
            Sign In to Your Account
          </h1>
          <p className="text-xs text-zinc-400">
            Access previous orders and saved delivery addresses.
          </p>
        </div>

        {/* Demo fill buttons */}
        <div className="p-3 bg-zinc-900 border border-zinc-800 rounded text-xs space-y-2">
          <span className="text-[11px] font-bold uppercase tracking-wider text-zinc-400 block">
            Instant Demo Credentials:
          </span>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={handleFillDemoAdmin}
              className="flex-1 py-1.5 px-2 bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 rounded text-[11px] font-semibold text-zinc-200"
            >
              Fill Admin
            </button>
            <button
              type="button"
              onClick={handleFillDemoCustomer}
              className="flex-1 py-1.5 px-2 bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 rounded text-[11px] font-semibold text-zinc-200"
            >
              Fill Customer
            </button>
          </div>
        </div>

        {error && (
          <div className="p-3 rounded bg-red-950/40 border border-red-800 text-red-400 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-zinc-300 mb-1">Email Address</label>
            <input
              type="email"
              required
              placeholder="athlete@domain.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 text-xs bg-zinc-900 border border-zinc-800 rounded text-white focus:outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-zinc-300 mb-1">Password</label>
            <input
              type="password"
              required
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 text-xs bg-zinc-900 border border-zinc-800 rounded text-white focus:outline-none focus:border-blue-500"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs uppercase tracking-wider transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {loading ? 'Signing In...' : 'Sign In'} <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="text-center text-xs text-zinc-400">
          Don&apos;t have an account?{' '}
          <Link href="/register" className="text-blue-400 font-semibold hover:underline">
            Register Here
          </Link>
        </div>
      </div>
    </div>
  );
}
