'use client';

import { PublicCombo } from '@/types';

interface ComboCardProps {
  combos: PublicCombo[];
  isActive: boolean;
  onClick: () => void;
}

export default function ComboCard({ combos, isActive, onClick }: ComboCardProps) {
  const count = combos.length;

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
      <div
        className="h-28 sm:h-32 relative overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, #6C5CE718, #4A6CF735, #6C5CE712)',
        }}
      >
        <div className="absolute top-4 right-4 w-20 h-20 rounded-full blur-2xl opacity-40 bg-[#6C5CE7]" />
        <div className="absolute bottom-2 left-8 w-14 h-14 rounded-full blur-xl opacity-20 bg-[#4A6CF7]" />

        <div className="absolute bottom-0 left-6 translate-y-1/2 z-10">
          <div
            className="w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg border-4 border-white transition-transform duration-300 group-hover:scale-110"
            style={{ background: 'linear-gradient(135deg, #4A6CF7, #6C5CE7)', color: 'white' }}
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 11.25v8.25a1.5 1.5 0 0 1-1.5 1.5H5.25a1.5 1.5 0 0 1-1.5-1.5v-8.25M12 4.875A2.625 2.625 0 1 0 9.375 7.5H12m0-2.625V7.5m0-2.625A2.625 2.625 0 1 1 14.625 7.5H12m0 0V21m-8.625-9.75h18c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125h-18c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z" />
            </svg>
          </div>
        </div>
      </div>

      <div className="px-6 pt-10 pb-6">
        <h3 className="font-bold text-text-primary text-lg mb-1 group-hover:text-accent transition-colors">
          Combos
        </h3>

        <p className="text-text-muted text-sm mb-4">
          {count} {count === 1 ? 'combo disponivel' : 'combos disponiveis'}
        </p>

        <div className="flex items-center justify-between">
          <span className={`text-sm font-semibold transition-colors ${isActive ? 'text-accent' : 'text-text-secondary group-hover:text-accent'}`}>
            {isActive ? 'Selecionada' : 'Ver combos'}
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
