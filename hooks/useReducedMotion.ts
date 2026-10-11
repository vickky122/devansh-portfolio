import { useSyncExternalStore } from "react";
import { MQ } from "@/lib/motion/motion";

function subscribe(onChange: () => void) {
  const mq = window.matchMedia(MQ.reduce);
  mq.addEventListener("change", onChange);
  return () => mq.removeEventListener("change", onChange);
}

/**
 * True when the visitor prefers reduced motion. Server and first hydration pass report false,
 * then it updates, so use it for behaviour in effects rather than for markup that must match.
 * Animation code itself should use gsap.matchMedia with MQ from lib/motion/motion.
 */
export function useReducedMotion(): boolean {
  return useSyncExternalStore(
    subscribe,
    () => window.matchMedia(MQ.reduce).matches,
    () => false,
  );
}
