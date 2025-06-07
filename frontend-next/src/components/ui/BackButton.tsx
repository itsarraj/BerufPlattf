import React from 'react';
import Link from 'next/link';

interface BackButtonProps {
  href: string;
  label?: string;
}

export const BackButton: React.FC<BackButtonProps> = ({
  href,
  label = 'Back'
}) => (
  <Link href={href} className="flex items-center gap-2 text-gold-sun">
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path d="M15 18L9 12L15 6" stroke="#FCC636" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
    <span className="font-normal text-lg">{label}</span>
  </Link>
);