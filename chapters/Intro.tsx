"use client";

import { useRef, type CSSProperties } from "react";
import { InkReveal } from "@/components/InkReveal";
import { Portrait } from "@/components/Portrait";
import { content, TODO } from "@/content/content";
import { gsap, useGSAP } from "@/lib/motion/gsap";
import { MQ, motion, type MotionSet } from "@/lib/motion/motion";

const buttonClass =
  "t-label inline-block border border-washi px-5 py-3 transition-colors duration-(--dur-micro) hover:bg-washi hover:text-crimson";

/**
 * Chapter 01. The name sits in giant cream caps BEHIND a layered portrait. The section is 200svh tall
 * with a sticky 100svh stage: scrolling splits the two name lines apart and lifts the portrait.
 * Motion: entrance after the loader (name inks in, portrait rises, labels fade up), a scrubbed split
 * on scroll, and gentle cursor parallax between layers (fine pointers only).
 * Reduced motion: the composition appears with a short fade and then stays still; no scrub, no parallax.
 */
export function Intro() {
  const section = useRef<HTMLElement>(null);
  const { first, last } = content.name;
  const { hero } = content;
  const resumeReady = content.resumeUrl !== TODO;

  useGSAP(
    () => {
      const root = section.current;
      if (!root) return;

      const mm = gsap.matchMedia();
      mm.add(
        { calm: MQ.reduce, full: MQ.noPreference, fine: "(hover: hover) and (pointer: fine)" },
        (ctx) => {
          const { calm, fine } = ctx.conditions as { calm: boolean; fine: boolean };
          const m: MotionSet = calm ? motion.reduced : motion.full;
          const q = gsap.utils.selector(root);

          // Entrance, held until the loader's doors open (html[data-site-ready]).
          const portrait = q("[data-portrait]");
          const items = q("[data-intro-item]");
          gsap.set(portrait, { opacity: 0, yPercent: calm ? 0 : 10 });
          gsap.set(items, { opacity: 0, y: m.travel.y });

          const enter = gsap
            .timeline({ paused: true })
            .to(portrait, { opacity: 1, yPercent: 0, duration: m.duration.section, ease: m.ease.reveal }, 0.2)
            .to(
              items,
              { opacity: 1, y: 0, duration: m.duration.reveal, ease: m.ease.reveal, stagger: m.stagger.cards },
              0.7,
            );
          const go = () => enter.play();
          if (document.documentElement.hasAttribute("data-site-ready")) go();
          else window.addEventListener("site-ready", go, { once: true });

          // Scrub: names part, portrait lifts, the small labels fade out of the way.
          if (!calm) {
            gsap
              .timeline({
                scrollTrigger: { trigger: root, start: "top top", end: "bottom bottom", scrub: m.scrub },
              })
              .to(q("[data-name='1']"), { xPercent: -60, ease: m.ease.scrub }, 0)
              .to(q("[data-name='2']"), { xPercent: 60, ease: m.ease.scrub }, 0)
              .to(q("[data-portrait-rise]"), { yPercent: -6, scale: 1.04, ease: m.ease.scrub }, 0)
              .to(q("[data-intro-scrubfade]"), { opacity: 0, ease: m.ease.scrub, duration: 0.35 }, 0);
          }

          // Cursor parallax between layers. Names drift the opposite way for depth.
          let removeMove: (() => void) | undefined;
          if (fine && !calm) {
            const layers = gsap.utils.toArray<SVGGElement>("[data-layer]", root).map((layer) => ({
              depth: Number(layer.dataset.depth),
              x: gsap.quickTo(layer, "x", { duration: 0.8, ease: m.ease.reveal }),
              y: gsap.quickTo(layer, "y", { duration: 0.8, ease: m.ease.reveal }),
            }));
            const nameX = gsap.quickTo(q("[data-name-block]")[0] as Element, "x", {
              duration: 0.9,
              ease: m.ease.reveal,
            });
            const onMove = (e: PointerEvent) => {
              const nx = e.clientX / window.innerWidth - 0.5;
              const ny = e.clientY / window.innerHeight - 0.5;
              layers.forEach((l) => {
                l.x(nx * l.depth * 28 * m.parallax);
                l.y(ny * l.depth * 18 * m.parallax);
              });
              nameX(nx * -14 * m.parallax);
            };
            root.addEventListener("pointermove", onMove, { passive: true });
            removeMove = () => root.removeEventListener("pointermove", onMove);
          }

          return () => {
            window.removeEventListener("site-ready", go);
            removeMove?.();
          };
        },
      );

      return () => mm.revert();
    },
    { scope: section },
  );

  return (
    <section
      ref={section}
      data-chapter="1"
      data-chapter-name="intro"
      className="surface-crimson relative h-[200svh] motion-reduce:h-svh"
    >
      <div className="sticky top-0 h-svh overflow-hidden">
        <h1 className="sr-only">
          {first} {last}, {hero.role}
        </h1>

        {/* the name, behind the portrait */}
        <div
          data-name-block
          aria-hidden="true"
          className="absolute inset-x-0 top-[12svh] z-10 flex flex-col items-center"
        >
          <div data-name="1">
            <InkReveal
              as="span"
              className="t-giant inline-block"
              gate="site-ready"
              start="top 100%"
              style={{ "--ink-edge-w": "0.22em" } as CSSProperties}
            >
              {first}
            </InkReveal>
          </div>
          <div data-name="2">
            <InkReveal
              as="span"
              className="t-giant inline-block"
              gate="site-ready"
              start="top 100%"
              delay={0.25}
              style={{ "--ink-edge-w": "0.22em" } as CSSProperties}
            >
              {last}
            </InkReveal>
          </div>
        </div>

        {/* bleeds below the stage so the shoulders still meet the bottom edge after the portrait lifts */}
        <div data-portrait-rise className="absolute inset-x-0 -bottom-[8svh] z-20 flex justify-center">
          <div data-portrait>
            <Portrait className="h-[72svh] w-auto max-w-none md:h-[78svh]" />
          </div>
        </div>

        {/* small labels */}
        <div
          data-intro-scrubfade
          className="absolute top-[calc(var(--frame-inset)+1.25rem)] left-[calc(var(--frame-inset)+1.25rem)] z-30 md:top-[calc(var(--frame-inset)+2rem)] md:left-[calc(var(--frame-inset)+2.5rem)]"
        >
          <p
            data-intro-item
            className="t-label inline-flex items-center gap-2 rounded-full border border-washi px-3 py-1"
          >
            <span className="size-1.5 rounded-full bg-washi" aria-hidden="true" />
            {hero.availability}
          </p>
        </div>

        <div
          data-intro-scrubfade
          className="absolute inset-x-[calc(var(--frame-inset)+1.25rem)] bottom-[calc(var(--frame-inset)+1.25rem)] z-30 flex flex-col gap-6 md:inset-x-[calc(var(--frame-inset)+2.5rem)] md:bottom-[calc(var(--frame-inset)+2rem)] md:flex-row md:items-end md:justify-between"
        >
          <div className="t-label space-y-1">
            <p data-intro-item>{hero.role}</p>
            <p data-intro-item>{hero.location}</p>
          </div>
          <div data-intro-item className="flex flex-wrap gap-3">
            <a href="#works" className={buttonClass}>
              {hero.ctaWorks}
            </a>
            {resumeReady ? (
              <a href={content.resumeUrl} download className={buttonClass}>
                {hero.ctaResume}
              </a>
            ) : (
              <span
                aria-disabled="true"
                title="resume link is a TODO"
                className="t-label inline-block cursor-not-allowed border border-washi/50 px-5 py-3 text-washi/70"
              >
                {hero.ctaResume}
              </span>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
