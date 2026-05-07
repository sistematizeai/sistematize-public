import { Business, PublicCategory } from '@/types';
import PublicHeader from '@/components/public-header';
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

export default async function SalonPage({ params }: Props) {
  const { slug } = await params;

  const [business, categories] = await Promise.all([
    getBusiness(slug),
    getServices(slug),
  ]);

  if (!business) {
    return (
      <main className="flex min-h-screen items-center justify-center px-4">
        <div className="text-center">
          <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-bg-surface flex items-center justify-center">
            <svg className="w-8 h-8 text-text-muted" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
            </svg>
          </div>
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
        <SalonContent categories={categories} slug={slug} />
      </div>
    </main>
  );
}
