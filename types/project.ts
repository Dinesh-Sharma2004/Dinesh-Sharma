export type ProjectArtwork =
  | "retrieval"
  | "evidence"
  | "atmosphere"
  | "enrichment"
  | "forecast"
  | "sentiment";

export type Project = {
  /** Stable id used for keys, anchors and scene lookups. */
  id: string;
  /** Exact approved title. */
  title: string;
  /** Compact one-line hook. */
  tagline: string;
  /** Concise, verified description. */
  description: string;
  /** Detailed, verified implementation summary. */
  implementation: string;
  /** Verified technology labels. */
  tech: string[];
  /** Verified repository URL. */
  repo: string;
  /** Verified live demo URL (only present when genuinely reachable). */
  demo?: string;
  /** Optional documentation URL. */
  docs?: string;
  /** Editorial category label. */
  category: string;
  year: string;
  /** Visual treatment identifier used by cards + background scene. */
  artwork: ProjectArtwork;
  /** Accent pair [primary, secondary] driving artwork + scene lighting. */
  accent: [string, string];
  /** Position in slider and grid. */
  order: number;
};
