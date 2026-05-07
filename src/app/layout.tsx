import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Sistematize — Agendamento Online',
  description: 'Agende seu horario online',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
