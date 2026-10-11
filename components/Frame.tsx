type FrameProps = {
  /** 1-based chapter number shown in the counter */
  chapter: number;
  total?: number;
  /** current chapter name, shown on the right rail */
  chapterName: string;
  /** shown on the left rail */
  siteName: string;
  /** line and label colour: cream on crimson and ink surfaces, ink on cream */
  tone?: "cream" | "ink";
  /** fit to a positioned parent instead of the viewport (used for previews) */
  contained?: boolean;
};

const pad = (n: number) => String(n).padStart(2, "0");

/**
 * The thin frame that sits over every chapter: a 1px line, vertical side labels, a chapter counter.
 * Styles live in app/globals.css (.frame). Purely decorative and duplicated by the page's headings,
 * so it is hidden from assistive tech. Step 2's <ChapterCounter> will drive the counter and right
 * rail as chapters enter.
 */
export function Frame({
  chapter,
  total = 6,
  chapterName,
  siteName,
  tone = "cream",
  contained = false,
}: FrameProps) {
  return (
    <div
      className="frame"
      data-tone={tone}
      data-contained={contained ? "" : undefined}
      aria-hidden="true"
    >
      <span className="frame__line" />
      <span className="frame__rail frame__rail--left t-label">{siteName}</span>
      <span className="frame__rail frame__rail--right t-label" data-rail-chapter>
        {chapterName}
      </span>
      <span className="frame__counter t-label">
        <span data-counter-current>{pad(chapter)}</span> / {pad(total)}
      </span>
    </div>
  );
}
