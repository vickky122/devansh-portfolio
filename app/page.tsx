import { ChapterCounter } from "@/components/ChapterCounter";
import { Loader } from "@/components/Loader";
import dynamic from "next/dynamic";
import { Intro } from "@/chapters/Intro";
import { Profile } from "@/chapters/Profile";
import { content } from "@/content/content";
import { siteUrl } from "@/lib/site";

// Below the fold: still server-rendered (the HTML is all there), but their JavaScript loads separately
// from the first paint's.
const Journey = dynamic(() => import("@/chapters/Journey").then((m) => m.Journey));
const Works = dynamic(() => import("@/chapters/Works").then((m) => m.Works));
const Craft = dynamic(() => import("@/chapters/Craft").then((m) => m.Craft));
const Contact = dynamic(() => import("@/chapters/Contact").then((m) => m.Contact));

const siteName = `${content.name.first} ${content.name.last}`.toLowerCase();

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: `${content.name.first} ${content.name.last}`,
  url: siteUrl,
  description: content.seo.description,
  address: { "@type": "PostalAddress", addressLocality: "Jorhat", addressRegion: "Assam", addressCountry: "IN" },
  alumniOf: { "@type": "CollegeOrUniversity", name: "Assam Kaziranga University" },
  knowsAbout: content.craft.skills.map((skill) => skill.name),
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        // "<" is escaped so the JSON can never close the script tag
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd).replace(/</g, "\\u003c") }}
      />
      <Loader />
      <ChapterCounter
        siteName={siteName}
        total={content.chapters.length}
        initial={{ number: 1, name: content.chapters[0].name }}
      />
      <main id="main">
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
