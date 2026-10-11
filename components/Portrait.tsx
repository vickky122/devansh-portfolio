import Image from "next/image";

/**
 * The portrait: Devansh cut out of his photo (transparent WebP, 1200 x 1140, ink-and-cream duotone) so the
 * crimson ground and the giant name show around him. A thin gold ring (the sun) sits behind the head, and a
 * soft dark shadow around the cutout lifts his light face off the cream letters. The shoulders dissolve toward
 * the sides in the image itself, so there is no hard vertical cut. The two data-layer elements
 * drive the cursor parallax in chapters/Intro.tsx: a larger depth moves further.
 *
 * The source photo was 800 x 800, so this is an upscale: sharp at this size, no extra detail. The cutout
 * was made with GrabCut; replace public/portrait/devansh-cutout.webp (same 1200:1140 aspect) to update it.
 * `data-preload` makes the loader wait for the image to decode before the doors open.
 */
export function Portrait({ className }: { className?: string }) {
  return (
    <div className={`relative ${className ?? ""}`}>
      <div
        data-layer
        data-depth="0.5"
        aria-hidden="true"
        className="absolute top-[40%] left-[51%] aspect-square w-[82%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-gold"
      />
      <div data-layer data-depth="1" className="absolute inset-0">
        <Image
          src="/portrait/devansh-cutout.webp"
          alt="Portrait of Devansh Singha"
          width={1200}
          height={1140}
          priority
          data-preload=""
          sizes="(min-width: 768px) 700px, 540px"
          className="h-full w-full [filter:drop-shadow(0_0_28px_rgb(22_20_18/0.5))]"
        />
      </div>
    </div>
  );
}
