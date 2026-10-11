# Portrait

**Current state:** `components/Portrait.tsx` shows Devansh cut out of his photo (`public/portrait/devansh-cutout.webp`, 1200 x 1140, transparent, ink-and-cream duotone, upscaled from an 800 x 800 original). To use a better photo, replace that file at the same aspect. The section below is the optional route to a flat-vector illustration instead.

## Optional: flat-vector illustration prompt

To replace the photo with a
flat vector portrait of Devansh instead, give an image tool a clear, front-facing photo (plain background) and this prompt.

```
Turn the attached photo into a flat vector editorial portrait, front-facing, head and shoulders,
cropped at the chest. Style: bold flat shapes, no gradients, no outlines thicker than hairline,
no background (transparent). Strict palette: sumi ink black #161412 for hair, clothing and darkest
shadows; washi cream #F3EDE2 for highlights and shirt collar; one mid skin tone drawn as a flat
fill with a single flat shadow shape; thin muted-gold #B08D57 hairline accents only. Keep the face
faithful and natural; simplify detail into confident shapes like a Japanese woodblock or modern
editorial poster. Provide it as separate transparent layers if possible: 1) shoulders and clothing,
2) neck, 3) head and hair, 4) fine details. Export as SVG, 600 x 800 viewBox.
```

When the art exists: put the layers into `components/Portrait.tsx`, keep each wrapped in
`<g data-layer data-depth="…">` (larger depth moves further with the cursor), and check the head
still reads against both the crimson background and the cream name behind it.
