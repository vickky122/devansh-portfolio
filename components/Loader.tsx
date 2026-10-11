"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/motion/gsap";
import { MQ, motion, type MotionSet } from "@/lib/motion/motion";

/** sessionStorage key; the inline script in app/layout.tsx reads the same one before first paint */
const KEY = "loader-seen";
/** the title card never flashes by faster than this, however quickly the page loads */
const MIN_MS = { full: 1800, calm: 900 };
/** if something never finishes loading, open the doors anyway */
const GIVE_UP_MS = 8000;

const FONTS = ["1em Anton", "1em Manrope", '1em "JetBrains Mono"'];

/**
 * Film title card shown once per session. A cream screen; an ensō brush circle draws itself while
 * a counter climbs 0 to 100, tied to real loading (fonts, the page, any <img data-preload>). The
 * circle fills crimson like a rising sun, then two shoji doors slide apart onto the intro.
 *
 * Holds the page still (html[data-loading]) until the doors open, then sets html[data-site-ready]
 * and fires a "site-ready" event, which <InkReveal gate="site-ready"> and Lenis wait for.
 * Reduced motion: no sun rise or doors; the card simply fades out.
 */
export function Loader() {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = root.current;
      if (!el) return;
      const html = document.documentElement;

      const markReady = () => {
        html.removeAttribute("data-loading");
        html.setAttribute("data-site-ready", "");
        window.dispatchEvent(new Event("site-ready"));
      };

      let seen = false;
      try {
        seen = sessionStorage.getItem(KEY) === "1";
      } catch {
        /* storage blocked: treat as a first visit */
      }
      if (seen) {
        el.style.display = "none";
        markReady();
        return;
      }

      html.setAttribute("data-loading", "");

      const count = el.querySelector<HTMLElement>("[data-loader-count]");
      const enso = el.querySelector<SVGPathElement>("[data-loader-enso]");
      const sun = el.querySelector<SVGCircleElement>("[data-loader-sun]");
      const content = el.querySelector<HTMLElement>("[data-loader-content]");
      const left = el.querySelector<HTMLElement>("[data-loader-panel='left']");
      const right = el.querySelector<HTMLElement>("[data-loader-panel='right']");
      if (!count || !enso || !sun || !content || !left || !right) return;

      gsap.set(enso, { drawSVG: "0% 0%" });
      gsap.set(sun, { svgOrigin: "100 100", scale: 0.3, y: 30, opacity: 0 });

      const mm = gsap.matchMedia();
      mm.add({ calm: MQ.reduce, full: MQ.noPreference }, (ctx) => {
        const calm = Boolean(ctx.conditions?.calm);
        const m: MotionSet = calm ? motion.reduced : motion.full;
        const minMs = calm ? MIN_MS.calm : MIN_MS.full;
        const startedAt = performance.now();

        // Real loading signals. Each flips to true once; progress is how many are done.
        const done = { fonts: false, page: document.readyState === "complete", images: false };
        Promise.all(FONTS.map((f) => document.fonts.load(f)))
          .catch(() => {})
          .finally(() => {
            done.fonts = true;
          });
        Promise.all(
          Array.from(document.querySelectorAll<HTMLImageElement>("img[data-preload]")).map((img) =>
            img.decode().catch(() => {}),
          ),
        ).finally(() => {
          done.images = true;
        });
        const onLoad = () => {
          done.page = true;
        };
        if (!done.page) window.addEventListener("load", onLoad, { once: true });

        const finish = () => {
          const tl = gsap.timeline({
            onComplete: () => {
              el.style.display = "none";
              try {
                sessionStorage.setItem(KEY, "1");
              } catch {
                /* storage blocked: the loader will simply show again next visit */
              }
            },
          });

          if (calm) {
            gsap.set(sun, { scale: 1, y: 0, opacity: 1 });
            tl.add(markReady, 0.3).to(el, { opacity: 0, duration: m.duration.transition, ease: m.ease.reveal }, 0.3);
            return;
          }

          tl.to(sun, { scale: 1, y: 0, opacity: 1, duration: 1.0, ease: m.ease.reveal })
            .to(content, { opacity: 0, duration: 0.45, ease: "power1.out" }, "+=0.35")
            .add(markReady, ">-0.1")
            .to(left, { xPercent: -100, duration: m.duration.transition, ease: m.ease.move }, "<")
            .to(right, { xPercent: 100, duration: m.duration.transition, ease: m.ease.move }, "<");
        };

        let shown = 0;
        let finished = false;
        const tick = () => {
          const elapsed = performance.now() - startedAt;
          const real =
            elapsed > GIVE_UP_MS ? 1 : (Number(done.fonts) + Number(done.page) + Number(done.images)) / 3;
          const target = Math.min(real, elapsed / minMs) * 100;
          shown = gsap.utils.interpolate(shown, target, 1 - Math.pow(0.88, gsap.ticker.deltaRatio()));
          const value = target >= 100 && shown > 99.4 ? 100 : shown;

          count.textContent = String(Math.round(value)).padStart(3, "0");
          gsap.set(enso, { drawSVG: `0% ${value}%` });

          if (value >= 100 && !finished) {
            finished = true;
            gsap.ticker.remove(tick);
            finish();
          }
        };
        gsap.ticker.add(tick);

        return () => {
          gsap.ticker.remove(tick);
          window.removeEventListener("load", onLoad);
        };
      });

      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <div ref={root} className="loader fixed inset-0 z-100" role="status" aria-label="loading">
      <div
        data-loader-panel="left"
        className="shoji surface-washi absolute inset-y-0 left-0 w-1/2"
        aria-hidden="true"
      />
      <div
        data-loader-panel="right"
        className="shoji surface-washi absolute inset-y-0 right-0 w-1/2"
        aria-hidden="true"
      />
      <div data-loader-content className="absolute inset-0 grid place-items-center text-sumi" aria-hidden="true">
        <div className="flex flex-col items-center gap-6">
          <svg viewBox="0 0 200 200" className="size-44 md:size-56" fill="none" focusable="false">
            <defs>
              <filter id="enso-rough" x="-10%" y="-10%" width="120%" height="120%">
                <feTurbulence type="fractalNoise" baseFrequency="0.05 0.2" numOctaves="2" seed="7" result="n" />
                <feDisplacementMap in="SourceGraphic" in2="n" scale="5" xChannelSelector="R" yChannelSelector="G" />
              </filter>
            </defs>
            <g filter="url(#enso-rough)">
              <circle data-loader-sun cx="100" cy="100" r="62" className="fill-crimson" />
              <path
                data-loader-enso
                d="M104 24C150 22 182 58 178 104C174 150 134 180 92 176C48 172 22 134 26 92C30 52 62 26 100 24"
                stroke="currentColor"
                strokeWidth="9"
                strokeLinecap="round"
              />
            </g>
          </svg>
          <p className="t-label tabular-nums" data-loader-count>
            000
          </p>
        </div>
      </div>
    </div>
  );
}
