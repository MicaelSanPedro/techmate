import Link from "next/link";
import { Calendar, Clock, ArrowRight } from "lucide-react";
import { CategoryBadge } from "@/components/CategoryBadge";
import type { PostSummary } from "@/lib/posts";

interface FeaturedPostProps {
  post: PostSummary;
}

export function FeaturedPost({ post }: FeaturedPostProps) {
  const { slug, frontmatter } = post;

  return (
    <Link href={`/blog/${slug}`} className="group block">
      <article className="relative rounded-2xl overflow-hidden border border-white/[0.06] transition-all duration-300 hover:border-amber-500/20 hover:shadow-[0_0_30px_rgba(249,189,24,0.1)]">
        {/* Gradient background overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-amber-900/30 via-yellow-900/20 to-orange-900/10 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent pointer-events-none" />

        <div className="relative p-6 sm:p-8 md:p-10 flex flex-col justify-end min-h-[280px] sm:min-h-[340px]">
          {/* Category */}
          <div className="mb-4">
            <CategoryBadge category={frontmatter.category} />
          </div>

          {/* Title */}
          <h2 className="text-2xl sm:text-3xl font-bold text-white leading-tight mb-3 group-hover:text-amber-50 transition-colors duration-200">
            {frontmatter.title}
          </h2>

          {/* Excerpt */}
          <p className="text-sm sm:text-base text-white/50 leading-relaxed mb-5 max-w-2xl line-clamp-2">
            {frontmatter.excerpt}
          </p>

          {/* Bottom row */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-center gap-4">
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

            {/* Read more button */}
            <span className="inline-flex items-center gap-2 text-sm font-medium text-amber-400 group-hover:text-amber-300 transition-colors duration-200">
              Ler mais
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
            </span>
          </div>
        </div>
      </article>
    </Link>
  );
}
