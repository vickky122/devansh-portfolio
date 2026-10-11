"use client";

import { useEffect, useRef, type CSSProperties, type ReactNode } from "react";
import { gsap, ScrollTrigger, SplitText, useGSAP } from "@/lib/motion/gsap";
import { MQ, motion, trigger, type MotionSet } from "@/lib/motion/motion";

type InkRevealProps = {
  /** element to render; the text inside is what gets revealed */
  as?: "h1" | "h2" | "h3" | "p" | "div" | "span";
  className?: string;
  children: ReactNode;
  /** ScrollTrigger start position */
  start?: string;
  /** seconds before the reveal begins once triggered */
  delay?: number;
  /** change this number to replay the reveal (used by demos) */
  replayToken?: number;
  /**
   * Hold the reveal until <html data-{gate}> exists and a "{gate}" event fires on window,
   * e.g. gate="site-ready" waits for the loader's doors to open.
   */
  gate?: string;
  style?: CSSProperties;
};

/** Lines unmask left to right; a ragged ink blot rides the leading edge, then fades. */
function buildInk(lines: HTMLElement[], m: MotionSet, delay: number) {
  const tl = gsap.timeline({ paused: true, delay });
  gsap.set(lines, { width: "fit-content", position: "relative" });

  lines.forEach((line, i) => {
    const edge = document.createElement("span");
    edge.className = "ink-edge";
    edge.setAttribute("aria-hidden", "true");
    line.appendChild(edge);

    const at = i * m.stagger.lines;
    const lineWidth = line.offsetWidth;
    const edgeWidth = edge.offsetWidth;

    tl.fromTo(
      line,
      { clipPath: "inset(0 100% 0 0)" },
      { clipPath: "inset(0 0% 0 0)", duration: m.duration.reveal, ease: m.ease.reveal },
      at,
    )
      .fromTo(
        edge,
        { x: -edgeWidth },
        { x: lineWidth - edgeWidth, duration: m.duration.reveal, ease: m.ease.reveal },
        at,
      )
      .to(edge, { opacity: 0, duration: 0.35, ease: "power1.out" }, at + m.duration.reveal - 0.2);
  });

  return tl;
}

/**
 * The site's one text-reveal pattern. Splits into lines, unmasks each behind a brush stroke
 * when it scrolls into view. Reduced motion: no split, no sweep, a short fade.
 *
 * Layout: clip-path never changes layout, and the height is locked to its pre-split value
 * until the reveal finishes, so re-wrapping into lines cannot shift what is below.
 * Hidden until initialised via [data-ink="pending"] (see globals.css) so there is no flash.
 */
export function InkReveal({
  as: Tag = "div",
  className,
  children,
  start = trigger.enter,
  delay = 0,
  replayToken = 0,
  gate,
  style,
}: InkRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const timeline = useRef<gsap.core.Timeline | null>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;

      const mm = gsap.matchMedia();
      mm.add({ calm: MQ.reduce, full: MQ.noPreference }, (ctx) => {
        const calm = Boolean(ctx.conditions?.calm);
        const m: MotionSet = calm ? motion.reduced : motion.full;
        let entered = false;
        const gateOpen = () => !gate || document.documentElement.hasAttribute(`data-${gate}`);
        const tryPlay = () => {
          if (entered && gateOpen()) timeline.current?.play();
        };

        el.style.minHeight = `${el.offsetHeight}px`;
        const unlock = () => {
          el.style.minHeight = "";
        };

        const adopt = (tl: gsap.core.Timeline) => {
          tl.eventCallback("onComplete", unlock);
          timeline.current = tl;
          if (entered && gateOpen()) tl.play();
          return tl;
        };

        if (calm) {
          adopt(
            gsap
              .timeline({ paused: true, delay })
              .fromTo(el, { opacity: 0 }, { opacity: 1, duration: m.duration.reveal, ease: m.ease.reveal }),
          );
        } else {
          SplitText.create(el, {
            type: "lines",
            autoSplit: true,
            // "none": the default adds aria-label to the element (prohibited on <p>/<span>); the text stays readable as is
            aria: "none",
            onSplit: (self) => adopt(buildInk(self.lines as HTMLElement[], m, delay)),
          });
        }

        el.dataset.ink = "ready";

        ScrollTrigger.create({
          trigger: el,
          start,
          once: true,
          onEnter: () => {
            entered = true;
            tryPlay();
          },
        });
        if (gate) window.addEventListener(gate, tryPlay);

        return () => {
          if (gate) window.removeEventListener(gate, tryPlay);
          unlock();
          el.dataset.ink = "pending";
        };
      });

      return () => mm.revert();
    },
    { scope: ref },
  );

  useEffect(() => {
    if (replayToken > 0) timeline.current?.restart();
  }, [replayToken]);

  // The cast keeps the ref typing simple; every allowed tag is an HTMLElement.
  const Component = Tag as "div";
  return (
    <Component ref={ref} className={className} style={style} data-ink="pending">
      {children}
    </Component>
  );
}
