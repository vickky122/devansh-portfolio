import { BrushLine } from "@/components/BrushLine";
import { Copy } from "@/components/Copy";
import { TODO } from "@/content/content";

/**
 * A simple flow diagram: labelled nodes joined by brush-drawn lines that draw as they scroll into view.
 * Horizontal on desktop, vertical on phones. With no steps it shows a TODO instead of inventing a flow.
 */
export function FlowDiagram({ steps }: { steps: string[] }) {
  if (steps.length === 0) {
    return (
      <p className="t-label">
        flow diagram · <Copy value={TODO} />
      </p>
    );
  }

  return (
    <ol className="flex flex-col items-start gap-3 md:flex-row md:items-center">
      {steps.map((step, i) => (
        <li key={step} className="flex flex-col items-start gap-3 md:flex-row md:items-center">
          <span className="t-label border border-sumi px-4 py-3">{step}</span>
          {i < steps.length - 1 && (
            <span aria-hidden="true" className="flex items-center gap-1">
              <BrushLine className="w-10 rotate-90 text-crimson md:w-20 md:rotate-0" />
              <span className="t-label text-crimson">&gt;</span>
            </span>
          )}
        </li>
      ))}
    </ol>
  );
}
