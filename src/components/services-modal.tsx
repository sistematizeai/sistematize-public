'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { PublicCategory, PublicService } from '@/types';

interface ServicesModalProps {
  category: PublicCategory;
  slug: string;
  onClose: () => void;
}

function formatPrice(price: number): string {
  return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(price);
}

function ServiceItem({ service, slug, categoryColor }: { service: PublicService; slug: string; categoryColor: string }) {
  return (
    <Link
      href={`/${slug}/agendar?service=${service.id}`}
      className="group flex gap-4 p-4 rounded-2xl border border-border bg-white hover:border-accent/20 hover:shadow-lg hover:shadow-accent/5 transition-all duration-300"
    >
      {/* Image or fallback */}
      <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-xl overflow-hidden flex-shrink-0">
        {service.image_url ? (
          <img
            src={service.image_url}
            alt={service.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div
            className="w-full h-full flex items-center justify-center"
            style={{ background: `linear-gradient(135deg, ${categoryColor}15, ${categoryColor}30)` }}
          >
            <svg
              className="w-8 h-8 opacity-40"
              style={{ color: categoryColor }}
              fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 0 0-2.455 2.456Z" />
            </svg>
          </div>
        )}
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0 flex flex-col justify-between py-0.5">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h3 className="font-bold text-text-primary text-base group-hover:text-accent transition-colors leading-snug">
              {service.name}
            </h3>
            {service.requires_payment && service.payment_type !== 'manual' && (
              <span className="text-[10px] font-bold text-amber-700 bg-amber-50 border border-amber-200 px-1.5 py-0.5 rounded-md whitespace-nowrap">
                {service.payment_type === 'deposit' ? 'Sinal' : 'Pag.'} obrigatorio
              </span>
            )}
          </div>
          {service.description && (
            <p className="text-text-muted text-sm leading-relaxed line-clamp-2">
              {service.description}
            </p>
          )}
        </div>

        <div className="flex items-center justify-between mt-2">
          <div className="flex items-center gap-3">
            {service.price_type === 'on_request' ? (
              <span className="text-text-secondary text-sm font-medium">Sob consulta</span>
            ) : (
              <span className="text-accent font-bold text-sm">
                {service.price_type === 'starting_at' && (
                  <span className="text-text-muted text-xs font-normal">A partir </span>
                )}
                {formatPrice(service.price)}
              </span>
            )}
            <span className="text-text-muted text-xs flex items-center gap-1">
              <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
              </svg>
              {service.duration_minutes}min
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

export default function ServicesModal({ category, slug, onClose }: ServicesModalProps) {
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
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm animate-[fadeIn_200ms_ease-out]" />

      {/* Modal */}
      <div
        ref={contentRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        className="relative bg-white rounded-3xl shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col animate-[slideUp_300ms_ease-out]"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 sm:px-8 pt-6 sm:pt-8 pb-4">
          <div className="flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center"
              style={{ backgroundColor: `${category.color}15`, color: category.color }}
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09Z" />
              </svg>
            </div>
            <div>
              <h2 id="modal-title" className="text-lg sm:text-xl font-extrabold text-text-primary">{category.name}</h2>
              <p className="text-xs text-text-muted">
                {category.services.length} {category.services.length === 1 ? 'servico disponivel' : 'servicos disponiveis'}
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

        {/* Divider */}
        <div className="h-px bg-border mx-6 sm:mx-8" />

        {/* Services list */}
        <div className="flex-1 overflow-y-auto px-6 sm:px-8 py-5 space-y-3">
          {category.services.map(service => (
            <ServiceItem
              key={service.id}
              service={service}
              slug={slug}
              categoryColor={category.color}
            />
          ))}
        </div>

        {/* Footer hint */}
        <div className="px-6 sm:px-8 py-4 border-t border-border bg-bg-surface/50 rounded-b-3xl">
          <p className="text-xs text-text-muted text-center">
            Clique em um servico para ir para o agendamento
          </p>
        </div>
      </div>
    </div>
  );
}
