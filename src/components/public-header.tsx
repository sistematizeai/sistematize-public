'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Business } from '@/types';

interface PublicHeaderProps {
  business: Business;
}

export default function PublicHeader({ business }: PublicHeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-border">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo + Name */}
          <a href={`/${business.slug}`} className="flex items-center gap-3">
            {business.logo_url ? (
              <div className="relative w-9 h-9 rounded-xl overflow-hidden border border-border">
                <Image src={business.logo_url} alt={business.name} fill sizes="36px" className="object-cover" />
              </div>
            ) : (
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#4A6CF7] to-[#6C5CE7] flex items-center justify-center">
                <span className="text-sm font-extrabold text-white">{business.name.charAt(0)}</span>
              </div>
            )}
            <span className="font-bold text-text-primary text-sm tracking-tight">{business.name}</span>
          </a>

          {/* Desktop nav */}
          <div className="hidden sm:flex items-center gap-8">
            <a href="#servicos" className="text-sm text-text-secondary hover:text-accent transition-colors font-medium">Servicos</a>
            {business.whatsapp && (
              <a href="#contato" className="text-sm text-text-secondary hover:text-accent transition-colors font-medium">Contato</a>
            )}
            <a
              href="#servicos"
              className="px-5 py-2.5 bg-gradient-to-r from-[#4A6CF7] to-[#6C5CE7] text-white text-sm font-semibold rounded-xl hover:opacity-90 transition-opacity shadow-sm"
            >
              Agendar agora
            </a>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'}
            className="sm:hidden p-2 text-text-secondary hover:text-text-primary transition-colors"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              {menuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="sm:hidden pb-4 border-t border-border pt-3 flex flex-col gap-3">
            <a href="#servicos" className="text-sm text-text-secondary font-medium px-2 py-1" onClick={() => setMenuOpen(false)}>Servicos</a>
            {business.whatsapp && (
              <a href="#contato" className="text-sm text-text-secondary font-medium px-2 py-1" onClick={() => setMenuOpen(false)}>Contato</a>
            )}
            <a
              href="#servicos"
              className="px-5 py-2.5 bg-gradient-to-r from-[#4A6CF7] to-[#6C5CE7] text-white text-sm font-semibold rounded-xl text-center"
              onClick={() => setMenuOpen(false)}
            >
              Agendar agora
            </a>
          </div>
        )}
      </div>
    </nav>
  );
}
