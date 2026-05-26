import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Termos de Uso - Sistematize',
  description: 'Termos de uso da plataforma Sistematize para usuarios, negocios e clientes finais.',
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-[#f5f5f7]">
      <div className="mx-auto max-w-4xl px-6 py-16">
        <h1 className="mb-2 text-3xl font-extrabold text-[#1a1a1a]">Termos de Uso</h1>
        <p className="mb-10 text-sm text-[#8c8c8c]">Ultima atualizacao: 26 de maio de 2026</p>

        <div className="space-y-8 rounded-2xl border border-[#e8e8e8] bg-white p-8 text-sm leading-relaxed text-[#333]">
          <section>
            <h2 className="mb-3 text-lg font-bold text-[#1a1a1a]">1. Aceitacao dos termos</h2>
            <p>
              Ao criar conta, acessar o painel, utilizar a pagina publica de agendamento ou contratar um plano, voce
              concorda com estes Termos de Uso e com nossa{' '}
              <Link href="/privacidade" className="text-[#4F5AE5] hover:underline">
                Politica de Privacidade
              </Link>
              . Caso nao concorde, nao utilize a plataforma.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-lg font-bold text-[#1a1a1a]">2. Descricao do servico</h2>
            <p>
              O Sistematize e uma plataforma SaaS para gestao de agenda, clientes, colaboradores, servicos, financeiro
              operacional, assinaturas e pagina publica de agendamento para negocios de beleza, estetica, saude,
              bem-estar e servicos locais. Recursos e limites podem variar conforme o plano contratado.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-lg font-bold text-[#1a1a1a]">3. Cadastro e conta</h2>
            <ul className="list-disc space-y-1 pl-5">
              <li>Voce e responsavel por manter a seguranca das suas credenciais de acesso.</li>
              <li>As informacoes fornecidas no cadastro devem ser verdadeiras e atualizadas.</li>
              <li>Cada negocio deve manter dados, horarios, servicos, valores e colaboradores atualizados.</li>
              <li>Voce deve remover acessos de colaboradores que nao participam mais da operacao.</li>
            </ul>
          </section>

          <section>
            <h2 className="mb-3 text-lg font-bold text-[#1a1a1a]">4. Uso da plataforma</h2>
            <p className="mb-2">Ao usar o Sistematize, voce concorda em:</p>
            <ul className="list-disc space-y-1 pl-5">
              <li>Nao utilizar a plataforma para fins ilegais.</li>
              <li>Nao tentar acessar dados de outros estabelecimentos.</li>
              <li>Nao interferir no funcionamento da plataforma.</li>
              <li>Respeitar a privacidade dos dados dos seus clientes conforme a LGPD.</li>
              <li>Nao cadastrar conteudo ilegal, fraudulento, ofensivo ou que viole direitos de terceiros.</li>
            </ul>
          </section>

          <section>
            <h2 className="mb-3 text-lg font-bold text-[#1a1a1a]">5. Agendamentos</h2>
            <ul className="list-disc space-y-1 pl-5">
              <li>Agendamentos realizados pela pagina publica dependem das configuracoes do estabelecimento.</li>
              <li>O Sistematize nao se responsabiliza por cancelamentos ou alteracoes feitas pelo estabelecimento.</li>
              <li>Pagamentos associados a agendamentos dependem das integracoes e regras comerciais do proprio negocio.</li>
            </ul>
          </section>

          <section>
            <h2 className="mb-3 text-lg font-bold text-[#1a1a1a]">6. Planos e pagamento</h2>
            <ul className="list-disc space-y-1 pl-5">
              <li>O Sistematize oferece periodo de teste gratuito conforme definido no momento do cadastro.</li>
              <li>Apos o periodo de teste, o acesso ao sistema requer a assinatura de um plano.</li>
              <li>Pagamentos podem ser processados por provedores externos, incluindo Asaas.</li>
              <li>Upgrades podem gerar cobranca proporcional ou imediata conforme a regra exibida no checkout.</li>
              <li>Downgrades podem ser aplicados no fim do ciclo ja pago, preservando o acesso ate o vencimento.</li>
              <li>O cancelamento da assinatura pode ser feito a qualquer momento pelo painel ou suporte.</li>
            </ul>
          </section>

          <section>
            <h2 className="mb-3 text-lg font-bold text-[#1a1a1a]">7. Cancelamento e encerramento</h2>
            <p>
              O cancelamento impede novas cobrancas futuras, mas nao elimina automaticamente valores vencidos, encargos
              ja processados ou obrigacoes legais de retencao. A exclusao definitiva de dados deve ser solicitada pelo
              canal de privacidade, observados prazos legais, seguranca, auditoria e defesa de direitos.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-lg font-bold text-[#1a1a1a]">8. Dados, conteudo e LGPD</h2>
            <p>
              O negocio contratante e responsavel pelos dados, servicos, valores, horarios, politicas de atendimento e
              informacoes de seus clientes. Em relacao aos dados de clientes finais cadastrados pelo negocio, o
              Sistematize normalmente atua como operador, tratando dados conforme instrucoes do negocio e conforme a
              Politica de Privacidade.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-lg font-bold text-[#1a1a1a]">9. Integracoes e terceiros</h2>
            <p>
              A plataforma pode depender de servicos de hospedagem, banco de dados, email, pagamento, autenticacao,
              monitoramento e automacoes. O funcionamento dessas integracoes depende da disponibilidade, permissoes,
              limites e politicas dos respectivos provedores.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-lg font-bold text-[#1a1a1a]">10. Propriedade intelectual</h2>
            <p>
              Todo o conteudo da plataforma, incluindo codigo, design, marca, textos e fluxos, pertence ao Sistematize
              ou a seus licenciantes. Os dados inseridos pelos estabelecimentos e seus clientes permanecem de propriedade
              dos respectivos titulares ou responsaveis.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-lg font-bold text-[#1a1a1a]">11. Limitacao de responsabilidade</h2>
            <p>
              O Sistematize trabalha para manter a plataforma disponivel e segura, mas nao garante disponibilidade
              ininterrupta. Nao nos responsabilizamos por danos indiretos, lucros cessantes, falhas de internet,
              indisponibilidade de terceiros, configuracoes incorretas feitas pelo usuario ou uso em desacordo com estes
              termos.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-lg font-bold text-[#1a1a1a]">12. Alteracoes nos termos</h2>
            <p>
              Podemos atualizar estes termos periodicamente. Alteracoes significativas serao comunicadas por email aos
              usuarios cadastrados, por aviso na plataforma ou por atualizacao desta pagina.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-lg font-bold text-[#1a1a1a]">13. Lei aplicavel e contato</h2>
            <p>
              Estes termos sao regidos pelas leis brasileiras. Duvidas sobre estes termos podem ser enviadas para{' '}
              <a href="mailto:sistematizeai@gmail.com" className="text-[#4F5AE5] hover:underline">
                sistematizeai@gmail.com
              </a>
              .
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
