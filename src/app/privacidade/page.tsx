import Link from "next/link";
import { ArrowLeft, ShieldCheck } from "lucide-react";

export default function PrivacyPage() {
  return (
    <div className="pt-24 sm:pt-32 pb-20 px-4">
      <div className="max-w-3xl mx-auto">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-white/45 hover:text-amber-300 transition-colors mb-8 group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
          Voltar ao início
        </Link>

        <header className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-sky-500/10 border border-sky-500/20 flex items-center justify-center">
              <ShieldCheck className="w-5 h-5 text-sky-400" />
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
              Política de Privacidade
            </h1>
          </div>
          <p className="text-white/45 text-sm">Última atualização: 12 de Junho de 2026</p>
        </header>

        <div className="prose-custom">
          <section className="mb-10">
            <h2>1. Coleta de Dados</h2>
            <p>
              O TechMate prioriza a sua privacidade. Coletamos apenas os dados estritamente necessários para o funcionamento das funcionalidades personalizadas:
            </p>
            <ul>
              <li><strong>Via GitHub/Google:</strong> Nome, e-mail e foto de perfil (apenas se você optar por fazer login).</li>
              <li><strong>Favoritos:</strong> Armazenamos os IDs dos artigos que você favoritou para que você possa acessá-los em qualquer dispositivo.</li>
            </ul>
          </section>

          <section className="mb-10">
            <h2>2. Uso das Informações</h2>
            <p>
              Seus dados são utilizados exclusivamente para:
            </p>
            <ul>
              <li>Identificar você na tela de boas-vindas.</li>
              <li>Sincronizar sua lista de favoritos via Vercel KV ou GitHub Gists.</li>
              <li>Gerenciar sua inscrição na newsletter (se você se inscrever).</li>
            </ul>
            <p><strong>Nós nunca venderemos seus dados a terceiros.</strong></p>
          </section>

          <section className="mb-10">
            <h2>3. Armazenamento de Dados</h2>
            <ul>
              <li><strong>GitHub Gists:</strong> Se você logar via GitHub, seus favoritos são salvos em um Gist privado na sua própria conta.</li>
              <li><strong>Vercel KV:</strong> Se você logar via Google, seus favoritos são salvos de forma segura em nosso banco de dados Redis hospedado na Vercel.</li>
            </ul>
          </section>

          <section className="mb-10">
            <h2>4. Cookies e Tecnologias de Rastreamento</h2>
            <p>
              Utilizamos apenas cookies essenciais para manter sua sessão de login ativa (via NextAuth). Não utilizamos trackers de anúncios invasivos ou cookies de terceiros para marketing.
            </p>
          </section>

          <section className="mb-10">
            <h2>5. Seus Direitos</h2>
            <p>
              Você pode solicitar a exclusão de seus dados a qualquer momento limpando o cache do navegador ou entrando em contato através do GitHub do autor.
            </p>
          </section>

          <section className="mb-10">
            <h2>6. Serviços de Terceiros</h2>
            <p>
              Nosso site utiliza:
            </p>
            <ul>
              <li><strong>Vercel:</strong> Hospedagem e Banco de Dados.</li>
              <li><strong>Google/GitHub:</strong> Autenticação.</li>
              <li><strong>Giscus:</strong> Sistema de comentários.</li>
            </ul>
            <p>Recomendamos que leia as políticas de privacidade desses provedores separadamente.</p>
          </section>
        </div>
      </div>
    </div>
  );
}
