"use client";

import { createContext, useContext, useMemo, useState, type ReactNode } from "react";

export type GrainChoice = "on" | "off";

type Options = {
  grain: GrainChoice;
  setGrain: (g: GrainChoice) => void;
};

const OptionsContext = createContext<Options | null>(null);

export function useOptions(): Options {
  const ctx = useContext(OptionsContext);
  if (!ctx) throw new Error("useOptions must be used inside <StyleguideShell>");
  return ctx;
}

/** Holds the one live preview toggle (paper grain on/off) and applies it as a data attribute. */
export function StyleguideShell({ children }: { children: ReactNode }) {
  const [grain, setGrain] = useState<GrainChoice>("on");
  const value = useMemo(() => ({ grain, setGrain }), [grain]);

  return (
    <OptionsContext.Provider value={value}>
      <div
        data-styleguide=""
        data-grain={grain === "off" ? "off" : undefined}
        className="surface-washi min-h-svh"
      >
        {children}
      </div>
    </OptionsContext.Provider>
  );
}
