export type HeroLayout = 'split' | 'fullcover' | 'minimal';

export interface Business {
  id: string;
  name: string;
  slug: string;
  logo_url: string | null;
  cover_image_url: string | null;
  phone: string | null;
  whatsapp: string | null;
  address: string | null;
  city: string | null;
  state: string | null;
  business_hours: Record<string, { open: string; close: string; enabled?: boolean }>;
  description: string | null;
  welcome_message: string | null;
  instagram: string | null;
  facebook: string | null;
  tiktok: string | null;
  primary_color: string;
  booking_enabled: boolean;
  hero_layout: HeroLayout;
  show_hero_badges: boolean;
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
  image_url: string | null;
}

export interface PublicComboService {
  id: string;
  name: string;
  price: number;
  duration_minutes: number;
}

export interface PublicCombo {
  id: string;
  name: string;
  description: string | null;
  price: number;
  original_price: number;
  discount_percent: number;
  image_url: string | null;
  duration_minutes: number;
  services: PublicComboService[];
}
