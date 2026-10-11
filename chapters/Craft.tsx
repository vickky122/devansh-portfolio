"use client";

import { useRef, type CSSProperties } from "react";
import { Copy } from "@/components/Copy";
import { InkReveal } from "@/components/InkReveal";
import { useLenis } from "@/components/LenisProvider";
import { content } from "@/content/content";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/motion/gsap";
import { motion, type MotionSet } from "@/lib/motion/motion";

/** how much extra scroll the stack holds still at the end, in card-steps */
const HOLD = 0.6;

/**
 * Chapter 05. On ink black. From 768px up the chapter pins and the skill cards stack and reveal one by one
 * as you scroll, each with a big number, the skill and one line on how it was used; a thin crimson line
 * shows how far through the cards you are. Phones: no pin, each card reveals as it enters.
 * Keyboard: cards are focusable and focusing one scrolls the stack to it. Reduced motion: a plain
 * column of cards with nothing pinned or animated.
 */
export function Craft() {
  const root = useRef<HTMLElement>(null);
  const lenis = useLenis();
  const { craft } = content;
  const n = craft.skills.length;

  useGSAP(
    () => {
      const section = root.current;
      if (!section) return;
      const q = gsap.utils.selector(section);
      const cards = q("[data-card]");

      const mm = gsap.matchMedia();
      mm.add(
        {
          stack: "(min-width: 768px) and (prefers-reduced-motion: no-preference)",
          flow: "(max-width: 767px) and (prefers-reduced-motion: no-preference)",
        },
        (ctx) => {
          const m: MotionSet = motion.full;

          if (ctx.conditions?.flow) {
            cards.forEach((card) =>
              gsap.from(card, {
                opacity: 0,
                y: m.travel.y,
                duration: m.duration.reveal,
                ease: m.ease.reveal,
                scrollTrigger: { trigger: card, start: "top 88%", once: true },
              }),
            );
            return;
          }

          gsap.set(cards.slice(1), { yPercent: 110 });
          const tl = gsap.timeline({
            scrollTrigger: { trigger: section, start: "top top", end: "bottom bottom", scrub: m.scrub },
          });
          cards.slice(1).forEach((card, i) => {
            tl.to(card, { yPercent: 0, ease: m.ease.scrub, duration: 1 }, i);
            tl.to(cards[i], { scale: 0.94, y: -28, opacity: 0.45, ease: m.ease.scrub, duration: 1 }, i);
          });
          tl.fromTo(q("[data-progress]"), { scaleX: 0 }, { scaleX: 1, ease: "none", duration: n - 1 }, 0);
          tl.to({}, { duration: HOLD });
        },
      );

      return () => mm.revert();
    },
    { scope: root },
  );

  /** Tabbing to a card brings the stack to it, so a keyboard user is never looking at a hidden card. */
  const reveal = (i: number) => {
    const section = root.current;
    if (!section || !window.matchMedia("(min-width: 768px) and (prefers-reduced-motion: no-preference)").matches) {
      return;
    }
    const progress = i / (n - 1 + HOLD);
    const top = section.getBoundingClientRect().top + window.scrollY;
    const y = top + progress * (section.offsetHeight - window.innerHeight);
    if (lenis.current) lenis.current.scrollTo(y);
    else window.scrollTo(0, y);
    ScrollTrigger.update();
  };

  return (
    <section
      ref={root}
      id="craft"
      data-chapter="5"
      data-chapter-name="craft"
      aria-label={craft.title}
      style={{ "--n": n } as CSSProperties}
      className="surface-sumi px-10 py-28 md:px-28 stack:h-[calc((var(--n)+1)*80svh)] stack:py-0"
    >
      <div className="mx-auto grid max-w-7xl gap-12 md:grid-cols-12 md:gap-10 stack:sticky stack:top-0 stack:h-svh stack:items-center">
        <div className="md:col-span-4">
          <p className="t-label mb-6">05 / {craft.title}</p>
          <InkReveal as="h2" className="t-h1" start="top 80%">
            {craft.title}
          </InkReveal>
          <div aria-hidden="true" className="mt-10 h-0.5 w-full bg-washi/20 md:max-w-xs">
            <div data-progress className="h-full origin-left bg-crimson" />
          </div>
        </div>

        <ul className="space-y-6 md:col-span-8 stack:relative stack:h-[60svh] stack:space-y-0 stack:overflow-hidden">
          {craft.skills.map((skill, i) => (
            <li
              key={skill.name}
              data-card
              tabIndex={0}
              onFocus={() => reveal(i)}
              className="surface-sumi flex flex-col justify-between gap-8 border border-washi/40 p-8 md:p-12 stack:absolute stack:inset-0"
            >
              <p className="font-display text-[clamp(5rem,12vw,10rem)] leading-none text-crimson" aria-hidden="true">
                {String(i + 1).padStart(2, "0")}
              </p>
              <div>
                <h3 className="t-h2">{skill.name}</h3>
                <p className="t-body mt-4 max-w-lg">
                  <Copy value={skill.line} />
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
