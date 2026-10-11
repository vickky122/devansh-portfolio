# Devansh Singha: portfolio

A cinematic, Japanese-editorial portfolio told as one scroll in six numbered chapters, "The Path":
intro, profile, journey, works, craft, contact. Next.js (App Router) + TypeScript, Tailwind CSS 4,
Lenis smooth scroll and GSAP (ScrollTrigger, SplitText, DrawSVG). No 3D. All wording is English.

> Status: built end to end, with placeholders. Anything not yet supplied shows as a visible dashed **TODO**
> (see "Content" below). Nothing on the page is invented.

## Run it

```bash
npm install
npm run dev      # http://localhost:3000
npm run build && npm start
```

Routes: `/` (the six chapters), `/works/[slug]` (case studies), `/styleguide` and `/lab` (internal pages:
tokens, and each motion primitive on its own; both are `noindex` and disallowed in `robots.txt`).

## Content

All copy lives in [`content/content.ts`](content/content.ts). Strings equal to `"TODO"` render as a visible
TODO, so missing copy can never pass for finished copy. Still to supply: the About lines, school names and
one-liners for the journey, each project's problem / what was built / key decision / result / links,
a one-liner per skill, email, LinkedIn, the resume path (`resumeUrl`), screenshots, and the real portrait art
(see [`docs/portrait-image-prompt.md`](docs/portrait-image-prompt.md)).

## Structure

```
app/            routes, layout, tokens.css, globals.css, sitemap / robots / icon / opengraph-image
chapters/       Intro, Profile, Journey, Works, Craft, Contact
components/     Frame, ChapterCounter, InkReveal, BrushLine, Loader, Nav, Cursor, ShojiTransition, ...
hooks/          useReducedMotion
lib/motion/     gsap.ts (plugin registration), motion.ts (eases, durations, reduced-motion twins)
content/        content.ts
docs/           portrait prompt, deploy checklist, LinkedIn post draft
```

## Design notes

- **Palette:** crimson `#C41E3A`, washi cream `#F3EDE2`, sumi ink `#161412`, muted gold `#B08D57` for hairlines only.
  Crimson was chosen over the briefed `#D7263D` because cream on it is 5.01:1 (AA at every size) rather than 4.26:1.
- **Type:** Anton (names, headings), Manrope (body), JetBrains Mono (lowercase labels), all SIL OFL, self-hosted via `next/font`.
- **Motion:** slow and deliberate, `power3.out`, nothing bounces. One text-reveal pattern (`InkReveal`) everywhere.
  Every animation has a reduced-motion version that tells the same story calmly.
- **Inspiration:** the structure and mood borrow from [Unifiers of Japan](https://unifiersofjapan.framer.website/)
  by Tofu Design (full-bleed colour, a flat portrait with a giant split name behind it, a thin frame with
  vertical labels, numbered chapters). This site uses none of its code, text or art, and keeps all wording in English.

## Deploy

See [`docs/DEPLOY.md`](docs/DEPLOY.md).
