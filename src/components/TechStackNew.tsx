import "./styles/TechStackNew.css";

interface TechItem {
  name: string;
  icon?: string;
  url: string;
  invert?: boolean;
}

const dev = (slug: string, file = `${slug}-original`) =>
  `https://cdn.jsdelivr.net/gh/devicons/devicon@2.16.0/icons/${slug}/${file}.svg`;

// Only technologies that appear in the projects above.
// Pyramid rows: 6 -> 5 -> 5 -> 4 -> 3
const techStack: TechItem[][] = [
  [
    { name: "Python", icon: dev("python"), url: "https://python.org" },
    { name: "PyTorch", icon: dev("pytorch"), url: "https://pytorch.org" },
    { name: "Hugging Face", icon: "https://huggingface.co/front/assets/huggingface_logo-noborder.svg", url: "https://huggingface.co" },
    { name: "Scikit-learn", icon: dev("scikitlearn"), url: "https://scikit-learn.org" },
    { name: "Pandas", icon: dev("pandas"), url: "https://pandas.pydata.org", invert: true },
    { name: "NumPy", icon: dev("numpy"), url: "https://numpy.org" },
  ],
  [
    { name: "FastAPI", icon: dev("fastapi"), url: "https://fastapi.tiangolo.com" },
    { name: "LangChain", url: "https://www.langchain.com" },
    { name: "LangGraph", url: "https://www.langchain.com/langgraph" },
    { name: "Groq", url: "https://groq.com" },
    { name: "LightGBM", url: "https://lightgbm.readthedocs.io" },
  ],
  [
    { name: "FAISS", url: "https://faiss.ai" },
    { name: "Redis", icon: dev("redis"), url: "https://redis.io" },
    { name: "PostgreSQL", icon: dev("postgresql"), url: "https://postgresql.org" },
    { name: "Playwright", url: "https://playwright.dev" },
    { name: "Streamlit", url: "https://streamlit.io" },
  ],
  [
    { name: "React", icon: dev("react"), url: "https://react.dev" },
    { name: "Docker", icon: dev("docker"), url: "https://docker.com" },
    { name: "Kubernetes", icon: dev("kubernetes", "kubernetes-plain"), url: "https://kubernetes.io" },
    { name: "Grafana", icon: dev("grafana"), url: "https://grafana.com" },
  ],
  [
    { name: "Git", icon: dev("git"), url: "https://git-scm.com" },
    { name: "GitHub", icon: dev("github"), url: "https://github.com", invert: true },
    { name: "Linux", icon: dev("linux"), url: "https://linux.org" },
  ],
];

const TechStackNew = () => {
  return (
    <div className="techstack-new">
      <div className="techstack-video-container">
        <div className="techstack-overlay"></div>
      </div>

      <div className="techstack-content">
        <h2>Tech Stack</h2>

        <div className="techstack-pyramid">
          {techStack.map((row, rowIndex) => (
            <div key={rowIndex} className="techstack-row">
              {row.map((tech) => (
                <a
                  key={tech.name}
                  href={tech.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="techstack-item"
                  title={tech.name}
                  data-cursor="disable"
                >
                  {tech.icon ? (
                    <img
                      className={tech.invert ? "invert" : undefined}
                      src={tech.icon}
                      alt={tech.name}
                      loading="lazy"
                      decoding="async"
                    />
                  ) : (
                    <b className="techstack-glyph" aria-hidden="true">
                      {tech.name.slice(0, 2)}
                    </b>
                  )}
                  <span>{tech.name}</span>
                </a>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TechStackNew;
