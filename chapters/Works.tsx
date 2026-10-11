"use client";

import { useRef } from "react";
import { InkReveal } from "@/components/InkReveal";
import { ScreenshotSlot } from "@/components/ScreenshotSlot";
import { ShojiLink } from "@/components/ShojiTransition";
import { content, type Project } from "@/content/content";
import { gsap, useGSAP } from "@/lib/motion/gsap";
import { MQ, motion, type MotionSet } from "@/lib/motion/motion";

/**
 * One project, as its own crimson chapter: a 200svh section with a sticky 100svh stage. The giant name
 * inks in; scrolling slides a paper panel off the screenshot to reveal it. The frame's side label and
 * counter switch to this project (data-chapter-name).
 * Reduced motion: no panel, the screenshot is simply shown, and the chapter is one screen tall.
 */
function ProjectChapter({ project, index, total }: { project: Project; index: number; total: number }) {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const section = root.current;
      if (!section) return;
      const q = gsap.utils.selector(section);

      const mm = gsap.matchMedia();
      mm.add({ calm: MQ.reduce, full: MQ.noPreference }, (ctx) => {
        if (ctx.conditions?.calm) {
          gsap.set(q("[data-panel]"), { display: "none" });
          return;
        }
        const m: MotionSet = motion.full;
        gsap
          .timeline({ scrollTrigger: { trigger: section, start: "top top", end: "bottom bottom", scrub: m.scrub } })
          .to(q("[data-panel]"), { xPercent: 105, ease: m.ease.scrub, duration: 0.6 }, 0)
          .fromTo(q("[data-shot]"), { scale: 1.1 }, { scale: 1, ease: m.ease.scrub, duration: 1 }, 0);
      });

      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <section
      ref={root}
      id={index === 0 ? "works" : undefined}
      data-chapter="4"
      data-chapter-name={project.name}
      aria-label={project.name}
      className="surface-crimson relative h-[200svh] border-t border-washi/25 motion-reduce:h-svh"
    >
      <div className="sticky top-0 flex h-svh items-center overflow-hidden px-10 md:px-28">
        <div className="mx-auto grid w-full max-w-7xl items-center gap-10 md:grid-cols-12">
          <div className="md:col-span-5">
            <p className="t-label mb-6">
              04 / {content.works.title} · {index + 1} of {total}
            </p>
            <InkReveal
              as="h2"
              className="t-h1"
              start="top 75%"
              style={{ fontSize: "clamp(2.75rem, 7.5vw, 7rem)" }}
            >
              {project.name}
            </InkReveal>
            <p className="t-body mt-6 max-w-sm">{project.tagline}</p>
            <ul className="mt-6 flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <li key={tag} className="t-label rounded-full border border-washi px-3 py-1">
                  {tag}
                </li>
              ))}
            </ul>
            <ShojiLink
              href={`/works/${project.slug}`}
              className="t-label mt-10 inline-block border border-washi px-5 py-3 transition-colors duration-(--dur-micro) hover:bg-washi hover:text-crimson"
            >
              open case study
            </ShojiLink>
          </div>

          <div className="relative aspect-[16/10] overflow-hidden md:col-span-7">
            <div data-shot className="h-full w-full">
              <ScreenshotSlot project={project} priority={index === 0} />
            </div>
            <div data-panel aria-hidden="true" className="surface-washi absolute inset-0 z-10" />
          </div>
        </div>
      </div>
    </section>
  );
}

/** Chapter 04. */
export function Works() {
  const { projects } = content.works;
  return (
    <>
      {projects.map((project, i) => (
        <ProjectChapter key={project.slug} project={project} index={i} total={projects.length} />
      ))}
    </>
  );
}
