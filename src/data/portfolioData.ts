export interface MetricCallout {
  label: string;
  value: string;
  trend?: string;
}

export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  period: string;
  location: string;
  status: string;
  tags: string[];
  metrics: MetricCallout[];
  points: string[];
}

export interface ProjectItem {
  id: string;
  title: string;
  period: string;
  category: string;
  tech: string[];
  metrics: MetricCallout[];
  description: string;
  points: string[];
  github?: string;
  demo?: string;
  architectureNote?: string;
}

export interface SkillCategory {
  category: string;
  code: string;
  skills: string[];
}

export const PORTFOLIO_DATA = {
  profile: {
    name: "Dinesh Sharma",
    title: "AI Engineer | Data Scientist",
    academicTitle: "B.Tech AI & Data Science, IIITDM Kurnool (2023–2027)",
    cpi: "7.75/10",
    location: "Bangalore, India",
    coordinates: "12.9716° N, 77.5946° E",
    positioning:
      "Someone who builds applied ML systems end-to-end — from model training to deployment, monitoring, and scalable APIs.",
    bio:
      "AI and Data Science undergraduate with hands-on experience in Python-based machine learning, data pipelines, forecasting, model evaluation, and applied AI. Practical exposure to experimentation, hyperparameter tuning, reproducible workflows, model deployment, monitoring, and scalable APIs. Strong focus on clear documentation and translating data/model results into reliable systems.",
    email: "dineshsharma004785@gmail.com",
    github: "https://github.com/Dinesh-Sharma2004", // Customizable link
    linkedin: "https://www.linkedin.com/in/dineshsh4rm4", // Customizable link
    resumeUrl: "#resume", // Can be replaced with a real /resume.pdf file
    systemStatus: "NOMINAL",
    latency: "24ms",
    callsign: "DS-AI-2027",
  },

  education: {
    degree: "B.Tech, Artificial Intelligence & Data Science",
    institution: "Indian Institute of Information Technology, Design and Manufacturing (IIITDM) Kurnool",
    period: "2023 – 2027",
    cpi: "7.75 / 10.0",
    highlights: [
      "Specialization in Deep Learning, Probabilistic Graphical Models, and Distributed Systems",
      "Active researcher in time-series forecasting & regime discovery",
      "Coursework: Machine Learning, Deep Learning, Data Structures, DBMS, Cloud Computing"
    ],
  },

  leadership: [
    {
      title: "Club Head",
      organization: "DataWorks Club",
      description: "Led the student ML community; organized learning sessions, technical quizzes, and hackathons.",
      tag: "COMMUNITY_LEAD"
    },
    {
      title: "National Hackathon Organiser",
      organization: "Netrik / Inter-IIIT Hackathon",
      description: "Coordinated participant engagement for Netrik; helped organize the first Inter-IIIT Hackathon.",
      tag: "OPS_LEAD"
    },
    {
      title: "Hackathon Participant",
      organization: "National Level Competitions",
      description: "Competed in MyET AI Hackathon and Yuvaan AI/ML Hackathon solving real-world predictive challenges.",
      tag: "DEV_SPRINT"
    }
  ],

  experience: [
    {
      id: "startrit-2025",
      role: "Software Intern (AI)",
      company: "Startrit Infratech Private Limited",
      period: "May 2025 – Dec 2025",
      location: "Bengaluru, India (Hybrid)",
      status: "MISSION COMPLETE",
      tags: ["ETL Pipelines", "Face Verification", "Microservice Deployment", "MLOps"],
      metrics: [
        { label: "Accuracy", value: "97.0%", trend: "+5.4% over baseline" },
        { label: "Balanced Acc", value: "96.6%", trend: "1,192 eval pairs" },
        { label: "ROC-AUC", value: "0.985", trend: "Random Forest" },
        { label: "Microservices", value: "10+", trend: "SSE streaming & Pydantic" }
      ],
      points: [
        "Designed an ETL pipeline (PostgreSQL, Prefect, LangGraph) to ingest raw data, build a feature store, and orchestrate parallel KYC and credit-score prediction workflows.",
        "Deployed a 2-stage face-verification pipeline (VGGFace, FaceNet, ArcFace, Celery, Redis) achieving 97% accuracy, 96.6% balanced accuracy, and 0.985 ROC-AUC on 1,192 evaluation pairs, using a Random Forest Classifier.",
        "Versioned models with MLflow and Databricks; applied Optuna hyperparameter tuning and SHAP feature-importance analysis for credit-risk scoring.",
        "Deployed 10+ microservices with SSE-based real-time job-status streaming and Pydantic schema validation across service boundaries."
      ]
    }
  ] as ExperienceItem[],

  projects: [
    {
      id: "ml-from-scratch",
      title: "ML Algorithms from Scratch",
      period: "2024",
      category: "CORE ML / MATHEMATICAL FOUNDATIONS",
      tech: ["Python", "NumPy", "Pandas", "Matplotlib"],
      metrics: [
        { label: "Algorithms", value: "9 Models", trend: "1st Principles" },
        { label: "Stability", value: "100%", trend: "Zero external ML lib" },
        { label: "Validation", value: "Benchmark", trend: "Sup / Unsup / Kernels" }
      ],
      description:
        "Engineered foundational machine learning algorithms entirely from mathematical first principles with dedicated training, prediction, and numerical stability routines.",
      points: [
        "Implemented 9 ML algorithms from first principles covering regression, classification, and clustering.",
        "Engineered independent training/prediction/evaluation modules covering gradient descent, Gini splitting, kernel functions, and numerical stability.",
        "Validated against standard benchmark datasets across supervised, unsupervised, and kernel-based approaches."
      ],
      github: "https://github.com/Dinesh-Sharma2004/ML_Algorithm_from_scratch",
      architectureNote: "Zero-dependency vector calculations using vectorized NumPy broadcast operations."
    },
    {
      id: "cluster-adaptive-forecasting",
      title: "Cluster-Adaptive Forecasting with Supervised Correction Loops",
      period: "Jan – Jul 2025",
      category: "TIME-SERIES / REGIME ADAPTATION",
      tech: ["Python", "LightGBM", "scikit-learn (GMM)", "FastAPI", "NumPy", "Pandas", "joblib"],
      metrics: [
        { label: "MAE Improvement", value: "31.2%", trend: "0.22 → 0.15 MAE" },
        { label: "Regime Clustering", value: "K=4", trend: "Gaussian Mixture Models" },
        { label: "Regime Transitions", value: "292", trend: "Auto-detected" }
      ],
      description:
        "Dynamic sensor forecasting architecture that discovers latent operating regimes and selectively triggers warm-start retraining upon distribution drift.",
      points: [
        "Applied Gaussian Mixture Model regime discovery (K=4) to multivariate MetroPT2 sensor data; trained per-regime LightGBM specialists.",
        "Engineered buffer-triggered selective retraining (buffer ≥ 50 samples, MAE threshold 1.2x) to handle distribution shifts gracefully.",
        "MAE reduced from 0.22 to 0.15 (31.2% improvement) across 292 detected regime transitions.",
        "Implemented warm-start retraining and production FastAPI endpoints for real-time ingestion, prediction, and per-regime MAE/RMSE telemetry reporting."
      ],
      github: "https://github.com/Dinesh-Sharma2004/Regime-Aware-Time-Series-Forecasting-System",
      architectureNote: "MetroPT2 multivariate sensor feed → GMM Regime Classifier → Specialist LightGBM → Buffer Drift Detector."
    },
    {
      id: "medical-rag-chatbot",
      title: "Medical RAG Chatbot",
      period: "Nov 2025 – Mar 2026",
      category: "DISTRIBUTED RAG & LLMOPS",
      tech: ["FastAPI", "LangChain", "FAISS", "Docker", "Kubernetes", "Redis", "Celery", "Prometheus", "PostgreSQL"],
      metrics: [
        { label: "Retrieval Latency", value: "90.5ms", trend: "Mean response time" },
        { label: "Candidate Scale", value: "18 → 100", trend: "Expanded recall" },
        { label: "Microservices", value: "7 Stack", trend: "Docker & K8s" }
      ],
      description:
        "High-throughput clinical knowledge retrieval system designed for zero-abstention medical QA with Prometheus telemetry and vector search indexing.",
      points: [
        "Architected a 7-service Docker stack: async PDF ingestion, FAISS vector retrieval, Redis/Celery background workers, and Prometheus monitoring.",
        "Scaled retrieval candidates from 18 to 100, tuned LLM context to 8 documents, significantly reduced answer abstention, and reached 90.5ms mean retrieval latency.",
        "Benchmarked 3 LLM candidates on latency, answer quality, and hallucination rate via an automated custom evaluation pipeline.",
        "Instrumented Prometheus scrapers to track per-replica throughput, retrieval latency, and ingestion queue depth in real time."
      ],
      github: "https://github.com/Dinesh-Sharma2004/Medical_chatbot",
      architectureNote: "Clinical PDF Ingestion → Chunking & Embedding → FAISS Vector Store → LangChain RAG → Celery Workers → Prometheus Monitoring."
    },
    {
      id: "factlens-platform",
      title: "FactLens – AI Fact-Checking Platform",
      period: "Feb – Jul 2026",
      category: "MULTIMODAL SPEECH & VERIFICATION",
      tech: ["PyTorch", "HuggingFace Transformers", "Whisper", "wav2vec2", "LangChain", "FastAPI", "React", "Docker"],
      metrics: [
        { label: "Word Accuracy", value: "93.5%", trend: "LibriSpeech slice" },
        { label: "Fine-Tuning", value: "Whisper", trend: "Seq2SeqTrainer" },
        { label: "Pipeline", value: "End-to-End", trend: "Audio → Claim → Proof" }
      ],
      description:
        "Real-time speech-to-claim fact verification system converting live microphone audio into transcription, claim extraction, and verified evidence labels.",
      points: [
        "Fine-tuned Whisper using HuggingFace Seq2SeqTrainer and benchmarked against wav2vec2 on WER/CER metrics.",
        "Achieved 93.5% word accuracy on a LibriSpeech benchmark slice under real-world acoustic variances.",
        "Engineered an end-to-end ASR pipeline: browser mic capture → WAV encoding → sample-rate conversion → preprocessing → transcript → LLM-backed fact-checking.",
        "Prompt-engineered claim-verification output into structured, labelled JSON; Dockerized; FastAPI backend consumed by responsive React frontend."
      ],
      github: "https://github.com/Dinesh-Sharma2004/FactLens",
      architectureNote: "Live Audio Capture → WAV Resampler → Whisper Fine-tuned Model → Claim Extractor → Verification Engine → Labelled JSON."
    }
  ] as ProjectItem[],

  skills: [
    {
      category: "Languages",
      code: "LANG_01",
      skills: ["Python", "Java", "C", "C++"]
    },
    {
      category: "Libraries & ML Frameworks",
      code: "LIB_02",
      skills: [
        "PyTorch",
        "HuggingFace Transformers",
        "LightGBM",
        "scikit-learn",
        "NumPy",
        "Pandas",
        "Matplotlib",
        "SHAP",
        "Optuna"
      ]
    },
    {
      category: "RAG & Agentic Systems",
      code: "RAG_03",
      skills: ["LangChain", "LangGraph", "FAISS", "Vector Embeddings"]
    },
    {
      category: "MLOps & Cloud Infrastructure",
      code: "OPS_04",
      skills: [
        "MLflow",
        "Databricks",
        "Prefect",
        "Docker",
        "Kubernetes",
        "Git/GitHub",
        "Jupyter Notebooks"
      ]
    },
    {
      category: "Backend & Distributed Services",
      code: "SRV_05",
      skills: [
        "FastAPI",
        "Flask",
        "REST APIs",
        "Celery",
        "Redis",
        "PostgreSQL",
        "Microservices"
      ]
    },
    {
      category: "Cloud Environments",
      code: "CLD_06",
      skills: ["GCP", "Supabase"]
    }
  ] as SkillCategory[]
};
