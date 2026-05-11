import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center max-w-md px-6">
        <p className="text-6xl font-extrabold text-gray-300 mb-2">404</p>
        <h2 className="text-xl font-bold text-gray-900 mb-2">Salao nao encontrado</h2>
        <p className="text-sm text-gray-500 mb-6">O salao que voce procura nao existe ou foi removido.</p>
        <Link href="/" className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#4A6CF7] to-[#6C5CE7] text-white text-sm font-semibold hover:brightness-110 transition-all inline-block">
          Voltar
        </Link>
      </div>
    </div>
  );
}
