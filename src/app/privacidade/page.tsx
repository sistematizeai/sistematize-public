import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Politica de Privacidade - Sistematize',
  description: 'Politica de privacidade da plataforma Sistematize para usuarios, negocios e clientes finais.',
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-[#f5f5f7]">
      <div className="mx-auto max-w-4xl px-6 py-16">
        <h1 className="mb-2 text-3xl font-extrabold text-[#1a1a1a]">Politica de Privacidade</h1>
        <p className="mb-10 text-sm text-[#8c8c8c]">Ultima atualizacao: 26 de maio de 2026</p>

        <div className="space-y-8 rounded-2xl border border-[#e8e8e8] bg-white p-8 text-sm leading-relaxed text-[#333]">
          <section>
            <h2 className="mb-3 text-lg font-bold text-[#1a1a1a]">1. Quem somos</h2>
            <p>
              O <strong>Sistematize</strong> e uma plataforma de gestao, assinatura e agendamento para negocios de
              beleza, estetica, saude, bem-estar e servicos locais. Tratamos dados pessoais para viabilizar cadastro,
              acesso, operacao da conta, agendamentos, comunicacoes, suporte, seguranca e recursos contratados.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-lg font-bold text-[#1a1a1a]">2. Papeis na LGPD</h2>
            <p>
              Para dados da conta do usuario administrador e do negocio contratante, o Sistematize pode atuar como
              controlador. Para dados de clientes finais inseridos pelo negocio, o negocio normalmente atua como
              controlador e o Sistematize como operador, tratando esses dados conforme instrucoes do negocio e para
              funcionamento da plataforma.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-lg font-bold text-[#1a1a1a]">3. Dados que coletamos</h2>
            <p className="mb-2">Coletamos os seguintes dados pessoais:</p>
            <ul className="list-disc space-y-1 pl-5">
              <li>
                <strong>Usuarios e proprietarios:</strong> nome, email, telefone, CPF/CNPJ, cidade, senha criptografada
                e dados da conta.
              </li>
              <li>
                <strong>Negocios:</strong> nome, segmento, tipo, servicos, equipe, agenda, faturamento estimado e
                preferencias.
              </li>
              <li>
                <strong>Colaboradores:</strong> nome, contato, horarios, servicos realizados e permissoes de acesso.
              </li>
              <li>
                <strong>Clientes dos negocios:</strong> nome, telefone, email quando informado, historico de
                agendamentos e informacoes necessarias ao atendimento.
              </li>
              <li>
                <strong>Pagamentos:</strong> plano, status de cobranca, identificadores de fatura, metodo de pagamento,
                vencimentos e comprovantes.
              </li>
              <li>
                <strong>Uso e seguranca:</strong> logs, sessoes, acoes administrativas, configuracoes, IP, navegador e
                evidencias tecnicas.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="mb-3 text-lg font-bold text-[#1a1a1a]">4. Finalidade do tratamento</h2>
            <ul className="list-disc space-y-1 pl-5">
              <li>Realizar e gerenciar agendamentos online.</li>
              <li>Disponibilizar agenda, servicos, clientes, equipe, financeiro e pagina publica.</li>
              <li>Enviar confirmacoes, avisos operacionais, comunicacoes de seguranca e suporte.</li>
              <li>Processar pagamentos e cobrancas.</li>
              <li>Manter o funcionamento e seguranca da plataforma.</li>
              <li>Prevenir fraude, abuso, uso indevido e acessos nao autorizados.</li>
              <li>Cumprir obrigacoes legais e regulatorias.</li>
            </ul>
          </section>

          <section>
            <h2 className="mb-3 text-lg font-bold text-[#1a1a1a]">5. Bases legais</h2>
            <ul className="list-disc space-y-1 pl-5">
              <li>
                <strong>Execucao de contrato:</strong> para criar conta, operar o painel, entregar recursos contratados
                e processar assinatura.
              </li>
              <li>
                <strong>Consentimento:</strong> quando aplicavel, inclusive em comunicacoes opcionais ou formularios
                especificos.
              </li>
              <li>
                <strong>Interesse legitimo:</strong> para seguranca, suporte, melhoria do produto, auditoria e prevencao
                de fraude.
              </li>
              <li>
                <strong>Obrigacao legal:</strong> para cumprimento de normas fiscais e regulatorias.
              </li>
              <li>
                <strong>Exercicio regular de direitos:</strong> para preservar evidencias, responder disputas e proteger
                direitos.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="mb-3 text-lg font-bold text-[#1a1a1a]">6. Compartilhamento de dados</h2>
            <p>Seus dados podem ser compartilhados com:</p>
            <ul className="mt-2 list-disc space-y-1 pl-5">
              <li>
                <strong>Estabelecimento:</strong> que voce agendou ou contratou, quando ele for o controlador dos seus
                dados.
              </li>
              <li>
                <strong>Processadores de pagamento:</strong> Asaas ou outro provedor para cobrancas.
              </li>
              <li>
                <strong>Servico de email:</strong> Resend, Gmail/SMTP ou outro provedor para envio de notificacoes.
              </li>
              <li>
                <strong>Infraestrutura:</strong> Supabase, Render, Vercel e fornecedores tecnicos equivalentes.
              </li>
              <li>
                <strong>Suporte, logs e monitoramento:</strong> fornecedores necessarios para estabilidade, seguranca e
                atendimento.
              </li>
            </ul>
            <p className="mt-2">Nao vendemos nem compartilhamos seus dados com terceiros para fins de marketing.</p>
          </section>

          <section>
            <h2 className="mb-3 text-lg font-bold text-[#1a1a1a]">7. Pagamentos e tokenizacao</h2>
            <p>
              Pagamentos podem ser processados por provedores externos, como Asaas. O Sistematize nao deve armazenar
              numero completo de cartao nem codigo de seguranca. Quando houver pagamento por cartao, os dados do cartao
              devem ser enviados ao provedor para autorizacao e, quando disponivel, tokenizacao. Podemos armazenar apenas
              dados operacionais, como identificador da cobranca, status, bandeira, ultimos digitos, vencimento, metodo
              utilizado e token retornado pelo provedor.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-lg font-bold text-[#1a1a1a]">8. Cookies, sessoes e tecnologias similares</h2>
            <p>
              Podemos usar cookies, armazenamento local, tokens de sessao e tecnologias similares para manter login,
              proteger acessos, lembrar preferencias, diagnosticar erros e melhorar estabilidade. O bloqueio dessas
              tecnologias pode impedir o funcionamento correto de partes da plataforma.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-lg font-bold text-[#1a1a1a]">9. Seus direitos</h2>
            <p className="mb-2">Voce tem direito a:</p>
            <ul className="list-disc space-y-1 pl-5">
              <li>Confirmar a existencia de tratamento dos seus dados.</li>
              <li>Acessar seus dados pessoais.</li>
              <li>Corrigir dados incompletos ou desatualizados.</li>
              <li>Solicitar a anonimizacao, bloqueio ou eliminacao de dados desnecessarios.</li>
              <li>Revogar o consentimento a qualquer momento.</li>
              <li>Solicitar a portabilidade dos seus dados.</li>
              <li>Solicitar informacoes sobre compartilhamento e sobre as consequencias de nao fornecer consentimento.</li>
              <li>Solicitar revisao de decisoes exclusivamente automatizadas quando aplicavel.</li>
            </ul>
            <p className="mt-2">
              Para exercer seus direitos, entre em contato pelo email{' '}
              <a href="mailto:sistematizeai@gmail.com" className="text-[#4F5AE5] hover:underline">
                sistematizeai@gmail.com
              </a>
              . Solicitacoes podem exigir validacao de identidade e podem ser limitadas por obrigacoes legais,
              seguranca, preservacao de direitos e dados controlados pelo negocio contratante.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-lg font-bold text-[#1a1a1a]">10. Retencao de dados</h2>
            <p>
              Seus dados sao mantidos pelo tempo necessario para a prestacao do servico, cumprimento de obrigacoes
              legais, seguranca, prevencao de fraude, auditoria, suporte, resolucao de conflitos e defesa de direitos.
              Apos o encerramento da conta, dados podem ser excluidos, anonimizados ou retidos quando houver obrigacao
              legal ou interesse legitimo aplicavel.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-lg font-bold text-[#1a1a1a]">11. Seguranca</h2>
            <p>
              Adotamos medidas tecnicas e organizacionais para proteger seus dados, incluindo criptografia em transito
              (TLS), controle de acesso, segregacao por conta, auditoria de acoes, backups, logs e armazenamento seguro
              de credenciais.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-lg font-bold text-[#1a1a1a]">12. Transferencia internacional</h2>
            <p>
              Alguns fornecedores de infraestrutura, suporte, email, monitoramento ou pagamento podem processar dados em
              outros paises. Quando isso ocorrer, buscamos utilizar fornecedores com medidas adequadas de seguranca,
              contratos e controles compativeis com a legislacao aplicavel.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-lg font-bold text-[#1a1a1a]">13. Criancas e adolescentes</h2>
            <p>
              A plataforma e destinada a negocios e usuarios profissionais. Caso um negocio cadastre dados de menores
              para fins de atendimento, ele deve possuir base legal adequada e observar as regras aplicaveis.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-lg font-bold text-[#1a1a1a]">14. Alteracoes desta politica</h2>
            <p>
              Esta politica pode ser atualizada para refletir mudancas legais, tecnicas, operacionais ou comerciais. A
              versao vigente sera publicada nesta pagina com a data de atualizacao.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-lg font-bold text-[#1a1a1a]">15. Contato</h2>
            <p>
              Para duvidas sobre esta politica ou sobre o tratamento dos seus dados, entre em contato:{' '}
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
