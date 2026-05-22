"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * Elements inside .prose-custom that should get scroll-reveal.
 * Headings, images, code blocks, tables, blockquotes and horizontal rules
 * get the full reveal. Regular paragraphs and list items only get a subtle fade.
 */
const PROSE_REVEAL_SELECTOR = [
  ".prose-custom h2",
  ".prose-custom h3",
  ".prose-custom h4",
  ".prose-custom > p",
  ".prose-custom > ul",
  ".prose-custom > ol",
  ".prose-custom > blockquote",
  ".prose-custom > pre",
  ".prose-custom > img",
  ".prose-custom > hr",
  ".prose-custom > table",
].join(", ");

const SUBTLE_SELECTOR = [".prose-custom > p", ".prose-custom > ul", ".prose-custom > ol"].join(", ");

export function ScrollRevealInit() {
  const pathname = usePathname();
  const searchParams = typeof window !== "undefined" ? window.location.search : "";

  useEffect(() => {
    const timer = setTimeout(() => {
      // ── Manual data-scroll-reveal elements ──
      const manualElements = document.querySelectorAll<HTMLElement>(
        "[data-scroll-reveal]"
      );

      // ── Prose children (auto-reveal) ──
      const proseElements = document.querySelectorAll<HTMLElement>(
        PROSE_REVEAL_SELECTOR
      );

      const allElements = [...manualElements, ...proseElements];

      if (allElements.length === 0) return;

      let index = 0;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const el = entry.target as HTMLElement;

              // Skip already revealed (data-scroll-reveal might overlap with prose)
              if (el.classList.contains("revealed")) {
                observer.unobserve(entry.target);
                return;
              }

              // Check explicit delay
              const explicitDelay = el.getAttribute("data-scroll-delay");
              const ms = explicitDelay ? parseInt(explicitDelay, 10) : 0;

              // For prose elements without explicit delay, use a small cascading stagger
              const stagger = !explicitDelay && el.closest(".prose-custom") ? index * 60 : 0;
              index++;

              const apply = () => {
                el.classList.add("revealed");
              };

              if (ms > 0) {
                setTimeout(apply, ms);
              } else if (stagger > 0) {
                setTimeout(apply, Math.min(stagger, 300));
              } else {
                apply();
              }

              observer.unobserve(entry.target);
            }
          });
        },
        {
          threshold: 0.06,
          rootMargin: "0px 0px -30px 0px",
        }
      );

      allElements.forEach((el) => observer.observe(el));

      return () => observer.disconnect();
    }, 100);

    return () => clearTimeout(timer);
  }, [pathname, searchParams]);

  return null;
}
