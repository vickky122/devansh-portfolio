import Image from "next/image";
import { Copy } from "@/components/Copy";
import { TODO, type Project } from "@/content/content";

/** A project screenshot, or a clearly marked placeholder until one is supplied. */
export function ScreenshotSlot({ project, priority = false }: { project: Project; priority?: boolean }) {
  if (project.image) {
    return (
      <Image
        src={project.image.src}
        alt={project.image.alt}
        width={project.image.width}
        height={project.image.height}
        priority={priority}
        className="h-full w-full object-cover"
      />
    );
  }
  return (
    <div className="grid h-full w-full place-items-center border border-dashed border-washi/60 bg-sumi/30 text-washi">
      <p className="t-label text-center">
        screenshot of {project.name.toLowerCase()} · <Copy value={TODO} />
      </p>
    </div>
  );
}
