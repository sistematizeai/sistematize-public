import Link from 'next/link';
import { PublicService } from '@/types';

interface ServiceCardProps {
  service: PublicService;
  slug: string;
}

function formatPrice(price: number): string {
  return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(price);
}

export default function ServiceCard({ service, slug }: ServiceCardProps) {
  const priceDisplay = () => {
    if (service.price_type === 'on_request') {
      return <span className="text-text-secondary text-sm font-medium">Sob consulta</span>;
    }
    if (service.price_type === 'starting_at') {
      return (
        <span className="text-accent font-bold">
          <span className="text-text-muted text-xs font-normal">A partir de </span>
          {formatPrice(service.price)}
        </span>
      );
    }
    return <span className="text-accent font-bold">{formatPrice(service.price)}</span>;
  };

  return (
    <div className="bg-white rounded-2xl border border-border p-5 hover:shadow-lg hover:shadow-accent/5 transition-all duration-200 flex flex-col h-full group">
      {/* Service info */}
      <div className="flex-1 mb-4">
        <h3 className="font-bold text-text-primary text-base mb-1 group-hover:text-accent transition-colors">
          {service.name}
        </h3>

        {service.description && (
          <p className="text-text-muted text-sm leading-relaxed line-clamp-2 mb-3">
            {service.description}
          </p>
        )}

        {/* Duration */}
        <div className="flex items-center gap-1.5 text-text-secondary text-xs">
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
          </svg>
          {service.duration_minutes} min
        </div>
      </div>

      {/* Price + CTA */}
      <div className="flex items-center justify-between pt-4 border-t border-border">
        <div>{priceDisplay()}</div>

        <Link
          href={`/${slug}/agendar?service=${service.id}`}
          className="inline-flex items-center gap-1.5 px-4 py-2 bg-accent text-white text-sm font-semibold rounded-xl hover:bg-accent/90 transition-colors"
        >
          Agendar
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
          </svg>
        </Link>
      </div>
    </div>
  );
}
