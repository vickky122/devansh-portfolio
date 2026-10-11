// Every instance defines the same filter, so a shared id is safe and keeps this a plain server component.
const FILTER_ID = "brush-rough";

/**
 * One hand-drawn brush stroke for dividers. Three stroked paths (body plus two dry-brush streaks)
 * with a displacement filter for rough, wabi-sabi edges. Strokes (not fills) so DrawSVG can draw it.
 * Colour comes from currentColor.
 */
export function BrushStroke({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 800 28"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      role="presentation"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <filter id={FILTER_ID} x="-2%" y="-60%" width="104%" height="220%">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.035 0.25"
            numOctaves="2"
            seed="3"
            result="noise"
          />
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="5" xChannelSelector="R" yChannelSelector="G" />
        </filter>
      </defs>
      <g filter={`url(#${FILTER_ID})`}>
        <path data-brush d="M6 15C90 9 180 18 300 13S520 10 640 15S760 12 794 14" strokeWidth="11" />
        <path data-brush d="M40 20C160 23 260 17 380 21S600 22 740 18" strokeWidth="3.5" opacity="0.7" />
        <path data-brush d="M20 9C140 6 280 10 420 7S640 8 770 10" strokeWidth="2.5" opacity="0.55" />
      </g>
    </svg>
  );
}
