"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  type ComponentProps,
  type MouseEvent,
  type ReactNode,
} from "react";
import { gsap, useGSAP } from "@/lib/motion/gsap";
import { MQ, motion } from "@/lib/motion/motion";

type ShojiContext = { go: (href: string) => void };
const Ctx = createContext<ShojiContext | null>(null);

/** Route changes close two shoji doors, navigate, then open them. */
export function useShoji(): ShojiContext {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useShoji must be used inside <ShojiProvider>");
  return ctx;
}

/** If the new route has not appeared after this long, open the doors anyway. */
const GIVE_UP_MS = 3000;

/**
 * Page transitions. Two shoji doors slide shut, the route changes behind them, then they slide open.
 * Implemented with gsap rather than the View Transitions API so it behaves the same in every browser.
 * Reduced motion: no doors, a short cross-fade through the paper colour.
 */
export function ShojiProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const root = useRef<HTMLDivElement>(null);
  const pending = useRef<{ path: string; giveUp: ReturnType<typeof setTimeout> } | null>(null);

  const calm = () => window.matchMedia(MQ.reduce).matches;

  useGSAP(
    () => {
      const el = root.current;
      if (!el) return;
      gsap.set(el, { autoAlpha: 0 });
      gsap.set(el.querySelector("[data-shoji='left']"), { xPercent: -100 });
      gsap.set(el.querySelector("[data-shoji='right']"), { xPercent: 100 });
    },
    { scope: root },
  );

  const open = useCallback(() => {
    const el = root.current;
    if (!el) return;
    const left = el.querySelector("[data-shoji='left']");
    const right = el.querySelector("[data-shoji='right']");
    const m = calm() ? motion.reduced : motion.full;
    const tl = gsap.timeline();
    if (calm()) {
      tl.to(el, { autoAlpha: 0, duration: m.duration.transition, ease: m.ease.reveal });
    } else {
      tl.to(left, { xPercent: -100, duration: m.duration.transition, ease: m.ease.move })
        .to(right, { xPercent: 100, duration: m.duration.transition, ease: m.ease.move }, "<")
        .set(el, { autoAlpha: 0 });
    }
  }, []);

  const go = useCallback(
    (href: string) => {
      const el = root.current;
      if (!el || pending.current) return;
      const path = new URL(href, window.location.href).pathname;
      const left = el.querySelector("[data-shoji='left']");
      const right = el.querySelector("[data-shoji='right']");
      const m = calm() ? motion.reduced : motion.full;

      const navigate = () => {
        pending.current = { path, giveUp: setTimeout(() => finish(), GIVE_UP_MS) };
        router.push(href);
      };
      const finish = () => {
        if (pending.current) clearTimeout(pending.current.giveUp);
        pending.current = null;
        open();
      };

      // The doors are closing already; mark that a navigation is under way so a second click is ignored.
      pending.current = { path, giveUp: setTimeout(() => {}, 0) };
      if (calm()) {
        gsap.set([left, right], { xPercent: 0 });
        gsap.to(el, { autoAlpha: 1, duration: m.duration.transition, ease: m.ease.reveal, onComplete: navigate });
      } else {
        gsap.set(el, { autoAlpha: 1 });
        gsap
          .timeline({ onComplete: navigate })
          .to(left, { xPercent: 0, duration: m.duration.transition, ease: m.ease.move })
          .to(right, { xPercent: 0, duration: m.duration.transition, ease: m.ease.move }, "<");
      }
    },
    [open, router],
  );

  // The new route is in: open the doors.
  useEffect(() => {
    const p = pending.current;
    if (!p || p.path !== pathname) return;
    clearTimeout(p.giveUp);
    pending.current = null;
    open();
  }, [pathname, open]);

  const value = useMemo(() => ({ go }), [go]);

  return (
    <Ctx.Provider value={value}>
      {children}
      {/* visibility:hidden from the first byte: until hydration the doors must not flash over the page */}
      <div ref={root} aria-hidden="true" style={{ visibility: "hidden" }} className="pointer-events-none fixed inset-0 z-90">
        <div data-shoji="left" className="shoji surface-washi absolute inset-y-0 left-0 w-1/2" />
        <div data-shoji="right" className="shoji surface-washi absolute inset-y-0 right-0 w-1/2" />
      </div>
    </Ctx.Provider>
  );
}

/** A Link that closes the shoji doors for a page change. In-page hashes and external links behave normally. */
export function ShojiLink({ href, onClick, ...rest }: Omit<ComponentProps<typeof Link>, "href"> & { href: string }) {
  const { go } = useShoji();
  const pathname = usePathname();

  const handle = (e: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(e);
    if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    if (/^(https?:|mailto:|tel:)/.test(href) || rest.target === "_blank") return;
    const target = new URL(href, window.location.href);
    if (target.pathname === pathname) return;
    e.preventDefault();
    go(href);
  };

  return <Link href={href} onClick={handle} {...rest} />;
}
