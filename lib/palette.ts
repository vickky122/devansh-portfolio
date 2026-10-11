/** Mirror of the hex values in app/tokens.css. Keep in sync; used for the styleguide's contrast table. */
export const palette = {
  crimson: "#c41e3a",
  washi: "#f3ede2",
  sumi: "#161412",
  gold: "#b08d57",
} as const;

export type PaletteKey = keyof typeof palette;
