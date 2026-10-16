/**
 * Original AI-engineer character: a friendly android built from primitive
 * SVG shapes (not based on any existing character).
 *
 * The face is driven by `applySmile(root, s)`, with s in [0, 1]:
 *   0 = poker face (flat mouth), 1 = full smile (curved mouth, squinting
 *   eyes, glowing cheeks).
 */

const MOUTH_CX = 150;
const MOUTH_W = 48;
const MOUTH_BASE_Y = 150;

/** s in [0,1] -> SVG path for the mouth. */
export function mouthPath(s: number) {
  const x0 = MOUTH_CX - MOUTH_W / 2;
  const x1 = MOUTH_CX + MOUTH_W / 2;
  const y = MOUTH_BASE_Y - 11 * s; // corners rise
  const cy = MOUTH_BASE_Y + 28 * s; // centre dips -> smile valley
  return `M ${x0} ${y} Q ${MOUTH_CX} ${cy} ${x1} ${y}`;
}

/** Morph the face inside `root` between poker face (0) and a wide smile (1). */
export function applySmile(root: Element | null, value: number) {
  if (!root) return;
  const s = Math.max(0, Math.min(1, value));
  root.querySelector(".robot-mouth")?.setAttribute("d", mouthPath(s));
  const squint = `scaleY(${1 - 0.34 * s})`;
  const l = root.querySelector<SVGGElement>(".robot-eye-l");
  const r = root.querySelector<SVGGElement>(".robot-eye-r");
  if (l) l.style.transform = squint;
  if (r) r.style.transform = squint;
  const cheek = root.querySelector<SVGGElement>(".robot-cheek");
  if (cheek) cheek.style.opacity = String(0.15 + 0.75 * s);
}

export default function Robot({ uid, smile = 0 }: { uid: string; smile?: number }) {
  const id = (name: string) => `${uid}-${name}`;
  const url = (name: string) => `url(#${id(name)})`;
  return (
    <svg
      className="character-svg"
      viewBox="0 0 300 430"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Friendly AI engineer robot"
    >
      <defs>
        <linearGradient id={id("metal")} x1="60" y1="60" x2="240" y2="360" gradientUnits="userSpaceOnUse">
          <stop stopColor="#262f45" />
          <stop offset="0.5" stopColor="#141a28" />
          <stop offset="1" stopColor="#0b0f1a" />
        </linearGradient>
        <radialGradient id={id("visor")} cx="0.5" cy="0.4" r="0.7">
          <stop stopColor="#0a1018" />
          <stop offset="1" stopColor="#05070d" />
        </radialGradient>
        <radialGradient id={id("eye")} cx="0.5" cy="0.5" r="0.5">
          <stop stopColor="#d6fbff" />
          <stop offset="0.45" stopColor="#64e8f2" />
          <stop offset="1" stopColor="#2aa7c8" />
        </radialGradient>
        <radialGradient id={id("core")} cx="0.5" cy="0.5" r="0.5">
          <stop stopColor="#cfeaff" />
          <stop offset="0.4" stopColor="#9675ff" />
          <stop offset="1" stopColor="#3a2c7a" />
        </radialGradient>
        <linearGradient id={id("rim")} x1="0" y1="0" x2="0" y2="1">
          <stop stopColor="#64e8f2" stopOpacity="0.9" />
          <stop offset="1" stopColor="#9675ff" stopOpacity="0.6" />
        </linearGradient>
      </defs>

      {/* floating neural nodes */}
      <g className="robot-nodes" stroke="#64e8f2" strokeOpacity="0.35" strokeWidth="1">
        <line x1="54" y1="120" x2="92" y2="150" />
        <line x1="54" y1="120" x2="40" y2="200" />
        <line x1="246" y1="110" x2="210" y2="150" />
        <line x1="246" y1="110" x2="262" y2="190" />
      </g>
      <g className="robot-nodes-dots">
        <circle cx="54" cy="120" r="4" fill="#64e8f2" />
        <circle cx="40" cy="200" r="3" fill="#9675ff" />
        <circle cx="246" cy="110" r="4" fill="#9675ff" />
        <circle cx="262" cy="190" r="3" fill="#64e8f2" />
      </g>

      {/* antenna */}
      <line x1="150" y1="70" x2="150" y2="40" stroke={url("rim")} strokeWidth="4" strokeLinecap="round" />
      <circle className="robot-antenna" cx="150" cy="36" r="7" fill="#64e8f2" />

      {/* torso */}
      <path d="M96 250 Q150 232 204 250 L224 360 Q150 392 76 360 Z" fill={url("metal")} stroke="#2b3550" strokeWidth="2" />
      <rect x="60" y="250" width="30" height="104" rx="15" fill={url("metal")} stroke="#2b3550" strokeWidth="2" />
      <rect x="210" y="250" width="30" height="104" rx="15" fill={url("metal")} stroke="#2b3550" strokeWidth="2" />
      <circle cx="150" cy="300" r="26" fill="#0a0e18" stroke="#2b3550" strokeWidth="2" />
      <circle className="robot-core" cx="150" cy="300" r="15" fill={url("core")} />
      <circle cx="150" cy="300" r="26" fill="none" stroke="#64e8f2" strokeOpacity="0.4" strokeWidth="1" />

      {/* neck + head */}
      <rect x="134" y="176" width="32" height="26" rx="8" fill="#141a28" stroke="#2b3550" strokeWidth="2" />
      <rect x="80" y="66" width="140" height="118" rx="38" fill={url("metal")} stroke="#33405f" strokeWidth="2" />
      <rect x="68" y="104" width="18" height="44" rx="9" fill="#1b2235" stroke="#33405f" strokeWidth="2" />
      <rect x="214" y="104" width="18" height="44" rx="9" fill="#1b2235" stroke="#33405f" strokeWidth="2" />
      <circle className="robot-ear" cx="77" cy="126" r="4" fill="#64e8f2" />
      <circle className="robot-ear" cx="223" cy="126" r="4" fill="#9675ff" />

      {/* face visor */}
      <rect x="94" y="82" width="112" height="86" rx="28" fill={url("visor")} stroke="#1c2436" strokeWidth="2" />

      <g className="robot-cheek" style={{ opacity: 0.15 + 0.75 * smile }}>
        <circle cx="118" cy="140" r="9" fill="#64e8f2" opacity="0.5" />
        <circle cx="182" cy="140" r="9" fill="#64e8f2" opacity="0.5" />
      </g>

      <g className="robot-eyes">
        <g className="robot-eye-l" style={{ transform: `scaleY(${1 - 0.34 * smile})` }}>
          <ellipse cx="128" cy="118" rx="12" ry="15" fill={url("eye")} />
          <circle className="robot-pupil" cx="128" cy="118" r="4.5" fill="#06222b" />
        </g>
        <g className="robot-eye-r" style={{ transform: `scaleY(${1 - 0.34 * smile})` }}>
          <ellipse cx="172" cy="118" rx="12" ry="15" fill={url("eye")} />
          <circle className="robot-pupil" cx="172" cy="118" r="4.5" fill="#06222b" />
        </g>
      </g>

      <path
        className="robot-mouth"
        d={mouthPath(smile)}
        stroke="#8af3ff"
        strokeWidth="5"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
}
