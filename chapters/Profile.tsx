import { Copy } from "@/components/Copy";
import { GoldLine } from "@/components/GoldLine";
import { InkReveal } from "@/components/InkReveal";
import { content } from "@/content/content";

/**
 * Chapter 02. Stat cards on washi cream: a lowercase label, a gold hairline that draws under it, and
 * a bold value that inks in. The three-line About sits beside the grid on desktop and reveals line by
 * line. One column on phones.
 */
export function Profile() {
  const { profile } = content;

  return (
    <section
      id="profile"
      data-chapter="2"
      data-chapter-name="profile"
      data-chapter-tone="ink"
      aria-label={profile.title}
      className="surface-washi px-10 py-28 md:px-28 md:py-40"
    >
      <div className="mx-auto grid max-w-6xl gap-20 lg:grid-cols-[1.5fr_1fr] lg:gap-24">
        <div>
          <p className="t-label mb-6">02 / {profile.title}</p>
          <InkReveal as="h2" className="t-h1" start="top 80%">
            {profile.title}
          </InkReveal>

          <ul className="mt-16 grid gap-x-12 gap-y-12 sm:grid-cols-2">
            {profile.cards.map((card, i) => (
              <li key={card.label} className="sm:[&:last-child:nth-child(odd)]:col-span-2">
                <p className="t-label">{card.label}</p>
                <GoldLine className="mt-2 mb-4" delay={(i % 2) * 0.12} />
                <InkReveal as="p" className="text-xl leading-snug font-semibold md:text-2xl" delay={(i % 2) * 0.12}>
                  <Copy value={card.value} />
                </InkReveal>
              </li>
            ))}
          </ul>
        </div>

        <div className="lg:pt-32">
          <p className="t-label mb-2">about</p>
          <GoldLine className="mb-8" />
          <div className="space-y-6">
            {profile.about.map((line, i) => (
              <InkReveal key={i} as="p" className="t-body" delay={i * 0.18}>
                <Copy value={line} />
              </InkReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
