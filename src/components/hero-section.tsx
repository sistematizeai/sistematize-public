import Image from 'next/image';
import { Business } from '@/types';

interface HeroSectionProps {
  business: Business;
}

function CTAButtons({ business }: { business: Business }) {
  const whatsappNumber = business.whatsapp?.replace(/\D/g, '') || business.phone?.replace(/\D/g, '');
  return (
    <div className="flex flex-wrap gap-3">
      <a
        href="#servicos"
        className="inline-flex items-center gap-2 px-7 py-3.5 bg-gradient-to-r from-[#4A6CF7] to-[#6C5CE7] text-white font-semibold text-sm rounded-full hover:opacity-90 transition-opacity shadow-lg shadow-accent/25"
      >
        Agendar agora
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
        </svg>
      </a>
      {whatsappNumber && (
        <a
          href={`https://wa.me/${whatsappNumber?.startsWith('55') ? whatsappNumber : `55${whatsappNumber}`}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-7 py-3.5 bg-white text-text-primary font-semibold text-sm rounded-full border border-border hover:bg-bg-surface transition-colors"
        >
          <svg className="w-4 h-4 text-green" fill="currentColor" viewBox="0 0 24 24">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" />
          </svg>
          WhatsApp
        </a>
      )}
    </div>
  );
}

function HeroBadges() {
  return (
    <div className="flex flex-wrap gap-7">
      <div className="flex items-center gap-2.5">
        <div className="w-9 h-9 rounded-full bg-accent/8 flex items-center justify-center">
          <svg className="w-[18px] h-[18px] text-accent" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
          </svg>
        </div>
        <div>
          <p className="text-xs font-bold text-text-primary leading-tight">Agendamento online</p>
          <p className="text-[11px] text-text-muted">24h por dia</p>
        </div>
      </div>

      <div className="flex items-center gap-2.5">
        <div className="w-9 h-9 rounded-full bg-accent/8 flex items-center justify-center">
          <svg className="w-[18px] h-[18px] text-accent" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
          </svg>
        </div>
        <div>
          <p className="text-xs font-bold text-text-primary leading-tight">Confirmacao</p>
          <p className="text-[11px] text-text-muted">automatica</p>
        </div>
      </div>

      <div className="flex items-center gap-2.5">
        <div className="w-9 h-9 rounded-full bg-accent/8 flex items-center justify-center">
          <svg className="w-[18px] h-[18px] text-accent" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0" />
          </svg>
        </div>
        <div>
          <p className="text-xs font-bold text-text-primary leading-tight">Lembretes</p>
          <p className="text-[11px] text-text-muted">inteligentes</p>
        </div>
      </div>
    </div>
  );
}

function HeroTitle({ business }: { business: Business }) {
  if (business.welcome_message) return <span>{business.welcome_message}</span>;
  return (
    <>
      <em className="not-italic font-extrabold italic">Sua beleza,</em>
      <br />
      <em className="not-italic font-extrabold italic">sua hora.</em>
    </>
  );
}

function HeroDescription({ business }: { business: Business }) {
  return (
    <p className="text-base leading-relaxed max-w-md">
      {business.description || `Agende seu procedimento no ${business.name} com praticidade e seguranca.`}
    </p>
  );
}

function DecorativePlaceholder({ business }: { business: Business }) {
  return (
    <div className="absolute inset-0 -right-[calc((100vw-72rem)/2+1rem)] bg-gradient-to-br from-[#e8eafc] via-[#ede8fc] to-[#ddd6fe]">
      <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-white to-transparent" />
      <div className="absolute top-16 right-24 w-56 h-56 rounded-full bg-white/20 blur-2xl" />
      <div className="absolute bottom-20 right-48 w-40 h-40 rounded-full bg-[#4A6CF7]/10 blur-xl" />
      <div className="absolute top-1/2 right-16 -translate-y-1/2 w-32 h-32 rounded-3xl bg-white/30 rotate-12 blur-sm" />

      <div className="absolute top-20 left-12 bg-white rounded-2xl px-5 py-3.5 shadow-xl shadow-black/5 border border-white/60">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-green/10 flex items-center justify-center">
            <svg className="w-4 h-4 text-green" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
            </svg>
          </div>
          <div>
            <p className="text-xs font-bold text-text-primary">Agendado!</p>
            <p className="text-[10px] text-text-muted">Confirmado automaticamente</p>
          </div>
        </div>
      </div>

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className="w-24 h-24 rounded-3xl bg-white shadow-2xl shadow-accent/15 flex items-center justify-center border border-white/80">
          {business.logo_url ? (
            <Image src={business.logo_url} alt="" width={64} height={64} className="w-16 h-16 rounded-2xl object-cover" />
          ) : (
            <span className="text-4xl font-extrabold bg-gradient-to-br from-[#4A6CF7] to-[#6C5CE7] bg-clip-text text-transparent">
              {business.name.charAt(0)}
            </span>
          )}
        </div>
      </div>

      <div className="absolute bottom-24 left-16 bg-white rounded-2xl px-5 py-3.5 shadow-xl shadow-black/5 border border-white/60">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-accent/10 flex items-center justify-center">
            <svg className="w-4 h-4 text-accent" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" />
            </svg>
          </div>
          <div>
            <p className="text-xs font-bold text-text-primary">Hoje, 14:30</p>
            <p className="text-[10px] text-text-muted">Proximo horario</p>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ═══ SPLIT LAYOUT ═══ */
function SplitHero({ business }: HeroSectionProps) {
  const hasCover = !!business.cover_image_url;
  return (
    <section className="relative bg-white overflow-hidden">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 items-center min-h-[520px] sm:min-h-[580px]">
          <div className="py-16 sm:py-20 lg:py-24 relative z-10">
            <h1 className="text-4xl sm:text-[2.75rem] lg:text-5xl font-extrabold text-text-primary tracking-tight leading-[1.15] mb-5">
              <HeroTitle business={business} />
            </h1>
            <div className="text-text-secondary mb-8">
              <HeroDescription business={business} />
            </div>
            <div className="mb-10">
              <CTAButtons business={business} />
            </div>
            {business.show_hero_badges && <HeroBadges />}
          </div>

          <div className="hidden lg:block relative self-stretch">
            {hasCover ? (
              <div className="absolute inset-0 -right-[calc((100vw-72rem)/2+1rem)]">
                <Image
                  src={business.cover_image_url!}
                  alt={business.name}
                  fill
                  sizes="50vw"
                  className="object-cover object-center"
                />
                <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-white to-transparent" />
              </div>
            ) : (
              <DecorativePlaceholder business={business} />
            )}
          </div>
        </div>
      </div>
      <div className="h-px bg-border" />
    </section>
  );
}

/* ═══ FULLCOVER LAYOUT ═══ */
function FullcoverHero({ business }: HeroSectionProps) {
  const hasCover = !!business.cover_image_url;
  return (
    <section className="relative overflow-hidden">
      {hasCover ? (
        <div className="absolute inset-0">
          <Image
            src={business.cover_image_url!}
            alt={business.name}
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/30" />
        </div>
      ) : (
        <div className="absolute inset-0 bg-gradient-to-br from-[#1e1b4b] via-[#312e81] to-[#4338ca]">
          <div className="absolute top-16 right-24 w-72 h-72 rounded-full bg-white/5 blur-3xl" />
          <div className="absolute bottom-20 left-32 w-56 h-56 rounded-full bg-accent/10 blur-2xl" />
        </div>
      )}

      <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="py-20 sm:py-28 lg:py-32 min-h-[520px] sm:min-h-[580px] flex flex-col justify-center">
          <h1 className="text-4xl sm:text-[2.75rem] lg:text-5xl xl:text-6xl font-extrabold text-white tracking-tight leading-[1.15] mb-5 max-w-2xl">
            <HeroTitle business={business} />
          </h1>
          <div className="text-white/80 mb-8">
            <HeroDescription business={business} />
          </div>
          <div className="mb-10">
            <div className="flex flex-wrap gap-3">
              <a
                href="#servicos"
                className="inline-flex items-center gap-2 px-7 py-3.5 bg-white text-text-primary font-semibold text-sm rounded-full hover:bg-white/90 transition-opacity shadow-lg"
              >
                Agendar agora
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                </svg>
              </a>
              {(business.whatsapp || business.phone) && (
                <a
                  href={`https://wa.me/${(() => { const n = (business.whatsapp || business.phone)?.replace(/\D/g, '') || ''; return n.startsWith('55') ? n : `55${n}`; })()}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-7 py-3.5 bg-white/10 backdrop-blur-sm text-white font-semibold text-sm rounded-full border border-white/20 hover:bg-white/20 transition-colors"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" />
                  </svg>
                  WhatsApp
                </a>
              )}
            </div>
          </div>
          {business.show_hero_badges && (
            <div className="flex flex-wrap gap-7">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center">
                  <svg className="w-[18px] h-[18px] text-white/80" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                  </svg>
                </div>
                <div>
                  <p className="text-xs font-bold text-white leading-tight">Agendamento online</p>
                  <p className="text-[11px] text-white/60">24h por dia</p>
                </div>
              </div>
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center">
                  <svg className="w-[18px] h-[18px] text-white/80" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                  </svg>
                </div>
                <div>
                  <p className="text-xs font-bold text-white leading-tight">Confirmacao</p>
                  <p className="text-[11px] text-white/60">automatica</p>
                </div>
              </div>
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center">
                  <svg className="w-[18px] h-[18px] text-white/80" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0" />
                  </svg>
                </div>
                <div>
                  <p className="text-xs font-bold text-white leading-tight">Lembretes</p>
                  <p className="text-[11px] text-white/60">inteligentes</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="h-px bg-white/10" />
    </section>
  );
}

/* ═══ MINIMAL LAYOUT ═══ */
function MinimalHero({ business }: HeroSectionProps) {
  return (
    <section className="relative bg-gradient-to-br from-[#f8f8fc] via-white to-[#eef0ff] overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] rounded-full bg-accent/[0.03] blur-3xl" />
      <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full bg-[#6C5CE7]/[0.04] blur-3xl" />

      <div className="relative z-10 mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <div className="py-20 sm:py-28 lg:py-32 min-h-[480px] sm:min-h-[520px] flex flex-col items-center justify-center text-center">
          {business.logo_url && (
            <Image src={business.logo_url} alt={business.name} width={64} height={64} className="w-16 h-16 rounded-2xl object-cover mb-8 shadow-lg shadow-accent/10" />
          )}
          <h1 className="text-4xl sm:text-[2.75rem] lg:text-5xl xl:text-6xl font-extrabold text-text-primary tracking-tight leading-[1.15] mb-5">
            <HeroTitle business={business} />
          </h1>
          <div className="text-text-secondary mb-8 mx-auto">
            <HeroDescription business={business} />
          </div>
          <div className="mb-10">
            <CTAButtons business={business} />
          </div>
          {business.show_hero_badges && <HeroBadges />}
        </div>
      </div>
      <div className="h-px bg-border" />
    </section>
  );
}

export default function HeroSection({ business }: HeroSectionProps) {
  const layout = business.hero_layout || 'split';

  if (layout === 'fullcover') return <FullcoverHero business={business} />;
  if (layout === 'minimal') return <MinimalHero business={business} />;
  return <SplitHero business={business} />;
}
