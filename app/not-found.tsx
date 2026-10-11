import type { Metadata } from "next";
import { Frame } from "@/components/Frame";
import { ShojiLink } from "@/components/ShojiTransition";
import { content } from "@/content/content";

export const metadata: Metadata = { title: "Not found" };

/** 404, in the site's own style. */
export default function NotFound() {
  return (
    <main id="main" className="surface-crimson relative grid min-h-svh place-items-center px-10 py-28">
      <Frame
        chapter={1}
        total={content.chapters.length}
        chapterName="404"
        siteName={`${content.name.first} ${content.name.last}`.toLowerCase()}
      />
      <div className="text-center">
        <p className="t-label">404</p>
        <h1 className="t-h1 mt-6">this path does not exist</h1>
        <ShojiLink href="/" className="t-label link-brush mt-12 inline-block">
          ./home
        </ShojiLink>
      </div>
    </main>
  );
}
