import type { ProjectArtwork as ArtworkKind } from "@/types/project";

type Props = {
  kind: ArtworkKind;
  accent: [string, string];
  className?: string;
};

/**
 * Abstract, conceptually-accurate motif per project (not a fake live trace).
 * Each is a lightweight inline SVG tinted by the project's accent pair.
 */
export function ProjectArtwork({ kind, accent, className }: Props) {
  const [a, b] = accent;
  const gid = `g-${kind}`;
  return (
    <svg
      viewBox="0 0 400 260"
      className={className}
      fill="none"
      role="img"
      aria-hidden="true"
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <linearGradient id={gid} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor={a} />
          <stop offset="1" stopColor={b} />
        </linearGradient>
        <radialGradient id={`${gid}-glow`} cx="0.5" cy="0.4" r="0.7">
          <stop offset="0" stopColor={a} stopOpacity="0.35" />
          <stop offset="1" stopColor={a} stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="400" height="260" fill={`url(#${gid}-glow)`} />

      {kind === "retrieval" && (
        <g stroke={`url(#${gid})`} strokeWidth="1.5">
          {[0, 1, 2, 3].map((i) => (
            <rect
              key={i}
              x={70 + i * 10}
              y={60 + i * 10}
              width="150"
              height="90"
              rx="8"
              opacity={0.3 + i * 0.18}
            />
          ))}
          <circle cx="320" cy="150" r="16" stroke={b} strokeWidth="2" />
          <path d="M235 110 C 280 120, 290 150, 304 150" stroke={a} strokeWidth="2" />
          <circle cx="320" cy="150" r="4" fill={b} />
        </g>
      )}

      {kind === "evidence" && (
        <g>
          {[
            [90, 80],
            [200, 60],
            [300, 110],
            [150, 170],
            [260, 190]
          ].map(([x, y], i) => (
            <g key={i}>
              <circle cx={x} cy={y} r="8" fill={i % 2 ? b : a} />
            </g>
          ))}
          <g stroke={`url(#${gid})`} strokeWidth="1.5" opacity="0.7">
            <line x1="90" y1="80" x2="200" y2="60" />
            <line x1="200" y1="60" x2="300" y2="110" />
            <line x1="90" y1="80" x2="150" y2="170" />
            <line x1="150" y1="170" x2="260" y2="190" />
            <line x1="300" y1="110" x2="260" y2="190" />
          </g>
          <path d="M186 60 l8 8 l16 -18" stroke={b} strokeWidth="2.5" />
        </g>
      )}

      {kind === "atmosphere" && (
        <g stroke={`url(#${gid})`} strokeWidth="1.5" fill="none">
          {[0, 1, 2, 3, 4].map((i) => (
            <path
              key={i}
              d={`M20 ${90 + i * 26} C 120 ${60 + i * 26}, 280 ${130 + i * 26}, 380 ${80 + i * 26}`}
              opacity={0.3 + i * 0.14}
            />
          ))}
          <circle cx="300" cy="96" r="18" stroke={b} strokeWidth="2" />
          <line x1="300" y1="70" x2="300" y2="58" stroke={b} strokeWidth="2" />
          <line x1="300" y1="134" x2="300" y2="146" stroke={b} strokeWidth="2" />
        </g>
      )}

      {kind === "enrichment" && (
        <g stroke={`url(#${gid})`} strokeWidth="1.5">
          {[
            [70, 70],
            [70, 150],
            [230, 60],
            [230, 140]
          ].map(([x, y], i) => (
            <rect key={i} x={x} y={y} width="90" height="46" rx="6" opacity="0.85" />
          ))}
          <g stroke={b} strokeWidth="2">
            <path d="M160 93 L 230 83" />
            <path d="M160 163 L 230 163" />
            <path d="M320 83 L 360 120 L 320 163" fill="none" />
          </g>
          <circle cx="360" cy="120" r="6" fill={b} />
        </g>
      )}

      {kind === "forecast" && (
        <g>
          <g opacity="0.14">
            <rect x="20" y="40" width="110" height="180" fill={a} />
            <rect x="240" y="40" width="140" height="180" fill={b} />
          </g>
          <polyline
            points="20,170 70,150 120,175 170,110 220,130 270,70 320,95 380,60"
            stroke={`url(#${gid})`}
            strokeWidth="2.5"
            fill="none"
          />
          <polyline
            points="20,185 70,180 120,188 170,150 220,165 270,120 320,140 380,110"
            stroke={b}
            strokeWidth="1.5"
            strokeDasharray="4 5"
            fill="none"
            opacity="0.7"
          />
        </g>
      )}

      {kind === "sentiment" && (
        <g>
          {[
            [100, 90, "A"],
            [300, 90, "O"],
            [200, 185, "S"]
          ].map(([x, y, t], i) => (
            <g key={i}>
              <circle cx={x as number} cy={y as number} r="26" stroke={i === 2 ? b : a} strokeWidth="1.5" />
              <text
                x={x as number}
                y={(y as number) + 5}
                textAnchor="middle"
                fontSize="16"
                fontFamily="monospace"
                fill={i === 2 ? b : a}
              >
                {t}
              </text>
            </g>
          ))}
          <g stroke={`url(#${gid})`} strokeWidth="1.5">
            <line x1="126" y1="90" x2="274" y2="90" />
            <line x1="112" y1="112" x2="188" y2="165" />
            <line x1="288" y1="112" x2="212" y2="165" />
          </g>
        </g>
      )}
    </svg>
  );
}
