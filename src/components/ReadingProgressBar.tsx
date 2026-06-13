"use client";

import { motion, useScroll, useSpring } from "framer-motion";
import { useEffect, useState } from "react";

export function ReadingProgressBar() {
  const { scrollYProgress } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.div
      className="fixed left-0 right-0 h-[3px] bg-amber-500 origin-left z-[100] sm:h-1"
      style={{
        top: 'env(safe-area-inset-top, 0)',
        marginTop: scrolled ? (window.innerWidth < 640 ? '56px' : '64px') : '0px',
        scaleX,
        boxShadow: "0 2px 10px rgba(245, 158, 11, 0.4)"
      }}
    />
  );
}
