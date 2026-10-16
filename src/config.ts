/**
 * Single source of truth for all portfolio content.
 * Projects are grounded in each repository's own README and were verified
 * against https://github.com/Dinesh-Sharma2004 (2026-10-15).
 *
 * Notes:
 *  - ET FactLens' hosted demo returned HTTP 404 on 2026-10-15, so only its
 *    source link is shown.
 *  - "VA-ASTE" is the repo VA_ASTE (Aspect Sentiment Triplet Extraction).
 */
export type Artwork =
  | "retrieval"
  | "evidence"
  | "atmosphere"
  | "enrichment"
  | "forecast"
  | "sentiment";

export type Project = {
  id: number;
  title: string;
  category: string;
  technologies: string;
  description: string;
  artwork: Artwork;
  accent: [string, string];
  repo: string;
  demo?: string;
};

export const config = {
  developer: {
    name: "Dinesh",
    fullName: "Dinesh Sharma",
    title: "AI Engineer",
    description:
      "AI Engineer & Data Scientist building Generative AI, RAG, NLP and LLM-powered applications."
  },
  about: {
    title: "About Me",
    description:
      "I'm Dinesh Sharma, an AI Engineer and Data Scientist focused on Generative AI, RAG, NLP and LLM-powered applications. I build systems where language models stay accountable to evidence: retrieval pipelines with traceable citations, agentic workflows where the decisions live in code, and the FastAPI backends that serve them, from classical ML to transformers, shipped with Docker and Kubernetes."
  },
  process: [
    { position: "Understand", company: "Step 01", period: "01", description: "Frame the problem, the constraints and what 'correct' actually means before writing any code." },
    { position: "Prepare", company: "Step 02", period: "02", description: "Shape the data, sources and evaluation setup first, so every later result can be trusted." },
    { position: "Build", company: "Step 03", period: "03", description: "Implement the model, retrieval pipeline or service with typed contracts and clear boundaries." },
    { position: "Integrate", company: "Step 04", period: "04", description: "Wire the components into a resilient, observable system with caching, queues and fallbacks." },
    { position: "Evaluate", company: "Step 05", period: "05", description: "Measure with strict, honest metrics and traces instead of vanity numbers." },
    { position: "Deploy", company: "Step 06", period: "06", description: "Containerize, orchestrate and monitor it in production with Docker, Kubernetes and metrics." }
  ],
  projects: [
    {
      id: 1,
      title: "Medibot AI",
      category: "Retrieval-Augmented Generation",
      technologies: "FastAPI, React, LangChain, FAISS, FastEmbed, Groq, Redis / RQ, PostgreSQL, Docker, Kubernetes",
      description:
        "A full-stack medical document platform built on RAG: upload medical PDFs, ask questions and get answers grounded in the source with document and page references. PDFs are ingested asynchronously through Redis/RQ workers into a FAISS index, with chat history in PostgreSQL and Prometheus + Grafana observability.",
      artwork: "retrieval",
      accent: ["#64E8F2", "#9675FF"],
      repo: "https://github.com/Dinesh-Sharma2004/Medical_chatbot"
    },
    {
      id: 2,
      title: "ET FactLens",
      category: "RAG · Multimodal",
      technologies: "React, Vite, FastAPI, Groq, SerpAPI, Hugging Face, Whisper, CLIP / ViT, Redis, Docker",
      description:
        "An AI verification workspace that checks text claims, summarizes news URLs, transcribes voice input and scores image relevance, streaming verdicts over SSE with tracked REF_001-style source references via a cache-first corrective-RAG flow.",
      artwork: "evidence",
      accent: ["#9675FF", "#64E8F2"],
      repo: "https://github.com/Dinesh-Sharma2004/FactLens"
    },
    {
      id: 3,
      title: "Weather-Advisory Support",
      category: "Agentic · LangGraph",
      technologies: "LangGraph, langchain-openai, Groq, Open-Meteo, Streamlit, Pytest, Python",
      description:
        "A LangGraph assistant that answers outdoor-safety questions strictly from written policies applied to live Open-Meteo weather. The safety decision is made by deterministic code, not the model, and the 21-SOP policy set is covered by 106 passing pytest cases.",
      artwork: "atmosphere",
      accent: ["#64E8F2", "#D0F56B"],
      repo: "https://github.com/Dinesh-Sharma2004/Medibuddy-weathering-assisstant",
      demo: "https://botisweathering.streamlit.app/"
    },
    {
      id: 4,
      title: "Lead Enrichment Engineer",
      category: "Autonomous Agent",
      technologies: "Python, Playwright, BeautifulSoup, Groq, SerpAPI, Pydantic v2, asyncio, Streamlit",
      description:
        "An autonomous agent that takes company domains, navigates their websites with a headless browser and produces structured, evidence-grounded corporate intelligence, with schema-enforced tool calling, failure-isolated asyncio concurrency and JSON / CSV export.",
      artwork: "enrichment",
      accent: ["#D0F56B", "#64E8F2"],
      repo: "https://github.com/Dinesh-Sharma2004/Lead_Enrichment_Agent"
    },
    {
      id: 5,
      title: "Regime-Aware Time Series Forecasting",
      category: "Data Science · Forecasting",
      technologies: "Python, FastAPI, LightGBM, Scikit-learn, Pandas, NumPy",
      description:
        "An adaptive forecasting system for non-stationary telemetry: a Gaussian Mixture Model detects latent operating regimes and routes each observation to its own LightGBM regressor, benchmarked against a global baseline with MAE / RMSE and regime-wise error analysis.",
      artwork: "forecast",
      accent: ["#7FD8FF", "#9675FF"],
      repo: "https://github.com/Dinesh-Sharma2004/Regime-Aware-Time-Series-Forecasting-System"
    },
    {
      id: 6,
      title: "VA-ASTE",
      category: "NLP · Deep Learning",
      technologies: "PyTorch, Transformers, Scikit-learn, NumPy, PyYAML",
      description:
        "An end-to-end transformer system for Aspect Sentiment Triplet Extraction that pulls (aspect, opinion, sentiment) triplets from text, trained with cross-entropy, focal, dice and contrastive losses and scored under strict triplet exact match.",
      artwork: "sentiment",
      accent: ["#9675FF", "#D0F56B"],
      repo: "https://github.com/Dinesh-Sharma2004/VA_ASTE"
    }
  ] as Project[],
  contact: {
    email: "dineshsharma004785@gmail.com",
    github: "https://github.com/Dinesh-Sharma2004",
    linkedin: "https://linkedin.com/in/dinesh-sharma-ds"
  },
  skills: {
    develop: {
      title: "AI ENGINEERING",
      description: "Grounded LLM systems & resilient backends",
      details:
        "Retrieval-augmented generation with traceable citations, agentic LLM workflows where control lives in code, and the streaming, async backends that serve them in production.",
      tools: ["RAG", "FAISS", "LangGraph", "LangChain", "Groq", "FastAPI", "Redis / RQ", "Pydantic", "Docker", "Kubernetes"]
    },
    design: {
      title: "DATA SCIENCE",
      description: "From classical ML to deep learning",
      details:
        "Regime-aware forecasting, transformer models for NLP, custom losses and mixed-precision training, all held to strict, honest evaluation rather than vanity metrics.",
      tools: ["Scikit-learn", "Matplotlib", "Pandas", "NumPy", "SQL", "Hugging Face", "Jupyter Notebook", "PyTorch", "Transformers", "LightGBM", "GMM", "Mixed-Precision", "Strict Metrics"]
    }
  }
};
