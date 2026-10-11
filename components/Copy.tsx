import { isTodo } from "@/content/content";

/**
 * Renders a piece of content. A TODO from content.ts shows as a visible, dashed-underlined "TODO"
 * so missing copy can never be mistaken for finished copy.
 */
export function Copy({ value }: { value: string }) {
  if (isTodo(value)) {
    return (
      <span className="todo" title="TODO: this content has not been supplied yet">
        TODO
      </span>
    );
  }
  return <>{value}</>;
}
