"use client";

import { useEffect } from "react";

const THEME_KEY = "techmate_theme";

export function ThemeSync() {
  useEffect(() => {
    function sync() {
      try {
        const theme = localStorage.getItem(THEME_KEY);
        if (theme === "light") {
          document.documentElement.classList.remove("dark");
          const m = document.querySelector(
            'meta[name="theme-color"]'
          ) as HTMLMetaElement | null;
          if (m) m.content = "#f8f7f5";
        } else {
          document.documentElement.classList.add("dark");
          const m = document.querySelector(
            'meta[name="theme-color"]'
          ) as HTMLMetaElement | null;
          if (m) m.content = "#08070a";
        }
      } catch {}
    }

    // Sync after hydration
    sync();

    // Re-sync if localStorage changes in another tab
    window.addEventListener("storage", sync);
    return () => window.removeEventListener("storage", sync);
  }, []);

  return null;
}
