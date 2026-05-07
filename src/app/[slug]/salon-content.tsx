'use client';

import { useState } from 'react';
import { PublicCategory, PublicService } from '@/types';
import CategoryTabs from '@/components/category-tabs';
import ServiceGrid from '@/components/service-grid';

interface SalonContentProps {
  categories: PublicCategory[];
  slug: string;
}

export default function SalonContent({ categories, slug }: SalonContentProps) {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const filteredServices: PublicService[] = activeCategory
    ? categories
        .filter((c) => c.id === activeCategory)
        .flatMap((c) => c.services)
    : categories.flatMap((c) => c.services);

  return (
    <>
      {/* Section heading */}
      <div className="mb-6">
        <h2 className="text-lg font-bold text-text-primary mb-1">Nossos servicos</h2>
        <p className="text-text-muted text-sm">Escolha um servico e agende seu horario</p>
      </div>

      {/* Category filter tabs */}
      {categories.length > 1 && (
        <div className="mb-6">
          <CategoryTabs
            categories={categories}
            activeCategory={activeCategory}
            onSelect={setActiveCategory}
          />
        </div>
      )}

      {/* Service cards grid */}
      <ServiceGrid services={filteredServices} slug={slug} />
    </>
  );
}
