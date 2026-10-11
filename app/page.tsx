import { ChapterCounter } from "@/components/ChapterCounter";
import { Loader } from "@/components/Loader";
import { Contact } from "@/chapters/Contact";
import { Craft } from "@/chapters/Craft";
import { Intro } from "@/chapters/Intro";
import { Journey } from "@/chapters/Journey";
import { Profile } from "@/chapters/Profile";
import { Works } from "@/chapters/Works";
import { content } from "@/content/content";

const siteName = `${content.name.first} ${content.name.last}`.toLowerCase();

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
        <Profile />
        <Journey />
        <Works />
        <Craft />
        <Contact />
      </main>
    </>
  );
}
