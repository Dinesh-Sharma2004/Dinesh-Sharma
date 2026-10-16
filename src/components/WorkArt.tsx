import type { Artwork } from "../config";

/** Abstract, original SVG motifs — one per project category. */
export default function WorkArt({
  artwork,
  accent
}: {
  artwork: Artwork;
  accent: [string, string];
}) {
  const [a, b] = accent;
  const gid = `g-${artwork}`;
  return (
    <svg viewBox="0 0 400 300" fill="none" xmlns="http://www.w3.org/2000/svg" role="img">
      <defs>
        <linearGradient id={gid} x1="0" y1="0" x2="400" y2="300" gradientUnits="userSpaceOnUse">
          <stop stopColor={a} stopOpacity="0.9" />
          <stop offset="1" stopColor={b} stopOpacity="0.9" />
        </linearGradient>
        <radialGradient id={`${gid}-r`} cx="0.5" cy="0.4" r="0.6">
          <stop stopColor={a} stopOpacity="0.35" />
          <stop offset="1" stopColor={a} stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="400" height="300" fill={`url(#${gid}-r)`} />

      {artwork === "retrieval" && (
        <g stroke={`url(#${gid})`} strokeWidth="2">
          <rect x="60" y="70" width="120" height="160" rx="10" fill="none" />
          {[100, 120, 140, 160, 180, 200].map((y) => (
            <line key={y} x1="78" y1={y} x2="162" y2={y} strokeOpacity="0.5" />
          ))}
          <circle cx="250" cy="150" r="46" fill="none" />
          <line x1="284" y1="184" x2="330" y2="230" strokeLinecap="round" />
          {[0, 1, 2, 3].map((i) => (
            <line key={i} x1="180" y1={150} x2="204" y2={110 + i * 27} strokeOpacity="0.4" />
          ))}
          <circle cx="250" cy="150" r="8" fill={a} />
        </g>
      )}

      {artwork === "evidence" && (
        <g stroke={`url(#${gid})`} strokeWidth="2">
          <rect x="70" y="60" width="150" height="100" rx="10" fill="none" transform="rotate(-6 145 110)" />
          <rect x="120" y="110" width="150" height="100" rx="10" fill="none" />
          <path d="M160 160 l20 20 l40 -46" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" fill="none" />
          {[90, 130, 170].map((x, i) => (
            <circle key={i} cx={x + 200} cy={70 + i * 20} r="5" fill={b} />
          ))}
        </g>
      )}

      {artwork === "atmosphere" && (
        <g stroke={`url(#${gid})`} strokeWidth="2.5" fill="none" strokeLinecap="round">
          <circle cx="130" cy="110" r="34" />
          {[0, 45, 90, 135, 180, 225, 270, 315].map((d) => {
            const r = (d * Math.PI) / 180;
            return (
              <line
                key={d}
                x1={130 + Math.cos(r) * 46}
                y1={110 + Math.sin(r) * 46}
                x2={130 + Math.cos(r) * 60}
                y2={110 + Math.sin(r) * 60}
                strokeOpacity="0.6"
              />
            );
          })}
          <path d="M60 200 q30 -26 60 0 t60 0 t60 0 t60 0" />
          <path d="M60 232 q30 -26 60 0 t60 0 t60 0 t60 0" strokeOpacity="0.5" />
        </g>
      )}

      {artwork === "enrichment" && (
        <g stroke={`url(#${gid})`} strokeWidth="2">
          {[
            [120, 90],
            [280, 80],
            [330, 170],
            [210, 150],
            [90, 200],
            [250, 230]
          ].map(([x, y], i) => (
            <circle key={i} cx={x} cy={y} r="9" fill={i % 2 ? b : a} />
          ))}
          <path
            d="M120 90 L210 150 L280 80 M210 150 L330 170 M210 150 L90 200 M210 150 L250 230"
            strokeOpacity="0.5"
            fill="none"
          />
        </g>
      )}

      {artwork === "forecast" && (
        <g>
          <rect x="60" y="70" width="90" height="160" fill={a} fillOpacity="0.08" />
          <rect x="240" y="70" width="100" height="160" fill={b} fillOpacity="0.08" />
          <polyline
            points="60,190 100,160 140,175 180,120 220,140 260,90 300,110 340,70"
            stroke={`url(#${gid})`}
            strokeWidth="3"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {[
            [100, 160],
            [180, 120],
            [260, 90],
            [340, 70]
          ].map(([x, y], i) => (
            <circle key={i} cx={x} cy={y} r="5" fill={b} />
          ))}
        </g>
      )}

      {artwork === "sentiment" && (
        <g stroke={`url(#${gid})`} strokeWidth="2">
          {[80, 200, 320].map((x, i) => (
            <rect key={i} x={x - 34} y={110} width="68" height="40" rx="8" fill="none" />
          ))}
          <path d="M114 130 L166 130 M234 130 L286 130" strokeDasharray="5 6" strokeOpacity="0.6" />
          <circle cx="80" cy="200" r="7" fill={a} />
          <circle cx="200" cy="200" r="7" fill={b} />
          <circle cx="320" cy="200" r="7" fill={a} />
          <path d="M80 160 L80 193 M200 160 L200 193 M320 160 L320 193" strokeOpacity="0.5" />
        </g>
      )}
    </svg>
  );
}
