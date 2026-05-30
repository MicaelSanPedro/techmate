"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [displayChildren, setDisplayChildren] = useState(children);
  const [transitionKey, setTransitionKey] = useState(pathname);

  useEffect(() => {
    window.scrollTo(0, 0);
    setDisplayChildren(children);
    setTransitionKey(pathname);
  }, [pathname, children]);

  return (
    <div key={transitionKey} className="page-transition">
      {displayChildren}
    </div>
  );
}
