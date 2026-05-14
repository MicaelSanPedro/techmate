import Link from "next/link";
import { getAllPosts, getFeaturedPosts, getAllCategories } from "@/lib/posts";
import { FeaturedPost } from "@/components/FeaturedPost";
import { PostCard } from "@/components/PostCard";
import {
  ArrowRight,
  Terminal,
  Cpu,
  Shield,
  Monitor,
  Lightbulb,
  Code,
  Gamepad2,
} from "lucide-react";

const categoryIcons: Record<string, React.ReactNode> = {
  Linux: <Terminal className="w-5 h-5" />,
  Windows: <Monitor className="w-5 h-5" />,
  Desenvolvimento: <Code className="w-5 h-5" />,
  Segurança: <Shield className="w-5 h-5" />,
  Hardware: <Cpu className="w-5 h-5" />,
  Dicas: <Lightbulb className="w-5 h-5" />,
  Jogos: <Gamepad2 className="w-5 h-5" />,
};

const categoryColors: Record<string, string> = {
  Linux: "from-amber-500/10 to-amber-500/5 border-amber-500/10",
  Windows: "from-blue-500/10 to-blue-500/5 border-blue-500/10",
  Desenvolvimento: "from-emerald-500/10 to-emerald-500/5 border-emerald-500/10",
  "Segurança": "from-red-500/10 to-red-500/5 border-red-500/10",
  Hardware: "from-purple-500/10 to-purple-500/5 border-purple-500/10",
  Dicas: "from-cyan-500/10 to-cyan-500/5 border-cyan-500/10",
  Jogos: "from-green-500/10 to-green-500/5 border-green-500/10",
};

export default function HomePage() {
  const allPosts = getAllPosts();
  const featuredPosts = getFeaturedPosts();
  const categories = getAllCategories();
  const recentPosts = allPosts.filter(
    (p) => !featuredPosts.find((f) => f.slug === p.slug)
  );

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 sm:pt-40 sm:pb-28 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 mb-6">
            <Terminal className="w-3.5 h-3.5 text-amber-400" />
            <span className="text-xs text-amber-400 font-medium">Blog Tech</span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
            <span className="text-white">Linux</span>
            <span className="shimmer-text">Zeiro</span>
            <span className="text-white/60"> Blog</span>
          </h1>
          <p className="text-lg sm:text-xl text-white/40 max-w-2xl mx-auto leading-relaxed">
            Artigos, tutoriais e dicas sobre{" "}
            <span className="text-amber-400/70">Linux</span>,{" "}
            <span className="text-blue-400/70">Windows</span>, desenvolvimento e
            tecnologia.
          </p>
        </div>
      </section>

      {/* Featured Posts */}
      {featuredPosts.length > 0 && (
        <section className="px-4 pb-16">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-1 h-6 rounded-full bg-amber-500" />
              <h2 className="text-xl font-bold text-white">Destaques</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {featuredPosts.map((post) => (
                <FeaturedPost key={post.slug} post={post} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Categories */}
      {categories.length > 0 && (
        <section className="px-4 pb-16" id="categories">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-1 h-6 rounded-full bg-amber-500" />
              <h2 className="text-xl font-bold text-white">Categorias</h2>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
              {categories.map((cat) => (
                <Link
                  key={cat.name}
                  href={`/blog?category=${encodeURIComponent(cat.name)}`}
                  className={`group flex flex-col items-center gap-3 p-5 rounded-xl bg-gradient-to-b border transition-all hover:scale-[1.02] ${
                    categoryColors[cat.name] || "from-white/5 to-white/[0.02] border-white/[0.06]"
                  }`}
                >
                  <div className="text-amber-400">
                    {categoryIcons[cat.name] || <Terminal className="w-5 h-5" />}
                  </div>
                  <div className="text-center">
                    <span className="text-sm font-medium text-white/80 block">
                      {cat.name}
                    </span>
                    <span className="text-xs text-white/30">
                      {cat.count} {cat.count === 1 ? "artigo" : "artigos"}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Recent Posts */}
      <section className="px-4 pb-20">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <div className="w-1 h-6 rounded-full bg-amber-500" />
              <h2 className="text-xl font-bold text-white">Últimos Artigos</h2>
            </div>
            <Link
              href="/blog"
              className="flex items-center gap-1.5 text-sm text-amber-400 hover:text-amber-300 transition-colors"
            >
              Ver todos
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {recentPosts.map((post) => (
              <PostCard key={post.slug} post={post} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
