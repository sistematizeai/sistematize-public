import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Politica de Privacidade — Sistematize',
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-[#f5f5f7]">
      <div className="max-w-3xl mx-auto px-6 py-16">
        <h1 className="text-3xl font-extrabold text-[#1a1a1a] mb-2">Politica de Privacidade</h1>
        <p className="text-sm text-[#8c8c8c] mb-10">Ultima atualizacao: 12 de maio de 2026</p>

        <div className="bg-white rounded-2xl border border-[#e8e8e8] p-8 space-y-8 text-[#333] text-sm leading-relaxed">
          <section>
            <h2 className="text-lg font-bold text-[#1a1a1a] mb-3">1. Quem somos</h2>
            <p>
              O <strong>Sistematize</strong> e uma plataforma de agendamento online que conecta estabelecimentos de beleza
              e bem-estar aos seus clientes. Atuamos como operador de dados pessoais em nome dos estabelecimentos
              (controladores) que utilizam nossa plataforma.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-[#1a1a1a] mb-3">2. Dados que coletamos</h2>
            <p className="mb-2">Coletamos os seguintes dados pessoais:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li><strong>Clientes dos estabelecimentos:</strong> nome, telefone, email (opcional), historico de agendamentos</li>
              <li><strong>Proprietarios de estabelecimentos:</strong> nome, email, CPF/CNPJ, dados de pagamento</li>
              <li><strong>Colaboradores:</strong> nome, horario de trabalho, servicos oferecidos</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-bold text-[#1a1a1a] mb-3">3. Finalidade do tratamento</h2>
            <ul className="list-disc pl-5 space-y-1">
              <li>Realizar e gerenciar agendamentos online</li>
              <li>Enviar confirmacoes, lembretes e cancelamentos por email</li>
              <li>Processar pagamentos e cobrancas</li>
              <li>Manter o funcionamento e seguranca da plataforma</li>
              <li>Cumprir obrigacoes legais e regulatorias</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-bold text-[#1a1a1a] mb-3">4. Base legal (LGPD Art. 7)</h2>
            <ul className="list-disc pl-5 space-y-1">
              <li><strong>Consentimento:</strong> ao preencher o formulario de agendamento</li>
              <li><strong>Execucao de contrato:</strong> para prestacao do servico de agendamento</li>
              <li><strong>Interesse legitimo:</strong> para melhorias na plataforma e comunicacoes relacionadas ao servico</li>
              <li><strong>Obrigacao legal:</strong> para cumprimento de normas fiscais e regulatorias</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-bold text-[#1a1a1a] mb-3">5. Compartilhamento de dados</h2>
            <p>Seus dados podem ser compartilhados com:</p>
            <ul className="list-disc pl-5 space-y-1 mt-2">
              <li><strong>Estabelecimento:</strong> que voce agendou (controlador dos seus dados)</li>
              <li><strong>Processadores de pagamento:</strong> Asaas, para cobrancas</li>
              <li><strong>Servico de email:</strong> Resend, para envio de notificacoes</li>
              <li><strong>Infraestrutura:</strong> Supabase (banco de dados), Render (hospedagem), Vercel (frontend)</li>
            </ul>
            <p className="mt-2">Nao vendemos nem compartilhamos seus dados com terceiros para fins de marketing.</p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-[#1a1a1a] mb-3">6. Seus direitos (LGPD Art. 18)</h2>
            <p className="mb-2">Voce tem direito a:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Confirmar a existencia de tratamento dos seus dados</li>
              <li>Acessar seus dados pessoais</li>
              <li>Corrigir dados incompletos ou desatualizados</li>
              <li>Solicitar a anonimizacao, bloqueio ou eliminacao de dados desnecessarios</li>
              <li>Revogar o consentimento a qualquer momento</li>
              <li>Solicitar a portabilidade dos seus dados</li>
            </ul>
            <p className="mt-2">
              Para exercer seus direitos, entre em contato pelo email{' '}
              <a href="mailto:sistematizeai@gmail.com" className="text-[#4F5AE5] hover:underline">sistematizeai@gmail.com</a>.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-[#1a1a1a] mb-3">7. Retencao de dados</h2>
            <p>
              Seus dados sao mantidos pelo tempo necessario para a prestacao do servico ou cumprimento de obrigacoes legais.
              Ao solicitar a exclusao, seus dados serao anonimizados em ate 15 dias uteis, exceto quando houver obrigacao
              legal de retencao.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-[#1a1a1a] mb-3">8. Seguranca</h2>
            <p>
              Adotamos medidas tecnicas e organizacionais para proteger seus dados, incluindo criptografia em transito (TLS),
              controle de acesso baseado em funcoes (RBAC), auditoria de acoes e armazenamento seguro de credenciais.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-[#1a1a1a] mb-3">9. Contato</h2>
            <p>
              Para duvidas sobre esta politica ou sobre o tratamento dos seus dados, entre em contato:{' '}
              <a href="mailto:sistematizeai@gmail.com" className="text-[#4F5AE5] hover:underline">sistematizeai@gmail.com</a>
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
