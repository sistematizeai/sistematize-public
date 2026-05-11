'use client';

import { useState } from 'react';
import { PublicCategory, PublicCombo } from '@/types';
import CategoryCard from '@/components/category-card';
import ServicesModal from '@/components/services-modal';
import ComboCard from '@/components/combo-card';
import CombosModal from '@/components/combos-modal';

interface SalonContentProps {
  categories: PublicCategory[];
  combos: PublicCombo[];
  slug: string;
}

export default function SalonContent({ categories, combos, slug }: SalonContentProps) {
  const [openCategory, setOpenCategory] = useState<PublicCategory | null>(null);
  const [showCombos, setShowCombos] = useState(false);

  const hasContent = categories.length > 0 || combos.length > 0;

  return (
    <>
      <section id="servicos" className="py-16 sm:py-20 bg-white">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-text-primary tracking-tight mb-3">
              Escolha uma categoria
            </h2>
            <p className="text-text-secondary text-sm sm:text-base max-w-xl mx-auto">
              Selecione a area desejada para ver os servicos disponiveis e agendar seu horario.
            </p>
          </div>

          {!hasContent ? (
            <div className="text-center py-16">
              <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-bg-surface flex items-center justify-center">
                <svg className="w-7 h-7 text-text-muted" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09Z" />
                </svg>
              </div>
              <p className="text-text-muted text-sm">Nenhum servico disponivel no momento.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {categories.map(category => (
                <CategoryCard
                  key={category.id}
                  category={category}
                  isActive={openCategory?.id === category.id}
                  onClick={() => setOpenCategory(category)}
                />
              ))}
              {combos.length > 0 && (
                <ComboCard
                  combos={combos}
                  isActive={showCombos}
                  onClick={() => setShowCombos(true)}
                />
              )}
            </div>
          )}
        </div>
      </section>

      {openCategory && (
        <ServicesModal
          category={openCategory}
          slug={slug}
          onClose={() => setOpenCategory(null)}
        />
      )}

      {showCombos && (
        <CombosModal
          combos={combos}
          slug={slug}
          onClose={() => setShowCombos(false)}
        />
      )}
    </>
  );
}
