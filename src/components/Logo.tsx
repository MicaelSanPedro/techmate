/**
 * TechMate Logo
 * Uses the custom PNG logo image with optional glow.
 * Source: 1536x1024 (3:2 ratio)
 */
import Image from "next/image";

interface LogoProps {
  className?: string;
  glow?: boolean;
  variant?: "amber" | "dark";
}

export function Logo({ className = "w-10 h-10", glow = false }: LogoProps) {
  return (
    <Image
      src="/logo.png"
      alt="TechMate"
      width={1536}
      height={1024}
      className={`object-cover ${className}`}
      style={
        glow
          ? { filter: "drop-shadow(0 0 12px rgba(249, 189, 24, 0.45))" }
          : undefined
      }
    />
  );
}
