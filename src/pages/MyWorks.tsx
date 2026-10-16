import { Link } from "react-router-dom";
import { config } from "../config";
import WorkArt from "../components/WorkArt";
import "./MyWorks.css";

const MyWorks = () => {
  return (
    <div className="myworks-page">
      <div className="myworks-header">
        <Link to="/" className="back-button" data-cursor="disable">
          ← Back to Home
        </Link>
        <h1>
          All <span>Works</span>
        </h1>
        <p>A collection of all my projects and creations</p>
      </div>

      <div className="myworks-grid">
        {config.projects.map((project, index) => (
          <div className="myworks-card" key={project.id}>
            <div className="myworks-card-number">0{index + 1}</div>
            <div className="myworks-card-image">
              <WorkArt artwork={project.artwork} accent={project.accent} />
            </div>
            <div className="myworks-card-info">
              <h3>{project.title}</h3>
              <p className="myworks-card-category">{project.category}</p>
              <p className="myworks-card-description">{project.description}</p>
              <p className="myworks-card-tech">{project.technologies}</p>
              <p className="myworks-card-links">
                <a href={project.repo} target="_blank" rel="noopener noreferrer" data-cursor="disable">
                  Code ↗
                </a>
                {project.demo && (
                  <a href={project.demo} target="_blank" rel="noopener noreferrer" data-cursor="disable">
                    Live demo ↗
                  </a>
                )}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyWorks;
