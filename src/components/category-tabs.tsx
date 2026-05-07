'use client';

import { PublicCategory } from '@/types';

interface CategoryTabsProps {
  categories: PublicCategory[];
  activeCategory: string | null;
  onSelect: (categoryId: string | null) => void;
}

export default function CategoryTabs({ categories, activeCategory, onSelect }: CategoryTabsProps) {
  return (
    <div className="w-full overflow-x-auto scrollbar-hide">
      <div className="flex gap-2 px-4 sm:px-0 pb-1 min-w-max">
        {/* "Todos" tab */}
        <button
          onClick={() => onSelect(null)}
          className={`
            px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all
            ${activeCategory === null
              ? 'bg-accent text-white shadow-sm'
              : 'bg-white text-text-secondary hover:bg-bg-surface border border-border'
            }
          `}
        >
          Todos
        </button>

        {/* Category tabs */}
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => onSelect(category.id)}
            className={`
              flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all
              ${activeCategory === category.id
                ? 'bg-accent text-white shadow-sm'
                : 'bg-white text-text-secondary hover:bg-bg-surface border border-border'
              }
            `}
          >
            <span
              className="w-2.5 h-2.5 rounded-full flex-shrink-0"
              style={{ backgroundColor: category.color }}
            />
            {category.name}
          </button>
        ))}
      </div>
    </div>
  );
}
