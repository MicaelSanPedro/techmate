"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  User,
  Moon,
  Sun,
  Trash2,
  ChevronRight,
  ArrowLeft,
  Shield,
  Eye,
  Type,
  Monitor,
  Smartphone,
  Info,
  ExternalLink,
  Heart,
  Zap,
  RotateCcw,
  HardDrive,
  Palette,
  Keyboard,
  Bell,
  Globe,
} from "lucide-react";
import { Logo } from "@/components/Logo";

const USERNAME_KEY = "techmate_username";
const THEME_KEY = "techmate_theme";

function getStored(key: string): string | null {
  if (typeof window === "undefined") return null;
  try { return localStorage.getItem(key); } catch { return null; }
}
function setStored(key: string, val: string) {
  try { localStorage.setItem(key, val); } catch { /* ignore */ }
}
function removeStored(key: string) {
  try { localStorage.removeItem(key); } catch { /* ignore */ }
}

function getStorageSize(): string {
  if (typeof window === "undefined") return "0 B";
  try {
    let total = 0;
    for (const key of Object.keys(localStorage)) {
      total += (localStorage.getItem(key) || "").length;
    }
    if (total < 1024) return `${total} B`;
    return `${(total / 1024).toFixed(1)} KB`;
  } catch {
    return "0 B";
  }
}

function getVisitCount(): number {
  try { return parseInt(localStorage.getItem("techmate_visits") || "1", 10); }
  catch { return 1; }
}

function getFirstVisit(): string {
  try { return localStorage.getItem("techmate_first_visit") || "Hoje"; }
  catch { return "Hoje"; }
}

/* ─── Sub-components ─── */

function SectionTitle({ icon: Icon, title }: { icon: React.ElementType; title: string }) {
  return (
    <div className="flex items-center gap-2.5 mb-4">
      <div className="flex items-center justify-center w-8 h-8 rounded-xl
                      bg-amber-500/[0.08] border border-amber-500/15">
        <Icon className="w-4 h-4 text-amber-400" />
      </div>
      <h2 className="text-base font-bold text-white/90">{title}</h2>
    </div>
  );
}

function SettingRow({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between px-4 py-3.5 rounded-xl
                    hover:bg-white/[0.03] transition-colors duration-200">
      {children}
    </div>
  );
}

function SettingLabel({ label, description }: { label: string; description?: string }) {
  return (
    <div className="flex-1 mr-4">
      <p className="text-sm font-medium text-white/80">{label}</p>
      {description && <p className="text-xs text-white/35 mt-0.5">{description}</p>}
    </div>
  );
}

