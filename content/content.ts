/**
 * STUB — this is NOT the Step 0 content.ts.
 *
 * The real content.ts was not in the project folder when the scaffold was made.
 * This file only carries what the brief and the plan state outright (the name and the
 * six chapter names) so Step 1's /styleguide has something to render.
 * Replace the whole file with the real one; the styleguide then needs a one-line import fix.
 *
 * Rule from the plan: never invent facts. Anything unknown stays a TODO.
 */

export const TODO = "TODO" as const;

export const content = {
  name: { first: "Devansh", last: "Singha" },

  /** Chapter 0 (loader) is not numbered. Names are the plan's site-structure table. */
  chapters: [
    { number: 1, slug: "intro", name: "intro" },
    { number: 2, slug: "profile", name: "profile" },
    { number: 3, slug: "journey", name: "journey" },
    { number: 4, slug: "works", name: "works" },
    { number: 5, slug: "craft", name: "craft" },
    { number: 6, slug: "contact", name: "contact" },
  ],

  positioningLine: TODO, // Step 0: three options, Devansh approves one
  about: TODO,
  email: TODO,
  linkedin: TODO,
  github: TODO,
} as const;

export type Chapter = (typeof content.chapters)[number];
