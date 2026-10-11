/** WCAG 2.x contrast helpers. */

function channel(value: number): number {
  const v = value / 255;
  return v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4;
}

export function luminance(hex: string): number {
  const [r, g, b] = hex
    .replace("#", "")
    .match(/../g)!
    .map((h) => channel(parseInt(h, 16)));
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

export function contrastRatio(a: string, b: string): number {
  const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (hi + 0.05) / (lo + 0.05);
}

export type Verdict = "any-size" | "large-only" | "decoration";

/** AA: 4.5 for normal text, 3 for large text (24px, or 18.66px bold) and UI lines. */
export function verdict(ratio: number): Verdict {
  if (ratio >= 4.5) return "any-size";
  if (ratio >= 3) return "large-only";
  return "decoration";
}

export const verdictCopy: Record<Verdict, string> = {
  "any-size": "any text size",
  "large-only": "large text only (24px+, or 19px+ bold) and UI lines",
  decoration: "decoration and thin lines only, never text",
};
