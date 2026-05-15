import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Termos de Uso — Sistematize',
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-[#f5f5f7]">
      <div className="max-w-3xl mx-auto px-6 py-16">
        <h1 className="text-3xl font-extrabold text-[#1a1a1a] mb-2">Termos de Uso</h1>
        <p className="text-sm text-[#8c8c8c] mb-10">Ultima atualizacao: 12 de maio de 2026</p>

        <div className="bg-white rounded-2xl border border-[#e8e8e8] p-8 space-y-8 text-[#333] text-sm leading-relaxed">
          <section>
            <h2 className="text-lg font-bold text-[#1a1a1a] mb-3">1. Aceitacao dos termos</h2>
            <p>
              Ao utilizar a plataforma Sistematize, voce concorda com estes Termos de Uso e com nossa{' '}
              <Link href="/privacidade" className="text-[#4F5AE5] hover:underline">Politica de Privacidade</Link>.
              Caso nao concorde, nao utilize a plataforma.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-[#1a1a1a] mb-3">2. Descricao do servico</h2>
            <p>
              O Sistematize e uma plataforma SaaS de agendamento online para estabelecimentos de beleza e bem-estar.
              Oferecemos ferramentas para gestao de agenda, clientes, colaboradores, servicos e pagamentos online.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-[#1a1a1a] mb-3">3. Cadastro e conta</h2>
            <ul className="list-disc pl-5 space-y-1">
              <li>Voce e responsavel por manter a seguranca das suas credenciais de acesso</li>
              <li>As informacoes fornecidas no cadastro devem ser verdadeiras e atualizadas</li>
              <li>Cada estabelecimento deve ter um cadastro proprio</li>
              <li>O uso de autenticacao em duas etapas (2FA) e recomendado para administradores</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-bold text-[#1a1a1a] mb-3">4. Uso da plataforma</h2>
            <p className="mb-2">Ao usar o Sistematize, voce concorda em:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Nao utilizar a plataforma para fins ilegais</li>
              <li>Nao tentar acessar dados de outros estabelecimentos</li>
              <li>Nao interferir no funcionamento da plataforma</li>
              <li>Respeitar a privacidade dos dados dos seus clientes conforme a LGPD</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-bold text-[#1a1a1a] mb-3">5. Agendamentos</h2>
            <ul className="list-disc pl-5 space-y-1">
              <li>Agendamentos realizados pela pagina publica dependem das configuracoes do estabelecimento</li>
              <li>O Sistematize nao se responsabiliza por cancelamentos ou alteracoes feitas pelo estabelecimento</li>
              <li>Pagamentos associados a agendamentos sao processados pelo Asaas conforme os termos do proprio estabelecimento</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-bold text-[#1a1a1a] mb-3">6. Planos e pagamento</h2>
            <ul className="list-disc pl-5 space-y-1">
              <li>O Sistematize oferece periodo de teste gratuito conforme definido no momento do cadastro</li>
              <li>Apos o periodo de teste, o acesso ao sistema requer a assinatura de um plano</li>
              <li>Os valores dos planos podem ser alterados com aviso previo de 30 dias</li>
              <li>O cancelamento da assinatura pode ser feito a qualquer momento pelo painel</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-bold text-[#1a1a1a] mb-3">7. Propriedade intelectual</h2>
            <p>
              Todo o conteudo da plataforma (codigo, design, marca, textos) e de propriedade do Sistematize.
              Os dados inseridos pelos estabelecimentos e seus clientes permanecem de propriedade dos respectivos titulares.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-[#1a1a1a] mb-3">8. Limitacao de responsabilidade</h2>
            <p>
              O Sistematize se esforça para manter a plataforma disponivel e funcionando, mas nao garante disponibilidade
              ininterrupta. Nao nos responsabilizamos por danos indiretos, perda de receita ou lucros cessantes
              decorrentes do uso ou impossibilidade de uso da plataforma.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-[#1a1a1a] mb-3">9. Alteracoes nos termos</h2>
            <p>
              Podemos atualizar estes termos periodicamente. Alteracoes significativas serao comunicadas por email
              aos usuarios cadastrados com pelo menos 15 dias de antecedencia.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-[#1a1a1a] mb-3">10. Contato</h2>
            <p>
              Duvidas sobre estes termos podem ser enviadas para{' '}
              <a href="mailto:sistematizeai@gmail.com" className="text-[#4F5AE5] hover:underline">sistematizeai@gmail.com</a>.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
