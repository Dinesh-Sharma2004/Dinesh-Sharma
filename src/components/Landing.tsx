import { lazy, PropsWithChildren, Suspense, useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./styles/Landing.css";
import Robot, { applySmile } from "./Character/Robot";
import { faceRig } from "./Character/utils/faceRig";
import { config } from "../config";

gsap.registerPlugin(ScrollTrigger);

// the 3D character is only fetched on phones / tablets (desktop mounts it elsewhere)
const MobileCharacter = lazy(() => import("./Character/MobileCharacter"));

const Landing = ({ children }: PropsWithChildren) => {
  const nameParts = config.developer.fullName.split(" ");
  const firstName = nameParts[0] || config.developer.name;
  const lastName = nameParts.slice(1).join(" ") || "";
  const isSmall = window.innerWidth <= 1024;
  const photoRef = useRef<HTMLDivElement>(null);
  const [has3d, setHas3d] = useState(false);
  const [mount3d, setMount3d] = useState(false);

  // Phones / tablets: the character smiles more the further you scroll through
  // the hero (poker face at the top, full smile as it leaves the screen).
  useEffect(() => {
    if (!isSmall) return;
    applySmile(photoRef.current, 0);
    const st = ScrollTrigger.create({
      trigger: ".landing-section",
      start: "top top",
      end: "bottom 35%",
      scrub: true,
      onUpdate: (self) => {
        applySmile(photoRef.current, self.progress);
        faceRig.setSmile(self.progress);
      },
    });
    const idle = window.setTimeout(() => setMount3d(true), 600);
    return () => {
      st.kill();
      window.clearTimeout(idle);
    };
  }, [isSmall]);

  return (
    <>
      <div className="landing-section" id="landingDiv">
        <div className="landing-container">
          <div className="landing-intro">
            <h2>Hello! I&apos;m</h2>
            <h1>
              {firstName.toUpperCase()}
              {lastName && <> <span>{lastName.toUpperCase()}</span></>}
            </h1>
          </div>
          <div className="landing-info">
            <h3>An</h3>
            <h2 className="landing-info-h2">
              <div className="landing-h2-1">AI Engineer</div>
              <div className="landing-h2-2">ML Engineer</div>
            </h2>
            <h2>
              <div className="landing-h2-info">Data Scientist</div>
              <div className="landing-h2-info-1">Backend Dev</div>
            </h2>
          </div>
          {/* Mobile photo - shows only on mobile when 3D character is hidden */}
          <div className={`mobile-photo${has3d ? " has-3d" : ""}`} ref={photoRef}>
            <Robot uid="mob" smile={0} />
            {isSmall && mount3d && (
              <Suspense fallback={null}>
                <MobileCharacter onReady={() => setHas3d(true)} />
              </Suspense>
            )}
          </div>
        </div>
        {children}
      </div>
    </>
  );
};

export default Landing;
