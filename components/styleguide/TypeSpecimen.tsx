"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

/** One row of the type scale. Reads the real computed size, so the readout is never out of date. */
export function TypeSpecimen({
  token,
  className,
  stacked = false,
  children,
}: {
  token: string;
  className: string;
  /** label above the sample instead of beside it; for samples that need the full width */
  stacked?: boolean;
  children: ReactNode;
}) {
  const sample = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState<string>("");

  useEffect(() => {
    const read = () => {
      if (sample.current) setSize(`${Math.round(parseFloat(getComputedStyle(sample.current).fontSize))}px`);
    };
    read();
    window.addEventListener("resize", read);
    return () => window.removeEventListener("resize", read);
  }, []);

  return (
    <div
      className={`grid gap-2 border-b border-sumi/20 py-6 md:gap-8 ${stacked ? "" : "md:grid-cols-[10rem_1fr]"}`}
    >
      <div className="t-label opacity-70">
        <p>{token}</p>
        <p className="tabular-nums">{size ? `now ${size}` : " "}</p>
      </div>
      {/* clip sideways only: the giant size's tight line-height lets glyph curves overshoot the line box */}
      <div ref={sample} className={`${className} overflow-x-clip py-[0.1em]`}>
        {children}
      </div>
    </div>
  );
}
