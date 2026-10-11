import type { Metadata } from "next";
import Link from "next/link";
import { ChapterCounter } from "@/components/ChapterCounter";
import { InkReveal } from "@/components/InkReveal";
import { BrushLineDemo, InkRevealDemo } from "@/components/lab/Demos";
import { LabStatus } from "@/components/lab/LabStatus";
import { content } from "@/content/content";

export const metadata: Metadata = {
  title: "Lab",
  robots: { index: false, follow: false },
};

const siteName = `${content.name.first} ${content.name.last}`.toLowerCase();
const pad = "px-10 py-28 md:px-28";

/** Each motion primitive on its own, inside the real frame, so it can be judged in isolation. */
export default function LabPage() {
  return (
    <main>
      <ChapterCounter siteName={siteName} total={4} initial={{ number: 1, name: "ink reveal" }} />
      <LabStatus />

      <section
        data-chapter="1"
        data-chapter-name="ink reveal"
        className={`surface-crimson flex min-h-svh flex-col justify-center ${pad}`}
      >
        <p className="t-label mb-8">lab · step 2 · scroll down, one primitive per chapter</p>
        <InkRevealDemo text="Ink reveal. Each line unmasks behind a brush stroke." />
        <InkReveal as="p" className="t-body mt-10 max-w-md" delay={0.5}>
          Lines of body copy use the same pattern, so the whole site reveals text one way. With reduced motion this
          becomes a short fade.
        </InkReveal>
      </section>

      <section
        data-chapter="2"
        data-chapter-name="brush line"
        data-chapter-tone="ink"
        className={`surface-washi min-h-[140svh] ${pad}`}
      >
        <p className="t-label mb-8">brush line, plays once on enter</p>
        <BrushLineDemo />
        <p className="t-label mt-32 mb-8">brush line, scrubbed with scroll</p>
        <BrushLineDemo scrub>
          <p className="t-small mt-6 max-w-sm">Drawn exactly as far as you have scrolled; scroll back and it undraws.</p>
        </BrushLineDemo>
      </section>

      <section
        data-chapter="3"
        data-chapter-name="cursor"
        className={`surface-sumi flex min-h-svh flex-col justify-center gap-8 ${pad}`}
      >
        <p className="t-label">cursor · a fine pointer only, hidden on touch</p>
        <h2 className="t-h2">Hover the links</h2>
        <div className="t-label flex flex-wrap gap-8">
          <Link href="/" className="link-brush">
            ./home
          </Link>
          <Link href="/styleguide" className="link-brush">
            ./styleguide
          </Link>
          <button type="button" className="link-brush">
            ./button
          </button>
        </div>
      </section>

      <section
        data-chapter="4"
        data-chapter-name="scroll"
        data-chapter-tone="ink"
        className={`surface-washi flex min-h-svh flex-col justify-center gap-6 ${pad}`}
      >
        <p className="t-label">smooth scroll · lenis driven by the gsap ticker</p>
        <h2 className="t-h2">The readout at the bottom is live</h2>
        <p className="t-body max-w-lg">
          It shows frames per second, whether Lenis or the browser is scrolling, and your reduced-motion setting. Turn
          reduced motion on in your system settings and reload: Lenis switches off and every primitive above goes calm.
        </p>
      </section>
    </main>
  );
}
