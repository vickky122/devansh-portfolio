import { contrastRatio, verdict, verdictCopy } from "@/lib/contrast";
import { palette } from "@/lib/palette";

type Colour = "crimson" | "washi" | "sumi" | "gold";

const names: Record<Colour, string> = {
  crimson: "crimson",
  washi: "cream",
  sumi: "ink",
  gold: "gold",
};

// text colour on background colour, in the order the site uses them
const pairs: [Colour, Colour][] = [
  ["washi", "crimson"],
  ["sumi", "crimson"],
  ["gold", "crimson"],
  ["sumi", "washi"],
  ["crimson", "washi"],
  ["gold", "washi"],
  ["washi", "sumi"],
  ["crimson", "sumi"],
  ["gold", "sumi"],
];

/** Every text/background pair, computed from the palette, so the numbers can never drift from the colours. */
export function ContrastTable() {
  const hex = (c: Colour) => palette[c];

  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[640px] border-collapse text-left">
        <caption className="t-label mb-3 text-left opacity-70">
          wcag aa: 4.5 for normal text · 3 for large text (24px, or 19px bold) and ui lines
        </caption>
        <thead>
          <tr className="t-label border-b border-sumi">
            <th scope="col" className="py-2 pr-4 font-normal">pair</th>
            <th scope="col" className="py-2 pr-4 font-normal">sample</th>
            <th scope="col" className="py-2 pr-4 font-normal">ratio</th>
            <th scope="col" className="py-2 pr-4 font-normal">small text</th>
            <th scope="col" className="py-2 font-normal">use it for</th>
          </tr>
        </thead>
        <tbody>
          {pairs.map(([fg, bg]) => {
            const ratio = contrastRatio(hex(fg), hex(bg));
            const v = verdict(ratio);
            return (
              <tr key={`${fg}-${bg}`} className="border-b border-sumi/20 align-middle">
                <th scope="row" className="t-small py-3 pr-4 font-normal">
                  {names[fg]} on {names[bg]}
                </th>
                <td className="py-3 pr-4">
                  <span
                    className="inline-flex items-baseline gap-3 px-3 py-1.5"
                    style={{ background: hex(bg), color: hex(fg) }}
                  >
                    <span className="font-display text-2xl">Aa</span>
                    <span className="text-xs">small text</span>
                  </span>
                </td>
                <td className="t-label py-3 pr-4 tabular-nums">{ratio.toFixed(2)}:1</td>
                <td className="t-label py-3 pr-4">{ratio >= 4.5 ? "pass" : "fail"}</td>
                <td className="t-small py-3">{verdictCopy[v]}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
