/**
 * Motion tokens. Pure data (no gsap import) so it can be read anywhere.
 * Rules from the plan: slow and deliberate, power3.out, 0.9 to 1.2 s for reveals, nothing bounces.
 * Every value has a reduced-motion twin with the same shape: no travel, no scroll-linked
 * motion, short fades only. The same story, told calmly.
 */

export type MotionSet = {
  ease: { reveal: string; move: string; ui: string; scrub: string };
  /** seconds */
  duration: {
    micro: number; // hover, focus
    ui: number; // menus, toasts
    reveal: number; // ink reveals, card entrances
    section: number; // brush lines, chapter changes
    transition: number; // shoji doors
  };
  /** seconds between siblings */
  stagger: { lines: number; cards: number; chars: number };
  /** ScrollTrigger scrub smoothing in seconds, or false for no scroll-linked motion */
  scrub: number | false;
  /** entrance travel in px */
  travel: { x: number; y: number };
  /** multiplier for cursor and scroll parallax; 0 disables */
  parallax: number;
};

export const motion = {
  full: {
    ease: {
      reveal: "power3.out",
      move: "power3.inOut",
      ui: "power2.out",
      scrub: "none",
    },
    duration: { micro: 0.25, ui: 0.5, reveal: 1.0, section: 1.2, transition: 1.0 },
    stagger: { lines: 0.12, cards: 0.1, chars: 0.02 },
    scrub: 0.6,
    travel: { x: 48, y: 32 },
    parallax: 1,
  },
  reduced: {
    ease: {
      reveal: "power1.out",
      move: "power1.out",
      ui: "power1.out",
      scrub: "none",
    },
    duration: { micro: 0.15, ui: 0.3, reveal: 0.5, section: 0.5, transition: 0.4 },
    stagger: { lines: 0, cards: 0, chars: 0 },
    scrub: false,
    travel: { x: 0, y: 0 },
    parallax: 0,
  },
} as const satisfies Record<"full" | "reduced", MotionSet>;

/** Shared ScrollTrigger start positions. */
export const trigger = {
  enter: "top 85%",
  mid: "top 65%",
} as const;

/** Media queries for gsap.matchMedia. */
export const MQ = {
  reduce: "(prefers-reduced-motion: reduce)",
  noPreference: "(prefers-reduced-motion: no-preference)",
} as const;
