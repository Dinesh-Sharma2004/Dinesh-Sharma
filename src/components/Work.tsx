import "./styles/Work.css";
import WorkImage from "./WorkImage";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect } from "react";
import { config } from "../config";
import { Link } from "react-router-dom";
import { FaGithub } from "react-icons/fa6";

gsap.registerPlugin(ScrollTrigger);

const Work = () => {
  useEffect(() => {
    const compact = window.innerWidth <= 1024; // phones + tablets: one full-width card at a time

    // Cards differ in width on desktop (the last one is a narrower call-to-action),
    // so scroll exactly far enough to bring the last card fully into view.
    function getTranslateX() {
      const box = document.getElementsByClassName("work-box");
      if (box.length === 0) return 0;
      const flex = document.querySelector<HTMLElement>(".work-flex");
      const current = flex ? Number(gsap.getProperty(flex, "x")) || 0 : 0;
      const last = box[box.length - 1].getBoundingClientRect();
      // measure from the un-translated position so refreshes give the same answer
      const lastRight = last.right - current;
      return Math.max(0, lastRight - (compact ? window.innerWidth : window.innerWidth - 80));
    }

    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: ".work-section",
        start: "top top",
        end: () => `+=${getTranslateX()}`,
        scrub: 1,
        pin: true,
        pinSpacing: true,
        anticipatePin: 1,
        id: "work",
        invalidateOnRefresh: true,
        // phones: settle on one project at a time
        snap: compact
          ? {
              snapTo: 1 / Math.max(1, config.projects.length),
              duration: { min: 0.2, max: 0.5 },
              delay: 0.05,
              ease: "power1.inOut",
            }
          : undefined,
      },
    });

    timeline.to(".work-flex", {
      x: () => -getTranslateX(),
      ease: "none",
    });

    // Refresh ScrollTrigger after layout settles
    ScrollTrigger.refresh();

    // Clean up
    return () => {
      timeline.kill();
      ScrollTrigger.getById("work")?.kill();
    };
  }, []);
  return (
    <div className="work-section" id="work">
      <div className="work-container section-container">
        <h2>
          My <span>Work</span>
        </h2>
        <div className="work-flex">
          {config.projects.map((project, index) => (
            <div className="work-box" key={project.id}>
              <div className="work-info">
                <div className="work-title">
                  <h3>0{index + 1}</h3>

                  <div>
                    <h4>{project.title}</h4>
                    <p>{project.category}</p>
                  </div>
                </div>
                <p className="work-desc">{project.description}</p>
                <h4>Tools and features</h4>
                <p>{project.technologies}</p>
                <div className="work-links">
                  <a
                    className="work-link-btn work-link-primary"
                    href={project.repo}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-cursor="disable"
                    aria-label={`${project.title} source code on GitHub`}
                  >
                    <FaGithub /> GitHub repo
                  </a>
                  {project.demo && (
                    <a
                      className="work-link-btn"
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      data-cursor="disable"
                    >
                      Live demo ↗
                    </a>
                  )}
                </div>
              </div>
              <WorkImage
                artwork={project.artwork}
                accent={project.accent}
                title={project.title}
                link={project.repo}
              />
            </div>
          ))}
          {/* See All Works Button */}
          <div className="work-box work-box-cta">
            <div className="see-all-works">
              <h3>Want to see more?</h3>
              <p>Details, stack and source for every project</p>
              <Link to="/myworks" className="see-all-btn" data-cursor="disable">
                See All Works →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Work;