function Toggle({
  checked,
  onChange,
}: {
  checked: boolean;
  onChange: (val: boolean) => void;
}) {
  return (
    <button
      type="button"
      onClick={() => onChange(!checked)}
      className={`relative w-11 h-6 rounded-full transition-colors duration-300 flex-shrink-0
                  ${checked ? "bg-amber-500/40" : "bg-white/[0.08] border border-white/[0.12]"}`}
      role="switch"
      aria-checked={checked}
    >
      <div className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full transition-all duration-300
                      ${checked
                        ? "translate-x-5 bg-amber-400 shadow-[0_0_8px_rgba(249,189,24,0.5)]"
                        : "bg-white/40"}`}
      />
    </button>
  );
}

function DangerButton({ onClick, children }: { onClick: () => void; children: React.ReactNode }) {
  const [confirm, setConfirm] = useState(false);

  if (!confirm) {
    return (
      <button
        type="button"
        onClick={() => setConfirm(true)}
        className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold
                   border border-red-500/20 bg-red-500/[0.08] text-red-400
                   hover:bg-red-500/[0.15] transition-colors"
      >
        <Trash2 className="w-3.5 h-3.5" />
        {children}
      </button>
    );
  }

  return (
    <div className="flex items-center gap-2">
      <p className="text-[11px] text-red-400/70 mr-1">Tem certeza?</p>
      <button
        type="button"
        onClick={() => { onClick(); setConfirm(false); }}
        className="px-3 py-1.5 rounded-lg text-xs font-semibold
                   border border-red-500/30 bg-red-500/[0.15] text-red-400
                   hover:bg-red-500/[0.25] transition-colors"
      >
        Sim, limpar
      </button>
      <button
        type="button"
        onClick={() => setConfirm(false)}
        className="px-3 py-1.5 rounded-lg text-xs font-medium
                   border border-white/[0.08] bg-white/[0.03] text-white/40
                   hover:bg-white/[0.06] transition-colors"
      >
        Cancelar
      </button>
    </div>
  );
}

function Divider() {
  return <div className="h-px mx-4 my-1 bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />;
}

/* ─── Main Settings Page ─── */

export default function SettingsPage() {
  const [userName, setUserName] = useState("");
  const [editingName, setEditingName] = useState(false);
  const [nameInput, setNameInput] = useState("");
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [mounted, setMounted] = useState(false);
  const [storageSize, setStorageSize] = useState("0 B");
  const [visitCount, setVisitCount] = useState(1);
  const [firstVisit, setFirstVisit] = useState("Hoje");
  const [savedMsg, setSavedMsg] = useState("");

  const router = useRouter();

  const hydrate = useCallback(() => {
    setMounted(true);
    const name = getStored(USERNAME_KEY) || "";
    setUserName(name);
    setNameInput(name);

    const t = getStored(THEME_KEY);
    if (t === "light") setTheme("light");

    setStorageSize(getStorageSize());
    setVisitCount(getVisitCount());
    setFirstVisit(getFirstVisit());
  }, []);

  useEffect(() => { hydrate(); }, [hydrate]);

  const showSaved = useCallback(() => {
    setSavedMsg("Salvo!");
    setTimeout(() => setSavedMsg(""), 2000);
  }, []);

  /* ── Handlers ── */
  const handleSaveName = () => {
    const trimmed = nameInput.trim();
    if (!trimmed) { setEditingName(false); return; }
    setStored(USERNAME_KEY, trimmed);
    setUserName(trimmed);
    setEditingName(false);
    window.dispatchEvent(new CustomEvent("techmate:username-set"));
    showSaved();
  };

  const handleThemeToggle = () => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    setStored(THEME_KEY, next);
    if (next === "light") {
      document.documentElement.classList.remove("dark");
      const m = document.querySelector('meta[name="theme-color"]') as HTMLMetaElement | null;
      if (m) m.content = "#f8f7f5";
    } else {
      document.documentElement.classList.add("dark");
      const m = document.querySelector('meta[name="theme-color"]') as HTMLMetaElement | null;
      if (m) m.content = "#08070a";
    }
    showSaved();
  };

  const handleClearData = () => {
    try { localStorage.clear(); } catch { /* ignore */ }
    setUserName("");
    setNameInput("");
    setTheme("dark");
    setStorageSize("0 B");
    setVisitCount(1);
    setFirstVisit("Hoje");
    document.documentElement.classList.add("dark");
    const m = document.querySelector('meta[name="theme-color"]') as HTMLMetaElement | null;
    if (m) m.content = "#08070a";
    window.dispatchEvent(new CustomEvent("techmate:username-set"));
    showSaved();
  };

  const handleResetTheme = () => {
    setTheme("dark");
    setStored(THEME_KEY, "dark");
    document.documentElement.classList.add("dark");
    const m = document.querySelector('meta[name="theme-color"]') as HTMLMetaElement | null;
    if (m) m.content = "#08070a";
    showSaved();
  };

  if (!mounted) return null;

  return (
    <div className="min-h-screen pt-20 pb-16 px-4">
      <div className="max-w-2xl mx-auto">

        {/* ── Header ── */}
        <div className="flex items-center gap-4 mb-8">
          <Link
            href="/"
            className="flex items-center justify-center w-10 h-10 rounded-xl
                       backdrop-blur-[40px] bg-white/[0.05] border border-white/[0.10]
                       hover:bg-white/[0.08] hover:border-white/[0.18] active:scale-95
                       transition-all duration-200"
          >
            <ArrowLeft className="w-4 h-4 text-white/60" />
          </Link>
          <div>
            <h1 className="text-2xl font-extrabold text-white tracking-tight">Configuracoes</h1>
            <p className="text-xs text-white/35 mt-0.5">Personalize sua experiencia no TechMate</p>
          </div>
          {savedMsg && (
            <span className="ml-auto text-xs font-semibold text-emerald-400 animate-fade-in">
              {savedMsg}
            </span>
          )}
        </div>

        {/* ── Perf ── */}
        <section className="liquid-glass-card rounded-2xl p-5 sm:p-6 mb-5">
          <SectionTitle icon={User} title="Perfil" />
          <Divider />

          <div className="py-3">
            {editingName ? (
              <div className="flex items-center gap-3 px-4">
                <input
                  type="text"
                  value={nameInput}
                  onChange={(e) => setNameInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSaveName()}
                  maxLength={24}
                  className="settings-input flex-1 !py-2 !px-3 !text-sm"
                  placeholder="Seu nome..."
                  autoFocus
                />
                <button
                  type="button"
                  onClick={handleSaveName}
                  className="settings-btn-sm !py-2 !px-4"
                >
                  Salvar
                </button>
                <button
                  type="button"
                  onClick={() => { setEditingName(false); setNameInput(userName); }}
                  className="settings-btn-sm settings-btn-cancel !py-2 !px-3"
                >
                  X
                </button>
              </div>
            ) : (
              <SettingRow>
                <div className="flex items-center gap-3 flex-1 mr-4">
                  <div className="flex items-center justify-center w-11 h-11 rounded-full
                                  bg-gradient-to-br from-amber-400/20 to-amber-500/10
                                  border border-amber-400/20">
                    <span className="text-lg font-bold text-amber-400">
                      {(userName || "?").charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-white/85">
                      {userName || "Visitante"}
                    </p>
                    <p className="text-xs text-white/30">
                      {userName ? `${userName.length} caracteres` : "Toque para definir seu nome"}
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setEditingName(true)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium
                             bg-white/[0.04] border border-white/[0.08] text-white/50
                             hover:bg-white/[0.07] hover:text-white/70 transition-colors"
                >
                  Editar
                </button>
              </SettingRow>
            )}
          </div>

          <Divider />

          <SettingRow>
            <SettingLabel label="Visitas ao site" description="Total de vezes que voce acessou o TechMate" />
            <span className="text-sm font-mono text-white/40 tabular-nums">{visitCount}x</span>
          </SettingRow>

          <Divider />

          <SettingRow>
            <SettingLabel label="Primeira visita" description="Quando voce descobriu o TechMate" />
            <span className="text-sm font-mono text-white/40">{firstVisit}</span>
          </SettingRow>
        </section>

        {/* ── Aparcia ── */}
        <section className="liquid-glass-card rounded-2xl p-5 sm:p-6 mb-5">
          <SectionTitle icon={Palette} title="Aparencia" />
          <Divider />

          <SettingRow>
            <div className="flex items-center gap-3 flex-1 mr-4">
              <div className={`flex items-center justify-center w-9 h-9 rounded-xl border
                              ${theme === "dark"
                                ? "bg-indigo-500/[0.08] border-indigo-500/15"
                                : "bg-yellow-500/[0.08] border-yellow-500/15"}`}>
                {theme === "dark"
                  ? <Moon className="w-4 h-4 text-indigo-400" />
                  : <Sun className="w-4 h-4 text-yellow-400" />}
              </div>
              <SettingLabel
                label={theme === "dark" ? "Modo Escuro" : "Modo Claro"}
                description={theme === "dark"
                  ? "Ideal para uso noturno e ambientes com pouca luz"
                  : "Ideal para uso diurno e ambientes claros"}
              />
            </div>
            <Toggle checked={theme === "light"} onChange={handleThemeToggle} />
          </SettingRow>

          <Divider />

          <SettingRow>
            <SettingLabel
              label="Restaurar tema padrao"
              description="Volta para o modo escuro (tema padrao do TechMate)"
            />
            <button
              type="button"
              onClick={handleResetTheme}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium
                         bg-white/[0.04] border border-white/[0.08] text-white/50
                         hover:bg-white/[0.07] hover:text-white/70 transition-colors"
            >
              <RotateCcw className="w-3 h-3" />
              Restaurar
            </button>
          </SettingRow>
        </section>

        {/* ── Prefercias ── */}
        <section className="liquid-glass-card rounded-2xl p-5 sm:p-6 mb-5">
          <SectionTitle icon={Monitor} title="Preferencias" />
          <Divider />

          <SettingRow>
            <div className="flex items-center gap-3 flex-1 mr-4">
              <div className="flex items-center justify-center w-9 h-9 rounded-xl
                              bg-amber-500/[0.08] border border-amber-500/15">
                <Globe className="w-4 h-4 text-amber-400" />
              </div>
              <SettingLabel
                label="Idioma"
                description="Portugues Brasileiro (padrao)"
              />
            </div>
            <span className="text-xs font-medium text-white/30 px-2.5 py-1 rounded-lg
                           bg-white/[0.03] border border-white/[0.06]">
              PT-BR
            </span>
          </SettingRow>

          <Divider />

          <SettingRow>
            <div className="flex items-center gap-3 flex-1 mr-4">
              <div className="flex items-center justify-center w-9 h-9 rounded-xl
                              bg-amber-500/[0.08] border border-amber-500/15">
                <Type className="w-4 h-4 text-amber-400" />
              </div>
              <SettingLabel
                label="Tamanho da fonte"
                description="Tamanho padrao dos textos do site"
              />
            </div>
            <span className="text-xs font-medium text-white/30 px-2.5 py-1 rounded-lg
                           bg-white/[0.03] border border-white/[0.06]">
              Padrao
            </span>
          </SettingRow>

          <Divider />

          <SettingRow>
            <div className="flex items-center gap-3 flex-1 mr-4">
              <div className="flex items-center justify-center w-9 h-9 rounded-xl
                              bg-amber-500/[0.08] border border-amber-500/15">
                <Keyboard className="w-4 h-4 text-amber-400" />
              </div>
              <SettingLabel
                label="Atalhos de teclado"
                description="Atalhos rapidos para navegar no site"
              />
            </div>
            <Link
              href="/settings#shortcuts"
              className="flex items-center gap-1 text-xs text-amber-400/70 hover:text-amber-300 transition-colors"
            >
              Ver
              <ChevronRight className="w-3 h-3" />
            </Link>
          </SettingRow>

          <Divider />

          <SettingRow>
            <div className="flex items-center gap-3 flex-1 mr-4">
              <div className="flex items-center justify-center w-9 h-9 rounded-xl
                              bg-amber-500/[0.08] border border-amber-500/15">
                <Smartphone className="w-4 h-4 text-amber-400" />
              </div>
              <SettingLabel
                label="Versao"
                description="Plataforma que voce esta usando"
              />
            </div>
            <span className="text-xs font-medium text-white/30 px-2.5 py-1 rounded-lg
                           bg-white/[0.03] border border-white/[0.06]">
              Web
            </span>
          </SettingRow>
        </section>

        {/* ── Armazenamento ── */}
        <section className="liquid-glass-card rounded-2xl p-5 sm:p-6 mb-5">
          <SectionTitle icon={HardDrive} title="Armazenamento" />
          <Divider />

          <SettingRow>
            <div className="flex items-center gap-3 flex-1 mr-4">
              <div className="flex items-center justify-center w-9 h-9 rounded-xl
                              bg-amber-500/[0.08] border border-amber-500/15">
                <HardDrive className="w-4 h-4 text-amber-400" />
              </div>
              <SettingLabel
                label="Dados salvos"
                description="Espaco usado pelo TechMate no seu navegador"
              />
            </div>
            <span className="text-sm font-mono text-white/40 tabular-nums">{storageSize}</span>
          </SettingRow>

          <Divider />

          <div className="py-3 px-4">
            <div className="flex items-center gap-2 mb-3">
              <Shield className="w-4 h-4 text-white/25" />
              <p className="text-xs text-white/30">
                Todos os dados sao armazenados localmente no seu navegador. Nada e enviado para servidores.
              </p>
            </div>
            <DangerButton onClick={handleClearData}>
              Limpar todos os dados
            </DangerButton>
          </div>
        </section>

        {/* ── Atalhos ── */}
        <section className="liquid-glass-card rounded-2xl p-5 sm:p-6 mb-5" id="shortcuts">
          <SectionTitle icon={Keyboard} title="Atalhos de Teclado" />
          <Divider />

          <div className="space-y-0.5 py-2">
            {[
              { keys: ["Ctrl", "K"], desc: "Abrir busca" },
              { keys: ["Ctrl", "/"], desc: "Ir para blog" },
              { keys: ["Esc"], desc: "Fechar painel/busca" },
              { keys: ["T"], desc: "Ir para o topo" },
            ].map((shortcut) => (
              <div key={shortcut.desc} className="flex items-center justify-between px-4 py-2.5">
                <span className="text-sm text-white/50">{shortcut.desc}</span>
                <div className="flex items-center gap-1">
                  {shortcut.keys.map((key, i) => (
                    <span key={i}>
                      <kbd className="inline-flex items-center justify-center px-2 py-0.5 rounded-md
                                   text-[11px] font-mono font-medium
                                   bg-white/[0.06] border border-white/[0.10]
                                   text-white/40 min-w-[1.75rem]">
                        {key}
                      </kbd>
                      {i < shortcut.keys.length - 1 && (
                        <span className="text-white/15 mx-0.5 text-[10px]">+</span>
                      )}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── Sobre ── */}
        <section className="liquid-glass-card rounded-2xl p-5 sm:p-6 mb-5">
          <SectionTitle icon={Info} title="Sobre o TechMate" />
          <Divider />

          <div className="flex items-center gap-4 py-4 px-4">
            <Logo className="w-14 h-14" glow />
            <div>
              <h3 className="text-base font-bold text-white/90">TechMate</h3>
              <p className="text-xs text-white/35 mt-0.5">Seu parceiro em tech</p>
              <p className="text-[10px] text-white/20 mt-1 font-mono">v1.0.0</p>
            </div>
          </div>

          <Divider />

          <SettingRow>
            <SettingLabel label="Feito com" />
            <div className="flex items-center gap-1 text-red-400/60 text-xs">
              <Heart className="w-3 h-3" />
              <span>por Micael</span>
            </div>
          </SettingRow>

          <Divider />

          <SettingRow>
            <SettingLabel
              label="Tecnologias"
              description="Next.js, React, Tailwind CSS, TypeScript"
            />
            <div className="flex items-center gap-1.5">
              {["Next.js", "React", "Tailwind"].map((tech) => (
                <span
                  key={tech}
                  className="px-2 py-0.5 rounded-md text-[10px] font-medium
                           bg-white/[0.04] border border-white/[0.08] text-white/35"
                >
                  {tech}
                </span>
              ))}
            </div>
          </SettingRow>

          <Divider />

          <div className="py-3 px-4">
            <p className="text-xs text-white/25 leading-relaxed">
              TechMate e um blog independente focado em conteudo tecnico honesto e pratico.
              Tutoriais sobre Linux, Windows, desenvolvimento, seguranca e gaming.
              Sem fluff, sem enrolacao.
            </p>
          </div>
        </section>

        {/* ── Footer subtle ── */}
        <div className="flex items-center justify-center gap-2 pt-4 pb-2">
          <Zap className="w-3 h-3 text-amber-400/30" />
          <p className="text-[11px] text-white/15">TechMate v1.0.0</p>
        </div>

      </div>
    </div>
  );
}
