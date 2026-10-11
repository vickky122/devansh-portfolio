import { ImageResponse } from "next/og";
import { content } from "@/content/content";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = `${content.name.first} ${content.name.last}, portfolio`;

/**
 * Social card in the site's style: crimson ground, cream name, thin frame. Uses the platform's default
 * bold sans (Anton would need a network fetch at build time), so it is close to, not identical to, the site.
 */
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "#c41e3a",
          color: "#f3ede2",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          padding: 72,
          position: "relative",
        }}
      >
        <div style={{ position: "absolute", top: 24, left: 24, right: 24, bottom: 24, border: "2px solid #f3ede2", display: "flex" }} />
        <div style={{ fontSize: 28, letterSpacing: 4, textTransform: "lowercase", display: "flex" }}>
          {content.hero.role} · {content.hero.location}
        </div>
        <div style={{ fontSize: 150, fontWeight: 800, lineHeight: 0.95, textTransform: "uppercase", display: "flex", marginTop: 16 }}>
          {content.name.first} {content.name.last}
        </div>
      </div>
    ),
    size,
  );
}
