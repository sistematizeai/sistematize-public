interface Props {
  params: Promise<{ slug: string }>;
}

export default async function SalonPage({ params }: Props) {
  const { slug } = await params;

  return (
    <main className="min-h-screen bg-gray-50 p-6">
      <div className="mx-auto max-w-4xl">
        <h1 className="text-2xl font-bold mb-4">Salao: {slug}</h1>
        <p className="text-gray-500">Pagina publica de agendamento — em construcao</p>
      </div>
    </main>
  );
}
