"use client";

import { useRef } from "react";
import { ContactLinks } from "@/components/ContactLinks";
import { Footer } from "@/components/Footer";
import { InkReveal } from "@/components/InkReveal";
import { content } from "@/content/content";
import { gsap, useGSAP } from "@/lib/motion/gsap";
import { MQ, motion } from "@/lib/motion/motion";

/**
 * Chapter 06. Crimson. One large cream line inks in; a dark-red sun slowly sets behind it as you scroll;
 * the links read as paths; a quiet line about hobbies; then the footer.
 * Reduced motion: the sun just sits low behind the line.
 */
export function Contact() {
  const root = useRef<HTMLElement>(null);
  const { contact } = content;

  useGSAP(
    () => {
      const section = root.current;
      if (!section) return;
      const sun = gsap.utils.selector(section)("[data-sun]");

      const mm = gsap.matchMedia();
      mm.add(MQ.noPreference, () => {
        const m = motion.full;
        gsap.fromTo(
          sun,
          { yPercent: -35 },
          {
            yPercent: 45,
            ease: m.ease.scrub,
            scrollTrigger: { trigger: section, start: "top bottom", end: "bottom bottom", scrub: m.scrub },
          },
        );
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <section
      ref={root}
      id="contact"
      data-chapter="6"
      data-chapter-name="contact"
      aria-label={contact.title}
      className="surface-crimson relative flex min-h-svh flex-col justify-between overflow-hidden px-10 py-28 md:px-28"
    >
      {/* the setting sun: a deeper red than the ground, so it reads without competing with the type */}
      <div
        data-sun
        aria-hidden="true"
        className="absolute top-[18%] left-1/2 aspect-square w-[min(70vmin,40rem)] -translate-x-1/2 translate-y-[20%] rounded-full bg-sumi/35"
      />

      <div className="relative z-10 mx-auto w-full max-w-6xl">
        <p className="t-label mb-6">06 / {contact.title}</p>
        <InkReveal as="h2" className="t-h1" start="top 80%">
          {contact.heading}
        </InkReveal>
        <div className="mt-16">
          <ContactLinks />
        </div>
        <p className="t-label mt-16">{contact.hobbies}</p>
      </div>

      <div className="relative z-10 mx-auto mt-24 w-full max-w-6xl">
        <Footer />
      </div>
    </section>
  );
}
