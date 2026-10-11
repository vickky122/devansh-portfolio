/**
 * STUB — this is NOT the Step 0 content.ts.
 *
 * The real content.ts was not in the project folder when the scaffold was made. This file carries only
 * what the brief and the build plan state outright (education, project names and one-line descriptions,
 * skills, hobbies, chapter names). Everything else is the string "TODO", rendered visibly on the page.
 * Replace the whole file with the real one when Step 0 is answered; the shapes below are what the
 * chapters read, so keep the field names.
 *
 * Rule from the plan: never invent facts. Anything unknown stays a TODO.
 */

export const TODO = "TODO";

export type JourneyEntry = {
  /** shown large; e.g. "2017" or "2020 to 2024" */
  years: string;
  title: string;
  place: string;
  line: string;
};

export type Project = {
  slug: string;
  name: string;
  /** screenshot shown in the home chapter and on the project page; a TODO placeholder shows until supplied */
  image?: { src: string; alt: string; width: number; height: number };
  /** one line, from the plan */
  tagline: string;
  tags: string[];
  problem: string;
  built: string;
  decision: string;
  result: string;
  /** steps of the simple flow diagram on the project page */
  flow: string[];
  links: { label: string; href: string }[];
};

export type Skill = { name: string; line: string };

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

  /** Chapter 01 labels. Wording comes from the plan's site-structure table and the brief. */
  hero: {
    role: "associate systems engineer",
    location: "jorhat, assam",
    availability: "open to work",
    ctaWorks: "view works",
    ctaResume: "resume",
  },
  /** Path of the resume PDF under /public, e.g. "/resume.pdf". TODO until the user confirms which file to publish. */
  resumeUrl: TODO,

  /** Used for the page description and social cards. Built only from facts in the brief; swap for the approved positioning line. */
  seo: {
    description:
      "Portfolio of Devansh Singha, a 2024 B.Tech Computer Science graduate from Jorhat, Assam, open to associate systems engineer roles. Projects: NewsX and Mobile GNS with AI.",
  },

  positioningLine: TODO, // Step 0: three options, Devansh approves one

  /** Chapter 02. Card facts are from the plan's site-structure table. */
  profile: {
    title: "profile",
    cards: [
      { label: "role", value: "associate systems engineer" },
      { label: "degree", value: "b.tech computer science" },
      { label: "university", value: "assam kaziranga university, 2020 to 2024" },
      { label: "training", value: "data science diploma, cranes varsity" },
      { label: "location", value: "jorhat, assam" },
      { label: "strengths", value: "persistent, detail-oriented, analytical" },
    ],
    /** three lines, first person; Step 0 writes these */
    about: [TODO, TODO, TODO],
  },

  /** Chapter 03. Entries and their years are from the plan; places and one-liners are Step 0. */
  journey: {
    title: "journey",
    entries: [
      { years: "2017", title: "high school", place: TODO, line: TODO },
      { years: "2018 to 2020", title: "higher secondary", place: TODO, line: TODO },
      { years: "2020 to 2024", title: "b.tech computer science", place: "assam kaziranga university", line: TODO },
      { years: TODO, title: "data science diploma", place: "cranes varsity", line: TODO },
    ] satisfies JourneyEntry[],
  },

  /** Chapter 04. Names and descriptions are from the plan; the case-study fields are Step 0. */
  works: {
    title: "works",
    projects: [
      {
        slug: "newsx",
        name: "NewsX",
        tagline: "python and tkinter news app",
        tags: ["python", "tkinter"],
        problem: TODO,
        built: TODO,
        decision: TODO,
        result: TODO,
        flow: [],
        links: [],
      },
      {
        slug: "mobile-gns",
        name: "Mobile GNS with AI",
        tagline: "cross-platform network simulator with ai debugging",
        tags: ["cross-platform", "network simulator", "ai debugging"],
        problem: TODO,
        built: TODO,
        decision: TODO,
        result: TODO,
        // The plan's Step 6 draws this flow; confirm it with Devansh before it ships.
        flow: ["user", "simulator", "ai debugging api", "fix suggestion"],
        links: [],
      },
    ] as Project[], // widened so empty flow/links arrays keep their element types
  },

  /** Chapter 05. Skill names are from the plan; how each was used is Step 0. */
  craft: {
    title: "craft",
    skills: [
      { name: "Java", line: TODO },
      { name: "Python", line: TODO },
      { name: "Data Science", line: TODO },
      { name: "Power BI", line: TODO },
      { name: "MS Excel and Office", line: TODO },
    ] satisfies Skill[],
  },

  /** Chapter 06. */
  contact: {
    title: "contact",
    heading: "let's build something together.",
    email: TODO,
    linkedin: TODO,
    github: TODO,
    hobbies: "basketball, badminton, esports and travelling",
    footer: "made with care in jorhat",
  },
};

export type Chapter = (typeof content.chapters)[number];

export const isTodo = (value: string) => value === TODO;
