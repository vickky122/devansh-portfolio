import { ChapterCounter } from "@/components/ChapterCounter";
import { Loader } from "@/components/Loader";
import { Contact } from "@/chapters/Contact";
import { Craft } from "@/chapters/Craft";
import { Intro } from "@/chapters/Intro";
import { Journey } from "@/chapters/Journey";
import { Profile } from "@/chapters/Profile";
import { Works } from "@/chapters/Works";
import { content } from "@/content/content";
import { siteUrl } from "@/lib/site";

const siteName = `${content.name.first} ${content.name.last}`.toLowerCase();

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: `${content.name.first} ${content.name.last}`,
  url: siteUrl,
  sameAs: [content.contact.linkedin],
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
