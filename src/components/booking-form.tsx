'use client';

import { useState, useEffect, FormEvent, ChangeEvent } from 'react';
import { PublicCategory, PublicService, PublicCombo } from '@/types';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

interface BookingFormProps {
  slug: string;
  preSelectedServiceId?: string | null;
  preSelectedComboId?: string | null;
}

function formatPhone(value: string): string {
  const digits = value.replace(/\D/g, '').slice(0, 11);
  if (digits.length <= 2) return digits;
  if (digits.length <= 7) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
  return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
}

function formatPrice(price: number): string {
  return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(price);
}

function getTodayString(): string {
  const now = new Date();
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
}

function StepIndicator({ current }: { current: number }) {
  const steps = ['Servico', 'Data e horario', 'Seus dados'];
  return (
    <div className="flex items-center justify-center gap-2 mb-8">
      {steps.map((label, i) => {
        const stepNum = i + 1;
        const isActive = stepNum === current;
        const isDone = stepNum < current;
        return (
          <div key={label} className="flex items-center gap-2">
            {i > 0 && <div className={`w-8 sm:w-12 h-px ${isDone ? 'bg-accent' : 'bg-border'}`} />}
            <div className="flex items-center gap-2">
              <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${
                isActive ? 'bg-accent text-white' :
                isDone ? 'bg-accent/10 text-accent' :
                'bg-bg-surface text-text-muted'
              }`}>
                {isDone ? (
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                  </svg>
                ) : stepNum}
              </div>
              <span className={`text-xs font-semibold hidden sm:block ${isActive ? 'text-text-primary' : 'text-text-muted'}`}>
                {label}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default function BookingForm({ slug, preSelectedServiceId, preSelectedComboId }: BookingFormProps) {
  const [categories, setCategories] = useState<PublicCategory[]>([]);
  const [combos, setCombos] = useState<PublicCombo[]>([]);
  const [selectedServiceId, setSelectedServiceId] = useState<string | null>(preSelectedServiceId || null);
  const [selectedComboId, setSelectedComboId] = useState<string | null>(preSelectedComboId || null);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [notes, setNotes] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [paymentInfo, setPaymentInfo] = useState<{
    invoice_url?: string;
    pix_payload?: string;
    pix_qr_code?: string;
    status?: string;
    value?: number;
  } | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const [svcRes, comboRes] = await Promise.all([
          fetch(`${API_URL}/api/public/${slug}/services`),
          fetch(`${API_URL}/api/public/${slug}/combos`),
        ]);
        if (svcRes.ok) setCategories(await svcRes.json());
        if (comboRes.ok) setCombos(await comboRes.json());
      } catch {
        // silently fail
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [slug]);

  useEffect(() => {
    if (preSelectedServiceId && categories.length > 0) {
      const allServices = categories.flatMap(c => c.services);
      if (!allServices.some(s => s.id === preSelectedServiceId)) {
        setSelectedServiceId(null);
      }
    }
  }, [categories, preSelectedServiceId]);

  useEffect(() => {
    if (preSelectedComboId && combos.length > 0) {
      if (!combos.some(c => c.id === preSelectedComboId)) {
        setSelectedComboId(null);
      }
    }
  }, [combos, preSelectedComboId]);

  const selectedService: PublicService | null = selectedComboId ? null : categories
    .flatMap((c) => c.services)
    .find((s) => s.id === selectedServiceId) || null;

  const selectedCombo: PublicCombo | null = combos.find(c => c.id === selectedComboId) || null;

  const hasSelection = !!selectedServiceId || !!selectedComboId;
  const currentStep = !hasSelection ? 1 : (!date || !time) ? 2 : 3;

  function handlePhoneChange(e: ChangeEvent<HTMLInputElement>) {
    setPhone(formatPhone(e.target.value));
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);

    const phoneDigits = phone.replace(/\D/g, '');
    if (!name.trim() || !phone.trim() || !date || !time || (!selectedServiceId && !selectedComboId)) {
      setError('Por favor, preencha todos os campos obrigatorios e selecione um servico ou combo.');
      return;
    }
    if (phoneDigits.length < 10) {
      setError('Informe um numero de telefone valido com DDD (minimo 10 digitos).');
      return;
    }

    setSubmitting(true);
    try {
      const body: Record<string, unknown> = {
        client_name: name.trim(),
        client_phone: phone.replace(/\D/g, ''),
        client_email: email.trim() || undefined,
        date,
        start_time: time,
        notes: notes.trim() || undefined,
      };
      if (selectedComboId) {
        body.combo_id = selectedComboId;
      } else {
        body.service_id = selectedServiceId;
      }

      const res = await fetch(`${API_URL}/api/public/${slug}/appointments`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      if (!res.ok) {
        const errData = await res.json().catch(() => null);
        throw new Error(errData?.message || 'Erro ao criar agendamento. Tente novamente.');
      }

      const resData = await res.json().catch(() => null);
      if (resData?.payment) {
        setPaymentInfo(resData.payment);
      }

      setSuccess(true);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Erro ao criar agendamento. Tente novamente.');
    } finally {
      setSubmitting(false);
    }
  }

  if (success) {
    return (
      <div className="flex flex-col items-center justify-center py-16 px-4">
        <div className="bg-white rounded-2xl p-10 shadow-sm border border-border text-center max-w-md w-full">
          <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-green-soft flex items-center justify-center">
            <svg className="w-10 h-10 text-green" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
            </svg>
          </div>

          <h2 className="text-2xl font-extrabold text-text-primary mb-2">
            {paymentInfo ? 'Agendamento aguardando pagamento' : 'Agendamento realizado!'}
          </h2>
          <p className="text-text-secondary text-sm mb-6">
            {paymentInfo
              ? 'Seu agendamento sera confirmado automaticamente apos o pagamento.'
              : 'Seu agendamento foi registrado com sucesso. O estabelecimento entrara em contato para confirmar.'}
          </p>

          {(selectedService || selectedCombo) && (
            <div className="bg-bg-surface rounded-xl p-4 mb-6 text-left">
              <p className="text-sm font-semibold text-text-primary">
                {selectedCombo ? selectedCombo.name : selectedService!.name}
                {selectedCombo && <span className="ml-2 text-[10px] font-bold text-accent bg-accent/10 px-1.5 py-0.5 rounded-md">COMBO</span>}
              </p>
              <p className="text-xs text-text-muted mt-1">
                {new Date(date + 'T12:00:00').toLocaleDateString('pt-BR', { weekday: 'long', day: 'numeric', month: 'long' })} as {time}
              </p>
              <p className="text-sm font-bold text-accent mt-2">
                {selectedCombo ? formatPrice(selectedCombo.price) :
                  selectedService!.price_type !== 'on_request' ? formatPrice(selectedService!.price) : 'Sob consulta'
                }
              </p>
            </div>
          )}

          {paymentInfo?.invoice_url && (
            <div className="mb-6 space-y-3">
              <a
                href={paymentInfo.invoice_url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-[#00C853] to-[#00E676] text-white font-semibold text-sm rounded-xl hover:opacity-90 transition-opacity"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                  <rect x="1" y="4" width="22" height="16" rx="2" ry="2" />
                  <line x1="1" y1="10" x2="23" y2="10" />
                </svg>
                Pagar agora
              </a>
              {paymentInfo.pix_payload && (
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(paymentInfo.pix_payload!);
                  }}
                  className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 border border-border text-text-primary font-semibold text-sm rounded-xl hover:bg-bg-surface transition-colors cursor-pointer"
                >
                  Copiar codigo Pix
                </button>
              )}
            </div>
          )}

          <a
            href={`/${slug}`}
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#4A6CF7] to-[#6C5CE7] text-white font-semibold text-sm rounded-xl hover:opacity-90 transition-opacity"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
            </svg>
            Voltar para a pagina
          </a>
        </div>
      </div>
    );
  }

  const inputClass = 'w-full px-4 py-3 rounded-xl border border-border bg-white text-text-primary placeholder:text-text-muted text-sm focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent transition-colors';
  const labelClass = 'block text-sm font-medium text-text-primary mb-1.5';
  const sectionTitle = 'text-sm font-semibold text-text-secondary uppercase tracking-wider mb-4';

  return (
    <form onSubmit={handleSubmit} className="max-w-3xl mx-auto">
      <StepIndicator current={currentStep} />

      <div className="bg-white rounded-2xl border border-border p-6 sm:p-8 shadow-sm">
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm flex items-start gap-2">
            <svg className="w-4 h-4 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
            </svg>
            {error}
          </div>
        )}

        {/* ─── 1. SERVICE SELECTION ─── */}
        <div className="mb-8">
          <h3 className={sectionTitle}>
            1. Servico ou Combo <span className="text-red-400">*</span>
          </h3>

          {/* Pre-selected service highlight */}
          {selectedService && (
            <div className="p-4 rounded-xl bg-accent-soft border border-accent/15 mb-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center">
                    <svg className="w-5 h-5 text-accent" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-bold text-text-primary">{selectedService.name}</p>
                    <div className="flex items-center gap-3 mt-0.5">
                      <span className="text-xs text-text-muted flex items-center gap-1">
                        <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                        </svg>
                        {selectedService.duration_minutes} min
                      </span>
                      <span className="text-xs font-semibold text-accent">
                        {selectedService.price_type === 'on_request' ? 'Sob consulta' :
                          selectedService.price_type === 'starting_at' ? `A partir ${formatPrice(selectedService.price)}` :
                          formatPrice(selectedService.price)
                        }
                      </span>
                    </div>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedServiceId(null)}
                  className="text-xs text-text-muted hover:text-accent transition-colors font-medium cursor-pointer"
                >
                  Trocar
                </button>
              </div>
            </div>
          )}

          {/* Pre-selected combo highlight */}
          {selectedCombo && (
            <div className="p-4 rounded-xl bg-accent-soft border border-accent/15 mb-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center">
                    <svg className="w-5 h-5 text-accent" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21 11.25v8.25a1.5 1.5 0 0 1-1.5 1.5H5.25a1.5 1.5 0 0 1-1.5-1.5v-8.25M12 4.875A2.625 2.625 0 1 0 9.375 7.5H12m0-2.625V7.5m0-2.625A2.625 2.625 0 1 1 14.625 7.5H12m0 0V21m-8.625-9.75h18c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125h-18c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z" />
                    </svg>
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-bold text-text-primary">{selectedCombo.name}</p>
                      <span className="inline-flex items-center px-1.5 py-0.5 rounded-md text-[10px] font-bold bg-accent/10 text-accent">COMBO</span>
                    </div>
                    <div className="flex items-center gap-3 mt-0.5">
                      <span className="text-xs text-text-muted flex items-center gap-1">
                        <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                        </svg>
                        {selectedCombo.duration_minutes} min
                      </span>
                      <span className="text-xs text-text-muted">{selectedCombo.services.length} servicos</span>
                      <span className="text-xs font-semibold text-accent">{formatPrice(selectedCombo.price)}</span>
                    </div>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedComboId(null)}
                  className="text-xs text-text-muted hover:text-accent transition-colors font-medium cursor-pointer"
                >
                  Trocar
                </button>
              </div>
            </div>
          )}

          {/* Service & combo list (collapsed if something is pre-selected) */}
          {!selectedService && !selectedCombo && (
            loading ? (
              <div className="flex items-center justify-center py-8">
                <div className="w-6 h-6 border-2 border-accent/30 border-t-accent rounded-full animate-spin" />
              </div>
            ) : categories.length === 0 && combos.length === 0 ? (
              <p className="text-text-muted text-sm py-4">Nenhum servico disponivel.</p>
            ) : (
              <div className="space-y-5">
                {categories.map((category) => (
                  <div key={category.id}>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ backgroundColor: category.color }} />
                      <span className="text-xs font-semibold text-text-secondary uppercase tracking-wider">{category.name}</span>
                    </div>
                    <div className="space-y-1.5">
                      {category.services.map((service) => (
                        <label
                          key={service.id}
                          className="flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-all border bg-bg-surface/50 border-transparent hover:bg-bg-surface"
                        >
                          <input
                            type="radio"
                            name="service"
                            checked={selectedServiceId === service.id}
                            onChange={() => { setSelectedServiceId(service.id); setSelectedComboId(null); }}
                            className="w-4 h-4 text-accent focus:ring-accent/20 accent-accent"
                          />
                          <div className="flex-1 min-w-0">
                            <span className="text-sm font-medium text-text-primary">{service.name}</span>
                            <span className="text-xs text-text-muted ml-2">({service.duration_minutes} min)</span>
                          </div>
                          <span className="text-sm font-semibold text-accent flex-shrink-0">
                            {service.price_type === 'on_request' ? 'Sob consulta' :
                              service.price_type === 'starting_at' ? `A partir ${formatPrice(service.price)}` :
                              formatPrice(service.price)
                            }
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>
                ))}

                {combos.length > 0 && (
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="w-2.5 h-2.5 rounded-full flex-shrink-0 bg-gradient-to-r from-[#4A6CF7] to-[#6C5CE7]" />
                      <span className="text-xs font-semibold text-text-secondary uppercase tracking-wider">Combos</span>
                    </div>
                    <div className="space-y-1.5">
                      {combos.map((combo) => {
                        const hasDiscount = combo.original_price > 0 && combo.price < combo.original_price;
                        return (
                          <label
                            key={combo.id}
                            className="flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-all border bg-bg-surface/50 border-transparent hover:bg-bg-surface"
                          >
                            <input
                              type="radio"
                              name="service"
                              checked={selectedComboId === combo.id}
                              onChange={() => { setSelectedComboId(combo.id); setSelectedServiceId(null); }}
                              className="w-4 h-4 text-accent focus:ring-accent/20 accent-accent"
                            />
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2">
                                <span className="text-sm font-medium text-text-primary">{combo.name}</span>
                                {hasDiscount && (
                                  <span className="inline-flex items-center px-1.5 py-0.5 rounded-full text-[10px] font-bold bg-green-100 text-green-700">
                                    -{Math.round((1 - combo.price / combo.original_price) * 100)}%
                                  </span>
                                )}
                              </div>
                              <span className="text-xs text-text-muted">{combo.services.length} servicos - {combo.duration_minutes} min</span>
                            </div>
                            <div className="flex flex-col items-end flex-shrink-0">
                              {hasDiscount && (
                                <span className="text-xs text-text-muted line-through">{formatPrice(combo.original_price)}</span>
                              )}
                              <span className="text-sm font-semibold text-accent">{formatPrice(combo.price)}</span>
                            </div>
                          </label>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            )
          )}
        </div>

        {/* ─── 2. DATE & TIME ─── */}
        <div className="mb-8">
          <h3 className={sectionTitle}>
            2. Data e horario <span className="text-red-400">*</span>
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="date" className={labelClass}>Data</label>
              <input type="date" id="date" value={date} onChange={(e) => setDate(e.target.value)}
                min={getTodayString()} required className={inputClass} />
            </div>
            <div>
              <label htmlFor="time" className={labelClass}>Horario</label>
              <input type="time" id="time" value={time} onChange={(e) => setTime(e.target.value)}
                required className={inputClass} />
            </div>
          </div>
        </div>

        {/* ─── 3. PERSONAL INFO ─── */}
        <div className="mb-8">
          <h3 className={sectionTitle}>
            3. Seus dados <span className="text-red-400">*</span>
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="name" className={labelClass}>Nome</label>
              <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)}
                placeholder="Seu nome completo" required className={inputClass} />
            </div>
            <div>
              <label htmlFor="phone" className={labelClass}>Telefone</label>
              <input type="tel" id="phone" value={phone} onChange={handlePhoneChange}
                placeholder="(11) 99999-9999" required className={inputClass} />
            </div>
            <div className="sm:col-span-2">
              <label htmlFor="email" className={labelClass}>Email <span className="text-text-muted font-normal">(opcional)</span></label>
              <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)}
                placeholder="seu@email.com" className={inputClass} />
            </div>
          </div>
        </div>

        {/* ─── NOTES ─── */}
        <div className="mb-8">
          <label htmlFor="notes" className={labelClass}>Observacoes <span className="text-text-muted font-normal">(opcional)</span></label>
          <textarea
            id="notes" value={notes} onChange={(e) => setNotes(e.target.value)}
            placeholder="Alguma informacao adicional para o profissional?" rows={3}
            className={`${inputClass} resize-none`}
          />
        </div>

        {/* ─── SUMMARY ─── */}
        {(selectedService || selectedCombo) && date && time && (
          <div className="mb-6 p-5 bg-bg-surface rounded-xl border border-border/60">
            <h4 className="text-xs font-semibold text-text-secondary uppercase tracking-wider mb-3">Resumo do agendamento</h4>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm text-text-secondary">{selectedCombo ? 'Combo' : 'Servico'}</span>
                <span className="text-sm font-semibold text-text-primary">
                  {selectedCombo ? selectedCombo.name : selectedService!.name}
                </span>
              </div>
              {selectedCombo && (
                <div className="flex items-center justify-between">
                  <span className="text-sm text-text-secondary">Servicos inclusos</span>
                  <span className="text-sm text-text-primary">{selectedCombo.services.map(s => s.name).join(', ')}</span>
                </div>
              )}
              <div className="flex items-center justify-between">
                <span className="text-sm text-text-secondary">Duracao</span>
                <span className="text-sm text-text-primary">
                  {selectedCombo ? selectedCombo.duration_minutes : selectedService!.duration_minutes} min
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-text-secondary">Data</span>
                <span className="text-sm text-text-primary">
                  {new Date(date + 'T12:00:00').toLocaleDateString('pt-BR', { weekday: 'short', day: 'numeric', month: 'short' })}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-text-secondary">Horario</span>
                <span className="text-sm text-text-primary">{time}</span>
              </div>
              <div className="flex items-center justify-between pt-2 border-t border-border/60">
                <span className="text-sm font-semibold text-text-primary">Valor</span>
                <span className="text-lg font-bold text-accent">
                  {selectedCombo ? formatPrice(selectedCombo.price) :
                    selectedService!.price_type !== 'on_request' ? formatPrice(selectedService!.price) : 'Sob consulta'
                  }
                </span>
              </div>
            </div>
          </div>
        )}

        {/* ─── SUBMIT ─── */}
        <button
          type="submit"
          disabled={submitting}
          className="w-full py-3.5 bg-gradient-to-r from-[#4A6CF7] to-[#6C5CE7] text-white font-bold text-sm rounded-xl hover:opacity-90 transition-opacity disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-sm cursor-pointer"
        >
          {submitting ? (
            <>
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              Agendando...
            </>
          ) : (
            <>
              Confirmar agendamento
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
              </svg>
            </>
          )}
        </button>
      </div>
    </form>
  );
}
