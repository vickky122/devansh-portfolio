import { ChapterCounter } from "@/components/ChapterCounter";
import { Loader } from "@/components/Loader";
import { Intro } from "@/chapters/Intro";
import { content } from "@/content/content";

const siteName = `${content.name.first} ${content.name.last}`.toLowerCase();

/** Chapters 02 to 06 arrive in Steps 4 to 8; until then the page ends on a quiet placeholder. */
export default function Home() {
  return (
    <>
      <Loader />
      <ChapterCounter
        siteName={siteName}
        total={content.chapters.length}
        initial={{ number: 1, name: content.chapters[0].name }}
      />
      <main>
        <Intro />
        <section
          data-chapter="2"
          data-chapter-name="profile"
          data-chapter-tone="ink"
          className="surface-washi flex min-h-svh items-center px-10 md:px-28"
        >
          <p className="t-label">02 · profile · built in step 4</p>
        </section>
      </main>
    </>
  );
}
