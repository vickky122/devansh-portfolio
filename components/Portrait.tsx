import Image from "next/image";

/**
 * The portrait: Devansh's photo, pre-processed to a 1080 x 1350 ink-and-cream duotone (public/portrait/devansh.webp),
 * seen through a tall arch with a thin gold outline offset behind it. The two <div data-layer data-depth>
 * layers drive the cursor parallax in chapters/Intro.tsx: a larger depth moves further.
 *
 * The photo was 800 x 800, so the 1080 x 1350 file is an upscale, sharp enough for the arch's size but with
 * no extra detail. Swap in a higher-resolution original at the same path and aspect (4:5) when there is one.
 * `data-preload` makes the loader wait for the image to decode before it opens the doors.
 */
export function Portrait({ className }: { className?: string }) {
  return (
    <div className={`relative ${className ?? ""}`}>
      <div
        data-layer
        data-depth="0.5"
        aria-hidden="true"
        className="absolute inset-0 translate-x-[6%] -translate-y-[3%] rounded-t-full border border-gold"
      />
      <div data-layer data-depth="1" className="absolute inset-0 overflow-hidden rounded-t-full border-[3px] border-sumi bg-sumi">
        <Image
          src="/portrait/devansh.webp"
          alt="Portrait of Devansh Singha"
          width={1080}
          height={1350}
          priority
          data-preload=""
          sizes="(min-width: 768px) 40vh, 80vw"
          className="h-full w-full object-cover"
        />
      </div>
    </div>
  );
}
