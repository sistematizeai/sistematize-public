import { PublicService } from '@/types';
import ServiceCard from './service-card';

interface ServiceGridProps {
  services: PublicService[];
  slug: string;
}

export default function ServiceGrid({ services, slug }: ServiceGridProps) {
  if (services.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-text-muted text-sm">Nenhum servico encontrado nesta categoria.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {services.map((service) => (
        <ServiceCard key={service.id} service={service} slug={slug} />
      ))}
    </div>
  );
}
