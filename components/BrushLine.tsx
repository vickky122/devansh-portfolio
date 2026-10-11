"use client";

import { useEffect, useRef } from "react";
import { BrushStroke } from "@/components/BrushStroke";
import { gsap, useGSAP } from "@/lib/motion/gsap";
import { MQ, motion, trigger } from "@/lib/motion/motion";

type BrushLineProps = {
  /** sizing and colour (the stroke uses currentColor) */
  className?: string;
  /** tie the drawing to scroll position instead of playing once on enter */
  scrub?: boolean;
  /** change this number to redraw (used by demos) */
  replayToken?: number;
};

/**
 * A brush stroke that draws itself with DrawSVG. Plays once on enter, or scrubs with scroll.
 * Reduced motion: nothing animates and the stroke is simply shown, fully drawn.
 */
export function BrushLine({ className, scrub = false, replayToken = 0 }: BrushLineProps) {
  const scope = useRef<HTMLDivElement>(null);
  const tween = useRef<gsap.core.Tween | null>(null);

  useGSAP(
    () => {
      const root = scope.current;
      if (!root) return;
      const paths = gsap.utils.toArray<SVGPathElement>("[data-brush]", root);
      const mm = gsap.matchMedia();

      mm.add(MQ.noPreference, () => {
        const m = motion.full;
        tween.current = gsap.fromTo(
          paths,
          { drawSVG: "0%" },
          {
            drawSVG: "100%",
            duration: m.duration.section,
            ease: scrub ? m.ease.scrub : m.ease.reveal,
            stagger: scrub ? 0 : 0.15,
            scrollTrigger: scrub
              ? { trigger: root, start: trigger.enter, end: "bottom 40%", scrub: m.scrub }
              : { trigger: root, start: trigger.enter, once: true },
          },
        );
      });

      return () => mm.revert();
    },
    { scope, dependencies: [scrub] },
  );

  useEffect(() => {
    if (replayToken > 0) tween.current?.restart();
  }, [replayToken]);

  return (
    <div ref={scope} className={className}>
      <BrushStroke className="w-full" />
    </div>
  );
}
