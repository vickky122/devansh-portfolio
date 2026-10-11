"use client";

import "lenis/dist/lenis.css";
import Lenis from "lenis";
import { usePathname } from "next/navigation";
import { createContext, useContext, useEffect, useRef, type ReactNode, type RefObject } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { gsap, ScrollTrigger } from "@/lib/motion/gsap";

const LenisContext = createContext<RefObject<Lenis | null> | null>(null);

/** Ref to the live Lenis instance, or null while it is off (reduced motion) or not yet started. */
export function useLenis(): RefObject<Lenis | null> {
  const ref = useContext(LenisContext);
  if (!ref) throw new Error("useLenis must be used inside <LenisProvider>");
  return ref;
}

/**
 * Smooth scroll, driven by gsap's ticker so Lenis and ScrollTrigger share one clock.
 * Mounted in the root layout, so the instance survives route changes.
 * Reduced motion: Lenis is not created at all and the browser's native scrolling is used.
 */
export function LenisProvider({ children }: { children: ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);
  const reduced = useReducedMotion();
  const pathname = usePathname();
  const lastPath = useRef(pathname);

  useEffect(() => {
    if (reduced) return;

    const lenis = new Lenis({ autoRaf: false, duration: 1.1 });
    const tick = (time: number) => lenis.raf(time * 1000);

    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);
    lenisRef.current = lenis;

    return () => {
      gsap.ticker.remove(tick);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, [reduced]);

  // New route: start at the top and re-measure. Runs after the new page's own triggers exist.
  useEffect(() => {
    if (lastPath.current === pathname) return;
    lastPath.current = pathname;
    lenisRef.current?.scrollTo(0, { immediate: true });
    ScrollTrigger.refresh();
  }, [pathname]);

  return <LenisContext.Provider value={lenisRef}>{children}</LenisContext.Provider>;
}
