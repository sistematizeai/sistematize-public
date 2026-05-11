'use client';

import { PublicCategory } from '@/types';

interface CategoryCardProps {
  category: PublicCategory;
  isActive: boolean;
  onClick: () => void;
}

const CATEGORY_ICONS: Record<string, React.ReactNode> = {
  cabelo: (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09Z" />
    </svg>
  ),
};

const DEFAULT_ICON = (
  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 0 0-2.455 2.456Z" />
  </svg>
);

function getCategoryIcon(name: string) {
  const key = name.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  return CATEGORY_ICONS[key] || DEFAULT_ICON;
}

export default function CategoryCard({ category, isActive, onClick }: CategoryCardProps) {
  const count = category.services.length;

  return (
    <button
      type="button"
      onClick={onClick}
      className={`group relative bg-white rounded-2xl border-2 overflow-hidden text-left transition-all duration-300 cursor-pointer w-full ${
        isActive
          ? 'border-accent shadow-lg shadow-accent/10 ring-1 ring-accent/20'
          : 'border-border hover:border-accent/30 hover:shadow-xl hover:shadow-accent/5'
      }`}
    >
      {/* Top gradient band — fallback visual */}
      <div
        className="h-28 sm:h-32 relative overflow-hidden"
        style={{
          background: `linear-gradient(135deg, ${category.color}18, ${category.color}35, ${category.color}12)`,
        }}
      >
        <div
          className="absolute top-4 right-4 w-20 h-20 rounded-full blur-2xl opacity-40"
          style={{ backgroundColor: category.color }}
        />
        <div
          className="absolute bottom-2 left-8 w-14 h-14 rounded-full blur-xl opacity-20"
          style={{ backgroundColor: category.color }}
        />

        {/* Icon circle */}
        <div className="absolute bottom-0 left-6 translate-y-1/2 z-10">
          <div
            className="w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg border-4 border-white transition-transform duration-300 group-hover:scale-110"
            style={{ backgroundColor: category.color, color: 'white' }}
          >
            {getCategoryIcon(category.name)}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="px-6 pt-10 pb-6">
        <h3 className="font-bold text-text-primary text-lg mb-1 group-hover:text-accent transition-colors">
          {category.name}
        </h3>

        <p className="text-text-muted text-sm mb-4">
          {count} {count === 1 ? 'servico disponivel' : 'servicos disponiveis'}
        </p>

        {/* CTA */}
        <div className="flex items-center justify-between">
          <span className={`text-sm font-semibold transition-colors ${isActive ? 'text-accent' : 'text-text-secondary group-hover:text-accent'}`}>
            {isActive ? 'Selecionada' : 'Ver servicos'}
          </span>
          <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
            isActive
              ? 'bg-accent text-white'
              : 'bg-bg-surface text-text-muted group-hover:bg-accent group-hover:text-white'
          }`}>
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              {isActive ? (
                <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
              )}
            </svg>
          </div>
        </div>
      </div>
    </button>
  );
}
