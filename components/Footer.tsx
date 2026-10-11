"use client";

import { useEffect, useRef } from "react";
import { useLenis } from "@/components/LenisProvider";
import { content } from "@/content/content";

const IST = new Intl.DateTimeFormat("en-GB", {
  timeZone: "Asia/Kolkata",
  hour: "2-digit",
  minute: "2-digit",
  hour12: false,
});

/**
 * Footer row: name, local time in IST, back to top, and the sign-off. The clock is written to the DOM
 * after mount (never during render), so the static page never bakes in a stale time.
 */
export function Footer() {
  const clock = useRef<HTMLSpanElement>(null);
  const lenis = useLenis();
  const { first, last } = content.name;

  useEffect(() => {
    const tick = () => {
      if (clock.current) clock.current.textContent = IST.format(new Date());
    };
    tick();
    const id = setInterval(tick, 15_000);
    return () => clearInterval(id);
  }, []);

  const toTop = () => {
    if (lenis.current) lenis.current.scrollTo(0);
    else window.scrollTo({ top: 0 });
  };

  return (
    <footer className="t-label grid gap-6 border-t border-washi/40 pt-8 md:grid-cols-4 md:items-end">
      <p>
        {first} {last}
      </p>
      <p>
        <span ref={clock} className="tabular-nums">
          --:--
        </span>{" "}
        ist · jorhat
      </p>
      <p>{content.contact.footer}</p>
      <button type="button" onClick={toTop} className="justify-self-start underline underline-offset-4 md:justify-self-end">
        back to top
      </button>
    </footer>
  );
}
