export default function Home() {
  return (
    <main className="flex min-h-screen items-center justify-center">
      <div className="text-center max-w-md px-4">
        <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-[#4A6CF7] to-[#6C5CE7] flex items-center justify-center shadow-lg">
          <span className="text-2xl font-extrabold text-white">S</span>
        </div>
        <h1 className="text-3xl font-extrabold text-text-primary mb-2 tracking-tight">Sistematize</h1>
        <p className="text-text-secondary text-sm mb-8">Plataforma de agendamento online para saloes de beleza</p>
        <p className="text-text-muted text-xs">
          Acesse a pagina do seu salao pelo link fornecido pelo estabelecimento.
        </p>
      </div>
    </main>
  );
}
