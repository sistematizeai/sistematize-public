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
