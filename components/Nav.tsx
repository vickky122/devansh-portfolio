"use client";

import { useEffect, useRef, useState } from "react";
import { useLenis } from "@/components/LenisProvider";
import { ShojiLink } from "@/components/ShojiTransition";
import { content } from "@/content/content";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/motion/gsap";
import { MQ, motion } from "@/lib/motion/motion";

const hrefFor = (slug: string) => (slug === "intro" ? "/" : `/#${slug}`);

/**
 * Minimal nav: menu, about, works. It hides when you scroll down and returns when you scroll up.
 * "menu" opens a full-screen index of the chapters (Esc closes, focus returns to the button, the page
 * behind stops scrolling). Reduced motion: no slide or fade, it simply appears and disappears.
 */
export function Nav() {
  const bar = useRef<HTMLElement>(null);
  const menu = useRef<HTMLDivElement>(null);
  const button = useRef<HTMLButtonElement>(null);
  const [open, setOpen] = useState(false);
  const lenis = useLenis();

  // hide on scroll down, show on scroll up
  useGSAP(
    () => {
      const el = bar.current;
      if (!el) return;
      const mm = gsap.matchMedia();
      mm.add({ calm: MQ.reduce, full: MQ.noPreference }, (ctx) => {
        const m = ctx.conditions?.calm ? motion.reduced : motion.full;
        let hidden = false;
        const set = (hide: boolean) => {
          if (hide === hidden) return;
          hidden = hide;
          if (ctx.conditions?.calm) gsap.set(el, { autoAlpha: hide ? 0 : 1 });
          else gsap.to(el, { yPercent: hide ? -160 : 0, duration: m.duration.ui, ease: m.ease.ui, overwrite: "auto" });
        };
        const st = ScrollTrigger.create({
          start: 0,
          end: "max",
          onUpdate: (self) => set(self.direction === 1 && self.scroll() > 120),
        });
        return () => st.kill();
      });
      return () => mm.revert();
    },
    { scope: bar },
  );

  // open menu: stop the page behind, move focus in, Esc closes
  useEffect(() => {
    if (!open) return;
    // read the live instance at call time: Lenis can be recreated while the menu is open
    const setScroll = (on: boolean) => (on ? lenis.current?.start() : lenis.current?.stop());
    setScroll(false);
    const html = document.documentElement;
    html.style.overflow = "hidden";
    menu.current?.querySelector<HTMLElement>("a")?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    const trigger = button.current;
    return () => {
      window.removeEventListener("keydown", onKey);
      html.style.overflow = "";
      setScroll(true);
      trigger?.focus();
    };
  }, [open, lenis]);

  const itemClass = "t-label link-brush px-1 py-2";

  return (
    <>
      <nav
        ref={bar}
        aria-label="primary"
        className="surface-sumi fixed top-[calc(var(--frame-inset)+0.75rem)] left-1/2 z-70 flex -translate-x-1/2 items-center gap-4 border border-washi/30 px-3 py-1 md:gap-6 md:px-5"
      >
        <button
          ref={button}
          type="button"
          aria-expanded={open}
          aria-controls="site-menu"
          onClick={() => setOpen((v) => !v)}
          className={itemClass}
        >
          {open ? "close" : "menu"}
        </button>
        <ShojiLink href="/#profile" className={itemClass} onClick={() => setOpen(false)}>
          about
        </ShojiLink>
        <ShojiLink href="/#works" className={itemClass} onClick={() => setOpen(false)}>
          works
        </ShojiLink>
      </nav>

      <div
        ref={menu}
        id="site-menu"
        role="dialog"
        aria-modal="true"
        aria-label="chapters"
        hidden={!open}
        className="surface-sumi fixed inset-0 z-60 grid place-items-center px-10"
      >
        <ol className="space-y-2">
          {content.chapters.map((chapter) => (
            <li key={chapter.slug}>
              <ShojiLink
                href={hrefFor(chapter.slug)}
                onClick={() => setOpen(false)}
                className="t-h2 link-brush flex items-baseline gap-6 [--brush-h:8px]"
              >
                <span className="t-label">{String(chapter.number).padStart(2, "0")}</span>
                {chapter.name}
              </ShojiLink>
            </li>
          ))}
        </ol>
      </div>
    </>
  );
}
