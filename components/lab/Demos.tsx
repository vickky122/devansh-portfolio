"use client";

import { useState, type ReactNode } from "react";
import { BrushLine } from "@/components/BrushLine";
import { InkReveal } from "@/components/InkReveal";

function ReplayButton({ label, onClick }: { label: string; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="t-label mt-8 border border-current px-4 py-2 transition-opacity duration-(--dur-micro) hover:opacity-70"
    >
      {label}
    </button>
  );
}

/** An InkReveal headline with a replay button. Shared by /styleguide and /lab. */
export function InkRevealDemo({ text, className = "t-h1 max-w-4xl" }: { text: string; className?: string }) {
  const [token, setToken] = useState(0);
  return (
    <div>
      <InkReveal as="h3" className={className} replayToken={token}>
        {text}
      </InkReveal>
      <ReplayButton label="replay" onClick={() => setToken((t) => t + 1)} />
    </div>
  );
}

/** A BrushLine with a redraw button. */
export function BrushLineDemo({ scrub = false, children }: { scrub?: boolean; children?: ReactNode }) {
  const [token, setToken] = useState(0);
  return (
    <div>
      <BrushLine className="w-full" scrub={scrub} replayToken={token} />
      {children}
      {!scrub && <ReplayButton label="redraw" onClick={() => setToken((t) => t + 1)} />}
    </div>
  );
}
