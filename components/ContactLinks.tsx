"use client";

import { useEffect, useRef, useState } from "react";
import { Copy } from "@/components/Copy";
import { content, isTodo } from "@/content/content";

const linkClass =
  "underline decoration-washi/60 underline-offset-8 transition-colors duration-(--dur-micro) hover:decoration-washi";

/**
 * Contact links styled as paths: ./email (copies the address and shows a small toast), ./linkedin,
 * ./resume. A link whose content is still a TODO is shown as a visible TODO, never as a dead link.
 */
export function ContactLinks() {
  const { contact, resumeUrl } = content;
  const [toast, setToast] = useState("");
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  useEffect(() => () => clearTimeout(timer.current), []);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(contact.email);
      setToast("email address copied");
    } catch {
      setToast(`copy failed, the address is ${contact.email}`);
    }
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setToast(""), 2400);
  };

  return (
    <>
      <ul className="t-h3 normal-case flex flex-col gap-4 md:flex-row md:gap-12">
        <li>
          {isTodo(contact.email) ? (
            <span>
              ./email · <Copy value={contact.email} />
            </span>
          ) : (
            <button type="button" onClick={copyEmail} className={linkClass}>
              ./email
            </button>
          )}
        </li>
        <li>
          {isTodo(contact.linkedin) ? (
            <span>
              ./linkedin · <Copy value={contact.linkedin} />
            </span>
          ) : (
            <a href={contact.linkedin} target="_blank" rel="noopener noreferrer" className={linkClass}>
              ./linkedin
            </a>
          )}
        </li>
        <li>
          {isTodo(resumeUrl) ? (
            <span>
              ./resume · <Copy value={resumeUrl} />
            </span>
          ) : (
            <a href={resumeUrl} download className={linkClass}>
              ./resume
            </a>
          )}
        </li>
      </ul>

      <p role="status" aria-live="polite" className="sr-only">
        {toast}
      </p>
      {toast && (
        <p
          aria-hidden="true"
          className="t-label surface-sumi fixed bottom-[calc(var(--frame-inset)+1.5rem)] left-1/2 z-50 -translate-x-1/2 px-4 py-2"
        >
          {toast}
        </p>
      )}
    </>
  );
}
