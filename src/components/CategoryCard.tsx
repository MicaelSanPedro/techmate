"use client";

import Link from "next/link";
import { useRef } from "react";
import {
  Terminal,
  Monitor,
  Code,
  Shield,
  Cpu,
  Lightbulb,
  Gamepad2,
  ArrowUpRight,
} from "lucide-react";

interface CategoryTheme {
  icon: React.ReactNode;
  /** Tailwind gradient class for the card background */
  gradient: string;
  /** Tailwind color class for the accent (text + glow) */
  accent: string;
  /** Hex color used in dynamic CSS (glow, ring) */
  hex: string;
  /** Short tagline shown below the title */
  tagline: string;
  /** Decorative ASCII / glyph pattern */
  glyphs: string[];
  /** Mock terminal command shown as background */
  command: string;
}

const themes: Record<string, CategoryTheme> = {
  Linux: {
    icon: <Terminal className="w-6 h-6" />,
    gradient: "from-amber-500/20 via-amber-600/8 to-transparent",
    accent: "text-amber-300",
    hex: "#fbbf24",
    tagline: "Distros, shell e poder",
    glyphs: ["$", "~", "/", "#", "λ", "→"],
    command: "sudo apt install vim",
  },
  Windows: {
    icon: <Monitor className="w-6 h-6" />,
    gradient: "from-sky-500/20 via-blue-600/8 to-transparent",
    accent: "text-sky-300",
    hex: "#7dd3fc",
    tagline: "Tweaks e produtividade",
    glyphs: ["⊞", "▢", "◧", "◨", "▤", "□"],
    command: "winget install --id=...",
  },
  Desenvolvimento: {
    icon: <Code className="w-6 h-6" />,
    gradient: "from-emerald-500/20 via-emerald-600/8 to-transparent",
    accent: "text-emerald-300",
    hex: "#6ee7b7",
    tagline: "Code, ship, repeat",
    glyphs: ["{ }", "< >", "( )", "=>", "&&", "::"],
    command: "git push origin main",
  },
  "Segurança": {
    icon: <Shield className="w-6 h-6" />,
    gradient: "from-rose-500/20 via-red-600/8 to-transparent",
    accent: "text-rose-300",
    hex: "#fda4af",
    tagline: "Hardening sem paranoia",
    glyphs: ["🔒", "✓", "⚠", "○", "●", "▼"],
    command: "ufw enable",
  },
  Hardware: {
    icon: <Cpu className="w-6 h-6" />,
    gradient: "from-violet-500/20 via-purple-600/8 to-transparent",
    accent: "text-violet-300",
    hex: "#c4b5fd",
    tagline: "GPU, CPU e fierro",
    glyphs: ["⟨⟩", "□", "▦", "◈", "▣", "▥"],
    command: "lscpu | grep MHz",
  },
  Dicas: {
    icon: <Lightbulb className="w-6 h-6" />,
    gradient: "from-cyan-500/20 via-teal-600/8 to-transparent",
    accent: "text-cyan-300",
    hex: "#67e8f9",
    tagline: "Atalhos e segredos",
    glyphs: ["✦", "✧", "★", "◆", "◇", "✺"],
    command: "tldr <comando>",
  },
  Jogos: {
    icon: <Gamepad2 className="w-6 h-6" />,
    gradient: "from-lime-500/20 via-green-600/8 to-transparent",
    accent: "text-lime-300",
    hex: "#bef264",
    tagline: "FPS, mods e setup",
    glyphs: ["▲", "▼", "◀", "▶", "✕", "●"],
    command: "steam --reset",
  },
};

const defaultTheme: CategoryTheme = themes.Linux;

interface CategoryCardProps {
  name: string;
  count: number;
  /** "lg" = featured (bigger, more decoration); "md" = standard */
  size?: "lg" | "md";
  className?: string;
}

