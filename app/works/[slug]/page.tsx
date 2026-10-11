import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense, type ReactNode } from "react";
import { ChapterCounter } from "@/components/ChapterCounter";
import { Copy } from "@/components/Copy";
import { FlowDiagram } from "@/components/FlowDiagram";
import { GoldLine } from "@/components/GoldLine";
import { InkReveal } from "@/components/InkReveal";
import { ScreenshotSlot } from "@/components/ScreenshotSlot";
import { ShojiLink } from "@/components/ShojiTransition";
import { content } from "@/content/content";

const { projects } = content.works;
const siteName = `${content.name.first} ${content.name.last}`.toLowerCase();

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/works/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  return { title: project ? project.name : "Works" };
}

function Block({ label, children }: { label: string; children: ReactNode }) {
  return (
    <section className="grid gap-6 py-12 md:grid-cols-[12rem_1fr] md:gap-12">
      <div>
        <p className="t-label">{label}</p>
        <GoldLine className="mt-2" />
      </div>
      <div>{children}</div>
    </section>
  );
}

/**
 * Case study for one project: problem, what was built, the key decision, the flow, the result.
 * The slug is read inside <Suspense> (Cache Components wants URL data out of the static shell); every slug
 * comes from generateStaticParams, so the page is still prerendered. The fallback is a plain crimson shell.
 */
export default function ProjectPage({ params }: PageProps<"/works/[slug]">) {
  return (
    <Suspense fallback={<div className="surface-crimson min-h-svh" />}>
      <Project params={params} />
    </Suspense>
  );
}

async function Project({ params }: Pick<PageProps<"/works/[slug]">, "params">) {
  const { slug } = await params;
  const index = projects.findIndex((p) => p.slug === slug);
  if (index < 0) notFound();
  const project = projects[index];
  const next = projects[(index + 1) % projects.length];

  return (
    <>
      <ChapterCounter
        siteName={siteName}
        total={content.chapters.length}
        initial={{ number: 4, name: project.name }}
      />
      <main>
        <header
          data-chapter="4"
          data-chapter-name={project.name}
          className="surface-crimson px-10 pt-36 pb-24 md:px-28 md:pt-48"
        >
          <div className="mx-auto max-w-6xl">
            <ShojiLink href="/#works" className="t-label underline underline-offset-4">
              all works
            </ShojiLink>
            <InkReveal
              as="h1"
              className="t-h1 mt-10"
              delay={0.6}
              start="top 100%"
              style={{ fontSize: "clamp(2.75rem, 9vw, 8.5rem)" }}
            >
              {project.name}
            </InkReveal>
            <p className="t-body mt-6 max-w-md">{project.tagline}</p>
            <ul className="mt-6 flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <li key={tag} className="t-label rounded-full border border-washi px-3 py-1">
                  {tag}
                </li>
              ))}
            </ul>
            <div className="mt-14 aspect-[16/9] overflow-hidden">
              <ScreenshotSlot project={project} priority />
            </div>
          </div>
        </header>

        <div
          data-chapter="4"
          data-chapter-name={project.name}
          data-chapter-tone="ink"
          className="surface-washi px-10 py-16 md:px-28 md:py-24"
        >
          <div className="mx-auto max-w-6xl divide-y divide-sumi/15">
            <Block label="problem">
              <InkReveal as="p" className="text-xl leading-snug md:text-2xl">
                <Copy value={project.problem} />
              </InkReveal>
            </Block>
            <Block label="what i built">
              <InkReveal as="p" className="text-xl leading-snug md:text-2xl">
                <Copy value={project.built} />
              </InkReveal>
            </Block>
            <Block label="key decision">
              <InkReveal as="p" className="text-xl leading-snug md:text-2xl">
                <Copy value={project.decision} />
              </InkReveal>
            </Block>
            <Block label="how it flows">
              <FlowDiagram steps={project.flow} />
            </Block>
            <Block label="result">
              <InkReveal as="p" className="text-xl leading-snug md:text-2xl">
                <Copy value={project.result} />
              </InkReveal>
            </Block>
            <Block label="tech">
              <ul className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <li key={tag} className="t-label border border-sumi px-3 py-1">
                    {tag}
                  </li>
                ))}
              </ul>
            </Block>
            <Block label="links">
              {project.links.length > 0 ? (
                <ul className="t-label flex flex-wrap gap-6">
                  {project.links.map((link) => (
                    <li key={link.href}>
                      <a href={link.href} className="underline underline-offset-4">
                        ./{link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="t-label">
                  <Copy value="TODO" />
                </p>
              )}
            </Block>
          </div>
        </div>

        <ShojiLink
          href={`/works/${next.slug}`}
          data-chapter="4"
          data-chapter-name={next.name}
          className="surface-crimson block px-10 py-28 md:px-28 md:py-40"
        >
          <span className="mx-auto block max-w-6xl">
            <span className="t-label block">next project</span>
            <span className="t-h1 mt-6 block" style={{ fontSize: "clamp(2.75rem, 9vw, 8.5rem)" }}>
              {next.name}
            </span>
          </span>
        </ShojiLink>
      </main>
    </>
  );
}
