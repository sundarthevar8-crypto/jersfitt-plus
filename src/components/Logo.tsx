import React from 'react';
import Link from 'next/link';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  href?: string;
}

export default function Logo({ className = '', size = 'md', href = '/' }: LogoProps) {
  const sizeClasses = {
    sm: 'text-lg',
    md: 'text-xl sm:text-2xl',
    lg: 'text-3xl sm:text-4xl',
  };

  const content = (
    <div className={`inline-flex items-center select-none font-display font-black tracking-tight ${className}`}>
      <span className={`text-white uppercase ${sizeClasses[size]}`}>
        JERSFITT
      </span>
      <span className={`text-blue-500 font-extrabold ml-0.5 ${sizeClasses[size]}`}>
        +
      </span>
    </div>
  );

  if (!href) return content;

  return (
    <Link href={href} className="flex items-center group">
      {content}
    </Link>
  );
}
