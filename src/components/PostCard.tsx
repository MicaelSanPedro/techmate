import Link from "next/link";
import { Calendar, Clock, ArrowUpRight } from "lucide-react";
import { CategoryBadge } from "@/components/CategoryBadge";
import type { PostSummary } from "@/lib/posts";

const categoryGradients: Record<string, string> = {
  linux: "from-amber-900/40 via-amber-800/20 to-transparent",
  windows: "from-blue-900/40 via-blue-800/20 to-transparent",
  dev: "from-emerald-900/40 via-emerald-800/20 to-transparent",
  segurança: "from-red-900/40 via-red-800/20 to-transparent",
  hardware: "from-purple-900/40 via-purple-800/20 to-transparent",
  dicas: "from-cyan-900/40 via-cyan-800/20 to-transparent",
};

function getGradient(category: string): string {
  const key = category.toLowerCase();
  for (const [k, v] of Object.entries(categoryGradients)) {
    if (key.includes(k)) return v;
  }
  return "from-amber-900/40 via-amber-800/20 to-transparent";
}

interface PostCardProps {
  post: PostSummary;
}

export function PostCard({ post }: PostCardProps) {
  const { slug, frontmatter } = post;

  return (
    <Link href={`/blog/${slug}`} className="group block">
      <article className="relative rounded-2xl border border-white/[0.06] bg-white/[0.02] overflow-hidden transition-all duration-300 hover:border-amber-500/20 hover:shadow-[0_0_20px_rgba(249,189,24,0.08)] h-full flex flex-col">
        {/* Cover image placeholder area */}
        <div
          className={`relative h-44 bg-gradient-to-br ${getGradient(frontmatter.category)} flex items-center justify-center`}
        >
          <div className="w-16 h-16 rounded-2xl bg-white/[0.06] border border-white/[0.08] flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
            <span className="text-3xl">📝</span>
          </div>

          {/* Category badge overlaid */}
          <div className="absolute top-3 left-3">
            <CategoryBadge category={frontmatter.category} />
          </div>

          {/* Arrow icon on hover */}
          <div className="absolute top-3 right-3 w-8 h-8 rounded-lg bg-white/[0.06] border border-white/[0.08] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <ArrowUpRight className="w-4 h-4 text-amber-400" />
          </div>
        </div>

        {/* Content */}
        <div className="flex flex-col flex-1 p-5 gap-3">
          {/* Title */}
          <h3 className="text-base font-semibold text-white leading-snug group-hover:text-amber-100 transition-colors duration-200 line-clamp-2">
            {frontmatter.title}
          </h3>

          {/* Excerpt */}
          <p className="text-sm text-white/50 leading-relaxed line-clamp-2 flex-1">
            {frontmatter.excerpt}
          </p>

          {/* Date and read time */}
          <div className="flex items-center gap-4 pt-2 border-t border-white/[0.06]">
            <div className="flex items-center gap-1.5 text-xs text-white/30">
              <Calendar className="w-3.5 h-3.5" />
              <time dateTime={frontmatter.date}>
                {new Date(frontmatter.date).toLocaleDateString("pt-BR", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                })}
              </time>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-white/30">
              <Clock className="w-3.5 h-3.5" />
              <span>{frontmatter.readTime}</span>
            </div>
          </div>
        </div>
      </article>
    </Link>
  );
}
