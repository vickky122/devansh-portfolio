"use client";

import { useRef } from "react";
import { Frame } from "@/components/Frame";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/motion/gsap";
import { MQ, motion, type MotionSet } from "@/lib/motion/motion";
import { setText } from "@/lib/dom";

type ChapterCounterProps = {
  /** shown on the left rail */
  siteName: string;
  /** how many chapters the counter counts to (the "06" in 01 / 06) */
  total: number;
  /** name and number shown before any chapter has been measured */
  initial: { number: number; name: string };
};

const pad = (n: number) => String(n).padStart(2, "0");

/**
 * Renders the Frame and keeps its counter, right rail and line colour in step with the page.
 * A chapter is any element with data-chapter="<n>" data-chapter-name="<name>" and optionally
 * data-chapter-tone="ink" (ink line on a cream chapter). The chapter crossing the middle of the
 * viewport is the current one. Updates are direct DOM writes, never React state.
 * Reduced motion: the labels still update, instantly, with no fade.
 */
export function ChapterCounter({ siteName, total, initial }: ChapterCounterProps) {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const frame = root.current?.querySelector<HTMLElement>(".frame");
      const counter = frame?.querySelector<HTMLElement>("[data-counter-current]");
      const rail = frame?.querySelector<HTMLElement>("[data-rail-chapter]");
      if (!frame || !counter || !rail) return;

      const mm = gsap.matchMedia();
      mm.add({ calm: MQ.reduce, full: MQ.noPreference }, (ctx) => {
        const m: MotionSet = ctx.conditions?.calm ? motion.reduced : motion.full;
        let current = "";

        const apply = (section: HTMLElement) => {
          const number = Number(section.dataset.chapter);
          // chapter 04 holds one section per project: the name (and tone) can change within a number
          const key = `${number}|${section.dataset.chapterName}|${section.dataset.chapterTone}`;
          if (key === current) return;
          current = key;

          setText(counter, pad(number));
          setText(rail, section.dataset.chapterName ?? "");
          frame.dataset.tone = section.dataset.chapterTone === "ink" ? "ink" : "cream";

          if (!ctx.conditions?.calm) {
            gsap.fromTo([counter, rail], { opacity: 0 }, { opacity: 1, duration: m.duration.ui, ease: m.ease.ui });
          }
        };

        // document-level on purpose: inside useGSAP, gsap's own selector helpers are scoped to this component
        const sections = Array.from(document.querySelectorAll<HTMLElement>("[data-chapter]"));
        sections.forEach((section) =>
          ScrollTrigger.create({
            trigger: section,
            start: "top 50%",
            end: "bottom 50%",
            onToggle: (self) => {
              if (self.isActive) apply(section);
            },
          }),
        );

        // Sync with wherever the page already is (reload mid-page, hash links).
        const middle = window.innerHeight / 2;
        const active = sections.find((s) => {
          const r = s.getBoundingClientRect();
          return r.top <= middle && r.bottom >= middle;
        });
        if (active) apply(active);
      });

      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <div ref={root}>
      <Frame
        chapter={initial.number}
        total={total}
        chapterName={initial.name}
        siteName={siteName}
      />
    </div>
  );
}
