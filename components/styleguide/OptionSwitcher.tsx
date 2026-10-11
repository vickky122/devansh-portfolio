"use client";

import { useOptions, type GrainChoice } from "./StyleguideShell";

const grainChoices: { value: GrainChoice; label: string }[] = [
  { value: "on", label: "on" },
  { value: "off", label: "off" },
];

/** Bar at the top of the styleguide: compare the paper grain on and off. */
export function OptionSwitcher() {
  const { grain, setGrain } = useOptions();

  return (
    <div className="z-30 border-b border-sumi bg-washi/95 backdrop-blur-sm md:sticky md:top-0">
      <fieldset className="mx-auto flex max-w-6xl flex-wrap items-center gap-2 px-5 py-3 md:px-12">
        <legend className="sr-only">paper grain</legend>
        <span className="t-label w-16 opacity-70" aria-hidden="true">
          grain
        </span>
        {grainChoices.map((c) => (
          <label
            key={c.value}
            className="t-label cursor-pointer border border-sumi px-3 py-1.5 transition-colors duration-(--dur-micro) has-checked:bg-sumi has-checked:text-washi has-focus-visible:outline-2 has-focus-visible:outline-offset-2 has-focus-visible:outline-crimson"
          >
            <input
              type="radio"
              name="grain"
              value={c.value}
              checked={grain === c.value}
              onChange={() => setGrain(c.value)}
              className="sr-only"
            />
            {c.label}
          </label>
        ))}
      </fieldset>
    </div>
  );
}
