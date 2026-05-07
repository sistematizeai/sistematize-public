export interface Business {
  id: string;
  name: string;
  slug: string;
  logo_url: string | null;
  phone: string | null;
  whatsapp: string | null;
  address: string | null;
  city: string | null;
  state: string | null;
  business_hours: Record<string, unknown>;
}

export interface PublicCategory {
  id: string;
  name: string;
  color: string;
  services: PublicService[];
}

export interface PublicService {
  id: string;
  name: string;
  description: string | null;
  price: number;
  price_type: string;
  duration_minutes: number;
}
