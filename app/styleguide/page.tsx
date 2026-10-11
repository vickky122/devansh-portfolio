import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";
import { BrushStroke } from "@/components/BrushStroke";
import { Frame } from "@/components/Frame";
import { BrushLineDemo, InkRevealDemo } from "@/components/lab/Demos";
import { ContrastTable } from "@/components/styleguide/ContrastTable";
import { OptionSwitcher } from "@/components/styleguide/OptionSwitcher";
import { StyleguideShell } from "@/components/styleguide/StyleguideShell";
import { TypeSpecimen } from "@/components/styleguide/TypeSpecimen";
import { content } from "@/content/content";
import { contrastRatio } from "@/lib/contrast";
import { motion, trigger } from "@/lib/motion/motion";
import { palette } from "@/lib/palette";

export const metadata: Metadata = {
  title: "Styleguide",
  robots: { index: false, follow: false },
};

const siteName = `${content.name.first} ${content.name.last}`.toLowerCase();

const swatches = [
  { name: "crimson", hex: palette.crimson, role: "hero and chapter openers" },
  { name: "washi cream", hex: palette.washi, role: "calm sections and text on dark" },
  { name: "sumi ink", hex: palette.sumi, role: "text, details, dark sections" },
  { name: "gold", hex: palette.gold, role: "thin lines only" },
] as const;

const BRIEFED_CRIMSON = "#d7263d";
const ratioBriefed = contrastRatio(palette.washi, BRIEFED_CRIMSON).toFixed(2);
const ratioChosen = contrastRatio(palette.washi, palette.crimson).toFixed(2);

const unit = (key: string) =>
  key.startsWith("duration") || key.startsWith("stagger") || key === "scrub"
    ? "s"
    : key.startsWith("travel")
      ? "px"
      : key === "parallax"
        ? "×"
        : "";

function flatten(obj: object, prefix = ""): [string, string][] {
  return Object.entries(obj).flatMap(([k, v]): [string, string][] =>
    v !== null && typeof v === "object" ? flatten(v, `${prefix}${k}.`) : [[`${prefix}${k}`, String(v)]],
  );
}

const reducedRows = flatten(motion.reduced);
const motionRows = flatten(motion.full).map(([key, full], i) => ({
  key,
  full,
  reduced: reducedRows[i][1],
  unit: unit(key),
}));

function Section({ id, n, title, children }: { id: string; n: string; title: string; children: ReactNode }) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className="border-t border-sumi py-16 md:py-24">
      <header className="mb-10 grid gap-3 md:grid-cols-[10rem_1fr] md:gap-8">
        <p className="t-label opacity-70">{n}</p>
        <h2 id={`${id}-title`} className="t-h3">
          {title}
        </h2>
      </header>
      {children}
    </section>
  );
}

function Option({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="border border-sumi p-5">
      <p className="t-label mb-2">{title}</p>
      <p className="t-small">{children}</p>
    </div>
  );
}

