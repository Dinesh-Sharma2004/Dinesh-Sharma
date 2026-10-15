/**
 * Capabilities derived from actual repository evidence (no proficiency bars,
 * no invented percentages). Each capability lists concrete, verifiable work
 * and references the project ids that demonstrate it.
 */
export type Capability = {
  id: string;
  label: string;
  summary: string;
  items: string[];
  evidence: string[]; // project ids
};

export const capabilities: Capability[] = [
  {
    id: "rag",
    label: "Retrieval-Augmented Generation",
    summary:
      "Grounding LLM answers in real sources with vector search, corrective retrieval and traceable citations.",
    items: [
      "FAISS + FastEmbed semantic indexes",
      "Cache-first corrective RAG",
      "Page / REF-level source grounding"
    ],
    evidence: ["medibot-ai", "et-factlens"]
  },
  {
    id: "agents",
    label: "Agentic & LLM Systems",
    summary:
      "LLM workflows where control lives in code — deterministic decisions, schema-enforced tools and guardrails.",
    items: [
      "LangGraph state machines",
      "Schema-enforced tool calling (Pydantic)",
      "Guardrails with deterministic fallbacks"
    ],
    evidence: ["weather-advisory-support", "lead-enrichment-engineer"]
  },
  {
    id: "ml",
    label: "Applied ML & Deep Learning",
    summary:
      "Modeling from transformers to classical ML, with custom losses, regime detection and strict evaluation.",
    items: [
      "Transformer ASTE (CE · Focal · Dice · Contrastive)",
      "GMM regime detection + LightGBM",
      "Mixed-precision training, strict metrics"
    ],
    evidence: ["va-aste", "regime-aware-forecasting"]
  },
  {
    id: "backend",
    label: "Backend Engineering",
    summary:
      "Fast, resilient services with streaming, async ingestion and clean typed contracts.",
    items: [
      "FastAPI + SSE streaming",
      "Async workers (Redis / RQ, asyncio)",
      "Typed Pydantic request/response models"
    ],
    evidence: ["medibot-ai", "et-factlens", "lead-enrichment-engineer"]
  },
  {
    id: "data",
    label: "Data & Retrieval Infrastructure",
    summary:
      "Pipelines that turn messy sources into structured, queryable evidence.",
    items: [
      "Embeddings + FAISS vector stores",
      "Redis caching layers",
      "Playwright / BeautifulSoup / SerpAPI extraction"
    ],
    evidence: ["lead-enrichment-engineer", "et-factlens", "regime-aware-forecasting"]
  },
  {
    id: "mlops",
    label: "MLOps & Deployment",
    summary:
      "Shipping and observing systems with containers, orchestration and metrics.",
    items: [
      "Docker & Docker Compose",
      "Kubernetes / AWS EKS",
      "Prometheus + Grafana, Render blueprints"
    ],
    evidence: ["medibot-ai", "et-factlens"]
  }
];

/** General engineering approach (a process, not a per-project claim). */
export const approach = [
  { step: "Understand", note: "Frame the problem, constraints and what 'correct' means." },
  { step: "Prepare", note: "Shape data, sources and evaluation before building." },
  { step: "Build", note: "Implement the model, retrieval or service with typed contracts." },
  { step: "Integrate", note: "Wire components into a resilient, observable system." },
  { step: "Evaluate", note: "Measure with strict, honest metrics and traces." },
  { step: "Deploy", note: "Containerize, orchestrate and monitor in production." }
] as const;
