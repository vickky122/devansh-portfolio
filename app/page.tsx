import Link from "next/link";
import { content } from "@/content/content";

// Holding page. The loader and the intro chapter arrive in Step 3.
export default function Home() {
  return (
    <main className="surface-crimson flex min-h-svh flex-col items-start justify-end gap-6 p-8 md:p-16">
      <p className="t-label">portfolio · in progress</p>
      <h1 className="t-h1">
        {content.name.first} {content.name.last}
      </h1>
      <Link href="/styleguide" className="t-label underline underline-offset-4">
        open the styleguide
      </Link>
    </main>
  );
}
