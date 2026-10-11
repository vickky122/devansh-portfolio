"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/motion/gsap";
import { MQ, motion, trigger } from "@/lib/motion/motion";

/**
 * A thin gold hairline that draws left to right when it scrolls into view.
 * Reduced motion: it is simply there.
 */
export function GoldLine({ className = "", delay = 0 }: { className?: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      const mm = gsap.matchMedia();
      mm.add(MQ.noPreference, () => {
        const m = motion.full;
        gsap.fromTo(
          el,
          { scaleX: 0 },
          {
            scaleX: 1,
            duration: m.duration.reveal,
            delay,
            ease: m.ease.reveal,
            scrollTrigger: { trigger: el, start: trigger.enter, once: true },
          },
        );
      });
      return () => mm.revert();
    },
    { scope: ref },
  );

  return <div ref={ref} aria-hidden="true" className={`h-px origin-left bg-gold ${className}`} />;
}
