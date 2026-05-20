import Link from "next/link";
import { getAllPosts, getFeaturedPosts, getAllCategories } from "@/lib/posts";
import { FeaturedPost } from "@/components/FeaturedPost";
import { PostCard } from "@/components/PostCard";
import { NewsletterForm } from "@/components/NewsletterForm";
import { CategoryCard } from "@/components/CategoryCard";
import {
  ArrowRight,
  Sparkles,
  Zap,
  Rss,
} from "lucide-react";

export default function HomePage() {
  const allPosts = getAllPosts();
  const featuredPosts = getFeaturedPosts();
  const categories = getAllCategories();
  const recentPosts = allPosts.filter(
    (p) => !featuredPosts.find((f) => f.slug === p.slug)
  );

  const mainFeatured = featuredPosts[0];
  const sideFeatured = featuredPosts.slice(1, 3);

  return (
    <div className="flex flex-col">
      {/* ─────────── Hero ─────────── */}
      <section className="relative pt-28 pb-16 sm:pt-36 sm:pb-24 lg:pt-44 lg:pb-32 px-4 overflow-hidden">
        {/* Decorative concentric rings (hidden on small mobile) */}
        <div className="hidden sm:block hero-ring w-[600px] h-[600px] top-[10%] left-1/2 -translate-x-1/2" />
        <div className="hidden sm:block hero-ring w-[900px] h-[900px] top-[5%] left-1/2 -translate-x-1/2 opacity-50" />
        <div className="hidden lg:block hero-ring w-[1200px] h-[1200px] top-[-5%] left-1/2 -translate-x-1/2 opacity-30" />

        <div className="relative max-w-5xl mx-auto text-center">
          {/* Live badge */}
          <div className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-3.5 py-1 sm:py-1.5 rounded-full bg-white/[0.04] border border-white/[0.08] mb-6 sm:mb-8 backdrop-blur-md animate-fade-up delay-0">
            <span className="live-dot" />
            <span className="text-[10px] sm:text-[11px] text-white/70 font-medium tracking-wider uppercase">
              Tech blog · ao vivo
            </span>
            <span className="text-white/20">·</span>
            <span className="text-[10px] sm:text-[11px] text-amber-300/80 font-medium">v2026</span>
          </div>

          {/* Main title */}
          <h1 className="mb-5 sm:mb-7 leading-[0.95] text-balance animate-fade-up delay-1">
            <span className="block text-5xl sm:text-7xl lg:text-8xl font-extrabold tracking-tight">
              <span className="gradient-text-muted">Linux</span>
              <span className="shimmer-text">Zeiro</span>
            </span>
            <span className="block mt-3 sm:mt-5 text-xl sm:text-3xl lg:text-4xl font-semibold text-white/40 tracking-tight px-2">
              Tutoriais, dicas & guias com{" "}
              <span className="relative inline-block">
                <span className="text-white/70">toque de terminal</span>
                <span className="absolute -bottom-1 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-400/50 to-transparent" />
              </span>
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-sm sm:text-base lg:text-lg text-white/40 max-w-2xl mx-auto leading-relaxed text-pretty animate-fade-up delay-2 px-2">
            Tudo sobre{" "}
            <span className="text-amber-300/80 font-medium">Linux</span>
            {", "}
            <span className="text-sky-300/80 font-medium">Windows</span>
            {", "}
            <span className="text-emerald-300/80 font-medium">desenvolvimento</span>
            {" "}e{" "}
            <span className="text-lime-300/80 font-medium">gaming</span>
            {" — pra quem vive na linha de comando."}
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 mt-8 sm:mt-10 animate-fade-up delay-3 px-4 sm:px-0 max-w-sm sm:max-w-none mx-auto">
            <Link href="/blog" className="btn-primary justify-center">
              Explorar artigos
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link href="/#categories" className="btn-secondary justify-center">
              <Sparkles className="w-4 h-4 text-amber-300" />
              Ver categorias
            </Link>
          </div>

          {/* Quick stats */}
          <div className="flex flex-wrap items-center justify-center gap-x-5 sm:gap-x-7 gap-y-2 mt-8 sm:mt-10 text-xs sm:text-sm text-white/35 animate-fade-up delay-4">
            <div className="flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-400/60" />
              <span className="font-mono tabular-nums text-white/60">{allPosts.length}</span>
              <span>artigos</span>
            </div>
            <div className="w-px h-3.5 bg-white/10" />
            <div className="flex items-center gap-1.5">
              <span className="font-mono tabular-nums text-white/60">{categories.length}</span>
              <span>categorias</span>
            </div>
            <div className="w-px h-3.5 bg-white/10" />
            <div className="flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5 text-amber-400/60" />
              <span>Semanal</span>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────── Featured Bento ─────────── */}
      {mainFeatured && (
        <section className="px-4 pb-16 sm:pb-20 lg:pb-24">
          <div className="max-w-7xl mx-auto">
            <SectionHeader
              eyebrow="Em destaque"
              title="Leitura recomendada"
              subtitle="O que está bombando agora"
            />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-5 lg:gap-6">
              {/* Main featured (2 cols) */}
              <div className="lg:col-span-2 animate-fade-up delay-1">
                <FeaturedPost post={mainFeatured} variant="hero" />
              </div>

              {/* Side featured stack */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4 sm:gap-5 lg:gap-6">
                {sideFeatured.length > 0 ? (
                  sideFeatured.map((post, i) => (
                    <div key={post.slug} className={`animate-fade-up delay-${i + 2}`}>
                      <FeaturedPost post={post} variant="compact" />
                    </div>
                  ))
                ) : (
                  recentPosts.slice(0, 2).map((post, i) => (
                    <div key={post.slug} className={`animate-fade-up delay-${i + 2}`}>
                      <FeaturedPost post={post} variant="compact" />
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ─────────── Categories ─────────── */}
      {categories.length > 0 && (
        <section className="px-4 pb-16 sm:pb-20 lg:pb-24" id="categories">
          <div className="max-w-7xl mx-auto">
            <SectionHeader
              eyebrow="Por tema"
              title="Navegue por categoria"
              subtitle="Escolha seu universo"
            />

            {(() => {
              const [featuredCat, ...restCats] = categories;
              return (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
                  {/* Featured big card (takes 1 col always, but is taller) */}
                  {featuredCat && (
                    <div className="sm:row-span-2 animate-fade-up delay-0">
                      <CategoryCard
                        name={featuredCat.name}
                        count={featuredCat.count}
                        size="lg"
                        className="h-full"
                      />
                    </div>
                  )}

                  {/* Standard cards */}
                  {restCats.map((cat, i) => (
                    <div
                      key={cat.name}
                      className={`animate-fade-up delay-${Math.min(i + 1, 6)}`}
                    >
                      <CategoryCard
                        name={cat.name}
                        count={cat.count}
                        size="md"
                        className="h-full"
                      />
                    </div>
                  ))}
                </div>
              );
            })()}
          </div>
        </section>
      )}

      {/* ─────────── Recent Posts ─────────── */}
      <section className="px-4 pb-20 sm:pb-24">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between mb-8 sm:mb-12 gap-3 sm:gap-4">
            <SectionHeader
              eyebrow="Mais recentes"
              title="Últimos artigos"
              subtitle="Saindo do forno"
              className="mb-0"
            />
            <Link
              href="/blog"
              className="shrink-0 inline-flex items-center gap-1.5 text-sm font-medium text-amber-300 hover:text-amber-200 transition-colors group self-start sm:self-auto"
            >
              Ver todos
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 lg:gap-6">
            {recentPosts.map((post, i) => (
              <div
                key={post.slug}
                className={`animate-fade-up delay-${Math.min(i, 6)}`}
              >
                <PostCard post={post} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────── Newsletter ─────────── */}
      <section className="px-4 pb-20 sm:pb-28">
        <div className="max-w-4xl mx-auto">
          <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl border border-white/[0.08] p-6 sm:p-10 lg:p-12 text-center
                          bg-gradient-to-br from-amber-500/[0.08] via-white/[0.02] to-rose-500/[0.04]">
            {/* Decorative orbs */}
            <div className="absolute -top-32 -left-32 w-60 h-60 sm:w-72 sm:h-72 bg-amber-500/20 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-32 -right-32 w-60 h-60 sm:w-72 sm:h-72 bg-rose-500/10 rounded-full blur-3xl pointer-events-none" />

            <div className="relative">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 mb-4 sm:mb-5">
                <Rss className="w-3 h-3 text-amber-300" />
                <span className="text-[10px] sm:text-[11px] text-amber-300 font-medium tracking-wider uppercase">
                  Newsletter
                </span>
              </div>
              <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white mb-3 tracking-tight text-balance">
                Receba os melhores artigos no seu inbox
              </h3>
              <p className="text-sm sm:text-base text-white/50 mb-6 sm:mb-7 max-w-md mx-auto text-pretty">
                Sem spam, sem fluff. Só tutoriais práticos e dicas pra dev que vive no terminal.
              </p>

              <NewsletterForm />

              <p className="mt-4 text-[11px] text-white/25">
                100% gratuito · cancele quando quiser
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function SectionHeader({
  eyebrow,
  title,
  subtitle,
  className = "",
}: {
  eyebrow: string;
  title: string;
  subtitle?: string;
  className?: string;
}) {
  return (
    <div className={`mb-8 sm:mb-12 ${className}`}>
      <div className="flex items-center gap-2 mb-2.5 sm:mb-3">
        <span className="w-5 sm:w-6 h-px bg-gradient-to-r from-amber-400 to-transparent" />
        <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.2em] text-amber-300/80 font-medium">
          {eyebrow}
        </span>
      </div>
      <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white tracking-tight">
        {title}
      </h2>
      {subtitle && (
        <p className="text-sm text-white/40 mt-1.5">{subtitle}</p>
      )}
    </div>
  );
}
