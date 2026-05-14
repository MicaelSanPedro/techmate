import { getPostBySlug, getAllPosts } from "@/lib/posts";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  Calendar,
  Clock,
  ArrowLeft,
  User,
} from "lucide-react";
import { CategoryBadge } from "@/components/CategoryBadge";
import type { Metadata } from "next";

interface PostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: PostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return { title: "Artigo não encontrado" };

  return {
    title: `${post.frontmatter.title} - LinuxZeiro`,
    description: post.frontmatter.excerpt,
  };
}

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("pt-BR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function getRelativeDate(dateStr: string): string {
  const now = new Date();
  const date = new Date(dateStr);
  const diffMs = now.getTime() - date.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return "Hoje";
  if (diffDays === 1) return "Ontem";
  if (diffDays < 7) return `Há ${diffDays} dias`;
  if (diffDays < 30) return `Há ${Math.floor(diffDays / 7)} semana${Math.floor(diffDays / 7) > 1 ? "s" : ""}`;
  if (diffDays < 365) return `Há ${Math.floor(diffDays / 30)} mês${Math.floor(diffDays / 30) > 1 ? "es" : ""}`;
  return `Há ${Math.floor(diffDays / 365)} ano${Math.floor(diffDays / 365) > 1 ? "s" : ""}`;
}

export default async function PostPage({ params }: PostPageProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) notFound();

  const { frontmatter, contentHtml } = post;

  return (
    <div className="pt-28 pb-20 px-4">
      <article className="max-w-3xl mx-auto">
        {/* Back link */}
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-sm text-white/40 hover:text-amber-400 transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Voltar ao Blog
        </Link>

        {/* Post header */}
        <header className="mb-10">
          <div className="flex items-center gap-3 mb-5">
            <CategoryBadge category={frontmatter.category} />
            <span className="text-xs text-white/20">·</span>
            <span className="text-xs text-white/30">{getRelativeDate(frontmatter.date)}</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-[2.75rem] font-extrabold text-white leading-[1.15] mb-6 tracking-tight">
            {frontmatter.title}
          </h1>
          <p className="text-lg sm:text-xl text-white/45 leading-relaxed mb-8">
            {frontmatter.excerpt}
          </p>

          {/* Meta bar */}
          <div className="flex flex-wrap items-center gap-x-5 gap-y-3 py-4 px-5 rounded-xl bg-white/[0.02] border border-white/[0.05]">
            <div className="flex items-center gap-2 text-sm text-white/40">
              <div className="w-7 h-7 rounded-full bg-gradient-to-br from-amber-500/30 to-amber-600/20 flex items-center justify-center">
                <User className="w-3.5 h-3.5 text-amber-400" />
              </div>
              <span className="font-medium text-white/60">LinuxZeiro</span>
            </div>
            <div className="flex items-center gap-1.5 text-sm text-white/30">
              <Calendar className="w-3.5 h-3.5" />
              <time dateTime={frontmatter.date}>
                {formatDate(frontmatter.date)}
              </time>
            </div>
            <div className="flex items-center gap-1.5 text-sm text-white/30">
              <Clock className="w-3.5 h-3.5" />
              <span>{frontmatter.readTime} de leitura</span>
            </div>
          </div>

          {/* Tags */}
          {frontmatter.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-5">
              {frontmatter.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2.5 py-1 rounded-md text-xs font-mono text-amber-400/50 bg-amber-500/5 border border-amber-500/10"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </header>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-amber-500/30 via-amber-500/10 to-transparent mb-10" />

        {/* Post content */}
        <div
          className="prose-custom"
          dangerouslySetInnerHTML={{ __html: contentHtml }}
        />

        {/* Bottom nav */}
        <div className="mt-16 pt-8 border-t border-white/[0.06]">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-amber-400 hover:text-amber-300 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Ver todos os artigos
          </Link>
        </div>
      </article>
    </div>
  );
}
