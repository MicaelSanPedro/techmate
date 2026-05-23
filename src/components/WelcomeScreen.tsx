"use client";

import { useState, useEffect, useRef } from "react";
import { Logo } from "./Logo";
import { Sparkles } from "lucide-react";

const STORAGE_KEY = "techmate_username";

function getStoredName(): string | null {
  if (typeof window === "undefined") return null;
  try {
    return localStorage.getItem(STORAGE_KEY);
  } catch {
    return null;
  }
}

function storeName(name: string) {
  try {
    localStorage.setItem(STORAGE_KEY, name);
    window.dispatchEvent(new CustomEvent("techmate:username-set"));
  } catch {
    /* ignore */
  }
}

export function getUsername(): string | null {
  return getStoredName();
}

export function WelcomeScreen() {
  const [mounted, setMounted] = useState(false);
  const [phase, setPhase] = useState<"enter" | "ask" | "exit">(
    "enter"
  );
  const [isVisible, setIsVisible] = useState(false);
  const [nameInput, setNameInput] = useState("");
  const [userName, setUserName] = useState("");
  const [isReturning, setIsReturning] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // Hydrate from localStorage
  useEffect(() => {
    setMounted(true);
    const stored = getStoredName();
    if (stored) {
      setIsVisible(true);
      setUserName(stored);
      setIsReturning(true);
    } else {
      setIsVisible(true);
      setIsReturning(false);
    }
  }, []);

  // Phase transitions
  useEffect(() => {
    if (!mounted || !isVisible) return;

    if (phase === "enter") {
      if (isReturning) {
        // Returning user — show welcome back then exit
        const exitTimer = setTimeout(() => setPhase("exit"), 2800);
        return () => clearTimeout(exitTimer);
      } else {
        // New user — go to name input after splash
        const askTimer = setTimeout(() => setPhase("ask"), 1800);
        return () => clearTimeout(askTimer);
      }
    }

    if (phase === "exit") {
      const doneTimer = setTimeout(() => setIsVisible(false), 900);
      return () => clearTimeout(doneTimer);
    }
  }, [phase, mounted, isVisible, isReturning]);

  // Auto-focus input when ask phase starts
  useEffect(() => {
    if (phase === "ask") {
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [phase]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = nameInput.trim();
    if (!trimmed) return;
    storeName(trimmed);
    setUserName(trimmed);
    setIsReturning(true);
    setPhase("exit");
  };

  // Prevent flash on SSR
  if (!mounted) return null;
  if (!isVisible) return null;

  const isExiting = phase === "exit";
  const showSplash = phase === "enter";
  const showAsk = phase === "ask";

  return (
    <div
      className={`welcome-overlay ${showSplash ? "welcome-enter" : "welcome-hold"} ${isExiting ? "welcome-exit" : ""}`}
      aria-hidden="true"
      style={isExiting ? { pointerEvents: "none" } : undefined}
    >
      {/* Letterbox bars */}
      <div className="welcome-letterbox welcome-letterbox--top" />
      <div className="welcome-letterbox welcome-letterbox--bottom" />

      {/* Vignette */}
      <div className="welcome-vignette" />

      {/* Ambient glow behind logo */}
      <div className="welcome-glow" />

      {/* Content */}
      <div className="welcome-content">
        {/* Logo */}
        <div className="welcome-logo-wrap">
          <Logo
            className={`w-20 h-20 sm:w-24 sm:h-24`}
            glow
            variant="amber"
          />
        </div>

        {/* ── New user splash ── */}
        {showSplash && !isReturning && (
          <div className="welcome-text-group">
            <h1 className="welcome-title">
              <span className="welcome-title--tech">Tech</span>
              <span className="welcome-title--mate shimmer-text">Mate</span>
            </h1>
            <p className="welcome-tagline">Bem-vindo ao seu parceiro em tech</p>
          </div>
        )}

        {/* ── Returning user ── */}
        {showSplash && isReturning && (
          <div className="welcome-text-group">
            <h1 className="welcome-title">
              <span className="welcome-title--tech">Bem-vindo de volta, </span>
              <span className="welcome-title--mate shimmer-text">{userName}</span>
              <span className="welcome-title--tech">!</span>
            </h1>
            <p className="welcome-tagline">Bom te ver por aqui</p>
          </div>
        )}

        {/* ── Ask name phase ── */}
        {showAsk && (
          <div className="welcome-name-section">
            <h2 className="welcome-name-heading">
              <Sparkles className="w-5 h-5 text-amber-400 mb-1" />
              Qual é o seu nome?
            </h2>
            <form onSubmit={handleSubmit} className="welcome-name-form">
              <input
                ref={inputRef}
                type="text"
                value={nameInput}
                onChange={(e) => setNameInput(e.target.value)}
                placeholder="Seu nome..."
                maxLength={24}
                className="welcome-name-input"
                autoComplete="off"
              />
              <button
                type="submit"
                disabled={!nameInput.trim()}
                className="welcome-name-btn"
              >
                Entrar
              </button>
            </form>
          </div>
        )}

        {/* Decorative line */}
        <div className="welcome-line" />
      </div>

      {/* Subtle particles ring */}
      <div className="welcome-ring" />
      <div className="welcome-ring welcome-ring--outer" />
    </div>
  );
}
