import Link from "next/link";
import Image from "next/image";
import { Heart, Github, Twitter } from "lucide-react";

const categoryLinks = [
  { label: "Linux", href: "/blog?category=Linux" },
  { label: "Windows", href: "/blog?category=Windows" },
  { label: "Desenvolvimento", href: "/blog?category=Dev" },
  { label: "Segurança", href: "/blog?category=Segurança" },
  { label: "Hardware", href: "/blog?category=Hardware" },
  { label: "Dicas", href: "/blog?category=Dicas" },
];

const quickLinks = [
  { label: "Início", href: "/" },
  { label: "Blog", href: "/blog" },
  { label: "Sobre", href: "/#sobre" },
  { label: "GitHub", href: "https://github.com/MicaelSanPedro/linuxzeiro" },
];

const socialLinks = [
  {
    label: "GitHub",
    href: "https://github.com/MicaelSanPedro/linuxzeiro",
    icon: Github,
  },
  {
    label: "Twitter",
    href: "https://twitter.com",
    icon: Twitter,
  },
];

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative mt-auto">
      {/* Gold gradient line at top */}
      <div className="h-px bg-gradient-to-r from-transparent via-amber-500/30 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Link href="/" className="flex items-center gap-2.5 mb-4 w-fit">
              <div className="w-9 h-9 rounded-xl overflow-hidden">
                <Image
                  src="/logo.webp"
                  alt="LinuxZeiro"
                  width={36}
                  height={36}
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="text-lg font-bold">
                <span className="text-white">Linux</span>
                <span className="shimmer-text">Zeiro</span>
              </span>
            </Link>
            <p className="text-xs sm:text-sm text-white/30 leading-relaxed max-w-xs">
              Blog sobre Linux, open source, desenvolvimento e tecnologia. Tutoriais, dicas e guias
              práticos para a comunidade brasileira.
            </p>
          </div>

          {/* Categorias */}
          <div>
            <h4 className="text-sm font-semibold text-white/60 mb-4">Categorias</h4>
            <ul className="space-y-2.5">
              {categoryLinks.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="text-xs sm:text-sm text-white/30 hover:text-amber-400 transition-colors duration-200"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Links Rápidos */}
          <div>
            <h4 className="text-sm font-semibold text-white/60 mb-4">Links Rápidos</h4>
            <ul className="space-y-2.5">
              {quickLinks.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    {...(item.href.startsWith("http")
                      ? { target: "_blank", rel: "noopener noreferrer" }
                      : {})}
                    className="text-xs sm:text-sm text-white/30 hover:text-amber-400 transition-colors duration-200"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="text-sm font-semibold text-white/60 mb-4">Social</h4>
            <ul className="space-y-2.5">
              {socialLinks.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-xs sm:text-sm text-white/30 hover:text-amber-400 transition-colors duration-200"
                  >
                    <item.icon className="w-4 h-4" />
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="mt-10 sm:mt-12 pt-6 sm:pt-8 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/20">
            © {currentYear} LinuxZeiro. Todos os direitos reservados.
          </p>
          <p className="text-xs text-white/20 flex items-center gap-1">
            Feito com <Heart className="w-3 h-3 text-amber-500 fill-amber-500" /> e Linux para o{" "}
            Open Source
          </p>
        </div>
      </div>
    </footer>
  );
}
