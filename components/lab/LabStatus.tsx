"use client";

import { useEffect, useRef } from "react";
import { useLenis } from "@/components/LenisProvider";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { gsap } from "@/lib/motion/gsap";

/**
 * Live readout for /lab: reduced-motion preference, whether Lenis is driving scroll, and frames per
 * second. The fps figure is a direct DOM write from gsap's ticker, so it adds no React renders.
 */
export function LabStatus() {
  const reduced = useReducedMotion();
  const lenis = useLenis();
  const fpsEl = useRef<HTMLSpanElement>(null);
  const lenisEl = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    let frames = 0;
    let last = performance.now();
    const tick = () => {
      frames++;
      const now = performance.now();
      if (now - last < 500) return;
      if (fpsEl.current) fpsEl.current.textContent = String(Math.round((frames * 1000) / (now - last)));
      if (lenisEl.current) lenisEl.current.textContent = lenis.current ? "lenis" : "native";
      frames = 0;
      last = now;
    };
    gsap.ticker.add(tick);
    return () => gsap.ticker.remove(tick);
  }, [lenis]);

  return (
    <p
      aria-hidden="true"
      className="t-label fixed bottom-8 left-1/2 z-50 -translate-x-1/2 bg-sumi px-3 py-1.5 whitespace-nowrap text-washi tabular-nums"
    >
      <span ref={fpsEl}>--</span> fps · scroll: <span ref={lenisEl}>--</span> · reduced motion:{" "}
      {reduced ? "on" : "off"}
    </p>
  );
}