export function CategoryCard({ name, count, size = "md", className = "" }: CategoryCardProps) {
  const theme = themes[name] || defaultTheme;
  const cardRef = useRef<HTMLAnchorElement>(null);

  function handleMouseMove(e: React.MouseEvent<HTMLAnchorElement>) {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    cardRef.current.style.setProperty("--x", `${x}%`);
    cardRef.current.style.setProperty("--y", `${y}%`);
  }

  const isLg = size === "lg";

  return (
    <Link
      ref={cardRef}
      href={`/blog?category=${encodeURIComponent(name)}`}
      onMouseMove={handleMouseMove}
      style={{ "--c": theme.hex } as React.CSSProperties}
      className={`group spotlight relative overflow-hidden rounded-3xl border border-white/[0.07]
                  bg-gradient-to-br ${theme.gradient}
                  transition-all duration-500 ease-out
                  hover:border-[color:var(--c)]/40 hover:-translate-y-1
                  active:scale-[0.99]
                  ${isLg ? "min-h-[280px] sm:min-h-[320px] p-6 sm:p-8" : "min-h-[180px] sm:min-h-[200px] p-5 sm:p-6"}
                  ${className}`}
    >
      {/* ─── Layered background art ─── */}
      {/* Mesh glow blob (top-right) */}
      <div
        className="absolute -top-20 -right-16 w-60 h-60 rounded-full blur-3xl opacity-40 group-hover:opacity-70 transition-opacity duration-500"
        style={{ background: `radial-gradient(circle, ${theme.hex}40, transparent 65%)` }}
      />
      {/* Bottom shine */}
      <div
        className="absolute -bottom-32 -left-16 w-72 h-72 rounded-full blur-3xl opacity-20 group-hover:opacity-40 transition-opacity duration-700"
        style={{ background: `radial-gradient(circle, ${theme.hex}50, transparent 60%)` }}
      />

      {/* Diagonal stripes pattern */}
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage: `repeating-linear-gradient(45deg, ${theme.hex} 0 1px, transparent 1px 18px)`,
        }}
      />

      {/* Floating glyphs constellation */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none select-none" aria-hidden>
        {theme.glyphs.map((g, idx) => {
          // Pseudo-random but deterministic positions per glyph
          const positions = [
            { top: "12%", right: "8%", size: isLg ? "text-2xl" : "text-xl", delay: 0 },
            { top: "62%", right: "14%", size: "text-base", delay: 600 },
            { top: "78%", right: "32%", size: "text-sm", delay: 200 },
            { top: "28%", right: "28%", size: "text-lg", delay: 900 },
            { top: "45%", right: "5%", size: "text-sm", delay: 1200 },
            { top: "85%", right: "60%", size: "text-xs", delay: 400 },
          ];
          const pos = positions[idx % positions.length];
          return (
            <span
              key={idx}
              className={`absolute font-mono font-bold ${pos.size} opacity-[0.08] group-hover:opacity-[0.15] transition-all duration-700`}
              style={{
                top: pos.top,
                right: pos.right,
                color: theme.hex,
                transitionDelay: `${pos.delay}ms`,
                transform: "translate3d(0,0,0)",
              }}
            >
              {g}
            </span>
          );
        })}
      </div>

      {/* Terminal-line decoration (only LG) */}
      {isLg && (
        <div className="absolute bottom-5 sm:bottom-6 left-6 sm:left-8 right-6 sm:right-8 opacity-50 group-hover:opacity-80 transition-opacity duration-500">
          <div className="flex items-center gap-2 font-mono text-[11px] sm:text-xs">
            <span style={{ color: theme.hex }}>❯</span>
            <span className="text-white/40 truncate">{theme.command}</span>
            <span
              className="ml-1 w-1.5 h-3.5 animate-terminal-blink"
              style={{ background: theme.hex }}
            />
          </div>
        </div>
      )}

      {/* ─── Content ─── */}
      <div className="relative h-full flex flex-col">
        {/* Top: icon + arrow */}
        <div className="flex items-start justify-between mb-auto">
          <div
            className={`flex items-center justify-center rounded-2xl
                        bg-white/[0.06] border border-white/[0.12]
                        backdrop-blur-sm
                        ${theme.accent}
                        ${isLg ? "w-14 h-14 sm:w-16 sm:h-16" : "w-11 h-11 sm:w-12 sm:h-12"}
                        group-hover:scale-110 group-hover:-rotate-6 group-hover:border-[color:var(--c)]/40
                        transition-all duration-500`}
            style={{
              boxShadow: `0 8px 32px -8px ${theme.hex}30`,
            }}
          >
            {theme.icon}
          </div>

          <div
            className="w-9 h-9 inline-flex items-center justify-center rounded-xl
                       bg-white/[0.04] border border-white/[0.08]
                       opacity-0 -translate-y-1 -translate-x-1
                       group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0
                       transition-all duration-300"
            style={{ color: theme.hex }}
          >
            <ArrowUpRight className="w-4 h-4" />
          </div>
        </div>

        {/* Bottom: name + count */}
        <div className={`${isLg ? "mt-8 mb-8 sm:mb-10" : "mt-6"}`}>
          <h3
            className={`font-extrabold text-white leading-[1.05] tracking-tight mb-2
                        ${isLg ? "text-3xl sm:text-4xl" : "text-xl sm:text-2xl"}
                        group-hover:text-[color:var(--c)] transition-colors duration-300`}
          >
            {name}
          </h3>

          {isLg && (
            <p className="text-sm text-white/45 mb-3 max-w-[20ch]">
              {theme.tagline}
            </p>
          )}

          <div className="flex items-center gap-2 text-[11px] font-mono uppercase tracking-wider">
            <span
              className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full border border-white/10 bg-white/[0.03]"
              style={{ color: theme.hex }}
            >
              <span
                className="w-1.5 h-1.5 rounded-full"
                style={{ background: theme.hex, boxShadow: `0 0 8px ${theme.hex}` }}
              />
              <span className="tabular-nums font-semibold">
                {String(count).padStart(2, "0")}
              </span>
              <span className="text-white/40">{count === 1 ? "artigo" : "artigos"}</span>
            </span>
          </div>
        </div>
      </div>

      {/* Outer ring on hover */}
      <div
        className="absolute inset-0 rounded-3xl ring-1 ring-inset opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{ boxShadow: `inset 0 0 0 1px ${theme.hex}25` }}
      />
    </Link>
  );
}
