"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/motion/gsap";
import { MQ, motion, type MotionSet } from "@/lib/motion/motion";

const INTERACTIVE = "a, button, summary, [role='button'], [data-cursor]";

/**
 * A small ink dot that trails the pointer and grows over links and buttons. The native cursor stays.
 * Only exists for a fine pointer with hover (hidden on touch). Its colour follows the surface
 * under it (the --edge variable set by .surface-*). Reduced motion: the dot tracks the pointer
 * exactly and changes size instantly, with no easing.
 */
export function Cursor() {
  const dot = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = dot.current;
      if (!el) return;

      const mm = gsap.matchMedia();
      mm.add({ fine: "(hover: hover) and (pointer: fine)", calm: MQ.reduce }, (ctx) => {
        if (!ctx.conditions?.fine) return;

        const calm = Boolean(ctx.conditions.calm);
        const m: MotionSet = calm ? motion.reduced : motion.full;

        gsap.set(el, { xPercent: -50, yPercent: -50, opacity: 0, scale: 1 });
        const moveX = calm ? (v: number) => gsap.set(el, { x: v }) : gsap.quickTo(el, "x", { duration: m.duration.micro, ease: m.ease.ui });
        const moveY = calm ? (v: number) => gsap.set(el, { y: v }) : gsap.quickTo(el, "y", { duration: m.duration.micro, ease: m.ease.ui });

        let visible = false;
        let grown = false;

        const show = (x: number, y: number) => {
          gsap.set(el, { x, y });
          gsap.to(el, { opacity: 1, duration: m.duration.micro });
          visible = true;
        };
        const hide = () => {
          if (!visible) return;
          visible = false;
          gsap.to(el, { opacity: 0, duration: m.duration.micro });
        };

        const onMove = (e: PointerEvent) => {
          if (e.pointerType !== "mouse" && e.pointerType !== "pen") return;
          if (!visible) show(e.clientX, e.clientY);
          moveX(e.clientX);
          moveY(e.clientY);
        };

        const onOver = (e: PointerEvent) => {
          const target = e.target as Element | null;
          if (!target) return;
          const colour = getComputedStyle(target).getPropertyValue("--edge").trim();
          if (colour) gsap.set(el, { backgroundColor: colour });

          const interactive = Boolean(target.closest(INTERACTIVE));
          if (interactive === grown) return;
          grown = interactive;
          // translucent when grown, so the link text underneath stays readable
          const scale = interactive ? 3.5 : 1;
          const opacity = interactive ? 0.4 : 1;
          if (calm) gsap.set(el, { scale, opacity });
          else gsap.to(el, { scale, opacity, duration: m.duration.micro, ease: m.ease.ui, overwrite: "auto" });
        };

        window.addEventListener("pointermove", onMove, { passive: true });
        document.addEventListener("pointerover", onOver, { passive: true });
        document.documentElement.addEventListener("pointerleave", hide);

        return () => {
          window.removeEventListener("pointermove", onMove);
          document.removeEventListener("pointerover", onOver);
          document.documentElement.removeEventListener("pointerleave", hide);
        };
      });

      return () => mm.revert();
    },
    { scope: dot },
  );

  return (
    <div
      ref={dot}
      aria-hidden="true"
      className="pointer-events-none fixed top-0 left-0 z-60 size-3 rounded-full bg-sumi opacity-0"
    />
  );
}
