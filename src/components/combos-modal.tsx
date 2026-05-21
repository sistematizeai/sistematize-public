'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { PublicCombo } from '@/types';

interface CombosModalProps {
  combos: PublicCombo[];
  slug: string;
  onClose: () => void;
}

function formatPrice(price: number): string {
  return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(price);
}

function ComboItem({ combo, slug }: { combo: PublicCombo; slug: string }) {
  const hasDiscount = combo.original_price > 0 && combo.price < combo.original_price;

  return (
    <Link
      href={`/${slug}/agendar?combo=${combo.id}`}
      className="group flex gap-4 p-4 rounded-2xl border border-border bg-white hover:border-accent/20 hover:shadow-lg hover:shadow-accent/5 transition-all duration-300"
    >
      <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-xl overflow-hidden flex-shrink-0">
        {combo.image_url ? (
          <Image
            src={combo.image_url}
            alt={combo.name}
            fill
            sizes="112px"
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div
            className="w-full h-full flex items-center justify-center"
            style={{ background: 'linear-gradient(135deg, #4A6CF715, #6C5CE730)' }}
          >
            <svg
              className="w-8 h-8 opacity-40 text-[#6C5CE7]"
              fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 11.25v8.25a1.5 1.5 0 0 1-1.5 1.5H5.25a1.5 1.5 0 0 1-1.5-1.5v-8.25M12 4.875A2.625 2.625 0 1 0 9.375 7.5H12m0-2.625V7.5m0-2.625A2.625 2.625 0 1 1 14.625 7.5H12m0 0V21m-8.625-9.75h18c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125h-18c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z" />
            </svg>
          </div>
        )}
      </div>

      <div className="flex-1 min-w-0 flex flex-col justify-between py-0.5">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h3 className="font-bold text-text-primary text-base group-hover:text-accent transition-colors leading-snug">
              {combo.name}
            </h3>
            {hasDiscount && (
              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-green-100 text-green-700">
                -{Math.round((1 - combo.price / combo.original_price) * 100)}%
              </span>
            )}
          </div>
          {combo.description && (
            <p className="text-text-muted text-sm leading-relaxed line-clamp-1 mb-1.5">
              {combo.description}
            </p>
          )}
          <div className="flex flex-wrap gap-1">
            {combo.services.map(s => (
              <span key={s.id} className="inline-flex items-center px-2 py-0.5 rounded-md bg-bg-surface text-[11px] text-text-secondary font-medium">
                {s.name}
              </span>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-between mt-2">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5">
              {hasDiscount && (
                <span className="text-text-muted text-xs line-through">{formatPrice(combo.original_price)}</span>
              )}
              <span className="text-accent font-bold text-sm">{formatPrice(combo.price)}</span>
            </div>
            <span className="text-text-muted text-xs flex items-center gap-1">
              <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
              </svg>
              {combo.duration_minutes}min
            </span>
          </div>

          <span className="text-xs font-semibold text-accent opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1">
            Agendar
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
            </svg>
          </span>
        </div>
      </div>
    </Link>
  );
}

export default function CombosModal({ combos, slug, onClose }: CombosModalProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  useEffect(() => {
    function handleEsc(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose();
    }
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  function handleOverlayClick(e: React.MouseEvent) {
    if (contentRef.current && !contentRef.current.contains(e.target as Node)) onClose();
  }

  return (
    <div
      ref={overlayRef}
      onClick={handleOverlayClick}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6"
    >
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm animate-[fadeIn_200ms_ease-out]" />

      <div
        ref={contentRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="combos-modal-title"
        className="relative bg-white rounded-3xl shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col animate-[slideUp_300ms_ease-out]"
      >
        <div className="flex items-center justify-between px-6 sm:px-8 pt-6 sm:pt-8 pb-4">
          <div className="flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center"
              style={{ background: 'linear-gradient(135deg, #4A6CF720, #6C5CE730)', color: '#6C5CE7' }}
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 11.25v8.25a1.5 1.5 0 0 1-1.5 1.5H5.25a1.5 1.5 0 0 1-1.5-1.5v-8.25M12 4.875A2.625 2.625 0 1 0 9.375 7.5H12m0-2.625V7.5m0-2.625A2.625 2.625 0 1 1 14.625 7.5H12m0 0V21m-8.625-9.75h18c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125h-18c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z" />
              </svg>
            </div>
            <div>
              <h2 id="combos-modal-title" className="text-lg sm:text-xl font-extrabold text-text-primary">Combos</h2>
              <p className="text-xs text-text-muted">
                {combos.length} {combos.length === 1 ? 'combo disponivel' : 'combos disponiveis'}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            aria-label="Fechar"
            className="w-9 h-9 rounded-xl bg-bg-surface flex items-center justify-center text-text-muted hover:text-text-primary hover:bg-border/30 transition-colors cursor-pointer"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="h-px bg-border mx-6 sm:mx-8" />

        <div className="flex-1 overflow-y-auto px-6 sm:px-8 py-5 space-y-3">
          {combos.map(combo => (
            <ComboItem key={combo.id} combo={combo} slug={slug} />
          ))}
        </div>

        <div className="px-6 sm:px-8 py-4 border-t border-border bg-bg-surface/50 rounded-b-3xl">
          <p className="text-xs text-text-muted text-center">
            Clique em um combo para ir para o agendamento
          </p>
        </div>
      </div>
    </div>
  );
}
