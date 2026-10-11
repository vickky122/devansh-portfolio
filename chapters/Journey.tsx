"use client";

import { useRef } from "react";
import { Copy } from "@/components/Copy";
import { InkReveal } from "@/components/InkReveal";
import { content } from "@/content/content";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/motion/gsap";
import { MQ, motion, type MotionSet } from "@/lib/motion/motion";

/**
 * Chapter 03. A vertical brush line draws down the page as you scroll (scrubbed). Each timeline entry
 * sits at its year; when the line reaches it, a small crimson circle stamps onto the line with a soft
 * scale. Desktop alternates entries left and right of the line; phones put every entry on the right.
 * Reduced motion: the line is fully drawn and the stamps are simply there.
 */
export function Journey() {
  const root = useRef<HTMLElement>(null);
  const { journey } = content;

  useGSAP(
    () => {
      const section = root.current;
      if (!section) return;

      const mm = gsap.matchMedia();
      mm.add({ calm: MQ.reduce, full: MQ.noPreference }, (ctx) => {
        if (ctx.conditions?.calm) return;
        const m: MotionSet = motion.full;
        const q = gsap.utils.selector(section);
        const track = q("[data-journey-track]")[0];

        gsap.fromTo(
          q("[data-journey-brush]"),
          { drawSVG: "0%" },
          {
            drawSVG: "100%",
            ease: m.ease.scrub,
            scrollTrigger: { trigger: track, start: "top 60%", end: "bottom 60%", scrub: m.scrub },
          },
        );

        const stamps = q("[data-stamp]");
        gsap.set(stamps, { scale: 0 });
        stamps.forEach((stamp) =>
          ScrollTrigger.create({
            trigger: stamp,
            start: "top 60%",
            once: true,
            onEnter: () => gsap.to(stamp, { scale: 1, duration: m.duration.reveal, ease: m.ease.reveal }),
          }),
        );
      });

      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <section
      ref={root}
      id="journey"
      data-chapter="3"
      data-chapter-name="journey"
      aria-label={journey.title}
      className="surface-sumi px-10 py-28 md:px-28 md:py-40"
    >
      <div className="mx-auto max-w-5xl">
        <p className="t-label mb-6">03 / {journey.title}</p>
        <InkReveal as="h2" className="t-h1" start="top 80%">
          {journey.title}
        </InkReveal>

        <div data-journey-track className="relative mt-24">
          <svg
            aria-hidden="true"
            focusable="false"
            viewBox="0 0 28 1000"
            preserveAspectRatio="none"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            className="absolute top-0 left-5 h-full w-7 -translate-x-1/2 text-washi md:left-1/2"
          >
            <path
              data-journey-brush
              strokeWidth="7"
              d="M14 0C8 120 20 220 13 340S9 560 15 680S19 880 14 1000"
            />
            <path
              data-journey-brush
              strokeWidth="2"
              opacity="0.6"
              d="M10 0C14 160 7 300 12 460S17 760 11 1000"
            />
            <path
              data-journey-brush
              strokeWidth="1.5"
              opacity="0.5"
              d="M18 0C15 200 21 380 17 540S11 800 17 1000"
            />
          </svg>

          <ol>
            {journey.entries.map((entry, i) => (
              <li
                key={`${entry.years}-${entry.title}`}
                className="relative grid pb-24 pl-14 last:pb-0 md:grid-cols-2 md:gap-x-24 md:pl-0"
              >
                <span
                  data-stamp
                  aria-hidden="true"
                  className="absolute top-4 left-5 size-4 -translate-x-1/2 rounded-full bg-crimson ring-4 ring-sumi md:left-1/2"
                />
                <div className={i % 2 === 0 ? "md:col-start-1 md:text-right" : "md:col-start-2"}>
                  <InkReveal as="p" className="t-h2">
                    <Copy value={entry.years} />
                  </InkReveal>
                  <p className="mt-3 text-xl font-semibold md:text-2xl">{entry.title}</p>
                  <p className="t-label mt-2">
                    <Copy value={entry.place} />
                  </p>
                  <p className="t-body mt-4 max-w-md md:inline-block">
                    <Copy value={entry.line} />
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