export default function StyleguidePage() {
  return (
    <StyleguideShell>
      <OptionSwitcher />

      <main className="mx-auto max-w-6xl px-5 pb-24 md:px-12">
        <header className="py-16 md:py-24">
          <p className="t-label opacity-70">step 1 · design tokens</p>
          <h1 className="t-h1 mt-3">styleguide</h1>
          <p className="t-body mt-6 max-w-xl">
            Palette, type, frame and the ink reveal in one place. The bar above switches the paper grain on and off so you
            can compare.
          </p>
          <Link href="/" className="t-label link-brush mt-6 inline-block">
            back to the site
          </Link>
        </header>

        <Section id="palette" n="01" title="Palette">
          <ul className="grid grid-cols-2 gap-x-4 gap-y-8 md:grid-cols-5">
            {swatches.map((s) => (
              <li key={s.name}>
                <div className="h-28 border border-sumi/20" style={{ background: s.hex }} />
                <p className="t-label mt-3">{s.name}</p>
                <p className="t-label opacity-70">{s.hex}</p>
                <p className="t-small mt-1 opacity-80">{s.role}</p>
              </li>
            ))}
          </ul>

          <h3 className="t-label mt-16 mb-4">contrast, every text and background pair</h3>
          <ContrastTable />
          <p className="t-small mt-6 max-w-2xl">
            Cream on crimson is {ratioChosen}:1, so the small labels (frame rails, counter, tags) pass AA on it. Ink on
            crimson and crimson on cream are only for large text and graphics. Gold is for hairlines only; on crimson and
            cream it is too faint to carry meaning.
          </p>
        </Section>

        <Section id="options" n="02" title="Decisions">
          <div className="grid gap-10 lg:grid-cols-2">
            <Option title="crimson · #c41e3a">
              Chosen over the briefed #d7263d. Cream on it is {ratioChosen}:1, so every text size passes AA and the small
              labels stay legible. The briefed shade measured {ratioBriefed}:1, which only works for large type.
            </Option>
            <Option title="type · anton · manrope · jetbrains mono">
              Anton&rsquo;s heavy strokes hold up at giant size behind the portrait and in cream on crimson. JetBrains
              Mono stays clear as 12px lowercase. All three are free under the SIL Open Font License and served from this
              site through next/font, so visitors never call out to Google.
            </Option>
          </div>

          <div className="surface-crimson relative mt-10 overflow-hidden px-6 py-12 md:px-12 md:py-16">
            <p className="t-label">01 / 06 · intro · open to work</p>
            <p className="t-giant mt-4" style={{ fontSize: "clamp(4rem, 14vw, 10rem)" }}>
              {content.name.first}
            </p>
            <p className="t-body mt-6 max-w-md">Sphinx of black quartz, judge my vow. Small text, as the site will use it.</p>
          </div>
        </Section>

        <Section id="type" n="03" title="Type scale">
          <TypeSpecimen token="t-giant" className="t-giant" stacked>
            {content.name.last}
          </TypeSpecimen>
          <TypeSpecimen token="t-h1" className="t-h1">
            The path
          </TypeSpecimen>
          <TypeSpecimen token="t-h2" className="t-h2">
            Chapter title
          </TypeSpecimen>
          <TypeSpecimen token="t-h3" className="t-h3">
            Section heading
          </TypeSpecimen>
          <TypeSpecimen token="t-body" className="t-body max-w-xl">
            Sphinx of black quartz, judge my vow. Body copy runs in a clean sans and stays between 16px and 19px.
          </TypeSpecimen>
          <TypeSpecimen token="t-small" className="t-small max-w-xl">
            Sphinx of black quartz, judge my vow. Secondary copy and captions.
          </TypeSpecimen>
          <TypeSpecimen token="t-label" className="t-label">
            Small label · always lowercase
          </TypeSpecimen>
        </Section>

        <Section id="frame" n="04" title="The frame">
          <p className="t-body mb-8 max-w-xl">
            One thin line inset from the edge, the name on the left rail, the chapter on the right, the counter in the
            corner. Side labels appear from 768px up; phones keep the line and the counter.
          </p>
          <div className="grid gap-6 lg:grid-cols-3">
            {(
              [
                { surface: "surface-crimson", tone: "cream", chapter: 0 },
                { surface: "surface-washi", tone: "ink", chapter: 1 },
                { surface: "surface-sumi", tone: "cream", chapter: 4 },
              ] as const
            ).map(({ surface, tone, chapter }) => (
              <div key={surface} className={`${surface} relative isolate grid min-h-80 place-items-center overflow-hidden border border-sumi/20`}>
                <Frame
                  contained
                  tone={tone}
                  chapter={content.chapters[chapter].number}
                  chapterName={content.chapters[chapter].name}
                  siteName={siteName}
                />
                <p className="t-h2">{content.chapters[chapter].name}</p>
              </div>
            ))}
          </div>
        </Section>

        <Section id="ink" n="05" title="Ink reveal">
          <p className="t-body mb-8 max-w-xl">
            The signature effect. Each line unmasks behind a brush stroke that sweeps left to right. With reduced motion
            it becomes a short fade.
          </p>
          <div className="surface-crimson px-6 py-16 md:px-14 md:py-24">
            <InkRevealDemo text="A story told in six chapters, unrolled like a scroll." />
          </div>
        </Section>

        <Section id="brush" n="06" title="Brush stroke and paper grain">
          <div className="grid gap-8 lg:grid-cols-2">
            <div className="surface-washi border border-sumi/20 p-6">
              <p className="t-label mb-6 opacity-70">on cream · draws on scroll</p>
              <BrushLineDemo />
            </div>
            <div className="surface-crimson p-6">
              <p className="t-label mb-6">on crimson · static</p>
              <BrushStroke className="w-full text-washi" />
            </div>
          </div>
          <p className="t-small mt-6 max-w-2xl">
            The paper grain is one pre-rendered grey noise tile blended into each surface&rsquo;s own background, under
            the content. Text stays untouched and the brand colours stay true on average. Use the grain toggle in the
            bar to compare.
          </p>
        </Section>

        <Section id="motion" n="07" title="Motion tokens">
          <p className="t-body mb-8 max-w-xl">
            Slow and deliberate, nothing bounces. Every value has a reduced-motion twin: no travel, no scroll-linked
            motion, short fades. Read straight from <code className="t-label">lib/motion/motion.ts</code>.
          </p>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[480px] border-collapse text-left">
              <thead>
                <tr className="t-label border-b border-sumi">
                  <th scope="col" className="py-2 pr-4 font-normal">token</th>
                  <th scope="col" className="py-2 pr-4 font-normal">full</th>
                  <th scope="col" className="py-2 font-normal">reduced</th>
                </tr>
              </thead>
              <tbody>
                {motionRows.map((r) => (
                  <tr key={r.key} className="border-b border-sumi/20">
                    <th scope="row" className="t-label py-2 pr-4 font-normal">{r.key}</th>
                    <td className="t-label py-2 pr-4 tabular-nums">{r.full}{r.full !== "false" && r.full.match(/^[\d.]+$/) ? r.unit : ""}</td>
                    <td className="t-label py-2 tabular-nums">{r.reduced}{r.reduced !== "false" && r.reduced.match(/^[\d.]+$/) ? r.unit : ""}</td>
                  </tr>
                ))}
                <tr className="border-b border-sumi/20">
                  <th scope="row" className="t-label py-2 pr-4 font-normal">trigger.enter</th>
                  <td className="t-label py-2 pr-4">{trigger.enter}</td>
                  <td className="t-label py-2">{trigger.enter}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </Section>
      </main>
    </StyleguideShell>
  );
}
