/**
 * Change an element's text without detaching React's text node. Assigning el.textContent replaces the
 * child node React rendered, and React later throws "removeChild: the node to be removed is not a child"
 * when it unmounts or updates that element. Editing the existing node in place is safe.
 */
export function setText(el: HTMLElement, text: string) {
  const node = el.firstChild;
  if (node && node.nodeType === Node.TEXT_NODE) node.nodeValue = text;
  else el.textContent = text;
}
