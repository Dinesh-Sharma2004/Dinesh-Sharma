import type { Project } from "@/types/project";

/**
 * Single source of truth for the six approved projects.
 * Every description, tech label, repo URL and (where present) demo URL is
 * grounded in the project's own README / repository evidence.
 *
 * Verified 2026-10-15 against https://github.com/Dinesh-Sharma2004.
 * Notes:
 *  - "VA-ASTE" is the repo VA_ASTE (Aspect Sentiment Triplet Extraction),
 *    which the approved brief referred to as "VA-ASL".
 *  - "Regime-Aware Time Series Forecasting" replaces the "BizPulse" working name.
 *  - ET FactLens' hosted demo (Railway) returned HTTP 404 on 2026-10-15, so no
 *    live-demo link is exposed; only the verified source link is shown.
 */
export const projects: Project[] = [
  {
    id: "medibot-ai",
    title: "Medibot AI",
    tagline: "Medical document intelligence, grounded in your own PDFs.",
    description:
      "A full-stack medical document platform built on retrieval-augmented generation: upload medical PDFs, ask questions and get answers grounded in the source material with document and page references.",
    implementation:
      "A FastAPI service ingests PDFs asynchronously through Redis/RQ workers — extraction, chunking and FastEmbed embeddings land in a FAISS index outside the request path. Semantic retrieval feeds a Groq-hosted LLM so responses stay grounded, with page-level source references. Email/password and optional Google sign-in persist chat history in PostgreSQL, and Prometheus + Grafana provide observability. The API, workers, Redis, React frontend and monitoring run as independently scalable services via Docker and Kubernetes.",
    tech: ["FastAPI", "React", "LangChain", "FAISS", "FastEmbed", "Groq", "Redis / RQ", "PostgreSQL", "Docker", "Kubernetes"],
    repo: "https://github.com/Dinesh-Sharma2004/Medical_chatbot",
    category: "Retrieval-Augmented Generation",
    year: "2026",
    artwork: "retrieval",
    accent: ["#64E8F2", "#9675FF"],
    order: 1
  },
  {
    id: "et-factlens",
    title: "ET FactLens",
    tagline: "An AI verification workspace for claims, news and media.",
    description:
      "An AI-assisted verification workspace that checks text claims, summarizes news URLs, transcribes voice input and scores image relevance — streaming verdicts with tracked source references.",
    implementation:
      "A React + Vite frontend talks to a FastAPI backend that streams verdicts over SSE. A cache-first corrective-RAG flow retrieves live evidence through SerpAPI, News API and article extraction, with Redis-first caching and a local fallback; every source carries a stable REF_001-style id. Voice is transcribed with Hugging Face / Whisper models, and image relevance is scored through a Hugging Face ViT endpoint with a local CLIP fallback. Groq chat completions produce verdicts with confidence metadata, and the stack ships with Docker Compose and a Render blueprint.",
    tech: ["React", "Vite", "FastAPI", "Groq", "SerpAPI", "Hugging Face", "Whisper", "CLIP / ViT", "Redis", "Docker"],
    repo: "https://github.com/Dinesh-Sharma2004/FactLens",
    category: "RAG · Multimodal",
    year: "2026",
    artwork: "evidence",
    accent: ["#9675FF", "#64E8F2"],
    order: 2
  },
  {
    id: "weather-advisory-support",
    title: "Weather-Advisory Support",
    tagline: "Policy-grounded outdoor-safety advice from live weather.",
    description:
      "A LangGraph assistant that answers outdoor-activity safety questions strictly from written policies (SOPs) applied to live Open-Meteo weather — the safety decision is made by code, not the model.",
    implementation:
      "A deterministic engine matches SOPs and evaluates each condition against live weather to pick an outcome — advise, reassure, clarify, data_unavailable or no_guidance. The LLM (langchain-openai ChatOpenAI on Groq, temperature 0, structured output) only parses the question into intent and rephrases the chosen advice; it never decides the facts or which policy applies. An opt-in LLM-reasoner mode adds model-chosen relevance guardrailed by a verify_advice step with a deterministic fallback. A Streamlit chat UI exposes a full 'Why this answer' trace. The 21-SOP policy set is exercised end-to-end with 106 passing pytest cases.",
    tech: ["LangGraph", "langchain-openai", "Groq", "Open-Meteo", "Streamlit", "Pytest", "Python"],
    repo: "https://github.com/Dinesh-Sharma2004/Medibuddy-weathering-assisstant",
    demo: "https://botisweathering.streamlit.app/",
    category: "Agentic · LangGraph",
    year: "2026",
    artwork: "atmosphere",
    accent: ["#64E8F2", "#D0F56B"],
    order: 3
  },
  {
    id: "lead-enrichment-engineer",
    title: "Lead Enrichment Engineer",
    tagline: "Autonomous, evidence-grounded corporate intelligence.",
    description:
      "An autonomous agent that takes company domains, navigates their websites with a headless browser and produces structured, evidence-grounded corporate intelligence.",
    implementation:
      "Playwright-driven Chromium discovers and prioritizes key pages (About, Team, Products, Pricing, Careers, Contact) with bounded second-hop crawling and mailto harvesting, while BeautifulSoup strips boilerplate for token efficiency. Groq LLMs perform schema-enforced tool calling into Pydantic v2 models with a repair_llm_json safety net; missing leadership triggers hybrid SerpAPI enrichment that is validated before merging. Failure-isolated asyncio concurrency, layered navigation waits with exponential backoff, HTTP 429 Retry-After handling and lightweight bot-block detection keep runs resilient. A Streamlit UI and a batch CLI export structured JSON and CSV.",
    tech: ["Python", "Playwright", "BeautifulSoup", "Groq", "SerpAPI", "Pydantic v2", "asyncio", "Streamlit"],
    repo: "https://github.com/Dinesh-Sharma2004/Lead_Enrichment_Agent",
    category: "Autonomous Agent",
    year: "2026",
    artwork: "enrichment",
    accent: ["#D0F56B", "#64E8F2"],
    order: 4
  },
  {
    id: "regime-aware-forecasting",
    title: "Regime-Aware Time Series Forecasting",
    tagline: "Adaptive forecasting for non-stationary telemetry.",
    description:
      "An adaptive forecasting system for non-stationary telemetry that detects latent operating regimes and routes each observation to a specialized model, benchmarked against a global baseline.",
    implementation:
      "Memory-aware loading with float32 downcasting and temporal feature engineering (rolling mean, rolling variance, trend) feed a four-component Gaussian Mixture Model that assigns a latent regime. Each regime routes to its own LightGBM regressor, while a global LightGBM model is kept as a monolithic baseline for direct comparison. Online adaptation periodically refreshes regime models from buffered observations during simulation. A FastAPI workflow supports asynchronous training, evaluation, simulation and monitoring, and error analysis reports MAE, RMSE and regime-wise forecasting errors through an interactive dashboard.",
    tech: ["Python", "FastAPI", "LightGBM", "Scikit-learn", "Pandas", "NumPy"],
    repo: "https://github.com/Dinesh-Sharma2004/Regime-Aware-Time-Series-Forecasting-System",
    category: "Data Science · Forecasting",
    year: "2026",
    artwork: "forecast",
    accent: ["#7FD8FF", "#9675FF"],
    order: 5
  },
  {
    id: "va-aste",
    title: "VA-ASTE",
    tagline: "End-to-end transformer for aspect sentiment triplet extraction.",
    description:
      "An end-to-end transformer system for Aspect Sentiment Triplet Extraction that pulls (aspect, opinion, sentiment) triplets from text and scores them under strict exact match.",
    implementation:
      "The model constructs candidate spans, matches aspects to opinions through a similarity matrix and decodes pairs with a pair-level transformer. Training combines cross-entropy, focal, dice and contrastive losses with mixed-precision (AMP), learning-rate scheduling and early stopping; evaluation is strict triplet exact match over aspect span, opinion span and sentiment, with threshold (tau) tuning. The pipeline is config-driven with train / test / infer entrypoints and parses ASTE benchmark TXT files directly, auto-mapping POS/NEG/NEU to positive/negative/neutral and auto-splitting a dev set when none is provided.",
    tech: ["PyTorch", "Transformers", "Scikit-learn", "NumPy", "PyYAML"],
    repo: "https://github.com/Dinesh-Sharma2004/VA_ASTE",
    category: "NLP · Deep Learning",
    year: "2026",
    artwork: "sentiment",
    accent: ["#9675FF", "#D0F56B"],
    order: 6
  }
];

export default projects;
