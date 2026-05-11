'use client';

import { useParams, useSearchParams } from 'next/navigation';
import { useState, useEffect, Suspense } from 'react';
import { Business } from '@/types';
import PublicHeader from '@/components/public-header';
import BookingForm from '@/components/booking-form';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

function AgendarContent() {
  const params = useParams();
  const searchParams = useSearchParams();
  const slug = params.slug as string;
  const preSelectedServiceId = searchParams.get('service');
  const preSelectedComboId = searchParams.get('combo');

  const [business, setBusiness] = useState<Business | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    async function fetchBusiness() {
      try {
        const res = await fetch(`${API_URL}/api/public/${slug}`);
        if (!res.ok) { setNotFound(true); return; }
        setBusiness(await res.json());
      } catch {
        setNotFound(true);
      } finally {
        setLoading(false);
      }
    }
    fetchBusiness();
  }, [slug]);

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center">
        <div className="w-8 h-8 border-3 border-accent/20 border-t-accent rounded-full animate-spin" />
      </main>
    );
  }

  if (notFound || !business) {
    return (
      <main className="flex min-h-screen items-center justify-center px-4">
        <div className="text-center">
          <h1 className="text-2xl font-extrabold text-text-primary mb-2">Salao nao encontrado</h1>
          <p className="text-text-secondary text-sm">O salao que voce procura nao existe ou foi desativado.</p>
        </div>
      </main>
    );
  }

  if (!business.booking_enabled) {
    return (
      <div className="min-h-screen bg-bg-surface">
        <PublicHeader business={business} />
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-bg-surface flex items-center justify-center border border-border">
              <svg className="w-8 h-8 text-text-muted" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M18.364 18.364A9 9 0 0 0 5.636 5.636m12.728 12.728A9 9 0 0 1 5.636 5.636m12.728 12.728L5.636 5.636" />
              </svg>
            </div>
            <h2 className="text-xl font-bold text-text-primary mb-2">Agendamento indisponivel</h2>
            <p className="text-text-secondary text-sm mb-6">O agendamento online esta temporariamente desativado para este estabelecimento.</p>
            <a href={`/${slug}`} className="inline-flex items-center gap-2 text-sm text-accent font-semibold hover:underline">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
              </svg>
              Voltar para a pagina
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-bg-surface">
      <PublicHeader business={business} />

      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-10">
        {/* Back link */}
        <a
          href={`/${slug}`}
          className="inline-flex items-center gap-2 text-sm text-text-secondary hover:text-accent transition-colors mb-8 font-medium"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
          </svg>
          Voltar para servicos
        </a>

        {/* Page heading */}
        <div className="text-center mb-8">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-text-primary tracking-tight mb-2">
            Agendar horario
          </h2>
          <p className="text-text-secondary text-sm">Preencha os dados abaixo para confirmar seu agendamento</p>
        </div>

        <BookingForm slug={slug} preSelectedServiceId={preSelectedServiceId} preSelectedComboId={preSelectedComboId} />
      </div>
    </div>
  );
}

export default function AgendarPage() {
  return (
    <Suspense
      fallback={
        <main className="flex min-h-screen items-center justify-center">
          <div className="w-8 h-8 border-3 border-accent/20 border-t-accent rounded-full animate-spin" />
        </main>
      }
    >
      <AgendarContent />
    </Suspense>
  );
}
