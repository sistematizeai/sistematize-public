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

  const [business, setBusiness] = useState<Business | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    async function fetchBusiness() {
      try {
        const res = await fetch(`${API_URL}/api/public/${slug}`);
        if (!res.ok) {
          setNotFound(true);
          return;
        }
        const data = await res.json();
        setBusiness(data);
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
        <div className="w-8 h-8 border-3 border-accent/30 border-t-accent rounded-full animate-spin" />
      </main>
    );
  }

  if (notFound || !business) {
    return (
      <main className="flex min-h-screen items-center justify-center px-4">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-text-primary mb-2">Salao nao encontrado</h1>
          <p className="text-text-secondary text-sm">
            O salao que voce procura nao existe ou foi removido.
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen pb-16">
      <PublicHeader business={business} />

      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 mt-8">
        {/* Back link */}
        <a
          href={`/${slug}`}
          className="inline-flex items-center gap-2 text-sm text-text-secondary hover:text-accent transition-colors mb-6"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
          </svg>
          Voltar para servicos
        </a>

        {/* Section heading */}
        <div className="mb-6">
          <h2 className="text-lg font-bold text-text-primary mb-1">Agendar horario</h2>
          <p className="text-text-muted text-sm">Preencha os dados abaixo para confirmar seu agendamento</p>
        </div>

        <BookingForm slug={slug} preSelectedServiceId={preSelectedServiceId} />
      </div>
    </main>
  );
}

export default function AgendarPage() {
  return (
    <Suspense
      fallback={
        <main className="flex min-h-screen items-center justify-center">
          <div className="w-8 h-8 border-3 border-accent/30 border-t-accent rounded-full animate-spin" />
        </main>
      }
    >
      <AgendarContent />
    </Suspense>
  );
}
