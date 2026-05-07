'use client';

import { useState, useEffect, FormEvent, ChangeEvent } from 'react';
import { PublicCategory } from '@/types';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

interface BookingFormProps {
  slug: string;
  preSelectedServiceId?: string | null;
}

function formatPhone(value: string): string {
  const digits = value.replace(/\D/g, '').slice(0, 11);
  if (digits.length <= 2) return digits;
  if (digits.length <= 7) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
  return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
}

function getTodayString(): string {
  const now = new Date();
  const y = now.getFullYear();
  const m = String(now.getMonth() + 1).padStart(2, '0');
  const d = String(now.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

export default function BookingForm({ slug, preSelectedServiceId }: BookingFormProps) {
  const [categories, setCategories] = useState<PublicCategory[]>([]);
  const [selectedServices, setSelectedServices] = useState<string[]>(
    preSelectedServiceId ? [preSelectedServiceId] : []
  );
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [notes, setNotes] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchServices() {
      try {
        const res = await fetch(`${API_URL}/api/public/${slug}/services`);
        if (res.ok) {
          const data = await res.json();
          setCategories(data);
        }
      } catch {
        // silently fail - services won't show
      } finally {
        setLoading(false);
      }
    }
    fetchServices();
  }, [slug]);

  function handlePhoneChange(e: ChangeEvent<HTMLInputElement>) {
    setPhone(formatPhone(e.target.value));
  }

  function toggleService(serviceId: string) {
    setSelectedServices((prev) =>
      prev.includes(serviceId)
        ? prev.filter((id) => id !== serviceId)
        : [...prev, serviceId]
    );
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);

    if (!name.trim() || !phone.trim() || !date || !time || selectedServices.length === 0) {
      setError('Por favor, preencha todos os campos obrigatorios e selecione pelo menos um servico.');
      return;
    }

    setSubmitting(true);

    try {
      const res = await fetch(`${API_URL}/api/public/${slug}/appointments`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          client_name: name.trim(),
          client_phone: phone.replace(/\D/g, ''),
          service_ids: selectedServices,
          date,
          start_time: time,
          notes: notes.trim() || undefined,
        }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => null);
        throw new Error(data?.message || 'Erro ao criar agendamento. Tente novamente.');
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
        <div className="bg-white rounded-3xl p-10 shadow-sm border border-border text-center max-w-md w-full">
          {/* Checkmark circle */}
          <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-green/10 flex items-center justify-center">
            <svg className="w-10 h-10 text-green" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
            </svg>
          </div>

          <h2 className="text-2xl font-extrabold text-text-primary mb-2">
            Agendamento confirmado!
          </h2>
          <p className="text-text-secondary text-sm mb-6">
            Voce recebera uma confirmacao em breve. Obrigado por agendar conosco!
          </p>

          <a
            href={`/${slug}`}
            className="inline-flex items-center gap-2 px-6 py-3 bg-accent text-white font-semibold text-sm rounded-xl hover:bg-accent/90 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
            </svg>
            Voltar para servicos
          </a>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto px-4">
      <div className="bg-white rounded-2xl border border-border p-6 sm:p-8 shadow-sm">
        <h2 className="text-xl font-bold text-text-primary mb-6">Dados do agendamento</h2>

        {/* Error message */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm">
            {error}
          </div>
        )}

        {/* Name field */}
        <div className="mb-5">
          <label htmlFor="name" className="block text-sm font-medium text-text-primary mb-1.5">
            Nome <span className="text-red-400">*</span>
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Seu nome completo"
            required
            className="w-full px-4 py-3 rounded-xl border border-border bg-white text-text-primary placeholder:text-text-muted text-sm focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent transition-colors"
          />
        </div>

        {/* Phone field */}
        <div className="mb-5">
          <label htmlFor="phone" className="block text-sm font-medium text-text-primary mb-1.5">
            Telefone <span className="text-red-400">*</span>
          </label>
          <input
            type="tel"
            id="phone"
            value={phone}
            onChange={handlePhoneChange}
            placeholder="(11) 99999-9999"
            required
            className="w-full px-4 py-3 rounded-xl border border-border bg-white text-text-primary placeholder:text-text-muted text-sm focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent transition-colors"
          />
        </div>

        {/* Date and Time */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5">
          <div>
            <label htmlFor="date" className="block text-sm font-medium text-text-primary mb-1.5">
              Data <span className="text-red-400">*</span>
            </label>
            <input
              type="date"
              id="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              min={getTodayString()}
              required
              className="w-full px-4 py-3 rounded-xl border border-border bg-white text-text-primary text-sm focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent transition-colors"
            />
          </div>
          <div>
            <label htmlFor="time" className="block text-sm font-medium text-text-primary mb-1.5">
              Horario <span className="text-red-400">*</span>
            </label>
            <input
              type="time"
              id="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              required
              className="w-full px-4 py-3 rounded-xl border border-border bg-white text-text-primary text-sm focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent transition-colors"
            />
          </div>
        </div>

        {/* Services selection */}
        <div className="mb-5">
          <label className="block text-sm font-medium text-text-primary mb-3">
            Servicos <span className="text-red-400">*</span>
          </label>

          {loading ? (
            <div className="flex items-center justify-center py-8">
              <div className="w-6 h-6 border-2 border-accent/30 border-t-accent rounded-full animate-spin" />
            </div>
          ) : categories.length === 0 ? (
            <p className="text-text-muted text-sm py-4">Nenhum servico disponivel.</p>
          ) : (
            <div className="space-y-4">
              {categories.map((category) => (
                <div key={category.id}>
                  <div className="flex items-center gap-2 mb-2">
                    <span
                      className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                      style={{ backgroundColor: category.color }}
                    />
                    <span className="text-xs font-semibold text-text-secondary uppercase tracking-wider">
                      {category.name}
                    </span>
                  </div>
                  <div className="space-y-1.5">
                    {category.services.map((service) => {
                      const isSelected = selectedServices.includes(service.id);
                      return (
                        <label
                          key={service.id}
                          className={`
                            flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-all border
                            ${isSelected
                              ? 'bg-accent/5 border-accent/20'
                              : 'bg-bg-surface/50 border-transparent hover:bg-bg-surface'
                            }
                          `}
                        >
                          <input
                            type="checkbox"
                            checked={isSelected}
                            onChange={() => toggleService(service.id)}
                            className="w-4 h-4 rounded border-border text-accent focus:ring-accent/20 accent-accent"
                          />
                          <div className="flex-1 min-w-0">
                            <span className="text-sm font-medium text-text-primary">{service.name}</span>
                            <span className="text-xs text-text-muted ml-2">({service.duration_minutes} min)</span>
                          </div>
                          <span className="text-sm font-semibold text-accent flex-shrink-0">
                            {service.price_type === 'on_request'
                              ? 'Sob consulta'
                              : service.price_type === 'starting_at'
                                ? `A partir de ${new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(service.price)}`
                                : new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(service.price)
                            }
                          </span>
                        </label>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Notes */}
        <div className="mb-6">
          <label htmlFor="notes" className="block text-sm font-medium text-text-primary mb-1.5">
            Observacoes
          </label>
          <textarea
            id="notes"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Alguma observacao? (opcional)"
            rows={3}
            className="w-full px-4 py-3 rounded-xl border border-border bg-white text-text-primary placeholder:text-text-muted text-sm focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent transition-colors resize-none"
          />
        </div>

        {/* Submit button */}
        <button
          type="submit"
          disabled={submitting}
          className="w-full py-3.5 bg-accent text-white font-bold text-sm rounded-xl hover:bg-accent/90 transition-colors disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
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
