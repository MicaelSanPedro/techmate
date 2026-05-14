import { getAllPosts, getAllCategories } from "@/lib/posts";
import { PostCard } from "@/components/PostCard";
import { CategoryBadge } from "@/components/CategoryBadge";
import { Search } from "lucide-react";
import Link from "next/link";

interface BlogPageProps {
  searchParams: Promise<{ category?: string; tag?: string }>;
}

export default async function BlogPage({ searchParams }: BlogPageProps) {
  const params = await searchParams;
  const allPosts = getAllPosts();
  const categories = getAllCategories();

  const selectedCategory = params.category;
  const filteredPosts = selectedCategory
    ? allPosts.filter(
        (p) => p.frontmatter.category.toLowerCase() === selectedCategory.toLowerCase()
      )
    : allPosts;

  return (
    <div className="pt-28 pb-20 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 mb-4">
            <Search className="w-3.5 h-3.5 text-amber-400" />
            <span className="text-xs text-amber-400 font-medium">Blog</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            {selectedCategory || "Todos os Artigos"}
          </h1>
          <p className="text-white/40 max-w-lg">
            {selectedCategory
              ? `Mostrando ${filteredPosts.length} artigo${
                  filteredPosts.length === 1 ? "" : "s"
                } em ${selectedCategory}`
              : `Explore todos os ${allPosts.length} artigos do blog`}
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap gap-2 mb-10">
          <Link
            href="/blog"
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              !selectedCategory
                ? "bg-amber-500/20 text-amber-400 border border-amber-500/30"
                : "bg-white/[0.03] text-white/50 border border-white/[0.06] hover:text-white/70 hover:border-white/10"
            }`}
          >
            Todos
          </Link>
          {categories.map((cat) => (
            <Link
              key={cat.name}
              href={`/blog?category=${encodeURIComponent(cat.name)}`}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                selectedCategory === cat.name
                  ? "bg-amber-500/20 text-amber-400 border border-amber-500/30"
                  : "bg-white/[0.03] text-white/50 border border-white/[0.06] hover:text-white/70 hover:border-white/10"
              }`}
            >
              {cat.name}
              <span className="ml-1.5 text-xs opacity-50">({cat.count})</span>
            </Link>
          ))}
        </div>

        {/* Posts Grid */}
        {filteredPosts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPosts.map((post) => (
              <PostCard key={post.slug} post={post} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-white/30 text-lg">Nenhum artigo encontrado.</p>
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 mt-4 text-amber-400 hover:text-amber-300 transition-colors"
            >
              Ver todos os artigos
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
