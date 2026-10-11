/**
 * PLACEHOLDER portrait: an abstract ink-and-gold silhouette in layers, so the intro's depth and
 * parallax can be built and judged before the real illustration exists. It deliberately depicts
 * no one. Replace the layers with the real flat vector art (see docs/portrait-image-prompt.md),
 * keeping the <g data-layer data-depth> structure so the parallax keeps working.
 *
 * Depth: a layer with a larger data-depth moves further with the cursor.
 */
export function Portrait({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 600 800"
      className={className}
      role="img"
      aria-label="Illustrated portrait placeholder"
      fill="none"
    >
      {/* shoulders and jacket */}
      <g data-layer data-depth="0.4">
        <path
          d="M0 800V700C10 640 90 600 200 578H400C510 600 590 640 600 700V800Z"
          className="fill-sumi"
        />
        <path d="M200 578L255 800M400 578L345 800" className="stroke-gold" strokeWidth="1.5" />
      </g>

      {/* neck */}
      <g data-layer data-depth="0.7">
        <path d="M255 480H345L352 590C325 625 275 625 248 590Z" className="fill-sumi" />
      </g>

      {/* head and hair */}
      <g data-layer data-depth="1">
        <path
          d="M300 140C392 140 428 220 424 300C420 392 372 480 300 506C228 480 180 392 176 300C172 220 208 140 300 140Z"
          className="fill-sumi"
        />
        <path
          d="M172 300C150 170 230 98 308 104C402 104 452 190 428 300C424 232 396 178 312 176C232 176 190 230 172 300Z"
          className="fill-sumi"
        />
      </g>

      {/* fine detail: gold contour, cream collar and a hair highlight */}
      <g data-layer data-depth="1.4">
        <path d="M424 300C420 392 372 480 300 506" className="stroke-gold" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M200 190C230 140 290 118 340 124" className="stroke-washi" strokeWidth="3" strokeLinecap="round" opacity="0.6" />
        <path d="M230 580L300 690L370 580" className="stroke-washi" strokeWidth="3" strokeLinejoin="round" />
      </g>
    </svg>
  );
}
