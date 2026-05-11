import { Business, PublicCategory, PublicCombo } from '@/types';
import PublicHeader from '@/components/public-header';
import HeroSection from '@/components/hero-section';
import HowItWorks from '@/components/how-it-works';
import PublicFooter from '@/components/public-footer';
import SalonContent from './salon-content';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

interface Props {
  params: Promise<{ slug: string }>;
}

async function getBusiness(slug: string): Promise<Business | null> {
  try {
    const res = await fetch(`${API_URL}/api/public/${slug}`, {
      next: { revalidate: 60 },
    });
    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}

async function getServices(slug: string): Promise<PublicCategory[]> {
  try {
    const res = await fetch(`${API_URL}/api/public/${slug}/services`, {
      next: { revalidate: 60 },
    });
    if (!res.ok) return [];
    return res.json();
  } catch {
    return [];
  }
}

async function getCombos(slug: string): Promise<PublicCombo[]> {
  try {
    const res = await fetch(`${API_URL}/api/public/${slug}/combos`, {
      next: { revalidate: 60 },
    });
    if (!res.ok) return [];
    return res.json();
  } catch {
    return [];
  }
}

export default async function SalonPage({ params }: Props) {
  const { slug } = await params;

  const [business, categories, combos] = await Promise.all([
    getBusiness(slug),
    getServices(slug),
    getCombos(slug),
  ]);

  if (!business) {
    return (
      <main className="flex min-h-screen items-center justify-center px-4">
        <div className="text-center">
          <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-bg-surface flex items-center justify-center">
            <svg className="w-8 h-8 text-text-muted" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
            </svg>
          </div>
          <h1 className="text-2xl font-extrabold text-text-primary mb-2">Salao nao encontrado</h1>
          <p className="text-text-secondary text-sm">
            O salao que voce procura nao existe ou foi desativado.
          </p>
        </div>
      </main>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <PublicHeader business={business} />
      <HeroSection business={business} />

      {business.booking_enabled ? (
        <>
          <SalonContent categories={categories} combos={combos} slug={slug} />
          <HowItWorks />
        </>
      ) : (
        <section className="py-16 sm:py-20">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 text-center">
            <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-bg-surface flex items-center justify-center">
              <svg className="w-7 h-7 text-text-muted" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
              </svg>
            </div>
            <h2 className="text-xl font-extrabold text-text-primary mb-2">Agendamento indisponivel</h2>
            <p className="text-text-secondary text-sm max-w-md mx-auto">
              O agendamento online esta temporariamente desativado. Entre em contato diretamente com o estabelecimento.
            </p>
          </div>
        </section>
      )}

      <div className="flex-1" />
      <PublicFooter business={business} />
    </div>
  );
}
