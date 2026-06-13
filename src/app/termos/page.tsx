import Link from "next/link";
import { ArrowLeft, ShieldCheck, ScrollText } from "lucide-react";

export default function TermsPage() {
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
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center">
              <ScrollText className="w-5 h-5 text-amber-400" />
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
              Termos de Uso
            </h1>
          </div>
          <p className="text-white/45 text-sm">Última atualização: 12 de Junho de 2026</p>
        </header>

        <div className="prose-custom">
          <section className="mb-10">
            <h2>1. Aceitação dos Termos</h2>
            <p>
              Ao acessar e usar o <strong>TechMate</strong>, você concorda em cumprir e estar vinculado a estes Termos de Uso. Se você não concordar com qualquer parte destes termos, não deverá utilizar nosso site.
            </p>
          </section>

          <section className="mb-10">
            <h2>2. Conteúdo e Propriedade Intelectual</h2>
            <p>
              Todo o conteúdo publicado no TechMate (tutoriais, guias, códigos e artigos) é de propriedade de Micael San Pedro, a menos que indicado de outra forma. 
            </p>
            <ul>
              <li>Você pode compartilhar links para nosso conteúdo.</li>
              <li>A reprodução total ou parcial sem autorização prévia é proibida.</li>
              <li>Códigos de exemplo podem ser usados em seus projetos pessoais ou comerciais conforme a licença especificada no post ou repositório.</li>
            </ul>
          </section>

          <section className="mb-10">
            <h2>3. Uso de Conta e Autenticação</h2>
            <p>
              Oferecemos login via Google e GitHub para facilitar a sincronização de seus favoritos.
            </p>
            <ul>
              <li>Você é responsável pela segurança da sua conta nos provedores de terceiros.</li>
              <li>Não coletamos nem armazenamos suas senhas.</li>
              <li>O uso indevido de contas ou tentativas de burlar o sistema de favoritos resultará em bloqueio.</li>
            </ul>
          </section>

          <section className="mb-10">
            <h2>4. Comentários e Interação</h2>
            <p>
              Utilizamos o <strong>Giscus</strong> (baseado no GitHub Discussions) para comentários. Ao comentar:
            </p>
            <ul>
              <li>Seja respeitoso com os outros membros.</li>
              <li>Não publique spam, conteúdo ofensivo ou ilegal.</li>
              <li>O autor reserva-se o direito de moderar ou remover comentários que violem estas diretrizes.</li>
            </ul>
          </section>

          <section className="mb-10">
            <h2>5. Limitação de Responsabilidade</h2>
            <p>
              Os tutoriais aqui apresentados são baseados em testes e experiências reais. No entanto, o TechMate <strong>não se responsabiliza</strong> por qualquer perda de dados, danos em hardware ou software decorrentes do uso de informações publicadas aqui. Sempre faça backups antes de seguir guias técnicos.
            </p>
          </section>

          <section className="mb-10">
            <h2>6. Alterações nos Termos</h2>
            <p>
              Podemos atualizar estes termos periodicamente. O uso continuado do site após alterações constitui aceitação dos novos termos.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
