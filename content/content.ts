/**
 * Site content. Source: the build plan, the brief, Devansh's resume (DevanshSinghaResume.pdf), and his LinkedIn
 * profile text as pasted by the user (for the current MBA).
 * Everything here is stated by one of those. Where the resume is silent (results and numbers, per-skill
 * detail, dates of the diploma, school/project stories) the value is the string "TODO", which the site
 * shows as a visible dashed TODO. Deliberately NOT written on the page: the phone number and street address
 * (they are only inside the resume PDF) and the CGPA (the plan leaves "show it or not" to Devansh).
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
  /** Resume PDF under /public. The file itself contains a phone number and street address; the user approved publishing it. */
  resumeUrl: "/Devansh-Singha-Resume.pdf",

  /** Used for the page description and social cards. Built only from facts in the brief; swap for the approved positioning line. */
  seo: {
    description:
      "Portfolio of Devansh Singha, a 2024 B.Tech Computer Science graduate now studying for an MBA at Amity University, Noida, open to associate systems engineer roles. Projects: NewsX and Mobile GNS with AI.",
  },

  positioningLine: TODO, // Step 0: three options, Devansh approves one

  /** Chapter 02. Card facts are from the plan's site-structure table. */
  profile: {
    title: "profile",
    cards: [
      { label: "role", value: "associate systems engineer" },
      { label: "degree", value: "b.tech computer science" },
      { label: "university", value: "assam kaziranga university, 2020 to 2024" },
      { label: "training", value: "professional diploma in data science using python, cranes varsity, bangalore" },
      { label: "studying now", value: "mba, amity university, noida, 2025 to 2027" },
      { label: "location", value: "jorhat, assam" },
      { label: "strengths", value: "persistent, detail-oriented, analytical" },
    ],
    /** three lines, first person; Step 0 writes these */
    // Rewritten from the resume summary, first person, without naming any single company.
    about: [
      "I am a 2024 B.Tech graduate in Computer Science and Engineering from Assam Kaziranga University, and I am now studying for an MBA at Amity University, Noida.",
      "I have practical experience in Java, Python, web development and Power BI, I learn quickly and I work well in teams.",
      "I want to apply my technical and analytical skills as an associate systems engineer, using technology to solve difficult problems.",
    ],
  },

  /** Chapter 03. Entries and their years are from the plan; places and one-liners are Step 0. */
  journey: {
    title: "journey",
    entries: [
      { years: "2017", title: "high school", place: "springdale high school", line: "cinnamara, jorhat, assam" },
      {
        years: "2018 to 2020",
        title: "higher secondary, science",
        place: "pragjyotika junior college",
        line: "titabar, jorhat, assam",
      },
      {
        years: "2020 to 2024",
        title: "b.tech computer science and engineering",
        place: "assam kaziranga university",
        line: "jorhat, assam",
      },
      // The resume lists this under training and gives no dates, so the year slot says "training" until Devansh supplies them.
      {
        years: "training",
        title: "professional diploma in data science using python",
        place: "cranes varsity, bangalore",
        line: "a training division of cranes software international ltd",
      },
      {
        years: "2025 to 2027",
        title: "master of business administration",
        place: "amity university, noida",
        line: "august 2025 to august 2027, in progress",
      },
    ] satisfies JourneyEntry[],
  },

  /** Chapter 04. Names and descriptions are from the plan; the case-study fields are Step 0. */
  works: {
    title: "works",
    projects: [
      {
        slug: "newsx",
        name: "NewsX",
        image: {
          src: "/works/newsx.svg",
          alt: "Original illustration for NewsX: newspaper columns and a headline in crimson, cream and ink. Not a screenshot.",
          width: 1600,
          height: 1000,
        },
        tagline: "a news fetching app in python with a tkinter interface",
        tags: ["python", "tkinter"],
        problem: TODO, // the resume does not say what problem NewsX set out to solve
        built: "A news fetching application, written in Python with the Tkinter GUI library.",
        decision: TODO,
        result: TODO,
        flow: [],
        links: [],
      },
      {
        slug: "mobile-gns",
        name: "Mobile GNS with AI",
        image: {
          src: "/works/mobile-gns.svg",
          alt: "Original illustration for Mobile GNS with AI: a phone at the centre of a network of nodes. Not a screenshot.",
          width: 1600,
          height: 1000,
        },
        tagline: "a graphical network simulator for android and ios, with ai debugging",
        tags: ["android", "ios", "network simulator", "openai api"],
        problem:
          "Fixing network errors is hard to learn. This simulator was built for students, so they can practise on a phone and learn while they fix.",
        built:
          "A Graphical Network Simulator (GNS) for mobile, cross-platform on Android and iOS, giving real-time network simulation.",
        decision:
          "To debug and fix errors, it calls the API of a popular AI tool, ChatGPT from OpenAI, so fixing a network error and learning from it happen together.",
        result: TODO, // no measured result (users, accuracy, time saved) on the resume
        flow: ["user", "simulator", "ai debugging api", "fix suggestion"],
        links: [],
      },
    ] as Project[], // widened so empty flow/links arrays keep their element types
  },

  /** Chapter 05. Skill names are from the plan; how each was used is Step 0. */
  craft: {
    title: "craft",
    skills: [
      { name: "Java", line: "Practical experience, listed first among my technical skills." },
      { name: "Python", line: "Practical experience, including NewsX, built with Python and the Tkinter GUI library." },
      { name: "Data Science", line: "A professional diploma in Data Science using Python, at Cranes Varsity in Bangalore." },
      { name: "Power BI", line: "Practical experience, alongside Java, Python and web development." },
      { name: "MS Excel and Office", line: "MS Excel, PowerPoint and MS Word." },
    ] satisfies Skill[],
  },

  /** Chapter 06. */
  contact: {
    title: "contact",
    heading: "let's build something together.",
    email: "officialdevanshsingha@gmail.com",
    linkedin: "https://www.linkedin.com/in/dev24k",
    github: TODO, // not on the resume; not shown anywhere until supplied
    hobbies: "basketball, badminton, esports and travelling",
    footer: "made with care in jorhat",
  },
};

export type Chapter = (typeof content.chapters)[number];

export const isTodo = (value: string) => value === TODO;
